const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { spawn } = require("node:child_process");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT || 4174);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = __dirname;
const AI_PROVIDER = (process.env.AI_PROVIDER || "openai").toLowerCase();
const API_KEY = AI_PROVIDER === "deepseek"
  ? process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || ""
  : process.env.OPENAI_API_KEY || "";
const MODEL = AI_PROVIDER === "deepseek"
  ? process.env.DEEPSEEK_MODEL || process.env.AI_MODEL || "deepseek-chat"
  : process.env.OPENAI_MODEL || process.env.AI_MODEL || "gpt-5.4-mini";
const MAX_BODY_BYTES = 1024 * 1024;
const MAX_UPLOAD_BODY_BYTES = 30 * 1024 * 1024;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_FILE_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 10;
const ALLOWED_RESUME_EXTENSIONS = new Set([".pdf", ".docx", ".txt", ".md"]);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

const jobSchema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "capabilities", "adjacent"],
  properties: {
    summary: { type: "string" },
    capabilities: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "description", "priority"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          priority: { type: "string", enum: ["必须", "重要", "加分"] }
        }
      }
    },
    adjacent: {
      type: "array",
      minItems: 3,
      maxItems: 6,
      items: { type: "string" }
    }
  }
};

const resumeSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "name", "role", "company", "group", "verdict", "ats", "recovered",
    "coverage", "core", "gap", "quote", "facts", "transferable", "target",
    "verify", "questions"
  ],
  properties: {
    name: { type: "string" },
    role: { type: "string" },
    company: { type: "string" },
    group: { type: "string", enum: ["priority", "review", "unknown", "reject"] },
    verdict: { type: "string", enum: ["优先联系", "值得复核", "信息不足", "暂不匹配"] },
    ats: { type: "boolean" },
    recovered: { type: "boolean" },
    coverage: { type: "integer", minimum: 0, maximum: 100 },
    core: { type: "string" },
    gap: { type: "string" },
    quote: { type: "string" },
    facts: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    transferable: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    target: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    verify: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    questions: { type: "array", minItems: 2, maxItems: 5, items: { type: "string" } }
  }
};

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function readJson(req, maxBytes = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (Buffer.byteLength(body) > maxBytes) {
        reject(new Error(`请求内容超过 ${Math.round(maxBytes / 1024 / 1024)}MB 限制`));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("请求 JSON 格式无效"));
      }
    });
    req.on("error", reject);
  });
}

function findPython() {
  if (process.env.PYTHON_BIN) return process.env.PYTHON_BIN;
  const bundled = path.join(
    os.homedir(),
    ".cache",
    "codex-runtimes",
    "codex-primary-runtime",
    "dependencies",
    "python",
    "python.exe"
  );
  return fs.existsSync(bundled) ? bundled : process.platform === "win32" ? "python" : "python3";
}

function runParser(filePath) {
  return new Promise((resolve, reject) => {
    const child = spawn(findPython(), [path.join(ROOT, "parse_resume.py"), filePath], {
      windowsHide: true
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", chunk => { stdout += chunk; });
    child.stderr.on("data", chunk => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", code => {
      try {
        const data = JSON.parse(stdout.trim() || "{}");
        if (code !== 0 || data.error) return reject(new Error(data.error || stderr.trim() || "文件解析失败"));
        resolve(data.text);
      } catch {
        reject(new Error(stderr.trim() || "文件解析结果无效"));
      }
    });
  });
}

async function parseUploadedFile(file, directory, index) {
  if (!file?.name || !file?.data) throw new Error("文件数据不完整");
  const extension = path.extname(file.name).toLowerCase();
  if (!ALLOWED_RESUME_EXTENSIONS.has(extension)) {
    throw new Error("仅支持 PDF、DOCX、TXT 和 Markdown");
  }
  const buffer = Buffer.from(file.data, "base64");
  if (!buffer.length || buffer.length > MAX_FILE_BYTES) {
    throw new Error(`单个文件须小于 ${MAX_FILE_BYTES / 1024 / 1024}MB`);
  }
  const filePath = path.join(directory, `resume-${index}${extension}`);
  await fs.promises.writeFile(filePath, buffer);
  return runParser(filePath);
}

function extractOutputText(response) {
  if (response.output_text) return response.output_text;
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) return content.text;
    }
  }
  throw new Error("模型未返回可解析文本");
}

async function callOpenAI({ name, schema, system, input }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      reasoning: { effort: "low" },
      input: [
        { role: "system", content: [{ type: "input_text", text: system }] },
        { role: "user", content: [{ type: "input_text", text: input }] }
      ],
      text: {
        format: {
          type: "json_schema",
          name,
          strict: true,
          schema
        }
      }
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenAI API 返回 ${response.status}`);
  }
  return JSON.parse(extractOutputText(data));
}

function validateRequiredFields(value, schema, pathName = "result") {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${pathName} 必须是 JSON 对象`);
  }
  for (const key of schema.required || []) {
    if (!(key in value)) throw new Error(`${pathName} 缺少字段 ${key}`);
  }
}

async function callDeepSeek({ name, schema, system, input }) {
  const schemaInstruction = [
    "你必须只输出一个合法 JSON 对象，不要使用 Markdown 代码块。",
    `输出对象名称：${name}`,
    `必须严格符合以下 JSON Schema：${JSON.stringify(schema)}`
  ].join("\n");
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: `${system}\n${schemaInstruction}` },
        { role: "user", content: `${input}\n\n请以 JSON 格式返回结果。` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      stream: false
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `DeepSeek API 返回 ${response.status}`);
  }
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("DeepSeek 未返回可解析内容");
  const result = JSON.parse(content);
  validateRequiredFields(result, schema);
  return result;
}

async function callAI(options) {
  if (AI_PROVIDER === "deepseek") return callDeepSeek(options);
  if (AI_PROVIDER === "openai") return callOpenAI(options);
  throw new Error(`不支持的 AI_PROVIDER：${AI_PROVIDER}`);
}

function splitRequirements(text) {
  return text
    .split(/[\n；。]/)
    .map(item => item.replace(/^\s*[\d一二三四五六七八九十]+[.、)]?\s*/, "").trim())
    .filter(item => item.length >= 6);
}

function demoAnalyzeJob({ title, jd, note }) {
  const clauses = splitRequirements(`${jd}\n${note || ""}`);
  const defaults = ["核心业务任务", "专业问题解决", "跨团队协同", "结果交付", "行业知识"];
  const names = [...clauses.slice(0, 6)];
  while (names.length < 5) names.push(defaults[names.length]);
  return {
    summary: clauses[0] || `围绕${title}的核心业务目标开展工作，并对关键结果负责。`,
    capabilities: names.map((name, index) => ({
      name: name.slice(0, 24),
      description: index < 3 ? "从 JD 中识别的核心工作要求" : "建议由招聘经理进一步校准",
      priority: index < 3 ? "必须" : "重要"
    })),
    adjacent: ["相邻行业经验", "相似业务场景", "可迁移项目经历"]
  };
}

function demoAnalyzeResume({ resume, job }) {
  const firstLine = resume.split(/\r?\n/).find(line => line.trim())?.trim() || "新候选人";
  const name = firstLine.match(/(?:姓名[:：]\s*)?([\u3400-\u9fff]{2,4})/u)?.[1] || "新候选人";
  const compactResume = resume.replace(/\s+/g, "").toLowerCase();
  const knowledgeTerms = (job.knowledgePack?.terms || []).flatMap(item => Array.isArray(item) ? item : [item]);
  const terms = (job.model || []).map(item => Array.isArray(item) ? item[0] : item.name)
    .concat(job.adjacent || [])
    .concat(knowledgeTerms)
    .flatMap(term => String(term).split(/[、/\s]+/))
    .filter(term => term.length >= 2);
  const facts = [...new Set(terms.filter(term => compactResume.includes(term.replace(/\s+/g, "").toLowerCase())))].slice(0, 4);
  const isChip3d = /3D.*封装|封装.*3D/i.test(job.title || "");
  const isSaasSales = /SaaS.*销售|销售.*SaaS/i.test(job.title || "");
  const hasDirect = isChip3d
    ? /(^|[^\d.])3D|TSV|混合键合/i.test(resume)
    : isSaasSales
      ? /SaaS|企业软件/i.test(resume)
      : facts.length >= 2;
  const hasTransfer = isChip3d
    ? /2\.5D|CoWoS|先进封装|良率|互连|翘曲|可靠性/i.test(resume)
    : isSaasSales
      ? /大客户|解决方案|长周期|项目|决策链|回款/i.test(resume)
      : facts.length >= 1 || /项目|负责|主导|改善|交付|管理|研发|方案|量产|良率/.test(resume);
  const group = hasDirect ? "priority" : hasTransfer ? "review" : "unknown";
  const verdict = group === "priority" ? "优先联系" : group === "review" ? "值得复核" : "信息不足";
  const inferredFacts = facts.length ? facts : ["简历已导入", "相关经历待进一步结构化"];
  return {
    name,
    role: firstLine.slice(0, 30),
    company: "手动导入",
    group,
    verdict,
    ats: hasDirect,
    recovered: !hasDirect && hasTransfer,
    coverage: hasDirect ? 82 : hasTransfer ? 66 : 40,
    core: inferredFacts.slice(0, 3).join("、"),
    gap: "经历范围、责任边界与结果证据待确认",
    quote: resume.slice(0, 180).replace(/\s+/g, " "),
    facts: inferredFacts,
    transferable: hasTransfer ? ["相似业务任务", "可复用的问题解决方法", "相邻场景经验"] : ["经历信息待补充"],
    target: (job.model || []).slice(0, 3).map(item => Array.isArray(item) ? item[0] : item.name),
    verify: ["个人责任范围", "项目复杂度", "量化结果"],
    questions: [
      "请具体说明这段经历中你独立负责的工作范围。",
      "项目中最复杂的问题是什么，你采取了哪些关键行动？",
      "有哪些结果或数据能够证明这段经验？"
    ]
  };
}

async function analyzeJob(payload) {
  if (!API_KEY) return { result: demoAnalyzeJob(payload), mode: "demo" };
  const result = await callAI({
    name: "job_capability_model",
    schema: jobSchema,
    system: [
      "你是谨慎的中高端招聘研究助手。",
      "将 JD 拆解为跨行业可复用的能力模型，不要只复述关键词。",
      "只分析岗位相关要求，忽略年龄、性别、婚育、民族等敏感属性。",
      "模糊要求不得设为硬性淘汰条件。相邻经历必须体现任务或能力迁移关系。",
      "用简洁中文输出。"
    ].join("\n"),
    input: `岗位名称：${payload.title}\n行业：${payload.industry}\nJD：\n${payload.jd}\n招聘经理补充：\n${payload.note || "无"}`
  });
  return { result, mode: AI_PROVIDER, provider: AI_PROVIDER, model: MODEL };
}

async function analyzeResume(payload) {
  if (!API_KEY) return { result: demoAnalyzeResume(payload), mode: "demo" };
  const result = await callAI({
    name: "candidate_transfer_analysis",
    schema: resumeSchema,
    system: [
      "你是谨慎的中高端人才迁移识别助手。",
      "目标是扩大合理召回并控制复核成本，而不是自动淘汰或录用。",
      "事实必须来自简历原文；推断必须保守；证据不足标记为待验证。",
      "不得补造候选人的公司、技术、业绩或责任范围。",
      "不得分析年龄、性别、婚育、民族等敏感属性。",
      "ATS 命中表示简历是否出现目标岗位的直接关键词。",
      "recovered 仅在 ATS 未命中但存在可信迁移路径时为 true。",
      "coverage 是能力证据覆盖程度，不是录用概率。",
      "岗位知识包中的正向迁移规则只用于支持推断，反向风险规则用于检查误判，均不能替代简历事实。",
      "用简洁中文输出。"
    ].join("\n"),
    input: `目标岗位：\n${JSON.stringify(payload.job)}\n\n候选人简历：\n${payload.resume}`
  });
  return { result, mode: AI_PROVIDER, provider: AI_PROVIDER, model: MODEL };
}

async function handleApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, {
      ok: true,
      mode: API_KEY ? AI_PROVIDER : "demo",
      provider: API_KEY ? AI_PROVIDER : null,
      model: API_KEY ? MODEL : null
    });
  }
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const payload = await readJson(req, pathname === "/api/upload-resumes" ? MAX_UPLOAD_BODY_BYTES : MAX_BODY_BYTES);
    if (pathname === "/api/analyze-job") {
      if (!payload.title || !payload.jd) return sendJson(res, 400, { error: "岗位名称和 JD 不能为空" });
      return sendJson(res, 200, await analyzeJob(payload));
    }
    if (pathname === "/api/analyze-resume") {
      if (!payload.resume || !payload.job) return sendJson(res, 400, { error: "简历和岗位模型不能为空" });
      return sendJson(res, 200, await analyzeResume(payload));
    }
    if (pathname === "/api/upload-resumes") {
      if (!Array.isArray(payload.files) || !payload.files.length || !payload.job) {
        return sendJson(res, 400, { error: "文件和岗位模型不能为空" });
      }
      if (payload.files.length > MAX_FILES) {
        return sendJson(res, 400, { error: `单次最多上传 ${MAX_FILES} 份简历` });
      }
      const totalBytes = payload.files.reduce((sum, file) => sum + Buffer.byteLength(file.data || "", "base64"), 0);
      if (totalBytes > MAX_TOTAL_FILE_BYTES) {
        return sendJson(res, 400, { error: `单次上传总大小不得超过 ${MAX_TOTAL_FILE_BYTES / 1024 / 1024}MB` });
      }
      const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), "talentbridge-"));
      const results = [];
      try {
        for (let index = 0; index < payload.files.length; index += 1) {
          const file = payload.files[index];
          try {
            const text = await parseUploadedFile(file, directory, index);
            const analysis = await analyzeResume({ resume: text, job: payload.job });
            results.push({
              name: file.name,
              status: "success",
              mode: analysis.mode,
              model: analysis.model || null,
              resume: text,
              result: analysis.result
            });
          } catch (error) {
            results.push({ name: file?.name || `文件 ${index + 1}`, status: "error", error: error.message });
          }
        }
      } finally {
        await fs.promises.rm(directory, { recursive: true, force: true });
      }
      return sendJson(res, 200, {
        results,
        summary: {
          total: results.length,
          success: results.filter(item => item.status === "success").length,
          failed: results.filter(item => item.status === "error").length
        }
      });
    }
    return sendJson(res, 404, { error: "API not found" });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: error.message || "分析失败" });
  }
}

function serveStatic(req, res, pathname) {
  const relative = pathname === "/" ? "index.html" : decodeURIComponent(pathname.slice(1));
  const filePath = path.resolve(ROOT, relative);
  if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  }
  res.writeHead(200, {
    "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-cache"
  });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
  if (url.pathname.startsWith("/api/")) return handleApi(req, res, url.pathname);
  return serveStatic(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`TalentBridge running at http://${HOST}:${PORT}`);
  console.log(`AI mode: ${API_KEY ? `OpenAI (${MODEL})` : "demo fallback"}`);
});

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const dns = require("node:dns").promises;
const net = require("node:net");
const { spawn } = require("node:child_process");
const { URL } = require("node:url");
const industryResearchSkill = require("./industry-research-skill");

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
const RESEARCH_PAGE_BYTES = 600 * 1024;
const RESEARCH_TIMEOUT_MS = 9000;
const COMPANY_RESEARCH_TTL_MS = 24 * 60 * 60 * 1000;
const companyResearchCache = new Map();
const industryResearchPlanCache = new Map();
const wikidataEntityCache = new Map();
const wikidataRelationshipCache = new Map();
const ALLOWED_RESUME_EXTENSIONS = new Set([".pdf", ".docx", ".txt", ".md"]);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
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
    "verify", "questions", "companyContext", "comparability", "transferBoundary",
    "transferConfidence"
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
    companyContext: {
      type: "object",
      additionalProperties: false,
      required: ["companyType", "products", "technologyPlatform", "productionStage", "evidenceNote"],
      properties: {
        companyType: { type: "string" },
        products: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
        technologyPlatform: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
        productionStage: { type: "string" },
        evidenceNote: { type: "string" }
      }
    },
    comparability: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["dimension", "candidateEvidence", "targetRequirement", "judgment", "reason"],
        properties: {
          dimension: { type: "string", enum: ["任务对象", "技术机理", "问题复杂度", "量产阶段", "个人责任"] },
          candidateEvidence: { type: "string" },
          targetRequirement: { type: "string" },
          judgment: { type: "string", enum: ["可比", "部分可比", "未证实"] },
          reason: { type: "string" }
        }
      }
    },
    transferBoundary: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    transferConfidence: { type: "string", enum: ["高", "中", "低"] },
    target: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    verify: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    questions: { type: "array", minItems: 2, maxItems: 5, items: { type: "string" } }
  }
};

const sourcingKeywordSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "summary", "sampleSize", "signalDescription", "technicalKeywords",
    "productKeywords", "roleKeywords", "targetCompanies", "exclusionKeywords",
    "searchQueries", "cautions"
  ],
  properties: {
    summary: { type: "string" },
    sampleSize: { type: "integer", minimum: 1, maximum: 8 },
    signalDescription: { type: "string" },
    technicalKeywords: {
      type: "array",
      minItems: 1,
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["term", "reason", "sourceCount"],
        properties: {
          term: { type: "string" },
          reason: { type: "string" },
          sourceCount: { type: "integer", minimum: 1, maximum: 8 }
        }
      }
    },
    productKeywords: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["term", "reason", "sourceCount"],
        properties: {
          term: { type: "string" },
          reason: { type: "string" },
          sourceCount: { type: "integer", minimum: 1, maximum: 8 }
        }
      }
    },
    roleKeywords: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["term", "reason", "sourceCount"],
        properties: {
          term: { type: "string" },
          reason: { type: "string" },
          sourceCount: { type: "integer", minimum: 1, maximum: 8 }
        }
      }
    },
    targetCompanies: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["company", "reason", "sourceCount"],
        properties: {
          company: { type: "string" },
          reason: { type: "string" },
          sourceCount: { type: "integer", minimum: 1, maximum: 8 }
        }
      }
    },
    exclusionKeywords: {
      type: "array",
      minItems: 0,
      maxItems: 6,
      items: { type: "string" }
    },
    searchQueries: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["label", "query", "usage"],
        properties: {
          label: { type: "string" },
          query: { type: "string" },
          usage: { type: "string" }
        }
      }
    },
    cautions: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      items: { type: "string" }
    }
  }
};

const companyResearchSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "status", "summary", "researchFocus", "operatingStructure", "resolvedEntities", "industryPosition", "valueChainRole", "businessModel",
    "customerMarkets", "operatingStage", "products", "technologies", "technologyEvidence",
    "industryBenchmarks", "researchMap", "criticalChokepoints", "verificationGates",
    "narrativeChecks", "sourceAssessment", "fit", "fitReasons", "jdMapping", "hrInsights", "gaps", "sourceIds"
  ],
  properties: {
    status: { type: "string", enum: ["researched", "insufficient"] },
    summary: { type: "string" },
    researchFocus: {
      type: "object",
      additionalProperties: false,
      required: ["primaryEntity", "whyPrimary", "employmentLink", "sourceIds"],
      properties: {
        primaryEntity: { type: "string" },
        whyPrimary: { type: "string" },
        employmentLink: { type: "string", enum: ["已确认", "高度相关但未确认", "未确认"] },
        sourceIds: { type: "array", minItems: 1, maxItems: 4, items: { type: "integer", minimum: 1, maximum: 12 } }
      }
    },
    operatingStructure: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "type", "businessRole", "relationshipToInput", "priority", "sourceIds"],
        properties: {
          name: { type: "string" },
          type: { type: "string", enum: ["集团", "法律主体", "业务单元", "产品平台", "品牌"] },
          businessRole: { type: "string" },
          relationshipToInput: { type: "string" },
          priority: { type: "string", enum: ["重点研究", "相关背景", "仅组织背景"] },
          sourceIds: { type: "array", minItems: 1, maxItems: 4, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    resolvedEntities: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "relationship", "businessRole", "sourceIds"],
        properties: {
          name: { type: "string" },
          relationship: { type: "string" },
          businessRole: { type: "string" },
          sourceIds: { type: "array", minItems: 1, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    industryPosition: { type: "string" },
    valueChainRole: { type: "string" },
    businessModel: { type: "string" },
    customerMarkets: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    operatingStage: { type: "string" },
    products: { type: "array", minItems: 1, maxItems: 5, items: { type: "string" } },
    technologies: { type: "array", minItems: 1, maxItems: 6, items: { type: "string" } },
    technologyEvidence: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["technology", "evidence", "sourceIds"],
        properties: {
          technology: { type: "string" },
          evidence: { type: "string" },
          sourceIds: { type: "array", minItems: 1, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    industryBenchmarks: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["topic", "benchmark", "companyComparison", "sourceIds"],
        properties: {
          topic: { type: "string" },
          benchmark: { type: "string" },
          companyComparison: { type: "string" },
          sourceIds: { type: "array", minItems: 1, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    researchMap: {
      type: "object",
      additionalProperties: false,
      required: ["demandDriver", "valueChainPath", "candidateCompanyPosition", "openQuestions"],
      properties: {
        demandDriver: { type: "string" },
        valueChainPath: { type: "array", minItems: 2, maxItems: 8, items: { type: "string" } },
        candidateCompanyPosition: { type: "string" },
        openQuestions: { type: "array", minItems: 1, maxItems: 6, items: { type: "string" } }
      }
    },
    criticalChokepoints: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["node", "whyCritical", "companyExposure", "verificationStatus", "sourceIds"],
        properties: {
          node: { type: "string" },
          whyCritical: { type: "string" },
          companyExposure: { type: "string" },
          verificationStatus: { type: "string", enum: ["已验证", "部分验证", "未验证"] },
          sourceIds: { type: "array", minItems: 0, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    verificationGates: {
      type: "array",
      minItems: 2,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "judgment", "evidence", "sourceIds"],
        properties: {
          question: { type: "string" },
          judgment: { type: "string", enum: ["通过", "部分通过", "未验证"] },
          evidence: { type: "string" },
          sourceIds: { type: "array", minItems: 0, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    narrativeChecks: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["claim", "evidenceStatus", "correction", "sourceIds"],
        properties: {
          claim: { type: "string" },
          evidenceStatus: { type: "string", enum: ["有证据", "部分证据", "无证据"] },
          correction: { type: "string" },
          sourceIds: { type: "array", minItems: 0, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    sourceAssessment: {
      type: "object",
      additionalProperties: false,
      required: ["primarySources", "independentSources", "industrySources", "confidence"],
      properties: {
        primarySources: { type: "integer", minimum: 0, maximum: 12 },
        independentSources: { type: "integer", minimum: 0, maximum: 12 },
        industrySources: { type: "integer", minimum: 0, maximum: 12 },
        confidence: { type: "string", enum: ["高", "中", "低"] }
      }
    },
    fit: { type: "string", enum: ["高", "中", "低", "信息不足"] },
    fitReasons: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
    jdMapping: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["requirement", "companyEvidence", "relevance", "reason", "sourceIds"],
        properties: {
          requirement: { type: "string" },
          companyEvidence: { type: "string" },
          relevance: { type: "string", enum: ["直接相关", "相邻相关", "仅行业相关", "未证实"] },
          reason: { type: "string" },
          sourceIds: { type: "array", minItems: 1, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 12 } }
        }
      }
    },
    hrInsights: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
    gaps: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
    sourceIds: { type: "array", minItems: 1, maxItems: 8, items: { type: "integer", minimum: 1, maximum: 12 } }
  }
};

const industryResearchPlanSchema = {
  type: "object",
  additionalProperties: false,
  required: ["industry", "coreTerms", "englishTerms", "valueChainTerms", "entityTerms", "academicQueries", "industryQueries"],
  properties: {
    industry: { type: "string" },
    coreTerms: { type: "array", minItems: 3, maxItems: 12, items: { type: "string" } },
    englishTerms: { type: "array", minItems: 3, maxItems: 12, items: { type: "string" } },
    valueChainTerms: { type: "array", minItems: 3, maxItems: 10, items: { type: "string" } },
    entityTerms: { type: "array", minItems: 3, maxItems: 10, items: { type: "string" } },
    academicQueries: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
    industryQueries: { type: "array", minItems: 2, maxItems: 6, items: { type: "string" } }
  }
};

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchResearchResource(url, accept, attempts = 3) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await fetchWithLimit(url, accept);
    } catch (error) {
      lastError = error;
      if (!/(?:429|500|502|503|504|fetch failed|aborted)/i.test(error.message) || attempt === attempts - 1) throw error;
      await wait(500 * (2 ** attempt));
    }
  }
  throw lastError;
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

function decodeHtml(value) {
  const entities = {
    amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: " "
  };
  return String(value || "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] || match);
}

function stripHtml(html) {
  return decodeHtml(String(html || "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function isPrivateIp(address) {
  if (net.isIPv4(address)) {
    const parts = address.split(".").map(Number);
    return parts[0] === 10
      || parts[0] === 127
      || (parts[0] === 169 && parts[1] === 254)
      || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
      || (parts[0] === 192 && parts[1] === 168)
      || parts[0] === 0;
  }
  if (net.isIPv6(address)) {
    const normalized = address.toLowerCase();
    return normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe80:");
  }
  return true;
}

async function assertPublicUrl(value) {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("仅允许公网 HTTP(S) 来源");
  if (["localhost", "127.0.0.1", "::1"].includes(url.hostname.toLowerCase())) throw new Error("不允许访问本机地址");
  const addresses = await dns.lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some(item => isPrivateIp(item.address))) throw new Error("不允许访问内网地址");
  return url;
}

async function fetchWithLimit(url, accept = "text/html,application/xhtml+xml") {
  let safeUrl = await assertPublicUrl(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RESEARCH_TIMEOUT_MS);
  try {
    let response;
    for (let redirectCount = 0; redirectCount <= 4; redirectCount += 1) {
      response = await fetch(safeUrl, {
        redirect: "manual",
        signal: controller.signal,
        headers: {
        "User-Agent": "TalentBridge/0.2 (+company research)",
          "Accept": accept,
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.7"
        }
      });
      if (![301, 302, 303, 307, 308].includes(response.status)) break;
      const location = response.headers.get("location");
      if (!location) throw new Error("重定向缺少目标地址");
      safeUrl = await assertPublicUrl(new URL(location, safeUrl).toString());
    }
    if (!response.ok) throw new Error(`来源返回 ${response.status}`);
    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > RESEARCH_PAGE_BYTES) throw new Error("来源页面过大");
    const reader = response.body.getReader();
    const chunks = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > RESEARCH_PAGE_BYTES) {
        await reader.cancel();
        throw new Error("来源页面超过读取限制");
      }
      chunks.push(value);
    }
    const buffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
    const charset = response.headers.get("content-type")?.match(/charset=([^;\s]+)/i)?.[1]?.replace(/["']/g, "") || "utf-8";
    let text;
    try {
      text = new TextDecoder(charset).decode(buffer);
    } catch {
      text = buffer.toString("utf8");
    }
    return {
      url: response.url,
      type: response.headers.get("content-type") || "",
      text
    };
  } finally {
    clearTimeout(timer);
  }
}

function parseBingRss(xml) {
  const items = [...String(xml).matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  return items.map(match => {
    const item = match[1];
    return {
      title: decodeHtml(item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").trim(),
      url: decodeHtml(item.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "").trim(),
      description: stripHtml(item.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || "")
    };
  }).filter(item => item.url);
}

function parseDuckDuckGoHtml(html) {
  const source = String(html);
  const anchors = [...source.matchAll(/<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  return anchors.map(anchor => {
    const rawUrl = decodeHtml(anchor[1]);
    let url;
    try {
      const redirect = new URL(rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl, "https://duckduckgo.com");
      url = redirect.searchParams.get("uddg") || redirect.toString();
    } catch {
      return null;
    }
    const following = source.slice(anchor.index + anchor[0].length, anchor.index + anchor[0].length + 3500);
    const description = following.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/(?:a|div)>/i)?.[1] || "";
    return {
      title: stripHtml(anchor[2]),
      url,
      description: stripHtml(description)
    };
  }).filter(Boolean);
}

function researchKeywords(job) {
  const modelTerms = (job.model || []).map(item => Array.isArray(item) ? item[0] : item.name);
  return [...new Set([job.title, job.businessContext, ...(job.adjacent || []), ...modelTerms])]
    .flatMap(item => String(item || "").split(/[、/，,\s]+/))
    .filter(item => item.length >= 2)
    .slice(0, 8);
}

function companyNameVariants(company, researchPlan = null) {
  const original = String(company || "").trim();
  const suffixes = [
    "有限责任公司", "股份有限公司", "技术股份有限公司", "科技股份有限公司",
    "技术有限公司", "科技有限公司", "集团有限公司", "控股有限公司",
    "有限公司", "股份公司", "集团", "公司"
  ];
  const variants = [original];
  let shortened = original.replace(/[（(].*?[）)]/g, "").trim();
  let changed = true;
  while (changed && shortened) {
    changed = false;
    for (const suffix of suffixes) {
      if (shortened.endsWith(suffix) && shortened.length > suffix.length + 1) {
        shortened = shortened.slice(0, -suffix.length).trim();
        variants.push(shortened);
        changed = true;
        break;
      }
    }
  }
  const businessTerms = [
    ...(researchPlan?.coreTerms || []),
    ...(researchPlan?.entityTerms || []),
    ...(researchPlan?.valueChainTerms || []),
    String(researchPlan?.industry || "")
  ].flatMap(item => String(item).split(/[、/，,\s·]+/))
    .filter(item => item.length >= 2)
    .sort((a, b) => b.length - a.length);
  for (const term of businessTerms) {
    for (const variant of [...variants]) {
      if (variant.endsWith(term) && variant.length >= term.length + 2) {
        variants.push(variant.slice(0, -term.length).trim());
      }
    }
  }
  const researchText = JSON.stringify(researchPlan || {});
  for (const variant of [...variants]) {
    const maxSuffixLength = Math.min(8, variant.length - 2);
    for (let length = maxSuffixLength; length >= 2; length -= 1) {
      const suffix = variant.slice(-length);
      if (researchText.includes(suffix)) {
        variants.push(variant.slice(0, -length).trim());
        break;
      }
    }
  }
  return [...new Set(variants.filter(item => item.length >= 2))];
}

function fallbackIndustryResearchPlan(job) {
  const coreTerms = researchKeywords(job);
  const englishTerms = researchEnglishTerms(job).split(/\s+/).filter(item => item.length >= 3);
  return {
    industry: String(job.industry || job.title || "未说明行业"),
    coreTerms,
    englishTerms,
    valueChainTerms: ["上游", "中游", "下游", "产品", "客户", "供应商", "制造", "服务"],
    entityTerms: [...coreTerms, ...englishTerms].slice(0, 10),
    academicQueries: [[job.industry, job.title, ...englishTerms].filter(Boolean).join(" ")],
    industryQueries: [
      `${job.industry || job.title} 产业链 市场格局`,
      `${job.industry || job.title} 技术路线 商业模式`
    ]
  };
}

async function buildIndustryResearchPlan(job) {
  const fallback = fallbackIndustryResearchPlan(job);
  const cacheKey = JSON.stringify([job.title, job.industry, job.jdText, job.businessContext, job.userContext, job.model, job.adjacent]);
  const cached = industryResearchPlanCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < COMPANY_RESEARCH_TTL_MS) return cached.plan;
  if (!API_KEY) return fallback;
  try {
    const plan = await callAI({
      name: "industry_research_plan",
      schema: industryResearchPlanSchema,
      system: [
        "你是跨行业研究规划器，根据目标 JD、能力模型和 HR 的业务理解设计检索计划，不研究任何具体公司。",
        "识别该岗位所属行业、核心产品/技术/业务术语、产业链角色和可能出现的集团/子公司业务描述。",
        "HR 的业务理解可能通俗、碎片或笼统，可用于补充产品与技术检索方向，但不是公司事实。",
        "生成适合公开网页与学术数据库检索的中英文关键词；不要局限于输入中的原词，要补充同义词、上位词和专业术语。",
        "该方法必须适用于制造、互联网、金融、医药、消费、能源、专业服务等不同行业。",
        "不输出公司事实，不判断候选人，不使用具体公司名称。"
      ].join("\n"),
      input: JSON.stringify({
        title: job.title,
        industry: job.industry,
        jdText: job.jdText,
        businessContext: job.businessContext,
        userContext: job.userContext,
        model: job.model,
        adjacent: job.adjacent
      })
    });
    industryResearchPlanCache.set(cacheKey, { cachedAt: Date.now(), plan });
    return plan;
  } catch (error) {
    console.warn("Industry research plan fallback:", error.message);
    return fallback;
  }
}

function companySearchSignals(company) {
  const core = String(company)
    .replace(/(?:有限责任公司|股份有限公司|有限公司|控股集团|集团|公司|企业)$/g, "")
    .replace(/\s+/g, "");
  const ignored = new Set(["中国", "台湾", "科技", "技术", "集团", "公司", "股份", "有限"]);
  const signals = [];
  if (/[\u3400-\u9fff]/.test(core)) {
    for (let index = 0; index < core.length - 1; index += 1) {
      const pair = core.slice(index, index + 2);
      if (!ignored.has(pair)) signals.push(pair);
    }
  }
  signals.push(...core.toLowerCase().split(/[^a-z0-9]+/).filter(item => item.length >= 3));
  return [...new Set(signals)];
}

function searchResultMatchesCompany(result, company) {
  const haystack = `${result.title} ${result.description} ${result.url}`.toLowerCase();
  const signals = companySearchSignals(company);
  return !signals.length || signals.some(signal => haystack.includes(signal.toLowerCase()));
}

function entityMatchesResearch(entity, job, researchPlan) {
  const haystack = [
    entity.labels?.zh?.value,
    entity.labels?.en?.value,
    entity.descriptions?.zh?.value,
    entity.descriptions?.en?.value,
    ...(entity.aliases?.zh || []).map(item => item.value),
    ...(entity.aliases?.en || []).map(item => item.value)
  ].filter(Boolean).join(" ").toLowerCase();
  const terms = [
    ...(researchPlan?.coreTerms || researchKeywords(job)),
    ...(researchPlan?.englishTerms || []),
    ...(researchPlan?.entityTerms || []),
    ...(researchPlan?.valueChainTerms || []),
    job.industry
  ].filter(Boolean).flatMap(item => String(item).toLowerCase().split(/[、/，,\s]+/)).filter(item => item.length >= 2);
  return terms.some(term => haystack.includes(term));
}

async function fetchWikidataEntity(id) {
  if (wikidataEntityCache.has(id)) return wikidataEntityCache.get(id);
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${encodeURIComponent(id)}.json`;
  const response = await fetchResearchResource(url, "application/json");
  const entity = JSON.parse(response.text).entities?.[id] || null;
  if (entity) wikidataEntityCache.set(id, entity);
  return entity;
}

async function fetchWikidataEntities(ids) {
  const uniqueIds = [...new Set(ids)].filter(Boolean).slice(0, 50);
  if (!uniqueIds.length) return {};
  const result = {};
  const missingIds = [];
  uniqueIds.forEach(id => {
    if (wikidataEntityCache.has(id)) result[id] = wikidataEntityCache.get(id);
    else missingIds.push(id);
  });
  if (!missingIds.length) return result;
  const url = [
    "https://www.wikidata.org/w/api.php?action=wbgetentities",
    `ids=${encodeURIComponent(missingIds.join("|"))}`,
    "props=labels%7Cdescriptions%7Caliases%7Cclaims%7Csitelinks",
    "languages=zh%7Cen",
    "format=json",
    "origin=*"
  ].join("&");
  const response = await fetchResearchResource(url, "application/json");
  const fetched = JSON.parse(response.text).entities || {};
  Object.entries(fetched).forEach(([id, entity]) => {
    wikidataEntityCache.set(id, entity);
    result[id] = entity;
  });
  return result;
}

function wikidataLinkedEntityIds(entity) {
  const relationships = [
    ["P355", "子公司"],
    ["P749", "母公司"],
    ["P527", "组成部分"],
    ["P463", "成员组织"]
  ];
  return relationships.flatMap(([property, relationship]) => (
    (entity.claims?.[property] || []).map(claim => ({
      id: claim.mainsnak?.datavalue?.value?.id,
      relationship
    })).filter(item => item.id)
  )).slice(0, 20);
}

async function wikidataReverseLinkedEntityIds(entityId) {
  if (wikidataRelationshipCache.has(entityId)) return wikidataRelationshipCache.get(entityId);
  const query = [
    "SELECT DISTINCT ?item ?relationship WHERE {",
    `  { ?item wdt:P749 wd:${entityId} . BIND("子公司" AS ?relationship) }`,
    `  UNION { ?item wdt:P361 wd:${entityId} . BIND("组成部分" AS ?relationship) }`,
    "} LIMIT 50"
  ].join("\n");
  try {
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}&format=json`;
    const response = await fetchResearchResource(url, "application/sparql-results+json,application/json");
    const data = JSON.parse(response.text);
    const relationships = (data.results?.bindings || []).map(binding => ({
      id: binding.item?.value?.split("/").pop(),
      relationship: binding.relationship?.value || "关联主体"
    })).filter(item => item.id);
    wikidataRelationshipCache.set(entityId, relationships);
    return relationships;
  } catch (error) {
    console.warn("Wikidata reverse relationship lookup failed:", error.message);
    return [];
  }
}

async function entitySourceBundle(entity, entityId, relationship, job, researchPlan) {
  const label = entity.labels?.zh?.value || entity.labels?.en?.value || entityId;
  const description = entity.descriptions?.zh?.value || entity.descriptions?.en?.value || "";
  const aliases = [...(entity.aliases?.zh || []), ...(entity.aliases?.en || [])].map(item => item.value).slice(0, 10);
  const sources = [{
    title: `${label} · Wikidata`,
    url: `https://www.wikidata.org/wiki/${entityId}`,
    domain: "wikidata.org",
    content: `关联主体：${label}。与简历企业关系：${relationship}。业务描述：${description || "未提供"}。别名：${aliases.join("、") || "未提供"}。`,
    evidenceLevel: "结构化知识",
    sourceCategory: "实体识别"
  }];
  const pageCandidates = [];
  const officialUrl = entity.claims?.P856?.[0]?.mainsnak?.datavalue?.value;
  if (officialUrl) {
    pageCandidates.push({
      title: `${label}官方网站`,
      url: officialUrl,
      description: `${label}的 Wikidata 官方网站字段`,
      evidenceLevel: "企业官网"
    });
  }
  const names = [label, ...(entity.aliases?.zh || []).map(item => item.value), ...(entity.aliases?.en || []).map(item => item.value)]
    .filter(Boolean).slice(0, 6);
  return { sources, pageCandidates, names, relationship, relevant: entityMatchesResearch(entity, job, researchPlan) };
}

function classifyResearchSource(url, requestedLevel = "") {
  const host = new URL(url).hostname.toLowerCase();
  if (requestedLevel === "企业官网") return { evidenceLevel: "企业官网", sourceCategory: "公司一手资料" };
  if (requestedLevel === "行业研究") return { evidenceLevel: "行业资料", sourceCategory: "行业参照" };
  if (/(?:sec\.gov|cninfo\.com\.cn|sse\.com\.cn|szse\.cn|hkexnews\.hk|twse\.com\.tw|mops\.twse\.com\.tw)$/.test(host)) {
    return { evidenceLevel: "监管披露", sourceCategory: "公司一手资料" };
  }
  if (/(?:ieee\.org|semiengineering\.com|semi\.org|imec-int\.com|nature\.com|sciencedirect\.com|springer\.com)$/.test(host)) {
    return { evidenceLevel: "专业技术资料", sourceCategory: "行业参照" };
  }
  if (/(?:reuters\.com|bloomberg\.com|ft\.com|wsj\.com|nikkei\.com|caixin\.com)$/.test(host)) {
    return { evidenceLevel: "独立媒体", sourceCategory: "外部核验" };
  }
  return { evidenceLevel: "网页正文", sourceCategory: "外部核验" };
}

async function searchResearchWeb(queries) {
  const discoveredGroups = await Promise.all(queries.map(async query => {
    const results = [];
    try {
      const response = await fetchWithLimit(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, "text/html");
      results.push(...parseDuckDuckGoHtml(response.text));
    } catch (error) {
      console.warn("DuckDuckGo research search failed:", error.message);
    }
    if (!results.length) {
      try {
        const response = await fetchWithLimit(`https://www.bing.com/search?q=${encodeURIComponent(query)}&format=rss`, "application/rss+xml,application/xml,text/xml");
        results.push(...parseBingRss(response.text));
      } catch (error) {
        console.warn("Bing research search failed:", error.message);
      }
    }
    return results;
  }));
  const unique = new Map();
  discoveredGroups.flat().forEach(item => {
    if (!unique.has(item.url)) unique.set(item.url, item);
  });
  return [...unique.values()];
}

function relatedEntityDiscoveryTerms(job, researchPlan) {
  return [...new Set([
    ...(researchPlan?.entityTerms || []),
    ...(researchPlan?.coreTerms || []),
    ...(researchPlan?.englishTerms || []),
    String(job?.industry || ""),
    String(job?.title || "")
  ].map(item => String(item).trim()).filter(item => item.length >= 2))].slice(0, 8);
}

async function discoverRelatedBusinessEntityPages(company, job, researchPlan, entityNames = [company]) {
  const baseNames = [...new Set([
    ...companyNameVariants(company, researchPlan),
    ...entityNames
  ].filter(Boolean))].slice(0, 2);
  const terms = relatedEntityDiscoveryTerms(job, researchPlan);
  const focusText = terms.slice(0, 3).join(" ");
  const queries = baseNames.flatMap(name => [
    `"${name}" 子公司 事业部 品牌 ${focusText}`,
    `"${name}" subsidiary business unit brand ${focusText}`
  ]);
  const results = await searchResearchWeb(queries);
  const blockedHosts = /(?:bing|baidu|google|duckduckgo|facebook|linkedin|zhihu|weibo|bilibili)\./i;
  return results.filter(item => {
    try {
      if (blockedHosts.test(new URL(item.url).hostname)) return false;
      const text = `${item.title || ""} ${item.description || ""}`.toLowerCase();
      const baseMatch = baseNames.some(name => text.includes(String(name).toLowerCase()));
      return baseMatch;
    } catch {
      return false;
    }
  }).slice(0, 8).map(item => ({
    ...item,
    evidenceLevel: "关联主体检索"
  }));
}

async function discoverWikipediaCompanySources(company, researchPlan) {
  for (const variant of companyNameVariants(company, researchPlan)) {
    try {
      const searchUrl = `https://zh.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(variant)}&gsrlimit=3&prop=extracts%7Cinfo&explaintext=1&inprop=url&format=json&origin=*`;
      const response = await fetchResearchResource(searchUrl, "application/json");
      const data = JSON.parse(response.text);
      const pages = Object.values(data.query?.pages || {})
        .filter(page => page.extract && (page.title.includes(variant) || variant.includes(page.title)))
        .sort((a, b) => (b.extract?.length || 0) - (a.extract?.length || 0));
      if (!pages.length) continue;
      const page = pages[0];
      return [{
        title: `${page.title} · Wikipedia`,
        url: page.fullurl || `https://zh.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`,
        domain: "zh.wikipedia.org",
        content: page.extract.slice(0, 12000),
        evidenceLevel: "百科正文",
        sourceCategory: "外部核验"
      }];
    } catch (error) {
      console.warn("Wikipedia company discovery failed:", error.message);
    }
  }
  return [];
}

async function discoverStructuredCompanySources(company, job, researchPlan) {
  const directSources = [];
  const pageCandidates = [];
  const entityNames = [company];
  const resolvedEntities = [];
  let officialHost = "";
  try {
    let entityHit = null;
    for (const variant of companyNameVariants(company, researchPlan)) {
      const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(variant)}&language=zh&uselang=zh&limit=5&format=json&origin=*`;
      const searchResponse = await fetchResearchResource(searchUrl, "application/json");
      const searchData = JSON.parse(searchResponse.text);
      entityHit = searchData.search?.[0] || null;
      if (entityHit) break;
    }
    if (!entityHit?.id) return { directSources, pageCandidates, entityNames, resolvedEntities };

    const entity = await fetchWikidataEntity(entityHit.id);
    if (!entity) return { directSources, pageCandidates, entityNames, resolvedEntities };

    const label = entity.labels?.zh?.value || entity.labels?.en?.value || entityHit.label || company;
    const description = entity.descriptions?.zh?.value || entity.descriptions?.en?.value || entityHit.description || "";
    const aliases = [...(entity.aliases?.zh || []), ...(entity.aliases?.en || [])].map(item => item.value).slice(0, 10);
    entityNames.push(label, ...aliases);
    resolvedEntities.push({ name: label, relationship: "简历所列主体", businessRole: description || "公开描述不足" });
    directSources.push({
      title: `${label} · Wikidata`,
      url: `https://www.wikidata.org/wiki/${entityHit.id}`,
      domain: "wikidata.org",
      content: `企业名称：${label}。企业描述：${description || "未提供"}。别名：${aliases.join("、") || "未提供"}。`,
      evidenceLevel: "结构化知识",
      sourceCategory: "实体识别"
    });

    const officialUrl = entity.claims?.P856?.[0]?.mainsnak?.datavalue?.value;
    if (officialUrl) {
      officialHost = new URL(officialUrl).hostname.replace(/^www\./, "");
      pageCandidates.push({
        title: `${label}官方网站`,
        url: officialUrl,
        description: `${label}的 Wikidata 官方网站字段`,
        evidenceLevel: "企业官网"
      });
    }

    const linkedIds = [
      ...wikidataLinkedEntityIds(entity),
      ...(await wikidataReverseLinkedEntityIds(entityHit.id))
    ];
    const uniqueLinkedIds = new Map();
    linkedIds.forEach(linked => {
      if (!uniqueLinkedIds.has(linked.id)) uniqueLinkedIds.set(linked.id, linked);
    });
    const linkedValues = [...uniqueLinkedIds.values()].slice(0, 50);
    let linkedEntityMap = {};
    try {
      linkedEntityMap = await fetchWikidataEntities(linkedValues.map(item => item.id));
    } catch (error) {
      console.warn("Related entity batch lookup failed:", error.message);
    }
    const linkedEntities = await Promise.all(linkedValues.map(linked => {
      const linkedEntity = linkedEntityMap[linked.id];
      return linkedEntity ? entitySourceBundle(linkedEntity, linked.id, linked.relationship, job, researchPlan) : null;
    }));
    linkedEntities.filter(bundle => bundle?.relevant).slice(0, 4).forEach(bundle => {
      directSources.push(...bundle.sources);
      pageCandidates.push(...bundle.pageCandidates);
      entityNames.push(...bundle.names);
      resolvedEntities.push({
        name: bundle.names[0],
        relationship: bundle.relationship,
        businessRole: bundle.sources[0].content.match(/业务描述：(.+?)。别名：/)?.[1] || "公开描述不足"
      });
    });

    const wikiSite = entity.sitelinks?.zhwiki || entity.sitelinks?.enwiki;
    if (wikiSite?.title) {
      const language = entity.sitelinks?.zhwiki ? "zh" : "en";
      const wikiApi = `https://${language}.wikipedia.org/w/api.php?action=query&prop=extracts%7Cinfo&explaintext=1&inprop=url&titles=${encodeURIComponent(wikiSite.title)}&format=json&origin=*`;
      const wikiResponse = await fetchResearchResource(wikiApi, "application/json");
      const wikiData = JSON.parse(wikiResponse.text);
      const page = Object.values(wikiData.query?.pages || {})[0];
      if (page?.extract) {
        directSources.push({
          title: `${page.title} · Wikipedia`,
          url: page.fullurl || `https://${language}.wikipedia.org/wiki/${encodeURIComponent(wikiSite.title.replace(/ /g, "_"))}`,
          domain: `${language}.wikipedia.org`,
          content: page.extract.slice(0, 12000),
          evidenceLevel: "百科正文",
          sourceCategory: "外部核验"
        });
      }
    }
  } catch (error) {
    console.warn("Structured company discovery failed:", error.message);
  }
  return { directSources, pageCandidates, officialHost, entityNames: [...new Set(entityNames)], resolvedEntities };
}

async function discoverCompanyPages(company, job, researchPlan, officialHost = "", entityNames = [company]) {
  const keywordText = [...(researchPlan.coreTerms || []), ...(researchPlan.englishTerms || [])].slice(0, 8).join(" ");
  const researchNames = [...new Set(entityNames)].slice(0, 5);
  const queries = [
    ...researchNames.flatMap(name => [
      `"${name}" 产品 技术 业务`,
      `"${name}" ${keywordText}`
    ]),
    `"${company}" 产业链 客户 应用 业务`,
    `"${company}" 年报 技术 平台 制造 量产`,
    ...(officialHost ? [
      `site:${officialHost} ${keywordText} technology product`,
      `site:${officialHost} annual report investor technology`
    ] : [])
  ];
  const discovered = await searchResearchWeb(queries);
  const blockedHosts = /(?:bing|baidu|google|duckduckgo|facebook|linkedin|zhihu|weibo|bilibili)\./i;
  return discovered.filter(item => {
    try {
      const url = new URL(item.url);
      return !blockedHosts.test(url.hostname) && researchNames.some(name => searchResultMatchesCompany(item, name));
    } catch {
      return false;
    }
  }).map(item => {
    try {
      const host = new URL(item.url).hostname.replace(/^www\./, "");
      return officialHost && (host === officialHost || host.endsWith(`.${officialHost}`))
        ? { ...item, evidenceLevel: "企业官网" }
        : item;
    } catch {
      return item;
    }
  }).slice(0, 10);
}

function openAlexAbstract(invertedIndex) {
  if (!invertedIndex || typeof invertedIndex !== "object") return "";
  const words = [];
  Object.entries(invertedIndex).forEach(([word, positions]) => {
    positions.forEach(position => {
      words[position] = word;
    });
  });
  return words.filter(Boolean).join(" ");
}

function researchEnglishTerms(job) {
  const text = `${job.industry || ""} ${job.title || ""} ${researchKeywords(job).join(" ")}`;
  const dictionary = [
    [/半导体|芯片/g, "semiconductor"],
    [/先进封装|封装/g, "advanced packaging"],
    [/晶圆/g, "wafer"],
    [/键合/g, "bonding"],
    [/人工智能|AI/gi, "artificial intelligence"],
    [/新能源/g, "new energy"],
    [/汽车/g, "automotive"],
    [/电池/g, "battery"],
    [/光伏/g, "photovoltaic"],
    [/机器人/g, "robotics"],
    [/医药|制药/g, "pharmaceutical"],
    [/金融/g, "financial technology"],
    [/软件|SaaS/gi, "software as a service"]
  ];
  return [...new Set(dictionary.filter(([pattern]) => pattern.test(text)).map(([, term]) => term))].join(" ");
}

async function discoverOpenAlexIndustrySources(job, researchPlan) {
  const queries = (researchPlan.academicQueries || []).filter(Boolean);
  if (!queries.length) return [];
  try {
    const groups = await Promise.all(queries.map(async query => {
      const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&filter=from_publication_date:2018-01-01&sort=relevance_score:desc&per-page=4`;
      const response = await fetchWithLimit(url, "application/json");
      return JSON.parse(response.text).results || [];
    }));
    const uniqueWorks = new Map();
    groups.flat().forEach(work => {
      if (!uniqueWorks.has(work.id)) uniqueWorks.set(work.id, work);
    });
    const focusTerms = [...(researchPlan.englishTerms || []), ...(researchPlan.coreTerms || [])]
      .flatMap(item => String(item).toLowerCase().split(/\s+/))
      .filter(term => term.length >= 4 && !["with", "service", "energy"].includes(term));
    return [...uniqueWorks.values()].map(work => {
      const abstract = openAlexAbstract(work.abstract_inverted_index);
      const venue = work.primary_location?.source?.display_name || "";
      const topics = (work.topics || []).slice(0, 4).map(item => item.display_name).filter(Boolean);
      const keywords = (work.keywords || []).slice(0, 6).map(item => item.display_name).filter(Boolean);
      const relevanceText = `${work.title || ""} ${topics.join(" ")} ${keywords.join(" ")}`.toLowerCase();
      const relevanceMatches = focusTerms.filter(term => relevanceText.includes(term)).length;
      const content = [
        work.title,
        abstract,
        topics.length ? `研究主题：${topics.join("、")}` : "",
        keywords.length ? `关键词：${keywords.join("、")}` : "",
        venue ? `发表来源：${venue}` : "",
        work.publication_year ? `发表年份：${work.publication_year}` : "",
        Number.isFinite(work.cited_by_count) ? `被引用次数：${work.cited_by_count}` : ""
      ].filter(Boolean).join("。");
      return {
        title: `${work.title} · OpenAlex`,
        url: work.doi || work.id,
        domain: work.doi ? "doi.org" : "openalex.org",
        content: content.slice(0, 5000),
        evidenceLevel: "学术技术资料",
        sourceCategory: "行业参照",
        relevanceMatches
      };
    }).filter(item => item.content.length >= 50 && (!focusTerms.length || item.relevanceMatches >= Math.min(2, focusTerms.length)))
      .map(({ relevanceMatches, ...item }) => item)
      .slice(0, 4);
  } catch (error) {
    console.warn("OpenAlex industry research failed:", error.message);
    return [];
  }
}

async function discoverIndustryPages(job, researchPlan) {
  const terms = researchPlan.coreTerms || researchKeywords(job);
  const industry = String(job.industry || job.title || "").trim();
  const topic = terms.slice(0, 4).join(" ");
  const queries = [...(researchPlan.industryQueries || []),
    `"${industry}" 产业链 市场格局 竞争格局`,
    `"${industry}" 技术路线 量产 工艺 趋势`,
    `"${topic}" 行业报告 技术 对比`,
    `"${job.title || industry}" 上下游 客户 应用`
  ];
  const blockedHosts = /(?:bing|baidu|google|duckduckgo|facebook|linkedin|zhihu|weibo|bilibili)\./i;
  return (await searchResearchWeb(queries)).filter(item => {
    try {
      return !blockedHosts.test(new URL(item.url).hostname);
    } catch {
      return false;
    }
  }).map(item => ({ ...item, evidenceLevel: "行业研究" })).slice(0, 8);
}

async function collectCompanySources(company, job, researchPlan) {
  const [structured, wikipediaSources] = await Promise.all([
    discoverStructuredCompanySources(company, job, researchPlan),
    discoverWikipediaCompanySources(company, researchPlan)
  ]);
  const [relatedEntityPages, companyPages, industryPages, academicSources] = await Promise.all([
    discoverRelatedBusinessEntityPages(company, job, researchPlan, structured.entityNames),
    discoverCompanyPages(company, job, researchPlan, structured.officialHost, structured.entityNames),
    discoverIndustryPages(job, researchPlan),
    discoverOpenAlexIndustrySources(job, researchPlan)
  ]);
  const results = [...structured.pageCandidates, ...relatedEntityPages, ...companyPages, ...industryPages];
  const sources = [...structured.directSources, ...wikipediaSources, ...academicSources.slice(0, 2)]
    .slice(0, 12)
    .map((source, index) => ({ ...source, id: index + 1 }));
  const seenFinalUrls = new Set(sources.map(source => source.url));
  const fetchedSources = await Promise.all(results.slice(0, 16).map(async result => {
    const classification = classifyResearchSource(result.url, result.evidenceLevel);
    try {
      const page = await fetchWithLimit(result.url);
      if (!page.type.includes("html") && !page.type.includes("text")) return null;
      const title = decodeHtml(page.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || new URL(page.url).hostname)
        .replace(/\s+/g, " ").trim();
      const content = stripHtml(page.text);
      if (content.length < 180) throw new Error("来源正文过短");
      return {
        title: title.slice(0, 160),
        url: page.url,
        domain: new URL(page.url).hostname,
        content: content.slice(0, 5000),
        evidenceLevel: classification.evidenceLevel,
        sourceCategory: classification.sourceCategory
      };
    } catch (error) {
      console.warn("Company source skipped:", error.message);
      const snippet = `${result.title}。${result.description}`.trim();
      if (snippet.length >= 60) {
        return {
          title: result.title.slice(0, 160) || new URL(result.url).hostname,
          url: result.url,
          domain: new URL(result.url).hostname,
          content: snippet.slice(0, 1000),
          evidenceLevel: "搜索摘要",
          sourceCategory: classification.sourceCategory
        };
      }
      return null;
    }
  }));
  for (const source of fetchedSources) {
    if (!source || sources.length >= 12 || seenFinalUrls.has(source.url)) continue;
    sources.push({ ...source, id: sources.length + 1 });
    seenFinalUrls.add(source.url);
  }
  return { sources, resolvedEntities: structured.resolvedEntities };
}

function insufficientCompanyResearch(company, reason, sources = [], resolvedEntities = []) {
  const fallbackSourceIds = sources[0]?.id ? [sources[0].id] : [1];
  return {
    status: "insufficient",
    skill: industryResearchSkill.VERSION,
    company,
    summary: reason,
    researchFocus: {
      primaryEntity: company,
      whyPrimary: "尚未找到足够证据识别更具体的实际业务主体",
      employmentLink: "未确认",
      sourceIds: fallbackSourceIds
    },
    operatingStructure: [{
      name: company,
      type: "法律主体",
      businessRole: "公开信息不足",
      relationshipToInput: "简历所列名称，主体类型待核验",
      priority: "重点研究",
      sourceIds: fallbackSourceIds
    }],
    resolvedEntities: resolvedEntities.length
      ? resolvedEntities.map((entity, index) => ({
        ...entity,
        sourceIds: [sources.find(source => source.title?.startsWith(entity.name))?.id || sources[index]?.id || 1]
      }))
      : [{ name: company, relationship: "简历所列主体", businessRole: "公开信息不足", sourceIds: [sources[0]?.id || 1] }],
    industryPosition: "公开信息不足",
    valueChainRole: "公开信息不足",
    businessModel: "公开信息不足",
    customerMarkets: ["公开信息不足"],
    operatingStage: "公开信息不足",
    products: ["公开信息不足"],
    technologies: ["公开信息不足"],
    technologyEvidence: [{ technology: "公开信息不足", evidence: reason, sourceIds: sources[0]?.id ? [sources[0].id] : [1] }],
    industryBenchmarks: [{
      topic: "行业参照",
      benchmark: "公开信息不足",
      companyComparison: "暂不能比较",
      sourceIds: sources[0]?.id ? [sources[0].id] : [1]
    }],
    researchMap: {
      demandDriver: "公开信息不足",
      valueChainPath: ["需求端待研究", "供给端待研究"],
      candidateCompanyPosition: "暂未定位",
      openQuestions: [reason]
    },
    criticalChokepoints: [{
      node: "关键卡点待识别",
      whyCritical: reason,
      companyExposure: "未验证",
      verificationStatus: "未验证",
      sourceIds: sources[0]?.id ? [sources[0].id] : [1]
    }],
    verificationGates: [{
      question: "公司是否直接参与目标岗位对应的业务节点？",
      judgment: "未验证",
      evidence: reason,
      sourceIds: sources[0]?.id ? [sources[0].id] : [1]
    }, {
      question: "该业务节点是否与候选人所在主体一致？",
      judgment: "未验证",
      evidence: "候选人所属业务单元待确认",
      sourceIds: sources[0]?.id ? [sources[0].id] : [1]
    }],
    narrativeChecks: [{
      claim: "企业背景与目标岗位相关",
      evidenceStatus: "无证据",
      correction: reason,
      sourceIds: sources[0]?.id ? [sources[0].id] : [1]
    }],
    sourceAssessment: {
      primarySources: sources.filter(source => source.sourceCategory === "公司一手资料").length,
      independentSources: sources.filter(source => source.sourceCategory === "外部核验").length,
      industrySources: sources.filter(source => source.sourceCategory === "行业参照").length,
      confidence: "低"
    },
    fit: "信息不足",
    fitReasons: ["无法基于可靠公开信息判断原司背景与目标岗位的适配度"],
    jdMapping: [{
      requirement: "目标岗位核心要求",
      companyEvidence: "公开信息不足",
      relevance: "未证实",
      reason: reason,
      sourceIds: sources[0]?.id ? [sources[0].id] : [1]
    }],
    hrInsights: ["先确认企业具体产品线、技术平台及候选人所在业务单元"],
    gaps: ["建议 HR 补充公司官网、产品线或技术平台信息"],
    sources: sources.map(({ id, title, url, domain, evidenceLevel, sourceCategory }) => ({ id, title, url, domain, evidenceLevel, sourceCategory })),
    researchedAt: new Date().toISOString()
  };
}

function sanitizeCompanyResearchEvidence(result) {
  const inferredEvidence = /必然涉及|通常具备|一般会|理应具备|必然会/;
  const sanitizeAbsenceClaim = value => String(value || "")
    .replace(/封装(?:环节|制造)?外包/g, "封装制造角色未由公开来源明确证明")
    .replace(/未公开涉足([^，。；]+)/g, "公开信息未证明其参与$1")
    .replace(/未涉及([^，。；]+)/g, "未找到$1的公开证据");
  return {
    ...result,
    summary: sanitizeAbsenceClaim(result.summary),
    industryPosition: sanitizeAbsenceClaim(result.industryPosition),
    valueChainRole: sanitizeAbsenceClaim(result.valueChainRole),
    technologyEvidence: (result.technologyEvidence || []).map(item => ({
      ...item,
      evidence: inferredEvidence.test(item.evidence)
        ? "公开来源未明确证明该项技术活动。"
        : item.evidence
    })),
    jdMapping: (result.jdMapping || []).map(item => {
      const evidenceInferred = inferredEvidence.test(item.companyEvidence);
      return {
        ...item,
        companyEvidence: evidenceInferred ? "公开来源未明确证明该项岗位活动。" : item.companyEvidence,
        relevance: evidenceInferred && item.relevance === "直接相关" ? "未证实" : item.relevance,
        reason: inferredEvidence.test(item.reason)
          ? "公开来源仅证明相关业务或量产环境，未直接证明该岗位活动。"
          : item.reason
      };
    }),
    fitReasons: (result.fitReasons || []).map(item => (
      inferredEvidence.test(item) ? "公开来源未明确证明该项岗位关联。" : sanitizeAbsenceClaim(item)
    )),
    gaps: (result.gaps || []).map(sanitizeAbsenceClaim)
  };
}

function referencedResearchSourceIds(result) {
  const ids = new Set(result.sourceIds || []);
  for (const id of result.researchFocus?.sourceIds || []) ids.add(id);
  for (const item of result.operatingStructure || []) {
    for (const id of item.sourceIds || []) ids.add(id);
  }
  for (const item of result.technologyEvidence || []) {
    for (const id of item.sourceIds || []) ids.add(id);
  }
  for (const item of result.jdMapping || []) {
    for (const id of item.sourceIds || []) ids.add(id);
  }
  for (const item of result.industryBenchmarks || []) {
    for (const id of item.sourceIds || []) ids.add(id);
  }
  for (const item of result.criticalChokepoints || []) {
    for (const id of item.sourceIds || []) ids.add(id);
  }
  for (const item of result.verificationGates || []) {
    for (const id of item.sourceIds || []) ids.add(id);
  }
  for (const item of result.narrativeChecks || []) {
    for (const id of item.sourceIds || []) ids.add(id);
  }
  return ids;
}

async function researchCompany(payload) {
  const company = String(payload.company || "").trim();
  const job = payload.job || {};
  if (!company || /^(?:未说明|手动导入|未知|候选人)$/i.test(company)) {
    return insufficientCompanyResearch(company || "未说明", "简历未提供可检索的企业名称");
  }
  const researchPlan = await buildIndustryResearchPlan(job);
  const cacheKey = `${company}::${job.title || ""}::${job.userContext?.recruiterContext || ""}::${[...researchPlan.coreTerms, ...researchPlan.englishTerms].join("|")}`;
  const cached = companyResearchCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < COMPANY_RESEARCH_TTL_MS) return cached.result;

  const researchBundle = await collectCompanySources(company, job, researchPlan);
  const sources = researchBundle.sources;
  if (!sources.length) {
    const result = insufficientCompanyResearch(company, "未找到可核验的公开网页", [], researchBundle.resolvedEntities);
    companyResearchCache.set(cacheKey, { cachedAt: Date.now(), result });
    return result;
  }
  const companyEvidenceSources = sources.filter(source => source.sourceCategory !== "行业参照");
  if (!companyEvidenceSources.length) {
    const result = insufficientCompanyResearch(
      company,
      "仅找到行业资料，未识别到可核验的公司实体或公司来源，已停止生成公司事实",
      sources,
      researchBundle.resolvedEntities
    );
    companyResearchCache.set(cacheKey, { cachedAt: Date.now(), result });
    return result;
  }
  if (!API_KEY) {
    const result = insufficientCompanyResearch(company, "已找到公开来源，但当前未配置 AI 研究模型", sources, researchBundle.resolvedEntities);
    companyResearchCache.set(cacheKey, { cachedAt: Date.now(), result });
    return result;
  }

  const sourceInput = sources.map(source => [
    `来源 ${source.id}`,
    `标题：${source.title}`,
    `域名：${source.domain}`,
    `证据类型：${source.evidenceLevel}`,
    `来源角色：${source.sourceCategory}`,
    `正文摘录：${source.content}`
  ].join("\n")).join("\n\n");
  const result = await callAI({
    name: "industry_research_skill",
    schema: companyResearchSchema,
    system: industryResearchSkill.SYSTEM_PROMPT,
    input: `简历所列企业：${company}\n候选人岗位：${payload.role || "未说明"}\n目标岗位：${JSON.stringify(job)}\n使用者招聘背景：${JSON.stringify(job.userContext || {})}\n动态行业研究计划：${JSON.stringify(researchPlan)}\n预识别关联主体：${JSON.stringify(researchBundle.resolvedEntities)}\n\n使用者背景只用于调整 HR 需要理解和追问的角度，不是公司事实或候选人事实。先判断输入名称是集团、法律实体、业务统称、业务单元还是品牌；再根据目标 JD 从有来源支持的关联主体中选择重点研究主体。重点研究主体可以与简历所列名称不同，但不得据此确认候选人的雇佣关系。\n\n公开网页：\n${sourceInput}`
  });
  const sanitizedResult = sanitizeCompanyResearchEvidence(result);
  const selectedIds = referencedResearchSourceIds(sanitizedResult);
  const selectedSourceObjects = sources.filter(source => selectedIds.has(source.id));
  for (const category of ["公司一手资料", "外部核验", "行业参照"]) {
    const categorySources = sources.filter(source => source.sourceCategory === category);
    const existingCount = selectedSourceObjects.filter(source => source.sourceCategory === category).length;
    selectedSourceObjects.push(...categorySources.filter(source => !selectedSourceObjects.includes(source)).slice(0, Math.max(0, 2 - existingCount)));
  }
  const finalSources = (selectedSourceObjects.length ? selectedSourceObjects : sources.slice(0, 8))
    .slice(0, 10)
    .map(({ id, title, url, domain, evidenceLevel, sourceCategory }) => ({ id, title, url, domain, evidenceLevel, sourceCategory }));
  const sourceCounts = {
    primarySources: finalSources.filter(source => source.sourceCategory === "公司一手资料").length,
    independentSources: finalSources.filter(source => ["外部核验", "实体识别"].includes(source.sourceCategory)).length,
    industrySources: finalSources.filter(source => source.sourceCategory === "行业参照").length
  };
  const finalResult = {
    ...sanitizedResult,
    company,
    skill: industryResearchSkill.VERSION,
    sourceAssessment: {
      ...sourceCounts,
      confidence: sourceCounts.primarySources > 0 && sourceCounts.independentSources > 0 && sourceCounts.industrySources > 0
        ? "高"
        : sourceCounts.independentSources > 0 && sourceCounts.industrySources > 0 ? "中" : "低"
    },
    sources: finalSources,
    researchedAt: new Date().toISOString()
  };
  delete finalResult.sourceIds;
  companyResearchCache.set(cacheKey, { cachedAt: Date.now(), result: finalResult });
  return finalResult;
}

async function callDeepSeek({ name, schema, system, input }) {
  const schemaInstruction = [
    "你必须只输出一个合法 JSON 对象，不要使用 Markdown 代码块。",
    `输出对象名称：${name}`,
    `必须严格符合以下 JSON Schema：${JSON.stringify(schema)}`
  ].join("\n");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 75000);
  try {
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
      }),
      signal: controller.signal
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || `DeepSeek API 返回 ${response.status}`);
    }
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("DeepSeek 未返回可解析内容");
    const parsed = JSON.parse(content);
    const result = parsed?.[name] && typeof parsed[name] === "object" ? parsed[name] : parsed;
    validateRequiredFields(result, schema);
    return result;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("AI 研究超过 75 秒，已停止等待");
    throw error;
  } finally {
    clearTimeout(timer);
  }
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

function demoAnalyzeJob({ title, jd, businessContext, note }) {
  const clauses = splitRequirements(`${businessContext || ""}\n${jd}\n${note || ""}`);
  const defaults = ["核心业务任务", "专业问题解决", "跨团队协同", "结果交付", "行业知识"];
  const names = [...clauses.slice(0, 6)];
  while (names.length < 5) names.push(defaults[names.length]);
  return {
    summary: clauses[0] || `围绕${title}的核心业务目标开展工作，并对关键结果负责。`,
    capabilities: names.map((name, index) => ({
      name: name.slice(0, 24),
      description: index < 3 ? "从 JD 与 HR 业务理解中识别的核心要求" : "建议由招聘经理进一步校准",
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
  const hasOwnership = /主导|独立|负责[^。\n]{0,20}(?:平台|模块|工艺|产品|项目|客户|区域)/.test(resume);
  const hasDeliveryStage = /量产|交付|上线|签约|回款|续约/.test(resume);
  const specificEvidence = isChip3d
    ? [...new Set(resume.match(/2\.5D|CoWoS|中介层|微凸点|互连|翘曲|良率|可靠性|键合/gi) || [])].length
    : isSaasSales
      ? [...new Set(resume.match(/大客户|解决方案|决策链|签约|回款|续约|商机|售前/gi) || [])].length
      : facts.length;
  const hasComparableEvidence = hasTransfer && hasOwnership && hasDeliveryStage && specificEvidence >= 2;
  const group = hasDirect ? "priority" : hasComparableEvidence ? "review" : "unknown";
  const verdict = group === "priority" ? "优先联系" : group === "review" ? "值得复核" : "信息不足";
  const inferredFacts = facts.length ? facts : ["简历已导入", "相关经历待进一步结构化"];
  return {
    name,
    role: firstLine.slice(0, 30),
    company: "手动导入",
    group,
    verdict,
    ats: hasDirect,
    recovered: !hasDirect && hasComparableEvidence,
    coverage: hasDirect ? 82 : hasComparableEvidence ? 64 : 40,
    core: inferredFacts.slice(0, 3).join("、"),
    gap: "经历范围、责任边界与结果证据待确认",
    quote: resume.slice(0, 180).replace(/\s+/g, " "),
    facts: inferredFacts,
    companyContext: {
      companyType: "简历未明确说明",
      products: ["产品形态待确认"],
      technologyPlatform: facts.length ? facts : ["技术平台待确认"],
      productionStage: /量产|交付|上线/.test(resume) ? "简历提及量产或交付" : "研发或量产阶段待确认",
      evidenceNote: "演示模式仅依据简历字面信息，不补充外部公司知识"
    },
    comparability: [
      { dimension: "任务对象", candidateEvidence: inferredFacts[0] || "待确认", targetRequirement: "目标岗位核心任务", judgment: hasTransfer ? "部分可比" : "未证实", reason: "仅识别到相邻任务线索" },
      { dimension: "技术机理", candidateEvidence: inferredFacts[1] || "待确认", targetRequirement: "目标岗位技术平台", judgment: hasDirect ? "可比" : "未证实", reason: hasDirect ? "存在直接技术关键词" : "缺少机理层证据" },
      { dimension: "问题复杂度", candidateEvidence: /主导|复杂|良率|失效|千万/.test(resume) ? "简历存在复杂问题线索" : "待确认", targetRequirement: "目标岗位问题复杂度", judgment: hasTransfer ? "部分可比" : "未证实", reason: "需确认问题规模与约束条件" },
      { dimension: "量产阶段", candidateEvidence: /量产|交付|上线/.test(resume) ? "有量产或交付表述" : "待确认", targetRequirement: "目标岗位交付阶段", judgment: /量产|交付|上线/.test(resume) ? "部分可比" : "未证实", reason: "需确认规模和成熟度" },
      { dimension: "个人责任", candidateEvidence: /主导|负责|独立/.test(resume) ? "有负责或主导表述" : "待确认", targetRequirement: "独立负责关键结果", judgment: /主导|独立/.test(resume) ? "部分可比" : "未证实", reason: "责任边界仍需面试核实" }
    ],
    transferable: hasTransfer ? ["仅可初步迁移相似任务中的问题分析方法", "具体技术平台经验不可直接外推"] : ["经历信息待补充"],
    transferBoundary: ["公司产品与技术平台未明确时，不外推为直接相关经验", "未证明个人责任和量产规模时，不外推为独立交付能力"],
    transferConfidence: hasDirect ? "中" : hasComparableEvidence ? "中" : "低",
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
      "HR 的业务理解可能通俗、碎片或笼统。用它识别产品形态、目标用户、技术路线、关键业务任务和成功标准，再与 JD 交叉校准。",
      "业务理解是分析视角，不是候选人事实；其中模糊、推测或与 JD 冲突的内容不得直接设为硬性淘汰条件，应转化为待校准能力或面试验证方向。",
      "使用者招聘背景用于理解 HR 所处的公司类型、岗位范围和专业关注点，从而调整能力表述与校准建议；不得据此降低证据门槛或引入歧视性判断。",
      "只分析岗位相关要求，忽略年龄、性别、婚育、民族等敏感属性。",
      "模糊要求不得设为硬性淘汰条件。相邻经历必须体现任务或能力迁移关系。",
      "用简洁中文输出。"
    ].join("\n"),
    input: `岗位名称：${payload.title}\n行业：${payload.industry}\nJD：\n${payload.jd}\nHR 对业务的理解：\n${payload.businessContext || "无"}\n招聘经理补充：\n${payload.note || "无"}\n使用者招聘背景：\n${payload.userContext?.recruiterContext || "无"}`
  });
  return { result, mode: AI_PROVIDER, provider: AI_PROVIDER, model: MODEL };
}

function enforceTransferThreshold(result) {
  if (!Array.isArray(result.comparability)) return result;
  const byDimension = Object.fromEntries(result.comparability.map(item => [item.dimension, item]));
  const supported = result.comparability.filter(item => item.judgment !== "未证实").length;
  const fullyComparable = result.comparability.filter(item => item.judgment === "可比").length;
  const anchorSupported = ["任务对象", "技术机理"].some(dimension => byDimension[dimension]?.judgment !== "未证实");
  const responsibilitySupported = byDimension["个人责任"]?.judgment !== "未证实";
  const eligibleForTransferReview = supported >= 3 && fullyComparable >= 2 && anchorSupported && responsibilitySupported;

  if (!result.ats && !eligibleForTransferReview) {
    result.group = "unknown";
    result.verdict = "信息不足";
    result.recovered = false;
    result.transferConfidence = "低";
    result.coverage = Math.min(Number(result.coverage) || 0, 49);
    result.transferable = (result.transferable || []).map(item => `待验证线索：${item.replace(/^待验证线索：/, "")}`);
  }
  if (result.recovered) {
    result.group = "review";
    result.verdict = "值得复核";
    result.transferConfidence = result.transferConfidence === "高" ? "中" : result.transferConfidence;
  }
  return result;
}

async function analyzeResume(payload) {
  if (!API_KEY) return { result: demoAnalyzeResume(payload), mode: "demo" };
  const result = enforceTransferThreshold(await callAI({
    name: "candidate_transfer_analysis",
    schema: resumeSchema,
    system: [
      "你是谨慎的中高端人才迁移识别助手。",
      "目标是扩大合理召回并控制复核成本，而不是自动淘汰或录用。",
      "事实必须来自简历原文；推断必须保守；证据不足标记为待验证。",
      "不得补造候选人的公司、技术、业绩或责任范围。",
      "必须单独提取候选人原公司的产品形态、技术平台、工艺或业务代际、研发/试产/量产阶段；简历未写明时明确写“未说明”，不得依靠公司名称猜测。",
      "迁移判断必须逐项比较五个维度：任务对象、技术机理、问题复杂度、量产阶段、个人责任。",
      "“做过相似任务”“都负责良率/销售/项目”“同属一个行业”只能作为线索，不能单独证明能力可迁移。",
      "只有五个维度中至少三项不是“未证实”、其中至少两项为“可比”、任务对象或技术机理至少一项不是“未证实”，且个人责任不是“未证实”，才可判为“值得复核”或 recovered=true。",
      "若公司产品技术背景、量产阶段或个人责任缺失，不得用行业常识补齐；transferConfidence 必须为“低”，通常应判为“信息不足”。",
      "“优先联系”仅用于目标技术/业务场景和责任范围均有直接证据的候选人；相邻经历默认最高为“值得复核”。",
      "transferable 只写已经被可比证据支持的能力；transferBoundary 明确列出不能从现有经历直接外推到目标岗位的部分。",
      "不得分析年龄、性别、婚育、民族等敏感属性。",
      "ATS 命中表示简历是否出现目标岗位的直接关键词。",
      "recovered 仅在 ATS 未命中但存在可信迁移路径时为 true。",
      "coverage 是能力证据覆盖程度，不是录用概率。",
      "岗位知识包中的正向迁移规则只用于支持推断，反向风险规则用于检查误判，均不能替代简历事实。",
      "目标岗位中的 businessContext 是 HR 对产品、技术或业务目标的通俗理解。将它作为比较候选人经历的分析角度，重点识别其是否接触过相似产品形态、技术机理、用户场景或交付目标。",
      "businessContext 不能替代 JD，也不能证明候选人具备某项能力。简历没有对应证据时必须写未证实，并生成有针对性的追问。",
      "目标岗位中的 userContext.recruiterContext 是使用者的招聘岗位与公司背景，只用于调整解释深度、关注角度和追问方式。不得把它当成候选人事实、岗位硬性要求或公司事实。",
      "用简洁中文输出。"
    ].join("\n"),
    input: `目标岗位：\n${JSON.stringify(payload.job)}\n\n候选人简历：\n${payload.resume}`
  }));
  return { result, mode: AI_PROVIDER, provider: AI_PROVIDER, model: MODEL };
}

function sourcingTermEntries(candidates, extractor, limit, reason) {
  const counts = new Map();
  candidates.forEach(candidate => {
    const terms = [...new Set(extractor(candidate)
      .flatMap(value => String(value || "").split(/[、，,；;｜|/]/))
      .map(value => value.trim())
      .filter(value => value.length >= 2 && value.length <= 28)
      .filter(value => !/待确认|未说明|信息不足|简历已导入|相关经历/.test(value)))];
    terms.forEach(term => counts.set(term, (counts.get(term) || 0) + 1));
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)
    .slice(0, limit)
    .map(([term, sourceCount]) => ({ term, sourceCount, reason: reason(term, sourceCount) }));
}

function booleanGroup(terms) {
  return `(${terms.map(term => `"${String(term).replace(/"/g, "")}"`).join(" OR ")})`;
}

function demoSourcingKeywords(payload) {
  const candidates = Array.isArray(payload.candidates) ? payload.candidates.slice(0, 8) : [];
  const job = payload.job || {};
  const technicalKeywords = sourcingTermEntries(
    candidates,
    candidate => [
      ...(candidate.facts || []),
      ...(candidate.transferable || []),
      ...(candidate.companyContext?.technologyPlatform || []),
      ...(candidate.companyResearch?.technologies || [])
    ],
    8,
    (_, count) => `${count} 位正向候选人的经历或技术背景中出现`
  );
  const productKeywords = sourcingTermEntries(
    candidates,
    candidate => [
      ...(candidate.companyContext?.products || []),
      ...(candidate.companyResearch?.products || [])
    ],
    6,
    (_, count) => `${count} 位正向候选人接触过相关产品或平台`
  );
  const roleKeywords = sourcingTermEntries(
    candidates,
    candidate => [candidate.role, ...(candidate.adjacentRoles || [])],
    6,
    (_, count) => `${count} 位正向候选人的岗位名称或相邻岗位`
  );
  const companyCounts = new Map();
  candidates.forEach(candidate => {
    const companies = [
      candidate.company,
      ...(candidate.companyResearch?.resolvedEntities || [])
        .filter(entity => entity.priority === "重点研究")
        .map(entity => entity.name)
    ].filter(Boolean);
    [...new Set(companies)].forEach(company => companyCounts.set(company, (companyCounts.get(company) || 0) + 1));
  });
  const targetCompanies = [...companyCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([company, sourceCount]) => ({
      company,
      sourceCount,
      reason: "已有正向候选人来自该公司或其重点业务主体"
    }));
  const fallbackTechnical = (job.model || []).slice(0, 4).map(item => ({
    term: Array.isArray(item) ? item[0] : item.name,
    reason: "来自岗位能力模型，建议与候选人高频经历组合检索",
    sourceCount: Math.max(1, candidates.length)
  }));
  const technical = technicalKeywords.length ? technicalKeywords : fallbackTechnical;
  const products = productKeywords.length ? productKeywords : technical.slice(0, 3);
  const roles = roleKeywords.length ? roleKeywords : (job.adjacent || []).slice(0, 4).map(term => ({
    term,
    reason: "岗位模型中的相邻经历",
    sourceCount: Math.max(1, candidates.length)
  }));
  const techTerms = technical.slice(0, 4).map(item => item.term);
  const productTerms = products.slice(0, 3).map(item => item.term);
  const roleTerms = roles.slice(0, 3).map(item => item.term);
  const companyTerms = targetCompanies.slice(0, 4).map(item => item.company);
  const searchQueries = [
    {
      label: "核心技术组合",
      query: `${booleanGroup(techTerms)} AND ${booleanGroup(roleTerms)}`,
      usage: "适合先扩大召回，再根据招聘网站结果补充筛选条件"
    },
    {
      label: "产品 / 平台组合",
      query: `${booleanGroup(productTerms)} AND ${booleanGroup(techTerms.slice(0, 3))}`,
      usage: "适合岗位名称不统一、但产品和技术环境相近的候选人"
    }
  ];
  if (companyTerms.length) {
    searchQueries.push({
      label: "目标公司定向",
      query: `${booleanGroup(companyTerms)} AND ${booleanGroup(techTerms.slice(0, 3))}`,
      usage: "适合在招聘网站中按公司背景进行定向猎聘"
    });
  }
  return {
    summary: `根据 ${candidates.length} 位获得 HR 正向反馈的候选人，反向提炼可用于下一轮寻访的关键词。`,
    sampleSize: candidates.length,
    signalDescription: payload.signalDescription || "HR 推荐联系，且已产生联系、面试、Offer 或入职进展",
    technicalKeywords: technical,
    productKeywords: products,
    roleKeywords: roles,
    targetCompanies,
    exclusionKeywords: [],
    searchQueries,
    cautions: [
      "关键词用于扩大寻访范围，不等于候选人一定匹配。",
      "公司背景只能说明可能接触过相关环境，仍需核实个人职责。"
    ]
  };
}

async function generateSourcingKeywords(payload) {
  const candidates = Array.isArray(payload.candidates) ? payload.candidates.slice(0, 8) : [];
  if (!candidates.length) throw new Error("至少需要 1 位已获得正向招聘反馈的候选人");
  if (!API_KEY) return { result: demoSourcingKeywords(payload), mode: "demo" };
  const result = await callAI({
    name: "sourcing_keyword_feedback",
    schema: sourcingKeywordSchema,
    system: [
      "你是帮助招聘 HR 设计人才寻访策略的研究助手。",
      "根据已经获得 HR 正向复核和后续招聘进展的候选人简历，反向提炼下一轮招聘网站检索词。",
      "输出重点包括关键技术、产品或平台名称、相邻岗位名称、目标公司和可直接复制的布尔搜索式。",
      "只使用输入中有证据的内容，不得编造候选人未经历的技术、产品或公司。",
      "目标公司优先来自正向候选人的任职公司或已有公开研究支持的重点业务主体；不得仅凭行业常识随意列公司。",
      "高频不等于有效。优先保留能解释候选人为何进入联系、面试、Offer 或入职阶段的差异化词语。",
      "岗位名称可能不统一，应同时输出技术词、产品词和相邻岗位词，避免重新退化为单一关键词匹配。",
      "搜索式采用招聘人员容易复制的 AND、OR、英文双引号格式，每组控制在可读长度内。",
      "排除词只有在输入中存在明确误召回证据时才输出，否则返回空数组。",
      "不得输出姓名、电话、邮箱、地址等个人敏感信息。",
      "用简洁、通俗的中文解释每个词为什么值得使用。"
    ].join("\n"),
    input: `目标岗位：\n${JSON.stringify(payload.job)}\n\n正向样本筛选口径：${payload.signalDescription || "HR 推荐且已有正向招聘进展"}\n\n候选人样本：\n${JSON.stringify(candidates)}`
  });
  result.sampleSize = candidates.length;
  const allowedCompanies = new Set(candidates.flatMap(candidate => [
    candidate.company,
    ...(candidate.companyResearch?.resolvedEntities || []).map(entity => entity.name)
  ].filter(Boolean)));
  result.targetCompanies = (result.targetCompanies || [])
    .filter(item => allowedCompanies.has(item.company))
    .map(item => ({ ...item, sourceCount: Math.max(1, Math.min(candidates.length, Number(item.sourceCount) || 1)) }));
  if (!result.targetCompanies.length) {
    result.targetCompanies = demoSourcingKeywords(payload).targetCompanies;
  }
  for (const key of ["technicalKeywords", "productKeywords", "roleKeywords"]) {
    result[key] = (result[key] || []).map(item => ({
      ...item,
      sourceCount: Math.max(1, Math.min(candidates.length, Number(item.sourceCount) || 1))
    }));
  }
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
    if (pathname === "/api/generate-sourcing-keywords") {
      if (!payload.job || !Array.isArray(payload.candidates) || !payload.candidates.length) {
        return sendJson(res, 400, { error: "岗位信息和正向候选人样本不能为空" });
      }
      return sendJson(res, 200, await generateSourcingKeywords(payload));
    }
    if (pathname === "/api/research-company") {
      if (!payload.company || !payload.job) return sendJson(res, 400, { error: "企业名称和目标岗位不能为空" });
      return sendJson(res, 200, await researchCompany(payload));
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

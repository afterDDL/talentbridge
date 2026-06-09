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

const companyResearchSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "status", "summary", "industryPosition", "valueChainRole", "businessModel",
    "customerMarkets", "operatingStage", "products", "technologies", "technologyEvidence",
    "fit", "fitReasons", "jdMapping", "hrInsights", "gaps", "sourceIds"
  ],
  properties: {
    status: { type: "string", enum: ["researched", "insufficient"] },
    summary: { type: "string" },
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
          sourceIds: { type: "array", minItems: 1, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 8 } }
        }
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
          sourceIds: { type: "array", minItems: 1, maxItems: 3, items: { type: "integer", minimum: 1, maximum: 8 } }
        }
      }
    },
    hrInsights: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
    gaps: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
    sourceIds: { type: "array", minItems: 1, maxItems: 5, items: { type: "integer", minimum: 1, maximum: 8 } }
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
  return [...new Set([job.title, ...(job.adjacent || []), ...modelTerms])]
    .flatMap(item => String(item || "").split(/[、/，,\s]+/))
    .filter(item => item.length >= 2)
    .slice(0, 8);
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

async function discoverStructuredCompanySources(company) {
  const directSources = [];
  const pageCandidates = [];
  try {
    const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(company)}&language=zh&limit=3&format=json&origin=*`;
    const searchResponse = await fetchWithLimit(searchUrl, "application/json");
    const searchData = JSON.parse(searchResponse.text);
    const entityHit = searchData.search?.[0];
    if (!entityHit?.id) return { directSources, pageCandidates };

    const entityUrl = `https://www.wikidata.org/wiki/Special:EntityData/${encodeURIComponent(entityHit.id)}.json`;
    const entityResponse = await fetchWithLimit(entityUrl, "application/json");
    const entity = JSON.parse(entityResponse.text).entities?.[entityHit.id];
    if (!entity) return { directSources, pageCandidates };

    const label = entity.labels?.zh?.value || entity.labels?.en?.value || entityHit.label || company;
    const description = entity.descriptions?.zh?.value || entity.descriptions?.en?.value || entityHit.description || "";
    const aliases = [...(entity.aliases?.zh || []), ...(entity.aliases?.en || [])].map(item => item.value).slice(0, 10);
    directSources.push({
      title: `${label} · Wikidata`,
      url: `https://www.wikidata.org/wiki/${entityHit.id}`,
      domain: "wikidata.org",
      content: `企业名称：${label}。企业描述：${description || "未提供"}。别名：${aliases.join("、") || "未提供"}。`,
      evidenceLevel: "结构化知识"
    });

    const officialUrl = entity.claims?.P856?.[0]?.mainsnak?.datavalue?.value;
    if (officialUrl) {
      pageCandidates.push({
        title: `${label}官方网站`,
        url: officialUrl,
        description: `${label}的 Wikidata 官方网站字段`,
        evidenceLevel: "企业官网"
      });
    }

    const wikiSite = entity.sitelinks?.zhwiki || entity.sitelinks?.enwiki;
    if (wikiSite?.title) {
      const language = entity.sitelinks?.zhwiki ? "zh" : "en";
      const wikiApi = `https://${language}.wikipedia.org/w/api.php?action=query&prop=extracts%7Cinfo&explaintext=1&inprop=url&titles=${encodeURIComponent(wikiSite.title)}&format=json&origin=*`;
      const wikiResponse = await fetchWithLimit(wikiApi, "application/json");
      const wikiData = JSON.parse(wikiResponse.text);
      const page = Object.values(wikiData.query?.pages || {})[0];
      if (page?.extract) {
        directSources.push({
          title: `${page.title} · Wikipedia`,
          url: page.fullurl || `https://${language}.wikipedia.org/wiki/${encodeURIComponent(wikiSite.title.replace(/ /g, "_"))}`,
          domain: `${language}.wikipedia.org`,
          content: page.extract.slice(0, 12000),
          evidenceLevel: "百科正文"
        });
      }
    }
  } catch (error) {
    console.warn("Structured company discovery failed:", error.message);
  }
  return { directSources, pageCandidates };
}

async function discoverCompanyPages(company, job) {
  const keywordText = researchKeywords(job).slice(0, 5).join(" ");
  const queries = [
    `"${company}" 官网 产品 技术`,
    `"${company}" 产业链 客户 应用 业务`,
    `"${company}" 年报 技术 平台 制造 量产`,
    `"${company}" ${keywordText}`
  ];
  const discoveredGroups = await Promise.all(queries.map(async query => {
    const results = [];
    try {
      const response = await fetchWithLimit(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, "text/html");
      results.push(...parseDuckDuckGoHtml(response.text));
    } catch (error) {
      console.warn("DuckDuckGo company search failed:", error.message);
    }
    if (!results.length) {
      try {
        const response = await fetchWithLimit(`https://www.bing.com/search?q=${encodeURIComponent(query)}&format=rss`, "application/rss+xml,application/xml,text/xml");
        results.push(...parseBingRss(response.text));
      } catch (error) {
        console.warn("Bing company search failed:", error.message);
      }
    }
    return results;
  }));
  const discovered = discoveredGroups.flat();
  const blockedHosts = /(?:bing|baidu|google|duckduckgo|facebook|linkedin|zhihu|weibo|bilibili)\./i;
  const unique = new Map();
  discovered.forEach(item => {
    if (!unique.has(item.url)) unique.set(item.url, item);
  });
  return [...unique.values()].filter(item => {
    try {
      const url = new URL(item.url);
      return !blockedHosts.test(url.hostname) && searchResultMatchesCompany(item, company);
    } catch {
      return false;
    }
  }).slice(0, 8);
}

async function collectCompanySources(company, job) {
  const structured = await discoverStructuredCompanySources(company);
  const results = [...structured.pageCandidates, ...(await discoverCompanyPages(company, job))];
  const sources = structured.directSources.map((source, index) => ({ ...source, id: index + 1 }));
  for (const result of results) {
    if (sources.length >= 5) break;
    try {
      const page = await fetchWithLimit(result.url);
      if (!page.type.includes("html") && !page.type.includes("text")) continue;
      const title = decodeHtml(page.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || new URL(page.url).hostname)
        .replace(/\s+/g, " ").trim();
      const content = stripHtml(page.text);
      if (content.length < 180) throw new Error("来源正文过短");
      sources.push({
        id: sources.length + 1,
        title: title.slice(0, 160),
        url: page.url,
        domain: new URL(page.url).hostname,
        content: content.slice(0, 5000),
        evidenceLevel: result.evidenceLevel === "企业官网" ? "企业官网" : "网页正文"
      });
    } catch (error) {
      console.warn("Company source skipped:", error.message);
      const snippet = `${result.title}。${result.description}`.trim();
      if (snippet.length >= 60) {
        sources.push({
          id: sources.length + 1,
          title: result.title.slice(0, 160) || new URL(result.url).hostname,
          url: result.url,
          domain: new URL(result.url).hostname,
          content: snippet.slice(0, 1000),
          evidenceLevel: "搜索摘要"
        });
      }
    }
  }
  return sources;
}

function insufficientCompanyResearch(company, reason, sources = []) {
  return {
    status: "insufficient",
    skill: industryResearchSkill.VERSION,
    company,
    summary: reason,
    industryPosition: "公开信息不足",
    valueChainRole: "公开信息不足",
    businessModel: "公开信息不足",
    customerMarkets: ["公开信息不足"],
    operatingStage: "公开信息不足",
    products: ["公开信息不足"],
    technologies: ["公开信息不足"],
    technologyEvidence: [{ technology: "公开信息不足", evidence: reason, sourceIds: sources[0]?.id ? [sources[0].id] : [1] }],
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
    sources: sources.map(({ id, title, url, domain, evidenceLevel }) => ({ id, title, url, domain, evidenceLevel })),
    researchedAt: new Date().toISOString()
  };
}

async function researchCompany(payload) {
  const company = String(payload.company || "").trim();
  const job = payload.job || {};
  if (!company || /^(?:未说明|手动导入|未知|候选人)$/i.test(company)) {
    return insufficientCompanyResearch(company || "未说明", "简历未提供可检索的企业名称");
  }
  const cacheKey = `${company}::${job.title || ""}::${researchKeywords(job).join("|")}`;
  const cached = companyResearchCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < COMPANY_RESEARCH_TTL_MS) return cached.result;

  const sources = await collectCompanySources(company, job);
  if (!sources.length) {
    const result = insufficientCompanyResearch(company, "未找到可核验的公开网页");
    companyResearchCache.set(cacheKey, { cachedAt: Date.now(), result });
    return result;
  }
  if (!API_KEY) {
    const result = insufficientCompanyResearch(company, "已找到公开来源，但当前未配置 AI 研究模型", sources);
    companyResearchCache.set(cacheKey, { cachedAt: Date.now(), result });
    return result;
  }

  const sourceInput = sources.map(source => [
    `来源 ${source.id}`,
    `标题：${source.title}`,
    `域名：${source.domain}`,
    `证据类型：${source.evidenceLevel}`,
    `正文摘录：${source.content}`
  ].join("\n")).join("\n\n");
  const result = await callAI({
    name: "industry_research_skill",
    schema: companyResearchSchema,
    system: industryResearchSkill.SYSTEM_PROMPT,
    input: `待研究企业：${company}\n候选人岗位：${payload.role || "未说明"}\n目标岗位：${JSON.stringify(job)}\n\n公开网页：\n${sourceInput}`
  });
  const selectedIds = new Set(result.sourceIds);
  const selectedSources = sources
    .filter(source => selectedIds.has(source.id))
    .map(({ id, title, url, domain, evidenceLevel }) => ({ id, title, url, domain, evidenceLevel }));
  const finalResult = {
    ...result,
    company,
    skill: industryResearchSkill.VERSION,
    sources: selectedSources.length ? selectedSources : sources.slice(0, 3).map(({ id, title, url, domain, evidenceLevel }) => ({ id, title, url, domain, evidenceLevel })),
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
  const parsed = JSON.parse(content);
  const result = parsed?.[name] && typeof parsed[name] === "object" ? parsed[name] : parsed;
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
      "只分析岗位相关要求，忽略年龄、性别、婚育、民族等敏感属性。",
      "模糊要求不得设为硬性淘汰条件。相邻经历必须体现任务或能力迁移关系。",
      "用简洁中文输出。"
    ].join("\n"),
    input: `岗位名称：${payload.title}\n行业：${payload.industry}\nJD：\n${payload.jd}\n招聘经理补充：\n${payload.note || "无"}`
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
      "用简洁中文输出。"
    ].join("\n"),
    input: `目标岗位：\n${JSON.stringify(payload.job)}\n\n候选人简历：\n${payload.resume}`
  }));
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

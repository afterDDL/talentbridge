const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff"
};

const MAX_JSON_BYTES = 900_000;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function textValue(value, limit = 30_000) {
  return String(value ?? "").trim().slice(0, limit);
}

function splitRequirements(text) {
  return textValue(text)
    .split(/[\n；。]/)
    .map(item => item.replace(/^\s*[\d一二三四五六七八九十]+[.、)]?\s*/, "").trim())
    .filter(item => item.length >= 6);
}

function demoAnalyzeJob({ title, jd, businessContext, note }) {
  const clauses = splitRequirements(`${businessContext || ""}\n${jd || ""}\n${note || ""}`);
  const defaults = ["核心业务任务", "专业问题解决", "跨团队协同", "结果交付", "行业知识"];
  const names = [...clauses.slice(0, 6)];
  while (names.length < 5) names.push(defaults[names.length]);
  return {
    summary: clauses[0] || `围绕${title || "目标岗位"}的核心业务目标开展工作，并对关键结果负责。`,
    capabilities: names.map((name, index) => ({
      name: name.slice(0, 24),
      description: index < 3 ? "从 JD 与 HR 业务理解中识别的核心要求" : "建议由招聘经理进一步校准",
      priority: index < 3 ? "必须" : "重要"
    })),
    adjacent: ["相邻行业经验", "相似业务场景", "可迁移项目经历"]
  };
}

function demoAnalyzeResume({ resume, job }) {
  const firstLine = textValue(resume).split(/\r?\n/).find(line => line.trim())?.trim() || "新候选人";
  const name = firstLine.match(/(?:姓名[:：]\s*)?([\u3400-\u9fff]{2,4})/u)?.[1] || "新候选人";
  const compactResume = textValue(resume).replace(/\s+/g, "").toLowerCase();
  const knowledgeTerms = (job?.knowledgePack?.terms || []).flatMap(item => Array.isArray(item) ? item : [item]);
  const terms = (job?.model || []).map(item => Array.isArray(item) ? item[0] : item.name)
    .concat(job?.adjacent || [], knowledgeTerms)
    .flatMap(term => String(term || "").split(/[、/\s]+/))
    .filter(term => term.length >= 2);
  const facts = [...new Set(terms.filter(term => compactResume.includes(term.replace(/\s+/g, "").toLowerCase())))].slice(0, 4);
  const isChip3d = /3D.*封装|封装.*3D/i.test(job?.title || "");
  const isSaasSales = /SaaS.*销售|销售.*SaaS/i.test(job?.title || "");
  const hasDirect = isChip3d ? /(^|[^\d.])3D|TSV|混合键合/i.test(resume)
    : isSaasSales ? /SaaS|企业软件/i.test(resume) : facts.length >= 2;
  const hasTransfer = isChip3d ? /2\.5D|CoWoS|先进封装|良率|互连|翘曲|可靠性/i.test(resume)
    : isSaasSales ? /大客户|解决方案|长周期|项目|决策链|回款/i.test(resume)
      : facts.length >= 1 || /项目|负责|主导|改善|交付|管理|研发|方案|量产|良率/.test(resume);
  const hasComparableEvidence = hasTransfer
    && /主导|独立|负责[^。\n]{0,20}(?:平台|模块|工艺|产品|项目|客户|区域)/.test(resume)
    && /量产|交付|上线|签约|回款|续约/.test(resume);
  const group = hasDirect ? "priority" : hasComparableEvidence ? "review" : "unknown";
  const inferredFacts = facts.length ? facts : ["简历已导入", "相关经历待进一步结构化"];
  return {
    name,
    role: firstLine.slice(0, 30),
    company: "手动导入",
    group,
    verdict: group === "priority" ? "优先联系" : group === "review" ? "值得复核" : "信息不足",
    ats: hasDirect,
    recovered: !hasDirect && hasComparableEvidence,
    coverage: hasDirect ? 82 : hasComparableEvidence ? 64 : 40,
    core: inferredFacts.slice(0, 3).join("、"),
    gap: "经历范围、责任边界与结果证据待确认",
    quote: textValue(resume, 180).replace(/\s+/g, " "),
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
    transferable: hasTransfer ? ["相似任务中的问题分析方法", "跨团队推动与结果交付"] : ["经历信息待补充"],
    transferBoundary: ["公司产品与技术平台未明确时，不外推为直接相关经验", "未证明个人责任和量产规模时，不外推为独立交付能力"],
    transferConfidence: hasDirect ? "中" : hasComparableEvidence ? "中" : "低",
    target: (job?.model || []).slice(0, 3).map(item => Array.isArray(item) ? item[0] : item.name),
    verify: ["个人责任范围", "项目复杂度", "量化结果"],
    questions: ["请具体说明这段经历中你独立负责的工作范围。", "项目中最复杂的问题是什么，你采取了哪些关键行动？", "有哪些结果或数据能够证明这段经验？"]
  };
}

function termEntries(candidates, extractor, limit, label) {
  const counts = new Map();
  for (const candidate of candidates) {
    const terms = [...new Set(extractor(candidate).flatMap(value => String(value || "").split(/[、，,；;｜|/]/))
      .map(value => value.trim()).filter(value => value.length >= 2 && value.length <= 28)
      .filter(value => !/待确认|未说明|信息不足|简历已导入|相关经历/.test(value)))];
    for (const term of terms) counts.set(term, (counts.get(term) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)
    .slice(0, limit).map(([term, sourceCount]) => ({ term, sourceCount, reason: `${sourceCount} 位正向候选人的${label}中出现` }));
}

function booleanGroup(terms) {
  return `(${terms.filter(Boolean).map(term => `"${String(term).replace(/"/g, "")}"`).join(" OR ")})`;
}

function demoSourcingKeywords(payload) {
  const candidates = Array.isArray(payload.candidates) ? payload.candidates.slice(0, 8) : [];
  const job = payload.job || {};
  const technical = termEntries(candidates, c => [...(c.facts || []), ...(c.transferable || []), ...(c.companyContext?.technologyPlatform || []), ...(c.companyResearch?.technologies || [])], 8, "经历或技术背景");
  const products = termEntries(candidates, c => [...(c.companyContext?.products || []), ...(c.companyResearch?.products || [])], 6, "产品背景");
  const roles = termEntries(candidates, c => [c.role, ...(c.adjacentRoles || [])], 6, "岗位名称");
  const fallback = (job.model || []).slice(0, 4).map(item => ({ term: Array.isArray(item) ? item[0] : item.name, sourceCount: Math.max(1, candidates.length), reason: "来自岗位能力模型" }));
  const tech = technical.length ? technical : fallback;
  const prod = products.length ? products : tech.slice(0, 3);
  const role = roles.length ? roles : (job.adjacent || []).slice(0, 4).map(term => ({ term, sourceCount: Math.max(1, candidates.length), reason: "岗位模型中的相邻经历" }));
  const companyCounts = new Map();
  for (const c of candidates) if (c.company) companyCounts.set(c.company, (companyCounts.get(c.company) || 0) + 1);
  const targetCompanies = [...companyCounts.entries()].slice(0, 8).map(([company, sourceCount]) => ({ company, sourceCount, reason: "正向候选人的任职公司" }));
  const technicalTerms = tech.slice(0, 4).map(item => item.term);
  const roleTerms = role.slice(0, 3).map(item => item.term);
  const productTerms = prod.slice(0, 3).map(item => item.term);
  const searchQueries = [];
  if (technicalTerms.length && roleTerms.length) searchQueries.push({ label: "核心技术组合", query: `${booleanGroup(technicalTerms)} AND ${booleanGroup(roleTerms)}`, usage: "用于扩大召回后人工复核" });
  if (productTerms.length && technicalTerms.length) searchQueries.push({ label: "产品 / 平台组合", query: `${booleanGroup(productTerms)} AND ${booleanGroup(technicalTerms.slice(0, 3))}`, usage: "适合岗位名称不统一的候选人" });
  return {
    summary: `根据 ${candidates.length} 位正向候选人，反向提炼下一轮寻访词。`, sampleSize: candidates.length,
    signalDescription: payload.signalDescription || "HR 推荐且已有正向招聘进展",
    technicalKeywords: tech, productKeywords: prod, roleKeywords: role, targetCompanies,
    exclusionKeywords: [], searchQueries,
    cautions: ["关键词用于扩大寻访范围，不等于候选人一定匹配。", "公司背景仍需核实个人职责。"]
  };
}

function getAiConfig(env) {
  const provider = String(env.AI_PROVIDER || (env.DEEPSEEK_API_KEY ? "deepseek" : "openai")).toLowerCase();
  if (provider === "deepseek" && env.DEEPSEEK_API_KEY) return { provider, key: env.DEEPSEEK_API_KEY, model: env.DEEPSEEK_MODEL || "deepseek-chat", url: "https://api.deepseek.com/chat/completions" };
  if (env.OPENAI_API_KEY) return { provider: "openai", key: env.OPENAI_API_KEY, model: env.OPENAI_MODEL || "gpt-5-mini", url: "https://api.openai.com/v1/chat/completions" };
  return null;
}

async function callAI(env, system, input) {
  const config = getAiConfig(env);
  if (!config) return null;
  const response = await fetch(config.url, {
    method: "POST",
    headers: { authorization: `Bearer ${config.key}`, "content-type": "application/json" },
    body: JSON.stringify({ model: config.model, temperature: 0.1, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: JSON.stringify(input) }] })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || `AI API 返回 ${response.status}`);
  return { result: JSON.parse(data.choices?.[0]?.message?.content || "{}"), provider: config.provider, model: config.model };
}

async function wikipediaResearch(company) {
  const params = new URLSearchParams({ action: "query", generator: "search", gsrsearch: company, gsrlimit: "3", prop: "extracts|info", inprop: "url", exintro: "1", explaintext: "1", format: "json", origin: "*" });
  const response = await fetch(`https://zh.wikipedia.org/w/api.php?${params}`, { headers: { "user-agent": "TalentBridge/1.0 (Cloudflare Worker)" } });
  if (!response.ok) throw new Error(`公开资料接口返回 ${response.status}`);
  const data = await response.json();
  return Object.values(data.query?.pages || {}).sort((a, b) => (a.index || 99) - (b.index || 99)).map(page => ({ title: page.title, extract: textValue(page.extract, 3500), url: page.fullurl })).filter(item => item.extract);
}

function fallbackCompanyResearch(payload, pages = []) {
  const company = textValue(payload.company, 120);
  const job = payload.job || {};
  const capabilities = (job.model || []).slice(0, 5).map(item => Array.isArray(item) ? item[0] : item.name).filter(Boolean);
  const primary = pages[0];
  const summary = primary?.extract ? primary.extract.slice(0, 420) : `暂未在公开百科资料中定位到可可靠引用的“${company}”信息。`;
  const sources = pages.map(page => ({ title: page.title, url: page.url, domain: "zh.wikipedia.org", sourceCategory: "公开百科", evidenceLevel: "二手公开来源" }));
  return {
    status: "researched", skill: "cloudflare-public-research-v1", company,
    fit: primary ? "待复核" : "信息不足", summary,
    researchFocus: { targetRole: payload.role || job.title || "目标岗位", keyQuestions: capabilities },
    operatingStructure: [], resolvedEntities: [], products: [], technologies: [],
    technologyEvidence: [], industryPosition: "公开信息需结合公司官网、公告或监管披露进一步核验",
    valueChainRole: "待核验", businessModel: "待核验", customerMarkets: [], operatingStage: "待核验",
    sourceAssessment: { confidence: primary ? "低" : "低", coverage: primary ? "已找到基础实体资料，关键业务证据不足" : "未找到可靠实体资料" },
    jdMapping: capabilities.map(capability => ({ capability, evidence: "公开资料尚不能证明候选人个人能力", judgment: "待验证" })),
    industryBenchmarks: [], researchMap: { demandDriver: job.businessContext || "待研究", valueChainPath: [] }, criticalChokepoints: [],
    verificationGates: capabilities.slice(0, 3).map(capability => ({ question: `该公司业务是否真实覆盖“${capability}”相关场景？`, evidence: "需补充公司官网、公告或权威行业资料", judgment: "未通过" })),
    narrativeChecks: [], fitReasons: primary ? ["已定位到同名公开实体，需继续核验与目标岗位的业务关联"] : [],
    hrInsights: ["企业背景只用于生成复核问题，不替代候选人个人经历证据。"],
    gaps: ["缺少一手公司来源", "缺少产品、技术平台和业务阶段证据", "缺少候选人个人责任边界证据"],
    sources, researchedAt: new Date().toISOString()
  };
}

async function readJson(request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_JSON_BYTES) throw new Response(JSON.stringify({ error: "请求内容过大" }), { status: 413, headers: JSON_HEADERS });
  const reader = request.body?.getReader();
  if (!reader) throw new Response(JSON.stringify({ error: "请求正文不能为空" }), { status: 400, headers: JSON_HEADERS });
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_JSON_BYTES) {
      await reader.cancel();
      throw new Response(JSON.stringify({ error: "请求内容过大" }), { status: 413, headers: JSON_HEADERS });
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new Response(JSON.stringify({ error: "请求必须是有效 JSON" }), { status: 400, headers: JSON_HEADERS }); }
}

async function handleApi(request, env, pathname) {
  const ai = getAiConfig(env);
  if (request.method === "GET" && pathname === "/api/health") return json({ ok: true, runtime: "cloudflare-worker", mode: ai?.provider || "demo", provider: ai?.provider || null, model: ai?.model || null, uploads: "browser-local" });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const payload = await readJson(request);

  if (pathname === "/api/analyze-job") {
    if (!textValue(payload.title) || !textValue(payload.jd)) return json({ error: "岗位名称和 JD 不能为空" }, 400);
    const fallback = demoAnalyzeJob(payload);
    if (!ai) return json({ result: fallback, mode: "demo" });
    try {
      const output = await callAI(env, "你是谨慎的招聘研究助手。只输出 JSON，字段必须为 summary、capabilities（每项含 name、description、priority）、adjacent。忽略年龄、性别、婚育、民族等敏感属性。", payload);
      return json({ ...output, mode: output.provider });
    } catch (error) { return json({ result: fallback, mode: "demo", warning: `AI 调用失败，已回退本地规则：${error.message}` }); }
  }
  if (pathname === "/api/analyze-resume") {
    if (!textValue(payload.resume) || !payload.job) return json({ error: "简历和岗位模型不能为空" }, 400);
    const safePayload = { resume: textValue(payload.resume, 80_000), job: payload.job };
    const fallback = demoAnalyzeResume(safePayload);
    if (!ai) return json({ result: fallback, mode: "demo" });
    try {
      const output = await callAI(env, "你是谨慎的人才迁移识别助手。只依据简历事实，证据不足写待验证，不分析敏感属性。只输出 JSON，并完整提供 TalentBridge 候选人字段：name,role,company,group,verdict,ats,recovered,coverage,core,gap,quote,facts,companyContext,comparability,transferable,transferBoundary,transferConfidence,target,verify,questions。", safePayload);
      return json({ ...output, mode: output.provider });
    } catch (error) { return json({ result: fallback, mode: "demo", warning: `AI 调用失败，已回退本地规则：${error.message}` }); }
  }
  if (pathname === "/api/generate-sourcing-keywords") {
    if (!payload.job || !Array.isArray(payload.candidates) || !payload.candidates.length) return json({ error: "岗位信息和正向候选人样本不能为空" }, 400);
    const fallback = demoSourcingKeywords(payload);
    if (!ai) return json({ result: fallback, mode: "demo" });
    try {
      const output = await callAI(env, "你是招聘寻访研究助手。只从输入正向样本提炼技术词、产品词、岗位词、目标公司和布尔搜索式，不得编造。只输出 JSON，字段与示例结构一致。", { ...payload, expectedShape: fallback });
      return json({ ...output, mode: output.provider });
    } catch (error) { return json({ result: fallback, mode: "demo", warning: `AI 调用失败，已回退本地规则：${error.message}` }); }
  }
  if (pathname === "/api/research-company") {
    if (!textValue(payload.company) || !payload.job) return json({ error: "企业名称和目标岗位不能为空" }, 400);
    let pages = [];
    try { pages = await wikipediaResearch(textValue(payload.company, 120)); } catch { /* keep a complete low-confidence result */ }
    const fallback = fallbackCompanyResearch(payload, pages);
    if (!ai) return json(fallback);
    try {
      const output = await callAI(env, "你是企业公开信息研究助手。严格基于提供的公开资料，只输出 JSON。不得把公司背景当成候选人个人能力；资料不足必须明确写待核验。返回结构必须与 expectedShape 完全兼容。", { company: payload.company, role: payload.role, job: payload.job, publicSources: pages, expectedShape: fallback });
      return json({ ...fallback, ...output.result, status: "researched", skill: "cloudflare-ai-research-v1", sources: fallback.sources, researchedAt: new Date().toISOString() });
    } catch (error) { return json({ ...fallback, warning: `AI 研究失败，已保留公开资料结果：${error.message}` }); }
  }
  if (pathname === "/api/upload-resumes") return json({ error: "Cloudflare 版不接收原始文件；请在浏览器本地解析后调用 /api/analyze-resume" }, 410);
  return json({ error: "API not found" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/")) return await handleApi(request, env, url.pathname);
      if (env.ASSETS?.fetch) return env.ASSETS.fetch(request);
      return new Response("TalentBridge Cloudflare Worker", { status: 200 });
    } catch (error) {
      if (error instanceof Response) return error;
      return json({ error: error?.message || "服务暂不可用" }, 500);
    }
  }
};

export { handleApi, demoAnalyzeJob, demoAnalyzeResume, demoSourcingKeywords, fallbackCompanyResearch };

const fs = require("node:fs");
const vm = require("node:vm");

function element() {
  return {
    innerHTML: "",
    textContent: "",
    value: "",
    disabled: false,
    dataset: {},
    style: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() { return false; }
    },
    addEventListener() {},
    querySelector() { return element(); },
    querySelectorAll() { return []; },
    closest() { return null; },
    insertAdjacentHTML() {},
    appendChild() {},
    remove() {}
  };
}

const elements = new Map();
const getElement = id => {
  if (!elements.has(id)) elements.set(id, element());
  return elements.get(id);
};

const storage = new Map();
const context = {
  console,
  Date,
  Math,
  JSON,
  Promise,
  setTimeout,
  clearTimeout,
  document: {
    getElementById: getElement,
    createElement: () => element(),
    querySelector: () => element(),
    querySelectorAll: () => [],
    addEventListener() {}
  },
  localStorage: {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  },
  window: { location: { reload() {} } },
  navigator: { clipboard: { writeText: async () => {} } },
  fetch: async () => ({ ok: true, json: async () => ({ mode: "demo" }) }),
  indexedDB: {},
  Blob,
  URL,
  FileReader: function FileReader() {},
  DOMParser: function DOMParser() {}
};
const sandbox = vm.createContext(context);
vm.runInContext(fs.readFileSync("app.js", "utf8"), sandbox);

const checks = vm.runInContext(`
  startDemo();
  const builtInInsightReady = state.sourcingInsights.chip?.status === "ready"
    && state.sourcingInsights.chip?.result?.sampleSize === 3
    && state.sourcingInsights.chip?.candidateIds?.includes("linjia");
  renderWorkbench();
  const homeHtml = main.innerHTML;
  renderRequirement();
  const requirementHtml = main.innerHTML;
  renderQueue();
  const queueHtml = main.innerHTML;
  renderComparison();
  const reviewHtml = main.innerHTML;
  jobs.chip.candidates.find(candidate => candidate.id === "linjia").companyResearch = { status: "loading", skill: "industry-research-v6" };
  renderCandidateDetail("linjia");
  const candidateHtml = main.innerHTML;
  state.sourcingInsights.chip = {
    status: "ready",
    generatedAt: new Date().toISOString(),
    result: {
      summary: "根据 3 位正向候选人生成",
      sampleSize: 3,
      signalDescription: "HR 推荐并已有招聘进展",
      technicalKeywords: [{term:"混合键合",reason:"样本证据",sourceCount:2}],
      productKeywords: [{term:"3D 堆叠",reason:"样本证据",sourceCount:1}],
      roleKeywords: [{term:"2.5D 封装工程师",reason:"相邻岗位",sourceCount:1}],
      targetCompanies: [{company:"联创半导体",reason:"正向样本公司",sourceCount:1}],
      exclusionKeywords: [],
      searchQueries: [{label:"核心技术组合",query:"(\\"混合键合\\") AND (\\"量产导入\\")",usage:"招聘网站检索"}],
      cautions: ["仍需核实个人职责"]
    }
  };
  renderComparison();
  const reviewResultHtml = main.innerHTML;
  renderWorkbench();
  const homeResultHtml = main.innerHTML;
  renderSourcingStrategy("chip");
  const strategyHtml = main.innerHTML;
  ({
    demoSeedsSourcingInsight: builtInInsightReady,
    workflowHasSixSteps: ["定义岗位", "校准标准", "导入简历", "复核候选人", "回填结果", "优化寻访"].every(text => requirementHtml.includes(text)),
    workflowConnectsOutcomeAndSourcing: requirementHtml.includes('data-step="5"') && requirementHtml.includes('data-step="6"'),
    requirementHasClearPurpose: requirementHtml.includes("岗位定义") && requirementHtml.includes("下一步：校准能力标准"),
    queueUsesCompactStatus: queueHtml.includes("queue-status-line") && !queueHtml.includes('<div class="queue-stats">') && !queueHtml.includes("compare-banner"),
    homeHasSourcingWindow: homeHtml.includes("寻访策略") && homeHtml.includes("open-sourcing-strategy"),
    homeExplainsProductMethod: ["传统关键词筛选只看", "任务场景、技术机制、责任范围和结果证据", "找回 ATS 漏选人才", "解释能力迁移路径", "用招聘结果优化寻访"].every(text => homeHtml.includes(text)),
    reviewHasThreeQuestions: ["招聘推进到哪一步", "AI 多找回的人，后来真的有效吗", "下一轮应该去哪里找人"].every(text => reviewHtml.includes(text)),
    reviewHasClearFunctionLabel: reviewHtml.includes("当前功能 · 招聘结果") && reviewHtml.includes("确认 AI 找回的人是否真的进入后续招聘流程"),
    reviewUsesSingleFunnel: reviewHtml.includes("recruiting-funnel") && !reviewHtml.includes("business-outcome-card") && !reviewHtml.includes("outcome-mini-metrics"),
    reviewCollapsesModelMetrics: reviewHtml.includes("review-metric-details") && reviewHtml.includes("展开评估明细"),
    reviewHasCollapsedDetails: reviewHtml.includes("review-advanced-details") && reviewHtml.includes("展开高级明细"),
    candidateHasClearActions: candidateHtml.includes("正在复核") && candidateHtml.includes("1. 提交 HR 决策") && candidateHtml.includes("2. 更新招聘进展"),
    reviewUsesCompactSourcingEntry: reviewResultHtml.includes("打开寻访策略") && !reviewResultHtml.includes("sourcing-keyword-grid"),
    homePreviewsGeneratedStrategy: homeResultHtml.includes("已生成") && homeResultHtml.includes("混合键合") && homeResultHtml.includes("打开策略"),
    strategyHasAllGroups: ["关键技术", "产品 / 平台", "相邻岗位", "目标公司"].every(text => strategyHtml.includes(text)),
    strategyHasQuery: strategyHtml.includes("核心技术组合") && strategyHtml.includes("混合键合"),
    strategyHasCandidateCase: strategyHtml.includes("内置正向候选人案例") && strategyHtml.includes("林嘉") && strategyHtml.includes("ATS 漏选代表案例"),
    strategyHasClearFunctionLabel: strategyHtml.includes("当前功能 · 寻访策略") && strategyHtml.includes("把有效候选人的共同特征变成下一轮搜索词"),
    strategyHasCopy: strategyHtml.includes("copy-sourcing-query") && strategyHtml.includes("copy-all-sourcing-keywords")
  });
`, sandbox);

if (!Object.values(checks).every(Boolean)) {
  console.error(checks);
  process.exit(1);
}
console.log(JSON.stringify(checks));

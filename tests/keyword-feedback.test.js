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
  renderComparison();
  const emptyHtml = main.innerHTML;
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
  const resultHtml = main.innerHTML;
  ({
    emptyHasEntry: emptyHtml.includes("生成寻访关键词"),
    emptyHasSampleCount: emptyHtml.includes("当前已有 3 位"),
    resultHasAllGroups: ["关键技术", "产品 / 平台", "相邻岗位", "目标公司"].every(text => resultHtml.includes(text)),
    resultHasQuery: resultHtml.includes("核心技术组合") && resultHtml.includes("混合键合"),
    resultHasCopy: resultHtml.includes("copy-sourcing-query") && resultHtml.includes("copy-all-sourcing-keywords")
  });
`, sandbox);

if (!Object.values(checks).every(Boolean)) {
  console.error(checks);
  process.exit(1);
}
console.log(JSON.stringify(checks));

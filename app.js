const jobs = {
  chip: {
    id: "chip",
    title: "3D 先进封装工艺工程师",
    industry: "半导体 · 先进封装",
    summary: "负责 3D 堆叠相关工艺开发、量产导入与良率提升，协同解决互连、翘曲及可靠性问题。",
    jd: "<strong>岗位职责：</strong><br>1. 负责 3D 先进封装关键工艺开发与量产导入；<br>2. 推动晶圆减薄、键合、TSV 等制程优化；<br>3. 分析并解决翘曲、热应力、互连及可靠性问题；<br>4. 联动设备、材料和产品团队持续改善良率。<br><br><strong>任职要求：</strong><br>5 年以上先进封装工艺经验，有 3D 堆叠或相邻封装平台量产经验优先。",
    model: [
      ["先进封装工艺开发", "从方案验证到量产导入", "必须"],
      ["键合与互连工艺", "理解关键参数及失效机制", "必须"],
      ["良率提升与失效分析", "能定位问题并推动闭环", "必须"],
      ["翘曲与热应力控制", "复杂封装结构下的工艺控制", "重要"],
      ["跨团队量产协同", "设备、材料、设计及产品协作", "重要"],
      ["3D / TSV / 混合键合", "直接相关技术经验", "加分"]
    ],
    knowledgePackId: "advanced-packaging",
    adjacent: ["2.5D 封装", "CoWoS / Interposer", "HBM 集成", "晶圆级封装"],
    candidates: [
      {
        id: "linjia", name: "林嘉", role: "2.5D 封装工艺高级工程师", company: "华芯微电子",
        group: "review", verdict: "值得复核", ats: false, recovered: true, coverage: 78,
        core: "工艺开发、翘曲控制、量产良率", gap: "混合键合与超细间距互连待确认",
        quote: "负责 2.5D 先进封装平台工艺开发及量产良率改善，主导解决大尺寸中介层翘曲与微凸点互连失效问题。",
        facts: ["2.5D 工艺开发", "量产良率改善", "翘曲控制", "微凸点互连"],
        transferable: ["复杂结构工艺窗口建立", "互连失效定位", "跨制程良率闭环"],
        target: ["3D 堆叠工艺开发", "键合与互连优化", "热应力 / 翘曲控制"],
        verify: ["混合键合", "晶圆级减薄", "超细间距互连"],
        questions: [
          "请介绍你负责的 2.5D 平台中，键合与互连制程的具体范围和关键参数。",
          "大尺寸中介层翘曲问题如何定位？你主导了哪些验证与改善动作？",
          "是否接触过晶圆减薄、混合键合或更细间距互连？如果没有，如何评估学习成本？"
        ]
      },
      {
        id: "zhouyi", name: "周毅", role: "3D 集成工艺专家", company: "联创半导体",
        group: "priority", verdict: "优先联系", ats: true, recovered: false, coverage: 94,
        core: "3D 堆叠、混合键合、量产导入", gap: "团队管理范围待确认",
        quote: "主导 3D 晶圆堆叠与混合键合工艺开发，完成两代产品量产导入。",
        facts: ["3D 晶圆堆叠", "混合键合", "量产导入", "良率爬坡"],
        transferable: ["直接岗位经验", "跨团队量产协同", "工艺窗口优化"],
        target: ["3D 堆叠工艺开发", "键合与互连优化", "量产良率改善"],
        verify: ["团队影响力", "产品规模"],
        questions: ["两代产品的量产规模与核心良率挑战分别是什么？", "在设备和材料选型中承担了什么角色？", "请说明团队协同范围与个人决策边界。"]
      },
      {
        id: "chenhao", name: "陈昊", role: "先进封装研发工程师", company: "芯桥科技",
        group: "priority", verdict: "优先联系", ats: true, recovered: false, coverage: 88,
        core: "TSV、晶圆减薄、键合开发", gap: "量产规模证据较少",
        quote: "参与 TSV、晶圆减薄与临时键合工艺开发，负责 DOE 设计及可靠性验证。",
        facts: ["TSV", "晶圆减薄", "临时键合", "DOE"],
        transferable: ["关键制程开发", "可靠性验证", "实验设计"],
        target: ["3D 堆叠工艺开发", "晶圆级制程", "可靠性控制"],
        verify: ["量产导入", "良率责任"],
        questions: ["请说明项目当前量产阶段。", "你独立负责的制程模块有哪些？", "可靠性失败时如何定位根因？"]
      },
      {
        id: "wangrui", name: "王睿", role: "CoWoS 工艺整合工程师", company: "东海晶圆",
        group: "review", verdict: "值得复核", ats: false, recovered: true, coverage: 73,
        core: "工艺整合、热管理、良率闭环", gap: "直接键合经验不明",
        quote: "负责 CoWoS 工艺整合，推动热界面材料优化及封装良率提升。",
        facts: ["CoWoS 工艺整合", "热界面材料", "良率提升"],
        transferable: ["复杂封装整合", "热管理", "量产问题闭环"],
        target: ["3D 工艺整合", "热应力控制", "良率改善"],
        verify: ["键合制程深度", "TSV 经验"],
        questions: ["CoWoS 平台中负责哪些关键模块？", "热界面材料优化如何影响良率？", "是否参与 TSV 或键合制程问题解决？"]
      },
      {
        id: "xuxin", name: "徐欣", role: "封装设备应用工程师", company: "精工装备",
        group: "unknown", verdict: "信息不足", ats: true, recovered: false, coverage: 52,
        core: "键合设备、客户工艺支持", gap: "缺少完整工艺开发责任证据",
        quote: "提供 3D 封装键合设备应用支持，协助客户进行参数优化。",
        facts: ["3D 关键词", "键合设备", "参数优化"],
        transferable: ["设备机理理解", "客户问题排查"],
        target: ["键合工艺开发", "量产问题解决"],
        verify: ["工艺所有权", "完整制程经验", "量产责任"],
        questions: ["你对客户工艺参数有多大决策权？", "是否独立设计过工艺 DOE？", "是否承担过良率结果责任？"]
      },
      {
        id: "liuming", name: "刘明", role: "传统封装生产主管", company: "宏封电子",
        group: "reject", verdict: "暂不匹配", ats: false, recovered: false, coverage: 34,
        core: "生产管理、交付改善", gap: "缺少先进封装工艺开发经验",
        quote: "负责引线键合产线生产管理与交付改善，带领 35 人团队。",
        facts: ["引线键合", "生产管理", "交付"],
        transferable: ["生产协同", "现场问题处理"],
        target: ["3D 工艺开发", "先进互连", "晶圆级制程"],
        verify: ["先进封装接触程度"],
        questions: ["是否参与过先进封装项目？", "工艺开发与生产管理工作占比分别是多少？"]
      },
      {
        id: "zhaoran", name: "赵然", role: "材料研发高级工程师", company: "新材实验室",
        group: "unknown", verdict: "信息不足", ats: false, recovered: false, coverage: 48,
        core: "底填材料、热应力仿真", gap: "缺少封装整合与量产经验",
        quote: "负责先进封装底填材料开发及热应力仿真。",
        facts: ["底填材料", "热应力仿真", "先进封装"],
        transferable: ["材料机理", "热应力分析"],
        target: ["热应力控制", "材料与工艺协同"],
        verify: ["封装平台", "量产经验", "工艺整合"],
        questions: ["材料开发是否进入客户量产验证？", "是否参与完整封装结构的工艺协同？", "负责过哪些失效案例？"]
      },
      {
        id: "sunke", name: "孙柯", role: "封装可靠性工程师", company: "南芯制造",
        group: "review", verdict: "值得复核", ats: false, recovered: true, coverage: 68,
        core: "失效分析、可靠性验证、跨团队改善", gap: "前段工艺开发深度待确认",
        quote: "负责先进封装可靠性验证及失效分析，推动温循失效与界面分层问题改善。",
        facts: ["可靠性验证", "失效分析", "界面分层"],
        transferable: ["失效机理理解", "问题闭环", "跨团队改善"],
        target: ["可靠性控制", "良率改善", "界面问题解决"],
        verify: ["工艺开发", "键合与互连"],
        questions: ["是否参与过工艺参数优化？", "温循失效的主要根因和改善路径是什么？", "与工艺团队如何划分责任？"]
      }
    ]
  },
  sales: {
    id: "sales",
    title: "SaaS 大客户销售",
    industry: "企业服务 · 销售",
    summary: "面向大型企业客户开展解决方案销售，管理复杂决策链并推动长期项目签约与续费。",
    jd: "<strong>岗位职责：</strong><br>1. 负责大型企业客户开发与全周期商机管理；<br>2. 深入理解客户业务，联动售前输出解决方案；<br>3. 管理多角色决策链，推进商务谈判与签约；<br>4. 对年度收入、回款与客户续约负责。<br><br><strong>任职要求：</strong><br>5 年以上复杂 ToB 销售经验，有 SaaS 或企业软件经验优先。",
    model: [
      ["复杂 ToB 销售", "长周期、多角色决策链", "必须"],
      ["客户需求诊断", "将业务问题转化为方案", "必须"],
      ["商机全周期管理", "从获客到签约及回款", "必须"],
      ["方案协同能力", "联动售前、产品和交付", "重要"],
      ["大型客户关系", "多层级关系建立与维护", "重要"],
      ["SaaS 订阅模式", "续约、增购及客户成功", "加分"]
    ],
    knowledgePackId: "enterprise-sales",
    adjacent: ["工业设备方案销售", "IT 集成大客户销售", "咨询项目销售", "云服务销售"],
    candidates: [
      {
        id: "heyu", name: "何宇", role: "工业自动化大客户经理", company: "启明智造",
        group: "review", verdict: "值得复核", ats: false, recovered: true, coverage: 81,
        core: "复杂决策链、方案销售、千万级项目", gap: "SaaS 订阅与续费经验待确认",
        quote: "负责汽车制造客户自动化解决方案销售，协调技术与交付团队，主导多个千万级长周期项目。",
        facts: ["大型制造客户", "解决方案销售", "长周期项目", "千万级合同"],
        transferable: ["复杂决策链管理", "需求诊断", "跨团队方案协同"],
        target: ["企业 SaaS 销售", "全周期商机管理", "大型客户经营"],
        verify: ["订阅商业模式", "续约与增购", "软件产品理解"],
        questions: ["如何识别并推动客户内部不同角色？", "从首次接触到签约的关键节点是什么？", "如何理解订阅模式下的续约责任？"]
      },
      {
        id: "tangwen", name: "唐文", role: "企业软件销售总监", company: "云启软件",
        group: "priority", verdict: "优先联系", ats: true, recovered: false, coverage: 95,
        core: "SaaS、集团客户、续约增购", gap: "目标行业客户资源待确认",
        quote: "负责集团型客户 SaaS 销售及续约增购，连续三年完成年度指标。",
        facts: ["SaaS", "集团客户", "续约增购", "年度指标"],
        transferable: ["直接岗位经验", "客户经营", "收入责任"],
        target: ["企业 SaaS 销售", "续约增购", "大型客户经营"],
        verify: ["客户行业", "团队范围"],
        questions: ["近三年新签与续约收入占比如何？", "最大项目的决策链是什么？", "目标行业客户经验有哪些？"]
      },
      {
        id: "gaofei", name: "高飞", role: "消费品渠道销售经理", company: "星河消费",
        group: "reject", verdict: "暂不匹配", ats: false, recovered: false, coverage: 31,
        core: "渠道管理、经销商拓展", gap: "缺少复杂 ToB 方案销售经验",
        quote: "负责华东区域经销商拓展与渠道销售目标。",
        facts: ["渠道销售", "经销商", "区域目标"],
        transferable: ["目标管理", "商务沟通"],
        target: ["复杂方案销售", "多角色决策链", "长期客户经营"],
        verify: ["企业直销经验"],
        questions: ["是否直接负责过大型企业客户？", "是否参与过方案型项目销售？"]
      }
    ]
  }
};

const knowledgePacks = {
  "advanced-packaging": {
    id: "advanced-packaging",
    name: "先进封装人才知识包",
    industry: "半导体 · 先进封装",
    description: "用于理解 2.5D、3D、CoWoS、TSV 等技术关系，以及工艺开发、整合和可靠性岗位之间的迁移边界。",
    terms: [
      ["2.5D 封装", "中介层、微凸点、Chiplet 集成"],
      ["3D 封装", "晶圆或芯片垂直堆叠、混合键合"],
      ["CoWoS", "2.5D 系统整合与量产平台"],
      ["TSV", "硅通孔垂直互连技术"]
    ],
    positiveRules: [
      "2.5D 工艺开发经验可迁移至 3D 的工艺窗口、翘曲、互连与良率问题",
      "CoWoS 工艺整合经验可迁移至复杂封装整合和跨制程问题闭环",
      "可靠性与失效分析经验可作为工艺优化能力的旁证"
    ],
    riskRules: [
      "仅有设备应用支持不等于承担完整工艺开发责任",
      "传统引线键合生产管理不能直接替代晶圆级先进封装经验",
      "简历出现 3D 关键词不代表具备量产导入经验"
    ],
    questions: [
      "候选人具体负责哪些制程模块和关键参数？",
      "是否承担过量产良率或可靠性结果责任？",
      "目标岗位特有的混合键合、减薄或超细间距经验是否具备？"
    ]
  },
  "enterprise-sales": {
    id: "enterprise-sales",
    name: "企业级复杂销售知识包",
    industry: "企业服务 · 大客户销售",
    description: "用于识别 SaaS、工业设备、IT 集成和咨询销售背后的复杂决策链、方案能力与长期客户经营经验。",
    terms: [
      ["复杂 ToB 销售", "长周期、多角色、非标准方案"],
      ["方案式销售", "从客户业务问题出发设计解决方案"],
      ["SaaS 销售", "订阅、续约、增购和客户成功协同"],
      ["大客户经营", "多层级关系与长期收入责任"]
    ],
    positiveRules: [
      "工业设备方案销售可迁移复杂决策链和跨团队方案协同能力",
      "IT 集成销售可迁移大型客户关系和项目型商机管理",
      "咨询项目销售可迁移高层沟通与需求诊断能力"
    ],
    riskRules: [
      "消费品渠道销售不等于企业直销和复杂方案销售",
      "客户资源数量不能替代完整商机推进能力",
      "一次性项目经验不能直接证明续约和增购能力"
    ],
    questions: [
      "最大项目的决策链、销售周期和合同规模如何？",
      "候选人如何将客户问题转化为可交付方案？",
      "是否承担续约、增购、回款或长期客户经营责任？"
    ]
  }
};

const state = {
  currentJob: "chip",
  view: "workbench",
  step: 1,
  imported: { chip: false, sales: false },
  filter: "all",
  selectedCandidate: null,
  importTab: "sample",
  uploadFiles: [],
  decisions: {},
  evaluations: {},
  deletedCandidates: {},
  selectedKnowledgePack: "advanced-packaging"
};

const STORAGE_KEY = "talentbridge-demo-state-v1";

function loadSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return;
    if (saved.customJobs) {
      Object.entries(saved.customJobs).forEach(([jobId, job]) => {
        if (!jobs[jobId]) jobs[jobId] = job;
      });
    }
    if (jobs[saved.currentJob]) state.currentJob = saved.currentJob;
    if (saved.imported) state.imported = { ...state.imported, ...saved.imported };
    if (saved.decisions) state.decisions = saved.decisions;
    if (saved.evaluations) state.evaluations = saved.evaluations;
    if (saved.deletedCandidates) state.deletedCandidates = saved.deletedCandidates;
    if (saved.knowledgePacks) {
      Object.entries(saved.knowledgePacks).forEach(([packId, pack]) => {
        knowledgePacks[packId] = pack;
      });
    }
    if (saved.selectedKnowledgePack && knowledgePacks[saved.selectedKnowledgePack]) {
      state.selectedKnowledgePack = saved.selectedKnowledgePack;
    }
    if (saved.customCandidates) {
      Object.entries(saved.customCandidates).forEach(([jobId, candidates]) => {
        if (jobs[jobId] && Array.isArray(candidates)) {
          jobs[jobId].candidates.push(...candidates);
        }
      });
    }
    Object.entries(state.deletedCandidates).forEach(([jobId, candidateIds]) => {
      if (jobs[jobId] && Array.isArray(candidateIds)) {
        jobs[jobId].candidates = jobs[jobId].candidates.filter(candidate => !candidateIds.includes(candidate.id));
      }
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  const customCandidates = {};
  const customJobs = {};
  Object.values(jobs).forEach(job => {
    customCandidates[job.id] = job.candidates.filter(candidate => candidate.custom);
    if (job.custom) {
      customJobs[job.id] = {
        ...job,
        candidates: job.candidates.filter(candidate => !candidate.custom)
      };
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    currentJob: state.currentJob,
    imported: state.imported,
    decisions: state.decisions,
    evaluations: state.evaluations,
    deletedCandidates: state.deletedCandidates,
    knowledgePacks,
    selectedKnowledgePack: state.selectedKnowledgePack,
    customCandidates,
    customJobs
  }));
}

const main = document.getElementById("mainContent");
const modal = document.getElementById("modalBackdrop");
const importContent = document.getElementById("importContent");
const importConfirm = document.getElementById("importConfirm");
const onboarding = document.getElementById("onboardingBackdrop");
const resumeModal = document.getElementById("resumeModalBackdrop");
const resumeModalTitle = document.getElementById("resumeModalTitle");
const resumeModalMeta = document.getElementById("resumeModalMeta");
const resumeOriginalText = document.getElementById("resumeOriginalText");
const ONBOARDING_KEY = "talentbridge-onboarding-seen";

async function apiRequest(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `请求失败（${response.status}）`);
  return data;
}

async function detectAiMode() {
  const badge = document.getElementById("aiMode");
  if (!badge) return;
  try {
    const response = await fetch("/api/health", { cache: "no-store" });
    if (!response.ok) throw new Error("unavailable");
    const data = await response.json();
    const live = data.mode !== "demo";
    const providerName = data.provider === "deepseek" ? "DeepSeek" : data.provider === "openai" ? "OpenAI" : "AI";
    badge.className = `ai-mode ${live ? "live" : "demo"}`;
    badge.innerHTML = `<i></i><span>${live ? `${providerName} · ${escapeHtml(data.model)}` : "AI 演示模式"}</span>`;
  } catch {
    badge.className = "ai-mode demo";
    badge.innerHTML = "<i></i><span>静态原型模式</span>";
  }
}

function currentJob() {
  return jobs[state.currentJob];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function toast(title, detail = "") {
  const region = document.getElementById("toastRegion");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${escapeHtml(title)}</strong>${detail ? `<span>${escapeHtml(detail)}</span>` : ""}`;
  region.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

function setActiveSidebar() {
  document.querySelectorAll(".recent-job").forEach(el => el.classList.toggle("active", el.dataset.job === state.currentJob));
  document.querySelectorAll(".nav-item[data-nav]").forEach(el => el.classList.toggle("active", el.dataset.nav === state.view));
}

function jobIcon(job) {
  if (job.id === "chip") return "芯";
  if (job.id === "sales") return "销";
  return job.title.slice(0, 1);
}

function renderRecentJobs() {
  const container = document.querySelector(".sidebar-section");
  if (!container) return;
  container.innerHTML = `
    <p>最近访问</p>
    ${Object.values(jobs).slice(0, 5).map(job => `
      <button class="recent-job ${job.id === state.currentJob && state.view === "job" ? "active" : ""}" data-job="${job.id}">
        <span class="job-icon ${job.id}">${jobIcon(job)}</span>
        <span><strong>${escapeHtml(job.title)}</strong><small>${escapeHtml(job.industry)} · ${job.custom ? "自定义" : job.id === "chip" ? "分析中" : "示例"}</small></span>
      </button>`).join("")}`;
}

function stepHeader(active) {
  const job = currentJob();
  const labels = ["岗位需求", "能力校准", "候选人导入", "AI 复核"];
  return `
    <div class="page-head">
      <div class="breadcrumbs"><span>招聘项目</span><span>/</span><b>${job.title}</b></div>
      <div class="title-row">
        <div class="title-copy">
          <span class="job-icon ${job.id}">${jobIcon(job)}</span>
          <div><h1>${job.title}</h1><p>${job.industry} · 最后更新于刚刚</p></div>
        </div>
        <div class="title-actions">
          <button class="btn secondary" data-action="switch-job">返回项目列表</button>
          ${active >= 3 ? `<button class="btn primary" data-action="open-import">＋ 导入候选人</button>` : ""}
        </div>
      </div>
      <div class="stepper">
        ${labels.map((label, index) => {
          const num = index + 1;
          const cls = num === active ? "active" : num < active ? "done" : "";
          const mark = num < active ? "✓" : num;
          return `<button class="step ${cls}" data-step="${num}"><span>${mark}</span>${label}</button>`;
        }).join("")}
      </div>
    </div>`;
}

function renderWorkbench() {
  state.view = "workbench";
  setActiveSidebar();
  renderRecentJobs();
  const chipImported = state.imported.chip;
  main.innerHTML = `
    <section class="page">
      <div class="overview-hero">
        <div class="hero-copy">
          <p class="eyebrow">AI 人才研究工作台</p>
          <h1>找到关键词之外，真正值得被看见的人</h1>
          <p>将岗位要求与候选人经历还原为底层任务和能力，识别潜在迁移关系。每个判断都有证据，每个缺口都留给人来确认。</p>
          <div class="hero-actions">
            <button class="btn primary" data-action="open-current">继续分析当前岗位</button>
            <button class="btn secondary" data-action="new-project">＋ 创建招聘项目</button>
            <button class="btn ghost" data-action="start-demo">▶ 3 分钟演示</button>
          </div>
        </div>
        <aside class="hero-insight">
          <div class="insight-title"><span class="pulse"></span>本周人才洞察</div>
          <div class="big-number">${chipImported ? "3" : "--"}<small>位 AI 新找回候选人</small></div>
          <p class="tiny">${chipImported ? "他们未被关键词 ATS 命中，但底层经历与岗位存在可信关联。" : "完成候选人导入后，这里将展示增量召回结果。"}</p>
          <div class="insight-list">
            <div><span>进行中的岗位</span><strong>${Object.keys(jobs).length}</strong></div>
            <div><span>待人工复核</span><strong>${chipImported ? "4" : "0"}</strong></div>
            <div><span>预计节省筛选时间</span><strong>${chipImported ? "42 分钟" : "--"}</strong></div>
          </div>
        </aside>
      </div>
      <div class="dashboard-body">
        <div class="section-title">
          <div><h2>招聘项目</h2><p>从一个岗位开始，校准标准并识别可迁移人才</p></div>
          <button class="btn ghost" data-action="all-projects">查看全部</button>
        </div>
        <div class="project-grid">
          ${Object.values(jobs).slice(0, 4).map(job => projectCard(job, projectMetrics(job))).join("")}
        </div>
      </div>
    </section>`;
}

function startDemo() {
  localStorage.setItem(ONBOARDING_KEY, "true");
  onboarding?.classList.add("hidden");
  state.currentJob = "chip";
  state.imported.chip = true;
  state.filter = "recovered";
  state.evaluations["chip:linjia"] = "relevant";
  state.evaluations["chip:zhouyi"] = "relevant";
  state.evaluations["chip:chenhao"] = "relevant";
  state.evaluations["chip:wangrui"] = "relevant";
  state.evaluations["chip:liuming"] = "irrelevant";
  saveState();
  renderQueue();
  toast("标准演示已就绪", "先打开“林嘉”，查看 2.5D → 3D 的能力迁移路径");
}

function renderGuide() {
  state.view = "guide";
  setActiveSidebar();
  renderRecentJobs();
  main.innerHTML = `
    <section class="page">
      <div class="page-head" style="padding-bottom:20px">
        <div class="breadcrumbs"><b>产品说明</b></div>
        <div class="title-row">
          <div class="title-copy"><div><h1>TalentBridge 演示指南</h1><p>面向评审与首次用户的产品价值、操作路径和决策边界</p></div></div>
          <div class="title-actions"><button class="btn secondary" data-action="reset-demo">重置演示数据</button><button class="btn primary" data-action="start-demo">开始标准演示</button></div>
        </div>
      </div>
      <div class="page-body">
        <div class="guide-hero card">
          <div><p class="eyebrow">一句话价值</p><h2>不只匹配候选人说过什么，更理解他做过什么，以及这些经验还能用在哪里。</h2></div>
          <div class="guide-boundary"><span>AI</span><p><strong>辅助召回与解释</strong><br>不自动淘汰，不替代 HR 作录用决定。</p></div>
        </div>
        <div class="guide-grid">
          <section class="card guide-script">
            <div class="card-head"><div><h2>3 分钟演示路径</h2><p>建议按以下顺序向评委展示</p></div><span class="tag blue">约 2 分 40 秒</span></div>
            <div class="card-body">
              ${guideStep("00:00–00:30", "问题与岗位", "进入 3D 先进封装岗位，说明关键词 ATS 无法识别 2.5D 经验的迁移价值。", "岗位需求")}
              ${guideStep("00:30–01:00", "能力校准", "展示岗位能力模型和知识包，强调规则可切换到其他行业。", "能力校准")}
              ${guideStep("01:00–01:50", "AI 新找回", "进入复核队列，打开林嘉，展示 ATS 未命中与 2.5D → 3D 迁移路径。", "核心亮点")}
              ${guideStep("01:50–02:20", "人机共决策", "展示简历事实、AI 推断、待验证缺口和建议追问。", "可信边界")}
              ${guideStep("02:20–02:40", "效果评估", "展示召回率、精确率、增量候选人和人工复核成本。", "业务价值")}
            </div>
          </section>
          <aside class="stack">
            <section class="card">
              <div class="card-head"><div><h3>五项评分对应</h3></div></div>
              <div class="card-body score-map">
                <div><span>思辨深度</span><p>信息不足不等于不匹配，事实与推断分离。</p></div>
                <div><span>创意巧思</span><p>从关键词匹配升级为能力迁移识别。</p></div>
                <div><span>功能完整</span><p>岗位校准、简历导入、复核、反馈、评估闭环。</p></div>
                <div><span>交互体验</span><p>浅色企业工作台和可追溯证据。</p></div>
                <div><span>落地可行</span><p>支持真实文件、AI API、知识包和人工决策。</p></div>
              </div>
            </section>
            <section class="card">
              <div class="card-head"><div><h3>演示前检查</h3></div></div>
              <div class="card-body checklist">
                <label><input type="checkbox"> 服务状态显示“AI 演示模式”或“真实 AI”</label>
                <label><input type="checkbox"> 标准案例中出现 3 位 AI 新找回候选人</label>
                <label><input type="checkbox"> 林嘉详情展示事实、推断和待验证项</label>
                <label><input type="checkbox"> 效果评估页已有人工标准答案</label>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>`;
}

function guideStep(time, title, detail, tag) {
  return `<div class="guide-step"><time>${time}</time><span></span><div><strong>${title}</strong><p>${detail}</p></div><em>${tag}</em></div>`;
}

function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(ONBOARDING_KEY, "true");
  window.location.reload();
}

function projectMetrics(job) {
  const imported = state.imported[job.id];
  if (!imported && job.custom) return ["0", "--", "0"];
  return [
    job.candidates.length,
    job.candidates.filter(candidate => candidate.recovered).length,
    job.candidates.filter(candidate => ["review", "unknown"].includes(candidate.group)).length
  ];
}

function projectCard(job, metrics) {
  return `
    <article class="card project-card" data-action="open-project" data-job="${job.id}">
      <div class="project-top">
        <div class="project-id">
          <span class="job-icon ${job.id}">${jobIcon(job)}</span>
          <div><h3>${job.title}</h3><p>${job.industry}</p></div>
        </div>
        <span class="tag ${job.custom ? "purple" : job.id === "chip" ? "blue" : "cyan"} dot">${job.custom ? "自定义岗位" : job.id === "chip" ? "分析中" : "跨行业示例"}</span>
      </div>
      <div class="project-metrics">
        <div><strong>${metrics[0]}</strong><span>候选人</span></div>
        <div><strong>${metrics[1]}</strong><span>AI 新找回</span></div>
        <div><strong>${metrics[2]}</strong><span>待复核</span></div>
      </div>
    </article>`;
}

function renderProjects() {
  state.view = "projects";
  setActiveSidebar();
  renderRecentJobs();
  const allJobs = Object.values(jobs);
  main.innerHTML = `
    <section class="page">
      <div class="page-head" style="padding-bottom:20px">
        <div class="breadcrumbs"><b>招聘项目</b></div>
        <div class="title-row">
          <div class="title-copy"><div><h1>招聘项目</h1><p>管理岗位标准、候选人和 AI 复核进度</p></div></div>
          <button class="btn primary" data-action="new-project">＋ 创建招聘项目</button>
        </div>
      </div>
      <div class="page-body">
        <div class="queue-stats">
          ${statCard("全部岗位", allJobs.length, "包含示例与自定义岗位")}
          ${statCard("已导入候选人", Object.values(state.imported).filter(Boolean).length, "已进入人才分析阶段")}
          ${statCard("候选人总数", allJobs.reduce((sum, job) => sum + (state.imported[job.id] ? job.candidates.length : 0), 0), "当前工作区")}
          ${statCard("AI 新找回", allJobs.reduce((sum, job) => sum + (state.imported[job.id] ? job.candidates.filter(c => c.recovered).length : 0), 0), "关键词筛选未命中", "cyan")}
        </div>
        <div class="section-title">
          <div><h2>全部项目</h2><p>点击岗位继续校准或复核人才</p></div>
        </div>
        <div class="project-grid">${allJobs.map(job => projectCard(job, projectMetrics(job))).join("")}</div>
      </div>
    </section>`;
}

function renderCreateProject() {
  state.view = "projects";
  setActiveSidebar();
  main.innerHTML = `
    <section class="page">
      <div class="page-head" style="padding-bottom:20px">
        <div class="breadcrumbs"><button class="btn ghost small" data-action="back-projects">← 招聘项目</button><span>/</span><b>创建项目</b></div>
        <div class="title-row"><div class="title-copy"><div><h1>创建招聘项目</h1><p>输入真实 JD，先建立一版可人工校准的岗位模型</p></div></div></div>
      </div>
      <div class="page-body">
        <form class="card create-form" id="createProjectForm">
          <div class="card-head"><div><h2>岗位基本信息</h2><p>带 * 的内容用于生成首版岗位理解</p></div></div>
          <div class="card-body form-body">
            <div class="form-row">
              <label class="field"><span>岗位名称 *</span><input id="newJobTitle" required placeholder="例如：新能源汽车供应链总监"></label>
              <label class="field"><span>行业 / 业务方向 *</span><input id="newJobIndustry" required placeholder="例如：新能源汽车 · 供应链"></label>
            </div>
            <label class="field"><span>岗位 JD *</span><textarea id="newJobJd" required rows="12" placeholder="粘贴岗位职责、任职要求，以及招聘经理的补充说明……"></textarea></label>
            <label class="field"><span>招聘经理补充</span><textarea id="newJobNote" rows="4" placeholder="例如：必须有复杂供应商管理经验；消费电子背景也可以接受。"></textarea></label>
            <div class="privacy-tip"><span>AI</span><p><strong>生成逻辑</strong><br>当前 Demo 会根据 JD 中的任务表达生成可编辑能力模型，不会把年龄、性别等敏感属性纳入判断。</p></div>
          </div>
          <div class="form-footer"><button type="button" class="btn secondary" data-action="back-projects">取消</button><button type="submit" class="btn primary">生成岗位能力模型 →</button></div>
        </form>
      </div>
    </section>`;
}

function renderKnowledgeBase() {
  state.view = "knowledge";
  setActiveSidebar();
  renderRecentJobs();
  const pack = knowledgePacks[state.selectedKnowledgePack] || Object.values(knowledgePacks)[0];
  main.innerHTML = `
    <section class="page">
      <div class="page-head" style="padding-bottom:20px">
        <div class="breadcrumbs"><b>岗位知识库</b></div>
        <div class="title-row">
          <div class="title-copy"><div><h1>岗位知识库</h1><p>把招聘经理和资深招聘人员的隐性判断沉淀为可复用知识包</p></div></div>
          <button class="btn primary" data-action="new-knowledge-pack">＋ 新建知识包</button>
        </div>
      </div>
      <div class="page-body">
        <div class="knowledge-layout">
          <aside class="card knowledge-list">
            <div class="card-head"><div><h3>知识包</h3><p>${Object.keys(knowledgePacks).length} 个可用行业包</p></div></div>
            <div class="knowledge-list-body">
              ${Object.values(knowledgePacks).map(item => `
                <button class="knowledge-pack-item ${item.id === pack.id ? "active" : ""}" data-pack="${item.id}">
                  <span class="job-icon ${item.id}">${item.name.slice(0, 1)}</span>
                  <span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.industry)}</small></span>
                </button>`).join("")}
            </div>
          </aside>
          <div class="stack">
            <div class="card">
              <div class="card-head">
                <div><p class="eyebrow">Knowledge Pack · <span contenteditable="true" data-pack-industry>${escapeHtml(pack.industry)}</span></p><h2 contenteditable="true" data-pack-name>${escapeHtml(pack.name)}</h2><p contenteditable="true" data-pack-description>${escapeHtml(pack.description)}</p></div>
                <div class="title-actions"><button class="btn secondary" data-action="save-knowledge-pack">保存修改</button><button class="btn primary" data-action="apply-knowledge-pack">应用到当前岗位</button></div>
              </div>
              <div class="card-body knowledge-editor" data-pack-editor="${pack.id}">
                ${knowledgeSection("术语与概念关系", "帮助 AI 理解不同表达背后的上下位或相邻关系", "terms", pack.terms, true)}
                ${knowledgeSection("正向迁移规则", "什么经历虽然名称不同，但底层任务和能力可以迁移", "positiveRules", pack.positiveRules)}
                ${knowledgeSection("反向风险规则", "哪些表面相关经历不能直接视为胜任证据", "riskRules", pack.riskRules)}
                ${knowledgeSection("建议验证问题", "当证据不足时，HR 应该如何向候选人确认", "questions", pack.questions)}
              </div>
            </div>
            <div class="card ai-summary">
              <div class="card-body">
                <p class="eyebrow">当前应用状态</p>
                <p style="margin:0 0 6px;font-weight:600">${currentJob().knowledgePackId === pack.id ? `已应用至「${escapeHtml(currentJob().title)}」` : "尚未应用到当前岗位"}</p>
                <p class="tiny" style="line-height:1.7;margin-bottom:0">知识包只提供分析背景和迁移边界。AI 仍必须引用候选人简历证据，不能把知识规则当作候选人事实。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function knowledgeSection(title, description, field, items, paired = false) {
  return `
    <section class="knowledge-section" data-knowledge-field="${field}" data-paired="${paired}">
      <header><div><h3>${title}</h3><p>${description}</p></div><button class="btn small secondary" data-action="add-knowledge-item" data-field="${field}">＋ 添加</button></header>
      <div class="knowledge-items">
        ${items.map((item, index) => {
          const values = paired ? item : [item];
          return `<div class="knowledge-row" data-knowledge-index="${index}">
            ${values.map((value, valueIndex) => `<div contenteditable="true" data-value-index="${valueIndex}">${escapeHtml(value)}</div>`).join("")}
            <button class="delete-btn" data-action="delete-knowledge-item" title="删除">×</button>
          </div>`;
        }).join("")}
      </div>
    </section>`;
}

function readKnowledgePackFromPage() {
  const editor = document.querySelector("[data-pack-editor]");
  if (!editor) return null;
  const pack = knowledgePacks[editor.dataset.packEditor];
  if (!pack) return null;
  pack.name = document.querySelector("[data-pack-name]")?.textContent.trim() || pack.name;
  pack.industry = document.querySelector("[data-pack-industry]")?.textContent.trim() || pack.industry;
  pack.description = document.querySelector("[data-pack-description]")?.textContent.trim() || pack.description;
  editor.querySelectorAll("[data-knowledge-field]").forEach(section => {
    const field = section.dataset.knowledgeField;
    const paired = section.dataset.paired === "true";
    pack[field] = [...section.querySelectorAll(".knowledge-row")].map(row => {
      const values = [...row.querySelectorAll("[contenteditable='true']")].map(el => el.textContent.trim());
      return paired ? values : values[0];
    }).filter(item => Array.isArray(item) ? item.some(Boolean) : Boolean(item));
  });
  return pack;
}

function buildKnowledgeContext(job) {
  const pack = knowledgePacks[job.knowledgePackId];
  if (!pack) return null;
  return {
    id: pack.id,
    name: pack.name,
    terms: pack.terms,
    positiveRules: pack.positiveRules,
    riskRules: pack.riskRules,
    questions: pack.questions
  };
}

function buildJobFromForm(title, industry, jdText, note) {
  const id = `job-${Date.now()}`;
  const clauses = jdText
    .split(/[\n；。]/)
    .map(item => item.replace(/^\s*[\d一二三四五六七八九十]+[.、)]?\s*/, "").trim())
    .filter(item => item.length >= 6);
  const modelNames = clauses.slice(0, 5);
  while (modelNames.length < 5) {
    modelNames.push(["核心业务任务", "专业问题解决", "跨团队协同", "结果交付", "行业知识"][modelNames.length]);
  }
  return {
    id,
    custom: true,
    title,
    industry,
    summary: clauses[0] || `围绕${title}的核心业务目标开展工作，并对关键结果负责。`,
    jdText,
    jd: formatJd(jdText, note),
    note,
    model: modelNames.map((name, index) => [name.slice(0, 22), index < 3 ? "从 JD 中识别的核心要求" : "建议由招聘经理进一步校准", index < 3 ? "必须" : "重要"]),
    adjacent: ["相邻行业经验", "相似业务场景", "可迁移项目经历"],
    knowledgePackId: null,
    candidates: []
  };
}

function formatJd(jdText, note = "") {
  const body = escapeHtml(jdText).replace(/\r?\n/g, "<br>");
  const supplement = note ? `<br><br><strong>招聘经理补充：</strong><br>${escapeHtml(note).replace(/\r?\n/g, "<br>")}` : "";
  return `${body}${supplement}`;
}

function renderRequirement() {
  state.view = "job";
  state.step = 1;
  setActiveSidebar();
  renderRecentJobs();
  const job = currentJob();
  main.innerHTML = `
    <section class="page">
      ${stepHeader(1)}
      <div class="page-body">
        <div class="content-grid">
          <div class="card">
            <div class="card-head">
              <div><h2>岗位需求</h2><p>确认 JD 与业务背景，AI 将据此生成初始能力模型</p></div>
              <span class="tag green dot">已解析</span>
            </div>
            <div class="card-body">
              <div class="jd-box">${job.jd}</div>
              <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
                <button class="btn secondary" data-action="edit-jd">编辑 JD</button>
                <button class="btn primary" data-step="2">查看 AI 能力模型</button>
              </div>
            </div>
          </div>
          <div class="stack">
            <div class="card ai-summary">
              <div class="card-head"><div><p class="eyebrow">AI 岗位理解</p><h3>这个岗位真正要解决什么？</h3></div></div>
              <div class="card-body">
                <ul>
                  <li>${job.summary}</li>
                  <li>识别到 ${job.model.length} 项关键能力，其中 3 项建议设为必须。</li>
                  <li>发现 ${job.adjacent.length} 类可能具备迁移价值的相邻经历。</li>
                </ul>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div><h3>输入来源</h3><p>结论只基于以下可追溯信息</p></div></div>
              <div class="card-body">
                <p><span class="tag green">JD 原文</span> <span class="tag blue">招聘经理补充</span></p>
                <p class="tiny">暂未使用候选人的年龄、性别、婚育等非岗位相关信息。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function renderCalibration() {
  state.view = "job";
  state.step = 2;
  setActiveSidebar();
  renderRecentJobs();
  const job = currentJob();
  main.innerHTML = `
    <section class="page">
      ${stepHeader(2)}
      <div class="page-body">
        <div class="content-grid equal">
          <div class="card">
            <div class="card-head">
              <div><h2>岗位能力模型</h2><p>调整重要程度，避免 AI 将模糊要求当作硬性淘汰项</p></div>
              <button class="btn small secondary" data-action="add-capability">＋ 添加能力</button>
            </div>
            <div class="card-body">
              <div class="model-list" id="modelList">
                ${job.model.map((item, index) => modelItem(item, index)).join("")}
              </div>
              <div style="margin-top:16px;padding:12px;border-radius:6px;background:#f7f9fd">
                <p style="margin:0 0 8px;font-weight:500;font-size:12px">可接受的相邻经历</p>
                <div class="choice-row">${job.adjacent.map(x => `<button class="choice selected">${x} <span>×</span></button>`).join("")}<button class="choice" data-action="add-adjacent">＋ 添加</button></div>
              </div>
            </div>
          </div>
          <div class="stack">
            <div class="card">
              <div class="card-head"><div><p class="eyebrow">招聘经理校准</p><h3>把隐性判断说清楚</h3><p>4 个问题 · 预计 2 分钟</p></div></div>
              <div class="card-body">
                <div class="calibration-item">
                  <label>信息不足时，系统应该如何处理？</label>
                  <div class="choice-row">
                    <button class="choice selected">扩大召回，进入复核</button>
                    <button class="choice">谨慎推荐</button>
                  </div>
                </div>
                <div class="calibration-item">
                  <label>哪类成果最能证明候选人胜任？</label>
                  <div class="choice-row">
                    <button class="choice selected">${job.id === "chip" ? "量产导入" : "大型项目签约"}</button>
                    <button class="choice selected">${job.id === "chip" ? "良率改善" : "持续完成指标"}</button>
                    <button class="choice">${job.id === "chip" ? "论文专利" : "客户资源"}</button>
                  </div>
                </div>
                <div class="calibration-item">
                  <label>是否接受相邻行业或相邻技术方向？</label>
                  <div class="choice-row"><button class="choice selected">接受，但必须解释迁移路径</button><button class="choice">仅接受直接经验</button></div>
                </div>
                <div class="calibration-item">
                  <label>系统不得自动淘汰证据不足的人选</label>
                  <div class="choice-row"><button class="choice selected">已确认</button></div>
                </div>
              </div>
            </div>
            <button class="btn primary" style="min-height:42px" data-action="confirm-model">确认岗位模型，导入候选人 →</button>
          </div>
        </div>
      </div>
    </section>`;
}

function modelItem(item, index) {
  return `
    <div class="model-item" data-model-index="${index}">
      <div class="model-main"><strong contenteditable="true">${escapeHtml(item[0])}</strong><span contenteditable="true">${escapeHtml(item[1])}</span></div>
      <select class="priority-select"><option ${item[2] === "必须" ? "selected" : ""}>必须</option><option ${item[2] === "重要" ? "selected" : ""}>重要</option><option ${item[2] === "加分" ? "selected" : ""}>加分</option></select>
      <button class="delete-btn" data-action="delete-capability" data-index="${index}" title="删除">×</button>
    </div>`;
}

function renderImportStep() {
  state.view = "job";
  state.step = 3;
  setActiveSidebar();
  renderRecentJobs();
  const job = currentJob();
  const imported = state.imported[job.id];
  main.innerHTML = `
    <section class="page">
      ${stepHeader(3)}
      <div class="page-body">
        <div class="content-grid">
          <div class="card">
            <div class="card-head">
              <div><h2>${imported ? "候选人已就绪" : "导入候选人"}</h2><p>简历将仅用于当前岗位的能力迁移分析</p></div>
              ${imported ? `<span class="tag green dot">${job.candidates.length} 份解析完成</span>` : ""}
            </div>
            <div class="card-body">
              ${imported ? importedList(job) : `
                <div class="import-drop">
                  <div>
                    <div class="upload-icon">⇧</div>
                    <h3>添加候选人简历</h3>
                    <p>支持使用示例数据、上传 PDF / DOCX 或粘贴文本</p>
                    <button class="btn primary" data-action="open-import">选择导入方式</button>
                  </div>
                </div>`}
            </div>
          </div>
          <div class="stack">
            <div class="card">
              <div class="card-head"><div><h3>分析依据</h3><p>系统会从五个维度还原候选人经历</p></div></div>
              <div class="card-body">
                ${["业务任务", "工作方法", "问题复杂度", "责任范围", "结果证据"].map((x, i) => `<div class="parse-step"><span class="check">${i + 1}</span>${x}</div>`).join("")}
              </div>
            </div>
            <div class="card ai-summary">
              <div class="card-body">
                <p style="margin-top:0;font-weight:600">不会把“没写”当作“不会”</p>
                <p class="tiny" style="line-height:1.7;margin-bottom:0">简历中缺失的能力会被标记为待验证，而不是直接降低为不匹配。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function importedList(job) {
  return `
    <div class="parse-panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><strong>AI 解析完成</strong><span class="tag green">100%</span></div>
      <div class="progress"><i style="width:100%"></i></div>
      <div class="sample-preview">
        ${job.candidates.slice(0, 8).map(c => `<div class="sample-person"><span class="person-avatar">${c.name.slice(-1)}</span><div><strong>${c.name}</strong><span>${c.role}</span></div></div>`).join("")}
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
        <button class="btn secondary" data-action="open-import">继续添加</button>
        <button class="btn primary" data-action="start-analysis">开始能力迁移分析 →</button>
      </div>
    </div>`;
}

function renderQueue() {
  state.view = "job";
  state.step = 4;
  setActiveSidebar();
  renderRecentJobs();
  const job = currentJob();
  const imported = state.imported[job.id];
  if (!imported) {
    renderImportStep();
    toast("请先导入候选人", "可一键使用示例候选人体验完整流程");
    return;
  }
  const visible = state.filter === "all" ? job.candidates : job.candidates.filter(c => c.group === state.filter || (state.filter === "recovered" && c.recovered));
  const recovered = job.candidates.filter(c => c.recovered).length;
  main.innerHTML = `
    <section class="page">
      ${stepHeader(4)}
      <div class="page-body">
        <div class="compare-banner">
          <div><strong>AI 比关键词 ATS 多找回 ${recovered} 位值得复核的候选人</strong><p>增量候选人均提供迁移路径、原文证据和待验证缺口。</p></div>
          <button class="btn secondary" data-action="show-compare">查看完整效果评估</button>
        </div>
        <div class="queue-stats">
          ${statCard("全部候选人", job.candidates.length, "已完成结构化分析")}
          ${statCard("优先联系", job.candidates.filter(c => c.group === "priority").length, "直接证据充分")}
          ${statCard("AI 新找回", recovered, "ATS 未命中", "cyan")}
          ${statCard("待人工判断", job.candidates.filter(c => ["review","unknown"].includes(c.group)).length, "建议先看迁移证据")}
        </div>
        <div class="card">
          <div class="card-head" style="align-items:center">
            <div><h2>人才复核队列</h2><p>按证据强度和迁移价值排序，不使用黑箱总分作淘汰</p></div>
            <div class="title-actions"><button class="btn secondary" data-action="export-queue">导出候选人 CSV</button><button class="btn primary" data-action="open-import">＋ 导入候选人</button></div>
          </div>
          <div class="card-body" style="padding:14px 0 0">
            <div class="queue-toolbar" style="padding:0 18px">
              <div class="filter-tabs">
                ${filterButton("all", "全部")}
                ${filterButton("priority", "优先联系")}
                ${filterButton("review", "值得复核")}
                ${filterButton("recovered", "AI 新找回")}
                ${filterButton("unknown", "信息不足")}
              </div>
              <span class="tiny">共 ${visible.length} 位候选人</span>
            </div>
            <table class="candidate-table">
              <thead><tr><th>候选人</th><th>建议</th><th>核心判断</th><th>能力覆盖</th><th>ATS 结果</th><th></th></tr></thead>
              <tbody>
                ${visible.length ? visible.map(candidateRow).join("") : `<tr><td colspan="6" class="table-empty">当前分类暂无候选人</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`;
}

function statCard(label, value, detail, color = "") {
  return `<div class="card stat-card"><p>${label}</p><strong ${color ? `style="color:var(--${color})"` : ""}>${value}</strong><small>${detail}</small></div>`;
}

function filterButton(id, label) {
  return `<button class="${state.filter === id ? "active" : ""}" data-filter="${id}">${label}</button>`;
}

function candidateRow(c) {
  const verdictClass = c.group === "priority" ? "green" : c.group === "review" ? "blue" : c.group === "unknown" ? "amber" : "gray";
  return `
    <tr data-candidate="${c.id}">
      <td><div class="candidate-name"><span class="person-avatar">${c.name.slice(-1)}</span><div><strong>${c.name}${c.recovered ? ` <span class="tag cyan" style="margin-left:5px">AI 新找回</span>` : ""}</strong><span>${c.role} · ${c.company}</span></div></div></td>
      <td><span class="tag ${verdictClass}">${c.verdict}</span></td>
      <td><div class="match-summary"><strong>${c.core}</strong><span>待确认：${c.gap}</span></div></td>
      <td><div class="coverage"><div class="coverage-bar"><i style="width:${c.coverage}%"></i></div><span>${c.coverage}%</span></div></td>
      <td>${c.ats ? `<span class="tag gray">关键词命中</span>` : `<span class="tag red">未命中</span>`}</td>
      <td><button class="btn ghost small">查看分析 →</button></td>
    </tr>`;
}

function evaluationFor(candidate) {
  const key = `${state.currentJob}:${candidate.id}`;
  if (state.evaluations[key]) return state.evaluations[key];
  if (!candidate.custom) return ["priority", "review"].includes(candidate.group) ? "relevant" : candidate.group === "reject" ? "irrelevant" : "unknown";
  return "unknown";
}

function getEvaluationMetrics(job) {
  const evaluated = job.candidates.filter(candidate => evaluationFor(candidate) !== "unknown");
  const relevant = evaluated.filter(candidate => evaluationFor(candidate) === "relevant");
  const atsSelected = evaluated.filter(candidate => candidate.ats);
  const aiSelected = evaluated.filter(candidate => ["priority", "review"].includes(candidate.group));
  const atsTrue = atsSelected.filter(candidate => evaluationFor(candidate) === "relevant");
  const aiTrue = aiSelected.filter(candidate => evaluationFor(candidate) === "relevant");
  const percent = (part, total) => total ? Math.round(part / total * 100) : 0;
  return {
    evaluated,
    relevant,
    atsSelected,
    aiSelected,
    atsRecall: percent(atsTrue.length, relevant.length),
    aiRecall: percent(aiTrue.length, relevant.length),
    atsPrecision: percent(atsTrue.length, atsSelected.length),
    aiPrecision: percent(aiTrue.length, aiSelected.length),
    recovered: job.candidates.filter(candidate => candidate.recovered),
    shared: job.candidates.filter(candidate => candidate.ats && ["priority", "review"].includes(candidate.group)),
    atsOnly: job.candidates.filter(candidate => candidate.ats && !["priority", "review"].includes(candidate.group)),
    missed: job.candidates.filter(candidate => !candidate.ats && !["priority", "review"].includes(candidate.group)),
    unknown: job.candidates.filter(candidate => evaluationFor(candidate) === "unknown")
  };
}

function renderComparison() {
  const job = currentJob();
  const metrics = getEvaluationMetrics(job);
  state.view = "job";
  setActiveSidebar();
  renderRecentJobs();
  const atsMinutes = job.candidates.length * 2.5;
  const aiReviewMinutes = metrics.aiSelected.length * 2.5;
  const savedMinutes = Math.max(0, Math.round(atsMinutes - aiReviewMinutes));
  main.innerHTML = `
    <section class="page">
      <div class="page-head" style="padding-bottom:18px">
        <div class="breadcrumbs"><button class="btn ghost small" data-action="back-queue">← 返回复核队列</button><span>/</span><b>效果评估</b></div>
        <div class="title-row">
          <div class="title-copy"><div><h1>ATS 与 AI 筛选效果</h1><p>${job.title} · 仅基于已完成人工标注的候选人计算</p></div></div>
          <div class="title-actions">
            <button class="btn secondary" data-action="copy-evaluation">复制摘要</button>
            <button class="btn secondary" data-action="export-evaluation-csv">导出 CSV</button>
            <button class="btn primary" data-action="export-evaluation-json">导出 JSON</button>
          </div>
        </div>
      </div>
      <div class="page-body">
        ${metrics.unknown.length ? `<div class="evaluation-warning"><strong>还有 ${metrics.unknown.length} 位候选人未完成人工标注</strong><span>他们暂不进入召回率和精确率计算，避免指标失真。</span></div>` : ""}
        <div class="metric-compare-grid">
          ${metricCompareCard("召回率", metrics.atsRecall, metrics.aiRecall, "合理候选人中，被系统找回的比例")}
          ${metricCompareCard("精确率", metrics.atsPrecision, metrics.aiPrecision, "系统建议复核的人中，人工确认合理的比例")}
          <div class="card impact-card">
            <p class="eyebrow">复核成本估算</p>
            <strong>${savedMinutes}<small> 分钟</small></strong>
            <p>按每份简历平均人工阅读 2.5 分钟估算</p>
            <div><span>全量人工阅读</span><b>${atsMinutes} 分钟</b></div>
            <div><span>AI 推荐队列</span><b>${aiReviewMinutes} 分钟</b></div>
          </div>
        </div>
        <div class="card result-map-card">
          <div class="card-head"><div><h2>候选人流向</h2><p>清楚看到两种筛选方式在哪里一致、在哪里产生增量</p></div></div>
          <div class="card-body">
            <div class="result-columns">
              ${resultColumn("ATS 与 AI 共同命中", metrics.shared, "blue", "直接相关证据较充分")}
              ${resultColumn("AI 增量找回", metrics.recovered, "cyan", "关键词未命中，但存在迁移路径")}
              ${resultColumn("仍需人工判断", metrics.missed, "amber", "信息不足或关键差距明确")}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-head"><div><h2>人工评估标注</h2><p>人工标准答案独立于 ATS 和 AI 结论，可随复核结果更新</p></div><span class="tag gray">${metrics.evaluated.length}/${job.candidates.length} 已标注</span></div>
          <div class="card-body" style="padding:0">
            <table class="candidate-table evaluation-table">
              <thead><tr><th>候选人</th><th>ATS</th><th>AI 建议</th><th>人工标准答案</th><th>结果说明</th></tr></thead>
              <tbody>${job.candidates.map(evaluationRow).join("")}</tbody>
            </table>
          </div>
        </div>
        <p class="evaluation-footnote">注：当前 Demo 指标用于验证产品逻辑，不代表生产环境准确率。正式评估需扩大样本，并由业务专家进行盲标。</p>
      </div>
    </section>`;
}

function metricCompareCard(label, ats, ai, detail) {
  const gain = ai - ats;
  return `
    <div class="card metric-compare-card">
      <div><p class="eyebrow">${label}</p><span>${detail}</span></div>
      <div class="metric-bars">
        <div><label><span>关键词 ATS</span><b>${ats}%</b></label><div class="metric-track"><i style="width:${ats}%"></i></div></div>
        <div><label><span>TalentBridge AI</span><b>${ai}%</b></label><div class="metric-track ai"><i style="width:${ai}%"></i></div></div>
      </div>
      <p class="metric-gain ${gain >= 0 ? "positive" : "negative"}">${gain >= 0 ? "+" : ""}${gain} 个百分点</p>
    </div>`;
}

function resultColumn(title, candidates, color, detail) {
  return `
    <section class="result-column">
      <header><span class="tag ${color}">${candidates.length} 人</span><div><strong>${title}</strong><p>${detail}</p></div></header>
      <div class="result-people">
        ${candidates.length ? candidates.map(candidate => `
          <button data-candidate="${candidate.id}">
            <span class="person-avatar">${candidate.name.slice(-1)}</span>
            <span><strong>${candidate.name}</strong><small>${candidate.core}</small></span>
          </button>`).join("") : `<p class="tiny">暂无候选人</p>`}
      </div>
    </section>`;
}

function evaluationRow(candidate) {
  const evaluation = evaluationFor(candidate);
  const aiClass = candidate.group === "priority" ? "green" : candidate.group === "review" ? "blue" : candidate.group === "unknown" ? "amber" : "gray";
  const explanation = candidate.recovered
    ? "AI 找回了 ATS 漏选候选人"
    : candidate.ats && ["priority", "review"].includes(candidate.group)
      ? "两种方式结论一致"
      : candidate.ats
        ? "ATS 命中，但 AI 建议谨慎"
        : "两种方式均未优先推荐";
  return `
    <tr>
      <td><div class="candidate-name"><span class="person-avatar">${candidate.name.slice(-1)}</span><div><strong>${candidate.name}</strong><span>${candidate.role}</span></div></div></td>
      <td>${candidate.ats ? `<span class="tag gray">命中</span>` : `<span class="tag red">未命中</span>`}</td>
      <td><span class="tag ${aiClass}">${candidate.verdict}</span></td>
      <td>
        <div class="evaluation-options">
          <button class="${evaluation === "relevant" ? "selected relevant" : ""}" data-evaluation="relevant" data-candidate-id="${candidate.id}">合理候选人</button>
          <button class="${evaluation === "irrelevant" ? "selected irrelevant" : ""}" data-evaluation="irrelevant" data-candidate-id="${candidate.id}">不合适</button>
          <button class="${evaluation === "unknown" ? "selected unknown" : ""}" data-evaluation="unknown" data-candidate-id="${candidate.id}">待确认</button>
        </div>
      </td>
      <td class="tiny">${explanation}</td>
    </tr>`;
}

function renderCandidateDetail(candidateId) {
  const job = currentJob();
  const c = job.candidates.find(item => item.id === candidateId);
  if (!c) return;
  state.selectedCandidate = c.id;
  state.view = "detail";
  setActiveSidebar();
  renderRecentJobs();
  const verdictClass = c.group === "priority" ? "green" : c.group === "review" ? "blue" : c.group === "unknown" ? "amber" : "gray";
  main.innerHTML = `
    <section class="page">
      <div class="page-head" style="padding-bottom:18px">
        <div class="breadcrumbs"><button class="btn ghost small" data-action="back-queue">← 返回复核队列</button><span>/</span><b>${c.name}</b></div>
        <div class="title-row">
          <div class="title-copy"><div><h1>能力迁移分析</h1><p>${job.title} · 分析生成于刚刚</p></div></div>
          <div class="title-actions"><button class="btn danger" data-action="delete-candidate">删除候选人</button><button class="btn secondary resume-entry" data-action="view-resume">查看原始简历</button><button class="btn secondary" data-action="export-candidate">导出分析报告</button><button class="btn primary" data-action="next-candidate">下一位候选人 →</button></div>
        </div>
      </div>
      <div class="page-body">
        <div class="detail-layout">
          <div class="stack">
            <div class="card">
              <div class="card-body">
                <div class="candidate-hero">
                  <div class="candidate-profile">
                    <span class="person-avatar">${c.name.slice(-1)}</span>
                    <div><h2>${c.name} ${c.recovered ? `<span class="tag cyan">AI 新找回</span>` : ""}</h2><p>${c.role} · ${c.company}</p></div>
                  </div>
                  <span class="tag ${verdictClass}">${c.verdict}</span>
                </div>
                <div class="verdict"><strong>${c.verdict}：${c.core}</strong><p>${c.recovered ? "传统 ATS 因缺少目标岗位关键词而未命中；AI 发现其底层任务和问题复杂度与岗位存在可信关联。" : "系统根据直接证据、岗位要求及信息完整度生成该建议。"} 关键缺口：${c.gap}。</p></div>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div><h2>能力迁移路径</h2><p>从候选人实际经历出发，而不是从岗位名称出发</p></div></div>
              <div class="card-body">
                <div class="legend"><span><i style="background:var(--green)"></i>简历事实</span><span><i style="background:var(--purple)"></i>AI 推断</span><span><i style="background:var(--amber)"></i>待人工验证</span></div>
                <div class="migration-map">
                  <div class="map-column"><h4>候选人做过什么</h4>${c.facts.map(x => `<div class="map-node fact">${x}</div>`).join("")}</div>
                  <div class="map-arrow">→</div>
                  <div class="map-column center"><h4>可迁移的底层能力</h4>${c.transferable.map(x => `<div class="map-node infer">${x}</div>`).join("")}</div>
                  <div class="map-arrow">→</div>
                  <div class="map-column target"><h4>目标岗位需要什么</h4>${c.target.map(x => `<div class="map-node">${x}</div>`).join("")}${c.verify.slice(0,2).map(x => `<div class="map-node verify">${x} · 待验证</div>`).join("")}</div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div><h2>证据与判断依据</h2><p>事实、推断和缺口分开展示</p></div></div>
              <div class="card-body" style="padding-top:6px">
                <table class="evidence-table">
                  <tr><th>类型</th><th>内容</th><th>来源</th></tr>
                  <tr><td><span class="tag green">简历事实</span></td><td><div class="quote">“${c.quote}”</div></td><td class="tiny">候选人简历</td></tr>
                  <tr><td><span class="tag purple">AI 推断</span></td><td>${c.transferable.join("、")}可迁移至目标岗位的相似任务。</td><td class="tiny">岗位模型 + 经历对齐</td></tr>
                  <tr><td><span class="tag amber">待验证</span></td><td>${c.verify.join("、")}</td><td class="tiny">简历暂未提供证据</td></tr>
                </table>
              </div>
            </div>
          </div>
          <aside class="stack">
            <div class="card">
              <div class="card-head"><div><p class="eyebrow">建议行动</p><h3>首次沟通重点确认</h3></div></div>
              <div class="card-body"><ol class="question-list">${c.questions.map(x => `<li>${x}</li>`).join("")}</ol></div>
            </div>
            <div class="card">
              <div class="card-head"><div><h3>你的判断</h3><p>反馈会更新当前岗位的排序偏好</p></div></div>
              <div class="card-body">
                <div class="decision-buttons">
                  <button class="btn primary" data-decision="优先联系">标记为优先联系</button>
                  <button class="btn secondary" data-decision="保留复核">保留复核</button>
                  <button class="btn secondary" data-decision="暂不匹配">暂不匹配</button>
                </div>
                <textarea class="decision-note" id="decisionNote" placeholder="补充判断理由（选填）"></textarea>
                <p class="tiny" style="margin-bottom:0">AI 仅提供辅助分析，最终判断由招聘人员作出。</p>
              </div>
            </div>
            <div class="card ai-summary">
              <div class="card-body">
                <p class="eyebrow">为什么不是一个总分？</p>
                <p class="tiny" style="line-height:1.7;margin-bottom:0">中高端候选人的信息往往不完整。产品展示证据强弱和待验证项，避免用看似精确的数字掩盖不确定性。</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>`;
}

function openImportModal(tab = "sample") {
  state.importTab = tab;
  if (tab !== "upload") state.uploadFiles = [];
  modal.classList.remove("hidden");
  renderImportTab();
}

function renderImportTab() {
  document.querySelectorAll("[data-import-tab]").forEach(btn => btn.classList.toggle("active", btn.dataset.importTab === state.importTab));
  const job = currentJob();
  if (state.importTab === "sample") {
    importContent.innerHTML = `
      <p style="margin-top:0"><strong>${job.title} · 示例人才池</strong></p>
      <p class="tiny">包含直接匹配、能力可迁移、关键词干扰和信息不足等不同类型，用于验证 AI 是否能找回 ATS 漏选人才。</p>
      <div class="sample-preview">${job.candidates.slice(0, 8).map(c => `<div class="sample-person"><span class="person-avatar">${c.name.slice(-1)}</span><div><strong>${c.name}</strong><span>${c.role}</span></div></div>`).join("")}</div>`;
    importConfirm.textContent = `导入 ${job.candidates.length} 位示例候选人`;
    importConfirm.disabled = false;
  } else if (state.importTab === "upload") {
    importContent.innerHTML = `
      <input type="file" id="resumeFileInput" accept=".pdf,.docx,.txt,.md" multiple hidden>
      <div class="import-drop upload-zone" id="uploadZone">
        <div>
          <div class="upload-icon">⇧</div>
          <h3>拖拽简历到这里</h3>
          <p>支持 PDF、DOCX、TXT，单份不超过 8MB，最多 10 份</p>
          <button class="btn secondary" data-action="choose-files">选择本地文件</button>
        </div>
      </div>
      <div class="upload-file-list" id="uploadFileList">${renderUploadFiles()}</div>`;
    importConfirm.textContent = state.uploadFiles.length ? `分析 ${state.uploadFiles.length} 份简历` : "开始解析";
    importConfirm.disabled = !state.uploadFiles.length;
  } else {
    importContent.innerHTML = `<textarea class="paste-area" id="pasteResume" placeholder="粘贴候选人的工作经历、项目经历或完整简历文本……"></textarea><p class="tiny">系统只提取与当前岗位有关的经历，不使用敏感个人属性。</p>`;
    importConfirm.textContent = "解析这份简历";
    importConfirm.disabled = false;
  }
}

function renderUploadFiles() {
  if (!state.uploadFiles.length) return "";
  return state.uploadFiles.map((file, index) => `
    <div class="upload-file">
      <span class="file-type">${escapeHtml(file.name.split(".").pop().toUpperCase())}</span>
      <div><strong>${escapeHtml(file.name)}</strong><span>${formatFileSize(file.size)}</span></div>
      <button class="delete-btn" data-action="remove-upload" data-index="${index}" title="移除">×</button>
    </div>`).join("");
}

function formatFileSize(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function addUploadFiles(fileList) {
  const allowed = /\.(pdf|docx|txt|md)$/i;
  const incoming = [...fileList];
  const rejected = [];
  incoming.forEach(file => {
    if (!allowed.test(file.name)) return rejected.push(`${file.name}：格式不支持`);
    if (file.size > 8 * 1024 * 1024) return rejected.push(`${file.name}：超过 8MB`);
    if (state.uploadFiles.some(existing => existing.name === file.name && existing.size === file.size)) return;
    const totalSize = state.uploadFiles.reduce((sum, item) => sum + item.size, 0);
    if (totalSize + file.size > 20 * 1024 * 1024) return rejected.push(`${file.name}：加入后总大小超过 20MB`);
    if (state.uploadFiles.length < 10) state.uploadFiles.push(file);
  });
  if (incoming.length + state.uploadFiles.length > 10) rejected.push("单次最多选择 10 份简历");
  renderImportTab();
  if (rejected.length) toast("部分文件未加入", rejected.slice(0, 2).join("；"));
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new Error(`无法读取 ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function closeModal() {
  modal.classList.add("hidden");
}

function buildSampleResume(candidate) {
  return [
    `${candidate.name}`,
    `${candidate.role}｜${candidate.company}`,
    "",
    "个人概况",
    `具备与${candidate.core}相关的工作经验，关注复杂业务问题的定位、验证与闭环。`,
    "",
    "工作经历",
    `${candidate.company}｜${candidate.role}`,
    ...candidate.facts.map(item => `• ${item}`),
    `• ${candidate.quote}`,
    "",
    "项目与能力",
    ...candidate.transferable.map(item => `• ${item}`),
    "",
    "补充说明",
    "本简历为 TalentBridge 演示候选人材料，用于展示从简历事实到能力迁移判断的复核流程。"
  ].join("\n");
}

function originalResumeFor(candidate) {
  return candidate.rawResume?.trim() || buildSampleResume(candidate);
}

function openOriginalResume() {
  const candidate = currentJob().candidates.find(item => item.id === state.selectedCandidate);
  if (!candidate) return;
  resumeModalTitle.textContent = `${candidate.name}的原始简历`;
  resumeModalMeta.textContent = `${candidate.role} · ${candidate.company}${candidate.sourceFile ? ` · 来源文件：${candidate.sourceFile}` : " · 示例候选人材料"}`;
  resumeOriginalText.textContent = originalResumeFor(candidate);
  resumeModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeOriginalResume() {
  resumeModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function deleteSelectedCandidate() {
  const job = currentJob();
  const candidate = job.candidates.find(item => item.id === state.selectedCandidate);
  if (!candidate) return;
  const confirmed = window.confirm(`确认删除候选人“${candidate.name}”吗？\n\n删除后，该候选人的分析结果和人工标注也会一并移除。`);
  if (!confirmed) return;

  job.candidates = job.candidates.filter(item => item.id !== candidate.id);
  const recordKey = `${job.id}:${candidate.id}`;
  delete state.decisions[recordKey];
  delete state.evaluations[recordKey];
  if (!candidate.custom) {
    const deleted = new Set(state.deletedCandidates[job.id] || []);
    deleted.add(candidate.id);
    state.deletedCandidates[job.id] = [...deleted];
  }
  state.selectedCandidate = null;
  saveState();
  renderQueue();
  toast("候选人已删除", `${candidate.name}已从当前岗位复核队列移除`);
}

async function completeImport() {
  const job = currentJob();
  const originalLabel = importConfirm.textContent;
  if (state.importTab === "upload") {
    if (!state.uploadFiles.length) {
      toast("请先选择简历文件");
      return;
    }
    importConfirm.classList.add("loading");
    importConfirm.textContent = "正在读取文件";
    importConfirm.disabled = true;
    try {
      const files = await Promise.all(state.uploadFiles.map(async file => ({
        name: file.name,
        type: file.type,
        data: await fileToBase64(file)
      })));
      importConfirm.textContent = "AI 正在逐份分析";
      const data = await apiRequest("/api/upload-resumes", {
        files,
        job: {
          title: job.title,
          industry: job.industry,
          summary: job.summary,
          model: job.model,
          adjacent: job.adjacent,
          knowledgePack: buildKnowledgeContext(job)
        }
      });
      data.results.filter(item => item.status === "success").forEach((item, index) => {
        job.candidates.unshift({
          ...item.result,
          id: `upload-${Date.now()}-${index}`,
          custom: true,
          sourceFile: item.name,
          rawResume: item.resume
        });
      });
      state.imported[job.id] = data.summary.success > 0 || state.imported[job.id];
      saveState();
      const failures = data.results.filter(item => item.status === "error");
      state.uploadFiles = [];
      closeModal();
      renderImportStep();
      toast(
        `成功分析 ${data.summary.success} 份简历`,
        failures.length ? `${failures.length} 份失败：${failures[0].name}（${failures[0].error}）` : "候选人已加入当前岗位复核队列"
      );
    } catch (error) {
      toast("批量分析失败", error.message);
    } finally {
      importConfirm.classList.remove("loading");
      importConfirm.textContent = originalLabel;
      importConfirm.disabled = false;
    }
    return;
  }
  if (state.importTab === "paste") {
    const text = document.getElementById("pasteResume")?.value.trim();
    if (!text) {
      toast("请先粘贴简历文本");
      return;
    }
    importConfirm.classList.add("loading");
    importConfirm.textContent = "AI 正在分析";
    importConfirm.disabled = true;
    try {
      const data = await apiRequest("/api/analyze-resume", {
        resume: text,
        job: {
          title: job.title,
          industry: job.industry,
          summary: job.summary,
          model: job.model,
          adjacent: job.adjacent,
          knowledgePack: buildKnowledgeContext(job)
        }
      });
      job.candidates.unshift({
        ...data.result,
        id: `custom-${Date.now()}`,
        custom: true,
        sourceFile: "粘贴文本",
        rawResume: text
      });
      toast(
        data.mode !== "demo" ? "真实 AI 分析完成" : "演示分析完成",
        data.mode !== "demo" ? `模型：${data.model}` : "配置 AI 服务密钥后可切换到真实模型"
      );
    } catch (error) {
      const candidate = buildCandidateFromText(text, job);
      job.candidates.unshift(candidate);
      toast("AI 服务暂不可用", `已使用本地分析完成：${error.message}`);
    } finally {
      importConfirm.classList.remove("loading");
      importConfirm.textContent = originalLabel;
      importConfirm.disabled = false;
    }
  }
  state.imported[job.id] = true;
  saveState();
  closeModal();
  renderImportStep();
  if (state.importTab !== "paste") {
    toast("候选人导入完成", `已解析 ${job.candidates.length} 位候选人的经历与能力证据`);
  }
}

function buildCandidateFromText(text, job) {
  const firstLine = text.split(/\r?\n/).find(line => line.trim())?.trim() || "新候选人";
  const nameMatch = firstLine.match(/(?:姓名[:：]\s*)?([\u4e00-\u9fa5]{2,4})/);
  const name = nameMatch?.[1] || `候选人${job.candidates.length + 1}`;
  const keywordPool = job.id === "chip"
    ? ["3D", "2.5D", "TSV", "键合", "互连", "良率", "翘曲", "可靠性", "量产"]
    : job.id === "sales"
      ? ["SaaS", "大客户", "方案", "签约", "续约", "商机", "回款", "销售"]
      : job.model.map(item => item[0]).concat(job.adjacent).flatMap(term => term.split(/[、/\s]+/)).filter(term => term.length >= 2);
  const facts = keywordPool.filter(keyword => text.toLowerCase().includes(keyword.toLowerCase())).slice(0, 4);
  const hasDirectKeyword = job.id === "chip"
    ? /3D|TSV|混合键合/i.test(text)
    : job.id === "sales"
      ? /SaaS|企业软件/i.test(text)
      : facts.length >= 2;
  const hasTransferEvidence = job.id === "chip"
    ? /2\.5D|CoWoS|封装|良率|互连|翘曲/i.test(text)
    : job.id === "sales"
      ? /大客户|解决方案|长周期|项目|决策链|回款/i.test(text)
      : facts.length >= 1 || /项目|负责|主导|改善|交付|管理|研发|方案/.test(text);
  const group = hasDirectKeyword ? "priority" : hasTransferEvidence ? "review" : "unknown";
  const coverage = hasDirectKeyword ? 84 : hasTransferEvidence ? 69 : 43;
  const inferredFacts = facts.length ? facts : ["简历已导入", "相关经历待进一步结构化"];

  return {
    id: `custom-${Date.now()}`,
    custom: true,
    sourceFile: "粘贴文本",
    rawResume: text,
    name,
    role: firstLine.slice(0, 28),
    company: "手动导入",
    group,
    verdict: group === "priority" ? "优先联系" : group === "review" ? "值得复核" : "信息不足",
    ats: hasDirectKeyword,
    recovered: !hasDirectKeyword && hasTransferEvidence,
    coverage,
    core: inferredFacts.slice(0, 3).join("、"),
    gap: "经历范围、责任边界与结果证据待确认",
    quote: text.slice(0, 160).replace(/\s+/g, " "),
    facts: inferredFacts,
    transferable: hasTransferEvidence ? ["相似业务任务", "可复用的问题解决方法", "相邻场景经验"] : ["经历信息待补充"],
    target: job.model.slice(0, 3).map(item => item[0]),
    verify: ["个人责任范围", "项目复杂度", "量化结果"],
    questions: [
      "请具体说明这段经历中你独立负责的工作范围。",
      "项目中最复杂的问题是什么，你采取了哪些关键行动？",
      "有哪些结果或数据能够证明这段经验？"
    ]
  };
}

function showCompare() {
  renderComparison();
}

function safeFileName(value) {
  return String(value).replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").replace(/\s+/g, "_").slice(0, 80);
}

function downloadFile(filename, content, type = "text/plain;charset=utf-8") {
  const parts = type.includes("application/json") ? [content] : ["\ufeff", content];
  const blob = new Blob(parts, { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value) {
  const text = value == null ? "" : Array.isArray(value) ? value.join("；") : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function exportQueueCsv() {
  const job = currentJob();
  const headers = ["候选人", "当前职位", "公司", "AI建议", "ATS结果", "AI新找回", "能力覆盖", "核心关联", "关键缺口", "人工判断"];
  const rows = job.candidates.map(candidate => [
    candidate.name,
    candidate.role,
    candidate.company,
    candidate.verdict,
    candidate.ats ? "关键词命中" : "未命中",
    candidate.recovered ? "是" : "否",
    `${candidate.coverage}%`,
    candidate.core,
    candidate.gap,
    state.decisions[`${job.id}:${candidate.id}`]?.value || ""
  ]);
  const csv = [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n");
  downloadFile(`${safeFileName(job.title)}-候选人复核队列.csv`, csv, "text/csv;charset=utf-8");
}

function candidateReportMarkdown(candidate) {
  const job = currentJob();
  const decision = state.decisions[`${job.id}:${candidate.id}`];
  return `# ${candidate.name}｜能力迁移分析

## 分析对象

- 目标岗位：${job.title}
- 候选人当前经历：${candidate.role}
- 公司：${candidate.company}
- 系统建议：${candidate.verdict}
- ATS 结果：${candidate.ats ? "关键词命中" : "未命中"}
- AI 新找回：${candidate.recovered ? "是" : "否"}
- 能力证据覆盖：${candidate.coverage}%

## 结论

${candidate.core}

关键缺口：${candidate.gap}

## 简历事实

${candidate.facts.map(item => `- ${item}`).join("\n")}

原文证据：

> ${candidate.quote}

## 可迁移能力

${candidate.transferable.map(item => `- ${item}`).join("\n")}

## 目标岗位关联

${candidate.target.map(item => `- ${item}`).join("\n")}

## 待人工验证

${candidate.verify.map(item => `- ${item}`).join("\n")}

## 建议追问

${candidate.questions.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## HR 判断

${decision ? `${decision.value}${decision.note ? `：${decision.note}` : ""}` : "尚未提交人工判断"}

---

本报告由 TalentBridge 辅助生成，仅用于招聘人员复核，不构成自动淘汰或录用决定。
`;
}

function evaluationExportData() {
  const job = currentJob();
  const metrics = getEvaluationMetrics(job);
  return {
    generatedAt: new Date().toISOString(),
    job: { id: job.id, title: job.title, industry: job.industry },
    methodology: {
      note: "召回率和精确率仅使用已完成人工标注的候选人计算",
      averageManualReviewMinutes: 2.5
    },
    metrics: {
      totalCandidates: job.candidates.length,
      evaluatedCandidates: metrics.evaluated.length,
      relevantCandidates: metrics.relevant.length,
      atsRecall: metrics.atsRecall,
      aiRecall: metrics.aiRecall,
      atsPrecision: metrics.atsPrecision,
      aiPrecision: metrics.aiPrecision,
      aiRecovered: metrics.recovered.length
    },
    candidates: job.candidates.map(candidate => ({
      name: candidate.name,
      role: candidate.role,
      company: candidate.company,
      atsMatched: candidate.ats,
      aiVerdict: candidate.verdict,
      aiRecovered: candidate.recovered,
      evidenceCoverage: candidate.coverage,
      humanLabel: evaluationFor(candidate),
      core: candidate.core,
      gap: candidate.gap
    }))
  };
}

function exportEvaluationCsv() {
  const data = evaluationExportData();
  const headers = ["候选人", "当前职位", "公司", "ATS命中", "AI建议", "AI新找回", "证据覆盖", "人工标准答案", "核心关联", "关键缺口"];
  const labels = { relevant: "合理候选人", irrelevant: "不合适", unknown: "待确认" };
  const rows = data.candidates.map(candidate => [
    candidate.name,
    candidate.role,
    candidate.company,
    candidate.atsMatched ? "是" : "否",
    candidate.aiVerdict,
    candidate.aiRecovered ? "是" : "否",
    `${candidate.evidenceCoverage}%`,
    labels[candidate.humanLabel],
    candidate.core,
    candidate.gap
  ]);
  const metricRows = [
    [],
    ["指标摘要"],
    ["ATS 召回率", `${data.metrics.atsRecall}%`],
    ["AI 召回率", `${data.metrics.aiRecall}%`],
    ["ATS 精确率", `${data.metrics.atsPrecision}%`],
    ["AI 精确率", `${data.metrics.aiPrecision}%`],
    ["AI 增量找回", data.metrics.aiRecovered]
  ];
  const csv = [[headers, ...rows], metricRows].flat().map(row => row.map(csvCell).join(",")).join("\r\n");
  downloadFile(`${safeFileName(data.job.title)}-ATS与AI效果评估.csv`, csv, "text/csv;charset=utf-8");
}

function saveModelFromPage() {
  const job = currentJob();
  const rows = [...document.querySelectorAll(".model-item")];
  if (!rows.length) return;
  job.model = rows.map(row => {
    const texts = row.querySelectorAll("[contenteditable='true']");
    return [
      texts[0]?.textContent.trim() || "未命名能力",
      texts[1]?.textContent.trim() || "待补充说明",
      row.querySelector("select")?.value || "重要"
    ];
  });
  saveState();
}

function enterJdEditMode() {
  const job = currentJob();
  const box = document.querySelector(".jd-box");
  if (!box) return;
  const fallback = box.innerText.trim();
  box.outerHTML = `<textarea class="paste-area jd-editor" id="jdEditor">${escapeHtml(job.jdText || fallback)}</textarea>`;
  const actions = document.querySelector(".jd-editor")?.nextElementSibling;
  if (actions) {
    actions.innerHTML = `<button class="btn secondary" data-action="cancel-jd-edit">取消</button><button class="btn primary" data-action="save-jd">保存并重新解析</button>`;
  }
}

function saveEditedJd() {
  const text = document.getElementById("jdEditor")?.value.trim();
  if (!text) {
    toast("JD 不能为空");
    return;
  }
  const job = currentJob();
  job.jdText = text;
  job.jd = formatJd(text, job.note || "");
  const clauses = text.split(/[\n；。]/).map(item => item.trim()).filter(item => item.length >= 6);
  job.summary = clauses[0] || job.summary;
  saveState();
  renderRequirement();
  toast("JD 已更新", "岗位理解已按新内容刷新");
}

function handleClick(event) {
  const step = event.target.closest("[data-step]");
  if (step) {
    const target = Number(step.dataset.step);
    if (target === 1) renderRequirement();
    if (target === 2) renderCalibration();
    if (target === 3) renderImportStep();
    if (target === 4) renderQueue();
    return;
  }

  const candidate = event.target.closest("[data-candidate]");
  if (candidate) {
    renderCandidateDetail(candidate.dataset.candidate);
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    state.filter = filter.dataset.filter;
    renderQueue();
    return;
  }

  const importTab = event.target.closest("[data-import-tab]");
  if (importTab) {
    state.importTab = importTab.dataset.importTab;
    renderImportTab();
    return;
  }

  const jobTarget = event.target.closest("[data-job]");
  if (jobTarget && (jobTarget.classList.contains("recent-job") || jobTarget.dataset.action === "open-project")) {
    state.currentJob = jobTarget.dataset.job;
    state.filter = "all";
    renderRequirement();
    return;
  }

  const decision = event.target.closest("[data-decision]");
  if (decision) {
    const note = document.getElementById("decisionNote")?.value.trim() || "";
    state.decisions[`${state.currentJob}:${state.selectedCandidate}`] = { value: decision.dataset.decision, note };
    saveState();
    toast("已记录你的判断", `${decision.dataset.decision} · 当前岗位排序偏好已更新`);
    return;
  }

  const evaluation = event.target.closest("[data-evaluation]");
  if (evaluation) {
    state.evaluations[`${state.currentJob}:${evaluation.dataset.candidateId}`] = evaluation.dataset.evaluation;
    saveState();
    renderComparison();
    toast("人工标注已更新", "召回率和精确率已重新计算");
    return;
  }

  const packTarget = event.target.closest("[data-pack]");
  if (packTarget) {
    state.selectedKnowledgePack = packTarget.dataset.pack;
    saveState();
    renderKnowledgeBase();
    return;
  }

  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;
  const action = actionEl.dataset.action;

  if (action === "go-workbench") renderWorkbench();
  if (action === "open-current") renderRequirement();
  if (action === "open-project") { state.currentJob = actionEl.dataset.job; renderRequirement(); }
  if (action === "confirm-model") {
    saveModelFromPage();
    openImportModal();
  }
  if (action === "open-import") openImportModal();
  if (action === "close-modal") closeModal();
  if (action === "view-resume") openOriginalResume();
  if (action === "close-resume") closeOriginalResume();
  if (action === "delete-candidate") deleteSelectedCandidate();
  if (action === "copy-resume") {
    const candidate = currentJob().candidates.find(item => item.id === state.selectedCandidate);
    if (candidate) {
      navigator.clipboard?.writeText(originalResumeFor(candidate));
      toast("原始简历已复制", "可粘贴到面试记录或协作工具");
    }
  }
  if (action === "start-analysis") { toast("AI 分析完成", "已生成复核队列和迁移证据"); renderQueue(); }
  if (action === "back-queue") renderQueue();
  if (action === "show-compare") showCompare();
  if (action === "copy-evaluation") {
    const metrics = getEvaluationMetrics(currentJob());
    const summary = `岗位：${currentJob().title}\nATS 召回率：${metrics.atsRecall}%\nAI 召回率：${metrics.aiRecall}%\nATS 精确率：${metrics.atsPrecision}%\nAI 精确率：${metrics.aiPrecision}%\nAI 增量找回：${metrics.recovered.length} 人`;
    navigator.clipboard?.writeText(summary);
    toast("评估摘要已复制", "可直接粘贴到方案说明或演示稿");
  }
  if (action === "export-queue") {
    exportQueueCsv();
    toast("候选人队列已导出", "CSV 文件已开始下载");
  }
  if (action === "export-candidate") {
    const candidate = currentJob().candidates.find(item => item.id === state.selectedCandidate);
    if (candidate) {
      downloadFile(`${safeFileName(candidate.name)}-能力迁移分析.md`, candidateReportMarkdown(candidate), "text/markdown;charset=utf-8");
      toast("候选人报告已导出", "Markdown 文件已开始下载");
    }
  }
  if (action === "export-evaluation-csv") {
    exportEvaluationCsv();
    toast("评估明细已导出", "CSV 文件已开始下载");
  }
  if (action === "export-evaluation-json") {
    const data = evaluationExportData();
    downloadFile(`${safeFileName(data.job.title)}-效果评估.json`, JSON.stringify(data, null, 2), "application/json;charset=utf-8");
    toast("评估数据已导出", "JSON 文件已开始下载");
  }
  if (action === "switch-job") {
    renderProjects();
  }
  if (action === "delete-capability") {
    actionEl.closest(".model-item")?.remove();
    toast("能力项已移除", "仅影响当前岗位模型");
  }
  if (action === "add-capability") {
    document.getElementById("modelList")?.insertAdjacentHTML("beforeend", modelItem(["新增能力项", "点击文字即可编辑说明", "重要"], Date.now()));
  }
  if (action === "add-adjacent") toast("原型交互提示", "这里可搜索并添加相邻岗位、行业或技术方向");
  if (action === "save-knowledge-pack") {
    const pack = readKnowledgePackFromPage();
    if (pack) {
      saveState();
      renderKnowledgeBase();
      toast("知识包已保存", "后续候选人分析将使用最新规则");
    }
  }
  if (action === "apply-knowledge-pack") {
    const pack = readKnowledgePackFromPage();
    if (pack) {
      const job = currentJob();
      job.knowledgePackId = pack.id;
      const relatedTerms = pack.terms.map(item => item[0]);
      job.adjacent = [...new Set([...job.adjacent, ...relatedTerms])].slice(0, 8);
      saveState();
      renderKnowledgeBase();
      toast("知识包已应用", `已关联至「${job.title}」`);
    }
  }
  if (action === "add-knowledge-item") {
    const section = document.querySelector(`[data-knowledge-field="${actionEl.dataset.field}"] .knowledge-items`);
    const paired = actionEl.closest("[data-knowledge-field]")?.dataset.paired === "true";
    section?.insertAdjacentHTML("beforeend", `<div class="knowledge-row"><div contenteditable="true">新增规则</div>${paired ? `<div contenteditable="true">补充概念说明</div>` : ""}<button class="delete-btn" data-action="delete-knowledge-item" title="删除">×</button></div>`);
  }
  if (action === "delete-knowledge-item") actionEl.closest(".knowledge-row")?.remove();
  if (action === "new-knowledge-pack") {
    const id = `knowledge-${Date.now()}`;
    knowledgePacks[id] = {
      id,
      name: "新行业知识包",
      industry: "待设置行业",
      description: "用于沉淀该行业的术语关系、能力迁移规则和风险边界。",
      terms: [["核心术语", "概念说明"]],
      positiveRules: ["新增一条正向迁移规则"],
      riskRules: ["新增一条反向风险规则"],
      questions: ["新增一个建议验证问题"]
    };
    state.selectedKnowledgePack = id;
    saveState();
    renderKnowledgeBase();
  }
  if (action === "edit-jd") enterJdEditMode();
  if (action === "cancel-jd-edit") renderRequirement();
  if (action === "save-jd") saveEditedJd();
  if (action === "choose-files") document.getElementById("resumeFileInput")?.click();
  if (action === "remove-upload") {
    state.uploadFiles.splice(Number(actionEl.dataset.index), 1);
    renderImportTab();
  }
  if (action === "new-project") renderCreateProject();
  if (action === "all-projects" || action === "back-projects") renderProjects();
  if (action === "show-guide") renderGuide();
  if (action === "start-demo") startDemo();
  if (action === "dismiss-onboarding") {
    localStorage.setItem(ONBOARDING_KEY, "true");
    onboarding?.classList.add("hidden");
  }
  if (action === "reset-demo") resetDemo();
  if (action === "next-candidate") {
    const list = currentJob().candidates;
    const currentIndex = list.findIndex(c => c.id === state.selectedCandidate);
    renderCandidateDetail(list[(currentIndex + 1) % list.length].id);
  }
}

document.addEventListener("click", handleClick);
document.addEventListener("click", event => {
  const nav = event.target.closest("[data-nav]");
  if (!nav) return;
  if (nav.dataset.nav === "workbench") renderWorkbench();
  if (nav.dataset.nav === "projects") renderProjects();
  if (nav.dataset.nav === "knowledge") renderKnowledgeBase();
});
document.addEventListener("submit", async event => {
  if (event.target.id !== "createProjectForm") return;
  event.preventDefault();
  const title = document.getElementById("newJobTitle").value.trim();
  const industry = document.getElementById("newJobIndustry").value.trim();
  const jdText = document.getElementById("newJobJd").value.trim();
  const note = document.getElementById("newJobNote").value.trim();
  if (!title || !industry || !jdText) {
    toast("请填写岗位名称、行业和 JD");
    return;
  }
  const submitButton = event.target.querySelector("[type='submit']");
  const originalLabel = submitButton.textContent;
  submitButton.classList.add("loading");
  submitButton.textContent = "AI 正在理解岗位";
  submitButton.disabled = true;
  let job;
  let mode = "demo";
  try {
    const data = await apiRequest("/api/analyze-job", { title, industry, jd: jdText, note });
    const result = data.result;
    job = {
      id: `job-${Date.now()}`,
      custom: true,
      title,
      industry,
      summary: result.summary,
      jdText,
      jd: formatJd(jdText, note),
      note,
      model: result.capabilities.map(item => [item.name, item.description, item.priority]),
      adjacent: result.adjacent,
      candidates: []
    };
    mode = data.mode;
  } catch (error) {
    job = buildJobFromForm(title, industry, jdText, note);
    toast("AI 服务暂不可用", `已使用本地规则生成：${error.message}`);
  } finally {
    submitButton.classList.remove("loading");
    submitButton.textContent = originalLabel;
    submitButton.disabled = false;
  }
  jobs[job.id] = job;
  state.currentJob = job.id;
  state.imported[job.id] = false;
  saveState();
  renderCalibration();
  toast(
    mode !== "demo" ? "真实 AI 岗位模型已生成" : "岗位模型已生成",
    "请先校准能力重要度和可接受的相邻经历"
  );
});
document.addEventListener("change", event => {
  if (event.target.id === "resumeFileInput") addUploadFiles(event.target.files);
});
document.addEventListener("dragover", event => {
  if (!event.target.closest("#uploadZone")) return;
  event.preventDefault();
  event.target.closest("#uploadZone").classList.add("dragging");
});
document.addEventListener("dragleave", event => {
  event.target.closest("#uploadZone")?.classList.remove("dragging");
});
document.addEventListener("drop", event => {
  const zone = event.target.closest("#uploadZone");
  if (!zone) return;
  event.preventDefault();
  zone.classList.remove("dragging");
  addUploadFiles(event.dataTransfer.files);
});
importConfirm.addEventListener("click", completeImport);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
resumeModal.addEventListener("click", event => {
  if (event.target === resumeModal) closeOriginalResume();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !resumeModal.classList.contains("hidden")) closeOriginalResume();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});
document.querySelector(".top-search input").addEventListener("keydown", event => {
  if (event.key === "Enter") toast("搜索功能演示", `正在查找“${event.target.value || "全部内容"}”`);
});

loadSavedState();
renderWorkbench();
detectAiMode();
if (!localStorage.getItem(ONBOARDING_KEY)) {
  onboarding?.classList.remove("hidden");
}

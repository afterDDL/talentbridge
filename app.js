const jobs = {
  chip: {
    id: "chip",
    title: "3D 先进封装工艺工程师",
    industry: "半导体 · 先进封装",
    summary: "负责 3D 堆叠相关工艺开发、量产导入与良率提升，协同解决互连、翘曲及可靠性问题。",
    businessContext: "我们要建设可量产的 3D 堆叠先进封装能力，重点解决高密度互连、翘曲、热应力和良率爬坡问题。",
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
        companyContext: {
          companyType: "先进封装制造与量产平台",
          products: ["2.5D 中介层封装产品", "大尺寸封装结构"],
          technologyPlatform: ["Interposer", "微凸点互连", "翘曲控制"],
          productionStage: "简历明确提及量产良率改善",
          evidenceNote: "仅依据简历中的平台、结构与量产表述，不推断公司未披露产品"
        },
        comparability: [
          { dimension: "任务对象", candidateEvidence: "2.5D 先进封装平台工艺开发", targetRequirement: "3D 先进封装工艺开发", judgment: "可比", reason: "均涉及复杂先进封装结构的工艺窗口建立" },
          { dimension: "技术机理", candidateEvidence: "微凸点互连与中介层", targetRequirement: "混合键合、TSV 与超细间距互连", judgment: "部分可比", reason: "互连与翘曲机理相邻，但关键连接方式和尺寸代际不同" },
          { dimension: "问题复杂度", candidateEvidence: "大尺寸中介层翘曲和互连失效", targetRequirement: "3D 堆叠热应力、翘曲与互连可靠性", judgment: "可比", reason: "问题均跨结构、材料和制程参数" },
          { dimension: "量产阶段", candidateEvidence: "量产良率改善", targetRequirement: "量产导入与良率爬坡", judgment: "可比", reason: "均需要在量产约束下完成问题闭环" },
          { dimension: "个人责任", candidateEvidence: "主导解决关键失效问题", targetRequirement: "独立推动工艺优化", judgment: "部分可比", reason: "有主导表述，但完整模块所有权仍需确认" }
        ],
        transferable: ["复杂结构工艺窗口建立", "互连失效定位", "跨制程良率闭环"],
        transferBoundary: ["不能将微凸点互连经验直接等同于混合键合经验", "不能据此确认其掌握 TSV、晶圆减薄或超细间距互连", "需核实其在平台开发中的模块所有权和决策边界"],
        transferConfidence: "中",
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
    ],
    companyProfiles: []
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
    ],
    companyProfiles: []
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
  privacyMode: true,
  decisions: {},
  evaluations: {},
  sourcingInsights: {},
  deletedCandidates: {},
  selectedKnowledgePack: "advanced-packaging",
  userProfile: {
    name: "演示用户",
    context: ""
  }
};

const STORAGE_KEY = "talentbridge-demo-state-v1";
const REVIEW_DECISIONS = ["推荐联系", "暂缓", "不合适", "信息不足"];
const REVIEW_REASONS = [
  "技术机制相通",
  "任务场景相似",
  "量产或交付经验",
  "个人职责明确",
  "关键经验待验证",
  "个人职责不明确",
  "目标技术存在缺口",
  "简历证据不足"
];
const HIRING_STAGES = ["未跟进", "待联系", "已联系", "愿意沟通", "进入面试", "面试通过", "Offer", "已入职", "淘汰", "候选人拒绝"];

function normalizeDecision(value = "") {
  return ({
    "优先联系": "推荐联系",
    "保留复核": "暂缓",
    "暂不匹配": "不合适"
  })[value] || value;
}

function candidateRecord(candidateId, jobId = state.currentJob) {
  const stored = state.decisions[`${jobId}:${candidateId}`] || {};
  return {
    value: normalizeDecision(stored.value || ""),
    reasons: Array.isArray(stored.reasons) ? stored.reasons : [],
    note: stored.note || "",
    stage: HIRING_STAGES.includes(stored.stage) ? stored.stage : "未跟进",
    stageNote: stored.stageNote || "",
    updatedAt: stored.updatedAt || ""
  };
}

function saveCandidateRecord(candidateId, record, jobId = state.currentJob) {
  state.decisions[`${jobId}:${candidateId}`] = {
    ...candidateRecord(candidateId, jobId),
    ...record,
    updatedAt: new Date().toISOString()
  };
  saveState();
}

function decisionEvaluation(value) {
  if (value === "推荐联系" || value === "暂缓") return "relevant";
  if (value === "不合适") return "irrelevant";
  return "unknown";
}

function hiringStageClass(stage) {
  if (["Offer", "已入职"].includes(stage)) return "green";
  if (["进入面试", "面试通过"].includes(stage)) return "blue";
  if (["已联系", "愿意沟通"].includes(stage)) return "cyan";
  if (["淘汰", "候选人拒绝"].includes(stage)) return "gray";
  return "amber";
}

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
    if (saved.sourcingInsights) state.sourcingInsights = saved.sourcingInsights;
    if (saved.userProfile && typeof saved.userProfile === "object") {
      state.userProfile = {
        name: String(saved.userProfile.name || "演示用户").slice(0, 20),
        context: String(saved.userProfile.context || "").slice(0, 500)
      };
    }
    if (typeof saved.privacyMode === "boolean") state.privacyMode = saved.privacyMode;
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
  const forStorage = candidate => {
    const { rawResume, ...savedCandidate } = candidate;
    return savedCandidate;
  };
  Object.values(jobs).forEach(job => {
    customCandidates[job.id] = job.candidates.filter(candidate => candidate.custom).map(forStorage);
    if (job.custom) {
      customJobs[job.id] = {
        ...job,
        candidates: job.candidates.filter(candidate => !candidate.custom).map(forStorage)
      };
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    currentJob: state.currentJob,
    imported: state.imported,
    decisions: state.decisions,
    evaluations: state.evaluations,
    sourcingInsights: state.sourcingInsights,
    userProfile: state.userProfile,
    privacyMode: state.privacyMode,
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
const RESUME_DB = "talentbridge-private-resumes";
const RESUME_STORE = "resumes";

function openResumeDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(RESUME_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(RESUME_STORE)) {
        request.result.createObjectStore(RESUME_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("无法打开本地简历存储"));
  });
}

async function storePrivateResume(candidateId, text) {
  const db = await openResumeDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(RESUME_STORE, "readwrite");
    transaction.objectStore(RESUME_STORE).put(text, candidateId);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function readPrivateResume(candidateId) {
  const db = await openResumeDb();
  const text = await new Promise((resolve, reject) => {
    const request = db.transaction(RESUME_STORE, "readonly").objectStore(RESUME_STORE).get(candidateId);
    request.onsuccess = () => resolve(request.result || "");
    request.onerror = () => reject(request.error);
  });
  db.close();
  return text;
}

async function deletePrivateResume(candidateId) {
  try {
    const db = await openResumeDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(RESUME_STORE, "readwrite");
      transaction.objectStore(RESUME_STORE).delete(candidateId);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    db.close();
  } catch {
    // Candidate deletion should still complete if local browser storage is unavailable.
  }
}

async function clearPrivateResumes() {
  try {
    const db = await openResumeDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(RESUME_STORE, "readwrite");
      transaction.objectStore(RESUME_STORE).clear();
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    db.close();
  } catch {
    // The demo can still reset when browser storage is unavailable.
  }
}

async function migrateLegacyResumeStorage() {
  let migrated = false;
  for (const job of Object.values(jobs)) {
    for (const candidate of job.candidates) {
      if (!candidate.custom || !candidate.rawResume?.trim()) continue;
      try {
        await storePrivateResume(candidate.id, candidate.rawResume);
        delete candidate.rawResume;
        migrated = true;
      } catch {
        // Keep legacy data in memory when IndexedDB is unavailable.
      }
    }
  }
  if (migrated) saveState();
}

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

function userAnalysisContext() {
  return {
    displayName: state.userProfile.name || "演示用户",
    recruiterContext: state.userProfile.context || ""
  };
}

function accountInitial(name = state.userProfile.name) {
  return String(name || "演示用户").trim().slice(0, 1) || "演";
}

function syncAccountUi() {
  const name = state.userProfile.name || "演示用户";
  const initial = accountInitial(name);
  const button = document.getElementById("accountButton");
  const menuName = document.getElementById("accountMenuName");
  const menuAvatar = document.getElementById("accountMenuAvatar");
  const nameInput = document.getElementById("accountNameInput");
  const contextInput = document.getElementById("accountContextInput");
  if (button) button.textContent = initial;
  if (menuName) menuName.textContent = name;
  if (menuAvatar) menuAvatar.textContent = initial;
  if (nameInput) nameInput.value = name;
  if (contextInput) contextInput.value = state.userProfile.context || "";
}

function toggleAccountMenu(forceOpen = null) {
  const menu = document.getElementById("accountMenu");
  const button = document.getElementById("accountButton");
  if (!menu || !button) return;
  const shouldOpen = forceOpen === null ? menu.classList.contains("hidden") : forceOpen;
  if (shouldOpen) syncAccountUi();
  menu.classList.toggle("hidden", !shouldOpen);
  button.setAttribute("aria-expanded", String(shouldOpen));
}

function saveAccountProfile() {
  const name = document.getElementById("accountNameInput")?.value.trim() || "演示用户";
  const context = document.getElementById("accountContextInput")?.value.trim() || "";
  state.userProfile = {
    name: name.slice(0, 20),
    context: context.slice(0, 500)
  };
  saveState();
  syncAccountUi();
  toggleAccountMenu(false);
  toast("个性化设置已保存", context ? "后续 AI 分析会结合你的招聘背景" : "当前仅使用岗位和简历信息");
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

function workflowStepper(active) {
  const labels = ["定义岗位", "校准标准", "导入简历", "复核候选人", "回填结果", "优化寻访"];
  return `
    <div class="stepper workflow-stepper" aria-label="招聘闭环">
      ${labels.map((label, index) => {
        const num = index + 1;
        const cls = num === active ? "active" : num < active ? "done" : "";
        const mark = num < active ? "✓" : num;
        return `<button class="step ${cls}" data-step="${num}"><span>${mark}</span><small>步骤 ${num}</small>${label}</button>`;
      }).join("")}
    </div>`;
}

function stepHeader(active, pageName = "") {
  const job = currentJob();
  const names = ["岗位定义", "能力标准", "简历导入", "候选人复核", "招聘结果", "寻访策略"];
  const currentName = pageName || names[active - 1];
  return `
    <div class="page-head">
      <div class="breadcrumbs"><span>招聘项目</span><span>/</span><b>${job.title}</b></div>
      <div class="title-row">
        <div class="title-copy">
          <span class="job-icon ${job.id}">${jobIcon(job)}</span>
          <div><span class="function-label">当前功能 · ${currentName}</span><h1>${job.title}</h1><p>${job.industry}</p></div>
        </div>
        <div class="title-actions">
          <button class="btn secondary" data-action="switch-job">切换招聘项目</button>
          ${active >= 3 && active <= 4 ? `<button class="btn primary" data-action="open-import">＋ 添加候选人</button>` : ""}
        </div>
      </div>
      ${workflowStepper(active)}
    </div>`;
}

function renderWorkbench() {
  state.view = "workbench";
  setActiveSidebar();
  renderRecentJobs();
  const importedJobs = Object.values(jobs).filter(job => state.imported[job.id]);
  const recoveredItems = importedJobs.flatMap(job => job.candidates
    .filter(candidate => candidate.recovered)
    .map(candidate => ({ job, candidate })));
  const reviewItems = importedJobs.flatMap(job => job.candidates
    .filter(candidate => !candidateRecord(candidate.id, job.id).value)
    .map(candidate => ({ job, candidate })));
  const followedUpItems = importedJobs.flatMap(job => job.candidates
    .filter(candidate => !["未跟进", "待联系"].includes(candidateRecord(candidate.id, job.id).stage))
    .map(candidate => ({ job, candidate })));
  const interviewItems = followedUpItems.filter(({ job, candidate }) =>
    ["进入面试", "面试通过", "Offer", "已入职"].includes(candidateRecord(candidate.id, job.id).stage));
  const insightItems = [
    ...recoveredItems.filter(({ job, candidate }) => !candidateRecord(candidate.id, job.id).value),
    ...recoveredItems.filter(({ job, candidate }) => candidateRecord(candidate.id, job.id).value)
  ].slice(0, 3);
  const sourcingJob = Object.values(jobs).find(job => state.sourcingInsights[job.id]?.result)
    || Object.values(jobs).find(job => positiveSourcingCandidates(job).length)
    || currentJob();
  const sourcingResult = state.sourcingInsights[sourcingJob.id]?.result;
  const sourcingSamples = positiveSourcingCandidates(sourcingJob);
  const sourcingPreview = sourcingResult
    ? [
        ...(sourcingResult.technicalKeywords || []).slice(0, 2).map(item => item.term),
        ...(sourcingResult.roleKeywords || []).slice(0, 1).map(item => item.term)
      ].slice(0, 3)
    : [];
  main.innerHTML = `
    <section class="page">
      <div class="overview-hero">
        <div class="hero-copy">
          <p class="eyebrow">AI 招聘闭环工作台</p>
          <h1>找到关键词之外，真正值得被看见的人</h1>
          <p>传统关键词筛选只看候选人“写了什么”，难以理解不同岗位名称、技术路线和行业经历背后相通的任务与能力，既可能漏掉具备迁移潜力的人才，也可能放入只有关键词却缺少真实经验的人选。TalentBridge 结合 JD、HR 的业务理解与行业研究，将候选人经历还原为任务场景、技术机制、责任范围和结果证据，说明为什么值得联系、哪些能力仍需验证；再用 HR 复核和后续招聘结果反向生成下一轮寻访关键词，形成可持续优化的招聘闭环。</p>
          <div class="hero-capabilities">
            <span><b>01</b> 找回 ATS 漏选人才</span>
            <span><b>02</b> 解释能力迁移路径</span>
            <span><b>03</b> 用招聘结果优化寻访</span>
          </div>
          <div class="hero-actions">
            <button class="btn primary" data-action="open-current">进入当前招聘项目</button>
            <button class="btn secondary" data-action="new-project">＋ 新建岗位</button>
            <button class="btn ghost" data-action="start-demo">▶ 查看完整闭环演示</button>
          </div>
        </div>
        <aside class="hero-insight">
          <div class="insight-title"><span class="pulse"></span>招聘行动提醒</div>
          <div class="insight-metrics">
            <div><strong>${recoveredItems.length}</strong><span>AI 新找回</span><small>ATS 未命中但存在迁移证据</small></div>
            <div><strong>${reviewItems.length}</strong><span>待 HR 判断</span><small>尚未提交结构化复核结论</small></div>
            <div><strong>${followedUpItems.length}</strong><span>已开始跟进</span><small>已联系或进入后续招聘流程</small></div>
            <div><strong>${interviewItems.length}</strong><span>进入面试</span><small>用于验证 AI 找回是否真正有效</small></div>
          </div>
          <div class="insight-candidates">
            <header><strong>建议优先查看</strong><span>${importedJobs.length} 个岗位已有候选人</span></header>
            ${insightItems.length ? insightItems.map(({ job, candidate }) => `
              <button data-action="open-insight-candidate" data-job-id="${job.id}" data-candidate-id="${candidate.id}">
                <span class="person-avatar">${escapeHtml(candidate.name.slice(-1))}</span>
                <span><strong>${escapeHtml(candidate.name)} · ${escapeHtml(candidate.role)}</strong><small>${escapeHtml(job.title)}｜${escapeHtml(candidate.core)}</small></span>
                <em>查看证据 →</em>
              </button>`).join("") : `
              <div class="insight-empty">
                <strong>尚无增量候选人</strong>
                <span>导入简历后，这里会列出 ATS 漏选但值得人工复核的人选。</span>
              </div>`}
          </div>
          <button class="insight-queue-button" data-action="open-insight-queue">${reviewItems.length ? `进入待复核队列（${reviewItems.length}）` : "查看当前岗位"}</button>
        </aside>
      </div>
      <div class="dashboard-body">
        <button class="home-sourcing-window" data-action="open-sourcing-strategy" data-job-id="${sourcingJob.id}">
          <span class="home-sourcing-icon">寻</span>
          <span class="home-sourcing-copy">
            <span class="eyebrow">寻访策略</span>
            <strong>${sourcingResult ? `${sourcingJob.title} · 已生成` : sourcingSamples.length ? `${sourcingSamples.length} 份正向样本可生成策略` : "生成下一轮搜索关键词"}</strong>
            ${sourcingPreview.length ? `<span class="home-sourcing-tags">${sourcingPreview.map(item => `<i>${escapeHtml(item)}</i>`).join("")}</span>` : ""}
          </span>
          <span class="home-sourcing-action">${sourcingResult ? "打开策略" : sourcingSamples.length ? "生成策略" : "查看功能"} →</span>
        </button>
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
  state.decisions["chip:linjia"] = { value: "推荐联系", reasons: ["技术机制相通", "量产或交付经验"], note: "2.5D 到 3D 存在可验证的迁移路径。", stage: "进入面试", stageNote: "已完成首次沟通，安排工艺技术面。", updatedAt: new Date().toISOString() };
  state.decisions["chip:zhouyi"] = { value: "推荐联系", reasons: ["任务场景相似", "个人职责明确"], note: "直接相关经验充分。", stage: "面试通过", stageNote: "技术面通过，待薪酬沟通。", updatedAt: new Date().toISOString() };
  state.decisions["chip:chenhao"] = { value: "推荐联系", reasons: ["技术机制相通", "关键经验待验证"], note: "TSV 与晶圆级制程相关，需核实量产责任。", stage: "已联系", stageNote: "候选人愿意了解机会。", updatedAt: new Date().toISOString() };
  state.decisions["chip:wangrui"] = { value: "暂缓", reasons: ["任务场景相似", "关键经验待验证"], note: "工艺整合能力较强，键合深度仍需确认。", stage: "未跟进", stageNote: "", updatedAt: new Date().toISOString() };
  state.decisions["chip:liuming"] = { value: "不合适", reasons: ["目标技术存在缺口", "个人职责不明确"], note: "生产管理经验不能替代先进封装工艺开发。", stage: "淘汰", stageNote: "HR 复核后不进入沟通。", updatedAt: new Date().toISOString() };
  state.sourcingInsights.chip = builtInSourcingInsight();
  saveState();
  renderQueue();
  toast("标准演示已就绪", "先打开“林嘉”，查看 2.5D → 3D 的能力迁移路径");
}

function builtInSourcingInsight() {
  return {
    status: "ready",
    generatedAt: new Date().toISOString(),
    candidateIds: ["linjia", "zhouyi", "chenhao"],
    result: {
      summary: "系统从林嘉等 3 位已获正向招聘反馈的候选人中，反向提炼出下一轮主动寻访可用的技术、平台、岗位和公司关键词。",
      sampleSize: 3,
      signalDescription: "HR 推荐联系，且候选人已进入联系、面试或更深阶段",
      technicalKeywords: [
        { term: "混合键合", sourceCount: 1, reason: "3D 堆叠中的关键互连工艺，来自面试通过候选人的直接经历。" },
        { term: "TSV", sourceCount: 1, reason: "与 3D 集成互连直接相关，可扩大对相邻封装人才的召回。" },
        { term: "晶圆减薄", sourceCount: 1, reason: "是堆叠封装中重要的晶圆级制程能力。" },
        { term: "微凸点互连", sourceCount: 1, reason: "2.5D 与 3D 封装之间具备迁移价值的底层工艺能力。" },
        { term: "翘曲控制", sourceCount: 1, reason: "直接对应岗位中的工艺窗口和可靠性问题。" },
        { term: "量产良率改善", sourceCount: 2, reason: "多位正向候选人都体现了量产问题定位和良率提升经验。" }
      ],
      productKeywords: [
        { term: "3D 晶圆堆叠", sourceCount: 1, reason: "目标岗位直接负责的平台。" },
        { term: "2.5D 中介层封装", sourceCount: 1, reason: "与 3D 封装共享互连、翘曲和良率控制能力。" },
        { term: "Interposer", sourceCount: 1, reason: "可找到未直接写出 3D 封装但具备相邻平台经验的人才。" }
      ],
      roleKeywords: [
        { term: "2.5D 封装工艺工程师", sourceCount: 1, reason: "代表容易被严格关键词过滤漏掉的相邻岗位。" },
        { term: "3D 集成工艺专家", sourceCount: 1, reason: "与目标岗位直接对应。" },
        { term: "先进封装研发工程师", sourceCount: 1, reason: "覆盖不同公司的岗位命名差异。" },
        { term: "封装工艺整合工程师", sourceCount: 1, reason: "补充具备跨工序协同经验的候选人。" }
      ],
      targetCompanies: [
        { company: "华芯微电子", sourceCount: 1, reason: "林嘉所在的示例先进封装企业。" },
        { company: "联创半导体", sourceCount: 1, reason: "正向候选人所在的示例 3D 集成企业。" },
        { company: "芯桥科技", sourceCount: 1, reason: "正向候选人所在的示例 TSV 工艺企业。" }
      ],
      exclusionKeywords: [],
      searchQueries: [
        {
          label: "直接技术路线",
          query: '("混合键合" OR "TSV" OR "晶圆减薄") AND ("量产导入" OR "良率爬坡")',
          usage: "优先寻找具备 3D 堆叠关键制程和量产经验的人才。"
        },
        {
          label: "相邻能力路线",
          query: '("2.5D" OR "Interposer" OR "CoWoS") AND ("翘曲控制" OR "微凸点互连" OR "失效分析")',
          usage: "扩大召回，寻找岗位名称不同但底层任务相通的人才。"
        },
        {
          label: "企业与岗位组合",
          query: '("华芯微电子" OR "联创半导体" OR "芯桥科技") AND ("先进封装" OR "3D集成" OR "TSV")',
          usage: "用于招聘网站或人才库中的定向猎聘。"
        }
      ],
      cautions: [
        "关键词用于扩大人才召回，不能替代 HR 对候选人实际项目深度和个人职责的复核。",
        "候选人与企业均为虚构演示数据；真实使用时系统会根据当前岗位的招聘反馈重新提炼。"
      ]
    }
  };
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

async function resetDemo() {
  await clearPrivateResumes();
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
    job.candidates.filter(candidate => !candidateRecord(candidate.id, job.id).value).length
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
            <label class="field"><span>岗位 JD *</span><textarea id="newJobJd" required rows="12" placeholder="粘贴岗位职责和任职要求……"></textarea></label>
            <label class="field business-context-field"><span>你对这项业务的理解</span><textarea id="newJobBusinessContext" rows="5" placeholder="可以通俗、碎片或笼统一点。例如：我们要做的是面向图像模型的 GPU 加速架构。"></textarea><small>AI 会把它作为分析视角，理解真正的产品方向和业务任务；不会直接把模糊表述当成淘汰条件。</small></label>
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
                ${companyProfileSection(pack)}
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

function companyProfileSection(pack) {
  const profiles = pack.companyProfiles || [];
  return `
    <section class="knowledge-section company-profile-section">
      <header><div><h3>企业产品与技术地图</h3><p>由候选人复核中的联网研究自动沉淀，帮助 HR 学习行业公司与目标岗位的关系</p></div><span class="tag blue">${profiles.length} 家企业</span></header>
      <div class="company-profile-list">
        ${profiles.length ? profiles.map(profile => `
          <article class="company-profile-card">
            <div class="company-profile-head">
              <div><strong>${escapeHtml(profile.company)}</strong><span>${escapeHtml(profile.role || "关联岗位未说明")}</span></div>
              <span class="tag ${profile.fit === "高" ? "green" : profile.fit === "中" ? "amber" : profile.fit === "低" ? "red" : "gray"}">JD 适配 ${escapeHtml(profile.fit)}</span>
            </div>
            <p>${escapeHtml(profile.summary)}</p>
            <div class="company-profile-facts">
              <span><small>产业链位置</small>${escapeHtml(profile.valueChainRole || "待研究")}</span>
              <span><small>业务模式</small>${escapeHtml(profile.businessModel || "待研究")}</span>
            </div>
            <div class="research-tags">${[...(profile.products || []), ...(profile.technologies || [])].slice(0, 6).map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>
            ${(profile.industryBenchmarks || []).length ? `<div class="company-profile-insight"><span>行业参照</span>${profile.industryBenchmarks.slice(0, 2).map(item => `<p>${escapeHtml(item.topic)}：${escapeHtml(item.companyComparison)}</p>`).join("")}</div>` : ""}
            <div class="company-profile-insight"><span>HR 学习重点</span>${(profile.hrInsights || profile.fitReasons || []).slice(0, 2).map(item => `<p>+ ${escapeHtml(item)}</p>`).join("")}${(profile.gaps || []).slice(0, 1).map(item => `<p>· ${escapeHtml(item)}</p>`).join("")}</div>
            <footer>
              <span>更新于 ${profile.researchedAt ? new Date(profile.researchedAt).toLocaleDateString("zh-CN") : "刚刚"}</span>
              <div>${(profile.sources || []).slice(0, 3).map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.domain || source.title)}</a>`).join("")}</div>
            </footer>
          </article>`).join("") : `<div class="knowledge-empty">完成候选人原司联网研究后，企业情报会自动出现在这里。</div>`}
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
    questions: pack.questions,
    companyProfiles: (pack.companyProfiles || []).slice(-10).map(profile => ({
      company: profile.company,
      summary: profile.summary,
      researchFocus: profile.researchFocus,
      operatingStructure: profile.operatingStructure,
      resolvedEntities: profile.resolvedEntities,
      products: profile.products,
      technologies: profile.technologies,
      industryPosition: profile.industryPosition,
      valueChainRole: profile.valueChainRole,
      businessModel: profile.businessModel,
      customerMarkets: profile.customerMarkets,
      operatingStage: profile.operatingStage,
      industryBenchmarks: profile.industryBenchmarks,
      researchMap: profile.researchMap,
      criticalChokepoints: profile.criticalChokepoints,
      verificationGates: profile.verificationGates,
      narrativeChecks: profile.narrativeChecks,
      sourceAssessment: profile.sourceAssessment,
      fit: profile.fit,
      researchedAt: profile.researchedAt
    }))
  };
}

function buildJobFromForm(title, industry, jdText, businessContext, note) {
  const id = `job-${Date.now()}`;
  const clauses = `${businessContext || ""}\n${jdText}`
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
    businessContext,
    note,
    model: modelNames.map((name, index) => [name.slice(0, 22), index < 3 ? "从 JD 与 HR 业务理解中识别的核心要求" : "建议由招聘经理进一步校准", index < 3 ? "必须" : "重要"]),
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
        <div class="page-purpose-bar"><span>岗位定义</span><strong>确认 AI 应该按什么业务目标理解这个岗位</strong><small>完成后进入能力标准校准</small></div>
        <div class="content-grid">
          <div class="card">
            <div class="card-head">
              <div><h2>JD 与业务背景</h2><p>检查输入是否准确</p></div>
              <span class="tag green dot">已解析</span>
            </div>
            <div class="card-body">
              <div class="jd-box">${job.jd}</div>
              <div class="business-context-box">
                <span>HR 对业务的理解</span>
                <p>${escapeHtml(job.businessContext || "暂未补充。AI 当前主要依据 JD 和能力模型进行分析。")}</p>
              </div>
              <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
                <button class="btn secondary" data-action="edit-jd">修改 JD / 业务理解</button>
                <button class="btn primary" data-step="2">下一步：校准能力标准 →</button>
              </div>
            </div>
          </div>
          <div class="stack">
            <div class="card ai-summary">
              <div class="card-head"><div><p class="eyebrow">AI 提炼结果</p><h3>岗位核心任务</h3></div></div>
              <div class="card-body">
                <ul>
                  <li>${job.summary}</li>
                  <li>识别到 ${job.model.length} 项关键能力，其中 ${job.model.filter(item => item[2] === "必须").length} 项建议设为必须。</li>
                  <li>发现 ${job.adjacent.length} 类可能具备迁移价值的相邻经历。</li>
                </ul>
                <details class="job-understanding-details">
                  <summary><span>编辑能力与相邻经历</span><small>${job.model.length} 项能力 · ${job.adjacent.length} 类相邻经历</small></summary>
                  <div class="job-understanding-editor">
                    <label class="understanding-summary">
                      <span>岗位真正要解决的问题</span>
                      <textarea id="jobUnderstandingSummary" rows="3">${escapeHtml(job.summary)}</textarea>
                    </label>
                    <section>
                      <header>
                        <div><strong>关键能力</strong><small>${job.model.length} 项，其中 ${job.model.filter(item => item[2] === "必须").length} 项必须</small></div>
                        <button class="btn ghost small" data-action="add-capability">＋ 添加能力</button>
                      </header>
                      <div class="model-list" id="jobUnderstandingModelList">
                        ${job.model.map((item, index) => modelItem(item, index)).join("")}
                      </div>
                    </section>
                    <section>
                      <header>
                        <div><strong>可接受的相邻经历</strong><small>${job.adjacent.length} 类，用于扩大合理召回</small></div>
                        <button class="btn ghost small" data-action="add-adjacent">＋ 添加经历</button>
                      </header>
                      <div class="adjacent-edit-list" id="jobUnderstandingAdjacentList">
                        ${job.adjacent.map((item, index) => adjacentEditItem(item, index)).join("")}
                      </div>
                    </section>
                    <div class="understanding-actions">
                      <p>模糊业务判断会作为分析视角，不会自动成为淘汰条件。</p>
                      <button class="btn primary small" data-action="save-job-understanding">保存岗位理解</button>
                    </div>
                  </div>
                </details>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div><h3>分析依据</h3><p>用于生成岗位模型</p></div></div>
              <div class="card-body">
                <p><span class="tag green">JD 原文</span> <span class="tag purple">业务理解</span> <span class="tag blue">招聘经理补充</span></p>
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
        <div class="page-purpose-bar"><span>能力标准</span><strong>确定必须能力、加分能力和可接受的相邻经历</strong><small>避免把模糊要求变成硬性淘汰条件</small></div>
        <div class="content-grid equal">
          <div class="card">
            <div class="card-head">
              <div><h2>能力判断标准</h2><p>直接编辑名称、说明和优先级</p></div>
              <button class="btn small secondary" data-action="add-capability">＋ 添加能力</button>
            </div>
            <div class="card-body">
              <div class="model-list" id="modelList">
                ${job.model.map((item, index) => modelItem(item, index)).join("")}
              </div>
              <div style="margin-top:16px;padding:12px;border-radius:6px;background:#f7f9fd">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px"><p style="margin:0;font-weight:500;font-size:12px">可接受的相邻经历</p><button class="btn ghost small" data-action="add-adjacent">＋ 添加</button></div>
                <div class="adjacent-edit-list" id="calibrationAdjacentList">${job.adjacent.map((item, index) => adjacentEditItem(item, index)).join("")}</div>
              </div>
            </div>
          </div>
          <div class="stack">
            <div class="card">
              <div class="card-head"><div><p class="eyebrow">筛选边界</p><h3>确定 AI 的判断原则</h3><p>4 项快速设置</p></div></div>
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
            <button class="btn primary" style="min-height:42px" data-action="confirm-model">保存标准并导入简历 →</button>
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

function adjacentEditItem(item, index) {
  return `
    <div class="adjacent-edit-item" data-adjacent-index="${index}">
      <span contenteditable="true">${escapeHtml(item)}</span>
      <button class="delete-btn" data-action="delete-adjacent" title="删除">×</button>
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
        <div class="page-purpose-bar"><span>简历导入</span><strong>添加本岗位需要分析的候选人</strong><small>支持示例数据、PDF、DOCX 和粘贴文本</small></div>
        <div class="content-grid">
          <div class="card">
            <div class="card-head">
              <div><h2>${imported ? "候选人已导入" : "添加候选人"}</h2><p>${imported ? "检查名单后开始分析" : "选择一种导入方式"}</p></div>
              ${imported ? `<span class="tag green dot">${job.candidates.length} 份解析完成</span>` : ""}
            </div>
            <div class="card-body">
              ${imported ? importedList(job) : `
                <div class="import-drop">
                  <div>
                    <div class="upload-icon">⇧</div>
                    <h3>添加候选人简历</h3>
                    <p>支持使用示例数据、上传 PDF / DOCX 或粘贴文本</p>
                    <button class="btn primary" data-action="open-import">＋ 添加候选人简历</button>
                  </div>
                </div>`}
            </div>
          </div>
          <div class="stack">
            <div class="card">
              <div class="card-head"><div><h3>AI 将提取什么</h3><p>五类可复核信息</p></div></div>
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
        ${job.candidates.map(c => `
          <div class="sample-person import-candidate">
            <span class="person-avatar">${c.name.slice(-1)}</span>
            <div><strong>${c.name}${c.privacyProtected ? ` <em class="local-only">本机原文</em>` : ""}</strong><span>${c.role}</span></div>
            <button class="candidate-remove" data-action="delete-imported-candidate" data-candidate-id="${c.id}" title="移除候选人" aria-label="移除候选人 ${c.name}">×</button>
          </div>`).join("")}
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
        <button class="btn secondary" data-action="open-import">＋ 继续添加候选人</button>
        <button class="btn primary" data-action="start-analysis">分析并进入复核队列 →</button>
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
  const visible = job.candidates.filter(candidate => {
    const record = candidateRecord(candidate.id, job.id);
    if (state.filter === "all") return true;
    if (state.filter === "recovered") return candidate.recovered;
    if (state.filter === "pending-review") return !record.value;
    if (state.filter === "interview") return ["进入面试", "面试通过", "Offer", "已入职"].includes(record.stage);
    return candidate.group === state.filter;
  });
  const recovered = job.candidates.filter(c => c.recovered).length;
  const businessMetrics = getBusinessMetrics(job);
  main.innerHTML = `
    <section class="page">
      ${stepHeader(4)}
      <div class="page-body">
        <div class="page-purpose-bar"><span>候选人复核</span><strong>判断是否联系，并记录判断理由</strong><small>${businessMetrics.pendingReview.length} 人待复核 · ${businessMetrics.interviewed.length} 人已进入面试</small></div>
        <div class="queue-status-line">
          <span><strong>${job.candidates.length}</strong> 位候选人</span>
          <span class="${businessMetrics.pendingReview.length ? "attention" : ""}"><strong>${businessMetrics.pendingReview.length}</strong> 位待复核</span>
          ${recovered ? `<span class="recovered"><strong>${recovered}</strong> 位 ATS 漏选找回</span>` : ""}
          <span><strong>${businessMetrics.interviewed.length}</strong> 位进入面试</span>
          <button data-action="show-compare">查看招聘结果 →</button>
        </div>
        <div class="card">
          <div class="card-head" style="align-items:center">
            <div><h2>待复核候选人</h2><p>点击候选人查看证据并提交 HR 结论</p></div>
            <div class="title-actions"><button class="btn secondary" data-action="export-queue">导出名单</button><button class="btn primary" data-action="open-import">＋ 添加候选人</button></div>
          </div>
          <div class="card-body" style="padding:14px 0 0">
            <div class="queue-toolbar" style="padding:0 18px">
              <div class="filter-tabs">
                ${filterButton("all", "全部")}
                ${filterButton("priority", "优先联系")}
                ${filterButton("review", "值得复核")}
                ${filterButton("recovered", "AI 新找回")}
                ${filterButton("unknown", "信息不足")}
                ${filterButton("pending-review", "待 HR 复核")}
                ${filterButton("interview", "面试中")}
              </div>
              <span class="tiny">共 ${visible.length} 位候选人</span>
            </div>
            <table class="candidate-table">
              <thead><tr><th>候选人</th><th>AI 建议</th><th>HR 决策 / 进展</th><th>核心判断</th><th>能力覆盖</th><th></th></tr></thead>
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
  const record = candidateRecord(c.id);
  return `
    <tr data-candidate="${c.id}">
      <td><div class="candidate-name"><span class="person-avatar">${c.name.slice(-1)}</span><div><strong>${c.name}${c.recovered ? ` <span class="tag cyan" style="margin-left:5px">AI 新找回</span>` : ""}</strong><span>${c.role} · ${c.company}</span></div></div></td>
      <td><div class="candidate-progress"><span class="tag ${verdictClass}">${c.verdict}</span><small>${c.ats ? "ATS 命中" : "ATS 未命中"}</small></div></td>
      <td><div class="candidate-progress"><strong>${record.value || "待复核"}</strong><span class="tag ${hiringStageClass(record.stage)}">${record.stage}</span></div></td>
      <td><div class="match-summary"><strong>${c.core}</strong><span>待确认：${c.gap}</span></div></td>
      <td><div class="coverage"><div class="coverage-bar"><i style="width:${c.coverage}%"></i></div><span>${c.coverage}%</span></div></td>
      <td><button class="btn ghost small">查看分析 →</button></td>
    </tr>`;
}

function evaluationFor(candidate, jobId = state.currentJob) {
  const key = `${jobId}:${candidate.id}`;
  if (state.evaluations[key]) return state.evaluations[key];
  const decision = candidateRecord(candidate.id, jobId).value;
  if (decision) return decisionEvaluation(decision);
  return "unknown";
}

function getBusinessMetrics(job) {
  const entries = job.candidates.map(candidate => ({
    candidate,
    record: candidateRecord(candidate.id, job.id)
  }));
  const reviewed = entries.filter(item => item.record.value);
  const pendingReview = entries.filter(item => !item.record.value).map(item => item.candidate);
  const recommended = entries.filter(item => item.record.value === "推荐联系").map(item => item.candidate);
  const contactedStages = ["已联系", "愿意沟通", "进入面试", "面试通过", "Offer", "已入职"];
  const interviewStages = ["进入面试", "面试通过", "Offer", "已入职"];
  const offerStages = ["Offer", "已入职"];
  const contacted = entries.filter(item => contactedStages.includes(item.record.stage)).map(item => item.candidate);
  const interviewed = entries.filter(item => interviewStages.includes(item.record.stage)).map(item => item.candidate);
  const offers = entries.filter(item => offerStages.includes(item.record.stage)).map(item => item.candidate);
  const hired = entries.filter(item => item.record.stage === "已入职").map(item => item.candidate);
  const recommendedContacted = entries.filter(item => item.record.value === "推荐联系" && contactedStages.includes(item.record.stage)).map(item => item.candidate);
  const recoveredRecommended = entries.filter(item => item.candidate.recovered && item.record.value === "推荐联系").map(item => item.candidate);
  const recoveredInterviewed = entries.filter(item => item.candidate.recovered && interviewStages.includes(item.record.stage)).map(item => item.candidate);
  const overturned = entries.filter(item => {
    const aiPositive = ["priority", "review"].includes(item.candidate.group);
    const humanPositive = ["推荐联系", "暂缓"].includes(item.record.value);
    return item.record.value && aiPositive !== humanPositive;
  }).map(item => item.candidate);
  const reasonCounts = reviewed
    .flatMap(item => item.record.reasons)
    .reduce((counts, reason) => ({ ...counts, [reason]: (counts[reason] || 0) + 1 }), {});
  const topReasons = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1]);
  const percent = (part, total) => total ? Math.round(part / total * 100) : 0;
  return {
    reviewed,
    pendingReview,
    recommended,
    contacted,
    interviewed,
    offers,
    hired,
    recoveredRecommended,
    recoveredInterviewed,
    overturned,
    topReasons,
    reviewRate: percent(reviewed.length, job.candidates.length),
    contactRate: percent(recommendedContacted.length, recommended.length),
    interviewRate: percent(interviewed.length, contacted.length),
    offerRate: percent(offers.length, interviewed.length)
  };
}

function getEvaluationMetrics(job) {
  const evaluated = job.candidates.filter(candidate => evaluationFor(candidate, job.id) !== "unknown");
  const relevant = evaluated.filter(candidate => evaluationFor(candidate, job.id) === "relevant");
  const atsSelected = evaluated.filter(candidate => candidate.ats);
  const aiSelected = evaluated.filter(candidate => ["priority", "review"].includes(candidate.group));
  const atsTrue = atsSelected.filter(candidate => evaluationFor(candidate, job.id) === "relevant");
  const aiTrue = aiSelected.filter(candidate => evaluationFor(candidate, job.id) === "relevant");
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
    unknown: job.candidates.filter(candidate => evaluationFor(candidate, job.id) === "unknown")
  };
}

const SOURCING_POSITIVE_STAGES = ["已联系", "愿意沟通", "进入面试", "面试通过", "Offer", "已入职"];
const SOURCING_STAGE_SCORE = {
  "已联系": 1,
  "愿意沟通": 2,
  "进入面试": 3,
  "面试通过": 4,
  "Offer": 5,
  "已入职": 6
};

function positiveSourcingCandidates(job) {
  return job.candidates
    .filter(candidate => {
      const record = candidateRecord(candidate.id, job.id);
      return record.value === "推荐联系" && SOURCING_POSITIVE_STAGES.includes(record.stage);
    })
    .sort((a, b) => {
      const aRecord = candidateRecord(a.id, job.id);
      const bRecord = candidateRecord(b.id, job.id);
      return (SOURCING_STAGE_SCORE[bRecord.stage] || 0) - (SOURCING_STAGE_SCORE[aRecord.stage] || 0)
        || (b.coverage || 0) - (a.coverage || 0);
    })
    .slice(0, 8);
}

function sourcingKeywordItems(items = [], type = "term") {
  if (!items.length) return `<span class="sourcing-empty-text">暂无足够证据</span>`;
  return items.map(item => {
    const value = type === "company" ? item.company : item.term;
    return `
      <button class="sourcing-keyword" data-action="copy-sourcing-term" data-copy-text="${escapeHtml(value)}" title="${escapeHtml(item.reason || "点击复制")}">
        <span>${escapeHtml(value)}</span>
        <small>${item.sourceCount || 1} 份样本</small>
      </button>`;
  }).join("");
}

function sourcingSampleCases(job, insight) {
  const candidateIds = insight?.candidateIds?.length
    ? insight.candidateIds
    : positiveSourcingCandidates(job).map(candidate => candidate.id);
  const candidates = candidateIds
    .map(candidateId => job.candidates.find(candidate => candidate.id === candidateId))
    .filter(Boolean);
  if (!candidates.length) return "";
  return `
    <div class="sourcing-sample-cases">
      <div class="sourcing-sample-title">
        <div><strong>内置正向候选人案例</strong><span>点击候选人可查看为什么这段经历能反向生成关键词</span></div>
        <small>演示数据</small>
      </div>
      <div class="sourcing-sample-list">
        ${candidates.map(candidate => {
          const record = candidateRecord(candidate.id, job.id);
          return `
            <button data-action="open-insight-candidate" data-job-id="${job.id}" data-candidate-id="${candidate.id}">
              <span class="person-avatar">${escapeHtml(candidate.name.slice(-1))}</span>
              <span>
                <strong>${escapeHtml(candidate.name)} · ${escapeHtml(candidate.role)}</strong>
                <small>${escapeHtml(candidate.core)}｜${escapeHtml(record.stage)}</small>
              </span>
              ${candidate.recovered ? `<em>ATS 漏选代表案例</em>` : `<em>正向样本</em>`}
            </button>`;
        }).join("")}
      </div>
    </div>`;
}

function sourcingInsightCard(job) {
  const samples = positiveSourcingCandidates(job);
  const insight = state.sourcingInsights[job.id];
  const hasResult = insight?.result && ["ready", "loading", "error"].includes(insight.status);
  const result = insight?.result;
  const updated = insight?.generatedAt
    ? new Date(insight.generatedAt).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "";

  if (!samples.length) {
    return `
      <div class="card sourcing-feedback-card sourcing-feedback-empty">
        <div>
          <p class="eyebrow">寻访关键词反哺</p>
          <h2>先积累一位有正向进展的候选人</h2>
          <p>当候选人被 HR 推荐，并进入联系、面试、Offer 或入职阶段后，系统会从其经历中反向提炼下一轮找简历可用的技术、产品和公司关键词。</p>
        </div>
        <button class="btn secondary" disabled>暂无可用样本</button>
      </div>`;
  }

  if (insight?.status === "loading" && !hasResult) {
    return `
      <div class="card sourcing-feedback-card sourcing-feedback-loading">
        <div><span class="research-spinner"></span><div><h2>正在从正向候选人中提炼寻访词</h2><p>系统正在比较 ${samples.length} 份简历中的技术、产品、公司和岗位信号。</p></div></div>
      </div>`;
  }

  if (!result) {
    return `
      <div class="card sourcing-feedback-card">
        <div class="sourcing-feedback-intro">
          <div>
            <p class="eyebrow">寻访关键词反哺</p>
            <h2>把招聘结果变成下一轮找人的搜索策略</h2>
            <p>当前已有 ${samples.length} 位“HR 推荐且产生正向进展”的候选人。系统只基于这些真实反馈样本反向提炼，不用 AI 高分自证。</p>
          </div>
          <button class="btn primary" data-action="generate-sourcing-keywords">生成寻访关键词</button>
        </div>
        ${insight?.status === "error" ? `<div class="evaluation-warning"><strong>生成失败</strong><span>${escapeHtml(insight.error || "请稍后重试")}</span></div>` : ""}
      </div>`;
  }

  return `
    <div class="card sourcing-feedback-card">
      <div class="card-head sourcing-feedback-head">
        <div>
          <p class="eyebrow">寻访关键词反哺</p>
          <h2>下一轮主动寻访建议</h2>
          <p>${escapeHtml(result.summary)}</p>
        </div>
        <div class="sourcing-feedback-actions">
          <span class="tag green">${result.sampleSize || samples.length} 份正向样本</span>
          <button class="btn secondary small" data-action="copy-all-sourcing-keywords">复制全部关键词</button>
          <button class="btn primary small" data-action="generate-sourcing-keywords">${insight.status === "loading" ? "更新中…" : "根据最新结果更新"}</button>
        </div>
      </div>
      <div class="sourcing-signal-note">
        <strong>样本口径</strong>
        <span>${escapeHtml(result.signalDescription || "HR 推荐联系，且已有联系或更深阶段进展")}${updated ? ` · 更新于 ${updated}` : ""}</span>
      </div>
      ${sourcingSampleCases(job, insight)}
      <div class="sourcing-keyword-grid">
        <section><h3>关键技术</h3><p>搜索候选人真正做过的技术与方法</p><div>${sourcingKeywordItems(result.technicalKeywords)}</div></section>
        <section><h3>产品 / 平台</h3><p>岗位名不同时，用产品环境扩大召回</p><div>${sourcingKeywordItems(result.productKeywords)}</div></section>
        <section><h3>相邻岗位</h3><p>找到名称不同但经历相通的人</p><div>${sourcingKeywordItems(result.roleKeywords)}</div></section>
        <section><h3>目标公司</h3><p>来自正向样本任职公司或已验证业务主体</p><div>${sourcingKeywordItems(result.targetCompanies, "company")}</div></section>
      </div>
      <div class="sourcing-query-list">
        <div class="sourcing-query-title"><div><h3>可直接尝试的搜索组合</h3><p>不同招聘网站对布尔语法支持不同，可按实际情况删除引号或拆分搜索。</p></div></div>
        ${(result.searchQueries || []).map((item, index) => `
          <section>
            <div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.usage)}</p></div>
            <code>${escapeHtml(item.query)}</code>
            <button class="btn ghost small" data-action="copy-sourcing-query" data-query-index="${index}">复制</button>
          </section>`).join("")}
      </div>
      ${result.exclusionKeywords?.length ? `<div class="sourcing-exclusions"><strong>建议排除</strong><span>${result.exclusionKeywords.map(escapeHtml).join("、")}</span></div>` : ""}
      <div class="sourcing-cautions">${(result.cautions || []).map(item => `<span>· ${escapeHtml(item)}</span>`).join("")}</div>
    </div>`;
}

async function sourcingCandidatePayload(candidate, job) {
  const record = candidateRecord(candidate.id, job.id);
  let resume = "";
  try {
    const original = await originalResumeFor(candidate);
    resume = redactResume(original, candidate.name).text.slice(0, 6000);
  } catch {
    resume = redactResume(buildSampleResume(candidate), candidate.name).text.slice(0, 6000);
  }
  return {
    role: candidate.role,
    company: candidate.company,
    outcome: { decision: record.value, stage: record.stage, reasons: record.reasons },
    resume,
    facts: candidate.facts || [],
    transferable: candidate.transferable || [],
    companyContext: candidate.companyContext || {},
    companyResearch: candidate.companyResearch?.status === "researched" ? {
      products: candidate.companyResearch.products || [],
      technologies: candidate.companyResearch.technologies || [],
      resolvedEntities: candidate.companyResearch.resolvedEntities || []
    } : null,
    adjacentRoles: job.adjacent || []
  };
}

async function generateSourcingKeywords(options = {}) {
  const job = currentJob();
  if (state.sourcingInsights[job.id]?.status === "loading") return;
  const samples = positiveSourcingCandidates(job);
  if (!samples.length) {
    if (!options.silent) toast("还没有可用于反哺的正向样本", "请先推荐候选人并回填联系、面试或 Offer 进展");
    return;
  }
  const previousInsight = state.sourcingInsights[job.id];
  const previous = previousInsight?.result;
  state.sourcingInsights[job.id] = { status: "loading", result: previous || null };
  if (state.view === "sourcing") renderSourcingStrategy(job.id);
  else if (document.querySelector(".sourcing-feedback-card")) renderComparison();
  try {
    const candidates = await Promise.all(samples.map(candidate => sourcingCandidatePayload(candidate, job)));
    const data = await apiRequest("/api/generate-sourcing-keywords", {
      job: analysisJobPayload(job),
      signalDescription: "HR 推荐联系，且已进入联系、面试、Offer 或入职阶段",
      candidates
    });
    state.sourcingInsights[job.id] = {
      status: "ready",
      result: data.result,
      generatedAt: new Date().toISOString(),
      candidateIds: samples.map(candidate => candidate.id)
    };
    saveState();
    if (state.view === "sourcing") renderSourcingStrategy(job.id);
    else if (document.querySelector(".sourcing-feedback-card")) renderComparison();
    toast(options.silent ? "寻访关键词已自动更新" : "寻访关键词已生成", `已从 ${samples.length} 份正向候选人经历中提炼`);
  } catch (error) {
    state.sourcingInsights[job.id] = {
      status: "error",
      result: previous || null,
      error: error.message,
      generatedAt: previousInsight?.generatedAt || ""
    };
    saveState();
    if (state.view === "sourcing") renderSourcingStrategy(job.id);
    else if (document.querySelector(".sourcing-feedback-card")) renderComparison();
    if (!options.silent) toast("寻访关键词生成失败", error.message);
  }
}

function sourcingReviewCta(job) {
  const samples = positiveSourcingCandidates(job);
  const result = state.sourcingInsights[job.id]?.result;
  const preview = result
    ? [
        ...(result.technicalKeywords || []).slice(0, 3).map(item => item.term),
        ...(result.productKeywords || []).slice(0, 1).map(item => item.term),
        ...(result.targetCompanies || []).slice(0, 1).map(item => item.company)
      ]
    : [];
  return `
    <button class="review-sourcing-cta" data-action="open-sourcing-strategy" data-job-id="${job.id}">
      <span class="review-sourcing-icon">寻</span>
      <span>
        <small>${result ? "已生成寻访策略" : samples.length ? `${samples.length} 份正向样本可用` : "等待正向招聘结果"}</small>
        <strong>${result ? "查看下一轮招聘网站搜索词" : "把有效候选人的共同特征变成搜索词"}</strong>
        <em>${preview.length ? preview.map(escapeHtml).join(" · ") : "关键技术 · 产品平台 · 相邻岗位 · 目标公司"}</em>
      </span>
      <b>打开寻访策略 →</b>
    </button>`;
}

function renderSourcingStrategy(jobId = state.currentJob) {
  if (jobs[jobId]) state.currentJob = jobId;
  const job = currentJob();
  state.view = "sourcing";
  setActiveSidebar();
  renderRecentJobs();
  main.innerHTML = `
    <section class="page">
      ${stepHeader(6, "寻访策略")}
      <div class="page-body sourcing-page-body">
        <div class="page-purpose-bar"><span>寻访策略</span><strong>把有效候选人的共同特征变成下一轮搜索词</strong><small><button class="text-action" data-action="show-compare">查看结果依据</button></small></div>
        ${sourcingInsightCard(job)}
        <details class="sourcing-boundary-note compact-details">
          <summary>使用边界与搜索建议</summary>
          <p>先用技术词和相邻岗位扩大召回，再叠加产品或目标公司缩小范围。关键词用于找人，不替代简历分析和人工判断。</p>
        </details>
      </div>
    </section>`;
}

function renderComparison() {
  const job = currentJob();
  const metrics = getEvaluationMetrics(job);
  const business = getBusinessMetrics(job);
  state.view = "job";
  setActiveSidebar();
  renderRecentJobs();
  main.innerHTML = `
    <section class="page">
      ${stepHeader(5, "招聘结果")}
      <div class="page-body">
        <div class="page-purpose-bar"><span>招聘结果</span><strong>确认 AI 找回的人是否真的进入后续招聘流程</strong><small><button class="text-action" data-action="copy-evaluation">复制结果摘要</button></small></div>
        <div class="review-section-title"><span>01</span><div><h2>招聘推进到哪一步？</h2><p>先看实际转化，不看模型术语。</p></div></div>
        <div class="recruiting-funnel">
          ${funnelStage("完成复核", business.reviewed.length, `${business.reviewRate}% 已有 HR 结论`, "blue")}
          ${funnelStage("实际联系", business.contacted.length, `${business.contactRate}% 推荐后已联系`, "cyan")}
          ${funnelStage("进入面试", business.interviewed.length, `${business.interviewRate}% 联系后进入面试`, "purple")}
          ${funnelStage("Offer / 入职", business.offers.length, `${business.offerRate}% 面试后获得 Offer`, "green")}
        </div>
        <div class="review-section-title"><span>02</span><div><h2>AI 多找回的人，后来真的有效吗？</h2><p>只用 HR 决策和后续招聘结果验证，不让 AI 自己证明自己。</p></div></div>
        <div class="card outcome-insight-card">
          <div>
            <p class="eyebrow">AI 增量价值</p>
            <strong>${business.recoveredRecommended.length} 位 ATS 漏选人才被 HR 推荐，其中 ${business.recoveredInterviewed.length} 位进入面试</strong>
            <span>结论来自 HR 决策和招聘进展回填。</span>
          </div>
        </div>
        <details class="review-metric-details">
          <summary><span><strong>查看模型指标</strong><small>召回率、精确率与人工判断依据</small></span><b>展开评估明细</b></summary>
          <div>
            ${metrics.unknown.length ? `<div class="evaluation-warning"><strong>${metrics.unknown.length} 位候选人尚未标注</strong><span>未标注数据不进入指标计算。</span></div>` : ""}
            <div class="metric-compare-grid">
              ${metricCompareCard("召回率", metrics.atsRecall, metrics.aiRecall, "合理候选人中，被系统找回的比例")}
              ${metricCompareCard("精确率", metrics.atsPrecision, metrics.aiPrecision, "系统建议复核的人中，人工确认合理的比例")}
              <div class="card impact-card">
                <p class="eyebrow">HR 判断依据</p>
                <strong>${business.topReasons.length}<small> 类理由</small></strong>
                ${(business.topReasons.slice(0, 2).map(([reason, count]) => `<div><span>${reason}</span><b>${count} 次</b></div>`).join("")) || `<div><span>尚未填写结构化理由</span><b>待补充</b></div>`}
              </div>
            </div>
          </div>
        </details>
        <div class="review-section-title"><span>03</span><div><h2>下一轮应该去哪里找人？</h2><p>把已验证的候选人特征反向变成搜索词，而不是重新从 JD 猜关键词。</p></div></div>
        ${sourcingReviewCta(job)}
        <details class="review-advanced-details">
          <summary><span><strong>查看候选人明细与模型评估</strong><small>候选人流向、逐人招聘进展、人工质量标签和数据导出</small></span><b>展开高级明细</b></summary>
          <div class="review-advanced-body">
            <div class="review-export-actions">
              <button class="btn secondary small" data-action="export-evaluation-csv">导出明细 CSV</button>
              <button class="btn secondary small" data-action="export-evaluation-json">导出评估 JSON</button>
            </div>
            <div class="card result-map-card">
              <div class="card-head"><div><h2>候选人流向</h2><p>查看 ATS 与 AI 在哪些人选上产生差异</p></div></div>
              <div class="card-body">
                <div class="result-columns">
                  ${resultColumn("ATS 与 AI 共同命中", metrics.shared, "blue", "直接相关证据较充分")}
                  ${resultColumn("AI 增量找回", metrics.recovered, "cyan", "关键词未命中，但存在迁移路径")}
                  ${resultColumn("仍需人工判断", metrics.missed, "amber", "信息不足或关键差距明确")}
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div><h2>复核与招聘进展明细</h2><p>AI 建议、HR 决策理由和后续结果</p></div><span class="tag blue">${business.reviewed.length}/${job.candidates.length} 已复核</span></div>
              <div class="card-body" style="padding:0">
                <table class="candidate-table feedback-table">
                  <thead><tr><th>候选人</th><th>AI 建议</th><th>HR 决策</th><th>核心理由</th><th>招聘进展</th><th>更新时间</th></tr></thead>
                  <tbody>${job.candidates.map(feedbackRow).join("")}</tbody>
                </table>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div><h2>模型质量人工标签</h2><p>用于计算召回率和精确率的人工标准答案</p></div><span class="tag gray">${metrics.evaluated.length}/${job.candidates.length} 已标注</span></div>
              <div class="card-body" style="padding:0">
                <table class="candidate-table evaluation-table">
                  <thead><tr><th>候选人</th><th>ATS</th><th>AI 建议</th><th>人工标准答案</th><th>结果说明</th></tr></thead>
                  <tbody>${job.candidates.map(evaluationRow).join("")}</tbody>
                </table>
              </div>
            </div>
          </div>
        </details>
        <p class="evaluation-footnote">当前 Demo 指标用于验证产品逻辑；正式评估仍需扩大样本，并由业务专家盲标。</p>
      </div>
    </section>`;
}

function funnelStage(label, value, detail, color) {
  return `
    <div class="funnel-stage ${color}">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${detail}</small>
    </div>`;
}

function feedbackRow(candidate) {
  const record = candidateRecord(candidate.id);
  const aiClass = candidate.group === "priority" ? "green" : candidate.group === "review" ? "blue" : candidate.group === "unknown" ? "amber" : "gray";
  const updated = record.updatedAt ? new Date(record.updatedAt).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "尚未更新";
  return `
    <tr data-candidate="${candidate.id}">
      <td><div class="candidate-name"><span class="person-avatar">${candidate.name.slice(-1)}</span><div><strong>${candidate.name}</strong><span>${candidate.role}</span></div></div></td>
      <td><span class="tag ${aiClass}">${candidate.verdict}</span></td>
      <td><strong>${record.value || "待复核"}</strong></td>
      <td class="tiny">${record.reasons.length ? record.reasons.slice(0, 2).join("、") : "尚未填写"}</td>
      <td><span class="tag ${hiringStageClass(record.stage)}">${record.stage}</span></td>
      <td class="tiny">${updated}</td>
    </tr>`;
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

function companyContextFor(candidate) {
  return candidate.companyContext || {
    companyType: "简历未说明",
    products: ["产品或服务形态待确认"],
    technologyPlatform: ["技术平台待确认"],
    productionStage: "研发、试产或量产阶段待确认",
    evidenceNote: "现有简历信息不足，不根据公司名称推测业务背景"
  };
}

function comparabilityFor(candidate) {
  if (Array.isArray(candidate.comparability) && candidate.comparability.length) return candidate.comparability;
  const dimensions = ["任务对象", "技术机理", "问题复杂度", "量产阶段", "个人责任"];
  return dimensions.map((dimension, index) => ({
    dimension,
    candidateEvidence: candidate.facts?.[index] || "简历未提供明确证据",
    targetRequirement: candidate.target?.[Math.min(index, (candidate.target?.length || 1) - 1)] || "目标要求待对齐",
    judgment: "未证实",
    reason: "旧版分析未完成该维度的严格比较，建议重新导入分析"
  }));
}

function transferBoundaryFor(candidate) {
  return candidate.transferBoundary?.length
    ? candidate.transferBoundary
    : [`不能仅凭“${candidate.core}”直接外推为目标岗位经验`, candidate.gap || "关键技术与责任边界待确认"];
}

function comparabilityClass(judgment) {
  return judgment === "可比" ? "green" : judgment === "部分可比" ? "amber" : "gray";
}

function hrCapabilityPoints(candidate) {
  const priority = { "可比": 0, "部分可比": 1, "未证实": 2 };
  return comparabilityFor(candidate)
    .slice()
    .sort((a, b) => priority[a.judgment] - priority[b.judgment])
    .slice(0, 3);
}

function companyResearchCard(candidate) {
  const research = candidate.companyResearch;
  if (!research || research.status === "loading") {
    return `
      <div class="company-research-state">
        <span class="research-spinner"></span>
        <div><strong>正在联网核验原司背景</strong><p>搜索公开网页，判断产品与技术方向是否贴近当前 JD。</p></div>
      </div>`;
  }
  if (research.status === "error") {
    return `
      <div class="company-research-state">
        <div><strong>联网研究暂时失败</strong><p>${escapeHtml(research.summary || "请稍后重试")}</p></div>
        <button class="btn secondary small" data-action="research-company">重新研究</button>
      </div>`;
  }
  const fitClass = research.fit === "高" ? "green" : research.fit === "中" ? "amber" : research.fit === "低" ? "red" : "gray";
  const relevanceClass = relevance => relevance === "直接相关" ? "green" : relevance === "相邻相关" ? "amber" : "gray";
  const focus = research.researchFocus || {
    primaryEntity: research.company || candidate.company,
    whyPrimary: "按简历所列企业进行研究",
    employmentLink: "未确认"
  };
  return `
    <div class="research-summary">
      <div><span class="tag blue">Industry Research Skill</span><span class="tag ${fitClass}">原司背景适配 ${escapeHtml(research.fit)}</span><strong>${escapeHtml(research.summary)}</strong></div>
      <button class="btn ghost small" data-action="research-company">重新联网核验</button>
    </div>
    <div class="research-focus-card">
      <div>
        <span>本次重点研究主体</span>
        <strong>${escapeHtml(focus.primaryEntity)}</strong>
        <p>${escapeHtml(focus.whyPrimary)}</p>
      </div>
      <em>${escapeHtml(focus.employmentLink)}</em>
    </div>
    <div class="operating-structure">
      <span>集团与实际业务主体关系</span>
      <div>${(research.operatingStructure || []).map(entity => `
        <p class="${entity.priority === "重点研究" ? "is-primary" : ""}">
          <strong>${escapeHtml(entity.name)}</strong>
          <em>${escapeHtml(entity.type)} · ${escapeHtml(entity.priority)}</em>
          <small>${escapeHtml(entity.businessRole)}</small>
          <small>${escapeHtml(entity.relationshipToInput)}</small>
        </p>
      `).join("") || `<p><strong>${escapeHtml(research.company || candidate.company)}</strong><small>主体关系待核验</small></p>`}</div>
    </div>
    <div class="industry-fact-grid">
      <div><span>产业定位</span><strong>${escapeHtml(research.industryPosition || "待研究")}</strong></div>
      <div><span>产业链位置</span><strong>${escapeHtml(research.valueChainRole || "待研究")}</strong></div>
      <div><span>业务模式</span><strong>${escapeHtml(research.businessModel || "待研究")}</strong></div>
      <div><span>业务阶段</span><strong>${escapeHtml(research.operatingStage || "待研究")}</strong></div>
    </div>
    <div class="resolved-entities">
      <span>实体消歧记录</span>
      <div>${(research.resolvedEntities || [{ name: research.company || candidate.company, relationship: "简历所列主体", businessRole: "待核验" }]).map(entity => `
        <p><strong>${escapeHtml(entity.name)}</strong><em>${escapeHtml(entity.relationship)}</em><small>${escapeHtml(entity.businessRole)}</small></p>
      `).join("")}</div>
    </div>
    <div class="research-tags">
      ${(research.products || []).slice(0, 3).map(item => `<span>${escapeHtml(item)}</span>`).join("")}
      ${(research.technologies || []).slice(0, 4).map(item => `<span>${escapeHtml(item)}</span>`).join("")}
    </div>
    <div class="jd-research-map">
      <span>企业背景与 JD 逐项映射</span>
      ${(research.jdMapping || []).slice(0, 3).map(item => `
        <div>
          <span class="tag ${relevanceClass(item.relevance)}">${escapeHtml(item.relevance)}</span>
          <p><strong>${escapeHtml(item.requirement)}</strong>${escapeHtml(item.companyEvidence)}</p>
        </div>`).join("") || `<p>公开信息不足，暂不能建立逐项映射。</p>`}
    </div>
    <div class="industry-benchmark">
      <span>行业参照与公司位置</span>
      ${(research.industryBenchmarks || []).slice(0, 3).map(item => `
        <div><strong>${escapeHtml(item.topic)}</strong><p>${escapeHtml(item.benchmark)}</p><small>${escapeHtml(item.companyComparison)}</small></div>
      `).join("") || `<p>暂未找到可用的行业参照资料。</p>`}
    </div>
    <div class="serenity-chokepoints">
      <span>关键业务卡点</span>
      ${(research.criticalChokepoints || []).slice(0, 3).map(item => `
        <div>
          <span class="tag ${item.verificationStatus === "已验证" ? "green" : item.verificationStatus === "部分验证" ? "amber" : "gray"}">${escapeHtml(item.verificationStatus)}</span>
          <p><strong>${escapeHtml(item.node)}</strong>${escapeHtml(item.whyCritical)}</p>
          <small>${escapeHtml(item.companyExposure)}</small>
        </div>`).join("") || `<p>关键卡点尚未验证。</p>`}
    </div>
    <div class="research-fit-grid">
      <div><span>HR 应理解的业务背景</span>${(research.hrInsights || research.fitReasons || []).slice(0, 3).map(item => `<p>+ ${escapeHtml(item)}</p>`).join("")}</div>
      <div><span>公开信息仍未证明</span>${(research.gaps || []).slice(0, 3).map(item => `<p>· ${escapeHtml(item)}</p>`).join("")}</div>
    </div>
    <details class="research-evidence">
      <summary>查看研究地图、验证门与技术证据</summary>
      <p><strong>需求驱动：</strong>${escapeHtml(research.researchMap?.demandDriver || "待研究")}</p>
      <p><strong>价值链路径：</strong>${escapeHtml((research.researchMap?.valueChainPath || []).join(" → ") || "待研究")}</p>
      ${(research.verificationGates || []).map(item => `<p><strong>${escapeHtml(item.judgment)}｜${escapeHtml(item.question)}</strong>${escapeHtml(item.evidence)}</p>`).join("")}
      ${(research.narrativeChecks || []).map(item => `<p><strong>叙事核验｜${escapeHtml(item.claim)}</strong>${escapeHtml(item.correction)}</p>`).join("")}
      <p><strong>客户 / 下游应用：</strong>${escapeHtml((research.customerMarkets || []).join("、") || "公开信息不足")}</p>
      ${(research.technologyEvidence || []).slice(0, 5).map(item => `<p><strong>${escapeHtml(item.technology)}：</strong>${escapeHtml(item.evidence)}</p>`).join("")}
    </details>
    <div class="research-sources">
      <span>证据置信度 ${escapeHtml(research.sourceAssessment?.confidence || "低")} · ${research.researchedAt ? new Date(research.researchedAt).toLocaleDateString("zh-CN") : "刚刚"}</span>
      <div>${(research.sources || []).map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(source.evidenceLevel || "公开网页")}">${escapeHtml(source.sourceCategory || source.evidenceLevel || "公开来源")} · ${escapeHtml(source.title || source.domain)}</a>`).join("") || `<em>未找到可引用来源</em>`}</div>
    </div>
    <p class="research-disclaimer">企业背景适配只说明候选人可能接触过相近环境，不代表其本人掌握对应技术。</p>`;
}

function ensureJobKnowledgePack(job) {
  if (job.knowledgePackId && knowledgePacks[job.knowledgePackId]) {
    const pack = knowledgePacks[job.knowledgePackId];
    if (!Array.isArray(pack.companyProfiles)) pack.companyProfiles = [];
    return pack;
  }
  const id = `job-pack-${job.id}`;
  knowledgePacks[id] = knowledgePacks[id] || {
    id,
    name: `${job.title}研究知识包`,
    industry: job.industry || "自定义行业",
    description: "由岗位校准、候选人复核和企业公开信息研究持续沉淀。",
    terms: (job.model || []).slice(0, 5).map(item => [item[0], item[1] || "岗位核心能力"]),
    positiveRules: ["仅在任务、技术、复杂度、阶段和责任边界具备可比证据时判断迁移成立"],
    riskRules: ["企业产品技术背景相关，不等于候选人本人具备对应能力"],
    questions: ["候选人在该产品或技术平台中具体负责什么？"],
    companyProfiles: []
  };
  job.knowledgePackId = id;
  return knowledgePacks[id];
}

function archiveCompanyResearch(candidate, job) {
  const research = candidate.companyResearch;
  if (!research || research.status !== "researched") return false;
  const pack = ensureJobKnowledgePack(job);
  const profile = {
    company: research.company || candidate.company,
    role: candidate.role,
    summary: research.summary,
    researchFocus: research.researchFocus || {},
    operatingStructure: research.operatingStructure || [],
    resolvedEntities: research.resolvedEntities || [],
    industryPosition: research.industryPosition,
    valueChainRole: research.valueChainRole,
    businessModel: research.businessModel,
    customerMarkets: research.customerMarkets || [],
    operatingStage: research.operatingStage,
    products: research.products || [],
    technologies: research.technologies || [],
    technologyEvidence: research.technologyEvidence || [],
    industryBenchmarks: research.industryBenchmarks || [],
    researchMap: research.researchMap || {},
    criticalChokepoints: research.criticalChokepoints || [],
    verificationGates: research.verificationGates || [],
    narrativeChecks: research.narrativeChecks || [],
    sourceAssessment: research.sourceAssessment || {},
    fit: research.fit,
    fitReasons: research.fitReasons || [],
    jdMapping: research.jdMapping || [],
    hrInsights: research.hrInsights || [],
    gaps: research.gaps || [],
    sources: research.sources || [],
    researchedAt: research.researchedAt
  };
  const existingIndex = pack.companyProfiles.findIndex(item => item.company === profile.company);
  if (existingIndex >= 0) pack.companyProfiles[existingIndex] = profile;
  else pack.companyProfiles.unshift(profile);
  pack.companyProfiles = pack.companyProfiles.slice(0, 30);
  return true;
}

async function ensureCompanyResearch(candidate, force = false) {
  if (!candidate || (!force && (candidate.companyResearch?.status === "loading" || candidate.companyResearch?.skill === "industry-research-v6"))) return;
  const job = currentJob();
  candidate.companyResearch = { status: "loading" };
  renderCandidateDetail(candidate.id);
  try {
    candidate.companyResearch = await apiRequest("/api/research-company", {
      company: candidate.company,
      role: candidate.role,
      job: analysisJobPayload(job)
    });
  } catch (error) {
    candidate.companyResearch = { status: "error", summary: error.message };
  }
  const archived = archiveCompanyResearch(candidate, job);
  saveState();
  if (state.currentJob === job.id && state.selectedCandidate === candidate.id) renderCandidateDetail(candidate.id);
  if (archived) toast("企业研究已加入岗位知识库", `${candidate.company}的产品与技术情报已沉淀`);
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
  const companyContext = companyContextFor(c);
  const capabilityPoints = hrCapabilityPoints(c);
  const transferBoundary = transferBoundaryFor(c);
  const confidence = c.transferConfidence || (c.group === "priority" ? "中" : "低");
  const record = candidateRecord(c.id);
  main.innerHTML = `
    <section class="page">
      ${stepHeader(4, "候选人复核")}
      <div class="page-body">
        <div class="candidate-action-bar">
          <div><span>正在复核</span><strong>${c.name} · ${c.role}</strong></div>
          <div>
            <button class="btn danger small" data-action="delete-candidate">删除</button>
            <button class="btn secondary small resume-entry" data-action="view-resume">查看原始简历</button>
            <button class="btn secondary small" data-action="export-candidate">导出报告</button>
            <button class="btn primary small" data-action="next-candidate">下一位 →</button>
          </div>
        </div>
        <div class="decision-page-grid">
          <div class="stack">
            <div class="card decision-hero">
              <div class="card-body">
                <div class="candidate-hero">
                  <div class="candidate-profile">
                    <span class="person-avatar">${c.name.slice(-1)}</span>
                    <div><h2>${c.name} ${c.recovered ? `<span class="tag cyan">AI 新找回</span>` : ""}</h2><p>${c.role} · ${c.company}</p></div>
                  </div>
                  <div class="decision-verdict"><span class="tag ${verdictClass}">${c.verdict}</span><small>迁移置信度 ${confidence}</small></div>
                </div>
                <h3>${c.core}</h3>
                <p>${c.recovered ? "ATS 未命中 · AI 发现可迁移能力" : "直接相关候选人 · 请核实职责深度"}</p>
              </div>
            </div>

            <div class="card">
              <div class="card-head"><div><h2>联系前重点判断</h2><p>三个最影响决策的能力点</p></div></div>
              <div class="card-body capability-focus-list">
                ${capabilityPoints.map(item => `
                  <div class="capability-focus">
                    <span class="tag ${comparabilityClass(item.judgment)}">${item.judgment}</span>
                    <div><strong>${item.dimension}：${item.candidateEvidence}</strong><p>${item.reason}</p><small>目标要求：${item.targetRequirement}</small></div>
                  </div>`).join("")}
              </div>
            </div>

            <div class="card company-research-card">
              <div class="card-head"><div><h2>原公司与岗位技术关联</h2><p>公开信息研究结果</p></div></div>
              <div class="card-body">${companyResearchCard(c)}</div>
            </div>
          </div>

          <aside class="stack decision-sidebar">
            <div class="card risk-card">
              <div class="card-head"><div><h3>风险边界</h3><p>不能直接推断的能力</p></div></div>
              <div class="card-body"><ul class="decision-risk-list">${transferBoundary.slice(0, 3).map(item => `<li>${item}</li>`).join("")}</ul></div>
            </div>
            <div class="card">
              <div class="card-head"><div><h3>首轮验证问题</h3><p>面试或电话沟通可直接使用</p></div></div>
              <div class="card-body"><ol class="question-list">${c.questions.slice(0, 3).map(x => `<li>${x}</li>`).join("")}</ol></div>
            </div>
            <div class="card">
              <div class="card-head"><div><h3>1. 提交 HR 决策</h3><p>判断是否值得进入招聘流程</p></div></div>
              <div class="card-body">
                <div class="review-choice-grid">
                  ${REVIEW_DECISIONS.map(value => `<label class="${record.value === value ? "selected" : ""}"><input type="radio" name="reviewDecision" value="${value}" ${record.value === value ? "checked" : ""}><span>${value}</span></label>`).join("")}
                </div>
                <div class="field-label">判断理由（可多选）</div>
                <div class="review-reason-grid">
                  ${REVIEW_REASONS.map(reason => `<label><input type="checkbox" name="reviewReason" value="${reason}" ${record.reasons.includes(reason) ? "checked" : ""}><span>${reason}</span></label>`).join("")}
                </div>
                <textarea class="decision-note" id="decisionNote" placeholder="补充业务判断、风险或建议">${escapeHtml(record.note)}</textarea>
                <button class="btn primary full-width" data-action="save-review-decision">保存 HR 决策</button>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><div><h3>2. 更新招聘进展</h3><p>联系、面试、Offer 或入职</p></div></div>
              <div class="card-body outcome-form">
                <label><span>当前招聘阶段</span><select id="hiringStage">${HIRING_STAGES.map(stage => `<option value="${stage}" ${record.stage === stage ? "selected" : ""}>${stage}</option>`).join("")}</select></label>
                <label><span>跟进备注</span><textarea id="hiringStageNote" placeholder="例如：候选人愿意沟通，周五安排技术面">${escapeHtml(record.stageNote)}</textarea></label>
                <button class="btn secondary full-width" data-action="save-hiring-outcome">更新招聘进展</button>
                ${record.updatedAt ? `<small class="record-updated">最近更新：${new Date(record.updatedAt).toLocaleString("zh-CN")}</small>` : ""}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>`;
  if (!c.companyResearch || (!["loading", "error"].includes(c.companyResearch.status) && c.companyResearch.skill !== "industry-research-v6")) {
    void ensureCompanyResearch(c);
  }
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
      <div class="privacy-mode ${state.privacyMode ? "active" : ""}">
        <div class="privacy-mode-copy">
          <span class="privacy-shield">隐私</span>
          <div><strong>隐私模式${state.privacyMode ? "已开启" : "已关闭"}</strong><p>${state.privacyMode ? "本地解析并脱敏个人身份信息；任职企业、岗位和技术经历会保留。" : "原始文件将上传至服务器解析，并发送简历文本给 AI。"}</p></div>
        </div>
        <button class="privacy-switch ${state.privacyMode ? "on" : ""}" data-action="toggle-privacy" role="switch" aria-checked="${state.privacyMode}"><i></i></button>
      </div>
      <input type="file" id="resumeFileInput" accept=".pdf,.docx,.txt,.md" multiple hidden>
      <div class="import-drop upload-zone" id="uploadZone">
        <div>
          <div class="upload-icon">⇧</div>
          <h3>拖拽简历到这里</h3>
          <p>支持 PDF、DOCX、TXT、Markdown，单份不超过 8MB，最多 10 份</p>
          <button class="btn secondary" data-action="choose-files">选择本地文件</button>
        </div>
      </div>
      <div class="upload-file-list" id="uploadFileList">${renderUploadFiles()}</div>`;
    importConfirm.textContent = state.uploadFiles.length ? `分析 ${state.uploadFiles.length} 份简历` : "开始解析";
    importConfirm.disabled = !state.uploadFiles.length;
  } else {
    importContent.innerHTML = `
      <div class="privacy-mode ${state.privacyMode ? "active" : ""}">
        <div class="privacy-mode-copy">
          <span class="privacy-shield">隐私</span>
          <div><strong>隐私模式${state.privacyMode ? "已开启" : "已关闭"}</strong><p>${state.privacyMode ? "个人身份信息会脱敏；任职企业、岗位和技术经历会保留。" : "粘贴内容将直接发送给 AI。"}</p></div>
        </div>
        <button class="privacy-switch ${state.privacyMode ? "on" : ""}" data-action="toggle-privacy" role="switch" aria-checked="${state.privacyMode}"><i></i></button>
      </div>
      <textarea class="paste-area" id="pasteResume" placeholder="粘贴候选人的工作经历、项目经历或完整简历文本……"></textarea>
      <p class="tiny">脱敏姓名、手机、邮箱、证件号和详细地址；保留企业、岗位、部门、项目及产品技术名称。</p>`;
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

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error(`无法读取 ${file.name}`));
    reader.readAsText(file, "utf-8");
  });
}

async function parsePdfLocally(file) {
  const pdfjs = await import("./vendor/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = "./vendor/pdf.worker.mjs";
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map(item => item.str).join(" "));
  }
  return pages.join("\n\n");
}

async function parseDocxLocally(file) {
  if (!window.mammoth) throw new Error("DOCX 本地解析组件未加载");
  const result = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return result.value || "";
}

async function parseResumeLocally(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (extension === "pdf") return parsePdfLocally(file);
  if (extension === "docx") return parseDocxLocally(file);
  return readFileAsText(file);
}

function extractLocalIdentity(text, fileName = "") {
  const labelled = text.match(/(?:姓名|Name)\s*[:：]\s*([\u4e00-\u9fa5]{2,4}|[A-Za-z][A-Za-z .'-]{1,40})/i);
  const firstLine = text.split(/\r?\n/).map(line => line.trim()).find(Boolean) || "";
  const firstLineName = firstLine.match(/^([\u4e00-\u9fa5]{2,4})$/)?.[1];
  const fileNameCandidate = fileName.replace(/\.[^.]+$/, "").replace(/(?:简历|resume|cv|候选人|最新版|最终版)/gi, "").replace(/[_\-\s]+/g, "").trim();
  return labelled?.[1]?.trim() || firstLineName || (/^[\u4e00-\u9fa5]{2,4}$/.test(fileNameCandidate) ? fileNameCandidate : "");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isEnterpriseNameOccurrence(text, offset, identity) {
  const before = text.slice(Math.max(0, offset - 16), offset);
  const after = text.slice(offset + identity.length, offset + identity.length + 24);
  const organizationSuffix = /^(?:科技|技术|电子|半导体|微电子|软件|网络|信息|智能|制造|实业|工业|材料|装备|咨询|集团|公司|企业|研究院|实验室|银行|证券|基金|医院|大学|学院|中心|事务所)/;
  const organizationContext = /(?:公司|企业|雇主|任职单位|工作单位|单位)\s*[:：]?\s*$/;
  return organizationSuffix.test(after) || organizationContext.test(before);
}

function redactResume(text, identity = "") {
  let redacted = String(text || "");
  const replacements = [
    ["邮箱", /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[邮箱已脱敏]"],
    ["手机号", /(?<!\d)(?:\+?86[-\s]?)?1[3-9]\d{9}(?!\d)/g, "[手机号已脱敏]"],
    ["电话", /(?<!\d)(?:0\d{2,3}[-\s]?)?\d{7,8}(?!\d)/g, "[电话已脱敏]"],
    ["身份证号", /(?<!\d)\d{17}[\dXx](?!\d)/g, "[身份证号已脱敏]"],
    ["微信号", /((?:微信|WeChat|wechat)\s*(?:号|ID)?\s*[:：]\s*)[A-Za-z][-_A-Za-z0-9]{5,19}/gi, "$1[微信号已脱敏]"],
    ["QQ", /(QQ\s*(?:号|ID)?\s*[:：]?\s*)[1-9]\d{4,11}/gi, "$1[QQ已脱敏]"],
    ["地址", /((?:现居地|居住地|通讯地址|家庭地址|联系地址|地址)\s*[:：]\s*)[^\n\r]{4,80}/gi, "$1[地址已脱敏]"],
    ["出生日期", /((?:出生日期|出生年月|生日)\s*[:：]\s*)[^\n\r]{4,20}/gi, "$1[出生日期已脱敏]"],
    ["年龄", /((?:年龄)\s*[:：]\s*)\d{1,3}\s*岁?/gi, "$1[年龄已脱敏]"],
    ["性别", /((?:性别)\s*[:：]\s*)[男女]/gi, "$1[性别已脱敏]"],
    ["姓名", /((?:姓名|Name)\s*[:：]\s*)([\u4e00-\u9fa5]{2,4}|[A-Za-z][A-Za-z .'-]{1,40})/gi, "$1[姓名已脱敏]"]
  ];
  const counts = {};
  replacements.forEach(([label, pattern, replacement]) => {
    let count = 0;
    redacted = redacted.replace(pattern, (...args) => {
      count += 1;
      return typeof replacement === "function" ? replacement(...args) : replacement.replace(/\$(\d)/g, (_, index) => args[Number(index)] || "");
    });
    if (count) counts[label] = count;
  });
  if (identity && identity.length >= 2) {
    const identityPattern = new RegExp(escapeRegExp(identity), /[A-Za-z]/.test(identity) ? "gi" : "g");
    let identityCount = 0;
    redacted = redacted.replace(identityPattern, (match, offset, source) => {
      if (isEnterpriseNameOccurrence(source, offset, match)) return match;
      identityCount += 1;
      return "[姓名已脱敏]";
    });
    if (identityCount) counts["姓名"] = (counts["姓名"] || 0) + identityCount;
  }
  const lines = redacted.split(/\r?\n/);
  const firstContentIndex = lines.findIndex(line => line.trim());
  if (firstContentIndex >= 0 && /^[\u4e00-\u9fa5]{2,4}$/.test(lines[firstContentIndex].trim())) {
    lines[firstContentIndex] = "[姓名已脱敏]";
    counts["姓名"] = (counts["姓名"] || 0) + 1;
    redacted = lines.join("\n");
  }
  return { text: redacted, counts };
}

function privacySummary(counts) {
  const labels = Object.entries(counts).map(([label, count]) => `${label}${count}处`);
  return labels.length ? labels.join("、") : "未识别到常见敏感字段";
}

function analysisJobPayload(job) {
  return {
    title: job.title,
    industry: job.industry,
    summary: job.summary,
    jdText: job.jdText || "",
    businessContext: job.businessContext || "",
    note: job.note || "",
    userContext: userAnalysisContext(),
    model: job.model,
    adjacent: job.adjacent,
    knowledgePack: buildKnowledgeContext(job)
  };
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

async function originalResumeFor(candidate) {
  if (candidate.rawResume?.trim()) return candidate.rawResume.trim();
  if (candidate.custom) {
    const stored = await readPrivateResume(candidate.id);
    if (stored?.trim()) return stored.trim();
  }
  return buildSampleResume(candidate);
}

async function openOriginalResume() {
  const candidate = currentJob().candidates.find(item => item.id === state.selectedCandidate);
  if (!candidate) return;
  resumeModalTitle.textContent = `${candidate.name}的原始简历`;
  resumeModalMeta.textContent = `${candidate.role} · ${candidate.company}${candidate.sourceFile ? ` · 来源文件：${candidate.sourceFile}` : " · 示例候选人材料"}${candidate.privacyProtected ? " · 原文仅存当前浏览器" : ""}`;
  resumeOriginalText.textContent = "正在从本地浏览器读取原始简历…";
  resumeModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  try {
    resumeOriginalText.textContent = await originalResumeFor(candidate);
  } catch {
    resumeOriginalText.textContent = "无法读取本地原始简历。浏览器数据可能已被清理。";
  }
}

function closeOriginalResume() {
  resumeModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function deleteCandidate(candidateId, returnToImport = false) {
  const job = currentJob();
  const candidate = job.candidates.find(item => item.id === candidateId);
  if (!candidate) return;

  job.candidates = job.candidates.filter(item => item.id !== candidate.id);
  const recordKey = `${job.id}:${candidate.id}`;
  delete state.decisions[recordKey];
  delete state.evaluations[recordKey];
  delete state.sourcingInsights[job.id];
  if (!candidate.custom) {
    const deleted = new Set(state.deletedCandidates[job.id] || []);
    deleted.add(candidate.id);
    state.deletedCandidates[job.id] = [...deleted];
  }
  if (state.selectedCandidate === candidate.id) state.selectedCandidate = null;
  if (!job.candidates.length) state.imported[job.id] = false;
  void deletePrivateResume(candidate.id);
  saveState();
  if (returnToImport || !job.candidates.length) renderImportStep();
  else renderQueue();
  toast("候选人已删除", `${candidate.name}已从当前岗位复核队列移除`);
}

function deleteSelectedCandidate() {
  deleteCandidate(state.selectedCandidate);
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
      let successCount = 0;
      const failures = [];
      const privacyDetails = [];
      if (state.privacyMode) {
        for (let index = 0; index < state.uploadFiles.length; index += 1) {
          const file = state.uploadFiles[index];
          importConfirm.textContent = `本地解析 ${index + 1}/${state.uploadFiles.length}`;
          try {
            const rawResume = (await parseResumeLocally(file)).trim();
            if (!rawResume) throw new Error("未提取到可分析的文本");
            const identity = extractLocalIdentity(rawResume, file.name);
            const redacted = redactResume(rawResume, identity);
            importConfirm.textContent = `发送脱敏文本 ${index + 1}/${state.uploadFiles.length}`;
            const data = await apiRequest("/api/analyze-resume", {
              resume: redacted.text,
              job: analysisJobPayload(job)
            });
            const candidateId = `upload-${Date.now()}-${index}`;
            const candidate = {
              ...data.result,
              name: identity || data.result.name,
              id: candidateId,
              custom: true,
              sourceFile: file.name,
              privacyProtected: true,
              privacySummary: privacySummary(redacted.counts)
            };
            await storePrivateResume(candidateId, rawResume);
            job.candidates.unshift(candidate);
            successCount += 1;
            privacyDetails.push(candidate.privacySummary);
          } catch (error) {
            failures.push({ name: file.name, error: error.message });
          }
        }
      } else {
        const files = await Promise.all(state.uploadFiles.map(async file => ({
          name: file.name,
          type: file.type,
          data: await fileToBase64(file)
        })));
        importConfirm.textContent = "AI 正在逐份分析";
        const data = await apiRequest("/api/upload-resumes", {
          files,
          job: analysisJobPayload(job)
        });
        for (let index = 0; index < data.results.length; index += 1) {
          const item = data.results[index];
          if (item.status !== "success") {
            failures.push(item);
            continue;
          }
          const candidateId = `upload-${Date.now()}-${index}`;
          job.candidates.unshift({
            ...item.result,
            id: candidateId,
            custom: true,
            sourceFile: item.name
          });
          await storePrivateResume(candidateId, item.resume);
          successCount += 1;
        }
      }
      state.imported[job.id] = successCount > 0 || state.imported[job.id];
      saveState();
      state.uploadFiles = [];
      closeModal();
      renderImportStep();
      toast(
        `成功分析 ${successCount} 份简历`,
        failures.length
          ? `${failures.length} 份失败：${failures[0].name}（${failures[0].error}）`
          : state.privacyMode
            ? `原始文件未上传；已自动处理${privacyDetails[0] || "敏感字段"}`
            : "候选人已加入当前岗位复核队列"
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
    const identity = extractLocalIdentity(text);
    const redacted = state.privacyMode ? redactResume(text, identity) : { text, counts: {} };
    const candidateId = `custom-${Date.now()}`;
    try {
      const data = await apiRequest("/api/analyze-resume", {
        resume: redacted.text,
        job: analysisJobPayload(job)
      });
      job.candidates.unshift({
        ...data.result,
        name: identity || data.result.name,
        id: candidateId,
        custom: true,
        sourceFile: "粘贴文本",
        privacyProtected: state.privacyMode,
        privacySummary: state.privacyMode ? privacySummary(redacted.counts) : ""
      });
      await storePrivateResume(candidateId, text);
      toast(
        data.mode !== "demo" ? "真实 AI 分析完成" : "演示分析完成",
        state.privacyMode
          ? `仅发送脱敏文本；${privacySummary(redacted.counts)}`
          : data.mode !== "demo" ? `模型：${data.model}` : "配置 AI 服务密钥后可切换到真实模型"
      );
    } catch (error) {
      const candidate = buildCandidateFromText(text, job);
      candidate.id = candidateId;
      candidate.privacyProtected = state.privacyMode;
      candidate.privacySummary = state.privacyMode ? privacySummary(redacted.counts) : "";
      delete candidate.rawResume;
      job.candidates.unshift(candidate);
      await storePrivateResume(candidateId, text);
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
  const hasOwnership = /主导|独立|负责[^。\n]{0,20}(?:平台|模块|工艺|产品|项目|客户|区域)/.test(text);
  const hasDeliveryStage = /量产|交付|上线|签约|回款|续约/.test(text);
  const specificEvidence = job.id === "chip"
    ? [...new Set(text.match(/2\.5D|CoWoS|中介层|微凸点|互连|翘曲|良率|可靠性|键合/gi) || [])].length
    : job.id === "sales"
      ? [...new Set(text.match(/大客户|解决方案|决策链|签约|回款|续约|商机|售前/gi) || [])].length
      : facts.length;
  const hasComparableEvidence = hasTransferEvidence && hasOwnership && hasDeliveryStage && specificEvidence >= 2;
  const group = hasDirectKeyword ? "priority" : hasComparableEvidence ? "review" : "unknown";
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
    recovered: !hasDirectKeyword && hasComparableEvidence,
    coverage: hasComparableEvidence ? coverage : Math.min(coverage, 49),
    core: inferredFacts.slice(0, 3).join("、"),
    gap: "经历范围、责任边界与结果证据待确认",
    quote: text.slice(0, 160).replace(/\s+/g, " "),
    facts: inferredFacts,
    companyContext: {
      companyType: "简历未说明",
      products: ["产品或服务形态待确认"],
      technologyPlatform: facts.length ? facts : ["技术平台待确认"],
      productionStage: /量产|交付|上线/.test(text) ? "简历提及量产或交付" : "研发、试产或量产阶段待确认",
      evidenceNote: "本地兜底分析不根据公司名称推测业务与技术背景"
    },
    comparability: [
      { dimension: "任务对象", candidateEvidence: inferredFacts[0] || "未说明", targetRequirement: job.model[0]?.[0] || "目标核心任务", judgment: hasTransferEvidence ? "部分可比" : "未证实", reason: "仅有相邻任务线索，具体对象与约束待确认" },
      { dimension: "技术机理", candidateEvidence: inferredFacts[1] || "未说明", targetRequirement: job.model[1]?.[0] || "目标技术平台", judgment: hasDirectKeyword ? "可比" : "未证实", reason: hasDirectKeyword ? "存在直接技术关键词" : "缺少技术机理层证据" },
      { dimension: "问题复杂度", candidateEvidence: /主导|复杂|良率|失效|千万/.test(text) ? "存在复杂问题线索" : "未说明", targetRequirement: "目标岗位问题复杂度", judgment: "未证实", reason: "问题规模、约束条件和结果待确认" },
      { dimension: "量产阶段", candidateEvidence: /量产|交付|上线/.test(text) ? "提及量产或交付" : "未说明", targetRequirement: "目标岗位交付阶段", judgment: /量产|交付|上线/.test(text) ? "部分可比" : "未证实", reason: "规模和成熟度待确认" },
      { dimension: "个人责任", candidateEvidence: /主导|独立/.test(text) ? "有主导或独立表述" : "责任边界未说明", targetRequirement: "独立负责关键结果", judgment: /主导|独立/.test(text) ? "部分可比" : "未证实", reason: "需确认个人决策权与结果责任" }
    ],
    transferable: hasDirectKeyword ? ["直接技术或业务经验有待进一步核实"] : hasTransferEvidence ? ["仅识别到相邻任务中的问题分析方法线索"] : ["经历信息待补充"],
    transferBoundary: ["公司产品与技术平台未明确时，不外推为直接相关经验", "个人责任和项目阶段未证明时，不外推为独立交付能力"],
    transferConfidence: hasDirectKeyword ? "中" : hasComparableEvidence ? "中" : "低",
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
  const headers = ["候选人", "当前职位", "公司", "AI建议", "ATS结果", "AI新找回", "能力覆盖", "核心关联", "关键缺口", "HR复核决策", "判断理由", "招聘进展", "跟进备注"];
  const rows = job.candidates.map(candidate => {
    const record = candidateRecord(candidate.id, job.id);
    return [
      candidate.name,
      candidate.role,
      candidate.company,
      candidate.verdict,
      candidate.ats ? "关键词命中" : "未命中",
      candidate.recovered ? "是" : "否",
      `${candidate.coverage}%`,
      candidate.core,
      candidate.gap,
      record.value,
      record.reasons,
      record.stage,
      record.stageNote
    ];
  });
  const csv = [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n");
  downloadFile(`${safeFileName(job.title)}-候选人复核队列.csv`, csv, "text/csv;charset=utf-8");
}

function candidateReportMarkdown(candidate) {
  const job = currentJob();
  const decision = candidateRecord(candidate.id, job.id);
  const companyContext = companyContextFor(candidate);
  const companyResearch = candidate.companyResearch;
  const comparability = comparabilityFor(candidate);
  const transferBoundary = transferBoundaryFor(candidate);
  return `# ${candidate.name}｜能力迁移分析

## 分析对象

- 目标岗位：${job.title}
- HR 对业务的理解：${job.businessContext || "未补充"}
- 候选人当前经历：${candidate.role}
- 公司：${candidate.company}
- 系统建议：${candidate.verdict}
- ATS 结果：${candidate.ats ? "关键词命中" : "未命中"}
- AI 新找回：${candidate.recovered ? "是" : "否"}
- 能力证据覆盖：${candidate.coverage}%
- 迁移判断置信度：${candidate.transferConfidence || "低"}

## 结论

${candidate.core}

关键缺口：${candidate.gap}

## 简历事实

${candidate.facts.map(item => `- ${item}`).join("\n")}

原文证据：

> ${candidate.quote}

## 原公司产品与技术背景

- 公司 / 业务类型：${companyContext.companyType}
- 产品或服务形态：${companyContext.products.join("、")}
- 技术 / 业务平台：${companyContext.technologyPlatform.join("、")}
- 所处阶段：${companyContext.productionStage}
- 证据说明：${companyContext.evidenceNote}

## 原司公开信息联网研究

${companyResearch?.status === "researched" ? `- 与目标 JD 的背景适配：${companyResearch.fit}
- 研究结论：${companyResearch.summary}
- 重点研究主体：${companyResearch.researchFocus?.primaryEntity || companyResearch.company || candidate.company}
- 选择理由：${companyResearch.researchFocus?.whyPrimary || "按简历所列企业研究"}
- 候选人与该主体的雇佣关系：${companyResearch.researchFocus?.employmentLink || "未确认"}
- 集团与业务主体关系：${(companyResearch.operatingStructure || []).map(entity => `${entity.name}（${entity.type} / ${entity.priority}：${entity.businessRole}）`).join("；") || "待核验"}
- 研究覆盖主体：${(companyResearch.resolvedEntities || []).map(entity => `${entity.name}（${entity.relationship}：${entity.businessRole}）`).join("；") || candidate.company}
- 主要产品 / 业务：${(companyResearch.products || []).join("、") || "公开信息不足"}
- 主要技术方向：${(companyResearch.technologies || []).join("、") || "公开信息不足"}
- 产业定位：${companyResearch.industryPosition || "公开信息不足"}
- 产业链位置：${companyResearch.valueChainRole || "公开信息不足"}
- 业务模式：${companyResearch.businessModel || "公开信息不足"}
- 客户 / 下游应用：${(companyResearch.customerMarkets || []).join("、") || "公开信息不足"}
- 业务 / 制造阶段：${companyResearch.operatingStage || "公开信息不足"}
- 来源交叉验证置信度：${companyResearch.sourceAssessment?.confidence || "低"}

企业背景与 JD 逐项映射：
${(companyResearch.jdMapping || []).map(item => `- ${item.requirement}｜${item.relevance}｜${item.companyEvidence}｜${item.reason}`).join("\n") || "- 暂无充分公开证据"}

行业参照与公司位置：
${(companyResearch.industryBenchmarks || []).map(item => `- ${item.topic}｜行业基准：${item.benchmark}｜公司位置：${item.companyComparison}`).join("\n") || "- 暂无行业参照"}

研究地图与关键卡点：
- 需求驱动：${companyResearch.researchMap?.demandDriver || "待研究"}
- 价值链路径：${(companyResearch.researchMap?.valueChainPath || []).join(" → ") || "待研究"}
${(companyResearch.criticalChokepoints || []).map(item => `- ${item.node}｜${item.verificationStatus}｜${item.companyExposure}`).join("\n") || "- 暂无已验证卡点"}

可能相关：
${(companyResearch.fitReasons || []).map(item => `- ${item}`).join("\n") || "- 暂无充分公开证据"}

仍需验证：
${(companyResearch.gaps || []).map(item => `- ${item}`).join("\n") || "- 暂无"}

公开来源：
${(companyResearch.sources || []).map(source => `- [${source.title || source.domain}](${source.url})（${source.evidenceLevel || "公开网页"}）`).join("\n") || "- 未找到可引用来源"}

> 企业背景适配只说明候选人可能接触过相近环境，不代表候选人本人掌握对应技术。` : companyResearch?.status === "insufficient" ? `${companyResearch.summary}

${(companyResearch.sources || []).map(source => `- [${source.title || source.domain}](${source.url})`).join("\n") || "- 未找到可引用来源"}` : "尚未完成联网研究。"}

## 迁移可比条件

| 维度 | 候选人证据 | 目标岗位要求 | 判断 | 理由 |
| --- | --- | --- | --- | --- |
${comparability.map(item => `| ${item.dimension} | ${item.candidateEvidence} | ${item.targetRequirement} | ${item.judgment} | ${item.reason} |`).join("\n")}

## 有证据支持的可迁移能力

${candidate.transferable.map(item => `- ${item}`).join("\n")}

## 不可直接外推

${transferBoundary.map(item => `- ${item}`).join("\n")}

## 目标岗位关联

${candidate.target.map(item => `- ${item}`).join("\n")}

## 待人工验证

${candidate.verify.map(item => `- ${item}`).join("\n")}

## 建议追问

${candidate.questions.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## HR 判断

${`- 复核结论：${decision.value || "尚未提交"}
- 判断理由：${decision.reasons.join("、") || "未填写"}
- 补充说明：${decision.note || "无"}
- 招聘进展：${decision.stage}
- 跟进备注：${decision.stageNote || "无"}`}

---

本报告由 TalentBridge 辅助生成，仅用于招聘人员复核，不构成自动淘汰或录用决定。
`;
}

function evaluationExportData() {
  const job = currentJob();
  const metrics = getEvaluationMetrics(job);
  const business = getBusinessMetrics(job);
  return {
    generatedAt: new Date().toISOString(),
    job: { id: job.id, title: job.title, industry: job.industry, businessContext: job.businessContext || "" },
    methodology: {
      note: "召回率和精确率仅使用已完成人工标注的候选人计算；招聘漏斗来自 HR 实际回填"
    },
    metrics: {
      totalCandidates: job.candidates.length,
      evaluatedCandidates: metrics.evaluated.length,
      relevantCandidates: metrics.relevant.length,
      atsRecall: metrics.atsRecall,
      aiRecall: metrics.aiRecall,
      atsPrecision: metrics.atsPrecision,
      aiPrecision: metrics.aiPrecision,
      aiRecovered: metrics.recovered.length,
      reviewedCandidates: business.reviewed.length,
      recommendedCandidates: business.recommended.length,
      contactedCandidates: business.contacted.length,
      interviewedCandidates: business.interviewed.length,
      offerCandidates: business.offers.length,
      hiredCandidates: business.hired.length,
      recoveredRecommended: business.recoveredRecommended.length,
      recoveredInterviewed: business.recoveredInterviewed.length
    },
    sourcingFeedback: state.sourcingInsights[job.id]?.result || null,
    candidates: job.candidates.map(candidate => {
      const record = candidateRecord(candidate.id, job.id);
      return {
        name: candidate.name,
        role: candidate.role,
        company: candidate.company,
        atsMatched: candidate.ats,
        aiVerdict: candidate.verdict,
        aiRecovered: candidate.recovered,
        evidenceCoverage: candidate.coverage,
        humanLabel: evaluationFor(candidate, job.id),
        reviewDecision: record.value,
        reviewReasons: record.reasons,
        reviewNote: record.note,
        hiringStage: record.stage,
        hiringStageNote: record.stageNote,
        updatedAt: record.updatedAt,
        core: candidate.core,
        gap: candidate.gap
      };
    })
  };
}

function exportEvaluationCsv() {
  const data = evaluationExportData();
  const headers = ["候选人", "当前职位", "公司", "ATS命中", "AI建议", "AI新找回", "证据覆盖", "人工标准答案", "HR复核决策", "判断理由", "招聘进展", "跟进备注", "核心关联", "关键缺口"];
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
    candidate.reviewDecision,
    candidate.reviewReasons,
    candidate.hiringStage,
    candidate.hiringStageNote,
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
    ["AI 增量找回", data.metrics.aiRecovered],
    ["HR 已推荐联系", data.metrics.recommendedCandidates],
    ["已进入面试", data.metrics.interviewedCandidates],
    ["AI 增量找回且进入面试", data.metrics.recoveredInterviewed]
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
  const adjacentRows = [...document.querySelectorAll("#calibrationAdjacentList .adjacent-edit-item")];
  if (adjacentRows.length) {
    job.adjacent = adjacentRows
      .map(row => row.querySelector("[contenteditable='true']")?.textContent.trim())
      .filter(Boolean);
  }
  saveState();
}

function saveJobUnderstandingFromPage() {
  const job = currentJob();
  const summary = document.getElementById("jobUnderstandingSummary")?.value.trim();
  const rows = [...document.querySelectorAll("#jobUnderstandingModelList .model-item")];
  const adjacentRows = [...document.querySelectorAll("#jobUnderstandingAdjacentList .adjacent-edit-item")];
  if (!rows.length) {
    toast("请至少保留一项关键能力");
    return;
  }
  if (summary) job.summary = summary;
  job.model = rows.map(row => {
    const texts = row.querySelectorAll("[contenteditable='true']");
    return [
      texts[0]?.textContent.trim() || "未命名能力",
      texts[1]?.textContent.trim() || "待补充说明",
      row.querySelector("select")?.value || "重要"
    ];
  });
  job.adjacent = adjacentRows
    .map(row => row.querySelector("[contenteditable='true']")?.textContent.trim())
    .filter(Boolean);
  saveState();
  renderRequirement();
  toast("岗位理解已保存", "能力数量、必须项和相邻经历已更新");
}

function enterJdEditMode() {
  const job = currentJob();
  const box = document.querySelector(".jd-box");
  if (!box) return;
  const fallback = box.innerText.trim();
  box.outerHTML = `
    <div class="job-input-editors">
      <label><span>岗位 JD</span><textarea class="paste-area jd-editor" id="jdEditor">${escapeHtml(job.jdText || fallback)}</textarea></label>
      <label><span>HR 对业务的理解</span><textarea class="paste-area business-context-editor" id="businessContextEditor" placeholder="例如：我们要做的是面向图像模型的 GPU 加速架构。">${escapeHtml(job.businessContext || "")}</textarea><small>可以使用业务口语、碎片信息或尚未完全确定的方向。</small></label>
    </div>`;
  document.querySelector(".business-context-box")?.remove();
  const actions = document.querySelector(".job-input-editors")?.nextElementSibling;
  if (actions) {
    actions.innerHTML = `<button class="btn secondary" data-action="cancel-jd-edit">取消</button><button class="btn primary" data-action="save-jd">保存并重新解析</button>`;
  }
}

async function saveEditedJd() {
  const text = document.getElementById("jdEditor")?.value.trim();
  const businessContext = document.getElementById("businessContextEditor")?.value.trim() || "";
  if (!text) {
    toast("JD 不能为空");
    return;
  }
  const job = currentJob();
  job.jdText = text;
  job.businessContext = businessContext;
  job.jd = formatJd(text, job.note || "");
  try {
    const data = await apiRequest("/api/analyze-job", {
      title: job.title,
      industry: job.industry,
      jd: text,
      businessContext,
      note: job.note || "",
      userContext: userAnalysisContext()
    });
    job.summary = data.result.summary;
    job.model = data.result.capabilities.map(item => [item.name, item.description, item.priority]);
    job.adjacent = data.result.adjacent;
  } catch {
    const clauses = `${businessContext}\n${text}`.split(/[\n；。]/).map(item => item.trim()).filter(item => item.length >= 6);
    job.summary = clauses[0] || job.summary;
  }
  saveState();
  renderRequirement();
  toast("岗位输入已更新", "AI 分析视角已按 JD 和业务理解刷新");
}

function handleClick(event) {
  const step = event.target.closest("[data-step]");
  if (step) {
    const target = Number(step.dataset.step);
    if (target === 1) renderRequirement();
    if (target === 2) renderCalibration();
    if (target === 3) renderImportStep();
    if (target === 4) renderQueue();
    if (target === 5) renderComparison();
    if (target === 6) renderSourcingStrategy();
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
  if (action === "toggle-account-menu") toggleAccountMenu();
  if (action === "close-account-menu") toggleAccountMenu(false);
  if (action === "save-account-profile") saveAccountProfile();
  if (action === "save-review-decision") {
    const value = document.querySelector('input[name="reviewDecision"]:checked')?.value || "";
    const reasons = [...document.querySelectorAll('input[name="reviewReason"]:checked')].map(input => input.value);
    const note = document.getElementById("decisionNote")?.value.trim() || "";
    if (!value) {
      toast("请选择复核结论", "先判断推荐联系、暂缓、不合适或信息不足");
      return;
    }
    if (!reasons.length) {
      toast("请选择至少一个判断理由", "结构化理由会用于后续效果复盘");
      return;
    }
    const existing = candidateRecord(state.selectedCandidate);
    const stage = value === "推荐联系" && existing.stage === "未跟进" ? "待联系" : existing.stage;
    saveCandidateRecord(state.selectedCandidate, { value, reasons, note, stage });
    state.evaluations[`${state.currentJob}:${state.selectedCandidate}`] = decisionEvaluation(value);
    delete state.sourcingInsights[state.currentJob];
    saveState();
    renderCandidateDetail(state.selectedCandidate);
    toast("复核决策已保存", `${value} · 已纳入效果复盘`);
    if (value === "推荐联系" && SOURCING_POSITIVE_STAGES.includes(stage)) {
      void generateSourcingKeywords({ silent: true });
    }
    return;
  }
  if (action === "save-hiring-outcome") {
    const stage = document.getElementById("hiringStage")?.value || "未跟进";
    const stageNote = document.getElementById("hiringStageNote")?.value.trim() || "";
    delete state.sourcingInsights[state.currentJob];
    saveCandidateRecord(state.selectedCandidate, { stage, stageNote });
    renderCandidateDetail(state.selectedCandidate);
    toast("招聘进展已更新", `${stage} · 转化漏斗已重新计算`);
    const updatedRecord = candidateRecord(state.selectedCandidate);
    if (updatedRecord.value === "推荐联系" && SOURCING_POSITIVE_STAGES.includes(updatedRecord.stage)) {
      void generateSourcingKeywords({ silent: true });
    }
    return;
  }
  if (action === "open-insight-candidate") {
    state.currentJob = actionEl.dataset.jobId;
    state.selectedCandidate = actionEl.dataset.candidateId;
    renderCandidateDetail(state.selectedCandidate);
  }
  if (action === "open-insight-queue") {
    const targetJob = Object.values(jobs).find(job => state.imported[job.id] && job.candidates.some(candidate => !candidateRecord(candidate.id, job.id).value))
      || currentJob();
    state.currentJob = targetJob.id;
    state.filter = "all";
    state.imported[targetJob.id] ? renderQueue() : renderRequirement();
  }
  if (action === "confirm-model") {
    saveModelFromPage();
    openImportModal();
  }
  if (action === "open-import") openImportModal();
  if (action === "close-modal") closeModal();
  if (action === "view-resume") openOriginalResume();
  if (action === "close-resume") closeOriginalResume();
  if (action === "research-company") {
    const candidate = currentJob().candidates.find(item => item.id === state.selectedCandidate);
    if (candidate) void ensureCompanyResearch(candidate, true);
  }
  if (action === "delete-candidate") deleteSelectedCandidate();
  if (action === "delete-imported-candidate") deleteCandidate(actionEl.dataset.candidateId, true);
  if (action === "copy-resume") {
    const candidate = currentJob().candidates.find(item => item.id === state.selectedCandidate);
    if (candidate) {
      originalResumeFor(candidate).then(text => {
        navigator.clipboard?.writeText(text);
        toast("原始简历已复制", "可粘贴到面试记录或协作工具");
      }).catch(() => toast("复制失败", "无法读取本地原始简历"));
    }
  }
  if (action === "toggle-privacy") {
    const pastedText = document.getElementById("pasteResume")?.value || "";
    state.privacyMode = !state.privacyMode;
    saveState();
    renderImportTab();
    const textarea = document.getElementById("pasteResume");
    if (textarea) textarea.value = pastedText;
    toast(state.privacyMode ? "隐私模式已开启" : "隐私模式已关闭", state.privacyMode ? "原始文件不会上传至服务器" : "原始文件将由服务器解析");
  }
  if (action === "start-analysis") { toast("AI 分析完成", "已生成复核队列和迁移证据"); renderQueue(); }
  if (action === "back-queue") renderQueue();
  if (action === "show-compare") showCompare();
  if (action === "open-sourcing-strategy") {
    renderSourcingStrategy(actionEl.dataset.jobId || state.currentJob);
    return;
  }
  if (action === "generate-sourcing-keywords") {
    void generateSourcingKeywords();
    return;
  }
  if (action === "copy-sourcing-term") {
    navigator.clipboard?.writeText(actionEl.dataset.copyText || "");
    toast("关键词已复制", actionEl.dataset.copyText || "");
    return;
  }
  if (action === "copy-sourcing-query") {
    const query = state.sourcingInsights[state.currentJob]?.result?.searchQueries?.[Number(actionEl.dataset.queryIndex)]?.query || "";
    if (query) navigator.clipboard?.writeText(query);
    toast("搜索组合已复制", "可粘贴到支持布尔检索的招聘网站");
    return;
  }
  if (action === "copy-all-sourcing-keywords") {
    const result = state.sourcingInsights[state.currentJob]?.result;
    if (result) {
      const text = [
        `关键技术：${(result.technicalKeywords || []).map(item => item.term).join("、")}`,
        `产品 / 平台：${(result.productKeywords || []).map(item => item.term).join("、")}`,
        `相邻岗位：${(result.roleKeywords || []).map(item => item.term).join("、")}`,
        `目标公司：${(result.targetCompanies || []).map(item => item.company).join("、")}`,
        `搜索组合：\n${(result.searchQueries || []).map(item => `${item.label}：${item.query}`).join("\n")}`
      ].join("\n");
      navigator.clipboard?.writeText(text);
      toast("全部寻访关键词已复制", "包含技术、产品、岗位、公司和搜索组合");
    }
    return;
  }
  if (action === "copy-evaluation") {
    const metrics = getEvaluationMetrics(currentJob());
    const business = getBusinessMetrics(currentJob());
    const summary = `岗位：${currentJob().title}\nHR 已复核：${business.reviewed.length} 人\n推荐联系：${business.recommended.length} 人\n进入面试：${business.interviewed.length} 人\nOffer：${business.offers.length} 人\nAI 增量找回且进入面试：${business.recoveredInterviewed.length} 人\nATS 召回率：${metrics.atsRecall}%\nAI 召回率：${metrics.aiRecall}%\nATS 精确率：${metrics.atsPrecision}%\nAI 精确率：${metrics.aiPrecision}%`;
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
    const target = actionEl.closest(".job-understanding-editor")
      ? document.getElementById("jobUnderstandingModelList")
      : document.getElementById("modelList");
    target?.insertAdjacentHTML("beforeend", modelItem(["新增能力项", "点击文字即可编辑说明", "重要"], Date.now()));
  }
  if (action === "add-adjacent") {
    const target = document.getElementById("jobUnderstandingAdjacentList") || document.getElementById("calibrationAdjacentList");
    if (target) {
      target.insertAdjacentHTML("beforeend", adjacentEditItem("新增相邻经历", Date.now()));
      target.lastElementChild?.querySelector("[contenteditable='true']")?.focus();
    }
  }
  if (action === "delete-adjacent") actionEl.closest(".adjacent-edit-item")?.remove();
  if (action === "save-job-understanding") saveJobUnderstandingFromPage();
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
      questions: ["新增一个建议验证问题"],
      companyProfiles: []
    };
    state.selectedKnowledgePack = id;
    saveState();
    renderKnowledgeBase();
  }
  if (action === "edit-jd") enterJdEditMode();
  if (action === "cancel-jd-edit") renderRequirement();
  if (action === "save-jd") void saveEditedJd();
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
  const menu = document.getElementById("accountMenu");
  if (!menu || menu.classList.contains("hidden") || event.target.closest(".account-control")) return;
  toggleAccountMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") toggleAccountMenu(false);
});
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
  const businessContext = document.getElementById("newJobBusinessContext").value.trim();
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
    const data = await apiRequest("/api/analyze-job", { title, industry, jd: jdText, businessContext, note, userContext: userAnalysisContext() });
    const result = data.result;
    job = {
      id: `job-${Date.now()}`,
      custom: true,
      title,
      industry,
      summary: result.summary,
      jdText,
      jd: formatJd(jdText, note),
      businessContext,
      note,
      model: result.capabilities.map(item => [item.name, item.description, item.priority]),
      adjacent: result.adjacent,
      candidates: []
    };
    mode = data.mode;
  } catch (error) {
    job = buildJobFromForm(title, industry, jdText, businessContext, note);
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
syncAccountUi();
void migrateLegacyResumeStorage();
renderWorkbench();
detectAiMode();
if (!localStorage.getItem(ONBOARDING_KEY)) {
  onboarding?.classList.remove("hidden");
}

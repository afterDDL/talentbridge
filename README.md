# TalentBridge

AI 高端人才迁移识别助手，面向中高端社招和陌生行业猎聘场景。

公网 Demo：

https://talentbridge-production-1a40.up.railway.app

产品不依赖单纯的岗位关键词，而是从业务任务、工作方法、问题复杂度、责任范围和结果证据五个维度识别候选人的能力迁移可能，并将简历事实、AI 推断和待验证信息分开呈现。

## 本地运行

该版本使用无第三方依赖的 Node 服务，同时托管前端页面和 AI API。

```powershell
node server.js
```

访问：

```text
http://127.0.0.1:4174
```

未配置密钥时，应用会自动进入可稳定演示的本地分析模式。

启用真实 OpenAI 分析：

```powershell
$env:OPENAI_API_KEY="你的 API Key"
$env:OPENAI_MODEL="gpt-5.4-mini"
node server.js
```

API Key 仅由服务端读取，不会返回或写入浏览器。

## 隐私模式

候选人上传页默认开启隐私模式：

- PDF、DOCX、TXT、Markdown 在浏览器本地解析；
- 姓名、电话、邮箱、身份证号、微信号和详细地址会在浏览器内自动脱敏；
- 任职企业、岗位、部门、项目以及产品技术名称不会脱敏，用于保留业务背景和迁移判断依据；
- 服务器和 AI 服务只接收脱敏后的纯文本，不接收原始文件；
- 原始简历保存在当前浏览器的 IndexedDB 中，用于人工复核；删除候选人时同步删除。

隐私模式可在导入弹窗中关闭。关闭后会使用服务端文件解析链路。

启用 DeepSeek：

```powershell
$env:AI_PROVIDER="deepseek"
$env:DEEPSEEK_API_KEY="你的 DeepSeek API Key"
$env:DEEPSEEK_MODEL="deepseek-chat"
node server.js
```

为兼容已有部署，当 `AI_PROVIDER=deepseek` 时，也可以从 `OPENAI_API_KEY` 读取 DeepSeek Key。

## 公网部署

仓库包含 `Dockerfile`、`railway.json` 和 `render.yaml`，可直接部署到 Railway 或 Render。

当前 Railway 生产服务连接 GitHub `main` 分支；推送到 `main` 后会自动构建和发布。

生产环境必须由平台注入：

- `PORT`：平台自动分配
- `HOST=0.0.0.0`
- `OPENAI_API_KEY`：可选；未配置时使用演示模式
- `OPENAI_MODEL=gpt-5.4-mini`
- `AI_PROVIDER=deepseek`：使用 DeepSeek 时设置
- `DEEPSEEK_API_KEY`：DeepSeek 密钥；也兼容已有 `OPENAI_API_KEY`
- `DEEPSEEK_MODEL=deepseek-chat`

PDF 与 DOCX 解析需要：

```powershell
pip install -r requirements.txt
```

## 当前功能

- 3D 先进封装与 SaaS 大客户销售双案例
- 创建任意行业的自定义招聘项目
- 可编辑的行业岗位知识包
- 术语关系、正向迁移规则、反向风险和验证问题
- 候选人原司产品与技术方向的联网研究，并附公开来源
- 独立 Industry Research Skill：根据当前 JD 动态生成行业术语和产业链研究计划，再识别集团、品牌、子公司及事业部
- 参考 Serenity Method 的研究地图：从需求倒推价值链、识别关键卡点，并通过验证门区分叙事与事实
- 公司实体检索自动去除工商后缀，并扩展简称、英文名和品牌别名
- 企业研究结果自动沉淀为当前岗位的“企业产品与技术地图”，供 HR 复用学习
- JD 理解与岗位能力模型校准
- JD、能力名称、能力说明及重要度编辑保存
- 示例简历、文件入口及简历文本导入
- PDF、DOCX、TXT 简历批量上传与解析
- 候选人复核队列和 ATS 对比
- ATS 与 AI 召回率、精确率和复核成本评估
- 独立人工标准答案标注与指标实时重算
- 候选人队列 CSV、单人分析报告及评估数据导出
- 首次使用引导、标准三分钟演示和数据重置
- 产品价值、评分映射及演示前检查页面
- 能力迁移路径、证据和待验证缺口
- HR 人工判断记录
- 浏览器本地保存岗位进度和导入数据
- OpenAI Responses API 结构化输出
- 无 API Key 时自动使用演示分析模式

## 产品边界

- AI 只辅助召回、排序和解释，不自动淘汰或录用候选人。
- 演示模式使用本地规则；配置 API Key 后使用真实模型分析。
- 正式企业部署仍需增加账号权限、数据加密、审计记录及简历保留策略。

## 文件

- `index.html`：应用结构和导入弹窗
- `styles.css`：浅色企业工作台视觉样式
- `app.js`：岗位数据、页面渲染和交互逻辑
- `server.js`：静态文件服务与 AI 分析 API
- `industry-research-skill.js`：企业与行业背景研究流程及证据约束
- `parse_resume.py`：PDF、DOCX 和文本简历内容提取
- `AI高端人才迁移识别助手-产品需求文档.md`：产品需求文档

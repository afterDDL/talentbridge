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

## 公网部署

仓库包含 `Dockerfile`、`railway.json` 和 `render.yaml`，可直接部署到 Railway 或 Render。

生产环境必须由平台注入：

- `PORT`：平台自动分配
- `HOST=0.0.0.0`
- `OPENAI_API_KEY`：可选；未配置时使用演示模式
- `OPENAI_MODEL=gpt-5.4-mini`

PDF 与 DOCX 解析需要：

```powershell
pip install -r requirements.txt
```

## 当前功能

- 3D 先进封装与 SaaS 大客户销售双案例
- 创建任意行业的自定义招聘项目
- 可编辑的行业岗位知识包
- 术语关系、正向迁移规则、反向风险和验证问题
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
- `parse_resume.py`：PDF、DOCX 和文本简历内容提取
- `AI高端人才迁移识别助手-产品需求文档.md`：产品需求文档

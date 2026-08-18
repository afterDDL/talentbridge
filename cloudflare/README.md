# TalentBridge Cloudflare 免费版

架构由 Cloudflare Workers Static Assets + Worker API 组成：

- `dist/`：HTML、CSS、浏览器 JavaScript 与 PDF/DOCX 解析库，由 Cloudflare 全球静态资源网络提供。
- `worker.mjs`：`/api/*` 路由。未配置模型密钥时使用演示规则；配置后可调用 OpenAI 或 DeepSeek。
- 简历原始文件始终在浏览器解析，不上传、不落盘，因此免费版不需要 R2、D1、容器或 Python。
- 浏览器 `localStorage`/IndexedDB 保存岗位、候选人和原始简历，仅限当前设备。

## 构建与本地运行

```powershell
node .\cloudflare\build.mjs
npx wrangler dev --config .\cloudflare\wrangler.jsonc
```

## 免费部署

```powershell
node .\cloudflare\build.mjs
npx wrangler deploy --config .\cloudflare\wrangler.jsonc
```

默认无需环境变量即可运行完整演示流程。真实 AI 是可选能力，模型供应商会单独计费：

```powershell
npx wrangler secret put OPENAI_API_KEY --config .\cloudflare\wrangler.jsonc
# 或
npx wrangler secret put DEEPSEEK_API_KEY --config .\cloudflare\wrangler.jsonc
```

可选普通变量：`AI_PROVIDER`、`OPENAI_MODEL`、`DEEPSEEK_MODEL`。

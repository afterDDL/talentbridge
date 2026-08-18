import assert from "node:assert/strict";
import test from "node:test";
import worker from "../cloudflare/worker.mjs";

function call(path, body, method = "POST") {
  return worker.fetch(new Request(`https://talentbridge.test${path}`, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  }), {});
}

test("health reports Cloudflare demo mode", async () => {
  const response = await call("/api/health", null, "GET");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, runtime: "cloudflare-worker", mode: "demo", provider: null, model: null, uploads: "browser-local" });
});

test("job and resume analysis work without paid services", async () => {
  const jobResponse = await call("/api/analyze-job", { title: "先进封装工程师", jd: "负责先进封装工艺开发与量产良率改善。" });
  const jobData = await jobResponse.json();
  assert.equal(jobData.mode, "demo");
  assert.ok(jobData.result.capabilities.length >= 5);

  const resumeResponse = await call("/api/analyze-resume", {
    resume: "张三\n先进封装工程师\n主导 CoWoS 互连工艺项目并完成量产良率改善。",
    job: { title: "3D封装工程师", model: jobData.result.capabilities.map(item => [item.name, item.description]), adjacent: jobData.result.adjacent }
  });
  const resumeData = await resumeResponse.json();
  assert.equal(resumeData.mode, "demo");
  assert.equal(resumeData.result.name, "张三");
  assert.ok(["priority", "review", "unknown"].includes(resumeData.result.group));
});

test("raw file upload endpoint is intentionally disabled", async () => {
  const response = await call("/api/upload-resumes", { files: [{ name: "resume.pdf", data: "AA==" }], job: {} });
  assert.equal(response.status, 410);
  assert.match((await response.json()).error, /浏览器本地解析/);
});

test("company research keeps a complete safe fallback when public fetch fails", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("offline"); };
  try {
    const response = await call("/api/research-company", { company: "示例公司", role: "工程师", job: { title: "工程师", model: [["量产交付", "关键能力"]] } });
    const result = await response.json();
    assert.equal(result.status, "researched");
    assert.equal(result.fit, "信息不足");
    assert.ok(result.gaps.length >= 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const cloudflareDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(cloudflareDir, "..");
const dist = resolve(cloudflareDir, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "vendor"), { recursive: true });
for (const file of ["index.html", "styles.css", "app.js"]) {
  await cp(resolve(root, file), resolve(dist, file));
}
for (const file of ["mammoth.browser.min.js", "pdf.mjs", "pdf.worker.mjs"]) {
  await cp(resolve(root, "vendor", file), resolve(dist, "vendor", file));
}
console.log(`Cloudflare static assets built at ${dist}`);

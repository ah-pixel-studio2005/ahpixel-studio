import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the AHPixel interactive showroom", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>AHPixel Studio \| Web Design &amp; Development<\/title>/i);
  assert.match(html, /We build webs/);
  assert.match(html, /What should/);
  assert.match(html, /From idea/);
  assert.match(html, /What are we/);
  assert.match(html, /data-home-section="06"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("keeps interactive behavior isolated in client modules", async () => {
  const root = new URL("../app/components/interactive/", import.meta.url);
  const files = await readdir(root);
  const expected = ["BuildJourney.tsx", "CaseStudyMotion.tsx", "InteractiveHero.tsx", "PrinciplesExplorer.tsx", "ProjectStage.tsx", "ProjectStarter.tsx", "SectionProgress.tsx", "ServicesExplorer.tsx", "StudioPlayground.tsx"];
  assert.deepEqual(files.sort(), expected.sort());
  const modules = await Promise.all(files.map(file => readFile(new URL(file, root), "utf8")));
  modules.forEach(source => assert.match(source, /^"use client";/));
  const [page, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /<ProjectStage \/>/);
  assert.match(page, /<ServicesExplorer \/>/);
  assert.match(page, /<BuildJourney \/>/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /position:sticky/);
  assert.doesNotMatch(packageJson, /gsap|framer-motion|react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

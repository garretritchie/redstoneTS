import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

function exportedHtmlPath(route = "/") {
  if (route === "/") return path.join(process.cwd(), "out", "index.html");
  return path.join(process.cwd(), "out", route.replace(/^\/+/, ""), "index.html");
}

async function render(route = "/") {
  return readFile(exportedHtmlPath(route), "utf8");
}

test("exports the Redstone homepage with SEO and updated navigation", async () => {
  const html = await render("/");
  assert.match(html, /Managed IT Services Bahamas \| Redstone Technology Solutions/);
  assert.match(html, /Well-run businesses deserve well-run technology/);
  assert.match(html, /href="\/managed-it#services"/);
  assert.match(html, />Insights</);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/redstonets/);
  assert.match(html, /mailto:msp@redstoneTS\.com/);
  assert.match(html, /https:\/\/msp2\.rdstn\.com\//);
  assert.doesNotMatch(html, /tel:\+12426018324/);
});

test("exports Insights index and article routes", async () => {
  const indexHtml = await render("/insights");
  assert.match(indexHtml, /Technology Insights for Bahamian Businesses/);
  assert.match(indexHtml, /How Bahamian Businesses Should Think About Cybersecurity/);
  assert.match(indexHtml, /What Co-Managed IT Actually Looks Like/);
  assert.match(indexHtml, /9 July 2026|July 9, 2026/);

  const articleHtml = await render("/insights/when-to-move-from-reactive-support-to-managed-it");
  assert.match(articleHtml, /When Should a Business Move from Reactive IT Support to Managed IT/);
  assert.match(articleHtml, /29 January 2026|January 29, 2026/);
  assert.match(articleHtml, /Explore managed IT/);
  assert.match(articleHtml, /"@type":"Article"/);
  assert.match(articleHtml, /"@type":"BreadcrumbList"/);
});

test("exports contact form with honeypot protection without visible checkbox friction", async () => {
  const html = await render("/contact");
  assert.match(html, /name="website"/);
  assert.match(html, /Phone number/);
  assert.match(html, /optional/);
  assert.doesNotMatch(html, /name="human-check"/);
  assert.doesNotMatch(html, /I.?m not a robot/);
});

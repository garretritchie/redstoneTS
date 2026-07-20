import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Redstone homepage with SEO and updated navigation", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Managed IT Services Bahamas \| Redstone Technology Solutions/);
  assert.match(html, /Well-run businesses deserve well-run technology/);
  assert.match(html, /href="\/managed-it#services"/);
  assert.match(html, />Insights</);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/redstonets/);
  assert.match(html, /mailto:msp@redstoneTS\.com/);
  assert.doesNotMatch(html, /tel:\+12426018324/);
});

test("server-renders Insights index and article routes", async () => {
  const indexResponse = await render("/insights");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /Technology Insights for Bahamian Businesses/);
  assert.match(indexHtml, /How Bahamian Businesses Should Think About Cybersecurity/);
  assert.match(indexHtml, /What Co-Managed IT Actually Looks Like/);
  assert.match(indexHtml, /9 July 2026|July 9, 2026/);

  const articleResponse = await render("/insights/when-to-move-from-reactive-support-to-managed-it");
  assert.equal(articleResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /When Should a Business Move from Reactive IT Support to Managed IT/);
  assert.match(articleHtml, /29 January 2026|January 29, 2026/);
  assert.match(articleHtml, /Explore managed IT/);
  assert.match(articleHtml, /"@type":"Article"/);
  assert.match(articleHtml, /"@type":"BreadcrumbList"/);
});

test("contact form keeps honeypot protection without visible checkbox friction", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /name="website"/);
  assert.match(html, /Phone number/);
  assert.match(html, /optional/);
  assert.doesNotMatch(html, /name="human-check"/);
  assert.doesNotMatch(html, /I.?m not a robot/);
});

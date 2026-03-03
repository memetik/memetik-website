#!/usr/bin/env node

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const http = require("http");

const DIST = path.join(__dirname, "..", "dist", "public");
const DOMAIN = "https://www.memetik.ai";

const STATIC_ROUTES = [
  "/",
  "/404",
  "/strategy",
  "/strategy/bts",
  "/strategy/signify-ip",
  "/strategy/uleads",
  "/bts",
  "/resources",
  "/audit",
  "/for/saas-founders",
  "/for/ecommerce-brands",
  "/for/b2b-services",
  "/for/marketing-leaders",
  "/vs/manual-seo",
  "/vs/traditional-seo-agencies",
  "/vs/content-marketing-agencies",
  "/solutions/chatgpt-visibility",
  "/solutions/perplexity-citations",
  "/solutions/ai-overview-ranking",
  "/solutions/competitor-displacement",
];

function getArticleRoutes() {
  const cacheFile = path.join(DIST, "cache", "resources-articles.json");
  if (!fs.existsSync(cacheFile)) return [];
  const articles = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
  return articles.map((a) => `/resources/${a.slug}`);
}

function startServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(DIST, req.url === "/" ? "index.html" : req.url);

      if (!fs.existsSync(filePath) && !path.extname(filePath)) {
        filePath = path.join(DIST, "index.html");
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST, "index.html");
      }

      const ext = path.extname(filePath);
      const mimeTypes = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".xml": "application/xml",
        ".txt": "text/plain",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
      };

      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      res.end(fs.readFileSync(filePath));
    });

    server.listen(port, () => resolve(server));
  });
}

function injectMetaAndCanonical(html, route) {
  const canonicalUrl = `${DOMAIN}${route === "/" ? "" : route}`;

  // Fix canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Fix og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // Set og:type for articles
  if (route.startsWith("/resources/") && route !== "/resources") {
    html = html.replace(
      /<meta property="og:type" content="[^"]*"/,
      `<meta property="og:type" content="article"`
    );
  }

  return html;
}

async function prerenderRoute(browser, route, port) {
  const page = await browser.newPage();

  try {
    await page.goto(`http://localhost:${port}${route}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait a bit for any async content (article fetch etc)
    await page.waitForFunction(
      () => document.title !== "" && !document.title.includes("undefined"),
      { timeout: 10000 }
    ).catch(() => {});

    // Get the fully rendered HTML
    let html = await page.content();

    // Fix canonical/OG per route
    html = injectMetaAndCanonical(html, route);

    // Determine output path
    let outputPath;
    if (route === "/") {
      outputPath = path.join(DIST, "index.html");
    } else if (route === "/404") {
      outputPath = path.join(DIST, "404.html");
    } else {
      outputPath = path.join(DIST, route, "index.html");
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
  } catch (err) {
    console.error(`  FAILED ${route}: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log("Pre-rendering pages...");

  const articleRoutes = getArticleRoutes();
  const allRoutes = [...STATIC_ROUTES, ...articleRoutes];

  console.log(`  ${STATIC_ROUTES.length} static + ${articleRoutes.length} articles = ${allRoutes.length} total routes`);

  const port = 4173;
  const server = await startServer(port);
  console.log(`  Static server on :${port}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // Process in batches of 10 for speed
  const BATCH_SIZE = 10;
  let completed = 0;

  for (let i = 0; i < allRoutes.length; i += BATCH_SIZE) {
    const batch = allRoutes.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((route) => prerenderRoute(browser, route, port)));
    completed += batch.length;
    process.stdout.write(`  Pre-rendered ${completed}/${allRoutes.length}\r`);
  }

  console.log(`\n  Done: ${allRoutes.length} pages pre-rendered`);

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

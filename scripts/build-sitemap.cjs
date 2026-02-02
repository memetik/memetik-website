#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DOMAIN = "https://memetik.ai";
const ARTICLES_CACHE = path.join(__dirname, "..", "client", "public", "cache", "resources-articles.json");
const OUTPUT = path.join(__dirname, "..", "client", "public", "sitemap.xml");

const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/audit", priority: "0.9", changefreq: "monthly" },
  { loc: "/strategy", priority: "0.8", changefreq: "monthly" },
  { loc: "/resources", priority: "0.8", changefreq: "daily" },
  { loc: "/bts", priority: "0.6", changefreq: "monthly" },
  // ICP segment pages
  { loc: "/for/saas-founders", priority: "0.8", changefreq: "monthly" },
  { loc: "/for/ecommerce-brands", priority: "0.8", changefreq: "monthly" },
  { loc: "/for/b2b-services", priority: "0.8", changefreq: "monthly" },
  { loc: "/for/marketing-leaders", priority: "0.8", changefreq: "monthly" },
  // Comparison pages
  { loc: "/vs/manual-seo", priority: "0.7", changefreq: "monthly" },
  { loc: "/vs/traditional-seo-agencies", priority: "0.7", changefreq: "monthly" },
  { loc: "/vs/content-marketing-agencies", priority: "0.7", changefreq: "monthly" },
  // Solution pages
  { loc: "/solutions/chatgpt-visibility", priority: "0.8", changefreq: "monthly" },
  { loc: "/solutions/perplexity-citations", priority: "0.8", changefreq: "monthly" },
  { loc: "/solutions/ai-overview-ranking", priority: "0.8", changefreq: "monthly" },
  { loc: "/solutions/competitor-displacement", priority: "0.8", changefreq: "monthly" },
];

function main() {
  console.log("Building sitemap.xml...");

  const today = new Date().toISOString().split("T")[0];

  let urls = STATIC_PAGES.map((p) => ({
    loc: `${DOMAIN}${p.loc}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority,
  }));

  // Add articles from the cache (build-articles.cjs must run first)
  if (fs.existsSync(ARTICLES_CACHE)) {
    const articles = JSON.parse(fs.readFileSync(ARTICLES_CACHE, "utf-8"));
    for (const article of articles) {
      const raw = article.lastUpdated || article.publicationDate || today;
      const lastmod = String(raw).split("T")[0]; // normalize to YYYY-MM-DD
      urls.push({
        loc: `${DOMAIN}/resources/${article.slug}`,
        lastmod,
        changefreq: "monthly",
        priority: "0.6",
      });
    }
    console.log(`  ${articles.length} articles added`);
  } else {
    console.log("  Warning: articles cache not found, sitemap will only have static pages");
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(OUTPUT, xml);
  console.log(`  Sitemap written: ${urls.length} URLs -> ${OUTPUT}`);
}

main();

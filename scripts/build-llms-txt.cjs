#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ARTICLES_CACHE = path.join(__dirname, "..", "client", "public", "cache", "resources-articles.json");
const OUTPUT = path.join(__dirname, "..", "client", "public", "llms.txt");

const DOMAIN = "https://memetik.ai";

function buildLlmsTxt() {
  console.log("Building llms.txt...");

  const articles = fs.existsSync(ARTICLES_CACHE)
    ? JSON.parse(fs.readFileSync(ARTICLES_CACHE, "utf-8"))
    : [];

  // Group articles by type for organized sections
  const byType = {};
  for (const a of articles) {
    const type = a.articleType || "General";
    if (!byType[type]) byType[type] = [];
    byType[type].push(a);
  }

  let txt = `# MEMETIK

> MEMETIK is an Answer Engine Optimization (AEO) agency that engineers B2B brands into AI search recommendations across ChatGPT, Perplexity, and Gemini. We help Series A-C SaaS, E-commerce, and B2B service companies become the default answer when buyers ask AI for recommendations.

MEMETIK offers AEO retainer engagements: Foundation ($7K/mo) for baseline AI visibility, Ownership ($12K/mo) for category leadership, and Dominance ($15K/mo) for full AI search dominance. All engagements are 6-month sprints with a 90-day performance guarantee.

Key topics: Answer Engine Optimization (AEO), AI search visibility and citations, ChatGPT/Perplexity/Gemini optimization, zero-click search strategy, LLM SEO, B2B SaaS marketing for AI-first buyers.

## Core Pages

- [Home](${DOMAIN}/): AEO agency for B2B brands -- become the brand AI recommends
- [Free AEO Audit](${DOMAIN}/audit): Free AI visibility audit -- enter your domain to see where you rank vs competitors in ChatGPT, Perplexity, and Gemini
- [Strategy Protocol](${DOMAIN}/strategy): The 90-day protocol to become the default AI recommendation in your category
- [Resources](${DOMAIN}/resources): ${articles.length} articles on AEO, AI search optimization, and AI visibility

`;

  for (const [type, typeArticles] of Object.entries(byType).sort()) {
    txt += `## ${type}\n\n`;
    for (const a of typeArticles) {
      const desc = a.metaDescription ? `: ${a.metaDescription}` : "";
      txt += `- [${a.title}](${DOMAIN}/resources/${a.slug})${desc}\n`;
    }
    txt += "\n";
  }

  fs.writeFileSync(OUTPUT, txt);
  const sizeKB = (Buffer.byteLength(txt) / 1024).toFixed(1);
  console.log(`  llms.txt written: ${articles.length} articles, ${sizeKB}KB`);
}

buildLlmsTxt();

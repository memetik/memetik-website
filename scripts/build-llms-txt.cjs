#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ARTICLES_CACHE = path.join(__dirname, "..", "client", "public", "cache", "resources-articles.json");
const OUTPUT = path.join(__dirname, "..", "client", "public", "llms.txt");
const OUTPUT_FULL = path.join(__dirname, "..", "client", "public", "llms-full.txt");
const ARTICLES_DIR = path.join(__dirname, "..", "content", "articles");
const matter = require("gray-matter");

const DOMAIN = "https://memetik.ai";

function buildLlmsTxt() {
  console.log("Building llms.txt...");

  const articles = fs.existsSync(ARTICLES_CACHE)
    ? JSON.parse(fs.readFileSync(ARTICLES_CACHE, "utf-8"))
    : [];

  // Group articles by type
  const byType = {};
  for (const a of articles) {
    const type = a.articleType || "General";
    if (!byType[type]) byType[type] = [];
    byType[type].push(a);
  }

  // --- llms.txt (navigation view) ---
  let txt = `# MEMETIK

> MEMETIK is an Answer Engine Optimization (AEO) agency that engineers B2B brands into AI search recommendations across ChatGPT, Perplexity, and Gemini. We help Series A-C SaaS, E-commerce, and B2B service companies become the default answer when buyers ask AI for recommendations.

## Core Pages

- [Home](${DOMAIN}/): Main landing page -- AEO agency for B2B brands
- [Free AEO Audit](${DOMAIN}/audit): Free AI visibility audit -- enter your domain to see how you rank in ChatGPT, Perplexity, and Gemini vs competitors
- [Strategy Protocol](${DOMAIN}/strategy): The 90-day protocol to become the default AI recommendation in your category
- [Resources](${DOMAIN}/resources): ${articles.length} articles on AEO, AI search optimization, and AI visibility

## Services

MEMETIK offers AEO retainer engagements:
- **Foundation** ($7K/mo): Baseline AI visibility for companies starting AEO
- **Ownership** ($12K/mo): Category leadership in AI search
- **Dominance** ($15K/mo): Full AI search dominance across all engines

All engagements are 6-month sprints with a 90-day performance guarantee.

## Key Topics

- Answer Engine Optimization (AEO)
- AI search visibility and citations
- ChatGPT, Perplexity, and Gemini optimization
- Zero-click search strategy
- LLM SEO and AI content optimization
- B2B SaaS marketing for AI-first buyers

## Articles by Category

`;

  for (const [type, typeArticles] of Object.entries(byType).sort()) {
    txt += `### ${type}\n\n`;
    for (const a of typeArticles) {
      const desc = a.metaDescription ? `: ${a.metaDescription}` : "";
      txt += `- [${a.title}](${DOMAIN}/resources/${a.slug})${desc}\n`;
    }
    txt += "\n";
  }

  fs.writeFileSync(OUTPUT, txt);
  console.log(`  llms.txt written: ${articles.length} articles`);

  // --- llms-full.txt (full content) ---
  let full = `# MEMETIK -- Full Content

> Complete content from MEMETIK, an Answer Engine Optimization (AEO) agency. This file contains the full text of all ${articles.length} published articles for AI consumption.

## About MEMETIK

MEMETIK is an AEO agency that engineers B2B brands into AI search recommendations. We help companies become the default answer when buyers ask ChatGPT, Perplexity, or Gemini for recommendations in their category.

**Website**: ${DOMAIN}
**Free Audit**: ${DOMAIN}/audit
**Contact**: ${DOMAIN}/audit or https://cal.com/memetik/letstalk

---

`;

  for (const a of articles) {
    const mdPath = path.join(ARTICLES_DIR, `${a.slug}.md`);
    if (!fs.existsSync(mdPath)) continue;

    const raw = fs.readFileSync(mdPath, "utf-8");
    const { content } = matter(raw);

    full += `## ${a.title}\n\n`;
    full += `**URL**: ${DOMAIN}/resources/${a.slug}\n`;
    if (a.primaryKeyword) full += `**Topic**: ${a.primaryKeyword}\n`;
    if (a.articleType) full += `**Type**: ${a.articleType}\n`;
    full += "\n";
    full += content.trim();
    full += "\n\n---\n\n";
  }

  fs.writeFileSync(OUTPUT_FULL, full);
  const sizeMB = (Buffer.byteLength(full) / 1024 / 1024).toFixed(1);
  console.log(`  llms-full.txt written: ${sizeMB}MB`);
}

buildLlmsTxt();

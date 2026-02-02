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

## For Specific Industries

- [AEO for SaaS Founders](${DOMAIN}/for/saas-founders): AI search optimization for Series A-C SaaS companies
- [AEO for E-commerce Brands](${DOMAIN}/for/ecommerce-brands): Get products recommended by AI when shoppers ask for the best in your category
- [AEO for B2B Services](${DOMAIN}/for/b2b-services): Be the firm AI recommends when buyers ask for vendor recommendations
- [AEO for Marketing Leaders](${DOMAIN}/for/marketing-leaders): Measurable AI visibility metrics and executive-ready reporting for CMOs and VPs

## Solutions

- [ChatGPT Visibility](${DOMAIN}/solutions/chatgpt-visibility): Get recommended by ChatGPT when buyers search your category
- [Perplexity Citations](${DOMAIN}/solutions/perplexity-citations): Get cited by Perplexity AI with direct links to your site
- [Google AI Overview Ranking](${DOMAIN}/solutions/ai-overview-ranking): Get featured in AI-generated answers at the top of Google
- [Competitor Displacement](${DOMAIN}/solutions/competitor-displacement): Systematically replace competitors as the default AI recommendation

## Comparisons

- [Memetik vs DIY AEO](${DOMAIN}/vs/manual-seo): Why in-house AEO fails and when to hire an agency
- [Memetik vs SEO Agencies](${DOMAIN}/vs/traditional-seo-agencies): Why traditional SEO agencies can't do AEO
- [Memetik vs Content Agencies](${DOMAIN}/vs/content-marketing-agencies): Why content alone doesn't get you cited by AI

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

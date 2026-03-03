#!/usr/bin/env node

/**
 * Build-time static HTML generator — zero browser dependencies.
 * Injects FULL semantic HTML content into every page so crawlers,
 * AI models, and search engines see everything without JS execution.
 */

const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "..", "dist", "public");
const DOMAIN = "https://www.memetik.ai";
const DATA_DIR = path.join(__dirname, "..", "client", "src", "data");

const TEMPLATE = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

// ── Helpers ──────────────────────────────────────────────────────

function esc(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseTS(filePath, varName) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const constStart = raw.indexOf("export const");
  if (constStart === -1) return {};
  let js = raw.substring(constStart);
  js = js.replace(/export const (\w+):\s*[^=]+=/, "const $1 =");
  const result = {};
  try {
    const fn = new Function("result", js + `\nresult.data = ${varName};`);
    fn(result);
  } catch (e) {
    console.warn(`  Warning: could not parse ${path.basename(filePath)}: ${e.message}`);
  }
  return result.data || {};
}

// Load all data
let segmentsData = {}, solutionsData = {}, comparisonsData = {};
try { segmentsData = parseTS(path.join(DATA_DIR, "segments.ts"), "segments"); } catch(e) { console.warn("  Warning: segments.ts parse failed"); }
try { solutionsData = parseTS(path.join(DATA_DIR, "solutions.ts"), "solutions"); } catch(e) { console.warn("  Warning: solutions.ts parse failed"); }
try { comparisonsData = parseTS(path.join(DATA_DIR, "comparisons.ts"), "comparisons"); } catch(e) { console.warn("  Warning: comparisons.ts parse failed"); }

// Regex fallback for meta extraction
function extractMeta(fileContent, slug) {
  const block = fileContent.match(new RegExp(`"${slug}"[\\s\\S]*?(?=\\n  "\\w|\\n};)`, ""));
  if (!block) return {};
  const get = (key) => { const m = block[0].match(new RegExp(`${key}:\\s*"([^"]+)"`)); return m ? m[1] : ""; };
  return { metaTitle: get("metaTitle"), metaDescription: get("metaDescription"), headline: get("headline"), subhead: get("subhead"), description: get("description") };
}

function loadArticles() {
  const cacheFile = path.join(DIST, "cache", "resources-articles.json");
  if (!fs.existsSync(cacheFile)) return [];
  return JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
}

// ── Content generators ──────────────────────────────────────────

function homepageContent() {
  const faqs = [
    { q: "How is this different from traditional SEO?", a: "Traditional SEO optimizes for Google's ranking algorithm. AEO (Answer Engine Optimization) optimizes for how LLMs like ChatGPT, Claude, and Perplexity understand and recommend brands. These are fundamentally different systems." },
    { q: "How long until I see results?", a: "Most clients see measurable improvements in AI visibility within 60-90 days. Brands with existing authority move faster. We provide a detailed timeline during your free audit." },
    { q: "What's the investment?", a: "We scope every engagement based on your category, competitive landscape, and goals. Book a free audit call and we'll walk through exactly what it looks like for your business." },
    { q: "Do you work with competitors in the same space?", a: "No. We maintain strict category exclusivity. Once we partner with a brand in a vertical, we won't work with their direct competitors." },
    { q: "What if it doesn't work?", a: "We offer a performance guarantee: if we don't measurably improve your AI visibility within 90 days, we'll refund your first month's investment." },
    { q: "Can't I just do this myself?", a: "AEO requires deep expertise in how LLMs process information, proprietary tools for tracking AI citations, and relationships with high-authority platforms for distribution." },
    { q: "How do you measure AI visibility?", a: "We use proprietary tools that run thousands of prompts across major AI models and track citation rates, recommendation frequency, and sentiment." },
    { q: "What industries do you work with?", a: "We specialize in B2B SaaS, E-commerce (7-figures+), and professional services." },
  ];

  return `
    <main>
      <section>
        <h1>Be the Brand AI Recommends</h1>
        <p>We engineer your brand into ChatGPT, Perplexity, and Gemini responses — so you're the answer, not your competitors.</p>
        <p>B2B SaaS · E-commerce · Professional Services</p>
      </section>

      <section>
        <h2>What We Do for You</h2>
        <p>Every client engagement includes all three pillars. This is the complete system that makes your brand the answer AI gives.</p>
        <div>
          <h3>LLM SEO — Get Recommended by AI</h3>
          <p>When customers ask ChatGPT, Claude, or Gemini for recommendations, your brand is the answer. We engineer your presence into the models' knowledge base.</p>
        </div>
        <div>
          <h3>Answer Engine Optimization — Win Zero-Click Searches</h3>
          <p>70% of searches now end without a click. We structure your content so AI pulls YOUR answers into summaries, snippets, and direct responses.</p>
        </div>
        <div>
          <h3>Scale Systems — Programmatic Dominance</h3>
          <p>We build content infrastructure that compounds visibility over time — 100 bottom-of-funnel articles and 800 programmatic pages working around the clock.</p>
        </div>
      </section>

      <section>
        <h2>Not Another SEO Agency</h2>
        <p>Most agencies are still optimizing for Google rankings while your buyers are getting answers from ChatGPT. We engineer your brand into the AI layer itself.</p>
      </section>

      <section>
        <h2>The 90-Day Guarantee</h2>
        <p>If there's no measurable movement in your AI visibility within 90 days, you get a full refund. No questions asked.</p>
      </section>

      <section>
        <h2>Is This for You?</h2>
        <p>We're selective about who we work with. AEO requires significant investment and commitment.</p>
        <h3>You're a Great Fit If:</h3>
        <ul>
          <li>Established revenue — You have the resources to invest in long-term growth</li>
          <li>6-month commitment mindset — You understand AEO is a strategic play, not a quick fix</li>
          <li>B2B SaaS or E-commerce — Your customers research purchases with AI</li>
          <li>Category leader or ambitious challenger — You want to dominate, not just compete</li>
        </ul>
      </section>

      <section>
        <h2>Questions &amp; Answers</h2>
        ${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n        ")}
      </section>
    </main>`;
}

function segmentContent(data) {
  if (!data) return "";
  return `
    <main>
      <section>
        <h1>${esc((data.headline || "").replace(/\\n/g, " "))}</h1>
        <p>${esc(data.subhead || "")}</p>
        <p>${esc(data.description || "")}</p>
      </section>

      ${data.painPoints ? `<section><h2>The Problem</h2><ul>${data.painPoints.map((p) => `<li>${esc(p.text)}</li>`).join("")}</ul></section>` : ""}

      ${data.stats ? `<section><h2>Key Statistics</h2><ul>${data.stats.map((s) => `<li><strong>${esc(s.value)}</strong> ${esc(s.label)}</li>`).join("")}</ul></section>` : ""}

      ${data.steps ? `<section><h2>How It Works</h2>${data.steps.map((s, i) => `<div><h3>Step ${i + 1}: ${esc(s.title)}</h3><p>${esc(s.description)}</p></div>`).join("")}</section>` : ""}

      ${data.faqs ? `<section><h2>Frequently Asked Questions</h2>${data.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>` : ""}

      <section>
        <p><a href="https://cal.com/memetik/letstalk">${esc(data.ctaText || "Get Your Free Audit")}</a></p>
        <p>${esc(data.ctaSubtext || "")}</p>
      </section>
    </main>`;
}

function solutionContent(data) {
  if (!data) return "";
  return `
    <main>
      <section>
        <h1>${esc((data.headline || "").replace(/\\n/g, " "))}</h1>
        <p>${esc(data.subhead || "")}</p>
        <p>${esc(data.description || "")}</p>
      </section>

      ${data.problems ? `<section><h2>${esc(data.problemTitle || "The Problem")}</h2><ul>${data.problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></section>` : ""}

      ${data.steps ? `<section><h2>Our Approach</h2>${data.steps.map((s, i) => `<div><h3>Step ${i + 1}: ${esc(s.title)}</h3><p>${esc(s.description)}</p></div>`).join("")}</section>` : ""}

      ${data.results ? `<section><h2>Results</h2><ul>${data.results.map((r) => `<li><strong>${esc(r.value)}</strong> ${esc(r.label)}</li>`).join("")}</ul></section>` : ""}

      ${data.faqs ? `<section><h2>Frequently Asked Questions</h2>${data.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>` : ""}
    </main>`;
}

function comparisonContent(data) {
  if (!data) return "";
  return `
    <main>
      <section>
        <h1>${esc((data.headline || "").replace(/\\n/g, " "))}</h1>
        <p>${esc(data.subhead || "")}</p>
        <p>${esc(data.description || "")}</p>
      </section>

      ${data.rows ? `<section><h2>Comparison</h2>
        <table>
          <thead><tr><th>Category</th><th>${esc(data.themLabel)}</th><th>${esc(data.usLabel)}</th></tr></thead>
          <tbody>${data.rows.map((r) => `<tr><td>${esc(r.category)}</td><td>${esc(r.them)}</td><td>${esc(r.us)}</td></tr>`).join("")}</tbody>
        </table>
        <p><strong>Bottom line:</strong> ${esc(data.bottomLine || "")}</p>
      </section>` : ""}

      ${data.faqs ? `<section><h2>Frequently Asked Questions</h2>${data.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>` : ""}
    </main>`;
}

function articleContent(article) {
  const contentFile = path.join(DIST, "cache", "resources-content", `${article.id}.html`);
  const bodyHtml = fs.existsSync(contentFile) ? fs.readFileSync(contentFile, "utf-8") : "";
  const date = article.publicationDate ? new Date(article.publicationDate).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }) : "";

  return `
    <main>
      <article>
        <header>
          ${article.articleType ? `<p>${esc(article.articleType)}</p>` : ""}
          <h1>${esc(article.title)}</h1>
          ${article.metaDescription ? `<p>${esc(article.metaDescription)}</p>` : ""}
          <p>By ${esc(article.author || "MEMETIK")}${article.authorTitle ? `, ${esc(article.authorTitle)}` : ""}${date ? ` · ${date}` : ""}${article.readTime ? ` · ${esc(article.readTime)}` : ""}</p>
        </header>
        <div>${bodyHtml}</div>
      </article>
    </main>`;
}

function resourcesListContent(articles) {
  return `
    <main>
      <section>
        <h1>Resources — AEO &amp; SEO Insights</h1>
        <p>Expert articles on Answer Engine Optimization, AI search visibility, ChatGPT citations, and LLM SEO strategies for B2B brands.</p>
      </section>
      <section>
        <h2>All Articles</h2>
        <ul>
          ${articles.slice(0, 50).map((a) => `<li><a href="/resources/${esc(a.slug)}">${esc(a.title)}</a>${a.metaDescription ? ` — ${esc(a.metaDescription)}` : ""}</li>`).join("\n          ")}
        </ul>
        ${articles.length > 50 ? `<p>And ${articles.length - 50} more articles...</p>` : ""}
      </section>
    </main>`;
}

function auditContent() {
  return `
    <main>
      <section>
        <h1>Free AEO Audit</h1>
        <p>See exactly where your brand ranks in ChatGPT, Perplexity, and Gemini vs your competitors.</p>
        <p>Enter your domain and email to receive a comprehensive AI visibility audit within 48 hours.</p>
      </section>
      <section>
        <h2>What You'll Get</h2>
        <ul>
          <li>AI Visibility Score across ChatGPT, Perplexity, and Gemini</li>
          <li>Competitor comparison — see who AI recommends instead of you</li>
          <li>Content gap analysis — what's missing from your AI presence</li>
          <li>Priority action items to improve your AI visibility</li>
        </ul>
      </section>
    </main>`;
}

function strategyContent() {
  return `
    <main>
      <section>
        <h1>The MEMETIK Strategy Protocol</h1>
        <p>The 90-day protocol to become the default AI recommendation in your category.</p>
      </section>
      <section>
        <h2>Who This Works For</h2>
        <ul>
          <li>Series A–C SaaS companies doing $5-150M ARR</li>
          <li>E-commerce brands with 7-figure+ revenue</li>
          <li>B2B service firms with $10-150M revenue</li>
        </ul>
      </section>
    </main>`;
}

function notFoundContent() {
  return `
    <main>
      <section>
        <h1>404 — Page Not Found</h1>
        <p>This page doesn't exist.</p>
        <p><a href="/">Back to Home</a></p>
      </section>
    </main>`;
}

// ── Schema generators ───────────────────────────────────────────

function faqSchema(faqs) {
  if (!faqs || faqs.length === 0) return "";
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q || f.question,
      acceptedAnswer: { "@type": "Answer", text: f.a || f.answer },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function articleSchema(article, canonicalUrl) {
  const schemas = [];
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    author: { "@type": "Person", name: article.author || "MEMETIK", jobTitle: article.authorTitle || "AEO Agency" },
    datePublished: article.publicationDate,
    dateModified: article.lastUpdated || article.publicationDate,
    publisher: { "@type": "Organization", name: "MEMETIK", url: DOMAIN },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    wordCount: article.wordCount,
  });
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${DOMAIN}/resources` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  });
  if (article.hasFaqSchema) {
    // Extract FAQ from article content if available
  }
  return schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n");
}

function webPageSchema(title, description, canonicalUrl) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: canonicalUrl,
    publisher: { "@type": "Organization", name: "MEMETIK", url: DOMAIN },
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ── HTML injector ───────────────────────────────────────────────

function generatePage(page) {
  const canonicalUrl = page.route === "/" ? DOMAIN : `${DOMAIN}${page.route}`;
  const ogType = page.isArticle ? "article" : "website";
  let html = TEMPLATE;

  // Title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);

  // Meta description
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(page.description)}"`);

  // Canonical
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);

  // OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(page.title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(page.description)}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${ogType}"`);

  // Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(page.title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(page.description)}"`);

  // noindex for 404 and strategy proposal pages
  if (page.is404 || page.route.startsWith("/strategy/")) {
    html = html.replace(/<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex, nofollow"');
  }

  // Inject body content into root div
  if (page.bodyContent) {
    html = html.replace('<div id="root"></div>', `<div id="root">${page.bodyContent}</div>`);
  }

  // Inject extra schemas before </head>
  if (page.extraSchemas) {
    html = html.replace("</head>", `${page.extraSchemas}\n</head>`);
  }

  return html;
}

function writePage(page) {
  const html = generatePage(page);
  let outputPath;
  if (page.route === "/") {
    outputPath = path.join(DIST, "index.html");
  } else if (page.is404) {
    outputPath = path.join(DIST, "404.html");
  } else {
    outputPath = path.join(DIST, page.route, "index.html");
  }
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
}

// ── Main ────────────────────────────────────────────────────────

function main() {
  console.log("Pre-rendering full HTML for all pages...");

  const articles = loadArticles();
  const allPages = [];

  // Homepage
  allPages.push({
    route: "/",
    title: "MEMETIK | Be The Brand AI Recommends | AEO Agency",
    description: "We engineer your brand into ChatGPT, Perplexity, and Gemini responses. AEO & SEO agency for B2B SaaS, E-commerce, and professional services. 90-day results guaranteed.",
    bodyContent: homepageContent(),
    extraSchemas: faqSchema([
      { q: "How is this different from traditional SEO?", a: "Traditional SEO optimizes for Google's ranking algorithm. AEO optimizes for how LLMs like ChatGPT, Claude, and Perplexity understand and recommend brands." },
      { q: "How long until I see results?", a: "Most clients see measurable improvements in AI visibility within 60-90 days." },
      { q: "What's the investment?", a: "We scope every engagement based on your category, competitive landscape, and goals. Book a free audit call to discuss." },
      { q: "Do you work with competitors in the same space?", a: "No. We maintain strict category exclusivity." },
      { q: "What if it doesn't work?", a: "We offer a 90-day performance guarantee. If we don't measurably improve your AI visibility, we refund your first month." },
    ]),
  });

  // Resources listing
  allPages.push({
    route: "/resources",
    title: "Resources | MEMETIK - AEO & SEO Insights",
    description: "Expert articles on Answer Engine Optimization, AI search visibility, ChatGPT citations, and LLM SEO strategies for B2B brands.",
    bodyContent: resourcesListContent(articles),
  });

  // Audit
  allPages.push({
    route: "/audit",
    title: "Free AEO Audit | MEMETIK",
    description: "Get a free AI visibility audit. See exactly where your brand ranks in ChatGPT, Perplexity, and Gemini vs competitors. Results in 48 hours.",
    bodyContent: auditContent(),
  });

  // Strategy
  allPages.push({
    route: "/strategy",
    title: "Strategy Protocol | MEMETIK AEO & SEO Agency",
    description: "The 90-day protocol to become the default AI recommendation in your category.",
    bodyContent: strategyContent(),
  });

  // Static strategy pages
  for (const p of [
    { route: "/strategy/bts", title: "BTS Counter-Offensive — Strategic Growth Plan | MEMETIK", description: "Strategic growth plan for BTS — content, SEO, and AI visibility counter-offensive." },
    { route: "/strategy/signify-ip", title: "Signify IP — SEO & AEO Strategy | MEMETIK", description: "SEO and AEO strategy proposal for Signify IP trade mark services." },
    { route: "/strategy/uleads", title: "Uleads — SEO & AEO Strategy | MEMETIK", description: "SEO and AEO strategy proposal for Uleads insurance comparison platform." },
    { route: "/bts", title: "Behind the Scenes | MEMETIK", description: "Go behind the scenes of how MEMETIK engineers AI visibility for brands." },
  ]) {
    allPages.push({ ...p, bodyContent: `<main><h1>${esc(p.title.split("|")[0].trim())}</h1><p>${esc(p.description)}</p></main>` });
  }

  // 404
  allPages.push({
    route: "/404",
    title: "404 — Page Not Found | MEMETIK",
    description: "This page doesn't exist.",
    bodyContent: notFoundContent(),
    is404: true,
  });

  // Segment pages
  for (const slug of ["saas-founders", "ecommerce-brands", "b2b-services", "marketing-leaders"]) {
    const data = segmentsData[slug];
    if (data) {
      const canonicalUrl = `${DOMAIN}/for/${slug}`;
      allPages.push({
        route: `/for/${slug}`,
        title: data.metaTitle || `AEO for ${slug} | MEMETIK`,
        description: data.metaDescription || "",
        bodyContent: segmentContent(data),
        extraSchemas: faqSchema(data.faqs) + "\n" + webPageSchema(data.metaTitle, data.metaDescription, canonicalUrl),
      });
    }
  }

  // Solution pages
  for (const slug of ["chatgpt-visibility", "perplexity-citations", "ai-overview-ranking", "competitor-displacement"]) {
    const data = solutionsData[slug];
    if (data) {
      const canonicalUrl = `${DOMAIN}/solutions/${slug}`;
      allPages.push({
        route: `/solutions/${slug}`,
        title: data.metaTitle || `${slug} | MEMETIK`,
        description: data.metaDescription || "",
        bodyContent: solutionContent(data),
        extraSchemas: faqSchema(data.faqs) + "\n" + webPageSchema(data.metaTitle, data.metaDescription, canonicalUrl),
      });
    }
  }

  // Comparison pages
  for (const slug of ["manual-seo", "traditional-seo-agencies", "content-marketing-agencies"]) {
    const data = comparisonsData[slug];
    if (data) {
      const canonicalUrl = `${DOMAIN}/vs/${slug}`;
      allPages.push({
        route: `/vs/${slug}`,
        title: data.metaTitle || `${slug} | MEMETIK`,
        description: data.metaDescription || "",
        bodyContent: comparisonContent(data),
        extraSchemas: faqSchema(data.faqs) + "\n" + webPageSchema(data.metaTitle, data.metaDescription, canonicalUrl),
      });
    }
  }

  // Article pages
  for (const a of articles) {
    const canonicalUrl = `${DOMAIN}/resources/${a.slug}`;
    allPages.push({
      route: `/resources/${a.slug}`,
      title: `${a.metaTitle || a.title} | MEMETIK`,
      description: a.metaDescription || "",
      bodyContent: articleContent(a),
      extraSchemas: articleSchema(a, canonicalUrl),
      isArticle: true,
    });
  }

  console.log(`  ${allPages.length} pages to generate`);

  for (const page of allPages) {
    writePage(page);
  }

  console.log(`  Done: ${allPages.length} pages with full HTML content`);
}

main();

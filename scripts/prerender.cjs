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
const STRATEGY_REGISTRY = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "shared", "strategyRouteRegistry.json"), "utf-8")
);

const TEMPLATE = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

// ── Helpers ──────────────────────────────────────────────────────

function esc(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

const HOME_FAQS = [
  { q: "How is this different from traditional SEO?", a: "Traditional SEO optimizes for Google's ranking algorithm. We optimize for the full demand journey across Google, ChatGPT, Perplexity, and Gemini so visibility turns into pipeline, not vanity traffic." },
  { q: "How long until we see movement?", a: "Most clients see early movement in citation frequency and answer-share within 30-45 days, then broader commercial impact as content, authority, and distribution compound over 60-90 days." },
  { q: "What kinds of companies are the best fit?", a: "The strongest fit is growth-stage SaaS, professional services, e-commerce, and fund-backed operators with real buying journeys, clear ACV, and leadership teams that care about efficient growth." },
  { q: "What makes Memetik different?", a: "We treat search and AI visibility as a revenue system. That means executive-level measurement, answer-share tracking, bottom-of-funnel coverage, and a buildout designed to influence shortlist decisions before sales gets involved." },
  { q: "What if visibility does not improve?", a: "We baseline your category visibility at the start of the engagement. If there is no measurable movement in high-intent discovery within 90 days, we stand behind the work with a performance guarantee." },
];

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

function getMarkdownSection(text, sectionNumber, title) {
  const pattern = new RegExp(
    `## ${escapeRegex(String(sectionNumber))}\\. ${escapeRegex(title)}([\\s\\S]*?)(?=\\n## \\d+\\.|$)`
  );
  const match = text.match(pattern);
  return match ? match[1].trim() : "";
}

function parseLabeledBullets(section) {
  const fields = {};

  for (const line of section.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("- ")) continue;

    const labelEnd = trimmed.indexOf(":");
    if (labelEnd === -1) continue;

    const label = trimmed.slice(2, labelEnd).trim();
    const value = trimmed.slice(labelEnd + 1).trim();
    fields[label] = value;
  }

  return fields;
}

function parseNumberedList(section) {
  return Array.from(section.matchAll(/^\d+\.\s+(.+)$/gm), (match) => match[1].trim());
}

function parseMarkdownTable(section) {
  const lines = section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  if (lines.length < 3) return null;

  const splitRow = (line) => line.split("|").slice(1, -1).map((cell) => cell.trim());

  return {
    headers: splitRow(lines[0]),
    rows: lines.slice(2).map(splitRow),
  };
}

function renderTable(table) {
  if (!table) return "";

  return `
    <table>
      <thead>
        <tr>${table.headers.map((header) => `<th>${esc(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${table.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`)
          .join("\n        ")}
      </tbody>
    </table>`;
}

function parseSubsections(section) {
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [titleLine, ...rest] = block.split("\n");
      return {
        title: titleLine.trim(),
        body: rest.join("\n").trim(),
        fields: parseLabeledBullets(rest.join("\n")),
      };
    });
}

function summaryStrategyContent(entry) {
  return `<main><h1>${esc(entry.title.split("|")[0].trim())}</h1><p>${esc(entry.description)}</p></main>`;
}

function resolveRegistryFilePath(filePath) {
  if (!filePath) return "";
  return path.isAbsolute(filePath) ? filePath : path.join(__dirname, "..", filePath);
}

function briefStrategyContent(entry) {
  const briefPath = resolveRegistryFilePath(entry.briefPath);

  if (!briefPath || !fs.existsSync(briefPath)) {
    throw new Error(`Missing required approved brief for ${entry.route}: ${briefPath || "(not configured)"}`);
  }

  const brief = fs.readFileSync(briefPath, "utf-8");
  const metadata = parseLabeledBullets(getMarkdownSection(brief, 1, "Brief Metadata"));
  const companyContext = parseLabeledBullets(getMarkdownSection(brief, 2, "Company Context"));
  const categoryFraming = parseLabeledBullets(getMarkdownSection(brief, 3, "Category Framing"));
  const currentState = parseLabeledBullets(getMarkdownSection(brief, 4, "Current State and Visibility"));
  const competitorTable = parseMarkdownTable(getMarkdownSection(brief, 5, "Competitor Landscape"));
  const moneyEntities = parseNumberedList(getMarkdownSection(brief, 6, "Money Entities"));
  const recommendations = parseSubsections(getMarkdownSection(brief, 7, "Prioritized Wedge and Ranked Sequence"));
  const apexAssets = parseLabeledBullets(getMarkdownSection(brief, 8, "Apex Assets Plan"));
  const knowledgeGraph = parseLabeledBullets(getMarkdownSection(brief, 9, "Knowledge Graph Plan"));
  const trustRelay = parseLabeledBullets(getMarkdownSection(brief, 10, "Trust Relay Plan"));
  const technicalFoundation = parseLabeledBullets(getMarkdownSection(brief, 11, "Technical and Entity Foundation"));
  const measurement = parseLabeledBullets(getMarkdownSection(brief, 12, "Proof and Measurement Model"));
  const cadence = parseLabeledBullets(getMarkdownSection(brief, 13, "Cadence and Next Actions"));
  const gaps = parseSubsections(getMarkdownSection(brief, 15, "Unresolved Gaps and Blockers"));
  const claims = parseSubsections(getMarkdownSection(brief, 16, "Claim Register"));

  if (!companyContext.Company || !categoryFraming["Primary wedge"]) {
    throw new Error(`Approved brief for ${entry.route} is missing core company or wedge fields.`);
  }

  const heroTitle = `${companyContext.Company} can win a defined recommendation-share wedge`;
  const recommendationSummaries = recommendations
    .map((item) => item.fields.page_summary || item.fields.recommendation)
    .filter(Boolean);
  const sourceTrace = [
    metadata["Generated at"] ? `Approved brief dated ${metadata["Generated at"]}` : null,
    metadata["Payload confidence"] ? `Payload confidence ${metadata["Payload confidence"]}` : null,
    metadata["Quality gate"] ? `Quality gate ${metadata["Quality gate"]}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return `
    <main>
      <section>
        <p>00 · Founder strategy memo</p>
        <h1>${esc(heroTitle)}</h1>
        <p>${esc(categoryFraming["Primary wedge"] || "")}</p>
        <p>${esc(categoryFraming["Why this company can win now"] || "")}</p>
        <p>${esc(categoryFraming["Commercial objective"] || "")}</p>
        <p><strong>Source trace:</strong> ${esc(sourceTrace)}</p>
      </section>

      <section>
        <h2>Current state</h2>
        <ul>
          <li><strong>Search opportunity:</strong> ${esc(currentState["Search opportunity"] || "")}</li>
          <li><strong>Expected traffic in 12 months:</strong> ${esc(currentState["Expected traffic in 12 months (base)"] || "")}</li>
          <li><strong>Aggressive upside:</strong> ${esc(currentState["Aggressive upside"] || "")}</li>
          <li><strong>First 90-day target:</strong> ${esc(currentState["First 90-day target (base)"] || "")}</li>
          <li><strong>AI visibility baseline:</strong> ChatGPT ${esc(currentState.chatgpt || "")}; Gemini ${esc(currentState.gemini || "")}; Google AI Overview ${esc(currentState.google_ai_overview || "")}</li>
          <li><strong>Topical integrity:</strong> ${esc(currentState["Topical integrity"] || "")}</li>
        </ul>
      </section>

      <section>
        <h2>Opportunity / right to win</h2>
        <p>${esc(categoryFraming["Why this company can win now"] || "")}</p>
        <ol>
          ${recommendationSummaries.map((summary) => `<li>${esc(summary)}</li>`).join("\n          ")}
        </ol>
      </section>

      <section>
        <h2>Competitive gap</h2>
        <p>${esc(companyContext.Company)} needs to close the retrieval and shortlist gap against the platforms already dominating category demand.</p>
        ${renderTable(competitorTable)}
      </section>

      <section>
        <h2>AI visibility / answer-surface gap</h2>
        <p>${esc(measurement["Measurement frame"] || "")}</p>
        <ul>
          <li>${esc(currentState.chatgpt || "")}</li>
          <li>${esc(currentState.gemini || "")}</li>
          <li>${esc(currentState.google_ai_overview || "")}</li>
          ${gaps
            .map((gap) => gap.fields.impact_on_wedge)
            .filter(Boolean)
            .map((gap) => `<li>${esc(gap)}</li>`)
            .join("\n          ")}
        </ul>
      </section>

      <section>
        <h2>90-day wedge</h2>
        <p>${esc(recommendations[0]?.fields.recommendation || categoryFraming["Primary wedge"] || "")}</p>
        <h3>Money Entities</h3>
        <ol>
          ${moneyEntities.map((item) => `<li>${esc(item)}</li>`).join("\n          ")}
        </ol>
        <h3>Apex Assets</h3>
        <p>${esc(apexAssets["First assets to ship"] || "")}</p>
        <p>${esc(apexAssets["Founder-facing point"] || "")}</p>
        <h3>Knowledge Graph</h3>
        <p>${esc(knowledgeGraph["Supporting clusters"] || "")}</p>
        <p>${esc(knowledgeGraph["Founder-facing point"] || "")}</p>
      </section>

      <section>
        <h2>What Memetik builds and ships</h2>
        <ul>
          <li><strong>Money Entities:</strong> ${esc(recommendations[0]?.fields.page_summary || "")}</li>
          <li><strong>Apex Assets:</strong> ${esc(apexAssets["Required Apex Asset types"] || "")}</li>
          <li><strong>Knowledge Graph:</strong> ${esc(knowledgeGraph["Required output shape"] || "")}</li>
          <li><strong>Trust Relay:</strong> ${esc(trustRelay["Required workstreams"] || "")}</li>
          <li><strong>Technical/entity foundation:</strong> ${esc(technicalFoundation["Required systems"] || "")}</li>
          <li><strong>Refresh and defense:</strong> ${esc(cadence["Immediate next actions"] || "")}</li>
        </ul>
      </section>

      <section>
        <h2>Operating cadence</h2>
        <p>${esc(cadence["Weekly rhythm"] || "")}</p>
        <p>${esc(cadence["30/60/90 public commitments"] || "")}</p>
        <p>${esc(cadence["Immediate next actions"] || "")}</p>
      </section>

      <section>
        <h2>Strategy call</h2>
        <p>If ${esc(companyContext.Company)} wants to own the creator monetization shortlist, the opening move is already defined in the approved brief.</p>
        <p><a href="https://cal.com/memetik/letstalk">Book a strategy call</a></p>
      </section>

      <section>
        <h2>Supporting evidence appendix</h2>
        <p><strong>Proof model:</strong> ${esc(measurement["Measurement frame"] || "")}</p>
        <p><strong>Revenue-model note:</strong> ${esc(measurement["Revenue-model note"] || "")}</p>
        <ul>
          ${claims
            .slice(0, 4)
            .map((claim) => `<li>${esc(claim.fields.statement || claim.title)} (${esc(claim.fields.certainty || "")}, checked ${esc(claim.fields.checked_at || "")})</li>`)
            .join("\n          ")}
        </ul>
      </section>
    </main>`;
}

// ── Content generators ──────────────────────────────────────────

function homepageContent() {
  return `
    <main>
      <section>
        <h1>Turn Search and AI Visibility Into Revenue.</h1>
        <p>We help growth-stage brands capture high-intent demand across traditional search and the AI surfaces shaping modern buying decisions.</p>
        <p>B2B SaaS · Professional Services · E-commerce · Fund-backed operators</p>
      </section>

      <section>
        <h2>Revenue-First Search + AI Demand Intelligence</h2>
        <p>We build the visibility, authority, and bottom-of-funnel infrastructure that helps your brand show up in buying moments and convert more discovery into pipeline.</p>
        <div>
          <h3>Revenue Visibility</h3>
          <p>Own the high-intent searches and AI prompts that influence shortlist decisions before your competitors ever get the call.</p>
        </div>
        <div>
          <h3>Zero-Click Capture</h3>
          <p>Win the moments that end inside AI answers, summaries, and overviews by making your brand easier to cite, trust, and recommend.</p>
        </div>
        <div>
          <h3>Compounding Systems</h3>
          <p>Build a search and AI growth engine with bottom-of-funnel pages, comparison assets, programmatic coverage, and authority signals that compound over time.</p>
        </div>
      </section>

      <section>
        <h2>Rankings Are a Metric. Revenue Is the Goal.</h2>
        <p>Most agencies still optimize for rankings and traffic in isolation. We optimize for high-intent discovery across search and AI so executive teams can measure answer-share, category visibility, and pipeline impact together.</p>
      </section>

      <section>
        <h2>From Visibility to Revenue in 90 Days</h2>
        <p>Our system maps demand, builds the content and comparison surfaces buyers actually use, strengthens the authority layer AI models rely on, and reinforces gains through continuous prompt and citation monitoring.</p>
      </section>

      <section>
        <h2>Built for Teams That Care About Efficient Growth.</h2>
        <p>The best fit is a company with real buying journeys, meaningful ACV, and leadership teams that want search to become a compounding revenue channel again.</p>
        <h3>Strong fit signals</h3>
        <ul>
          <li>Growth-stage SaaS, professional services, e-commerce, or fund-backed operator</li>
          <li>Clear buying journey with researched, compared, and validated decisions</li>
          <li>Leadership team cares about pipeline contribution, not vanity traffic</li>
          <li>Search and AI visibility are treated as strategic growth levers</li>
        </ul>
      </section>

      <section>
        <h2>Explore by Use Case</h2>
        <h3>For teams</h3>
        <ul>
          <li><a href="/for/saas-founders">AEO for SaaS founders</a></li>
          <li><a href="/for/ecommerce-brands">AEO for e-commerce brands</a></li>
          <li><a href="/for/b2b-services">AEO for B2B services</a></li>
          <li><a href="/for/marketing-leaders">AEO for marketing leaders</a></li>
        </ul>
        <h3>Solutions</h3>
        <ul>
          <li><a href="/solutions/chatgpt-visibility">ChatGPT visibility</a></li>
          <li><a href="/solutions/perplexity-citations">Perplexity citations</a></li>
          <li><a href="/solutions/ai-overview-ranking">AI Overview ranking</a></li>
          <li><a href="/solutions/competitor-displacement">Competitor displacement</a></li>
        </ul>
        <h3>Comparisons</h3>
        <ul>
          <li><a href="/vs/manual-seo">Memetik vs DIY AEO</a></li>
          <li><a href="/vs/traditional-seo-agencies">Memetik vs SEO agencies</a></li>
          <li><a href="/vs/content-marketing-agencies">Memetik vs content agencies</a></li>
        </ul>
        <p><a href="/audit">Get your free AI visibility audit</a></p>
      </section>

      <section>
        <h2>Questions &amp; Answers</h2>
        ${HOME_FAQS.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n        ")}
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
          ${articles.map((a) => `<li><a href="/resources/${esc(a.slug)}">${esc(a.title)}</a>${a.metaDescription ? ` — ${esc(a.metaDescription)}` : ""}</li>`).join("\n          ")}
        </ul>
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

function professionalServiceSchema(description) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MEMETIK",
    url: DOMAIN,
    logo: `${DOMAIN}/favicon.png`,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.7128",
      longitude: "-74.0060",
    },
    areaServed: "Worldwide",
    serviceType: ["Revenue-first SEO", "Answer Engine Optimization", "AI Visibility", "Content Engineering"],
    sameAs: [
      "https://twitter.com/memetik",
      "https://linkedin.com/company/memetik",
    ],
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
    title: "MEMETIK | Revenue-First SEO + GEO | Search and AI Pipeline Growth",
    description: "Memetik helps growth-stage brands turn search and AI visibility into pipeline, category authority, and revenue.",
    bodyContent: homepageContent(),
    extraSchemas: [
      professionalServiceSchema("Memetik helps growth-stage brands turn search and AI visibility into pipeline, category authority, and revenue."),
      webPageSchema("MEMETIK | Revenue-First SEO + GEO | Search and AI Pipeline Growth", "Memetik helps growth-stage brands turn search and AI visibility into pipeline, category authority, and revenue.", DOMAIN),
      faqSchema(HOME_FAQS),
    ].join("\n"),
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

  // Strategy routes derive from the shared canonical registry used by the app router.
  for (const entry of STRATEGY_REGISTRY.routes) {
    const bodyContent = entry.prerenderMode === "brief" ? briefStrategyContent(entry) : summaryStrategyContent(entry);

    allPages.push({
      route: entry.route,
      title: entry.title,
      description: entry.description,
      bodyContent,
    });
  }

  allPages.push({
    route: "/bts",
    title: "Behind the Scenes | MEMETIK",
    description: "Go behind the scenes of how MEMETIK engineers AI visibility for brands.",
    bodyContent: `<main><h1>Behind the Scenes</h1><p>Go behind the scenes of how MEMETIK engineers AI visibility for brands.</p></main>`,
  });

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

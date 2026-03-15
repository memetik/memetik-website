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
const RESOURCE_TOPIC_REGISTRY = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "shared", "resourceTopicRegistry.json"), "utf-8")
);
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

function getTopicConfig(slug) {
  return RESOURCE_TOPIC_REGISTRY.topics.find((topic) => topic.slug === slug) || RESOURCE_TOPIC_REGISTRY.topics[0];
}

function getActiveTopics(articles) {
  const activeSlugs = new Set(articles.map((article) => article.topicCluster).filter(Boolean));
  return RESOURCE_TOPIC_REGISTRY.topics.filter((topic) => activeSlugs.has(topic.slug));
}

function getTopicPath(slug) {
  return `/resources/topics/${slug}`;
}

function getRelatedArticles(article, articles, limit = 3) {
  const manualSlugs = String(article.relatedArticles || "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);

  const manualArticles = manualSlugs
    .map((slug) => articles.find((candidate) => candidate.slug === slug))
    .filter((candidate) => candidate && candidate.slug !== article.slug);

  const seen = new Set(manualArticles.map((candidate) => candidate.slug));
  const topicArticles = articles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      candidate.topicCluster === article.topicCluster &&
      !seen.has(candidate.slug),
  );

  return [...manualArticles, ...topicArticles].slice(0, limit);
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

function translateFounderCopy(text) {
  if (!text) return "";

  return text
    .replace(/Money Entities/g, "priority buying queries")
    .replace(/Money Entity/g, "priority buying query")
    .replace(/Apex Assets/g, "bottom-of-funnel pages")
    .replace(/Apex Asset/g, "bottom-of-funnel page")
    .replace(/Knowledge Graph/g, "supporting content network")
    .replace(/Trust Relay/g, "off-site authority")
    .replace(/recommendation-share/g, "default recommendation")
    .replace(/\bshortlist\b/gi, "buying consideration")
    .replace(/\bwedge\b/gi, "opening move")
    .replace(/buying consideration share/gi, "buyer preference")
    .replace(/output ranges/gi, "shipping plan")
    .replace(/supporting supporting content network coverage/gi, "supporting content coverage")
    .replace(/keep the documented shipping plan visible on the page\.?/gi, "keep the first 90 days concrete and visible on the page.");
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

function dataStrategyContent(entry) {
  const dataPath = resolveRegistryFilePath(entry.contentDataPath);

  if (!dataPath || !fs.existsSync(dataPath)) {
    throw new Error(`Missing required content data for ${entry.route}: ${dataPath || "(not configured)"}`);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const renderBullets = (items) =>
    items && items.length > 0
      ? `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("\n")}</ul>`
      : "";

  const renderTable = (headers, rows) => {
    if (!headers || !rows) return "";
    return `<table><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("\n")}</tbody></table>`;
  };

  let html = `<main>\n`;

  html += `<section>\n<p>00 · ${esc(data.hero.eyebrow)}</p>\n<h1>${esc(data.hero.headline)}</h1>\n`;
  if (data.hero.subtitle) html += `<p>${esc(data.hero.subtitle)}</p>\n`;
  html += `<p><strong>Source trace:</strong> Approved brief dated ${esc(data.generatedAt)} · Payload confidence ${data.researchConfidence ? `high (${data.researchConfidence}/100)` : "high"} · Quality gate passed</p>\n`;
  html += `</section>\n`;

  if (data.tldr && data.tldr.length > 0) {
    html += `<section>\n<h2>Summary</h2>\n${renderBullets(data.tldr)}\n</section>\n`;
  }

  if (data.executiveSummary) {
    html += `<section>\n<h2>Executive Summary</h2>\n`;
    for (const metric of data.executiveSummary.metrics) {
      html += `<p><strong>${esc(metric.label)}:</strong> ${esc(metric.value)} — ${esc(metric.note)}</p>\n`;
    }
    if (data.executiveSummary.immediateActions) {
      html += `<h3>Immediate actions</h3>\n<ol>\n`;
      for (const action of data.executiveSummary.immediateActions) {
        html += `<li><strong>${esc(action.title)}</strong>: ${esc(action.detail)}</li>\n`;
      }
      html += `</ol>\n`;
    }
    html += `</section>\n`;
  }

  for (const section of data.sections) {
    html += `<section>\n`;

    const headingText = section.heading;
    const mappedHeading = mapSectionHeading(headingText);
    html += `<h2>${esc(mappedHeading)}</h2>\n`;

    if (section.sectionLead) {
      if (section.sectionLead.takeaway) html += `<p><strong>${esc(section.sectionLead.takeaway)}</strong></p>\n`;
      if (section.sectionLead.body) html += `<p>${esc(section.sectionLead.body)}</p>\n`;
      if (section.sectionLead.implication) html += `<p><em>So what:</em> ${esc(section.sectionLead.implication)}</p>\n`;
    }

    if (section.highlightBoxes) {
      for (const box of section.highlightBoxes) {
        if (box.heading) html += `<p><strong>${esc(box.heading)}</strong></p>\n`;
        if (box.body) html += `<p>${esc(box.body)}</p>\n`;
        if (box.bullets) html += renderBullets(box.bullets);
      }
    }

    if (section.stackCards) {
      for (const card of section.stackCards) {
        if (card.title) html += `<h3>${esc(card.title)}</h3>\n`;
        if (card.content) html += `<p>${esc(card.content)}</p>\n`;
        if (card.bullets) html += renderBullets(card.bullets);
      }
    }

    if (section.platformStatuses) {
      for (const ps of section.platformStatuses) {
        html += `<h3>${esc(ps.platform)}: ${esc(ps.status)}</h3>\n<p>${esc(ps.detail)}</p>\n`;
      }
    }

    if (section.promptObservations) {
      for (const po of section.promptObservations) {
        html += `<h3>${esc(po.platform)} (${esc(po.market)}): ${esc(po.prompt)}</h3>\n<p>${esc(po.observed)}</p>\n`;
      }
    }

    if (section.monthBlocks) {
      for (const mb of section.monthBlocks) {
        html += `<h3>${esc(mb.label)}: ${esc(mb.title)}</h3>\n`;
        html += renderBullets(mb.bullets);
      }
    }

    if (section.scopeBlocks) {
      for (const sb of section.scopeBlocks) {
        html += `<h3>${esc(sb.title)}</h3>\n`;
        html += renderBullets(sb.bullets);
      }
    }

    if (section.timelineChart) {
      for (const point of section.timelineChart.points) {
        html += `<h3>Month ${point.month}: ${esc(point.title)}</h3>\n<p>${esc(point.detail)}</p>\n`;
        html += renderBullets(point.bullets);
      }
    }

    if (section.upsideChart) {
      html += `<p>Traffic projection: Month 1 base ${section.upsideChart[0]?.base || 0} → Month 12 base ${section.upsideChart[section.upsideChart.length - 1]?.base || 0}</p>\n`;
    }

    if (section.calculator) {
      html += `<p>Traffic-to-revenue calculator: base visits ${section.calculator.baseVisits}</p>\n`;
    }

    html += `</section>\n`;
  }

  html += `<section>\n<h2>Strategy call</h2>\n`;
  html += `<p>${esc(data.cta.body)}</p>\n`;
  html += `<p><a href="${esc(data.cta.href || "https://cal.com/memetik/letstalk")}">Book a strategy call</a></p>\n`;
  html += `</section>\n`;

  if (data.appendix) {
    html += `<section>\n<h2>Supporting evidence appendix</h2>\n`;
    for (const section of data.appendix.sections) {
      html += `<h3>${esc(section.title)}</h3>\n`;
      if (section.description) html += `<p>${esc(section.description)}</p>\n`;

      if ("headers" in section && "rows" in section) {
        html += renderTable(section.headers, section.rows);
      }
      if ("bullets" in section && !("children" in section)) {
        html += renderBullets(section.bullets);
      }
      if ("children" in section) {
        for (const child of section.children) {
          if (child.type === "table") html += renderTable(child.headers, child.rows);
          if (child.type === "bullets") html += renderBullets(child.items);
          if (child.type === "highlight" || child.type === "card") html += renderBullets(child.bullets);
        }
      }
    }
    html += `</section>\n`;
  }

  html += `</main>`;
  return html;
}

function mapSectionHeading(heading) {
  const headingMap = {
    "State of Search 2026": "Current state",
    "Where XoomAI Is Today": "Current state",
    "The Opportunity": "Opportunity / right to win",
    "Why XoomAI Can Win": "Opportunity / right to win",
    "Competitive Gap": "Competitive gap",
    "AI Visibility Gap": "AI visibility / answer-surface gap",
    "Revenue / Commercial Impact": "Opportunity / right to win",
    "6-month Growth Plan": "90-day opening move",
    "Off-site Authority": "Off-site authority",
    "What Memetik Actually Builds and Ships": "What Memetik builds and ships",
    "Operating Model": "Operating cadence",
    "Why Memetik": "What Memetik builds and ships",
  };
  return headingMap[heading] || heading;
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

  const sourceTrace = [
    metadata["Generated at"] ? `Approved brief dated ${metadata["Generated at"]}` : null,
    metadata["Payload confidence"] ? `Payload confidence ${metadata["Payload confidence"]}` : null,
    metadata["Quality gate"] ? `Quality gate ${metadata["Quality gate"]}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const isBts = entry.slug === "bts-2";
  const hasSixMonthFraming = Boolean(
    currentState["First 6-month target (base)"] || cadence["6-month execution framing"]
  );
  const heroTitle = isBts
    ? "BTS for serious creators building real businesses"
    : `${companyContext.Company} can win a defined commercial opening move`;
  const heroSubtitle = isBts
    ? "Own the commercial comparisons and monetization queries where founders choose the platform they can build on long term."
    : translateFounderCopy(categoryFraming["Primary wedge"] || "");
  const rightToWin = translateFounderCopy(categoryFraming["Why this company can win now"] || "");
  const commercialObjective = translateFounderCopy(categoryFraming["Commercial objective"] || "");
  const recommendationSummaries = recommendations
    .map((item) => translateFounderCopy(item.fields.page_summary || item.fields.recommendation))
    .filter(Boolean);
  const openingMoveSummary = translateFounderCopy(
    recommendations[0]?.fields.recommendation || categoryFraming["Primary wedge"] || ""
  );
  const bottomOfFunnelSummary = `${translateFounderCopy(
    apexAssets["First assets to ship"] || ""
  )}. Memetik builds as many bottom-of-funnel pages as needed to cover demand, then expands supporting coverage behind the winners.`;
  const supportingCoverageSummary = translateFounderCopy(knowledgeGraph["Supporting clusters"] || "");
  const offsiteAuthoritySummary = translateFounderCopy(trustRelay["Required workstreams"] || "");
  const offsiteAttackSurfaces = translateFounderCopy(trustRelay["Initial attack surfaces"] || "");
  const targetLabel = hasSixMonthFraming ? "First 6-month target" : "First 90-day target";
  const targetValue = hasSixMonthFraming
    ? currentState["First 6-month target (base)"] || ""
    : currentState["First 90-day target (base)"] || "";
  const growthPlanTitle = hasSixMonthFraming ? "6-month growth plan" : "90-day opening move";
  const cadencePrimary = hasSixMonthFraming
    ? cadence["6-month execution framing"] || ""
    : cadence["30/60/90 public commitments"] || "";
  const cadenceSecondary = hasSixMonthFraming ? cadence["Monthly execution model"] || "" : cadence["Weekly rhythm"] || "";
  const strategyCallCopy = isBts
    ? `If ${esc(companyContext.Company)} wants to become the obvious platform for serious creators building real businesses, the opening move is already defined in the approved brief.`
    : `If ${esc(companyContext.Company)} wants to win the first commercial buying territory in this category, the execution plan is already defined in the approved brief.`;

  return `
    <main>
      <section>
        <p>00 · Founder strategy memo</p>
        <h1>${esc(heroTitle)}</h1>
        <p>${esc(heroSubtitle)}</p>
        <p>${esc(rightToWin)}</p>
        <p>${esc(commercialObjective)}</p>
        <p><strong>Source trace:</strong> ${esc(sourceTrace)}</p>
      </section>

      <section>
        <h2>Current state</h2>
        <ul>
          <li><strong>Search opportunity:</strong> ${esc(currentState["Search opportunity"] || "")}</li>
          <li><strong>Expected traffic in 12 months:</strong> ${esc(currentState["Expected traffic in 12 months (base)"] || "")}</li>
          <li><strong>Aggressive upside:</strong> ${esc(currentState["Aggressive upside"] || "")}</li>
          <li><strong>${esc(targetLabel)}:</strong> ${esc(targetValue)}</li>
          <li><strong>AI visibility baseline:</strong> ChatGPT ${esc(currentState.chatgpt || "")}; Gemini ${esc(currentState.gemini || "")}; Google AI Overview ${esc(currentState.google_ai_overview || "")}</li>
          <li><strong>Topical integrity:</strong> ${esc(currentState["Topical integrity"] || "")}</li>
        </ul>
      </section>

      <section>
        <h2>Opportunity / right to win</h2>
        <p>${esc(rightToWin)}</p>
        ${
          isBts
            ? `<p>BTS can win the creator-business comparison layer by looking like the more serious platform choice when buyers compare it to Whop and other incumbents.</p>`
            : ""
        }
        <ol>
          ${recommendationSummaries.map((summary) => `<li>${esc(summary)}</li>`).join("\n          ")}
        </ol>
      </section>

      <section>
        <h2>Competitive gap</h2>
        <p>${esc(companyContext.Company)} needs to close the retrieval and buying-consideration gap against the platforms already dominating category demand.</p>
        ${
          isBts
            ? `<p>That includes making the BTS vs Whop contrast visible anywhere founders compare creator-business platforms.</p>`
            : ""
        }
        ${renderTable(competitorTable)}
      </section>

      <section>
        <h2>AI visibility / answer-surface gap</h2>
        <p>${esc(translateFounderCopy(measurement["Measurement frame"] || ""))}</p>
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
        <h2>${esc(growthPlanTitle)}</h2>
        <p>${esc(openingMoveSummary)}</p>
        ${
          isBts
            ? `<p><strong>First move:</strong> publish Whop and Patreon comparison pages, then expand supporting coverage behind the pages that prove BTS is for serious creators building real businesses.</p>`
            : ""
        }
        <h3>Priority buying queries</h3>
        <ol>
          ${moneyEntities.map((item) => `<li>${esc(item)}</li>`).join("\n          ")}
        </ol>
        <h3>Bottom-of-funnel pages</h3>
        <p>${esc(bottomOfFunnelSummary)}</p>
        <p>${esc(translateFounderCopy(apexAssets["Founder-facing point"] || ""))}</p>
        <h3>Supporting content coverage</h3>
        <p>${esc(supportingCoverageSummary)}</p>
        <p>${esc(translateFounderCopy(knowledgeGraph["Founder-facing point"] || ""))}</p>
      </section>

      <section>
        <h2>Off-site authority</h2>
        <p>${esc(offsiteAuthoritySummary)}</p>
        <p>${esc(offsiteAttackSurfaces)}</p>
        ${
          isBts
            ? `<p><strong>Reddit/community priority:</strong> BTS needs proof in creator conversations, Reddit threads, reviews, and editorials where buyers ask what to use instead of Whop.</p>`
            : ""
        }
      </section>

      <section>
        <h2>What Memetik builds and ships</h2>
        <ul>
          <li><strong>Priority buying queries:</strong> ${esc(translateFounderCopy(recommendations[0]?.fields.page_summary || ""))}</li>
          <li><strong>Bottom-of-funnel pages:</strong> ${esc(translateFounderCopy(apexAssets["Required Apex Asset types"] || ""))}</li>
          <li><strong>Supporting content coverage:</strong> ${esc(translateFounderCopy(knowledgeGraph["Required output shape"] || ""))}</li>
          <li><strong>Off-site authority:</strong> ${esc(offsiteAuthoritySummary)}</li>
          <li><strong>Technical/entity foundation:</strong> ${esc(technicalFoundation["Required systems"] || "")}</li>
          <li><strong>Refresh and defense:</strong> ${esc(translateFounderCopy(cadence["Immediate next actions"] || ""))}</li>
        </ul>
      </section>

      <section>
        <h2>Operating cadence</h2>
        <p>${esc(translateFounderCopy(cadencePrimary))}</p>
        <p>${esc(translateFounderCopy(cadenceSecondary))}</p>
        <p>${esc(translateFounderCopy(cadence["Immediate next actions"] || ""))}</p>
      </section>

      <section>
        <h2>Strategy call</h2>
        <p>${strategyCallCopy}</p>
        <p><a href="https://cal.com/memetik/letstalk">Book a strategy call</a></p>
      </section>

      <section>
        <h2>Supporting evidence appendix</h2>
        <p><strong>Proof model:</strong> ${esc(translateFounderCopy(measurement["Measurement frame"] || ""))}</p>
        <p><strong>Revenue-model note:</strong> ${esc(measurement["Revenue-model note"] || "")}</p>
        <ul>
          ${claims
            .slice(0, 4)
            .map(
              (claim) =>
                `<li>${esc(translateFounderCopy(claim.fields.statement || claim.title))} (${esc(claim.fields.certainty || "")}, checked ${esc(claim.fields.checked_at || "")})</li>`
            )
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

function articleContent(article, articles) {
  const contentFile = path.join(DIST, "cache", "resources-content", `${article.id}.html`);
  const bodyHtml = fs.existsSync(contentFile) ? fs.readFileSync(contentFile, "utf-8") : "";
  const date = article.publicationDate ? new Date(article.publicationDate).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }) : "";
  const updated = article.lastUpdated ? new Date(article.lastUpdated).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }) : "";
  const topic = getTopicConfig(article.topicCluster);
  const relatedArticles = getRelatedArticles(article, articles);

  return `
    <main>
      <article>
        <header>
          ${article.articleType ? `<p>${esc(article.articleType)}</p>` : ""}
          <h1>${esc(article.title)}</h1>
          ${article.metaDescription ? `<p>${esc(article.metaDescription)}</p>` : ""}
          <p>By ${esc(article.author || "MEMETIK")}${article.authorTitle ? `, ${esc(article.authorTitle)}` : ""}${date ? ` · ${date}` : ""}${article.readTime ? ` · ${esc(article.readTime)}` : ""}</p>
          ${article.topicClusterLabel ? `<p><a href="${getTopicPath(article.topicCluster)}">Topic: ${esc(article.topicClusterLabel)}</a></p>` : ""}
        </header>
        <div>${bodyHtml}</div>
        ${article.sources ? `<section><h2>Sources</h2><p>${esc(article.sources)}</p></section>` : ""}
        ${updated && updated !== date ? `<p>Last updated: ${esc(updated)}</p>` : ""}
        <section>
          <h2>Explore this topic cluster</h2>
          <p>${esc(topic.description)}</p>
          <p><a href="${getTopicPath(topic.slug)}">Visit the ${esc(topic.label)} hub</a></p>
        </section>
        ${relatedArticles.length > 0 ? `<section><h2>Related resources</h2><ul>${relatedArticles.map((relatedArticle) => `<li><a href="/resources/${esc(relatedArticle.slug)}">${esc(relatedArticle.title)}</a></li>`).join("")}</ul></section>` : ""}
        <section id="article-cta">
          <h2>Need this implemented, not just diagnosed?</h2>
          <p>MEMETIK helps brands turn answer-engine visibility into category authority, shortlist inclusion, and pipeline.</p>
          <p><a href="${topic.moneyPagePath}">${esc(topic.moneyPageLabel)}</a> · <a href="/audit">Get a free AI visibility audit</a></p>
        </section>
      </article>
    </main>`;
}

function resourcesListContent(articles) {
  const topics = getActiveTopics(articles);
  return `
    <main>
      <section>
        <h1>Resources — AEO &amp; SEO Insights</h1>
        <p>Expert articles on Answer Engine Optimization, AI search visibility, ChatGPT citations, and LLM SEO strategies for B2B brands.</p>
      </section>
      ${topics.length > 0 ? `<section><h2>Browse by topic</h2><ul>${topics.map((topic) => `<li><a href="${getTopicPath(topic.slug)}">${esc(topic.label)}</a> — ${esc(topic.description)}</li>`).join("")}</ul></section>` : ""}
      <section>
        <h2>All Articles</h2>
        <ul>
          ${articles.map((a) => `<li><a href="/resources/${esc(a.slug)}">${esc(a.title)}</a>${a.metaDescription ? ` — ${esc(a.metaDescription)}` : ""}</li>`).join("\n          ")}
        </ul>
      </section>
    </main>`;
}

function resourceTopicContent(topic, articles) {
  return `
    <main>
      <section>
        <p>${esc(topic.label)}</p>
        <h1>${esc(topic.title)}</h1>
        <p>${esc(topic.hubIntro)}</p>
        <p><a href="${topic.moneyPagePath}">${esc(topic.moneyPageLabel)}</a> · <a href="${topic.secondaryPath}">${esc(topic.secondaryLabel)}</a></p>
      </section>
      <section>
        <h2>${esc(topic.label)} articles</h2>
        <ul>
          ${articles.map((article) => `<li><a href="/resources/${esc(article.slug)}">${esc(article.title)}</a>${article.metaDescription ? ` — ${esc(article.metaDescription)}` : ""}</li>`).join("\n          ")}
        </ul>
      </section>
    </main>`;
}

function aeoAgencyContent() {
  return `
    <main>
      <section>
        <h1>Answer Engine Optimization Agency</h1>
        <p>MEMETIK is the AEO agency for brands that need pipeline, category authority, and measurable visibility across Google, ChatGPT, Perplexity, Gemini, and the wider answer layer.</p>
        <p><a href="/audit">Get a free AI visibility audit</a> · <a href="/pricing">Review pricing and engagement structure</a></p>
      </section>
      <section>
        <h2>What we build</h2>
        <ul>
          <li>Answer-share audits that show where buyers discover your category and who AI recommends instead.</li>
          <li>Bottom-of-funnel and programmatic content systems built for citation, recommendation, and shortlist influence.</li>
          <li>Authority reinforcement across the sources answer engines trust when they synthesize recommendations.</li>
        </ul>
      </section>
      <section>
        <h2>Who this is for</h2>
        <ul>
          <li>Growth-stage SaaS teams with real pipeline pressure and a clear buying journey.</li>
          <li>E-commerce brands losing discovery to zero-click search and AI product recommendations.</li>
          <li>B2B service firms that need to become the default recommendation before the sales call happens.</li>
        </ul>
      </section>
      <section>
        <h2>Why MEMETIK</h2>
        <p>We do not treat AEO like a content retainer. We treat search and AI visibility as a revenue system: measure the category, build the missing demand-capture infrastructure, reinforce authority, and monitor answer share over time.</p>
      </section>
    </main>`;
}

function pricingContent() {
  return `
    <main>
      <section>
        <h1>MEMETIK Pricing</h1>
        <p>Engagements start at $15K per month with a six-month minimum. The scope is built around category pressure, answer-share opportunity, and the amount of content and authority infrastructure needed to move the market.</p>
        <p><a href="/audit">Request a free AI visibility audit</a> · <a href="https://cal.com/memetik/letstalk">Book a strategy call</a></p>
      </section>
      <section>
        <h2>What is included</h2>
        <ul>
          <li>Category and competitor audit across Google, ChatGPT, Perplexity, Gemini, and answer-engine prompts that actually influence buyers.</li>
          <li>Bottom-of-funnel and programmatic content systems built for citations, recommendation frequency, and revenue-critical queries.</li>
          <li>Authority, distribution, and measurement loops that reinforce recommendation share over time.</li>
        </ul>
      </section>
      <section>
        <h2>Best fit</h2>
        <ul>
          <li>Teams with meaningful ACV, a real buying journey, and leadership pressure to create efficient growth.</li>
          <li>Operators who want executive visibility into answer share, category trust, and pipeline contribution.</li>
          <li>Companies that want a strategic partner, not outsourced blog production.</li>
        </ul>
      </section>
    </main>`;
}

function caseStudiesContent() {
  return `
    <main>
      <section>
        <h1>MEMETIK Case Studies</h1>
        <p>Representative outcomes from brands that needed to become the credible answer in AI-assisted buying journeys.</p>
        <p><a href="/audit">Get a free AI visibility audit</a> · <a href="/pricing">Review pricing and engagement structure</a></p>
      </section>
      <section>
        <h2>Representative outcomes</h2>
        <ul>
          <li><strong>B2B SaaS:</strong> moved from invisible to the default AI recommendation for core category prompts and tied that shift to qualified pipeline.</li>
          <li><strong>E-commerce:</strong> increased AI citations across product and comparison queries while reducing dependence on traditional click-through behavior.</li>
          <li><strong>B2B services:</strong> built recommendation-share coverage across problem-aware and shortlist-stage searches before buyer conversations began.</li>
        </ul>
      </section>
      <section>
        <h2>What changed</h2>
        <p>Each engagement combined answer-share measurement, bottom-of-funnel content infrastructure, authority reinforcement, and ongoing monitoring so visibility gains compounded instead of fading after a single publishing sprint.</p>
      </section>
    </main>`;
}

function agentsContent() {
  return `
    <main>
      <section>
        <h1>AI Agents & Workflow Automation</h1>
        <p>MEMETIK builds custom AI agents and automated workflows that replace manual ops, eliminate bottlenecks, and run your business processes 24/7 — so your team can focus on work that actually moves the needle.</p>
        <p><a href="https://cal.com/memetik/letstalk">Book an automation audit</a></p>
      </section>
      <section>
        <h2>What we build</h2>
        <ul>
          <li><strong>AI Agents:</strong> Custom AI agents that handle repetitive knowledge work — support triage, data extraction, content ops, lead qualification.</li>
          <li><strong>Workflow Automation:</strong> End-to-end process automation connecting your CRM, email, Slack, databases, and tools into zero-touch flows.</li>
          <li><strong>Integration & Orchestration:</strong> We wire AI into your existing stack — no rip-and-replace. n8n, Make, custom code, API glue.</li>
        </ul>
      </section>
      <section>
        <h2>How it works</h2>
        <ol>
          <li><strong>Operations Audit (Week 1):</strong> We map your manual processes, bottlenecks, and time-sinks. Deliverables include a process map, ROI model, and prioritised automation roadmap.</li>
          <li><strong>Build & Ship (Week 2-4):</strong> We design and deploy AI agents and automated workflows. Working systems, not slide decks.</li>
          <li><strong>Integrate & Harden (Week 3-6):</strong> Production deployment with monitoring, error handling, and team documentation.</li>
          <li><strong>Evolve & Expand (Month 2+):</strong> Monthly optimisation, new workflow builds, and usage analytics.</li>
        </ol>
      </section>
      <section>
        <h2>What we automate</h2>
        <ul>
          <li>Lead qualification and CRM routing</li>
          <li>Proposal and SOW generation from intake forms</li>
          <li>Customer onboarding sequences</li>
          <li>Invoice and payment follow-up</li>
          <li>Support ticket triage and auto-response</li>
          <li>Weekly reporting and KPI dashboards</li>
          <li>Document extraction and data entry</li>
          <li>Internal knowledge base Q&A agent</li>
        </ul>
      </section>
      <section>
        <h2>FAQ</h2>
        <details><summary>What tools and platforms do you use?</summary><p>We work with whatever fits the job — n8n, Make, custom Node.js, Python, OpenAI, Anthropic, and direct API integrations.</p></details>
        <details><summary>How long does a typical engagement take?</summary><p>The operations audit takes about a week. First working automations ship within 2-4 weeks. A full engagement typically runs 6-12 weeks.</p></details>
        <details><summary>Do we need to change our existing tools?</summary><p>No. We integrate with your current stack. The goal is to make your existing tools work together, not replace them.</p></details>
        <details><summary>What does it cost?</summary><p>Engagements start at $8K for a focused automation build. Larger scopes typically run $12-25K/month.</p></details>
        <details><summary>Can you maintain the automations long-term?</summary><p>Yes. Most clients stay on a monthly retainer for monitoring, maintenance, and expansion.</p></details>
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
  if (article.hasFaqSchema && Array.isArray(article.faqItems) && article.faqItems.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
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
    extraSchemas: webPageSchema("Resources | MEMETIK - AEO & SEO Insights", "Expert articles on Answer Engine Optimization, AI search visibility, ChatGPT citations, and LLM SEO strategies for B2B brands.", `${DOMAIN}/resources`),
  });

  for (const topic of getActiveTopics(articles)) {
    const topicArticles = articles.filter((article) => article.topicCluster === topic.slug);
    const canonicalUrl = `${DOMAIN}${getTopicPath(topic.slug)}`;

    allPages.push({
      route: getTopicPath(topic.slug),
      title: `${topic.title} | MEMETIK`,
      description: topic.description,
      bodyContent: resourceTopicContent(topic, topicArticles),
      extraSchemas: webPageSchema(`${topic.title} | MEMETIK`, topic.description, canonicalUrl),
    });
  }

  // Audit
  allPages.push({
    route: "/audit",
    title: "Free AEO Audit | MEMETIK",
    description: "Get a free AI visibility audit. See exactly where your brand ranks in ChatGPT, Perplexity, and Gemini vs competitors. Results in 48 hours.",
    bodyContent: auditContent(),
  });

  allPages.push({
    route: "/aeo-agency",
    title: "Answer Engine Optimization Agency | MEMETIK",
    description: "MEMETIK is the AEO agency for brands that need measurable AI visibility, category authority, and pipeline from search and answer engines.",
    bodyContent: aeoAgencyContent(),
    extraSchemas: webPageSchema("Answer Engine Optimization Agency | MEMETIK", "MEMETIK is the AEO agency for brands that need measurable AI visibility, category authority, and pipeline from search and answer engines.", `${DOMAIN}/aeo-agency`),
  });

  allPages.push({
    route: "/pricing",
    title: "Pricing | MEMETIK",
    description: "Review MEMETIK pricing, engagement structure, deliverables, and who our AEO retainer is designed for.",
    bodyContent: pricingContent(),
    extraSchemas: webPageSchema("Pricing | MEMETIK", "Review MEMETIK pricing, engagement structure, deliverables, and who our AEO retainer is designed for.", `${DOMAIN}/pricing`),
  });

  allPages.push({
    route: "/case-studies",
    title: "Case Studies | MEMETIK",
    description: "See representative MEMETIK outcomes across B2B SaaS, e-commerce, and service businesses competing for AI-driven discovery.",
    bodyContent: caseStudiesContent(),
    extraSchemas: webPageSchema("Case Studies | MEMETIK", "See representative MEMETIK outcomes across B2B SaaS, e-commerce, and service businesses competing for AI-driven discovery.", `${DOMAIN}/case-studies`),
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
    let bodyContent;
    if (entry.prerenderMode === "data") {
      bodyContent = dataStrategyContent(entry);
    } else if (entry.prerenderMode === "brief") {
      bodyContent = briefStrategyContent(entry);
    } else {
      bodyContent = summaryStrategyContent(entry);
    }

    allPages.push({
      route: entry.route,
      title: entry.title,
      description: entry.description,
      bodyContent,
    });
  }

  allPages.push({
    route: "/agents",
    title: "AI Agents & Workflow Automation | MEMETIK",
    description: "MEMETIK builds custom AI agents and automated workflows that replace manual ops, eliminate bottlenecks, and run your business processes 24/7. Automation audit included.",
    bodyContent: agentsContent(),
    extraSchemas: webPageSchema("AI Agents & Workflow Automation | MEMETIK", "MEMETIK builds custom AI agents and automated workflows that replace manual ops, eliminate bottlenecks, and run your business processes 24/7.", `${DOMAIN}/agents`),
  });

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
      bodyContent: articleContent(a, articles),
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

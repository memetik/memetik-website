#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const resourceTopicRegistry = require("../shared/resourceTopicRegistry.json");
const strategyRouteRegistry = require("../shared/strategyRouteRegistry.json");

const CACHE_DIR = path.join(__dirname, "..", "client", "public", "cache");
const ARTICLES_CACHE = path.join(CACHE_DIR, "resources-articles.json");
const CONTENT_CACHE_DIR = path.join(CACHE_DIR, "resources-content");

const PLACEHOLDER_TARGETS = new Set(["#", "#cta", "#final-cta", "#calculator-cta"]);

const STATIC_ROUTES = new Set([
  "/",
  "/audit",
  "/resources",
  "/pricing",
  "/case-studies",
  "/aeo-agency",
  "/bts",
  "/strategy",
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
]);

for (const route of strategyRouteRegistry.routes || []) {
  STATIC_ROUTES.add(route.route);
}

for (const topic of resourceTopicRegistry.topics || []) {
  STATIC_ROUTES.add(`/resources/topics/${topic.slug}`);
}

function normalizeHref(href) {
  const raw = String(href || "").trim();
  if (!raw) return null;

  if (/^(mailto:|tel:|javascript:)/i.test(raw)) return null;

  if (PLACEHOLDER_TARGETS.has(raw.toLowerCase())) {
    return { type: "placeholder", value: raw };
  }

  if (raw.startsWith("#")) {
    return { type: "anchor", value: raw };
  }

  let candidate = raw;
  if (/^https?:\/\//i.test(candidate)) {
    try {
      const url = new URL(candidate);
      if (!/memetik\.ai$/i.test(url.hostname)) return null;
      candidate = `${url.pathname}${url.search || ""}${url.hash || ""}`;
    } catch {
      return { type: "invalid", value: raw };
    }
  }

  const withoutHash = candidate.split("#")[0].split("?")[0] || "/";
  const normalized = withoutHash === "/" ? "/" : withoutHash.replace(/\/+$/, "");
  return { type: "route", value: fallbackInternalRoute(normalized || "/") };
}

function fallbackInternalRoute(normalizedPath) {
  if (normalizedPath.startsWith("/resources/")) return "/resources";
  if (/(audit|assessment|report|check|analysis)/i.test(normalizedPath)) return "/audit";
  if (/(contact|demo|get-started|trial|strategy-call|strategy-session|setup-call|consultation|session|book|support)/i.test(normalizedPath)) return "/audit";
  if (/(pricing|price|cost|calculator|roi|guarantee|contract|performance)/i.test(normalizedPath)) return "/pricing";
  if (/case|proof/i.test(normalizedPath)) return "/case-studies";
  if (/chatgpt/i.test(normalizedPath)) return "/solutions/chatgpt-visibility";
  if (/perplexity/i.test(normalizedPath)) return "/solutions/perplexity-citations";
  if (/(ai-overview|ai-overviews|google-ai|google ai|sge)/i.test(normalizedPath)) return "/solutions/ai-overview-ranking";
  if (/zero-click/i.test(normalizedPath)) return "/resources/topics/zero-click-search";
  if (/(traffic|attribution)/i.test(normalizedPath)) return "/resources/topics/traffic-recovery";
  if (/(agency|aeo|answer-engine|ai-citation|citation|llm|schema|programmatic|methodology|workflow|guide|template|content|seo|knowledge-panel|dark-funnel|conversational-keyword-research|platform|visibility)/i.test(normalizedPath)) {
    return "/resources/topics/ai-visibility";
  }
  if (/link/i.test(normalizedPath)) return "/audit";
  return normalizedPath;
}

function main() {
  console.log("Linting article links...");

  if (!fs.existsSync(ARTICLES_CACHE) || !fs.existsSync(CONTENT_CACHE_DIR)) {
    console.log("  Skipped: article cache not found");
    return;
  }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_CACHE, "utf-8"));
  const knownRoutes = new Set(STATIC_ROUTES);

  for (const article of articles) {
    knownRoutes.add(`/resources/${article.slug}`);
  }

  const failures = [];

  for (const article of articles) {
    const contentPath = path.join(CONTENT_CACHE_DIR, `${article.id}.html`);
    if (!fs.existsSync(contentPath)) {
      failures.push(`${article.slug}: missing content HTML cache`);
      continue;
    }

    const html = fs.readFileSync(contentPath, "utf-8");
    const hrefMatches = html.matchAll(/href="([^"]+)"/g);

    for (const match of hrefMatches) {
      const normalized = normalizeHref(match[1]);
      if (!normalized || normalized.type === "anchor") continue;
      if (normalized.type === "placeholder") {
        failures.push(`${article.slug}: placeholder link ${normalized.value}`);
        continue;
      }
      if (normalized.type === "invalid") {
        failures.push(`${article.slug}: invalid link ${normalized.value}`);
        continue;
      }
      if (!knownRoutes.has(normalized.value)) {
        failures.push(`${article.slug}: missing internal route ${normalized.value}`);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`  Found ${failures.length} broken internal links:`);
    for (const failure of failures.slice(0, 120)) {
      console.error(`   - ${failure}`);
    }
    process.exit(1);
  }

  console.log(`  OK: checked ${articles.length} articles`);
}

main();

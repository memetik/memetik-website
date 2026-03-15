#!/usr/bin/env node

/**
 * Migrate existing strategy page TSX files to data-driven JSON + thin wrapper.
 *
 * Usage:
 *   node scripts/migrate-strategy-pages.cjs --slug kinso
 *   node scripts/migrate-strategy-pages.cjs --all
 *   node scripts/migrate-strategy-pages.cjs --all --dry-run
 */

const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const { URL } = require("url");

const REPO_ROOT = path.join(__dirname, "..");
const PAGES_DIR = path.join(REPO_ROOT, "client", "src", "pages");
const STRATEGY_DIR = path.join(PAGES_DIR, "strategy");
const DATA_DIR = path.join(REPO_ROOT, "data", "strategy-content");
const REGISTRY_PATH = path.join(REPO_ROOT, "shared", "strategyRouteRegistry.json");
const SCHEMA_PATH = path.join(REPO_ROOT, "shared", "strategyContentSchema.ts");

const DEFAULT_BASE_URL = "http://127.0.0.1:8327/v1";
const BASE_URL = process.env.OPENAI_BASE_URL || DEFAULT_BASE_URL;
const API_KEY = process.env.OPENAI_API_KEY || "dummy";
const MODEL = process.env.STRATEGY_MODEL || "gpt-5.4(high)";

const BANNED_TERMS = [
  "Foundation Assets", "AI share of voice", "pSEO", "programmatic SEO",
  "Apex Assets", "Knowledge Graph", "Trust Relay", "recommendation-share",
  "shortlist", "wedge", "8–12", "8-12", "Dream 100", "dream 100", "Dream100"
];

const LEGACY_PAGE_MAP = {
  bts: { file: "StrategyBTS.tsx", dir: PAGES_DIR },
  "signify-ip": { file: "StrategySignifyIP.tsx", dir: PAGES_DIR },
  uleads: { file: "StrategyUleads.tsx", dir: PAGES_DIR },
};

function getPagePath(slug) {
  if (LEGACY_PAGE_MAP[slug]) {
    return path.join(LEGACY_PAGE_MAP[slug].dir, LEGACY_PAGE_MAP[slug].file);
  }
  return path.join(STRATEGY_DIR, `${pascalCase(slug)}.tsx`);
}

function pascalCase(slug) {
  return slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}

async function requestModel(systemPrompt, userPrompt) {
  const endpoint = `${BASE_URL.replace(/\/$/, "")}/chat/completions`;
  const body = JSON.stringify({
    model: MODEL,
    max_tokens: 16000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return new Promise((resolve, reject) => {
    const url = new URL(endpoint);
    const transport = url.protocol === "https:" ? https : http;
    const req = transport.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed?.error) return reject(new Error(parsed.error.message));
          const content = parsed?.choices?.[0]?.message?.content || parsed?.output_text;
          if (!content) return reject(new Error("No content in response"));
          resolve(content);
        } catch (e) {
          reject(new Error(`Parse error: ${data.slice(0, 300)}`));
        }
      });
    });
    req.setTimeout(600000, () => req.destroy(new Error("Timeout")));
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function extractContentJson(slug, tsxContent) {
  const schema = fs.existsSync(SCHEMA_PATH) ? fs.readFileSync(SCHEMA_PATH, "utf-8") : "";

  const systemPrompt = `You are a data extraction engine. Extract ALL visible content from the given React TSX strategy page into a structured JSON object matching the StrategyContentData TypeScript schema.

SCHEMA:
${schema}

RULES:
1. Output ONLY valid JSON. No markdown fences, no explanation.
2. Extract every piece of visible text: hero, section headers, section leads, stack cards, highlight boxes, bullet lists, data tables, platform statuses, prompt observations, month blocks, scope blocks, chart data points, timeline data, milestones, calculator config, appendix sections, and CTA.
3. Map Lucide icon component names to string names (Search, TrendingUp, Target, etc.).
4. Include a "tldr" field with 6-8 bullet points summarising key findings and recommendations.
5. Translate internal terms to public equivalents: "Apex Assets" -> "bottom-of-funnel pages", "Knowledge Graph" -> "supporting content network", "Trust Relay" -> "off-site authority", "Money Entities" -> "priority buying queries", "recommendation-share" -> "default recommendation", "shortlist" -> "buying consideration", "wedge" -> "opening move".
6. Do NOT include these banned terms in the output: ${JSON.stringify(BANNED_TERMS)}.
7. For data arrays defined as const at the top of the file (e.g., upsidePoints, timelinePoints, timelineMilestones, executiveMetrics, immediateActions), extract their exact values.
8. For formatted numbers using formatWhole(), extract the raw number from the const definition, not the formatted string.
9. The JSON must be complete enough to render the full page identically from data alone.
10. Set the generatedAt field to today's date.
11. Match the section structure exactly as it appears in the TSX render tree.`;

  const userPrompt = `Extract all content from this strategy page TSX into StrategyContentData JSON.

SLUG: ${slug}

TSX:
${tsxContent}`;

  let result = await requestModel(systemPrompt, userPrompt);
  if (result.startsWith("```")) {
    result = result.replace(/^```(?:json)?\n/, "").replace(/\n```$/, "");
  }

  const parsed = JSON.parse(result);
  if (!parsed.slug) parsed.slug = slug;

  for (const term of BANNED_TERMS) {
    const json = JSON.stringify(parsed);
    if (json.includes(term)) {
      console.warn(`  WARNING: Banned term "${term}" found in extracted JSON for ${slug}. Manual review needed.`);
    }
  }

  return parsed;
}

function updateRegistry(slug, contentDataPath) {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
  const entry = registry.routes.find((r) => r.slug === slug);
  if (entry) {
    entry.prerenderMode = "data";
    entry.contentDataPath = path.relative(REPO_ROOT, contentDataPath);
    if (entry.briefPath) delete entry.briefPath;
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
    console.log(`  Registry updated: ${slug} -> data mode`);
  }
}

function writeThinWrapper(slug) {
  const wrapperContent = `import StrategyPageTemplate from "@/components/strategy/StrategyPageTemplate";

export default function Strategy${pascalCase(slug)}() {
  return <StrategyPageTemplate slug="${slug}" />;
}
`;

  const outPath = path.join(STRATEGY_DIR, `${pascalCase(slug)}.tsx`);
  fs.writeFileSync(outPath, wrapperContent);
  console.log(`  Thin wrapper written: ${outPath}`);
  return outPath;
}

async function migratePage(slug, dryRun = false) {
  console.log(`\nMigrating ${slug}...`);

  const pagePath = getPagePath(slug);
  if (!fs.existsSync(pagePath)) {
    console.error(`  Page not found: ${pagePath}`);
    return false;
  }

  const tsxContent = fs.readFileSync(pagePath, "utf-8");
  console.log(`  Source: ${pagePath} (${tsxContent.split("\n").length} lines)`);

  if (dryRun) {
    console.log(`  [DRY RUN] Would extract content JSON, write thin wrapper, update registry`);
    return true;
  }

  const data = await extractContentJson(slug, tsxContent);
  const jsonPath = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`  Content JSON written: ${jsonPath}`);

  updateRegistry(slug, jsonPath);

  // For legacy pages in the root pages/ dir, write the wrapper to strategy/ dir
  // and the old file stays as-is (we don't delete it yet in case App.tsx still imports it)
  if (LEGACY_PAGE_MAP[slug]) {
    writeThinWrapper(slug);
    console.log(`  NOTE: Legacy page at ${pagePath} is still imported by App.tsx.`);
    console.log(`  After verifying, update App.tsx to import from strategy/${pascalCase(slug)}.tsx and delete the legacy file.`);
  } else {
    // Back up original
    const backupPath = pagePath + ".bak";
    fs.copyFileSync(pagePath, backupPath);
    console.log(`  Backup: ${backupPath}`);
    writeThinWrapper(slug);
  }

  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const all = args.includes("--all");
  const slugIndex = args.indexOf("--slug");

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));

  if (all) {
    const slugsToMigrate = registry.routes
      .filter((r) => r.prerenderMode !== "data")
      .map((r) => r.slug);

    console.log(`Migrating ${slugsToMigrate.length} pages: ${slugsToMigrate.join(", ")}`);

    let success = 0;
    let fail = 0;
    for (const slug of slugsToMigrate) {
      try {
        const ok = await migratePage(slug, dryRun);
        if (ok) success++;
        else fail++;
      } catch (error) {
        console.error(`  FAILED: ${slug}: ${error.message}`);
        fail++;
      }
    }

    console.log(`\nDone: ${success} migrated, ${fail} failed`);
  } else if (slugIndex >= 0) {
    const slug = args[slugIndex + 1];
    if (!slug) {
      console.error("Usage: node scripts/migrate-strategy-pages.cjs --slug <slug>");
      process.exit(1);
    }
    await migratePage(slug, dryRun);
  } else {
    console.log("Usage:");
    console.log("  node scripts/migrate-strategy-pages.cjs --slug <slug>");
    console.log("  node scripts/migrate-strategy-pages.cjs --all");
    console.log("  node scripts/migrate-strategy-pages.cjs --all --dry-run");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

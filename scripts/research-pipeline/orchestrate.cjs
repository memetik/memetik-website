/**
 * Research-only orchestrator.
 * 
 * This script handles the MECHANICAL part: calling DataForSEO APIs to gather
 * research data for each dream client company.
 * 
 * The INTELLIGENT part (analyzing research, building the strategy page, deploying)
 * is handled by the strategy-builder droid at .factory/droids/strategy-builder.md
 * 
 * Workflow:
 *   1. Run this script to generate research data → /data/research/{slug}.json
 *   2. Ask droid: "Use the strategy-builder subagent to build a strategy page for linear"
 *   3. The droid reads the research, studies existing pages, builds the TSX, adds routing,
 *      type-checks, fixes errors, and commits.
 */

const fs = require("fs");
const path = require("path");
const { runResearch } = require("./index.cjs");

async function main() {
  const args = process.argv.slice(2);
  const clientsPath = path.join(__dirname, "..", "..", "data", "dream-clients.json");
  const clients = JSON.parse(fs.readFileSync(clientsPath, "utf-8"));

  if (args.includes("--company")) {
    const companyName = args[args.indexOf("--company") + 1];
    const company = clients.find(
      (c) => c.name.toLowerCase() === companyName.toLowerCase() || c.slug === companyName.toLowerCase()
    );
    if (!company) {
      console.error(`Company "${companyName}" not found in dream-clients.json`);
      process.exit(1);
    }
    await runResearch(company);
    console.log(`\nResearch complete. Now ask droid:`);
    console.log(`  "Use the strategy-builder subagent to build a strategy page for ${company.slug}"`);
  } else if (args.includes("--batch")) {
    const startIdx = args.includes("--start") ? parseInt(args[args.indexOf("--start") + 1]) : 0;
    const limit = args.includes("--limit") ? parseInt(args[args.indexOf("--limit") + 1]) : clients.length;
    const batch = clients.slice(startIdx, startIdx + limit);

    console.log(`\nResearching ${batch.length} companies (starting at index ${startIdx})...\n`);

    const results = { success: [], failed: [] };
    for (const company of batch) {
      try {
        await runResearch(company);
        results.success.push(company.name);
      } catch (e) {
        console.error(`  FAILED: ${company.name} — ${e.message}`);
        results.failed.push(company.name);
      }
      await new Promise((r) => setTimeout(r, 3000));
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log("RESEARCH COMPLETE");
    console.log(`  Success: ${results.success.length} — ${results.success.join(", ")}`);
    console.log(`  Failed:  ${results.failed.length} — ${results.failed.join(", ")}`);
    console.log(`${"=".repeat(60)}`);
    console.log(`\nNow ask droid to build strategy pages for each company.`);
  } else {
    console.log("Dream Client Research Pipeline");
    console.log("==============================");
    console.log("");
    console.log("Step 1 — Run research (this script):");
    console.log('  node scripts/research-pipeline/orchestrate.cjs --company "Linear"');
    console.log("  node scripts/research-pipeline/orchestrate.cjs --batch");
    console.log("  node scripts/research-pipeline/orchestrate.cjs --batch --start 10 --limit 5");
    console.log("");
    console.log("Step 2 — Build strategy page (droid):");
    console.log('  Ask droid: "Use the strategy-builder subagent to build a strategy page for linear"');
    console.log("");
    console.log("Environment variables required (in .env):");
    console.log("  DATAFORSEO_LOGIN      — DataForSEO API login");
    console.log("  DATAFORSEO_PASSWORD   — DataForSEO API password");
    console.log("");
    console.log(`Companies loaded: ${clients.length}`);
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});

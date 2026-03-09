/**
 * End-to-end orchestrator.
 *
 * Supports:
 *   - research only
 *   - research + strategy generation in one command
 *   - strict/fast research mode
 */

const fs = require("fs");
const path = require("path");
const { runResearch } = require("./index.cjs");
const { generateStrategyPage } = require("./generate-strategy.cjs");

function parseArg(args, name, fallback = null) {
  if (!args.includes(name)) return fallback;
  const value = args[args.indexOf(name) + 1];
  return value ?? fallback;
}

async function runOne(company, opts) {
  const startedAt = Date.now();
  const research = await runResearch(company);

  let generated = null;
  if (opts.generate) {
    generated = await generateStrategyPage(company, research);
  }

  const totalMs = Date.now() - startedAt;
  return { research, generated, totalMs };
}

async function main() {
  const args = process.argv.slice(2);
  const mode = parseArg(args, "--mode", "strict");
  const generate = args.includes("--generate");

  process.env.RESEARCH_MODE = mode;

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

    const result = await runOne(company, { generate });
    console.log(`\n${"=".repeat(60)}`);
    console.log(`COMPLETE: ${company.slug}`);
    console.log(`Mode: ${mode}`);
    console.log(`Research output: data/research/${company.slug}.json`);
    if (result.generated) {
      console.log(`Strategy page: client/src/pages/strategy/${result.generated.fileName}`);
      if (result.generated.contentDraftPath) {
        console.log(`Content drafts (Obsidian): ${result.generated.contentDraftPath}`);
      }
      if (result.generated.repoContentDraftPath) {
        console.log(
          `Content drafts (repo): ${path.relative(path.join(__dirname, "..", ".."), result.generated.repoContentDraftPath)}`
        );
      }
      console.log(`Route reminder: /strategy/${company.slug}`);
    }
    console.log(`Total runtime: ${(result.totalMs / 1000).toFixed(1)}s`);
    console.log(`${"=".repeat(60)}`);
  } else if (args.includes("--batch")) {
    const startIdx = Number(parseArg(args, "--start", 0));
    const limit = Number(parseArg(args, "--limit", clients.length));
    const batch = clients.slice(startIdx, startIdx + limit);

    console.log(
      `\nRunning ${batch.length} companies (starting at index ${startIdx}) [mode=${mode}, generate=${generate}]...\n`
    );

    const results = { success: [], failed: [] };
    for (const company of batch) {
      try {
        const result = await runOne(company, { generate });
        console.log(
          `  OK ${company.slug} (${(result.totalMs / 1000).toFixed(1)}s)${
            result.generated ? " + strategy" : ""
          }`
        );
        results.success.push(company.name);
      } catch (e) {
        console.error(`  FAILED: ${company.name} — ${e.message}`);
        results.failed.push(company.name);
      }
      await new Promise((r) => setTimeout(r, 3000));
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log("RUN COMPLETE");
    console.log(`  Success: ${results.success.length} — ${results.success.join(", ")}`);
    console.log(`  Failed:  ${results.failed.length} — ${results.failed.join(", ")}`);
    console.log(`${"=".repeat(60)}`);
  } else {
    console.log("Dream Client Research + Strategy Orchestrator");
    console.log("============================================");
    console.log("");
    console.log("Research only:");
    console.log('  node scripts/research-pipeline/orchestrate.cjs --company "Kinso" --mode strict');
    console.log("");
    console.log("Research + generation:");
    console.log(
      '  node scripts/research-pipeline/orchestrate.cjs --company "Kinso" --mode strict --generate'
    );
    console.log("");
    console.log("Batch:");
    console.log(
      "  node scripts/research-pipeline/orchestrate.cjs --batch --start 0 --limit 5 --mode strict --generate"
    );
    console.log("");
    console.log("Environment variables:");
    console.log("  DATAFORSEO_LOGIN      — DataForSEO API login");
    console.log("  DATAFORSEO_PASSWORD   — DataForSEO API password");
    console.log("  OPENAI_BASE_URL       — optional Vibe proxy base URL override (default: Factory/Vibe config or http://127.0.0.1:8317/v1)");
    console.log("  OPENAI_API_KEY        — optional Vibe proxy key placeholder (default: dummy)");
    console.log("  STRATEGY_MODEL        — optional model name override (default: gpt-5.4(high))");
    console.log("");
    console.log(`Companies loaded: ${clients.length}`);
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});

const https = require("https");
const fs = require("fs");
const path = require("path");

const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;

function dfRequest(endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const auth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString("base64");
    const options = {
      hostname: "api.dataforseo.com",
      path: endpoint,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
        "Content-Length": Buffer.byteLength(data),
      },
    };
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body.slice(0, 500)}`));
        }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function psiRequest(url) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile`;
    https.get(apiUrl, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error("Failed to parse PSI response"));
        }
      });
    }).on("error", reject);
  });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function discoverCompetitors(domain) {
  console.log(`  [1/6] Discovering competitors for ${domain}...`);
  try {
    const res = await dfRequest("/v3/dataforseo_labs/google/competitors_domain/live", [
      { target: domain, location_code: 2840, language_code: "en", limit: 10 },
    ]);
    const items = res?.tasks?.[0]?.result?.[0]?.items || [];
    return items.map((item) => ({
      domain: item.domain,
      avgPosition: item.avg_position,
      intersections: item.se_keywords,
      estimatedTraffic: item.etv,
    }));
  } catch (e) {
    console.error("    Competitor discovery failed:", e.message);
    return [];
  }
}

async function getDomainMetrics(domain) {
  console.log(`  [2/6] Getting domain metrics for ${domain}...`);
  try {
    const res = await dfRequest("/v3/dataforseo_labs/google/domain_rank_overview/live", [
      { target: domain, location_code: 2840, language_code: "en" },
    ]);
    const data = res?.tasks?.[0]?.result?.[0]?.items?.[0] || {};
    return {
      organicTraffic: data.etv || 0,
      organicKeywords: data.se_keywords || 0,
      paidTraffic: data.paid_etv || 0,
      paidKeywords: data.paid_se_keywords || 0,
      backlinks: data.backlinks || 0,
      referringDomains: data.referring_domains || 0,
    };
  } catch (e) {
    console.error("    Domain metrics failed:", e.message);
    return {};
  }
}

async function getKeywordAnalysis(domain) {
  console.log(`  [3/6] Analyzing keywords for ${domain}...`);
  try {
    const res = await dfRequest("/v3/dataforseo_labs/google/ranked_keywords/live", [
      {
        target: domain,
        location_code: 2840,
        language_code: "en",
        limit: 50,
        order_by: ["keyword_data.keyword_info.search_volume,desc"],
        filters: ["keyword_data.keyword_info.search_volume", ">", 100],
      },
    ]);
    const items = res?.tasks?.[0]?.result?.[0]?.items || [];
    return items.map((item) => ({
      keyword: item.keyword_data?.keyword,
      volume: item.keyword_data?.keyword_info?.search_volume,
      position: item.ranked_serp_element?.serp_item?.rank_absolute,
      cpc: item.keyword_data?.keyword_info?.cpc,
      competition: item.keyword_data?.keyword_info?.competition_level,
      url: item.ranked_serp_element?.serp_item?.url,
    }));
  } catch (e) {
    console.error("    Keyword analysis failed:", e.message);
    return [];
  }
}

async function getKeywordGaps(targetDomain, competitorDomains) {
  if (!competitorDomains.length) return [];
  console.log(`  [3b/6] Finding keyword gaps...`);
  try {
    const targets = {};
    targets["1"] = { target: targetDomain, target_type: "domain" };
    competitorDomains.slice(0, 3).forEach((d, i) => {
      targets[String(i + 2)] = { target: d, target_type: "domain" };
    });
    const res = await dfRequest("/v3/dataforseo_labs/google/domain_intersection/live", [
      {
        ...targets,
        location_code: 2840,
        language_code: "en",
        limit: 30,
        order_by: ["keyword_data.keyword_info.search_volume,desc"],
        intersections: { "2": true, "1": false },
      },
    ]);
    const items = res?.tasks?.[0]?.result?.[0]?.items || [];
    return items.map((item) => ({
      keyword: item.keyword_data?.keyword,
      volume: item.keyword_data?.keyword_info?.search_volume,
      competition: item.keyword_data?.keyword_info?.competition_level,
    }));
  } catch (e) {
    console.error("    Keyword gap analysis failed:", e.message);
    return [];
  }
}

async function checkAIVisibility(companyName, domain, category) {
  console.log(`  [4/6] Checking AI visibility for ${companyName}...`);
  const results = { mentionsByDomain: null, promptResults: [] };

  // LLM Mentions - check if the brand is mentioned in AI responses
  try {
    const res = await dfRequest("/v3/ai_optimization/llm_mentions/live", [
      {
        search_filter: { domain: domain },
        location_code: 2840,
        language_code: "en",
        limit: 10,
      },
    ]);
    results.mentionsByDomain = res?.tasks?.[0]?.result?.[0]?.items || [];
  } catch (e) {
    console.error("    LLM mentions check failed:", e.message);
  }

  // Generate category-specific prompts for live testing
  const categoryBase = category.split("/").pop().trim().toLowerCase();
  const prompts = [
    `best ${categoryBase} tools`,
    `best ${categoryBase} software`,
    `${companyName} alternatives`,
    `${companyName} vs`,
    `best ${categoryBase} for startups`,
    `best ${categoryBase} for enterprise`,
  ];

  // LLM Scraper - test live prompts across ChatGPT
  for (const prompt of prompts.slice(0, 4)) {
    try {
      const res = await dfRequest("/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced", [
        { prompt, tag: `${companyName}-research` },
      ]);
      const response = res?.tasks?.[0]?.result?.[0];
      if (response) {
        const text = JSON.stringify(response).toLowerCase();
        results.promptResults.push({
          query: prompt,
          platform: "chatgpt",
          clientMentioned: text.includes(companyName.toLowerCase()) || text.includes(domain.toLowerCase()),
          responsePreview: JSON.stringify(response).slice(0, 500),
        });
      }
      await sleep(2000);
    } catch (e) {
      console.error(`    LLM scraper failed for "${prompt}":`, e.message);
    }
  }

  return results;
}

async function auditWebsite(domain) {
  console.log(`  [5/6] Auditing website for ${domain}...`);
  const audit = { onPage: null, pageSpeed: null };

  try {
    const res = await dfRequest("/v3/on_page/instant_pages", [
      { url: `https://${domain}`, load_resources: true, enable_javascript: true },
    ]);
    const items = res?.tasks?.[0]?.result?.[0]?.items || [];
    if (items.length > 0) {
      const page = items[0];
      audit.onPage = {
        title: page.meta?.title,
        description: page.meta?.description,
        h1: page.meta?.htags?.h1,
        wordCount: page.meta?.content?.plain_text_word_count,
        internalLinks: page.meta?.internal_links_count,
        externalLinks: page.meta?.external_links_count,
        schemaTypes: page.meta?.schema_types || [],
        statusCode: page.status_code,
      };
    }
  } catch (e) {
    console.error("    On-page audit failed:", e.message);
  }

  try {
    const psi = await psiRequest(`https://${domain}`);
    const lighthouse = psi?.lighthouseResult;
    if (lighthouse) {
      audit.pageSpeed = {
        performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
        seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),
        lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue,
        cls: lighthouse.audits?.["cumulative-layout-shift"]?.displayValue,
        tbt: lighthouse.audits?.["total-blocking-time"]?.displayValue,
      };
    }
  } catch (e) {
    console.error("    PageSpeed check failed:", e.message);
  }

  return audit;
}

async function runResearch(company) {
  console.log(`\n========================================`);
  console.log(`Researching: ${company.name} (${company.domain})`);
  console.log(`========================================\n`);

  const outputDir = path.join(__dirname, "..", "..", "data", "research");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${company.slug}.json`);
  if (fs.existsSync(outputPath)) {
    console.log(`  Research already exists for ${company.slug}, skipping.`);
    return JSON.parse(fs.readFileSync(outputPath, "utf-8"));
  }

  // Step 1: Competitors
  const competitors = await discoverCompetitors(company.domain);
  await sleep(1000);

  // Step 2: Domain metrics for target
  const targetMetrics = await getDomainMetrics(company.domain);
  await sleep(1000);

  // Domain metrics for top competitors
  const competitorMetrics = [];
  for (const comp of competitors.slice(0, 5)) {
    const metrics = await getDomainMetrics(comp.domain);
    competitorMetrics.push({ ...comp, metrics });
    await sleep(500);
  }

  // Step 3: Keywords
  const rankedKeywords = await getKeywordAnalysis(company.domain);
  await sleep(1000);

  const competitorDomains = competitors.slice(0, 3).map((c) => c.domain);
  const keywordGaps = await getKeywordGaps(company.domain, competitorDomains);
  await sleep(1000);

  // Step 4: AI Visibility
  const aiVisibility = await checkAIVisibility(company.name, company.domain, company.category);
  await sleep(1000);

  // Step 5: Website Audit
  const websiteAudit = await auditWebsite(company.domain);

  // Step 6: Compile
  const research = {
    slug: company.slug,
    company: {
      name: company.name,
      domain: company.domain,
      category: company.category,
      industry: company.industry,
    },
    seoMetrics: targetMetrics,
    rankedKeywords,
    keywordGaps,
    competitors: competitorMetrics,
    aiVisibility,
    websiteAudit,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(outputPath, JSON.stringify(research, null, 2));
  console.log(`\n  Research saved to ${outputPath}`);
  return research;
}

async function main() {
  if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD) {
    console.error("Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD environment variables.");
    console.error("Set them in .env or export them before running this script.");
    process.exit(1);
  }

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
  } else if (args.includes("--batch")) {
    for (const company of clients) {
      try {
        await runResearch(company);
      } catch (e) {
        console.error(`  FAILED: ${company.name} — ${e.message}`);
      }
      await sleep(3000);
    }
  } else {
    console.log("Usage:");
    console.log('  node scripts/research-pipeline/index.cjs --company "Linear"');
    console.log("  node scripts/research-pipeline/index.cjs --batch");
  }
}

module.exports = { runResearch };
if (require.main === module) main();

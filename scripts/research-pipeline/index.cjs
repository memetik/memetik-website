const https = require("https");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;

const RESEARCH_MODE = (process.env.RESEARCH_MODE || "strict").toLowerCase();
const STRICT_MODE = RESEARCH_MODE !== "fast";
const PERFORMANCE_PROVIDER = (process.env.PERFORMANCE_PROVIDER || "lighthouse").toLowerCase();
const ALLOW_PSI_FALLBACK = process.env.ALLOW_PSI_FALLBACK === "true";

const QUALITY_THRESHOLDS = {
  competitors: Number(process.env.MIN_COMPETITORS || 3),
  keywords: Number(process.env.MIN_KEYWORDS || 10),
  prompts: Number(process.env.MIN_PROMPTS || 6),
};

const EXCLUDED_COMPETITOR_DOMAINS = new Set([
  "kinso.ai",
  "youtube.com",
  "reddit.com",
  "instagram.com",
  "facebook.com",
  "google.com",
  "linkedin.com",
  "apple.com",
  "x.com",
  "tiktok.com",
  "wikipedia.org",
]);

const PUBLISHER_COMPETITOR_DOMAINS = new Set([
  "medium.com",
  "substack.com",
  "forbes.com",
  "businessinsider.com",
  "zapier.com",
  "g2.com",
  "capterra.com",
  "getapp.com",
  "trustpilot.com",
]);

function nowIso() {
  return new Date().toISOString();
}

function elapsedMs(start) {
  return Date.now() - start;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeDomain(input) {
  if (!input) return null;
  try {
    const u = new URL(input.startsWith("http") ? input : `https://${input}`);
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return String(input).replace(/^www\./, "").toLowerCase();
  }
}

function execFileAsync(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(command, args, options, (error, stdout, stderr) => {
      if (error) {
        const err = new Error(`${error.message}\n${stderr || ""}`.trim());
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function isValidCompetitorDomain(domain, companyDomain) {
  const d = normalizeDomain(domain);
  if (!d) return false;
  if (d === normalizeDomain(companyDomain)) return false;
  if (EXCLUDED_COMPETITOR_DOMAINS.has(d)) return false;
  return true;
}

function isLikelyPublisherDomain(domain) {
  const d = normalizeDomain(domain);
  if (!d) return true;
  return PUBLISHER_COMPETITOR_DOMAINS.has(d);
}

function ensureDfSuccess(parsed, endpoint) {
  if (!parsed || typeof parsed !== "object") {
    throw new Error(`[${endpoint}] Empty DataForSEO response.`);
  }

  if (parsed.status_code !== 20000) {
    throw new Error(
      `[${endpoint}] DataForSEO status ${parsed.status_code}: ${parsed.status_message || "Unknown error"}`
    );
  }

  if (!Array.isArray(parsed.tasks) || parsed.tasks.length === 0) {
    throw new Error(`[${endpoint}] No tasks returned.`);
  }

  for (const task of parsed.tasks) {
    if (task?.status_code !== 20000) {
      throw new Error(
        `[${endpoint}] Task status ${task?.status_code}: ${task?.status_message || "Unknown task error"}`
      );
    }
  }
}

function summarizeDf(parsed) {
  const tasks = Array.isArray(parsed?.tasks) ? parsed.tasks : [];
  const firstTask = tasks[0] || null;
  const firstResult = firstTask?.result?.[0] || null;
  const itemCount = Array.isArray(firstResult?.items) ? firstResult.items.length : 0;
  return {
    status_code: parsed?.status_code,
    status_message: parsed?.status_message,
    time: parsed?.time,
    cost: parsed?.cost,
    tasks_count: parsed?.tasks_count,
    tasks_error: parsed?.tasks_error,
    first_task_status_code: firstTask?.status_code,
    first_task_status_message: firstTask?.status_message,
    first_result_items: itemCount,
  };
}

function pushDebug(debug, step, payload) {
  debug.steps.push({
    step,
    at: nowIso(),
    ...payload,
  });
}

function writeDebugFile(debugDir, slug, debug) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(debugDir, `${slug}-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify(debug, null, 2));
  return file;
}

function dfRequest(endpoint, body, debug, stepName) {
  return new Promise((resolve, reject) => {
    const requestStartedAt = Date.now();
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
      let responseText = "";
      res.on("data", (chunk) => (responseText += chunk));
      res.on("end", () => {
        let parsed;
        try {
          parsed = JSON.parse(responseText);
        } catch (error) {
          pushDebug(debug, stepName, {
            endpoint,
            durationMs: elapsedMs(requestStartedAt),
            httpStatus: res.statusCode,
            requestBody: body,
            parseError: error.message,
            rawResponsePreview: responseText.slice(0, 2000),
          });
          reject(new Error(`Failed to parse response: ${responseText.slice(0, 2000)}`));
          return;
        }

        const summary = summarizeDf(parsed);
        pushDebug(debug, stepName, {
          endpoint,
          durationMs: elapsedMs(requestStartedAt),
          httpStatus: res.statusCode,
          requestBody: body,
          summary,
          response: parsed,
        });

        try {
          ensureDfSuccess(parsed, endpoint);
          resolve(parsed);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      pushDebug(debug, stepName, {
        endpoint,
        durationMs: elapsedMs(requestStartedAt),
        requestBody: body,
        networkError: error.message,
      });
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

function psiRequest(url) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile`;
    https
      .get(apiUrl, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            if (res.statusCode !== 200) {
              reject(new Error(`PSI HTTP ${res.statusCode}: ${parsed?.error?.message || "Unknown error"}`));
              return;
            }
            resolve(parsed);
          } catch (e) {
            reject(new Error("Failed to parse PSI response"));
          }
        });
      })
      .on("error", reject);
  });
}

async function psiRequestWithRetry(url, retries = 3) {
  let attempt = 0;
  let lastError = null;
  while (attempt < retries) {
    try {
      return await psiRequest(url);
    } catch (error) {
      lastError = error;
      const isRateLimit = /429/.test(String(error.message));
      attempt += 1;
      if (!isRateLimit || attempt >= retries) break;
      await sleep(1200 * attempt);
    }
  }
  throw lastError;
}

async function runLighthouseAudit(url, debug) {
  const startedAt = Date.now();
  const args = [
    "--yes",
    "lighthouse",
    url,
    "--quiet",
    "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage",
    "--only-categories=performance,seo",
    "--output=json",
    "--output-path=stdout",
  ];

  const { stdout } = await execFileAsync("npx", args, {
    maxBuffer: 50 * 1024 * 1024,
    env: process.env,
  });

  const jsonStart = stdout.indexOf("{");
  const jsonEnd = stdout.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new Error("Unable to parse Lighthouse JSON output.");
  }

  const parsed = JSON.parse(stdout.slice(jsonStart, jsonEnd + 1));
  const lighthouse = parsed?.lhr || parsed?.lighthouseResult || parsed;
  if (!lighthouse?.categories) {
    throw new Error("Lighthouse output missing categories.");
  }

  const output = {
    source: "lighthouse_cli",
    performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
    seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),
    lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue || null,
    cls: lighthouse.audits?.["cumulative-layout-shift"]?.displayValue || null,
    tbt: lighthouse.audits?.["total-blocking-time"]?.displayValue || null,
  };

  pushDebug(debug, "lighthouse_audit", {
    provider: PERFORMANCE_PROVIDER,
    durationMs: elapsedMs(startedAt),
    url,
    summary: output,
  });

  return output;
}

function getStepResult(parsed) {
  return parsed?.tasks?.[0]?.result?.[0] || {};
}

async function runStep(name, fn, issues, timings, strict = STRICT_MODE) {
  const startedAt = Date.now();
  try {
    const value = await fn();
    timings[name] = elapsedMs(startedAt);
    return value;
  } catch (error) {
    timings[name] = elapsedMs(startedAt);
    const msg = `${name} failed: ${error.message}`;
    issues.push({ step: name, error: error.message });
    if (strict) {
      throw new Error(msg);
    }
    console.warn(`    [warn] ${msg}`);
    return null;
  }
}

async function preflight(debug, company) {
  console.log(`  [preflight] Verifying DataForSEO auth + baseline response...`);
  const payload = [{ target: company.domain, location_code: 2840, language_code: "en" }];
  const res = await dfRequest(
    "/v3/dataforseo_labs/google/domain_rank_overview/live",
    payload,
    debug,
    "preflight_auth_check"
  );
  return {
    ok: true,
    checkedAt: nowIso(),
    summary: summarizeDf(res),
  };
}

async function discoverCompetitors(domain, debug) {
  const res = await dfRequest(
    "/v3/dataforseo_labs/google/competitors_domain/live",
    [{ target: domain, location_code: 2840, language_code: "en", limit: 20 }],
    debug,
    "discover_competitors"
  );
  const items = getStepResult(res).items || [];
  return items
    .map((item) => ({
      domain: normalizeDomain(item.domain),
      avgPosition: item.avg_position,
      intersections: item.se_keywords,
      estimatedTraffic: item.etv,
      source: "dataforseo_competitors_domain",
    }))
    .filter((c) => c.domain);
}

async function discoverCompetitorsByCategory(category, debug) {
  const categoryBase = category.split("/").pop().trim().toLowerCase();
  const query = `best ${categoryBase} software`;

  const res = await dfRequest(
    "/v3/serp/google/organic/live/advanced",
    [
      {
        keyword: query,
        location_code: 2840,
        language_code: "en",
        depth: 30,
      },
    ],
    debug,
    "fallback_competitors_by_category_serp"
  );

  const items = getStepResult(res).items || [];
  const unique = new Set();
  const domains = [];

  for (const item of items) {
    const domain = normalizeDomain(item.domain || item.url);
    if (!domain) continue;
    if (unique.has(domain)) continue;
    unique.add(domain);
    domains.push({
      domain,
      source: "dataforseo_serp_category_fallback",
      query,
    });
  }

  return domains;
}

async function getSerpDomainsForQuery(query, debug, stepName) {
  const res = await dfRequest(
    "/v3/serp/google/organic/live/advanced",
    [
      {
        keyword: query,
        location_code: 2840,
        language_code: "en",
        depth: 30,
      },
    ],
    debug,
    stepName
  );

  const items = getStepResult(res).items || [];
  const domains = [];

  for (const item of items) {
    if (item?.type && item.type !== "organic") continue;
    const domain = normalizeDomain(item.domain || item.url);
    if (!domain) continue;
    domains.push({
      domain,
      rank: item.rank_absolute || item.rank_group || null,
      title: item.title || null,
    });
  }

  return domains;
}

async function discoverProductCompetitors(company, baselineCompetitors, debug, issues, timings) {
  const seedSet = new Set(
    (Array.isArray(company.competitorSeeds) ? company.competitorSeeds : [])
      .map((seed) => (typeof seed === "string" ? seed : seed.domain))
      .map((d) => normalizeDomain(d))
      .filter((d) => isValidCompetitorDomain(d, company.domain))
  );

  const baseSet = new Set(
    baselineCompetitors
      .map((c) => normalizeDomain(c.domain))
      .filter((d) => isValidCompetitorDomain(d, company.domain))
  );

  const categoryBase = company.category.split("/").pop().trim().toLowerCase();
  const queries = [
    `${company.name} alternatives`,
    `${company.name} vs`,
    `best ${categoryBase} software`,
    `${categoryBase} alternatives`,
    `${categoryBase} comparison`,
  ];

  const evidence = new Map();
  for (let i = 0; i < queries.length; i += 1) {
    const query = queries[i];
    const stepName = `product_competitor_query_${i + 1}`;
    const domains =
      (await runStep(
        stepName,
        () => getSerpDomainsForQuery(query, debug, stepName),
        issues,
        timings,
        false
      )) || [];

    for (const hit of domains) {
      const domain = normalizeDomain(hit.domain);
      if (!isValidCompetitorDomain(domain, company.domain)) continue;
      const row = evidence.get(domain) || {
        domain,
        queryHits: 0,
        queries: new Set(),
        bestRank: Number.POSITIVE_INFINITY,
      };
      row.queryHits += 1;
      row.queries.add(query);
      if (typeof hit.rank === "number") row.bestRank = Math.min(row.bestRank, hit.rank);
      evidence.set(domain, row);
    }
  }

  const combined = [];
  for (const [domain, row] of evidence.entries()) {
    const isSeed = seedSet.has(domain);
    const inBase = baseSet.has(domain);
    const keep = isSeed || (row.queries.size >= 2 && !isLikelyPublisherDomain(domain));
    if (!keep) continue;

    let score = 0;
    if (isSeed) score += 100;
    if (inBase) score += 20;
    score += row.queries.size * 15;
    if (Number.isFinite(row.bestRank) && row.bestRank <= 10) score += 10;

    combined.push({
      domain,
      source: "product_competitor_discovery",
      evidence: {
        queryHits: row.queryHits,
        queryCount: row.queries.size,
        queries: Array.from(row.queries),
        bestRank: Number.isFinite(row.bestRank) ? row.bestRank : null,
      },
      score,
    });
  }

  // Ensure seeds are always included.
  for (const domain of seedSet) {
    if (combined.some((c) => c.domain === domain)) continue;
    combined.push({
      domain,
      source: "seeded_competitor",
      evidence: {
        queryHits: 0,
        queryCount: 0,
        queries: [],
        bestRank: null,
      },
      score: 100,
    });
  }

  return combined.sort((a, b) => b.score - a.score);
}

async function getDomainMetrics(domain, debug, stepName = "domain_metrics") {
  const res = await dfRequest(
    "/v3/dataforseo_labs/google/domain_rank_overview/live",
    [{ target: domain, location_code: 2840, language_code: "en" }],
    debug,
    stepName
  );

  const data = getStepResult(res).items?.[0] || {};
  const organic = data.metrics?.organic || {};
  const paid = data.metrics?.paid || {};
  return {
    organicTraffic: organic.etv ?? data.etv ?? 0,
    organicKeywords: organic.count ?? data.se_keywords ?? 0,
    paidTraffic: paid.etv ?? data.paid_etv ?? 0,
    paidKeywords: paid.count ?? data.paid_se_keywords ?? 0,
    backlinks: data.backlinks ?? null,
    referringDomains: data.referring_domains ?? null,
  };
}

async function getKeywordAnalysis(domain, debug) {
  const res = await dfRequest(
    "/v3/dataforseo_labs/google/ranked_keywords/live",
    [
      {
        target: domain,
        location_code: 2840,
        language_code: "en",
        limit: 200,
        order_by: ["keyword_data.keyword_info.search_volume,desc"],
      },
    ],
    debug,
    "keyword_analysis"
  );

  const items = getStepResult(res).items || [];
  return items
    .map((item) => ({
      keyword: item.keyword_data?.keyword,
      volume: item.keyword_data?.keyword_info?.search_volume,
      position: item.ranked_serp_element?.serp_item?.rank_absolute,
      cpc: item.keyword_data?.keyword_info?.cpc,
      competition: item.keyword_data?.keyword_info?.competition_level,
      url: item.ranked_serp_element?.serp_item?.url,
    }))
    .filter((k) => k.keyword);
}

async function getKeywordGaps(targetDomain, competitorDomains, debug) {
  if (!competitorDomains.length) return [];

  const filtered = competitorDomains
    .map((d) => normalizeDomain(d))
    .filter((d) => isValidCompetitorDomain(d, targetDomain))
    .slice(0, 3);
  if (!filtered.length) return [];

  const request = {
    target1: normalizeDomain(targetDomain),
    location_code: 2840,
    language_code: "en",
    limit: 100,
    order_by: ["keyword_data.keyword_info.search_volume,desc"],
  };

  filtered.forEach((domain, idx) => {
    request[`target${idx + 2}`] = domain;
  });

  const res = await dfRequest(
    "/v3/dataforseo_labs/google/domain_intersection/live",
    [request],
    debug,
    "keyword_gap_analysis"
  );

  const items = getStepResult(res).items || [];
  return items
    .map((item) => ({
      keyword: item.keyword_data?.keyword,
      volume: item.keyword_data?.keyword_info?.search_volume,
      competition: item.keyword_data?.keyword_info?.competition_level,
    }))
    .filter((k) => k.keyword);
}

function buildPromptSet(company) {
  const categoryBase = company.category.split("/").pop().trim().toLowerCase();
  return [
    `best ${categoryBase} tools`,
    `best ${categoryBase} software`,
    `${company.name} alternatives`,
    `${company.name} vs competitors`,
    `best ${categoryBase} for startups`,
    `best ${categoryBase} for enterprise`,
    `how to choose ${categoryBase} platform`,
    `${categoryBase} comparison`,
  ];
}

async function checkAIVisibility(company, debug, issues) {
  const results = {
    mentionsByDomain: [],
    promptResults: [],
  };

  const mentionRes = await runStep(
    "ai_mentions",
    () =>
      dfRequest(
        "/v3/ai_optimization/llm_mentions/live",
        [
          {
            search_filter: { domain: company.domain },
            location_code: 2840,
            language_code: "en",
            limit: 50,
          },
        ],
        debug,
        "ai_mentions"
      ),
    issues,
    {},
    false
  );

  if (mentionRes) {
    results.mentionsByDomain = getStepResult(mentionRes).items || [];
  }

  const prompts = buildPromptSet(company);
  for (const prompt of prompts) {
    const promptStep = `ai_prompt_${prompt.slice(0, 32).replace(/\s+/g, "_").toLowerCase()}`;
    const promptRes = await runStep(
      promptStep,
      () =>
        dfRequest(
          "/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced",
          [
            {
              keyword: prompt,
              location_name: "United States",
              language_name: "English",
              tag: `${company.slug}-research`,
            },
          ],
          debug,
          promptStep
        ),
      issues,
      {},
      false
    );

    if (promptRes) {
      const response = getStepResult(promptRes);
      const text = JSON.stringify(response).toLowerCase();
      results.promptResults.push({
        query: prompt,
        platform: "chatgpt",
        clientMentioned:
          text.includes(company.name.toLowerCase()) || text.includes(normalizeDomain(company.domain)),
        responsePreview: JSON.stringify(response).slice(0, 1200),
      });
    } else {
      results.promptResults.push({
        query: prompt,
        platform: "chatgpt",
        clientMentioned: false,
        responsePreview: null,
        error: "no_response",
      });
    }

    await sleep(1200);
  }

  return results;
}

async function auditWebsite(domain, debug) {
  const audit = { onPage: null, pageSpeed: null };

  const onPageRes = await dfRequest(
    "/v3/on_page/instant_pages",
    [{ url: `https://${domain}`, load_resources: true, enable_javascript: true }],
    debug,
    "onpage_audit"
  );

  const items = getStepResult(onPageRes).items || [];
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
      pageTiming: {
        timeToInteractiveMs: page.page_timing?.time_to_interactive ?? null,
        domCompleteMs: page.page_timing?.dom_complete ?? null,
        largestContentfulPaintMs: page.page_timing?.largest_contentful_paint ?? null,
      },
    };
  }

  try {
    if (PERFORMANCE_PROVIDER === "lighthouse") {
      audit.pageSpeed = await runLighthouseAudit(`https://${domain}`, debug);
    } else {
      const psi = await psiRequestWithRetry(`https://${domain}`);
      const lighthouse = psi?.lighthouseResult;
      if (lighthouse) {
        audit.pageSpeed = {
          source: "pagespeed_api",
          performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
          seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),
          lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue,
          cls: lighthouse.audits?.["cumulative-layout-shift"]?.displayValue,
          tbt: lighthouse.audits?.["total-blocking-time"]?.displayValue,
        };
      }
    }
  } catch (error) {
    if (PERFORMANCE_PROVIDER === "lighthouse" && ALLOW_PSI_FALLBACK) {
      try {
        const psi = await psiRequestWithRetry(`https://${domain}`);
        const lighthouse = psi?.lighthouseResult;
        if (lighthouse) {
          audit.pageSpeed = {
            source: "pagespeed_api_fallback",
            performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
            seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),
            lcp: lighthouse.audits?.["largest-contentful-paint"]?.displayValue,
            cls: lighthouse.audits?.["cumulative-layout-shift"]?.displayValue,
            tbt: lighthouse.audits?.["total-blocking-time"]?.displayValue,
          };
        }
      } catch (fallbackError) {
        pushDebug(debug, "performance_fallback_error", {
          domain,
          provider: PERFORMANCE_PROVIDER,
          error: fallbackError.message,
        });
      }
    }

    if (!audit.pageSpeed && audit.onPage?.pageTiming) {
      audit.pageSpeed = {
        source: "dataforseo_onpage_timing",
        timeToInteractiveMs: audit.onPage.pageTiming.timeToInteractiveMs,
        domCompleteMs: audit.onPage.pageTiming.domCompleteMs,
        largestContentfulPaintMs: audit.onPage.pageTiming.largestContentfulPaintMs,
        note: "Derived from DataForSEO on_page timing metrics.",
      };
    }

    if (!audit.pageSpeed) {
      pushDebug(debug, "performance_fallback", {
        at: nowIso(),
        domain,
        provider: PERFORMANCE_PROVIDER,
        reason: error.message,
      });

      audit.pageSpeed = {
        source: "fallback_no_perf",
        error: error.message,
        statusCode: audit.onPage?.statusCode ?? null,
        note: "Performance provider unavailable. Configure Lighthouse runtime or enable ALLOW_PSI_FALLBACK=true.",
      };
    }
  }

  return audit;
}

function mergeAndDedupeCompetitors(competitors, companyDomain, includePublishers = false) {
  const map = new Map();
  for (const comp of competitors) {
    const domain = normalizeDomain(comp.domain);
    if (!domain) continue;
    if (!isValidCompetitorDomain(domain, companyDomain)) continue;
    if (!includePublishers && isLikelyPublisherDomain(domain)) continue;
    if (!map.has(domain)) {
      map.set(domain, { ...comp, domain });
    }
  }
  return Array.from(map.values());
}

function applySeededCompetitors(company, existingCompetitors) {
  const seeds = Array.isArray(company.competitorSeeds) ? company.competitorSeeds : [];
  const mapped = seeds
    .map((seed) => {
      if (typeof seed === "string") {
        return { domain: seed, source: "seeded_competitor" };
      }
      return {
        domain: seed.domain,
        name: seed.name,
        source: seed.source || "seeded_competitor",
      };
    })
    .filter((seed) => seed.domain);

  return mergeAndDedupeCompetitors([...existingCompetitors, ...mapped], company.domain, true);
}

function evaluateQualityGate(research) {
  const successfulPrompts = research.aiVisibility.promptResults.filter(
    (r) => !r.error && typeof r.responsePreview === "string" && r.responsePreview.length > 0
  ).length;

  const metrics = {
    competitors: research.competitors.length,
    keywords: research.rankedKeywords.length,
    prompts: successfulPrompts,
    hasOnPage: Boolean(research.websiteAudit?.onPage),
    hasPageSpeed:
      Boolean(research.websiteAudit?.pageSpeed) &&
      !String(research.websiteAudit?.pageSpeed?.source || "").startsWith("fallback"),
  };

  const failures = [];
  if (metrics.competitors < QUALITY_THRESHOLDS.competitors) {
    failures.push(`competitors ${metrics.competitors} < ${QUALITY_THRESHOLDS.competitors}`);
  }
  if (metrics.keywords < QUALITY_THRESHOLDS.keywords) {
    failures.push(`keywords ${metrics.keywords} < ${QUALITY_THRESHOLDS.keywords}`);
  }
  if (metrics.prompts < QUALITY_THRESHOLDS.prompts) {
    failures.push(`prompts ${metrics.prompts} < ${QUALITY_THRESHOLDS.prompts}`);
  }
  if (!metrics.hasOnPage) failures.push("onPage audit missing");
  if (!metrics.hasPageSpeed) failures.push("pageSpeed audit missing");

  return {
    mode: RESEARCH_MODE,
    thresholds: QUALITY_THRESHOLDS,
    metrics,
    passed: failures.length === 0,
    failures,
  };
}

function computePayloadConfidence(research, issues) {
  let score = 0;
  score += Math.min(25, research.competitors.length * 5);
  score += Math.min(25, Math.floor(research.rankedKeywords.length / 2));
  score += Math.min(20, research.aiVisibility.promptResults.length * 2);
  if (research.websiteAudit?.onPage) score += 15;
  if (research.websiteAudit?.pageSpeed) score += 15;
  score -= issues.length * 5;
  score = Math.max(0, Math.min(100, score));

  const level = score >= 80 ? "high" : score >= 50 ? "medium" : "low";
  return { score, level };
}

async function runResearch(company) {
  const startedAt = Date.now();
  console.log(`\n========================================`);
  console.log(`Researching: ${company.name} (${company.domain})`);
  console.log(`Mode: ${RESEARCH_MODE.toUpperCase()}`);
  console.log(`========================================\n`);

  const outputDir = path.join(__dirname, "..", "..", "data", "research");
  const debugDir = path.join(outputDir, "_debug");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });

  const outputPath = path.join(outputDir, `${company.slug}.json`);

  const debug = {
    slug: company.slug,
    startedAt: nowIso(),
    mode: RESEARCH_MODE,
    company,
    steps: [],
    issues: [],
    timingsMs: {},
    preflight: null,
  };

  const issues = [];
  const timings = {};

  try {
    debug.preflight = await runStep("preflight", () => preflight(debug, company), issues, timings, true);

    console.log(`  [1/6] Discovering competitors for ${company.domain}...`);
    let competitors =
      (await runStep(
        "discover_competitors",
        () => discoverCompetitors(company.domain, debug),
        issues,
        timings,
        STRICT_MODE
      )) || [];

    competitors =
      (await runStep(
        "discover_product_competitors",
        () => discoverProductCompetitors(company, competitors, debug, issues, timings),
        issues,
        timings,
        false
      )) || competitors;

    competitors = applySeededCompetitors(company, competitors);

    if (competitors.length < QUALITY_THRESHOLDS.competitors) {
      const categoryFallback =
        (await runStep(
          "fallback_competitors_by_category",
          () => discoverCompetitorsByCategory(company.category, debug),
          issues,
          timings,
          false
        )) || [];
      competitors = mergeAndDedupeCompetitors(
        [...competitors, ...categoryFallback],
        company.domain,
        false
      );
    }

    console.log(`  [2/6] Getting domain metrics for ${company.domain}...`);
    const targetMetrics = await runStep(
      "target_domain_metrics",
      () => getDomainMetrics(company.domain, debug, "target_domain_metrics"),
      issues,
      timings,
      STRICT_MODE
    );

    const competitorMetricsRaw = [];
    for (const comp of competitors.slice(0, 8)) {
      const metrics = await runStep(
        `competitor_metrics_${normalizeDomain(comp.domain)}`,
        () => getDomainMetrics(comp.domain, debug, `competitor_metrics_${normalizeDomain(comp.domain)}`),
        issues,
        timings,
        false
      );

      competitorMetricsRaw.push({ ...comp, metrics: metrics || null });
      await sleep(400);
    }

    const competitorMetrics = competitorMetricsRaw.filter((comp) => {
      if (comp.source === "seeded_competitor") return true;
      if (isLikelyPublisherDomain(comp.domain)) return false;
      const queryCount = comp.evidence?.queryCount || 0;
      const organicKeywords = comp.metrics?.organicKeywords || 0;
      return queryCount >= 2 && organicKeywords >= 500;
    });

    console.log(`  [3/6] Analyzing keywords for ${company.domain}...`);
    const rankedKeywords =
      (await runStep(
        "keyword_analysis",
        () => getKeywordAnalysis(company.domain, debug),
        issues,
        timings,
        STRICT_MODE
      )) || [];

    const competitorDomains = competitorMetrics.map((c) => normalizeDomain(c.domain)).filter(Boolean);
    const keywordGaps =
      (await runStep(
        "keyword_gap_analysis",
        () => getKeywordGaps(company.domain, competitorDomains, debug),
        issues,
        timings,
        false
      )) || [];

    console.log(`  [4/6] Checking AI visibility for ${company.name}...`);
    const aiVisibility =
      (await runStep(
        "ai_visibility",
        () => checkAIVisibility(company, debug, issues),
        issues,
        timings,
        STRICT_MODE
      )) || { mentionsByDomain: [], promptResults: [] };

    console.log(`  [5/6] Auditing website for ${company.domain}...`);
    const websiteAudit =
      (await runStep(
        "website_audit",
        () => auditWebsite(company.domain, debug),
        issues,
        timings,
        STRICT_MODE
      )) || { onPage: null, pageSpeed: null };

    const research = {
      slug: company.slug,
      company: {
        name: company.name,
        domain: company.domain,
        category: company.category,
        industry: company.industry,
      },
      seoMetrics: targetMetrics || {
        organicTraffic: 0,
        organicKeywords: 0,
        paidTraffic: 0,
        paidKeywords: 0,
        backlinks: 0,
        referringDomains: 0,
      },
      rankedKeywords,
      keywordGaps,
      competitors: competitorMetrics,
      aiVisibility,
      websiteAudit,
      qualityGate: null,
      meta: {
        generatedAt: nowIso(),
        researchMode: RESEARCH_MODE,
        timingsMs: timings,
        issues,
        totalDurationMs: elapsedMs(startedAt),
      },
    };

    const qualityGate = evaluateQualityGate(research);
    const confidence = computePayloadConfidence(research, issues);
    research.qualityGate = qualityGate;
    research.meta.payloadConfidence = confidence;

    if (!qualityGate.passed && STRICT_MODE) {
      throw new Error(`Quality gate failed: ${qualityGate.failures.join("; ")}`);
    }

    fs.writeFileSync(outputPath, JSON.stringify(research, null, 2));
    console.log(`\n  Research saved to ${outputPath}`);
    console.log(`  Payload confidence: ${confidence.level.toUpperCase()} (${confidence.score}/100)`);
    return research;
  } catch (error) {
    issues.push({ step: "runResearch", error: error.message });
    throw error;
  } finally {
    debug.issues = issues;
    debug.timingsMs = timings;
    debug.finishedAt = nowIso();
    debug.totalDurationMs = elapsedMs(startedAt);
    const debugFile = writeDebugFile(debugDir, company.slug, debug);
    console.log(`  Debug log: ${debugFile}`);
  }
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
      await sleep(2000);
    }
  } else {
    console.log("Usage:");
    console.log('  node scripts/research-pipeline/index.cjs --company "Linear"');
    console.log("  node scripts/research-pipeline/index.cjs --batch");
    console.log("\nEnvironment:");
    console.log("  RESEARCH_MODE=strict|fast (default: strict)");
    console.log("  MIN_COMPETITORS, MIN_KEYWORDS, MIN_PROMPTS");
  }
}

module.exports = { runResearch };
if (require.main === module) main();

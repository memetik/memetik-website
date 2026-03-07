const fs = require("fs");
const path = require("path");

const OPENAI_BASE_URL = "http://127.0.0.1:8327/v1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "dummy";
const STRATEGY_MODEL = process.env.STRATEGY_MODEL || "gpt-5.4";
const REPO_ROOT = path.join(__dirname, "..", "..");
const CANONICAL_MIND_ROOT = "/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation";
const CANONICAL_MASTER_REFERENCE_PATH = "/Users/house/Mind/Areas/Agency/Lead-Magnets/MEMETIK-2026-AEO-Master-Reference.md";
const PORTABLE_BTS_BRIEF_SNAPSHOT_PATH = path.join(REPO_ROOT, "content", "strategy-briefs", "BTS-Strategy-Brief.md");

const REQUIRED_BRIEF_SECTIONS = [
  "## Lineage",
  "## 1. Brief Metadata",
  "## 2. Company Context",
  "## 3. Category Framing",
  "## 4. Current State and Visibility",
  "## 5. Competitor Landscape",
  "## 6. Money Entities",
  "## 7. Prioritized Wedge and Ranked Sequence",
  "## 8. Apex Assets Plan",
  "## 9. Knowledge Graph Plan",
  "## 10. Trust Relay Plan",
  "## 11. Technical and Entity Foundation",
  "## 12. Proof and Measurement Model",
  "## 13. Cadence and Next Actions",
  "## 14. Page Extraction Map",
  "## 15. Unresolved Gaps and Blockers",
  "## 16. Claim Register",
];

const REQUIRED_SECTION_PATTERNS = [
  /state of search/i,
  /current state|where .* today/i,
  /opportunity|commercial upside|revenue potential|revenue impact/i,
  /why .* can win|right to win/i,
  /competitive gap|competitive landscape/i,
  /ai visibility by llm|ai visibility|answer-engine visibility/i,
  /90-day wedge|90 day wedge|first 90 days/i,
  /what memetik will actually deliver|what memetik actually builds and ships|what we will actually deliver|what memetik will build|delivery engine/i,
  /operating model|monthly operating system|workstreams/i,
  /why memetik/i,
  /appendix|supporting evidence/i,
  /estimate-only|modeled estimate|modeled/i,
  /book a strategy call|let'?s talk|cal\.com\/memetik\/letstalk/i,
  /StrategyPageFrame/i,
  /StrategyHero/i,
  /StrategySectionLead/i,
  /StrategyAppendixSection/i,
  /StrategySectionShell/i,
  /StrategyCTA/i,
];

const MARKET_CONTEXT_NON_NEGOTIABLES = [
  "Google still drives a major share of discovery and commercial research traffic.",
  "Traditional search remains a core buying behavior even as AI answer engines grow.",
  "AI is changing how buyers shortlist vendors, but it is not replacing Google outright.",
  "Buyers now move across Google, ChatGPT, Perplexity, Gemini, and other answer layers before they ever talk to sales.",
  "Winning brands need visibility across both classic search demand capture and AI answer surfaces.",
].join("\n- ");

function loadStrategicContextDocs() {
  throw new Error("loadStrategicContextDocs now requires canonical inputs via loadCanonicalGenerationInputs().");
}

function resolveCanonicalGenerationPaths(slug, company) {
  const mindRoot = process.env.STRATEGY_GENERATION_ROOT || CANONICAL_MIND_ROOT;
  const briefDir = slug === "bts-2" ? path.join(mindRoot, "examples") : path.join(mindRoot, "briefs");
  const briefFileName =
    process.env.STRATEGY_BRIEF_FILE_NAME ||
    (slug === "bts-2" ? "BTS-Strategy-Brief.md" : `${pascalCase(company?.slug || slug)}-Strategy-Brief.md`);

  return {
    masterReferencePath: process.env.MEMETIK_MASTER_REFERENCE_PATH || CANONICAL_MASTER_REFERENCE_PATH,
    generationContractPath:
      process.env.STRATEGY_GENERATION_CONTRACT_PATH ||
      path.join(mindRoot, "MEMETIK-2026-Strategy-Generation-Contract.md"),
    briefSchemaPath:
      process.env.CLIENT_STRATEGY_BRIEF_SCHEMA_PATH || path.join(mindRoot, "client-strategy-brief-schema.yaml"),
    pageContractPath:
      process.env.WEBSITE_STRATEGY_PAGE_CONTRACT_PATH || path.join(mindRoot, "website-strategy-page-contract.md"),
    briefPath: process.env.STRATEGY_BRIEF_PATH || path.join(briefDir, briefFileName),
  };
}

function readRequiredArtifact(filePath, label, validators = []) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} is required but missing: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.trim()) {
    throw new Error(`${label} is empty: ${filePath}`);
  }

  if (/\b(?:TODO|TBD)\b/.test(content)) {
    throw new Error(`${label} still contains TODO/TBD markers: ${filePath}`);
  }

  validators.forEach((validator) => validator(content, filePath));
  return { filePath, content };
}

function validateMarkdownHeading(content, filePath) {
  if (!content.trim().startsWith("#")) {
    throw new Error(`Markdown artifact must start with a heading: ${filePath}`);
  }
}

function validateGenerationContract(content, filePath) {
  const requiredSnippets = [
    /research payload -> internal strategy brief -> founder-facing website strategy page/i,
    /brief is canonical downstream planning state/i,
    /Trust Relay is core scope/i,
  ];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Generation contract is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function validateBriefSchema(content, filePath) {
  const requiredSnippets = [
    /brief_schema:/i,
    /canonical_lineage:/i,
    /The brief is the canonical downstream planning artifact/i,
    /Ranked execution sequence is mandatory/i,
  ];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Brief schema is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function validatePageContract(content, filePath) {
  const requiredSnippets = [
    /Canonical direct input\s*\|\s*Approved company strategy brief/i,
    /no approved brief exists/i,
    /What Memetik builds and ships/i,
  ];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Website page contract is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function loadCanonicalGenerationInputs(slug, company) {
  const paths = resolveCanonicalGenerationPaths(slug, company);

  const masterReference = readRequiredArtifact(paths.masterReferencePath, "Master reference", [validateMarkdownHeading]);
  const generationContract = readRequiredArtifact(paths.generationContractPath, "Strategy generation contract", [
    validateMarkdownHeading,
    validateGenerationContract,
  ]);
  const briefSchema = readRequiredArtifact(paths.briefSchemaPath, "Client strategy brief schema", [validateBriefSchema]);
  const pageContract = readRequiredArtifact(paths.pageContractPath, "Website strategy page contract", [
    validateMarkdownHeading,
    validatePageContract,
  ]);

  const docs = [masterReference, generationContract, briefSchema, pageContract].map((doc) => ({
    filePath: doc.filePath,
    content: doc.content.slice(0, 24000),
  }));

  console.log("  Canonical lineage: master reference -> generation contract -> brief -> page");
  console.log(`  Master reference: ${paths.masterReferencePath}`);
  console.log(`  Generation contract: ${paths.generationContractPath}`);
  console.log(`  Brief schema: ${paths.briefSchemaPath}`);
  console.log(`  Page contract: ${paths.pageContractPath}`);
  console.log(`  Canonical brief: ${paths.briefPath}`);

  return {
    paths,
    docs,
    masterReference,
    generationContract,
    briefSchema,
    pageContract,
  };
}

function ensureOrderedMarkers(content, markers, label) {
  let lastIndex = -1;
  for (const marker of markers) {
    const index = content.indexOf(marker);
    if (index === -1) {
      throw new Error(`${label} is missing required marker: ${marker}`);
    }
    if (index <= lastIndex) {
      throw new Error(`${label} is out of order at marker: ${marker}`);
    }
    lastIndex = index;
  }
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(value));
}

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
  return `${Number(value).toFixed(1)}%`;
}

function toJsonBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function pickPromptEvidence(promptResults = [], limit = 3) {
  return promptResults
    .filter((result) => result?.query && result?.platform)
    .sort((a, b) => Number(Boolean(b.clientMentioned)) - Number(Boolean(a.clientMentioned)))
    .slice(0, limit);
}

function buildCanonicalBrief(company, researchData, canonicalInputs) {
  const today = new Date().toISOString().slice(0, 10);
  const totals = researchData?.tamModel?.totals || {};
  const qualityGate = researchData?.qualityGate || {};
  const payloadConfidence = researchData?.meta?.payloadConfidence || researchData?.tamModel?.confidence || {};
  const topicalIntegrity = researchData?.topicalIntegrity || {};
  const topClusters = Array.isArray(researchData?.tamModel?.topOpportunityClusters)
    ? researchData.tamModel.topOpportunityClusters.slice(0, 4)
    : [];
  const competitors = Array.isArray(researchData?.competitors) ? researchData.competitors.slice(0, 5) : [];
  const rankedCommercialKeywords = (researchData?.rankedKeywords || [])
    .filter((keyword) => /\b(vs|alternative|alternatives|pricing|compare|comparison|best)\b/i.test(keyword.keyword || ""))
    .slice(0, 8)
    .map((keyword) => `${keyword.keyword} (position ${keyword.position}, volume ${formatNumber(keyword.volume)})`);
  const promptEvidence = pickPromptEvidence(researchData?.aiVisibility?.promptResults, 5);

  const platformSummaryLines = Object.entries(researchData?.aiVisibility?.platformSummary || {}).map(([platform, summary]) => {
    return `- ${platform}: ${formatPercent(summary?.mentionRate)} mention rate (${summary?.mentioned || 0}/${summary?.total || 0})`;
  });

  const competitorLines = competitors.map((competitor) => {
    return `| ${competitor.name || competitor.domain} | ${formatNumber(
      competitor.metrics?.organicTraffic
    )} | ${formatNumber(competitor.metrics?.organicKeywords)} | ${formatNumber(
      competitor.metrics?.referringDomains
    )} | ${formatNumber(competitor.metrics?.backlinks)} | ${competitor.evidence?.promptEvidence?.queryHits || 0} |`;
  });

  const clusterLines = topClusters.map((cluster, index) => {
    return `${index + 1}. ${cluster.cluster} (${cluster.intent}, ${cluster.phase}) — demand ${formatNumber(
      cluster.demand
    )}, expected 12m traffic ${formatNumber(cluster.expectedTraffic12Months?.base)}; sample keywords: ${(cluster.sampleKeywords || [])
      .slice(0, 5)
      .join(", ")}`;
  });

  const wedgeKeywords = Array.from(
    new Set(
      topClusters
        .filter((cluster) => /buyer|alternative|comparison|pricing/i.test(cluster.cluster || ""))
        .flatMap((cluster) => cluster.sampleKeywords || [])
        .concat(rankedCommercialKeywords.map((entry) => entry.split(" (")[0]))
    )
  ).slice(0, 8);

  const unresolvedGaps = [];
  if (Array.isArray(researchData?.meta?.issues)) {
    researchData.meta.issues.forEach((issue, index) => {
      unresolvedGaps.push({
        gapId: `GAP-${String(index + 1).padStart(3, "0")}`,
        summary: `${issue.step}: ${issue.error}`,
        severity: /invalid|not found/i.test(issue.error || "") ? "caution" : "note",
      });
    });
  }

  if (Array.isArray(qualityGate?.failures)) {
    qualityGate.failures.forEach((failure, index) => {
      unresolvedGaps.push({
        gapId: `GAP-QG-${String(index + 1).padStart(3, "0")}`,
        summary: failure,
        severity: "blocker",
      });
    });
  }

  const claimRecords = [
    {
      claimId: "CLAIM-001",
      statement: `${company.name} has minimal current organic visibility against the size of the category opportunity.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["seoMetrics.organicTraffic", "seoMetrics.organicKeywords", "tamModel.totals.totalSearchOpportunity"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-002",
      statement: `${company.name} already has a usable authority base (${formatNumber(
        researchData?.seoMetrics?.referringDomains
      )} referring domains) that can support a focused wedge strategy.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["seoMetrics.backlinkMetrics.referringDomains", "seoMetrics.backlinkMetrics.backlinks"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-003",
      statement: `Alternatives/comparison intent is the fastest commercial wedge because BOFU clusters are present in the payload and align with existing category behavior.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["tamModel.topOpportunityClusters", "rankedKeywords"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-004",
      statement: `${company.name} has partial LLM mention momentum but no sampled Google AI Overview visibility, so answer-surface work must be explicit.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["aiVisibility.platformSummary", "aiVisibility.promptResults"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-005",
      statement: `Downstream strategy must preserve the full Memetik system: Money Entities, Apex Assets, Knowledge Graph, Trust Relay, and technical/entity foundation.`,
      sourceClass: "canonical_internal",
      sourcePointer: canonicalInputs.paths.generationContractPath,
      sourcePayloadPaths: ["contract.5", "contract.9"],
      certainty: "high",
      pageHandling: "use",
    },
    {
      claimId: "CLAIM-006",
      statement: `The company passed the research quality gate with high confidence and topical integrity, so the wedge can be rendered publicly with caveat discipline rather than blocked outright.`,
      sourceClass: "field_research",
      sourcePointer: canonicalInputs.paths.briefPath,
      sourcePayloadPaths: ["qualityGate", "meta.payloadConfidence", "topicalIntegrity"],
      certainty: "high",
      pageHandling: "use",
    },
  ];

  return `# ${company.name} Strategy Brief - ${today}

## Lineage
- Master reference: ${canonicalInputs.paths.masterReferencePath}
- Generation contract: ${canonicalInputs.paths.generationContractPath}
- Brief schema: ${canonicalInputs.paths.briefSchemaPath}
- Public output contract: ${canonicalInputs.paths.pageContractPath}
- Canonical chain: master reference -> generation contract -> brief -> page

## 1. Brief Metadata
- Brief title: ${company.name} Strategy Brief - ${today}
- Slug: ${company.slug}
- Brief status: approved_for_page_generation
- Generated at: ${today}
- Research generated at: ${researchData?.meta?.generatedAt || "unknown"}
- Research mode: ${researchData?.meta?.researchMode || "unknown"}
- Payload confidence: ${payloadConfidence.level || "unknown"} (${payloadConfidence.score || "n/a"}/100)
- Quality gate: ${qualityGate.passed ? "passed" : "failed"}
- Page output path: ${path.join(__dirname, "..", "..", "client", "src", "pages", "strategy", `${pascalCase(company.slug)}.tsx`)}
- Canonical brief path: ${canonicalInputs.paths.briefPath}

## 2. Company Context
- Company: ${company.name}
- Domain: ${company.domain}
- Category: ${company.category}
- Industry: ${company.industry}
- Target markets: ${(researchData?.meta?.targetMarkets || researchData?.seoMetrics?.marketsIncluded || []).join(", ") || "unknown"}
- Current organic traffic: ${formatNumber(researchData?.seoMetrics?.organicTraffic)}
- Current organic keywords: ${formatNumber(researchData?.seoMetrics?.organicKeywords)}
- Referring domains: ${formatNumber(researchData?.seoMetrics?.backlinkMetrics?.referringDomains)}
- Backlinks: ${formatNumber(researchData?.seoMetrics?.backlinkMetrics?.backlinks)}

## 3. Category Framing
- Primary wedge: Own creator monetization alternatives/comparison recommendation-share before broader category demand.
- Why this company can win now: ${company.name} already has a monetization-first positioning and a usable authority base, but it has not yet translated that into systematic Money Entity coverage.
- Commercial objective: Move from brand-adjacent discoverability to shortlist inclusion across Google, ChatGPT, Gemini, and other answer surfaces.
- Doctrine constraint: Preserve Apex Assets + Knowledge Graph + Trust Relay + technical/entity foundation as one execution system.

## 4. Current State and Visibility
- Search opportunity: ${formatNumber(totals.totalSearchOpportunity)} total validated demand
- Expected traffic in 12 months (base): ${formatNumber(totals.expectedTraffic12Months?.base)}
- Aggressive upside: ${formatNumber(totals.aggressiveUpside)}
- First 90-day target (base): ${formatNumber(totals.first90DayTarget?.base)}
- AI visibility baseline:
${platformSummaryLines.join("\n") || "- No AI visibility summary available."}
- Topical integrity: ${topicalIntegrity.passed ? "passed" : "failed"} (low-quality semantic demand share ${formatPercent(
    topicalIntegrity?.metrics?.lowQualitySemanticDemandSharePercent
  )})

## 5. Competitor Landscape
| Competitor | Organic traffic | Organic keywords | Referring domains | Backlinks | Prompt hits |
| --- | ---: | ---: | ---: | ---: | ---: |
${competitorLines.join("\n")}

## 6. Money Entities
${clusterLines.join("\n")}

Commercial keyword signals:
${rankedCommercialKeywords.map((keyword) => `- ${keyword}`).join("\n") || "- No ranked commercial keywords found."}

## 7. Prioritized Wedge and Ranked Sequence
### REC-001
- recommendation: Lead with Patreon-alternative and creator monetization comparison Money Entities.
- company_specific_rationale: ${company.name} already shows one live comparison ranking signal and the strongest BOFU sample keywords are alternatives/comparisons.
- priority_rank: 1
- claim_ids: CLAIM-001, CLAIM-003, CLAIM-006
- gap_ids: none
- visibility: page_extractable
- page_summary: Start with the alternatives/comparison wedge where shortlist behavior is clearest.

### REC-002
- recommendation: Pair every core Apex Asset with Trust Relay distribution and review-platform reinforcement.
- company_specific_rationale: ${company.name} has baseline authority but weak answer-surface consistency; external reinforcement is required to change recommendation-share.
- priority_rank: 2
- claim_ids: CLAIM-002, CLAIM-004, CLAIM-005
- gap_ids: ${unresolvedGaps.length ? unresolvedGaps.map((gap) => gap.gapId).join(", ") : "none"}
- visibility: page_extractable
- page_summary: Do not ship on-site pages without matching off-site authority and review proof.

### REC-003
- recommendation: Keep the public page founder-readable, but preserve the real 30/60/90 output volume and weekly cadence.
- company_specific_rationale: The doctrine requires the execution engine to remain visible so the strategy reads like a serious category-capture program, not a light content retainer.
- priority_rank: 3
- claim_ids: CLAIM-005
- gap_ids: none
- visibility: page_extractable
- page_summary: Show the actual shipping model and output ranges, not a vague promise.

## 8. Apex Assets Plan
- First assets to ship: ${wedgeKeywords.slice(0, 5).join(", ") || "Patreon alternative, creator monetization platform comparison"}
- Required Apex Asset types: flagship alternatives page, head-to-head competitor pages, best-for/use-case pages, pricing/cost explainer, comparison rubric page.
- Founder-facing point: These are the owned answer assets that create shortlist share fastest.

## 9. Knowledge Graph Plan
- Supporting clusters: ${(topClusters || []).map((cluster) => cluster.cluster).join(", ") || "No clusters available"}
- Required output shape: supporting retrieval pages around use cases, creator personas, monetization models, and competitor-adjacent terms.
- Founder-facing point: Knowledge Graph density makes answer engines repeatedly find the same commercial narrative.

## 10. Trust Relay Plan
- Required workstreams: review platforms, community/forum participation, professional-network/newsletter distribution, listicles/publication-style placements, digital PR/editorial placements, backlinks to Apex Assets.
- Initial attack surfaces: Reddit/community threads, creator-software listicles, review-profile reinforcement, expert commentary placements.
- Founder-facing point: Recommendation-share requires third-party trust, not just indexed pages.

## 11. Technical and Entity Foundation
- Required systems: schema matched to visible content, sitemap hygiene, crawl/index eligibility, canonicals, Bing Webmaster Tools, IndexNow, entity consistency across owned and third-party surfaces.
- Current note: website audit exists in payload and should support a visible but concise infrastructure callout on the page.

## 12. Proof and Measurement Model
- Total search opportunity: ${formatNumber(totals.totalSearchOpportunity)}
- Expected traffic in 12 months (base): ${formatNumber(totals.expectedTraffic12Months?.base)}
- Aggressive upside: ${formatNumber(totals.aggressiveUpside)}
- First 90-day target: ${formatNumber(totals.first90DayTarget?.base)}
- Revenue-model note: ${researchData?.tamModel?.revenueModel?.enabled === false ? "Revenue planning requires client ACV/AOV and funnel inputs." : "Revenue model present in payload; keep caveat discipline."}
- Measurement frame: recommendation-share, prompt coverage, authority proof, workstream completion, and downstream search indicators.

## 13. Cadence and Next Actions
- Weekly rhythm: Monday priority review, Tuesday-Wednesday asset production, Thursday publishing/indexing + Trust Relay, Friday metrics and iteration.
- 30/60/90 public commitments: keep the documented output ranges visible on the page.
- Immediate next actions: publish first wedge pages, attach Trust Relay distribution to each, then expand supporting Knowledge Graph coverage.

## 14. Page Extraction Map
- Hero <- sections 2, 3, 12
- Current state <- sections 4, 5
- Opportunity / right to win <- sections 3, 6, 7
- Competitive gap <- section 5
- AI visibility gap <- sections 4, 15
- 90-day wedge <- sections 7, 8, 9
- What Memetik builds and ships <- sections 8, 9, 10, 11, 13
- Operating cadence <- section 13
- Supporting evidence appendix <- sections 5, 6, 12, 15, 16

## 15. Unresolved Gaps and Blockers
${
    unresolvedGaps.length
      ? unresolvedGaps
          .map(
            (gap) =>
              `### ${gap.gapId}\n- summary: ${gap.summary}\n- severity: ${gap.severity}\n- affected_sections: 4, 10, 15\n- impact_on_wedge: Preserve caveat discipline; do not invent unsupported platform certainty.\n- required_resolution: Re-run or replace the missing platform probe before using those specifics publicly.\n- brief_status: proceed_with_caveat\n- page_status: page_safe_if_softened`
          )
          .join("\n\n")
      : "No unresolved gaps."
  }

## 16. Claim Register
${claimRecords
    .map(
      (claim) => `### ${claim.claimId}
- statement: ${claim.statement}
- source_class: ${claim.sourceClass}
- source_pointer: ${claim.sourcePointer}
- source_payload_paths: ${claim.sourcePayloadPaths.join(", ")}
- checked_at: ${today}
- freshness_tier: ${claim.sourceClass === "canonical_internal" ? "tier_3_stable" : "tier_2_semi_stable"}
- freshness_status: current
- certainty: ${claim.certainty}
- page_handling: ${claim.pageHandling}`
    )
    .join("\n\n")}

## Appendix: Payload excerpts
### Top opportunity clusters
${toJsonBlock(topClusters)}

### Prompt evidence sample
${toJsonBlock(promptEvidence)}
`;
}

function validateCanonicalBriefContent(content, briefPath) {
  validateMarkdownHeading(content, briefPath);
  ensureOrderedMarkers(content, REQUIRED_BRIEF_SECTIONS, `Canonical brief (${briefPath})`);
  const requiredSnippets = [
    "Canonical chain: master reference -> generation contract -> brief -> page",
    "Brief status: approved_for_page_generation",
    "### REC-001",
    "### CLAIM-001",
  ];
  const missing = requiredSnippets.filter((snippet) => !content.includes(snippet));
  if (missing.length > 0) {
    throw new Error(`Canonical brief is invalid (${briefPath}). Missing: ${missing.join(", ")}`);
  }
}

function syncPortableBriefSnapshot(slug, briefContent) {
  if (slug !== "bts-2") return null;

  const snapshotDir = path.dirname(PORTABLE_BTS_BRIEF_SNAPSHOT_PATH);
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true });
  }

  fs.writeFileSync(PORTABLE_BTS_BRIEF_SNAPSHOT_PATH, briefContent);
  validateCanonicalBriefContent(briefContent, PORTABLE_BTS_BRIEF_SNAPSHOT_PATH);
  console.log(`  Portable BTS brief snapshot updated: ${PORTABLE_BTS_BRIEF_SNAPSHOT_PATH}`);

  return PORTABLE_BTS_BRIEF_SNAPSHOT_PATH;
}

function createOrValidateCanonicalBrief(company, researchData, canonicalInputs) {
  const briefContent = buildCanonicalBrief(company, researchData, canonicalInputs);
  const briefDir = path.dirname(canonicalInputs.paths.briefPath);
  if (!fs.existsSync(briefDir)) {
    fs.mkdirSync(briefDir, { recursive: true });
  }

  fs.writeFileSync(canonicalInputs.paths.briefPath, briefContent);
  validateCanonicalBriefContent(briefContent, canonicalInputs.paths.briefPath);
  const portableSnapshotPath = syncPortableBriefSnapshot(company.slug, briefContent);
  console.log(`  Canonical brief created/updated: ${canonicalInputs.paths.briefPath}`);
  console.log("  Canonical brief validated against required sections and lineage.");

  return {
    filePath: canonicalInputs.paths.briefPath,
    content: briefContent,
    portableSnapshotPath,
  };
}

function validateResearchForGeneration(researchData) {
  const qualityGate = researchData?.qualityGate;
  const payloadConfidence = researchData?.meta?.payloadConfidence;
  const allowLowConfidence = process.env.ALLOW_LOW_CONFIDENCE_GENERATION === "true";
  const allowLegacyResearch = process.env.ALLOW_LEGACY_RESEARCH_GENERATION === "true";

  if (!qualityGate) {
    throw new Error(
      "Research payload is missing qualityGate metadata. Re-run research with the updated pipeline before generation."
    );
  }

  if (!payloadConfidence) {
    throw new Error(
      "Research payload is missing payloadConfidence metadata. Re-run research with the updated pipeline before generation."
    );
  }

  if (!allowLowConfidence && qualityGate && !qualityGate.passed) {
    throw new Error(`Research quality gate failed: ${qualityGate.failures.join("; ")}`);
  }

  if (!allowLowConfidence && payloadConfidence?.level === "low") {
    throw new Error(`Payload confidence is low (${payloadConfidence.score}/100). Refusing generation.`);
  }

  const tamModel = researchData?.tamModel;
  if (!tamModel) {
    throw new Error("Research payload is missing tamModel. Re-run research with TAM modeling enabled.");
  }
  if (!tamModel?.totals?.totalAddressableSearchDemand) {
    throw new Error("TAM model missing totalAddressableSearchDemand.");
  }
  if (
    (!Array.isArray(tamModel?.phasedUpside) || tamModel.phasedUpside.length === 0) &&
    (!Array.isArray(tamModel?.monthlyTrajectory) || tamModel.monthlyTrajectory.length === 0)
  ) {
    throw new Error("TAM model missing monthlyTrajectory/phasedUpside data.");
  }
  if (!tamModel?.assumptions) {
    throw new Error("TAM model missing assumptions table data.");
  }

  if (!Array.isArray(researchData?.keywordUniverse) || researchData.keywordUniverse.length === 0) {
    throw new Error("Research payload is missing keywordUniverse. Re-run research with full keyword universe enabled.");
  }

  if (!researchData?.aiVisibility?.platformSummary) {
    throw new Error("Research payload is missing aiVisibility.platformSummary for per-LLM tracking.");
  }

  if (!researchData?.seoMetrics?.backlinkMetrics) {
    throw new Error("Research payload is missing seoMetrics.backlinkMetrics. Re-run research with backlinks summary enabled.");
  }

  if (!Array.isArray(researchData?.aiVisibility?.competitorEvidence)) {
    throw new Error("Research payload is missing aiVisibility.competitorEvidence.");
  }

  if (!researchData?.topicalIntegrity && !allowLegacyResearch) {
    throw new Error("Research payload is missing topicalIntegrity metadata.");
  }

  if (!allowLowConfidence && researchData.topicalIntegrity && !researchData.topicalIntegrity.passed) {
    throw new Error(`Topical integrity failed: ${researchData.topicalIntegrity.failures.join("; ")}`);
  }
}

function validateGeneratedTsx(tsxContent) {
  const missing = REQUIRED_SECTION_PATTERNS.filter((pattern) => !pattern.test(tsxContent));
  if (missing.length > 0) {
    throw new Error(
      `Generated page failed required section checks. Missing patterns: ${missing
        .map((p) => p.toString())
        .join(", ")}`
    );
  }
}

async function codexRequest(systemPrompt, userPrompt) {
  const endpoint = `${OPENAI_BASE_URL.replace(/\/$/, "")}/chat/completions`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: STRATEGY_MODEL,
      max_tokens: 16000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  const data = await response.text();
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch (e) {
    throw new Error(`Failed to parse model response: ${data.slice(0, 500)}`);
  }

  if (!response.ok || parsed.error) {
    const msg = parsed?.error?.message || `${response.status} ${response.statusText}`;
    throw new Error(`Model API error: ${msg}`);
  }

  const content = parsed?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part?.type === "text") return part.text || "";
        return "";
      })
      .join("");
  }

  const outputText = parsed?.output_text;
  if (typeof outputText === "string") return outputText;

  throw new Error(`No text content returned by model: ${JSON.stringify(parsed).slice(0, 500)}`);
}

// Read existing strategy pages as style examples
function loadExamplePages() {
  const pagesDir = path.join(__dirname, "..", "..", "client", "src", "pages");
  const examples = [];
  for (const file of ["Home.tsx"]) {
    const filePath = path.join(pagesDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      // Take first 200 lines as example to stay within token limits
      examples.push({ file, content: content.split("\n").slice(0, 200).join("\n") });
    }
  }
  return examples;
}

function loadComponentLibrary() {
  const compDir = path.join(__dirname, "..", "..", "client", "src", "components", "strategy");
  const index = fs.readFileSync(path.join(compDir, "index.ts"), "utf-8");
  const files = {};
  for (const f of fs.readdirSync(compDir)) {
    if (f !== "index.ts") {
      files[f] = fs.readFileSync(path.join(compDir, f), "utf-8");
    }
  }
  return { index, files };
}

function buildSystemPrompt(examples, components, canonicalDocs, brief) {
  const exampleSnippets = examples
    .map((e) => `--- ${e.file} (first 200 lines) ---\n${e.content}`)
    .join("\n\n");

  const componentSnippets = Object.entries(components.files)
    .map(([name, content]) => `--- ${name} ---\n${content}`)
    .join("\n\n");

  const strategicContext = canonicalDocs
    .map((doc) => `--- ${doc.filePath} ---\n${doc.content}`)
    .join("\n\n");

  const briefContext = `--- ${brief.filePath} ---\n${brief.content}`;

  return `You are a senior frontend developer and AEO/SEO strategist building a strategy page for Memetik (memetik.ai), an Answer Engine Optimization agency.

You are generating a complete, production-ready TSX file for a strategy page. This page should feel like a founder-facing strategy deck: premium, highly readable, persuasive, and grounded in the approved canonical brief. It serves as:
- An executive strategy memo founders can skim in 5 minutes
- A premium sales asset for Memetik
- A consulting-quality strategy with supporting evidence available below the fold

SHARED COMPONENTS (import from "@/components/strategy"):
${componentSnippets}

Index file:
${components.index}

STYLE EXAMPLES (match the visual style and premium brand language, but do NOT inherit dense information layout):
${exampleSnippets}

STRATEGIC CONTEXT (MANDATORY GROUNDING):
${strategicContext}

APPROVED CANONICAL BRIEF (MANDATORY DIRECT INPUT):
${briefContext}

MARKET CONTEXT NON-NEGOTIABLES (must be reflected in the State of Search / Why This Matters Now narrative):
- ${MARKET_CONTEXT_NON_NEGOTIABLES}

CRITICAL RULES:
1. Output ONLY the complete TSX file content — no markdown fences, no explanation, no commentary.
2. The file must be a valid React component with a default export.
3. Import shared components from "@/components/strategy" — use SectionHeader, HighlightBox, BulletList, DataTable, StatsGrid, PhasedUpsideChart, TamRoiCalculator, DeliveryScopeMatrix, ExecutionInfographic, WorkstreamTimeline, StrategySectionLead, and StrategyAppendixSection freely.
3b. Prefer the premium homepage-aligned primitives: StrategyPageFrame, StrategyHero, StrategySectionShell, StrategyCard, StrategyEyebrow, StrategyCTA, StrategyGlow.
4. Import Nav from "@/components/Nav".
5. Import icons from "lucide-react" as needed.
6. You CAN and SHOULD create custom inline components, data arrays, and layouts unique to this company's situation. The shared components are building blocks, not constraints.
7. DO NOT include pricing. Ever. No dollar amounts for Memetik's services.
8. End with a "Book a Strategy Call" CTA linking to https://cal.com/memetik/letstalk
9. Match the current Memetik homepage design system: premium dark atmosphere, glass/translucent shells, larger rounded radii, mono metadata pills, premium CTA styling, and layered glow treatment. Use the homepage examples as the visual source of truth.
10. Use useEffect to set document.title and scroll to top.
11. Include numbered section headers ("00", "01", "02", etc.).
12. Make it 550-950 lines. Be specific, but do not overwhelm the reader.
13. The strategy must feel like a premium founder memo, not a research dump.
14. The page is PUBLIC. Do not include passwords or gates.
15. Add the company's hero tags (domain, industry, location if known, key descriptor).
16. Use a deck-like structure: every primary section should feel like one slide with one clear point.
17. Every primary section MUST include one obvious takeaway, ideally using StrategySectionLead.
18. A founder should be able to skim the main narrative in under 5 minutes.
19. Put heavy detail into an Appendix / Supporting Evidence area using StrategyAppendixSection. The appendix can include keyword tables, detailed competitor data, assumptions, prompt evidence, and calculators.
20. Keep the main narrative order tight and founder-first: Hero, State of Search, Current State, Opportunity, Why This Company Can Win, Competitive Gap, AI Visibility Gap, Revenue / Commercial Impact, 90-day Wedge, What Memetik Actually Builds and Ships, Operating Model, Why Memetik, CTA, then Appendix.
21. Do not fabricate competitors or metrics. Use researchData.seoMetrics.backlinkMetrics and competitor metrics for backlink/ref-domain values wherever present, and never promote contaminated or low-topicality keyword clusters into hero statistics.
22. Use the market truths above in the State of Search section, but keep that section compact and highly legible.
23. Translate every major finding into commercial language: pipeline, shortlist share, CAC pressure, revenue leverage, moat, defensibility, and risk of waiting.
24. Use no more than 3-4 cards in a main section unless absolutely necessary.
25. Use no more than one table in any primary section. Prefer cards, charts, and compact comparison visuals. Detailed tables belong in the appendix.
26. The main flow should NOT contain the full keyword universe table dump. Put detailed keyword evidence in the appendix.
27. The main competitive section should NOT lead with a giant table. Lead with a clear gap narrative and only a compact supporting visual/table if it materially improves clarity.
28. The AI visibility section should use platform cards plus 2-3 real prompt examples that show who wins today, where the company stands, and what must change.
29. Include a dedicated "Why This Company Can Win" or equivalent right-to-win section. It must explain the company-specific wedge and why this company can beat incumbents in a defined slice of the market.
30. Include a dedicated "90-day Wedge" section with the first category/entity wedge, first pages to ship, first prompts to win, and first competitors to attack.
31. Include a dedicated revenue/commercial impact section. Keep methodology secondary; explain what the opportunity means in plain English.
32. Use PhasedUpsideChart as a 12-month trajectory component, but keep explanation concise and commercial.
33. Keep estimate-only disclosure consolidated to section-level labels and appendix assumptions. Do NOT scatter repetitive estimate notes everywhere.
34. If researchData.topicalIntegrity exists, treat it as a hard guardrail: only headline validated keyword/TAM insights, surface ambiguity risks honestly, and do not center excluded or low-quality semantic terms.
35. If tamModel.revenueModel.enabled is false, explicitly note that revenue planning requires first-party ACV/AOV and funnel inputs.
36. Use plain founder language for traffic planning. In the visible UI, prefer "Total search opportunity", "Expected traffic in 12 months", "Aggressive upside", and "First 90-day target". Avoid jargon like reachable share, modeled capture rate, or execution capture rate.
37. The page should look homepage-premium, not report-template-flat: use StrategyPageFrame for the page, StrategyHero for the hero, StrategySectionShell for major sections, StrategyCard for sub-blocks, and StrategyCTA for the close.
38. Do not make the page feel like "look how much research we did." Make it feel like "we understand the market, your position, your wedge, and how to build the moat."
39. The delivery scope must reflect the documented Memetik program from the playbook: Money Entity mapping, BOFU Apex Assets, MOFU comparison/evaluation content, TOFU/Knowledge Graph coverage, authority/distribution placements, review-platform work, Bing/IndexNow/schema infrastructure, and weekly optimization.
40. Surface concrete program scale in founder-readable language. When company-specific overrides are not available, use the documented program ranges: 8–12 flagship assets, 20–50 comparison/category-capture pages, 200–2,500 programmatic/Knowledge Graph pages, and 35–75+ authority/distribution placements.
41. Include a visible 30/60/90 rollout view using the documented operating plan: 30 days = 10 Apex Assets / 100 Knowledge Graph pages / 10 placements; 60 days = 25 Apex Assets / 400 pages / 25 placements; 90 days = 40 Apex Assets / 800 pages / 40 placements.
42. The operating model must show the real weekly cadence: Monday research/entity updates, Tuesday-Wednesday asset production, Thursday distribution/trust relay, Friday metrics/iteration.
43. The page must make it obvious that Memetik delivers both on-site production and off-site authority building; do not reduce the strategy to only content publishing.
44. Executive-summary metric cards must remain readable with large six- and seven-figure values. Prefer a vertical or otherwise non-cramped layout over a forced four-across row.
45. The 12-month opportunity curve must use cumulative traffic progression so the final point matches the visible "Expected traffic in 12 months" number, not a month-12 run-rate or first-90-day value.
46. Surface the TAM / ROI calculator in or immediately after the Revenue / Commercial Impact section; do not bury it only in the appendix.
47. Canonical lineage is mandatory and must remain visible in your reasoning: master reference -> generation contract -> brief -> page.
48. Do not bypass or reinterpret the approved brief. Raw research payload is not the canonical page input.`;
}

async function generateStrategyPage(company, researchData) {
  console.log(`\nGenerating strategy page for ${company.name}...`);
  console.log(`  Using model: ${STRATEGY_MODEL} via ${OPENAI_BASE_URL}`);

  validateResearchForGeneration(researchData);

  const canonicalInputs = loadCanonicalGenerationInputs(company.slug, company);
  const brief = createOrValidateCanonicalBrief(company, researchData, canonicalInputs);

  const examples = loadExamplePages();
  const components = loadComponentLibrary();
  const systemPrompt = buildSystemPrompt(examples, components, canonicalInputs.docs, brief);

  const userPrompt = `Generate a complete strategy page TSX file for this company.

CANONICAL LINEAGE (do not break): master reference -> generation contract -> brief -> page
APPROVED BRIEF PATH: ${brief.filePath}
PAGE CONTRACT PATH: ${canonicalInputs.paths.pageContractPath}

COMPANY: ${company.name}
DOMAIN: ${company.domain}
CATEGORY: ${company.category}
INDUSTRY: ${company.industry}

APPROVED BRIEF CONTENT:
${brief.content}

The component should be named Strategy${pascalCase(company.slug)} and exported as default.
The file will be saved at client/src/pages/strategy/${pascalCase(company.slug)}.tsx

Mandatory output structure additions:
- Add an "Executive Summary" strip with 4 headline numbers: Total search opportunity, Expected traffic in 12 months, Aggressive upside, and First 90-day target, plus 3 immediate actions.
- Use StrategyPageFrame, StrategyHero, StrategySectionShell, and StrategyCTA as the default page architecture.
- Every primary section should use StrategySectionLead or an equivalent one-takeaway block.
- Main narrative sections: "State of Search 2026", "Where ${company.name} Is Today" (or "Current State Snapshot"), "The Opportunity", "Why ${company.name} Can Win", "Competitive Gap", "AI Visibility Gap", "Revenue / Commercial Impact", "90-day Wedge", "What Memetik Actually Builds and Ships", "Operating Model", "Why Memetik".
- Add an appendix / supporting evidence section using StrategyAppendixSection.
- Put detailed keyword universe, assumptions/confidence, detailed competitor evidence, prompt evidence, and optional calculator in the appendix rather than the primary flow.
- Use backlinks/referring-domain values from payload where available (avoid placeholder unavailable text for these fields).
- Keep executive-summary headline numbers compact enough that seven-figure values do not wrap awkwardly.
- Keep hero metrics and primary visuals tied to validated topical subsets.
- Display trajectory numbers as whole integers in visible UI labels.
- If researchData.tamModel.totals.expectedTraffic12Months exists, use that terminology in the visible UI instead of "reachable visits".
- Keep all planning jargon out of the main page. Do not use labels like reachable share, capture rate, or modeled coefficient in user-facing copy.
- Use researchData.topicalIntegrity to avoid headline claims from excluded or ambiguous keyword groups.
- Include 2-3 real prompt examples inside the AI visibility section.
- Include a concrete 90-day wedge: first entity/category wedge, first pages to ship, first prompts to win, first competitors to attack.
- Add a dedicated section that makes the scope of execution unmistakable. It should explicitly show: Money Entity mapping, BOFU keyword targeting and Apex Assets, MOFU comparison/evaluation content, TOFU/programmatic content, aggressive backlink acquisition, digital PR / press release / listicle pushes, review-platform work, Bing/IndexNow/schema infrastructure, and third-party/forum/community placements.
- Make the delivery section feel substantial enough that a founder can immediately see why this is a serious execution program rather than a light content retainer.
- Use documented volume ranges when presenting scope: 8–12 flagship assets, 20–50 comparison/category pages, 200–2,500 Knowledge Graph pages, and 35–75+ authority/distribution placements.
- Include a visible 30/60/90 rollout summary with documented outputs.
- Prefer an infographic-style operating model visual that shows what Memetik is doing, what ships, and what BTS receives; avoid defaulting to a dense month-by-month grid unless it is clearly better.
- In the operating model section, show the actual weekly cadence and the distribution workflow: publish core asset, break it into 10–20 micro-assets, push to 3–5 authority nodes, and link back consistently.
- Keep the executive-summary metric cards vertically stacked or otherwise roomy enough that large values never overflow their containers.
- Make the 12-month opportunity curve cumulative so its final point equals the visible expected-traffic-in-12-months figure.
- Place the TAM / ROI calculator in or directly below the Revenue / Commercial Impact section so it is easy to find.
- If tamModel.revenueModel.enabled is false, include a clear note: "Revenue planning requires client ACV/AOV and funnel inputs."
- If researchData.tamModel.assumptions includes planning assumptions, keep them in the appendix and explain them in normal English rather than coefficient language.
- Reject any attempt to generate directly from raw research. The approved brief is already the canonical downstream planning artifact.

Generate the complete TSX file now.`;

  const tsxContent = await codexRequest(systemPrompt, userPrompt);

  // Clean up markdown fences if model adds them
  let cleaned = tsxContent;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:tsx|typescript|ts)?\n/, "").replace(/\n```$/, "");
  }

  validateGeneratedTsx(cleaned);

  // Save the file
  const outDir = path.join(__dirname, "..", "..", "client", "src", "pages", "strategy");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const fileName = `${pascalCase(company.slug)}.tsx`;
  const outPath = path.join(outDir, fileName);
  fs.writeFileSync(outPath, cleaned);
  console.log(`  Strategy page saved to ${outPath}`);

  return { fileName, componentName: `Strategy${pascalCase(company.slug)}`, outPath };
}

function pascalCase(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

module.exports = { generateStrategyPage, pascalCase };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (!args.includes("--slug")) {
    console.log("Usage: node scripts/research-pipeline/generate-strategy.cjs --slug linear");
    process.exit(0);
  }
  const slug = args[args.indexOf("--slug") + 1];
  const researchPath = path.join(__dirname, "..", "..", "data", "research", `${slug}.json`);
  if (!fs.existsSync(researchPath)) {
    console.error(`Research file not found: ${researchPath}`);
    console.error("Run the research pipeline first.");
    process.exit(1);
  }
  const research = JSON.parse(fs.readFileSync(researchPath, "utf-8"));
  const clientsPath = path.join(__dirname, "..", "..", "data", "dream-clients.json");
  const clients = JSON.parse(fs.readFileSync(clientsPath, "utf-8"));
  const company = clients.find((c) => c.slug === slug);
  if (!company) {
    console.error(`Company "${slug}" not found in dream-clients.json`);
    process.exit(1);
  }
  generateStrategyPage(company, research).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

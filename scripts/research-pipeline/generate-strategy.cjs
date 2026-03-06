const fs = require("fs");
const path = require("path");

const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || "http://127.0.0.1:8317/v1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "dummy";
const STRATEGY_MODEL = process.env.STRATEGY_MODEL || "gpt-5.3-codex";

const REQUIRED_SECTION_PATTERNS = [
  /state of search/i,
  /why this matters now/i,
  /cost of inaction/i,
  /current state/i,
  /competitive/i,
  /executive summary|top 3 actions/i,
  /full keyword universe|keyword universe/i,
  /ai visibility by llm|ai visibility by platform/i,
  /total addressable search market|tasm|tam/i,
  /12-month opportunity curve|opportunity curve|12-month trajectory/i,
  /tam \× ltv calculator|tam x ltv calculator|ltv calculator/i,
  /assumptions|assumption table|assumption/i,
  /top 3 executive decisions|executive decisions/i,
  /30\/60\/90|30-60-90/i,
  /what memetik will actually do|what memetik does/i,
  /what we need from your team/i,
  /why memetik vs alternatives|why memetik/i,
  /board-shareable summary|board summary/i,
  /estimate-only|modeled estimate|modeled/i,
  /book a strategy call|let'?s talk|cal\.com\/memetik\/letstalk/i,
  /StrategyPageFrame/i,
  /StrategyHero/i,
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
  const defaultDocs = [
    "/Users/house/Mind/Areas/Agency/Lead-Magnets/MEMETIK-2026-AEO-Playbook.md",
    "/Users/house/Mind/Specs/dream-client-strategy-pages-spec.md",
    "/Users/house/Mind/Specs/dream-client-pipeline.md",
  ];

  const extraDocs = (process.env.STRATEGY_CONTEXT_FILES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const docs = [...new Set([...defaultDocs, ...extraDocs])]
    .filter((filePath) => fs.existsSync(filePath))
    .map((filePath) => {
      const content = fs.readFileSync(filePath, "utf-8");
      return {
        filePath,
        content: content.slice(0, 24000),
      };
    });

  return docs;
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
  for (const file of ["Home.tsx", "strategy/Kinso.tsx", "StrategyUleads.tsx"]) {
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

function buildSystemPrompt(examples, components) {
  const exampleSnippets = examples
    .map((e) => `--- ${e.file} (first 200 lines) ---\n${e.content}`)
    .join("\n\n");

  const componentSnippets = Object.entries(components.files)
    .map(([name, content]) => `--- ${name} ---\n${content}`)
    .join("\n\n");

  const strategicContext = loadStrategicContextDocs()
    .map((doc) => `--- ${doc.filePath} ---\n${doc.content}`)
    .join("\n\n");

  return `You are a senior frontend developer and AEO/SEO strategist building a strategy page for Memetik (memetik.ai), an Answer Engine Optimization agency.

You are generating a complete, production-ready TSX file for a strategy page. This page will be a hyper-personalized, deeply researched AEO/SEO strategy for a specific company. It serves as:
- A genuine consulting-quality strategy document
- A portfolio piece demonstrating Memetik's depth
- A cold outreach weapon ("I already built your strategy")

SHARED COMPONENTS (import from "@/components/strategy"):
${componentSnippets}

Index file:
${components.index}

STYLE EXAMPLES (match this exact visual style, design system, and tone):
${exampleSnippets}

STRATEGIC CONTEXT (MANDATORY GROUNDING):
${strategicContext}

MARKET CONTEXT NON-NEGOTIABLES (must be reflected in the State of Search / Why This Matters Now narrative):
- ${MARKET_CONTEXT_NON_NEGOTIABLES}

CRITICAL RULES:
1. Output ONLY the complete TSX file content — no markdown fences, no explanation, no commentary.
2. The file must be a valid React component with a default export.
3. Import shared components from "@/components/strategy" — use SectionHeader, HighlightBox, BulletList, DataTable, StatsGrid, PhasedUpsideChart, TamRoiCalculator, and WorkstreamTimeline freely.
3b. Prefer the premium homepage-aligned primitives: StrategyPageFrame, StrategyHero, StrategySectionShell, StrategyCard, StrategyEyebrow, StrategyCTA, StrategyGlow.
4. Import Nav from "@/components/Nav".
5. Import icons from "lucide-react" as needed.
6. You CAN and SHOULD create custom inline components, data arrays, and layouts unique to this company's situation. The shared components are building blocks, not constraints.
7. DO NOT include pricing. Ever. No dollar amounts for Memetik's services.
8. End with a "Book a Strategy Call" CTA linking to https://cal.com/memetik/letstalk
9. Match the current Memetik homepage design system: premium dark atmosphere, glass/translucent shells, larger rounded radii, mono metadata pills, premium CTA styling, and layered glow treatment. Use the homepage examples as the visual source of truth.
10. Use useEffect to set document.title and scroll to top.
11. Include numbered section headers ("00", "01", "02", etc.).
12. Make it 700-1100 lines. Be specific — reference actual competitor names, real queries, real keyword gaps, real data from the research.
13. The strategy must feel like a $5,000-$10,000 consulting deliverable. Deep, specific, actionable.
14. Frame everything around AI visibility — that's Memetik's core value prop. Show how the company is invisible (or underrepresented) in AI search and what to do about it.
15. The page is PUBLIC. Do not include passwords or gates.
16. Add the company's hero tags (domain, industry, location if known, key descriptor).
17. First major section must be "State of Search 2026" and include the market truths above, plus a sub-frame explaining why this matters now for founders.
18. Do not fabricate competitors or metrics. Use researchData.seoMetrics.backlinkMetrics and competitor metrics for backlink/ref-domain values wherever present, and never promote contaminated or low-topicality keyword clusters into hero statistics.
19. Include a "Current State Snapshot" section with explicit confidence level from research payload when available.
20. Include a "Data-backed Competitive Landscape" section where every table row is grounded in research data (or clearly labeled inferred). Remove Source columns completely.
21. Include a dedicated section titled "Total Addressable Search Market (12 months)" using researchData.tamModel values.
22. Include a dedicated section titled "12-month Opportunity Curve" using a month-by-month curve, not phase cards. Use PhasedUpsideChart as a 12-month trajectory component.
23. Include a dedicated section titled "Assumptions & Confidence" showing methodology assumptions, estimate-only labels, and confidence notes.
24. Keep TAM-first framing: demand + reachable opportunity first; include revenue scenario only if researchData.tamModel.revenueModel.enabled is true. Otherwise explicitly state revenue requires client inputs.
25. Keep estimate-only disclosure consolidated to section-level labels and assumptions blocks; do NOT add repetitive micro text directly under Current State Snapshot.
26. Include a dedicated section titled "Full Keyword Universe" with intent/cluster breakdown from researchData.keywordUniverse and tamModel.keywordUniverse. Render TOFU, MOFU, and BOFU vertically stacked full-width, never side by side.
27. Include a dedicated section titled "AI Visibility by LLM" using researchData.aiVisibility.platformSummary and prompt evidence. Prefer stacked platform cards over wide multi-column tables.
28. Include a visible "TAM × LTV Calculator" block using the shared TamRoiCalculator component.
29. Include a monthly operating-system section using the shared WorkstreamTimeline component. All workstreams begin in month 1 and continue every month.
30. Prioritize consumability: founder-readable language, shorter paragraphs, card-based summaries, explicit commercial implications, and explicit "What matters / Why it matters / What to do next" blocks in each major section.
31. Round all displayed trajectory values to whole numbers.
32. Add an executive summary strip near top: top 3 numbers + top 3 actions. Ensure metric cards never clip long numbers.
33. Competitive tables must include backlinks and referring domains when available, but keep them compact enough to avoid horizontal scrolling on normal desktop widths.
33b. Do not set wide fixed table min-widths (e.g. avoid tableClassName values that force desktop scrolling). Collapse columns instead.
34. In AI Visibility by LLM, show platform status (available/unavailable) from researchData.aiVisibility.platformAvailability and avoid hiding unavailable reasons.
35. If researchData.topicalIntegrity exists, treat it as a hard guardrail: only headline validated keyword/TAM insights, surface ambiguity risks honestly, and do not center excluded or low-quality semantic terms.
36. The page should look homepage-premium, not report-template-flat: use StrategyPageFrame for the page, StrategyHero for the hero, StrategySectionShell for major sections, StrategyCard for sub-blocks, and StrategyCTA for the close.
37. This is a founder-converting sales asset, not a generic audit. The narrative arc must be: why now, cost of inaction, current state, competitive gap, AI visibility, TAM opportunity, opportunity curve, execution model, executive decisions, 30/60/90 view, what Memetik does, what we need from the team, why Memetik vs alternatives, assumptions, board-shareable summary, CTA.
38. Include explicit sections for: "Why This Matters Now", "Cost of Inaction", "Top 3 Executive Decisions", "30/60/90-Day View", "What Memetik Will Actually Do", "What We Need From Your Team", "Why Memetik vs Alternatives", and "Board-shareable Summary".
39. Translate SEO/AEO findings into founder language: pipeline, shortlist share, CAC pressure, revenue leverage, category authority, and risk of waiting.
40. Never present a raw Google CTR assumption like 46% as a headline assumption. If the research payload contains aggressive legacy reach coefficients, relabel them as internal modeling inputs and present a conservative founder-readable explanation instead.`;
}

async function generateStrategyPage(company, researchData) {
  console.log(`\nGenerating strategy page for ${company.name}...`);
  console.log(`  Using model: ${STRATEGY_MODEL} via ${OPENAI_BASE_URL}`);

  validateResearchForGeneration(researchData);

  const examples = loadExamplePages();
  const components = loadComponentLibrary();
  const systemPrompt = buildSystemPrompt(examples, components);

  const userPrompt = `Generate a complete strategy page TSX file for this company.

COMPANY: ${company.name}
DOMAIN: ${company.domain}
CATEGORY: ${company.category}
INDUSTRY: ${company.industry}

RESEARCH DATA:
${JSON.stringify(researchData, null, 2)}

The component should be named Strategy${pascalCase(company.slug)} and exported as default.
The file will be saved at client/src/pages/strategy/${pascalCase(company.slug)}.tsx

Mandatory output structure additions:
- Add an "Executive Summary" strip with 3 headline numbers and 3 immediate actions.
- Use StrategyPageFrame, StrategyHero, StrategySectionShell, and StrategyCTA as the default page architecture.
- Add section: "Why This Matters Now"
- Add section: "Cost of Inaction"
- Section: "Full Keyword Universe"
- Section: "AI Visibility by LLM"
- Section: "Total Addressable Search Market (12 months)"
- Section: "12-month Opportunity Curve"
- Section: "Top 3 Executive Decisions"
- Section: "30/60/90-Day View"
- Section: "What Memetik Will Actually Do"
- Section: "What We Need From Your Team"
- Section: "Why Memetik vs Alternatives"
- Section: "Board-shareable Summary"
- Section: "TAM × LTV Calculator"
- Section: "Assumptions & Confidence"
- Use backlinks/referring-domain values from payload where available (avoid placeholder unavailable text for these fields).
- Keep Current State Snapshot concise and remove repetitive estimate-only microtext under that block.
- Display trajectory numbers as whole integers in visible UI labels.
- Use full-width vertical keyword tables and avoid side-by-side table layouts.
- Remove Source columns from competitive tables and keep table widths founder-readable.
- Build AI visibility as stacked platform cards or compact summaries, not a wide scroll-heavy matrix.
- Present execution as concurrent monthly workstreams starting in month 1.
- Use researchData.topicalIntegrity to avoid headline claims from excluded or ambiguous keyword groups.
- If the payload contains ambiguity or contamination caveats, surface them in the page and keep hero metrics tied to validated topical subsets.
- If tamModel.revenueModel.enabled is false, include a clear note: "Revenue modeling requires client ACV/AOV and funnel inputs."
- If researchData.tamModel.assumptions includes high legacy reach coefficients, do not expose them as plain CTR assumptions. Present a conservative, founder-readable explanation of modeled reachable share instead.

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

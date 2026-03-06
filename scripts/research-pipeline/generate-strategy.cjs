const fs = require("fs");
const path = require("path");

const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || "http://127.0.0.1:8317/v1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "dummy";
const STRATEGY_MODEL = process.env.STRATEGY_MODEL || "gpt-5.3-codex";

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

You are generating a complete, production-ready TSX file for a strategy page. This page should feel like a founder-facing strategy deck: premium, highly readable, persuasive, and grounded in real research. It serves as:
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
43. The page must make it obvious that Memetik delivers both on-site production and off-site authority building; do not reduce the strategy to only content publishing.`;
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
- If tamModel.revenueModel.enabled is false, include a clear note: "Revenue planning requires client ACV/AOV and funnel inputs."
- If researchData.tamModel.assumptions includes planning assumptions, keep them in the appendix and explain them in normal English rather than coefficient language.

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

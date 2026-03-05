const https = require("https");
const fs = require("fs");
const path = require("path");

const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || "http://127.0.0.1:8317/v1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "dummy";
const STRATEGY_MODEL = process.env.STRATEGY_MODEL || "gpt-5.3-codex";

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
  for (const file of ["StrategyUleads.tsx", "StrategySignifyIP.tsx"]) {
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

CRITICAL RULES:
1. Output ONLY the complete TSX file content — no markdown fences, no explanation, no commentary.
2. The file must be a valid React component with a default export.
3. Import shared components from "@/components/strategy" — use SectionHeader, HighlightBox, PhaseBlock, BulletList, DataTable, StatsGrid freely.
4. Import Nav from "@/components/Nav".
5. Import icons from "lucide-react" as needed.
6. You CAN and SHOULD create custom inline components, data arrays, and layouts unique to this company's situation. The shared components are building blocks, not constraints.
7. DO NOT include pricing. Ever. No dollar amounts for Memetik's services.
8. End with a "Book a Strategy Call" CTA linking to https://cal.com/memetik/letstalk
9. Match the dark theme design: font-display for headings, font-mono for labels/tags, font-sans for body. Use primary, foreground, muted-foreground, secondary, border color tokens.
10. Use useEffect to set document.title and scroll to top.
11. Include numbered section headers ("00", "01", "02", etc.).
12. Make it 600-900 lines. Be specific — reference actual competitor names, real queries, real keyword gaps, real data from the research.
13. The strategy must feel like a $5,000-$10,000 consulting deliverable. Deep, specific, actionable.
14. Frame everything around AI visibility — that's Memetik's core value prop. Show how the company is invisible (or underrepresented) in AI search and what to do about it.
15. The page is PUBLIC. Do not include passwords or gates.
16. Add the company's hero tags (domain, industry, location if known, key descriptor).`;
}

async function generateStrategyPage(company, researchData) {
  console.log(`\nGenerating strategy page for ${company.name}...`);
  console.log(`  Using model: ${STRATEGY_MODEL} via ${OPENAI_BASE_URL}`);

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

Generate the complete TSX file now.`;

  const tsxContent = await codexRequest(systemPrompt, userPrompt);

  // Clean up any markdown fences if Claude adds them
  let cleaned = tsxContent;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:tsx|typescript|ts)?\n/, "").replace(/\n```$/, "");
  }

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
  generateStrategyPage(company, research).catch(console.error);
}

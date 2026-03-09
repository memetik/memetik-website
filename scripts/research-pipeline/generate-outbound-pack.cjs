const fs = require("fs");
const http = require("http");
const https = require("https");
const os = require("os");
const path = require("path");
const { URL } = require("url");

const DEFAULT_OPENAI_BASE_URL = "http://127.0.0.1:8317/v1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "dummy";
const OUTBOUND_PACK_MODEL = process.env.OUTBOUND_PACK_MODEL || process.env.STRATEGY_MODEL || "gpt-5.4(high)";
const REPO_ROOT = path.join(__dirname, "..", "..");
const REPO_STRATEGY_CONTRACT_ROOT = path.join(REPO_ROOT, "contracts", "strategy");
const REPO_OUTBOUND_PACK_ROOT = path.join(REPO_ROOT, "content", "strategy-outbound-packs");
const OBSIDIAN_OUTBOUND_PACK_ROOT =
  process.env.OBSIDIAN_STRATEGY_OUTBOUND_PACK_DIR ||
  path.join(os.homedir(), "Mind", "Areas", "Agency", "Clients", "SaaS", "memetik", "Strategy Outbound Packs");
const OUTBOUND_PACK_CONTRACT_PATH =
  process.env.STRATEGY_OUTBOUND_PACK_CONTRACT_PATH ||
  path.join(REPO_STRATEGY_CONTRACT_ROOT, "strategy-outbound-pack-contract.md");
const OPENAI_BASE_URL = resolveOpenAIBaseUrl(OUTBOUND_PACK_MODEL);
const MODEL_REQUEST_MAX_RETRIES = Number(process.env.OUTBOUND_PACK_MODEL_MAX_RETRIES || 3);
const MODEL_REQUEST_TIMEOUT_MS = Number(process.env.OUTBOUND_PACK_MODEL_TIMEOUT_MS || 15 * 60 * 1000);

const OUTBOUND_PACK_FILES = [
  { key: "campaignBrief", fileName: "00 Campaign Brief.md", titleSuffix: "Campaign Brief", assetType: "campaign-brief" },
  { key: "trafficAngle", fileName: "01 Traffic Angle.md", titleSuffix: "Traffic Angle", assetType: "traffic-angle" },
  { key: "revenueAngle", fileName: "02 Revenue Angle.md", titleSuffix: "Revenue Angle", assetType: "revenue-angle" },
  { key: "aiVisibilityAngle", fileName: "03 AI Visibility Angle.md", titleSuffix: "AI Visibility Angle", assetType: "ai-visibility-angle" },
  { key: "hookBank", fileName: "04 Hook Bank.md", titleSuffix: "Hook Bank", assetType: "hook-bank" },
  { key: "carouselOutline", fileName: "05 Carousel Outline.md", titleSuffix: "Carousel Outline", assetType: "carousel-outline" },
  { key: "loomScript", fileName: "06 Loom Script.md", titleSuffix: "Loom Script", assetType: "loom-script" },
  { key: "commentDmFollowUp", fileName: "07 Comment DM Follow-Up.md", titleSuffix: "Comment DM Follow-Up", assetType: "comment-dm-follow-up" },
  { key: "coldEmail", fileName: "08 Cold Email.md", titleSuffix: "Cold Email", assetType: "cold-email" },
  { key: "publishingLog", fileName: "99 Publishing Log.md", titleSuffix: "Publishing Log", assetType: "publishing-log" },
];

function readJsonIfPresent(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function normalizeBaseUrl(value) {
  if (!value) return null;
  const trimmed = String(value).trim().replace(/\/$/, "");
  if (!trimmed) return null;
  return /\/v1$/i.test(trimmed) ? trimmed : `${trimmed}/v1`;
}

function getFactoryCustomModels() {
  const factoryRoot = path.join(os.homedir(), ".factory");
  const settings = readJsonIfPresent(path.join(factoryRoot, "settings.json"));
  const config = readJsonIfPresent(path.join(factoryRoot, "config.json"));
  const settingsModels = Array.isArray(settings?.customModels)
    ? settings.customModels.map((model) => ({ model: model?.model, provider: model?.provider, baseUrl: model?.baseUrl }))
    : [];
  const configModels = Array.isArray(config?.custom_models)
    ? config.custom_models.map((model) => ({ model: model?.model, provider: model?.provider, baseUrl: model?.base_url }))
    : [];

  return [...settingsModels, ...configModels];
}

function resolveOpenAIBaseUrl(modelName) {
  if (process.env.OPENAI_BASE_URL) {
    return normalizeBaseUrl(process.env.OPENAI_BASE_URL) || DEFAULT_OPENAI_BASE_URL;
  }

  const customModels = getFactoryCustomModels();
  const exactMatch = customModels.find((entry) => entry?.provider === "openai" && entry?.model === modelName && entry?.baseUrl);
  if (exactMatch?.baseUrl) {
    return normalizeBaseUrl(exactMatch.baseUrl) || DEFAULT_OPENAI_BASE_URL;
  }

  const familyMatch = customModels.find(
    (entry) => entry?.provider === "openai" && /^gpt-5\.4(?:\(|$)/i.test(entry?.model || "") && entry?.baseUrl
  );
  if (familyMatch?.baseUrl) {
    return normalizeBaseUrl(familyMatch.baseUrl) || DEFAULT_OPENAI_BASE_URL;
  }

  return DEFAULT_OPENAI_BASE_URL;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetriableModelError(message) {
  return /(internal_error|headers timeout|timed out|timeout|econnreset|socket hang up|stream error|502|503|504|rate limit)/i.test(
    String(message || "")
  );
}

async function requestModelCompletion(payload) {
  const endpoint = `${OPENAI_BASE_URL.replace(/\/$/, "")}/chat/completions`;
  let lastError = null;

  for (let attempt = 1; attempt <= MODEL_REQUEST_MAX_RETRIES; attempt += 1) {
    try {
      const parsed = await new Promise((resolve, reject) => {
        const requestBody = JSON.stringify(payload);
        const url = new URL(endpoint);
        const transport = url.protocol === "https:" ? https : http;
        const req = transport.request(
          url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Length": Buffer.byteLength(requestBody),
            },
          },
          (response) => {
            let data = "";
            response.setEncoding("utf8");
            response.on("data", (chunk) => {
              data += chunk;
            });
            response.on("end", () => {
              let parsedResponse;
              try {
                parsedResponse = JSON.parse(data);
              } catch {
                reject(new Error(`Failed to parse outbound-pack model response: ${data.slice(0, 500)}`));
                return;
              }

              if (response.statusCode >= 400 || parsedResponse?.error) {
                const msg = parsedResponse?.error?.message || `${response.statusCode || 500}`;
                reject(new Error(`Outbound-pack model API error: ${msg}`));
                return;
              }

              resolve(parsedResponse);
            });
          }
        );

        req.setTimeout(MODEL_REQUEST_TIMEOUT_MS, () => {
          req.destroy(new Error(`Outbound-pack model request timed out after ${MODEL_REQUEST_TIMEOUT_MS}ms`));
        });

        req.on("error", reject);
        req.write(requestBody);
        req.end();
      });

      return parsed;
    } catch (error) {
      lastError = error;
      if (attempt >= MODEL_REQUEST_MAX_RETRIES || !isRetriableModelError(error?.message)) break;
      await sleep(1500 * attempt);
    }
  }

  throw lastError;
}

async function codexRequest(systemPrompt, userPrompt) {
  const parsed = await requestModelCompletion({
    model: OUTBOUND_PACK_MODEL,
    max_tokens: 16000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

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

  throw new Error(`No text content returned by outbound-pack model: ${JSON.stringify(parsed).slice(0, 500)}`);
}

function pascalCase(slug) {
  return String(slug || "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function sanitizeFolderName(value) {
  return String(value || "")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim() || "Outbound Pack";
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(value));
}

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "n/a";
  return `${Number(value).toFixed(1)}%`;
}

function readRequiredArtifact(filePath, label, validators = []) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} is required but missing: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.trim()) {
    throw new Error(`${label} is empty: ${filePath}`);
  }

  validators.forEach((validator) => validator(content, filePath));
  return { filePath, content };
}

function validateMarkdownHeading(content, filePath) {
  if (!content.trim().startsWith("#")) {
    throw new Error(`Markdown artifact must start with a heading: ${filePath}`);
  }
}

function validateOutboundPackContract(content, filePath) {
  const requiredSnippets = [/Strategy Outbound Pack/i, /Campaign Brief/i, /Traffic Angle/i, /Publishing Log/i];
  const missing = requiredSnippets.filter((snippet) => !snippet.test(content)).map((snippet) => snippet.toString());
  if (missing.length > 0) {
    throw new Error(`Outbound-pack contract is invalid (${filePath}). Missing: ${missing.join(", ")}`);
  }
}

function loadOutboundPackContract() {
  return readRequiredArtifact(OUTBOUND_PACK_CONTRACT_PATH, "Strategy outbound-pack contract", [
    validateMarkdownHeading,
    validateOutboundPackContract,
  ]);
}

function stripCodeFences(value) {
  const text = String(value || "").trim();
  if (!text.startsWith("```")) return text;
  return text.replace(/^```(?:json|md|markdown)?\n/, "").replace(/\n```$/, "").trim();
}

function parseJsonModelResponse(raw, label) {
  const cleaned = stripCodeFences(raw);
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`${label} did not return a JSON object.`);
  }

  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch (error) {
    throw new Error(`${label} returned invalid JSON: ${error.message}`);
  }
}

function ensureArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a non-empty array.`);
  }
  return value;
}

function ensureString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value.trim();
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function buildYamlScalar(value) {
  if (value === null || value === undefined) return '""';
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(String(value));
}

function buildFrontmatter(fields) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach((item) => lines.push(`  - ${buildYamlScalar(item)}`));
      continue;
    }
    lines.push(`${key}: ${buildYamlScalar(value)}`);
  }
  lines.push("---");
  return lines.join("\n");
}

function renderLinesBlock(lines = []) {
  return ensureArray(lines, "Script block lines")
    .map((line) => ensureString(line, "Script line"))
    .join("\n\n");
}

function renderBulletList(items = []) {
  return ensureArray(items, "Bullet list")
    .map((item) => `- ${ensureString(item, "Bullet item")}`)
    .join("\n");
}

function renderParagraphs(paragraphs = []) {
  return ensureArray(paragraphs, "Paragraph list")
    .map((paragraph) => ensureString(paragraph, "Paragraph"))
    .join("\n\n");
}

function getRepoOutboundPackDir(slug) {
  return path.join(REPO_OUTBOUND_PACK_ROOT, slug);
}

function getObsidianOutboundPackDir(company) {
  return path.join(OBSIDIAN_OUTBOUND_PACK_ROOT, sanitizeFolderName(company?.name || pascalCase(company?.slug)));
}

function buildPackFileTitle(companyName, suffix) {
  return `${companyName} - ${suffix}`;
}

function makeCommonFrontmatter(company, assetType, primaryAngle, ctaText, sourceBriefPath) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    company: company.name,
    slug: company.slug,
    pack: "strategy-outbound-pack",
    asset_type: assetType,
    status: "draft",
    created: today,
    updated: today,
    source_strategy_page: `https://www.memetik.ai/strategy/${company.slug}`,
    source_strategy_brief: path.basename(sourceBriefPath),
    primary_angle: primaryAngle || "campaign",
    cta_type: "comment",
    cta_text: ctaText,
  };
}

function validateWrittenNote(filePath, content, title) {
  if (!content.startsWith("---\n")) {
    throw new Error(`Outbound-pack note is missing frontmatter: ${filePath}`);
  }
  if (!content.includes(`# ${title}`)) {
    throw new Error(`Outbound-pack note is missing expected title: ${filePath}`);
  }
}

function buildCampaignBriefNote(company, plan, sourceBriefPath) {
  const title = buildPackFileTitle(company.name, "Campaign Brief");
  const frontmatter = buildFrontmatter(
    makeCommonFrontmatter(company, "campaign-brief", "campaign", plan.primary_cta.text, sourceBriefPath)
  );

  const angleEntries = [
    ["Traffic", plan.angles.traffic],
    ["Revenue", plan.angles.revenue],
    ["AI Visibility", plan.angles.ai_visibility],
  ];

  const body = [
    "## Core Thesis",
    ensureString(plan.campaign_thesis, "Campaign thesis"),
    "",
    "## Why This Pack Exists",
    ensureString(plan.why_now, "Campaign why-now"),
    "",
    "## Approved Proof Points",
    renderBulletList(plan.approved_proof_points),
    "",
    "## Claims To Avoid",
    renderBulletList(plan.claims_to_avoid),
    "",
    "## Primary CTA",
    renderBulletList([
      `Type: ${plan.primary_cta.type}`,
      `CTA: ${plan.primary_cta.text}`,
      `Follow-up offer: ${plan.primary_cta.follow_up_offer}`,
    ]),
    "",
    "## Angle Map",
    angleEntries
      .map(([label, angle]) => `### ${label}\n${ensureString(angle.core_angle, `${label} core angle`)}`)
      .join("\n\n"),
    "",
    "## Pack Assets",
    renderBulletList(OUTBOUND_PACK_FILES.map((entry) => entry.fileName)),
    "",
    "## Source Lineage",
    renderBulletList([
      `Strategy page: https://www.memetik.ai/strategy/${company.slug}`,
      `Strategy brief: ${path.basename(sourceBriefPath)}`,
      "Canonical chain: research payload -> internal strategy brief -> founder-facing website strategy page -> founder-advisory content drafts -> strategy outbound pack",
    ]),
  ].join("\n");

  return { title, content: `${frontmatter}\n\n# ${title}\n\n${body}\n` };
}

function buildAngleNote(company, label, primaryAngle, angle, sourceBriefPath, ctaText) {
  const title = buildPackFileTitle(company.name, `${label} Angle`);
  const frontmatter = buildFrontmatter(
    makeCommonFrontmatter(company, `${primaryAngle}-angle`, primaryAngle, ctaText, sourceBriefPath)
  );

  const body = [
    "## Core Angle",
    ensureString(angle.core_angle, `${label} core angle`),
    "",
    "## Why It Matters Now",
    ensureString(angle.why_it_matters_now, `${label} why-now`),
    "",
    "## Approved Proof Points",
    renderBulletList(angle.proof_points),
    "",
    "## Claims To Avoid",
    renderBulletList(angle.claims_to_avoid),
    "",
    "## Rough Video Script",
    "### Hook",
    renderLinesBlock(angle.video_script.hook),
    "",
    "### Body",
    renderLinesBlock(angle.video_script.body),
    "",
    "### CTA",
    renderLinesBlock(angle.video_script.cta),
    "",
    "## LinkedIn Post",
    renderParagraphs(angle.linkedin_post),
    "",
    "## Repurposing Notes",
    renderBulletList(angle.repurposing_notes),
  ].join("\n");

  return { title, content: `${frontmatter}\n\n# ${title}\n\n${body}\n` };
}

function buildHookBankNote(company, derivatives, sourceBriefPath, ctaText) {
  const title = buildPackFileTitle(company.name, "Hook Bank");
  const frontmatter = buildFrontmatter(makeCommonFrontmatter(company, "hook-bank", "campaign", ctaText, sourceBriefPath));
  const sections = [
    ["Traffic", derivatives.hook_bank.traffic],
    ["Revenue", derivatives.hook_bank.revenue],
    ["AI Visibility", derivatives.hook_bank.ai_visibility],
  ]
    .map(([label, data]) => {
      return [
        `## ${label}`,
        "### Short Video Hooks",
        renderBulletList(data.short_video_hooks),
        "",
        "### LinkedIn Opening Lines",
        renderBulletList(data.linkedin_openers),
        "",
        "### Stat Hooks",
        renderBulletList(data.stat_hooks),
        "",
        "### CTA Hooks",
        renderBulletList(data.cta_hooks),
      ].join("\n");
    })
    .join("\n\n");

  return { title, content: `${frontmatter}\n\n# ${title}\n\n${sections}\n` };
}

function renderCarouselAngle(label, slides) {
  ensureArray(slides, `${label} carousel slides`);
  return [
    `## ${label}`,
    ...slides.map((slide) => `### Slide ${ensureString(slide.slide, "Slide number")} — ${ensureString(slide.title, "Slide title")}\n${ensureString(slide.body, "Slide body")}`),
  ].join("\n\n");
}

function buildCarouselNote(company, derivatives, sourceBriefPath, ctaText) {
  const title = buildPackFileTitle(company.name, "Carousel Outline");
  const frontmatter = buildFrontmatter(makeCommonFrontmatter(company, "carousel-outline", "campaign", ctaText, sourceBriefPath));
  const body = [
    renderCarouselAngle("Traffic", derivatives.carousel_outline.traffic),
    renderCarouselAngle("Revenue", derivatives.carousel_outline.revenue),
    renderCarouselAngle("AI Visibility", derivatives.carousel_outline.ai_visibility),
  ].join("\n\n");
  return { title, content: `${frontmatter}\n\n# ${title}\n\n${body}\n` };
}

function buildLoomScriptNote(company, derivatives, sourceBriefPath, ctaText) {
  const title = buildPackFileTitle(company.name, "Loom Script");
  const frontmatter = buildFrontmatter(makeCommonFrontmatter(company, "loom-script", "campaign", ctaText, sourceBriefPath));
  const body = [
    "## Working Title",
    ensureString(derivatives.loom_script.title, "Loom script title"),
    "",
    "## Opener",
    renderLinesBlock(derivatives.loom_script.opener),
    "",
    "## Breakdown",
    renderLinesBlock(derivatives.loom_script.breakdown),
    "",
    "## First Move",
    renderLinesBlock(derivatives.loom_script.first_move),
    "",
    "## Close",
    renderLinesBlock(derivatives.loom_script.close),
  ].join("\n");
  return { title, content: `${frontmatter}\n\n# ${title}\n\n${body}\n` };
}

function renderFollowUpAngle(label, data) {
  return [
    `## ${label}`,
    `### CTA Comment\n${ensureString(data.cta_comment, `${label} CTA comment`)}`,
    `### Reply Comment\n${ensureString(data.reply_comment, `${label} reply comment`)}`,
    `### First DM\n${ensureString(data.first_dm, `${label} first DM`)}`,
    `### Second DM\n${ensureString(data.second_dm, `${label} second DM`)}`,
    `### Soft Close\n${ensureString(data.soft_close, `${label} soft close`)}`,
  ].join("\n\n");
}

function buildCommentDmNote(company, derivatives, sourceBriefPath, ctaText) {
  const title = buildPackFileTitle(company.name, "Comment DM Follow-Up");
  const frontmatter = buildFrontmatter(
    makeCommonFrontmatter(company, "comment-dm-follow-up", "campaign", ctaText, sourceBriefPath)
  );
  const body = [
    renderFollowUpAngle("Traffic", derivatives.comment_dm_follow_up.traffic),
    renderFollowUpAngle("Revenue", derivatives.comment_dm_follow_up.revenue),
    renderFollowUpAngle("AI Visibility", derivatives.comment_dm_follow_up.ai_visibility),
  ].join("\n\n");
  return { title, content: `${frontmatter}\n\n# ${title}\n\n${body}\n` };
}

function buildColdEmailNote(company, derivatives, sourceBriefPath, ctaText) {
  const title = buildPackFileTitle(company.name, "Cold Email");
  const frontmatter = buildFrontmatter(makeCommonFrontmatter(company, "cold-email", "campaign", ctaText, sourceBriefPath));
  const body = [
    "## Subject Lines",
    renderBulletList(derivatives.cold_email.subject_lines),
    "",
    "## Short Cold Email",
    renderParagraphs(derivatives.cold_email.short_email),
    "",
    "## Follow-Up Email",
    renderParagraphs(derivatives.cold_email.follow_up),
    "",
    "## Breakup / Nudge",
    renderParagraphs(derivatives.cold_email.breakup),
  ].join("\n");
  return { title, content: `${frontmatter}\n\n# ${title}\n\n${body}\n` };
}

function buildPublishingLogNote(company, derivatives, sourceBriefPath, ctaText) {
  const title = buildPackFileTitle(company.name, "Publishing Log");
  const frontmatter = buildFrontmatter(makeCommonFrontmatter(company, "publishing-log", "campaign", ctaText, sourceBriefPath));
  const statusRows = OUTBOUND_PACK_FILES.map(
    (entry) => `| ${entry.fileName} | draft | ${entry.assetType} | | |`
  ).join("\n");
  const body = [
    "## Status Overview",
    "| Asset | Status | Type | Channel | Posted URL | Notes |",
    "| --- | --- | --- | --- | --- | --- |",
    statusRows,
    "",
    "## Recommended Sequence",
    renderBulletList(derivatives.publishing_log.recommended_sequence),
    "",
    "## Channels To Prioritize",
    renderBulletList(derivatives.publishing_log.channels),
    "",
    "## Operator Notes",
    renderBulletList(derivatives.publishing_log.notes),
  ].join("\n");
  return { title, content: `${frontmatter}\n\n# ${title}\n\n${body}\n` };
}

function buildPackNotes(company, plan, derivatives, sourceBriefPath) {
  const ctaText = plan.primary_cta.text;
  return {
    campaignBrief: buildCampaignBriefNote(company, plan, sourceBriefPath),
    trafficAngle: buildAngleNote(company, "Traffic", "traffic", plan.angles.traffic, sourceBriefPath, ctaText),
    revenueAngle: buildAngleNote(company, "Revenue", "revenue", plan.angles.revenue, sourceBriefPath, ctaText),
    aiVisibilityAngle: buildAngleNote(
      company,
      "AI Visibility",
      "ai-visibility",
      plan.angles.ai_visibility,
      sourceBriefPath,
      ctaText
    ),
    hookBank: buildHookBankNote(company, derivatives, sourceBriefPath, ctaText),
    carouselOutline: buildCarouselNote(company, derivatives, sourceBriefPath, ctaText),
    loomScript: buildLoomScriptNote(company, derivatives, sourceBriefPath, ctaText),
    commentDmFollowUp: buildCommentDmNote(company, derivatives, sourceBriefPath, ctaText),
    coldEmail: buildColdEmailNote(company, derivatives, sourceBriefPath, ctaText),
    publishingLog: buildPublishingLogNote(company, derivatives, sourceBriefPath, ctaText),
  };
}

function validatePlanResponse(plan) {
  ensureString(plan.campaign_thesis, "Plan campaign_thesis");
  ensureString(plan.why_now, "Plan why_now");
  ensureArray(plan.approved_proof_points, "Plan approved_proof_points");
  ensureArray(plan.claims_to_avoid, "Plan claims_to_avoid");
  ensureString(plan.primary_cta?.type, "Plan primary_cta.type");
  ensureString(plan.primary_cta?.text, "Plan primary_cta.text");
  ensureString(plan.primary_cta?.follow_up_offer, "Plan primary_cta.follow_up_offer");

  ["traffic", "revenue", "ai_visibility"].forEach((key) => {
    const angle = plan.angles?.[key];
    ensureString(angle?.core_angle, `Plan angles.${key}.core_angle`);
    ensureString(angle?.why_it_matters_now, `Plan angles.${key}.why_it_matters_now`);
    ensureArray(angle?.proof_points, `Plan angles.${key}.proof_points`);
    ensureArray(angle?.claims_to_avoid, `Plan angles.${key}.claims_to_avoid`);
    ensureArray(angle?.video_script?.hook, `Plan angles.${key}.video_script.hook`);
    ensureArray(angle?.video_script?.body, `Plan angles.${key}.video_script.body`);
    ensureArray(angle?.video_script?.cta, `Plan angles.${key}.video_script.cta`);
    ensureArray(angle?.linkedin_post, `Plan angles.${key}.linkedin_post`);
    ensureArray(angle?.repurposing_notes, `Plan angles.${key}.repurposing_notes`);
  });
}

function validateDerivativesResponse(derivatives) {
  ["traffic", "revenue", "ai_visibility"].forEach((key) => {
    ensureArray(derivatives?.hook_bank?.[key]?.short_video_hooks, `Hook bank ${key} short_video_hooks`);
    ensureArray(derivatives?.hook_bank?.[key]?.linkedin_openers, `Hook bank ${key} linkedin_openers`);
    ensureArray(derivatives?.hook_bank?.[key]?.stat_hooks, `Hook bank ${key} stat_hooks`);
    ensureArray(derivatives?.hook_bank?.[key]?.cta_hooks, `Hook bank ${key} cta_hooks`);
    ensureArray(derivatives?.carousel_outline?.[key], `Carousel outline ${key}`);
    ensureString(derivatives?.comment_dm_follow_up?.[key]?.cta_comment, `Comment DM ${key} cta_comment`);
    ensureString(derivatives?.comment_dm_follow_up?.[key]?.reply_comment, `Comment DM ${key} reply_comment`);
    ensureString(derivatives?.comment_dm_follow_up?.[key]?.first_dm, `Comment DM ${key} first_dm`);
    ensureString(derivatives?.comment_dm_follow_up?.[key]?.second_dm, `Comment DM ${key} second_dm`);
    ensureString(derivatives?.comment_dm_follow_up?.[key]?.soft_close, `Comment DM ${key} soft_close`);
  });

  ensureString(derivatives?.loom_script?.title, "Loom script title");
  ensureArray(derivatives?.loom_script?.opener, "Loom opener");
  ensureArray(derivatives?.loom_script?.breakdown, "Loom breakdown");
  ensureArray(derivatives?.loom_script?.first_move, "Loom first_move");
  ensureArray(derivatives?.loom_script?.close, "Loom close");
  ensureArray(derivatives?.cold_email?.subject_lines, "Cold email subject lines");
  ensureArray(derivatives?.cold_email?.short_email, "Cold email short_email");
  ensureArray(derivatives?.cold_email?.follow_up, "Cold email follow_up");
  ensureArray(derivatives?.cold_email?.breakup, "Cold email breakup");
  ensureArray(derivatives?.publishing_log?.recommended_sequence, "Publishing log recommended_sequence");
  ensureArray(derivatives?.publishing_log?.channels, "Publishing log channels");
  ensureArray(derivatives?.publishing_log?.notes, "Publishing log notes");
}

async function generateCampaignPlan({ company, researchData, brief, pageTsxContent, legacyContentDraftContent, contract }) {
  const systemPrompt = `You are an outbound strategist creating a structured Strategy Outbound Pack.

MANDATORY CONTRACT:
--- ${contract.filePath} ---
${contract.content}

Return JSON only. Do not include markdown fences or commentary.
Use the exact JSON keys requested.
Keep all claims source-faithful to the approved brief and strategy page.
Do not use internal labels like Money Entities, Apex Assets, Knowledge Graph, Trust Relay, or recommendation-share in any founder-facing copy.`;

  const userPrompt = `Create the campaign plan JSON for ${company.name}.

COMPANY
- name: ${company.name}
- slug: ${company.slug}
- domain: ${company.domain}
- category: ${company.category}
- industry: ${company.industry}

SUPPORTED NUMBERS
- total search opportunity: ${formatNumber(researchData?.tamModel?.totals?.totalSearchOpportunity)}
- expected traffic in 12 months: ${formatNumber(researchData?.tamModel?.totals?.expectedTraffic12Months?.base)}
- aggressive upside: ${formatNumber(researchData?.tamModel?.totals?.aggressiveUpside)}
- first 6-month target: ${formatNumber(researchData?.tamModel?.totals?.first6MonthTarget?.base)}
- revenue model enabled: ${researchData?.tamModel?.revenueModel?.enabled === false ? "no" : "yes"}
- topical integrity passed: ${researchData?.topicalIntegrity?.passed ? "yes" : "no"}

APPROVED STRATEGY BRIEF
${brief.content.slice(0, 24000)}

CANONICAL STRATEGY PAGE TSX
${pageTsxContent.slice(0, 16000)}

EXISTING SINGLE-NOTE CONTENT DRAFT
${String(legacyContentDraftContent || "").slice(0, 12000)}

Return JSON with this exact shape:
{
  "campaign_thesis": "string",
  "why_now": "string",
  "approved_proof_points": ["string"],
  "claims_to_avoid": ["string"],
  "primary_cta": {
    "type": "comment",
    "text": "string",
    "follow_up_offer": "string"
  },
  "angles": {
    "traffic": {
      "core_angle": "string",
      "why_it_matters_now": "string",
      "proof_points": ["string"],
      "claims_to_avoid": ["string"],
      "video_script": { "hook": ["string"], "body": ["string"], "cta": ["string"] },
      "linkedin_post": ["string"],
      "repurposing_notes": ["string"]
    },
    "revenue": {
      "core_angle": "string",
      "why_it_matters_now": "string",
      "proof_points": ["string"],
      "claims_to_avoid": ["string"],
      "video_script": { "hook": ["string"], "body": ["string"], "cta": ["string"] },
      "linkedin_post": ["string"],
      "repurposing_notes": ["string"]
    },
    "ai_visibility": {
      "core_angle": "string",
      "why_it_matters_now": "string",
      "proof_points": ["string"],
      "claims_to_avoid": ["string"],
      "video_script": { "hook": ["string"], "body": ["string"], "cta": ["string"] },
      "linkedin_post": ["string"],
      "repurposing_notes": ["string"]
    }
  }
}`;

  const raw = await codexRequest(systemPrompt, userPrompt);
  const parsed = parseJsonModelResponse(raw, "Campaign plan");
  validatePlanResponse(parsed);
  return parsed;
}

async function generateDerivativeAssets({ company, plan, contract }) {
  const systemPrompt = `You are an outbound strategist creating derivative assets for a Strategy Outbound Pack.

MANDATORY CONTRACT:
--- ${contract.filePath} ---
${contract.content}

Return JSON only. Do not include markdown fences or commentary.
Keep every derivative aligned to the approved campaign thesis.
Do not introduce new claims.`;

  const userPrompt = `Create the derivative-asset JSON for ${company.name}.

CAMPAIGN PLAN
${JSON.stringify(plan, null, 2)}

Return JSON with this exact shape:
{
  "hook_bank": {
    "traffic": { "short_video_hooks": ["string"], "linkedin_openers": ["string"], "stat_hooks": ["string"], "cta_hooks": ["string"] },
    "revenue": { "short_video_hooks": ["string"], "linkedin_openers": ["string"], "stat_hooks": ["string"], "cta_hooks": ["string"] },
    "ai_visibility": { "short_video_hooks": ["string"], "linkedin_openers": ["string"], "stat_hooks": ["string"], "cta_hooks": ["string"] }
  },
  "carousel_outline": {
    "traffic": [{ "slide": "01", "title": "string", "body": "string" }],
    "revenue": [{ "slide": "01", "title": "string", "body": "string" }],
    "ai_visibility": [{ "slide": "01", "title": "string", "body": "string" }]
  },
  "loom_script": {
    "title": "string",
    "opener": ["string"],
    "breakdown": ["string"],
    "first_move": ["string"],
    "close": ["string"]
  },
  "comment_dm_follow_up": {
    "traffic": { "cta_comment": "string", "reply_comment": "string", "first_dm": "string", "second_dm": "string", "soft_close": "string" },
    "revenue": { "cta_comment": "string", "reply_comment": "string", "first_dm": "string", "second_dm": "string", "soft_close": "string" },
    "ai_visibility": { "cta_comment": "string", "reply_comment": "string", "first_dm": "string", "second_dm": "string", "soft_close": "string" }
  },
  "cold_email": {
    "subject_lines": ["string"],
    "short_email": ["string"],
    "follow_up": ["string"],
    "breakup": ["string"]
  },
  "publishing_log": {
    "recommended_sequence": ["string"],
    "channels": ["string"],
    "notes": ["string"]
  }
}`;

  const raw = await codexRequest(systemPrompt, userPrompt);
  const parsed = parseJsonModelResponse(raw, "Derivative assets");
  validateDerivativesResponse(parsed);
  return parsed;
}

function writePackNotes(notes, repoDir, obsidianDir) {
  ensureDir(repoDir);
  ensureDir(obsidianDir);
  ensureDir(path.join(repoDir, "Archive"));
  ensureDir(path.join(obsidianDir, "Archive"));

  const writtenFiles = [];

  for (const entry of OUTBOUND_PACK_FILES) {
    const note = notes[entry.key];
    const repoPath = path.join(repoDir, entry.fileName);
    const obsidianPath = path.join(obsidianDir, entry.fileName);
    validateWrittenNote(repoPath, note.content, note.title);
    fs.writeFileSync(repoPath, note.content);
    fs.writeFileSync(obsidianPath, note.content);
    writtenFiles.push({ key: entry.key, fileName: entry.fileName, repoPath, obsidianPath });
  }

  return writtenFiles;
}

async function generateStrategyOutboundPack({
  company,
  researchData,
  brief,
  pageTsxContent,
  legacyContentDraftContent,
}) {
  console.log(`  Generating outbound pack via ${OUTBOUND_PACK_MODEL} at ${OPENAI_BASE_URL}`);
  const contract = loadOutboundPackContract();
  const plan = await generateCampaignPlan({ company, researchData, brief, pageTsxContent, legacyContentDraftContent, contract });
  const derivatives = await generateDerivativeAssets({ company, plan, contract });
  const notes = buildPackNotes(company, plan, derivatives, brief.filePath);

  const repoDir = getRepoOutboundPackDir(company.slug);
  const obsidianDir = getObsidianOutboundPackDir(company);
  const writtenFiles = writePackNotes(notes, repoDir, obsidianDir);

  console.log(`  Strategy outbound pack saved to ${repoDir}`);
  console.log(`  Strategy outbound pack mirrored to ${obsidianDir}`);

  return {
    repoDir,
    obsidianDir,
    files: writtenFiles,
  };
}

module.exports = {
  generateStrategyOutboundPack,
  getRepoOutboundPackDir,
  getObsidianOutboundPackDir,
};

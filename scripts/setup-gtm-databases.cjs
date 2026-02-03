#!/usr/bin/env node

/**
 * Creates 5 GTM Notion databases under the Memetik workspace.
 * Uses raw fetch (no SDK dependency).
 *
 * Usage:
 *   NOTION_TOKEN=ntn_xxx NOTION_PARENT_PAGE_ID=xxx node scripts/setup-gtm-databases.cjs
 *
 * Or reads from ~/projects/tools/memetik-engine/.env automatically.
 */

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Load env from memetik-engine if not set
// ---------------------------------------------------------------------------
const ENGINE_ENV = path.join(
  process.env.HOME,
  "projects/tools/memetik-engine/.env"
);

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(ENGINE_ENV);

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE_ID;

if (!NOTION_TOKEN || !PARENT_PAGE_ID) {
  console.error("Missing NOTION_TOKEN or NOTION_PARENT_PAGE_ID");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Notion API helpers
// ---------------------------------------------------------------------------
const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

async function notionPost(endpoint, body) {
  const res = await fetch(`${NOTION_API}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API ${res.status}: ${text}`);
  }
  return res.json();
}

function selectOptions(names) {
  return names.map((name) => ({ name }));
}

function multiSelectOptions(names) {
  return names.map((name) => ({ name }));
}

// ---------------------------------------------------------------------------
// Database schemas
// ---------------------------------------------------------------------------
const DATABASES = [
  {
    envKey: "GTM_PROSPECTS_DB_ID",
    title: "GTM Prospects",
    icon: "🎯",
    properties: {
      Company: { title: {} },
      "Contact Name": { rich_text: {} },
      Email: { email: {} },
      Role: {
        select: {
          options: selectOptions([
            "VP Marketing",
            "CMO",
            "Head of Growth",
            "Founder/CEO",
            "Other",
          ]),
        },
      },
      Domain: { url: {} },
      Industry: {
        select: {
          options: selectOptions([
            "B2B SaaS",
            "E-commerce",
            "B2B Services",
            "Other",
          ]),
        },
      },
      "ARR Estimate": {
        select: {
          options: selectOptions([
            "<$1M",
            "$1-10M",
            "$10-50M",
            "$50-100M",
            "$100M+",
          ]),
        },
      },
      Status: {
        select: {
          options: selectOptions([
            "New",
            "Researched",
            "Contacted",
            "Replied",
            "Call Booked",
            "Client",
            "Not Interested",
          ]),
        },
      },
      Source: {
        select: {
          options: selectOptions([
            "Cold Email",
            "LinkedIn",
            "Inbound",
            "Referral",
            "Audit",
          ]),
        },
      },
      "AEO Score": { number: { format: "number" } },
      Notes: { rich_text: {} },
      "Last Contact": { date: {} },
    },
  },
  {
    envKey: "GTM_CONTENT_CALENDAR_DB_ID",
    title: "GTM Content Calendar",
    icon: "📅",
    properties: {
      Title: { title: {} },
      "Content Type": {
        select: {
          options: selectOptions([
            "Authority",
            "Educational",
            "Social Proof",
            "Personal",
            "Lead Magnet",
          ]),
        },
      },
      Platform: {
        multi_select: {
          options: multiSelectOptions([
            "LinkedIn",
            "Twitter",
            "Blog",
            "Email",
          ]),
        },
      },
      Status: {
        select: {
          options: selectOptions([
            "Idea",
            "Draft",
            "Approved",
            "Scheduled",
            "Published",
          ]),
        },
      },
      "Scheduled Date": { date: {} },
      "Post Text": { rich_text: {} },
      "CTA Type": {
        select: {
          options: selectOptions(["DM", "Comment", "Link", "Engagement"]),
        },
      },
      "Source Article": { url: {} },
      Engagement: { number: { format: "number" } },
      "Leads Generated": { number: { format: "number" } },
    },
  },
  {
    envKey: "GTM_METRICS_DB_ID",
    title: "GTM Metrics",
    icon: "📊",
    properties: {
      Week: { title: {} },
      "Emails Sent": { number: { format: "number" } },
      "Open Rate": { number: { format: "percent" } },
      "Reply Rate": { number: { format: "percent" } },
      "Positive Replies": { number: { format: "number" } },
      "Calls Booked": { number: { format: "number" } },
      "Clients Signed": { number: { format: "number" } },
      MRR: { number: { format: "dollar" } },
      "LinkedIn Impressions": { number: { format: "number" } },
      "LinkedIn Engagement": { number: { format: "number" } },
      "Audits Delivered": { number: { format: "number" } },
      "Website Traffic": { number: { format: "number" } },
    },
  },
  {
    envKey: "GTM_AUDITS_DB_ID",
    title: "GTM AEO Audits",
    icon: "🔍",
    properties: {
      Domain: { title: {} },
      Company: { rich_text: {} },
      "Contact Email": { email: {} },
      "AEO Score": { number: { format: "number" } },
      "Report URL": { url: {} },
      Status: {
        select: {
          options: selectOptions([
            "Pending",
            "Running",
            "Complete",
            "Delivered",
            "Follow-up Sent",
          ]),
        },
      },
      Created: { date: {} },
      Delivered: { date: {} },
      Notes: { rich_text: {} },
    },
  },
  {
    envKey: "GTM_CASE_STUDIES_DB_ID",
    title: "GTM Case Studies",
    icon: "🏆",
    properties: {
      "Client Name": { title: {} },
      Industry: {
        select: {
          options: selectOptions(["SaaS", "E-commerce", "B2B Services"]),
        },
      },
      Tier: {
        select: {
          options: selectOptions(["Foundation", "Ownership", "Dominance"]),
        },
      },
      "Start Date": { date: {} },
      Milestone: {
        select: {
          options: selectOptions([
            "First Citation",
            "Score +20",
            "Traffic +30%",
            "Category #1",
            "90-Day Review",
          ]),
        },
      },
      "Before Metrics": { rich_text: {} },
      "After Metrics": { rich_text: {} },
      Permission: {
        select: {
          options: selectOptions(["Named", "Anonymized", "Internal Only"]),
        },
      },
      "LinkedIn Post": { rich_text: {} },
      Status: {
        select: {
          options: selectOptions(["Draft", "Approved", "Published"]),
        },
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("Creating 5 GTM databases in Notion...");
  console.log(`  Parent page: ${PARENT_PAGE_ID}\n`);

  const envLines = ["\n# GTM Database IDs (created by setup-gtm-databases.cjs)"];

  for (const db of DATABASES) {
    process.stdout.write(`  Creating "${db.title}"...`);
    const result = await notionPost("/databases", {
      parent: { type: "page_id", page_id: PARENT_PAGE_ID },
      icon: { type: "emoji", emoji: db.icon },
      title: [{ type: "text", text: { content: db.title } }],
      properties: db.properties,
    });

    const id = result.id;
    console.log(` ${id}`);
    envLines.push(`${db.envKey}=${id}`);
  }

  // Append to memetik-engine .env
  const envContent = envLines.join("\n") + "\n";
  fs.appendFileSync(ENGINE_ENV, envContent);
  console.log(`\nDatabase IDs appended to ${ENGINE_ENV}`);

  console.log("\n--- Copy these for reference ---");
  for (const line of envLines.slice(1)) {
    console.log(line);
  }
}

main().catch((err) => {
  console.error("\nFailed:", err.message);
  process.exit(1);
});

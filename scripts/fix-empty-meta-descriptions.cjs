#!/usr/bin/env node

/**
 * One-time script: backfill empty meta_description fields in article frontmatter.
 * Generates a description from the first ~155 chars of the article body (plain text).
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ARTICLES_DIR = path.join(__dirname, "..", "content", "articles");

function stripMarkdown(md) {
  return md
    .replace(/^#{1,6}\s+.*$/gm, "")        // headings
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")   // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, (m) => m.match(/\[([^\]]*)\]/)?.[1] || "") // links -> text
    .replace(/(\*\*|__)(.*?)\1/g, "$2")     // bold
    .replace(/(\*|_)(.*?)\1/g, "$2")        // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, "")     // inline code
    .replace(/```[\s\S]*?```/g, "")         // code blocks
    .replace(/^\s*[-*+]\s+/gm, "")         // list markers
    .replace(/^\s*\d+\.\s+/gm, "")         // numbered list markers
    .replace(/^\s*>\s+/gm, "")             // blockquotes
    .replace(/\|[^\n]*\|/g, "")            // tables
    .replace(/---+/g, "")                  // horizontal rules
    .replace(/\n{2,}/g, " ")              // multiple newlines
    .replace(/\n/g, " ")                  // single newlines
    .replace(/\s{2,}/g, " ")             // multiple spaces
    .trim();
}

function generateDescription(plainText) {
  if (!plainText || plainText.length === 0) return "";
  // Take first ~155 chars, break at last word boundary
  let desc = plainText.substring(0, 160);
  if (plainText.length > 160) {
    const lastSpace = desc.lastIndexOf(" ");
    if (lastSpace > 100) {
      desc = desc.substring(0, lastSpace);
    }
  }
  return desc.trim();
}

function main() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  let fixed = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const existing = (data.meta_description || "").toString().trim();
    if (existing.length > 0) {
      skipped++;
      continue;
    }

    const plainText = stripMarkdown(content);
    const desc = generateDescription(plainText);

    if (!desc) {
      console.log(`  WARNING: Could not generate description for ${file}`);
      continue;
    }

    data.meta_description = desc;

    const newContent = matter.stringify(content, data);
    fs.writeFileSync(filePath, newContent);
    fixed++;
    console.log(`  Fixed: ${file}`);
    console.log(`    -> ${desc.substring(0, 80)}...`);
  }

  console.log(`\nDone: ${fixed} fixed, ${skipped} already had descriptions`);
}

main();

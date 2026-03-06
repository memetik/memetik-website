#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ARTICLES_DIR = path.join(__dirname, "..", "content", "articles");
const CACHE_DIR = path.join(__dirname, "..", "client", "public", "cache");
const ARTICLES_CACHE = path.join(CACHE_DIR, "resources-articles.json");
const CONTENT_CACHE_DIR = path.join(CACHE_DIR, "resources-content");

const ARTICLE_REDIRECTS = {
  "questions-before-hiring-aeo-agency": "questions-to-ask-before-hiring-aeo-agency",
  "chatgpt-search-statistics-b2b-2025": "chatgpt-search-statistics-b2b-marketers",
};

function estimateReadTime(wordCount) {
  if (!wordCount) return null;
  const minutes = Math.ceil(wordCount / 250);
  return `${minutes} min read`;
}

function stripMarkdown(md) {
  return md
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, (m) => m.match(/\[([^\]]*)\]/)?.[1] || "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*>\s+/gm, "")
    .replace(/\|[^\n]*\|/g, "")
    .replace(/---+/g, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeWhitespace(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function ensureTerminalPunctuation(value) {
  const normalized = normalizeWhitespace(value).replace(/[:;,]+$/, "");
  if (!normalized) return "";
  return /[.!?]$/.test(normalized) ? normalized : `${normalized}.`;
}

function shortenDescription(value, maxLength = 160, options = {}) {
  const { allowSoftTruncation = true } = options;

  let normalized = normalizeWhitespace(value).replace(/\s*\([^)]*\)/g, "");

  normalized = normalizeWhitespace(normalized);
  if (!normalized) return "";
  if (normalized.length <= maxLength) return ensureTerminalPunctuation(normalized);

  for (const delimiter of [":", ";", " — ", " – "]) {
    const index = normalized.indexOf(delimiter);
    if (index >= 90 && index <= maxLength) {
      return ensureTerminalPunctuation(normalized.slice(0, index));
    }
  }

  if (!allowSoftTruncation) return "";

  const preferredComma = normalized.lastIndexOf(",", maxLength);
  if (preferredComma >= 110) {
    return ensureTerminalPunctuation(normalized.slice(0, preferredComma));
  }

  const lastSpace = normalized.lastIndexOf(" ", maxLength);
  const sliceIndex = lastSpace >= 110 ? lastSpace : maxLength;
  return ensureTerminalPunctuation(normalized.slice(0, sliceIndex));
}

function generateDescription(plainText) {
  const normalized = normalizeWhitespace(plainText);
  if (!normalized) return "";

  const sentences = normalized
    .match(/[^.!?]+[.!?]?/g)
    ?.map((sentence) => normalizeWhitespace(sentence))
    .filter(Boolean) ?? [];

  let summary = "";

  for (const sentence of sentences) {
    const shortenedSentence = shortenDescription(sentence, 160, {
      allowSoftTruncation: false,
    });
    if (!shortenedSentence) continue;

    if (!summary) {
      summary = shortenedSentence;
      if (summary.length >= 110) return summary;
      continue;
    }

    const combined = `${summary.replace(/[.!?]+$/, "")}. ${shortenedSentence}`;
    if (combined.length <= 160) {
      summary = combined;
      if (summary.length >= 110) return summary;
    } else {
      return summary;
    }
  }

  if (!summary) return shortenDescription(normalized);
  if (summary.length < 70) {
    const expandedSummary = shortenDescription(normalized);
    if (expandedSummary.length > summary.length) {
      return expandedSummary;
    }
  }

  return summary;
}

function cleanTitleTopic(title) {
  return normalizeWhitespace(title)
    .replace(/^\d+\s+/, "")
    .replace(/\s+\|\s+MEMETIK.*$/i, "")
    .replace(/^['"]+|['"]+$/g, "");
}

function decapitalize(value) {
  if (!value) return "";
  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

function buildStructuredDescription(title, primaryKeyword, articleType) {
  const topic = cleanTitleTopic(title || primaryKeyword || "AI search visibility");
  const keyword = normalizeWhitespace(primaryKeyword);

  let description = "";
  if (/\bvs\b/i.test(topic) || /comparison/i.test(articleType || "")) {
    description = `Compare ${topic} and understand the tradeoffs before you choose a partner or strategy.`;
  } else if (/listicle/i.test(articleType || "")) {
    description = `Compare ${topic} and learn what matters before you choose a partner or strategy.`;
  } else if (/guide|how[- ]?to/i.test(title || "") || /howto/i.test(articleType || "")) {
    description = `Learn ${decapitalize(topic)} and the practical steps to improve AI search visibility.`;
  } else if (keyword) {
    description = `Learn about ${keyword} and the practical steps, risks, and opportunities that shape AI search visibility.`;
  } else {
    description = `Learn about ${decapitalize(topic)} and the practical steps to improve AI search visibility.`;
  }

  return shortenDescription(description);
}

function shouldUseStructuredDescription(description, articleType) {
  if (!description) return true;

  return (
    description.length < 40 ||
    /^['"]/.test(description) ||
    /\)\.$/.test(description) ||
    /\b\d+\.$/.test(description) ||
    (description.length < 60 && /listicle/i.test(articleType || ""))
  );
}

function isGenericMetaDescription(value) {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return true;

  const lastWord = normalized.split(" ").pop()?.toLowerCase();
  const incompleteTailWords = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "because",
    "by",
    "for",
    "from",
    "if",
    "in",
    "into",
    "is",
    "like",
    "of",
    "on",
    "or",
    "so",
    "the",
    "their",
    "to",
    "using",
    "when",
    "with",
    "without",
  ]);

  return (
    normalized.length < 70 ||
    normalized.endsWith(",") ||
    (!/[.!?]$/.test(normalized) && normalized.length > 140) ||
    (!/[.!?]$/.test(normalized) && incompleteTailWords.has(lastWord)) ||
    /Expert guide covering everything you need to know\.?/i.test(normalized) ||
    /Learn more from MEMETIK\.?/i.test(normalized) ||
    /Find the right fit for your team\.?/i.test(normalized) ||
    /^Learn\s.+with our comprehensive guide\./i.test(normalized)
  );
}

function buildMetaDescription(rawDescription, fallbackDescription) {
  const normalized = normalizeWhitespace(rawDescription);
  if (!normalized || isGenericMetaDescription(normalized)) {
    return fallbackDescription;
  }

  return shortenDescription(normalized);
}

function buildMetaTitle(rawMetaTitle, title) {
  const normalized = normalizeWhitespace(rawMetaTitle);
  if (!normalized) return title || "";
  if (title && normalized.length < Math.max(title.length - 4, 24)) {
    return title;
  }
  return normalized;
}

function transformArticle(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (!data.slug) return { skipped: true, reason: "no slug" };
  if (ARTICLE_REDIRECTS[data.slug]) {
    return {
      skipped: true,
      reason: `redirected to ${ARTICLE_REDIRECTS[data.slug]}`,
    };
  }

  const html = marked.parse(content);
  const id = data.slug;
  const title = data.title || data.slug.replace(/-/g, " ");
  const generatedDescription = generateDescription(stripMarkdown(content));
  const fallbackDescription = shouldUseStructuredDescription(generatedDescription, data.type)
    ? buildStructuredDescription(title, data.primary_keyword, data.type)
    : generatedDescription;

  const article = {
    id,
    slug: data.slug,
    title,
    metaTitle: buildMetaTitle(data.meta_title, title),
    metaDescription: buildMetaDescription(data.meta_description, fallbackDescription),
    primaryKeyword: data.primary_keyword || "",
    secondaryKeywords: data.secondary_keywords || "",
    publicationDate: data.published_at || data.created || null,
    lastUpdated: data.updated || null,
    author: data.author || "MEMETIK",
    authorTitle: data.author_title || "AEO Agency",
    articleType: data.type || "",
    readTime: estimateReadTime(data.word_count),
    wordCount: data.word_count || null,
    hasArticleSchema: data.has_schema || false,
    hasFaqSchema: data.has_faq || false,
    schemaTypes: data.schema_types || [],
    relatedArticles: data.related_articles || "",
    sources: data.sources || "",
    status: "Published",
  };

  return { article, html };
}

function main() {
  console.log("Building articles from markdown...");

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.mkdirSync(CONTENT_CACHE_DIR, { recursive: true });
  for (const file of fs.readdirSync(CONTENT_CACHE_DIR)) {
    if (file.endsWith(".html")) {
      fs.unlinkSync(path.join(CONTENT_CACHE_DIR, file));
    }
  }

  if (!fs.existsSync(ARTICLES_DIR)) {
    console.log("No articles directory found, creating empty cache");
    fs.writeFileSync(ARTICLES_CACHE, "[]");
    return;
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} markdown files`);

  const articles = [];

  for (const file of files) {
    try {
      const result = transformArticle(path.join(ARTICLES_DIR, file));
      if (result?.skipped) {
        console.log(`  Skipped ${file} (${result.reason})`);
        continue;
      }

      articles.push(result.article);

      const contentPath = path.join(CONTENT_CACHE_DIR, `${result.article.id}.html`);
      fs.writeFileSync(contentPath, result.html);
    } catch (err) {
      console.error(`  Failed ${file}: ${err.message}`);
    }
  }

  articles.sort((a, b) => {
    const da = String(a.publicationDate || "1970-01-01");
    const db = String(b.publicationDate || "1970-01-01");
    return db.localeCompare(da);
  });

  fs.writeFileSync(ARTICLES_CACHE, JSON.stringify(articles, null, 2));
  console.log(`\nBuilt ${articles.length} articles`);
  console.log(`  Index: ${ARTICLES_CACHE}`);
  console.log(`  Content: ${CONTENT_CACHE_DIR}/`);
}

main();

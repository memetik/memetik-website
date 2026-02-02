#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ARTICLES_DIR = path.join(__dirname, "..", "content", "articles");
const CACHE_DIR = path.join(__dirname, "..", "client", "public", "cache");
const ARTICLES_CACHE = path.join(CACHE_DIR, "resources-articles.json");
const CONTENT_CACHE_DIR = path.join(CACHE_DIR, "resources-content");

function estimateReadTime(wordCount) {
  if (!wordCount) return null;
  const minutes = Math.ceil(wordCount / 250);
  return `${minutes} min read`;
}

function transformArticle(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (!data.slug) return null;

  const html = marked.parse(content);
  const id = data.slug;

  const article = {
    id,
    slug: data.slug,
    title: data.title || data.slug.replace(/-/g, " "),
    metaTitle: data.meta_title || data.title || "",
    metaDescription: data.meta_description || "",
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
      if (!result) {
        console.log(`  Skipped ${file} (no slug)`);
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

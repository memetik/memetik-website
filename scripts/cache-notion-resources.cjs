#!/usr/bin/env node

const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID || "2e59dd7e86c28122af7bf230399a326e";

const CACHE_DIR = "public/cache";
const ARTICLES_CACHE = `${CACHE_DIR}/resources-articles.json`;
const CONTENT_CACHE_DIR = `${CACHE_DIR}/resources-content`;

// Helper to extract text from rich text
function getRichText(richText) {
  if (!richText || richText.length === 0) return "";
  return richText.map((t) => t.plain_text).join("");
}

// Helper to extract select value
function getSelect(select) {
  return select?.name || "";
}

// Helper to extract multi-select values
function getMultiSelect(multiSelect) {
  return multiSelect?.map((s) => s.name) || [];
}

// Transform Notion page to article
function transformPage(page) {
  const props = page.properties;

  return {
    id: page.id,
    slug: getRichText(props.slug?.rich_text),
    title: getRichText(props.Article?.title),
    metaTitle: getRichText(props["Meta Title"]?.rich_text),
    metaDescription: getRichText(props["Meta Description"]?.rich_text),
    primaryKeyword: getRichText(props["Primary Keyword"]?.rich_text),
    secondaryKeywords: getRichText(props["Secondary Keywords"]?.rich_text),
    publicationDate: props["Publication Date"]?.date?.start || null,
    lastUpdated: props["Last Updated"]?.date?.start || null,
    author: getRichText(props.Author?.rich_text),
    authorTitle: getSelect(props["Author Title"]?.select),
    articleType: getSelect(props["Article Type"]?.select),
    readTime: getRichText(props["Read Time"]?.rich_text),
    wordCount: props["Word Count"]?.number || null,
    hasArticleSchema: props["Has Article Schema"]?.checkbox || false,
    hasFaqSchema: props["Has FAQ Schema"]?.checkbox || false,
    schemaTypes: getMultiSelect(props["Schema Types"]?.multi_select),
    relatedArticles: getRichText(props["Related Articles"]?.rich_text),
    sources: getRichText(props.Sources?.rich_text),
    status: getSelect(props.Status?.select),
  };
}

async function main() {
  console.log("🚀 Starting Notion resources cache...");

  // Ensure cache directories exist first
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.mkdirSync(CONTENT_CACHE_DIR, { recursive: true });

  if (!NOTION_TOKEN) {
    console.log("⚠️  NOTION_TOKEN not set, skipping cache generation");
    fs.writeFileSync(ARTICLES_CACHE, "[]");
    console.log("✅ Created empty cache files");
    return;
  }

  console.log("🔑 NOTION_TOKEN found, initializing client...");
  console.log("🔑 Token starts with:", NOTION_TOKEN.substring(0, 10) + "...");
  
  const notion = new Client({ auth: NOTION_TOKEN });
  console.log("✅ Notion client initialized");

  // Fetch all published articles
  console.log("📚 Fetching published articles from Notion...");
  console.log("📚 Database ID:", DATABASE_ID);
  
  const articles = [];
  let cursor;

  try {
    do {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          and: [
            {
              property: "Status",
              select: {
                equals: "Published",
              },
            },
            {
              property: "Brand",
              select: {
                equals: "Memetik",
              },
            },
          ],
        },
        sorts: [
          {
            property: "Publication Date",
            direction: "descending",
          },
        ],
        start_cursor: cursor,
        page_size: 100,
      });

      for (const page of response.results) {
        if ("properties" in page) {
          const article = transformPage(page);
          if (article.slug) {
            articles.push(article);
          }
        }
      }

      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);
  } catch (error) {
    console.error("❌ Error querying database:", error.message);
    console.error("❌ Full error:", error);
    fs.writeFileSync(ARTICLES_CACHE, "[]");
    return;
  }

  console.log(`📝 Found ${articles.length} published articles`);

  // Save articles list
  fs.writeFileSync(ARTICLES_CACHE, JSON.stringify(articles, null, 2));
  console.log(`✅ Saved articles list to ${ARTICLES_CACHE}`);

  // Fetch and cache content for each article
  console.log("📖 Fetching article content...");
  for (const article of articles) {
    try {
      const blocks = [];
      let blockCursor;

      do {
        const response = await notion.blocks.children.list({
          block_id: article.id,
          start_cursor: blockCursor,
          page_size: 100,
        });

        for (const block of response.results) {
          if ("type" in block) {
            blocks.push(block);
          }
        }

        blockCursor = response.has_more ? response.next_cursor : undefined;
      } while (blockCursor);

      const contentPath = path.join(CONTENT_CACHE_DIR, `${article.id}.json`);
      fs.writeFileSync(contentPath, JSON.stringify(blocks, null, 2));
      console.log(`  ✅ ${article.slug} (${blocks.length} blocks)`);
    } catch (error) {
      console.error(`  ❌ Failed to fetch content for ${article.slug}:`, error.message);
    }
  }

  console.log("\n🎉 Cache generation complete!");
  console.log(`   Articles: ${articles.length}`);
  console.log(`   Cache dir: ${CACHE_DIR}`);
}

main().catch((error) => {
  console.error("❌ Cache generation failed:", error);
  process.exit(1);
});

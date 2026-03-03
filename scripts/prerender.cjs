#!/usr/bin/env node

/**
 * Build-time static HTML generator — no browser needed.
 * Reads the Vite build output (index.html), and for each route:
 * - Injects correct <title>, meta description, canonical, OG tags
 * - For articles, injects the article HTML content into the page body
 * - Writes the file to the correct path so Vercel serves it directly
 */

const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "..", "dist", "public");
const DOMAIN = "https://www.memetik.ai";

// Read the Vite-built index.html as our template
const TEMPLATE = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

// ------------------------------------------------------------------
// Page definitions: { route, title, description }
// ------------------------------------------------------------------

const STATIC_PAGES = [
  {
    route: "/",
    title: "MEMETIK | Be The Brand AI Recommends | AEO Agency",
    description: "We engineer your brand into ChatGPT, Perplexity, and Gemini responses. AEO & SEO agency for B2B SaaS, E-commerce, and professional services. 90-day results guaranteed.",
  },
  {
    route: "/resources",
    title: "Resources | MEMETIK - AEO & SEO Insights",
    description: "Expert articles on Answer Engine Optimization, AI search visibility, ChatGPT citations, and LLM SEO strategies for B2B brands.",
  },
  {
    route: "/audit",
    title: "Free AEO Audit | MEMETIK",
    description: "Get a free AI visibility audit. See exactly where your brand ranks in ChatGPT, Perplexity, and Gemini vs competitors. Results in 48 hours.",
  },
  {
    route: "/strategy",
    title: "Strategy Protocol | MEMETIK AEO & SEO Agency",
    description: "The 90-day protocol to become the default AI recommendation in your category.",
  },
  {
    route: "/strategy/bts",
    title: "BTS Counter-Offensive — Strategic Growth Plan | MEMETIK",
    description: "Strategic growth plan for BTS — content, SEO, and AI visibility counter-offensive.",
  },
  {
    route: "/strategy/signify-ip",
    title: "Signify IP — SEO & AEO Strategy | MEMETIK",
    description: "SEO and AEO strategy proposal for Signify IP trade mark services.",
  },
  {
    route: "/strategy/uleads",
    title: "Uleads — SEO & AEO Strategy | MEMETIK",
    description: "SEO and AEO strategy proposal for Uleads insurance comparison platform.",
  },
  {
    route: "/bts",
    title: "Behind the Scenes | MEMETIK",
    description: "Go behind the scenes of how MEMETIK engineers AI visibility for brands.",
  },
  {
    route: "/404",
    title: "404 — Page Not Found | MEMETIK",
    description: "This page doesn't exist.",
    is404: true,
  },
];

// Load data-driven pages from the TypeScript data files
// We parse them as text since they're TS — extract the objects we need
function loadDataPages() {
  const pages = [];

  // Segments
  const segmentSlugs = ["saas-founders", "ecommerce-brands", "b2b-services", "marketing-leaders"];
  const segmentsFile = fs.readFileSync(
    path.join(__dirname, "..", "client", "src", "data", "segments.ts"), "utf-8"
  );
  for (const slug of segmentSlugs) {
    const titleMatch = segmentsFile.match(new RegExp(`"${slug}"[\\s\\S]*?metaTitle:\\s*"([^"]+)"`));
    const descMatch = segmentsFile.match(new RegExp(`"${slug}"[\\s\\S]*?metaDescription:\\s*"([^"]+)"`));
    if (titleMatch) {
      pages.push({
        route: `/for/${slug}`,
        title: titleMatch[1],
        description: descMatch ? descMatch[1] : "",
      });
    }
  }

  // Solutions
  const solutionSlugs = ["chatgpt-visibility", "perplexity-citations", "ai-overview-ranking", "competitor-displacement"];
  const solutionsFile = fs.readFileSync(
    path.join(__dirname, "..", "client", "src", "data", "solutions.ts"), "utf-8"
  );
  for (const slug of solutionSlugs) {
    const titleMatch = solutionsFile.match(new RegExp(`"${slug}"[\\s\\S]*?metaTitle:\\s*"([^"]+)"`));
    const descMatch = solutionsFile.match(new RegExp(`"${slug}"[\\s\\S]*?metaDescription:\\s*"([^"]+)"`));
    if (titleMatch) {
      pages.push({
        route: `/solutions/${slug}`,
        title: titleMatch[1],
        description: descMatch ? descMatch[1] : "",
      });
    }
  }

  // Comparisons
  const compSlugs = ["manual-seo", "traditional-seo-agencies", "content-marketing-agencies"];
  const compsFile = fs.readFileSync(
    path.join(__dirname, "..", "client", "src", "data", "comparisons.ts"), "utf-8"
  );
  for (const slug of compSlugs) {
    const titleMatch = compsFile.match(new RegExp(`"${slug}"[\\s\\S]*?metaTitle:\\s*"([^"]+)"`));
    const descMatch = compsFile.match(new RegExp(`"${slug}"[\\s\\S]*?metaDescription:\\s*"([^"]+)"`));
    if (titleMatch) {
      pages.push({
        route: `/vs/${slug}`,
        title: titleMatch[1],
        description: descMatch ? descMatch[1] : "",
      });
    }
  }

  return pages;
}

function loadArticlePages() {
  const cacheFile = path.join(DIST, "cache", "resources-articles.json");
  if (!fs.existsSync(cacheFile)) return [];
  const articles = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
  return articles.map((a) => ({
    route: `/resources/${a.slug}`,
    title: `${a.metaTitle || a.title} | MEMETIK`,
    description: a.metaDescription || "",
    article: a,
  }));
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function generateHtml(page) {
  const canonicalUrl = page.route === "/" ? DOMAIN : `${DOMAIN}${page.route}`;
  const ogType = page.article ? "article" : "website";
  let html = TEMPLATE;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(page.description)}"`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(page.title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(page.description)}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${ogType}"`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeHtml(page.title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeHtml(page.description)}"`);

  // For articles: inject content into the root div and add Article schema
  if (page.article) {
    const a = page.article;
    const contentFile = path.join(DIST, "cache", "resources-content", `${a.id}.html`);
    const articleHtml = fs.existsSync(contentFile) ? fs.readFileSync(contentFile, "utf-8") : "";

    // Inject article content into the root div so crawlers see it
    const seoContent = `<article><h1>${escapeHtml(a.title)}</h1>${articleHtml}</article>`;
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${seoContent}</div>`
    );

    // Add Article JSON-LD
    const articleSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.metaDescription,
      author: { "@type": "Person", name: a.author || "MEMETIK", jobTitle: a.authorTitle || "AEO Agency" },
      datePublished: a.publicationDate,
      dateModified: a.lastUpdated || a.publicationDate,
      publisher: { "@type": "Organization", name: "MEMETIK", url: DOMAIN },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      wordCount: a.wordCount,
    });

    // Add BreadcrumbList
    const breadcrumbSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${DOMAIN}/resources` },
        { "@type": "ListItem", position: 3, name: a.title, item: canonicalUrl },
      ],
    });

    const schemas = `<script type="application/ld+json">${articleSchema}</script>\n<script type="application/ld+json">${breadcrumbSchema}</script>`;
    html = html.replace("</head>", `${schemas}\n</head>`);
  }

  return html;
}

function writePage(page) {
  const html = generateHtml(page);

  let outputPath;
  if (page.route === "/") {
    outputPath = path.join(DIST, "index.html");
  } else if (page.is404) {
    outputPath = path.join(DIST, "404.html");
  } else {
    outputPath = path.join(DIST, page.route, "index.html");
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
}

function main() {
  console.log("Pre-rendering static HTML (no browser)...");

  const dataPages = loadDataPages();
  const articlePages = loadArticlePages();
  const allPages = [...STATIC_PAGES, ...dataPages, ...articlePages];

  console.log(`  ${STATIC_PAGES.length} static + ${dataPages.length} data-driven + ${articlePages.length} articles = ${allPages.length} total`);

  for (const page of allPages) {
    writePage(page);
  }

  console.log(`  Done: ${allPages.length} pages generated`);
}

main();

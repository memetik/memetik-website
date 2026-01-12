// Types for Resource Articles (fetched from Notion via cache script)
export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  publicationDate: string | null;
  lastUpdated: string | null;
  author: string;
  authorTitle: string;
  articleType: string;
  readTime: string;
  wordCount: number | null;
  hasArticleSchema: boolean;
  hasFaqSchema: boolean;
  schemaTypes: string[];
  relatedArticles: string;
  sources: string;
  status: string;
}

// Cache file paths (relative to client/public for Vite)
export const CACHE_DIR = "cache";
export const ARTICLES_CACHE = `/cache/resources-articles.json`;
export const CONTENT_CACHE_DIR = `/cache/resources-content`;

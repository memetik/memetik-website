import topicRegistry from "@shared/resourceTopicRegistry.json";
import type { ResourceArticle } from "@/lib/notion";

export interface ResourceTopicConfig {
  slug: string;
  label: string;
  title: string;
  description: string;
  hubIntro: string;
  moneyPagePath: string;
  moneyPageLabel: string;
  secondaryPath: string;
  secondaryLabel: string;
  keywords: string[];
}

export const resourceTopics = topicRegistry.topics as ResourceTopicConfig[];

const topicMap = new Map(resourceTopics.map((topic) => [topic.slug, topic]));

export function buildResourceTopicHref(slug: string) {
  return `/resources/topics/${slug}`;
}

export function getResourceTopicConfig(slug?: string | null) {
  if (!slug) return topicMap.get("ai-visibility") ?? resourceTopics[0];
  return topicMap.get(slug) ?? topicMap.get("ai-visibility") ?? resourceTopics[0];
}

export function getResourceTopicOptions(articles: ResourceArticle[]) {
  return resourceTopics
    .map((topic) => ({
      ...topic,
      count: articles.filter((article) => article.topicCluster === topic.slug).length,
    }))
    .filter((topic) => topic.count > 0);
}

export function getRelatedArticles(article: ResourceArticle, articles: ResourceArticle[], limit = 3) {
  const manualSlugs = article.relatedArticles
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);

  const manualArticles = manualSlugs
    .map((slug) => articles.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is ResourceArticle => candidate != null && candidate.slug !== article.slug);

  const seen = new Set(manualArticles.map((candidate) => candidate.slug));

  const topicArticles = articles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      candidate.topicCluster === article.topicCluster &&
      !seen.has(candidate.slug),
  );

  return [...manualArticles, ...topicArticles].slice(0, limit);
}

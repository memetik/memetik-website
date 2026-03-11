import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { ResourceCard } from "@/components/ResourceCard";
import type { ResourceArticle } from "@/lib/notion";
import { getResourceTopicConfig } from "@/lib/resourceTopics";
import {
  MarketingContainer,
  MarketingFooter,
  MarketingPage,
  MarketingPill,
  MarketingSectionGlow,
  MarketingSectionShell,
  marketingTheme,
} from "@/components/marketing/MarketingTheme";

export default function ResourceHub() {
  const { topic } = useParams<{ topic: string }>();
  const [articles, setArticles] = useState<ResourceArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const topicConfig = getResourceTopicConfig(topic);

  useEffect(() => {
    document.title = `${topicConfig.title} | MEMETIK`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", topicConfig.description);

    fetch("/cache/resources-articles.json")
      .then((res) => res.json())
      .then((data: ResourceArticle[]) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [topicConfig.description, topicConfig.title]);

  const topicArticles = useMemo(
    () => articles.filter((article) => article.topicCluster === topicConfig.slug),
    [articles, topicConfig.slug],
  );

  const featuredArticle = topicArticles[0];
  const remainingArticles = topicArticles.slice(1);

  return (
    <MarketingPage>
      <Nav />
      <main className="px-4 pb-8 pt-28 sm:px-6 md:px-12 md:pt-32">
        <MarketingContainer className="space-y-6">
          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-14">
            <MarketingSectionGlow className="-left-12 top-0 h-44 w-44" />
            <MarketingSectionGlow className="bottom-0 right-0 h-48 w-48" tone="amber" />
            <div className="relative z-10 max-w-4xl">
              <Link href="/resources" className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/42 transition hover:text-white/72">
                <ArrowLeft className="h-3 w-3" />
                Back to resources
              </Link>
              <MarketingPill className="mb-6">Topic hub</MarketingPill>
              <h1 className="font-display text-4xl font-extrabold uppercase tracking-[-0.05em] leading-[0.9] text-white sm:text-5xl md:text-7xl">
                {topicConfig.title}
              </h1>
              <p className="mt-4 max-w-3xl font-mono text-sm leading-7 text-white/58 sm:text-base">
                {topicConfig.hubIntro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={topicConfig.moneyPagePath} className={marketingTheme.primaryButton}>
                  {topicConfig.moneyPageLabel}
                </a>
                <a href={topicConfig.secondaryPath} className={marketingTheme.secondaryButton}>
                  {topicConfig.secondaryLabel}
                </a>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            {loading ? (
              <div className="py-24 text-center">
                <div className="font-mono text-sm uppercase tracking-[0.22em] text-white/45">Loading articles...</div>
              </div>
            ) : topicArticles.length === 0 ? (
              <div className="py-24 text-center">
                <h2 className="font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">Nothing published yet</h2>
                <p className="mt-4 font-mono text-sm leading-7 text-white/58">This hub will populate automatically as matching resources are published.</p>
              </div>
            ) : (
              <>
                {featuredArticle && (
                  <div className="mb-12">
                    <div className={marketingTheme.eyebrow}>Featured article</div>
                    <div className="mt-4">
                      <ResourceCard article={featuredArticle} featured />
                    </div>
                  </div>
                )}

                {remainingArticles.length > 0 && (
                  <>
                    <div className={marketingTheme.eyebrow}>More in this cluster ({remainingArticles.length})</div>
                    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {remainingArticles.map((article) => (
                        <ResourceCard key={article.id} article={article} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </MarketingSectionShell>
        </MarketingContainer>
      </main>

      <MarketingFooter
        title="Need this category owned, not just studied?"
        description="We build the answer-share systems, supporting pages, and authority layer that turn topic coverage into revenue-critical visibility."
        ctaHref="/audit"
        ctaLabel="Get your free AI audit"
        note="Topic-first visibility plan included"
      />
    </MarketingPage>
  );
}

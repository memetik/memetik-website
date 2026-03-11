import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Nav } from "@/components/Nav";
import { ResourceCard } from "@/components/ResourceCard";
import type { ResourceArticle } from "@/lib/notion";
import { buildResourceTopicHref, getResourceTopicOptions } from "@/lib/resourceTopics";
import {
  MarketingContainer,
  MarketingFooter,
  MarketingPage,
  MarketingPill,
  MarketingSectionGlow,
  MarketingSectionShell,
  marketingTheme,
} from "@/components/marketing/MarketingTheme";

export default function Resources() {
  const [articles, setArticles] = useState<ResourceArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Resources | MEMETIK - AEO & SEO Insights";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Expert articles on Answer Engine Optimization, AI search visibility, ChatGPT citations, and LLM SEO strategies for B2B brands.");

    // Fetch cached articles
    fetch("/cache/resources-articles.json")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load articles:", err);
        setLoading(false);
      });
  }, []);

  const topicOptions = useMemo(() => getResourceTopicOptions(articles), [articles]);
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <MarketingPage>
      <Nav />
      <main className="px-4 pb-8 pt-28 sm:px-6 md:px-12 md:pt-32">
        <MarketingContainer className="space-y-6">
          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-14">
            <MarketingSectionGlow className="-left-12 top-0 h-44 w-44" />
            <MarketingSectionGlow className="bottom-0 right-0 h-48 w-48" tone="amber" />
            <div className="relative z-10">
              <MarketingPill className="mb-6">Knowledge base</MarketingPill>
              <h1 className="font-display text-4xl font-extrabold uppercase tracking-[-0.05em] leading-[0.9] text-white sm:text-5xl md:text-7xl">
                Resources
              </h1>
              <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-white/58 sm:text-base">
                Deep dives into Answer Engine Optimization, LLM visibility strategy, and the systems B2B brands need to become the credible answer.
              </p>
              <p className="mt-6 max-w-3xl font-mono text-xs uppercase tracking-[0.22em] text-white/42">
                Browse crawlable topic hubs, then jump into the individual resources that support each commercial search surface.
              </p>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className={marketingTheme.eyebrow}>Topic hubs</div>
            {loading ? (
              <div className="py-12 font-mono text-sm uppercase tracking-[0.22em] text-white/45">Loading hubs...</div>
            ) : topicOptions.length === 0 ? (
              <div className="py-12 font-mono text-sm uppercase tracking-[0.22em] text-white/45">No hubs published yet.</div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {topicOptions.map((topic) => (
                  <Link key={topic.slug} href={buildResourceTopicHref(topic.slug)}>
                    <div className="group h-full cursor-pointer rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">{topic.count} articles</div>
                      <h2 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">
                        {topic.label}
                      </h2>
                      <p className="mt-3 font-mono text-xs leading-6 text-white/58">{topic.description}</p>
                      <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">Open topic hub</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            {loading ? (
              <div className="py-24 text-center">
                <div className="font-mono text-sm uppercase tracking-[0.22em] text-white/45">Loading articles...</div>
              </div>
            ) : articles.length === 0 ? (
              <div className="py-24 text-center">
                <h2 className="font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">Coming soon</h2>
                <p className="mt-4 font-mono text-sm leading-7 text-white/58">We’re working on new field notes and operator briefs. Check back soon.</p>
              </div>
            ) : (
              <>
                {featuredArticle && (
                  <div className="mb-12">
                    <div className={marketingTheme.eyebrow}>Latest brief</div>
                    <div className="mt-4">
                      <ResourceCard article={featuredArticle} featured />
                    </div>
                  </div>
                )}

                {remainingArticles.length > 0 && (
                  <>
                    <div className={marketingTheme.eyebrow}>All articles ({remainingArticles.length})</div>
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
        title="Want us to build your AI visibility?"
        description="Stop reading about AEO. Start installing the system that makes your brand the credible answer."
        ctaHref="https://cal.com/memetik/letstalk"
        ctaLabel="Get your free AI audit"
        note="Strategy call · revenue-led answer-share plan"
      />
    </MarketingPage>
  );
}

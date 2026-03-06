import { useEffect, useState, useMemo } from "react";
import { Nav } from "@/components/Nav";
import { ResourceCard } from "@/components/ResourceCard";
import type { ResourceArticle } from "@/lib/notion";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach((a) => {
      if (a.articleType) cats.add(a.articleType);
    });
    return Array.from(cats).sort();
  }, [articles]);

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") return articles;
    return articles.filter((a) => a.articleType === selectedCategory);
  }, [articles, selectedCategory]);

  // Featured article (first one)
  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

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

              {categories.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
                      selectedCategory === "all"
                        ? "border-white/20 bg-white text-black"
                        : "border-white/12 bg-white/[0.03] text-white/60 hover:border-white/24 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
                        selectedCategory === cat
                          ? "border-white/20 bg-white text-black"
                          : "border-white/12 bg-white/[0.03] text-white/60 hover:border-white/24 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
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

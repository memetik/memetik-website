import { useEffect, useState, useMemo } from "react";
import { Nav } from "@/components/Nav";
import { ResourceCard } from "@/components/ResourceCard";
import type { ResourceArticle } from "@/lib/notion";

export default function Resources() {
  const [articles, setArticles] = useState<ResourceArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    document.title = "Resources | MEMETIK - AEO & SEO Insights";

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
    <div className="min-h-screen w-full bg-background text-foreground">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto">
          {/* Chevron bar */}
          <div className="font-mono text-xs tracking-tighter text-foreground/60 mb-8 overflow-hidden">
            &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
          </div>

          <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">
              Knowledge Base
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight uppercase leading-[0.85] mb-4">
            Resources
          </h1>

          <p className="font-mono text-sm sm:text-base text-foreground/60 max-w-2xl mb-8">
            Deep dives into Answer Engine Optimization, LLM visibility strategies, and the future of search. 
            Actionable insights for brands ready to dominate AI responses.
          </p>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`border-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  selectedCategory === "all"
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/30 hover:border-foreground"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`border-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/30 hover:border-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-24">
              <div className="font-mono text-sm uppercase tracking-wider text-foreground/60">
                Loading articles...
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-24 border-2 border-foreground/20">
              <h2 className="text-2xl font-display font-extrabold uppercase mb-4">
                Coming Soon
              </h2>
              <p className="font-mono text-sm text-foreground/60">
                We're working on some killer content. Check back soon.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <div className="mb-12">
                  <div className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">
                    Latest
                  </div>
                  <ResourceCard article={featuredArticle} featured />
                </div>
              )}

              {/* Article Grid */}
              {remainingArticles.length > 0 && (
                <>
                  <div className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">
                    All Articles ({remainingArticles.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingArticles.map((article) => (
                      <ResourceCard key={article.id} article={article} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 md:px-12 border-t-2 border-foreground bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight mb-4">
            Want us to build your AI visibility?
          </h2>
          <p className="font-mono text-sm text-background/60 mb-8">
            Stop reading about AEO. Start dominating it.
          </p>
          <a
            href="https://cal.com/memetik/letstalk"
            className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            GET YOUR FREE AI AUDIT
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 px-4 sm:px-6 md:px-12 border-t border-foreground/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="font-display font-extrabold text-xl uppercase">
            MEMETIK
          </a>
          <div className="font-mono text-xs text-foreground/40 uppercase">
            © 2026 MEMETIK
          </div>
        </div>
      </footer>
    </div>
  );
}

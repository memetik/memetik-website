import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Nav } from "@/components/Nav";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import type { ResourceArticle } from "@/lib/notion";

interface ArticleWithContent extends ResourceArticle {
  html: string;
}

export default function ResourcePost() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleWithContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Fetch article metadata
    fetch("/cache/resources-articles.json")
      .then((res) => res.json())
      .then((articles: ResourceArticle[]) => {
        const found = articles.find((a) => a.slug === slug);
        if (!found) {
          setError("Article not found");
          setLoading(false);
          return;
        }

        // Fetch article content (HTML from markdown)
        fetch(`/cache/resources-content/${found.id}.html`)
          .then((res) => res.text())
          .then((html: string) => {
            setArticle({ ...found, html });
            document.title = `${found.metaTitle || found.title} | MEMETIK`;
            
            // Update meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute("content", found.metaDescription || "");
            }
            
            setLoading(false);
          })
          .catch(() => {
            setError("Failed to load article content");
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Failed to load article");
        setLoading(false);
      });
  }, [slug]);

  const formattedDate = article?.publicationDate
    ? new Date(article.publicationDate).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedUpdated = article?.lastUpdated
    ? new Date(article.lastUpdated).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground">
        <Nav />
        <div className="pt-32 pb-16 px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-mono text-sm uppercase tracking-wider text-foreground/60">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground">
        <Nav />
        <div className="pt-32 pb-16 px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-display font-black uppercase mb-4">
              {error || "Article Not Found"}
            </h1>
            <Link href="/resources">
              <a className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Back to Resources
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Nav />

      {/* Article Header */}
      <header className="pt-32 pb-12 px-4 sm:px-6 md:px-12 border-b-2 border-foreground">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/resources">
            <a className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-3 h-3" />
              Back to Resources
            </a>
          </Link>

          {/* Category */}
          {article.articleType && (
            <div className="inline-flex items-center gap-2 border border-foreground/30 px-3 py-1.5 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                {article.articleType}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-[0.9] mb-6">
            {article.title}
          </h1>

          {/* Meta Description */}
          {article.metaDescription && (
            <p className="font-serif text-lg sm:text-xl text-foreground/70 mb-8">
              {article.metaDescription}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-foreground/60 pt-6 border-t border-foreground/20">
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span>
                  {article.author}
                  {article.authorTitle && `, ${article.authorTitle}`}
                </span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 px-4 sm:px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          {/* Sources */}
          {article.sources && (
            <div className="mt-12 pt-8 border-t-2 border-foreground">
              <h3 className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-4">
                Sources
              </h3>
              <p className="font-mono text-sm text-foreground/60">
                {article.sources}
              </p>
            </div>
          )}

          {/* Last Updated */}
          {formattedUpdated && formattedUpdated !== formattedDate && (
            <div className="mt-8 font-mono text-xs text-foreground/40 uppercase">
              Last updated: {formattedUpdated}
            </div>
          )}
        </div>
      </article>

      {/* Related Articles / CTA */}
      <section className="py-16 px-4 sm:px-6 md:px-12 border-t-2 border-foreground bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight mb-4">
            Ready to dominate AI search?
          </h2>
          <p className="font-mono text-sm text-background/60 mb-8">
            Get a free AI visibility audit and see exactly where you stand.
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

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 md:px-12 border-t border-foreground/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="font-display font-black text-xl uppercase">
            MEMETIK
          </a>
          <div className="font-mono text-xs text-foreground/40 uppercase">
            © 2026 MEMETIK
          </div>
        </div>
      </footer>

      {/* Schema.org JSON-LD */}
      {article.hasArticleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.metaDescription,
              author: {
                "@type": "Person",
                name: article.author,
                jobTitle: article.authorTitle,
              },
              datePublished: article.publicationDate,
              dateModified: article.lastUpdated || article.publicationDate,
              publisher: {
                "@type": "Organization",
                name: "MEMETIK",
                url: "https://memetik.com",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://memetik.com/resources/${article.slug}`,
              },
              wordCount: article.wordCount,
            }),
          }}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Nav } from "@/components/Nav";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import type { ResourceArticle } from "@/lib/notion";
import {
  MarketingCard,
  MarketingContainer,
  MarketingFooter,
  MarketingPage,
  MarketingPill,
  MarketingSectionGlow,
  MarketingSectionShell,
  marketingTheme,
} from "@/components/marketing/MarketingTheme";

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
      <MarketingPage>
        <Nav />
        <div className="px-4 pb-16 pt-32 sm:px-6 md:px-12">
          <MarketingContainer>
            <MarketingSectionShell className="px-8 py-16 text-center">
              <div className="font-mono text-sm uppercase tracking-[0.22em] text-white/45">
              Loading...
            </div>
            </MarketingSectionShell>
          </MarketingContainer>
        </div>
      </MarketingPage>
    );
  }

  if (error || !article) {
    return (
      <MarketingPage>
        <Nav />
        <div className="px-4 pb-16 pt-32 sm:px-6 md:px-12">
          <MarketingContainer>
            <MarketingSectionShell className="px-8 py-16 text-center">
              <h1 className="text-3xl font-display font-extrabold uppercase mb-4 text-white">
                {error || "Article Not Found"}
              </h1>
              <Link href="/resources" className={marketingTheme.secondaryButton}>
                <ArrowLeft className="h-4 w-4" />
                Back to resources
              </Link>
            </MarketingSectionShell>
          </MarketingContainer>
        </div>
      </MarketingPage>
    );
  }

  return (
    <MarketingPage>
      <Nav />
      <main className="px-4 pb-8 pt-28 sm:px-6 md:px-12 md:pt-32">
        <MarketingContainer className="space-y-6">
          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-14">
            <MarketingSectionGlow className="-left-12 top-0 h-44 w-44" />
            <MarketingSectionGlow className="bottom-0 right-0 h-48 w-48" tone="amber" />
            <div className="relative z-10 max-w-3xl">
              <Link href="/resources" className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/42 transition hover:text-white/72">
                <ArrowLeft className="h-3 w-3" />
                Back to resources
              </Link>

              {article.articleType && <MarketingPill className="mb-6">{article.articleType}</MarketingPill>}

              <h1 className="text-3xl font-display font-extrabold uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-4xl md:text-5xl">
                {article.title}
              </h1>

              {article.metaDescription && (
                <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">
                  {article.metaDescription}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>
                      {article.author}
                      {article.authorTitle && `, ${article.authorTitle}`}
                    </span>
                  </div>
                )}
                {formattedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{formattedDate}</span>
                  </div>
                )}
                {article.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                )}
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />

              {article.sources && (
                <MarketingCard className="mt-12 p-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">Sources</h3>
                  <p className="mt-4 font-mono text-sm leading-7 text-white/60">{article.sources}</p>
                </MarketingCard>
              )}

              {formattedUpdated && formattedUpdated !== formattedDate && (
                <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Last updated: {formattedUpdated}
                </div>
              )}
            </div>
          </MarketingSectionShell>
        </MarketingContainer>
      </main>

      <MarketingFooter
        title="Ready to dominate AI search?"
        description="Get a free AI visibility audit and see exactly where your brand stands in the recommendation layer."
        ctaHref="https://cal.com/memetik/letstalk"
        ctaLabel="Get your free AI audit"
        note="Executive audit · answer-share review included"
      />

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
                url: "https://www.memetik.ai",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.memetik.ai/resources/${article.slug}`,
              },
              wordCount: article.wordCount,
            }),
          }}
        />
      )}
    </MarketingPage>
  );
}

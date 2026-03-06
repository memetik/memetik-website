import { Link } from "wouter";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { ResourceArticle } from "@/lib/notion";
import { MarketingCard } from "@/components/marketing/MarketingTheme";

interface ResourceCardProps {
  article: ResourceArticle;
  featured?: boolean;
}

export function ResourceCard({ article, featured = false }: ResourceCardProps) {
  const formattedDate = article.publicationDate
    ? new Date(article.publicationDate).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  if (featured) {
    return (
      <Link href={`/resources/${article.slug}`}>
        <MarketingCard className="group cursor-pointer p-8 md:p-12 transition-transform duration-300 hover:-translate-y-1">
          {/* Category tag */}
          {article.articleType && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/64">
                {article.articleType}
              </span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-[-0.04em] leading-[0.92] mb-4 text-white">
            {article.title}
          </h2>

          {/* Description */}
          <p className="font-mono text-sm leading-7 text-white/60 mb-6 max-w-2xl">
            {article.metaDescription}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.18em] text-white/38">
            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
              </div>
            )}
            {article.author && (
              <span>By {article.author}</span>
            )}
          </div>

          {/* Arrow */}
          <div className="mt-6 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.18em] text-white/74">
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </MarketingCard>
      </Link>
    );
  }

  return (
    <Link href={`/resources/${article.slug}`}>
      <MarketingCard className="group h-full cursor-pointer p-6 transition-transform duration-300 hover:-translate-y-1">
        {/* Category tag */}
        {article.articleType && (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 mb-4 self-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/64">
              {article.articleType}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-display font-bold tracking-[-0.03em] leading-[1] mb-3 text-white">
          {article.title}
        </h3>

        {/* Description */}
        <p className="font-mono text-xs leading-6 text-white/58 mb-4 flex-grow line-clamp-3">
          {article.metaDescription}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/38 mt-auto">
          {formattedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
          )}
          {article.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/72">
          <span>Read</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </MarketingCard>
    </Link>
  );
}

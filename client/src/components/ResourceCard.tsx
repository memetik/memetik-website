import { Link } from "wouter";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { ResourceArticle } from "@/lib/notion";

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
        <article className="group border-2 border-foreground p-8 md:p-12 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
          {/* Category tag */}
          {article.articleType && (
            <div className="inline-flex items-center gap-2 border border-current px-3 py-1.5 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-wider">
                {article.articleType}
              </span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight leading-[0.9] mb-4">
            {article.title}
          </h2>

          {/* Description */}
          <p className="font-mono text-sm leading-relaxed opacity-70 mb-6 max-w-2xl">
            {article.metaDescription}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider opacity-60">
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
          <div className="mt-6 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider">
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/resources/${article.slug}`}>
      <article className="group border-2 border-foreground p-6 hover:bg-foreground hover:text-background transition-colors cursor-pointer h-full flex flex-col">
        {/* Category tag */}
        {article.articleType && (
          <div className="inline-flex items-center gap-2 border border-current px-2 py-1 mb-4 self-start">
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {article.articleType}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-display font-bold tracking-tight leading-[0.95] mb-3">
          {article.title}
        </h3>

        {/* Description */}
        <p className="font-mono text-xs leading-relaxed opacity-70 mb-4 flex-grow line-clamp-3">
          {article.metaDescription}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider opacity-60 mt-auto">
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
        <div className="mt-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Read</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </article>
    </Link>
  );
}

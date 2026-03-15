import { ArrowRight } from "lucide-react";
import { StrategySectionShell } from "./StrategySectionShell";

export function MidPageCTA({
  eyebrow,
  title,
  body,
  href = "https://cal.com/memetik/letstalk",
  ctaLabel = "Book a Strategy Call",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  href?: string;
  ctaLabel?: React.ReactNode;
}) {
  return (
    <StrategySectionShell glow="amber">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white mb-3">
          {title}
        </h2>
        <p className="text-sm md:text-base leading-7 text-white/62 mb-8">{body}</p>
        <a
          href={href}
          className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#090b0d] shadow-[0_12px_40px_rgba(244,228,205,0.14)] transition-opacity hover:opacity-90"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </StrategySectionShell>
  );
}

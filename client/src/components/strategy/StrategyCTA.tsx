import { ArrowRight } from "lucide-react";
import { StrategyEyebrow } from "./StrategyEyebrow";
import { StrategySectionShell } from "./StrategySectionShell";

export function StrategyCTA({
  eyebrow = "Book Strategy Call",
  title,
  body,
  href = "https://cal.com/memetik/letstalk",
  ctaLabel = "Book Strategy Call",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  href?: string;
  ctaLabel?: React.ReactNode;
}) {
  return (
    <StrategySectionShell glow="amber" className="mt-16 md:mt-20 text-center">
      <div className="mx-auto max-w-3xl">
        <StrategyEyebrow className="mb-6">{eyebrow}</StrategyEyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
          {title}
        </h2>
        <p className="text-base md:text-lg leading-8 text-white/68 mb-10">{body}</p>
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

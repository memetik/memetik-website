import { Download } from "lucide-react";
import { StrategySectionShell } from "./StrategySectionShell";

export function TransitionalCTA({
  eyebrow,
  title,
  body,
  href,
  ctaLabel = "Download the Research Brief",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  href?: string;
  ctaLabel?: React.ReactNode;
}) {
  return (
    <StrategySectionShell>
      <div className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8 text-center">
        {eyebrow ? (
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            {eyebrow}
          </div>
        ) : null}
        <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white mb-3">
          {title}
        </h3>
        <p className="text-sm leading-7 text-white/60 mb-6">{body}</p>
        {href ? (
          <a
            href={href}
            className="inline-flex items-center gap-3 rounded border border-white/20 bg-white/[0.06] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <Download className="h-4 w-4" />
            {ctaLabel}
          </a>
        ) : (
          <a
            href="https://cal.com/memetik/letstalk"
            className="inline-flex items-center gap-3 rounded border border-white/20 bg-white/[0.06] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </StrategySectionShell>
  );
}

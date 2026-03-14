import { cn } from "@/lib/utils";

export const SectionHeader = ({
  number,
  title,
  eyebrow,
  subtitle,
}: {
  number?: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
}) => (
  <div
    className={cn(
      "mb-8 md:mb-12 border-b border-white/10 pb-5 md:pb-6",
      number ? "flex items-start gap-4" : "space-y-3",
    )}
  >
    {number ? (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
        {number}
      </div>
    ) : null}
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
        {eyebrow ?? "Strategy Section"}
      </div>
      <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68 md:text-base">{subtitle}</p> : null}
    </div>
  </div>
);

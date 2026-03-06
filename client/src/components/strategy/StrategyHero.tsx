import { cn } from "@/lib/utils";
import { StrategyEyebrow } from "./StrategyEyebrow";
import { StrategySectionShell } from "./StrategySectionShell";

export function StrategyHero({
  eyebrow,
  title,
  accent,
  subtitle,
  tags = [],
  children,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  accent?: React.ReactNode;
  subtitle?: React.ReactNode;
  tags?: React.ReactNode[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <StrategySectionShell glow="mixed" className={cn("mb-14 md:mb-20", className)}>
      <div className="max-w-none">
        <div className="max-w-4xl">
          {eyebrow ? <StrategyEyebrow className="mb-6">{eyebrow}</StrategyEyebrow> : null}
          <h1 className="max-w-[16ch] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-extrabold leading-[0.94] tracking-tight text-white mb-6">
            {title}
            {accent ? <span className="block text-[#f4e4cd]">{accent}</span> : null}
          </h1>
          {subtitle ? <p className="max-w-3xl text-base md:text-lg leading-8 text-white/68 mb-8">{subtitle}</p> : null}
          {tags.length ? (
            <div className="flex flex-wrap gap-3 mb-8">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60"
                >
                  {tag}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {children ? <div className="mt-8 w-full">{children}</div> : null}
      </div>
    </StrategySectionShell>
  );
}

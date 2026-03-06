import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { strategyCardShell } from "./theme";

export function StrategyAppendixSection({
  title,
  description,
  children,
  defaultOpen = false,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <details open={defaultOpen} className={cn(strategyCardShell, "group", className)}>
      <summary className="relative z-10 flex cursor-pointer list-none items-start justify-between gap-4 p-5 md:p-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Supporting evidence</div>
          <div className="mt-2 text-lg font-semibold text-white">{title}</div>
          {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">{description}</p> : null}
        </div>
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 transition group-open:rotate-180">
          <ChevronDown className="h-4 w-4" />
        </div>
      </summary>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative border-t border-white/8 px-5 py-5 md:px-6 md:py-6">{children}</div>
    </details>
  );
}

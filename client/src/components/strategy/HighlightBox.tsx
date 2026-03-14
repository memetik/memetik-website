import { cn } from "@/lib/utils";
import { StrategyGlow } from "./StrategyGlow";
import { strategyCardShell } from "./theme";

export const HighlightBox = ({
  children,
  className = "",
  title,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  tone?: "default" | "warning";
}) => (
  <div className={cn(strategyCardShell, className)}>
    <StrategyGlow color={tone === "warning" ? "amber" : "blue"} className="-right-16 -top-10 h-40 w-40 opacity-80" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#f4e4cd]/60 to-transparent" />
    <div className={cn("relative p-6 md:p-8", title ? "space-y-4" : undefined)}>
      {title ? <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{title}</div> : null}
      {children}
    </div>
  </div>
);

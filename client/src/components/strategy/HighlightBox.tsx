import { cn } from "@/lib/utils";
import { StrategyGlow } from "./StrategyGlow";
import { strategyCardShell } from "./theme";

export const HighlightBox = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(strategyCardShell, className)}>
    <StrategyGlow color="blue" className="-right-16 -top-10 h-40 w-40 opacity-80" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#f4e4cd]/60 to-transparent" />
    <div className="relative p-6 md:p-8">{children}</div>
  </div>
);

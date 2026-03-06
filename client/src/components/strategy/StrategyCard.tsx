import { cn } from "@/lib/utils";
import { StrategyGlow } from "./StrategyGlow";
import { strategyCardShell } from "./theme";

export function StrategyCard({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "amber" | "mixed";
}) {
  return (
    <div className={cn(strategyCardShell, className)}>
      {glow ? <StrategyGlow color={glow} className="-right-14 -bottom-16 h-36 w-36 opacity-70" /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">{children}</div>
    </div>
  );
}

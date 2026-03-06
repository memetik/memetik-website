import { cn } from "@/lib/utils";
import { StrategyGlow } from "./StrategyGlow";
import { strategySectionShell } from "./theme";

export function StrategySectionShell({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "amber" | "mixed";
}) {
  return (
    <div className={cn(strategySectionShell, className)}>
      {glow ? <StrategyGlow color={glow} className="-right-16 -top-12 h-44 w-44 opacity-80" /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]" />
      <div className="relative p-6 md:p-10">{children}</div>
    </div>
  );
}

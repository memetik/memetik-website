import { cn } from "@/lib/utils";
import { strategyPillClass } from "./theme";

export function StrategyEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(strategyPillClass, className)}>{children}</div>;
}

import { cn } from "@/lib/utils";

const glowMap = {
  blue: "bg-[#4368e5]/14",
  amber: "bg-[#d08d4b]/14",
  mixed: "bg-[#d8b98a]/10",
};

export function StrategyGlow({
  className,
  color = "blue",
}: {
  className?: string;
  color?: keyof typeof glowMap;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[110px]", glowMap[color], className)}
    />
  );
}

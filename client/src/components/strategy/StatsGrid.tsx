import { cn } from "@/lib/utils";
import { strategyCardShell } from "./theme";

export interface Stat {
  label: string;
  value: string;
  icon?: React.ReactNode;
  note?: string;
}

export const StatCard = ({ label, value, icon, note }: Stat) => (
  <div className={cn(strategyCardShell, "text-left")}> 
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
    <div className="relative p-4 md:p-5">
      {icon && <div className="mb-3 flex text-[#f4e4cd]">{icon}</div>}
      <div className="break-words text-[clamp(1.9rem,3.6vw,3rem)] font-display font-bold leading-[0.95] tracking-tight text-white">
        {value}
      </div>
      <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] leading-relaxed text-white/45">{label}</div>
      {note ? <div className="mt-3 text-sm leading-6 text-white/58">{note}</div> : null}
    </div>
  </div>
);

const columnsMap: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export const StatsGrid = ({
  stats,
  columns = 4,
  className,
}: {
  stats: Stat[];
  columns?: number;
  className?: string;
}) => {
  const gridClass = columnsMap[columns] || "md:grid-cols-4";

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", gridClass, className)}>
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

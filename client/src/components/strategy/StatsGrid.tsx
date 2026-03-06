import { cn } from "@/lib/utils";
import { strategyCardShell } from "./theme";

export interface Stat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export const StatCard = ({ label, value, icon }: Stat) => (
  <div className={cn(strategyCardShell, "text-center")}> 
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
    <div className="relative p-4 md:p-5">
      {icon && <div className="mb-3 flex justify-center text-[#f4e4cd]">{icon}</div>}
      <div className="text-2xl font-display font-bold text-white">{value}</div>
      <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">{label}</div>
    </div>
  </div>
);

const columnsMap: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export const StatsGrid = ({ stats, columns = 4 }: { stats: Stat[]; columns?: number }) => {
  const gridClass = columnsMap[columns] || "md:grid-cols-4";

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", gridClass)}>
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

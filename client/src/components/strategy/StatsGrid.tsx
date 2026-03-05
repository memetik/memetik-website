export interface Stat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export const StatCard = ({ label, value, icon }: Stat) => (
  <div className="bg-secondary/5 border border-border p-4 text-center">
    {icon && <div className="flex justify-center text-primary mb-2">{icon}</div>}
    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
    <div className="text-xs font-mono text-muted-foreground mt-1">{label}</div>
  </div>
);

export const StatsGrid = ({ stats, columns = 4 }: { stats: Stat[]; columns?: number }) => (
  <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}>
    {stats.map((stat) => (
      <StatCard key={stat.label} {...stat} />
    ))}
  </div>
);

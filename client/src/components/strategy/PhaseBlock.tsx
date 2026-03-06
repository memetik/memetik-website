import { StrategyCard } from "./StrategyCard";

export const PhaseBlock = ({
  number,
  icon,
  label,
  title,
  children,
}: {
  number: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  children: React.ReactNode;
}) => (
  <StrategyCard className="h-full" glow="blue">
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
        <span className="text-[#f4e4cd]">{icon}</span>
        {label}
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
        {number}
      </div>
    </div>
    <h3 className="mb-4 text-2xl md:text-3xl font-display font-bold tracking-tight text-white">{title}</h3>
    <div className="text-white/68">{children}</div>
  </StrategyCard>
);

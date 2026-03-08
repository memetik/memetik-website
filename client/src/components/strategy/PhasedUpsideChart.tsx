import { cn } from "@/lib/utils";
import { strategyCardShell } from "./theme";

export interface PhasedUpsidePoint {
  phase?: string;
  label?: string;
  month?: number | string;
  low: number;
  base: number;
  high: number;
}

function formatWhole(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? Math.round(value) : 0
  );
}

function buildPath(points: { x: number; y: number }[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
}

function labelForPoint(point: PhasedUpsidePoint, index: number) {
  if (point.label) return point.label;
  if (point.month !== undefined) return `M${point.month}`;
  if (point.phase) return point.phase;
  return `M${index + 1}`;
}

export function PhasedUpsideChart({
  points,
  className = "",
}: {
  points: PhasedUpsidePoint[];
  className?: string;
}) {
  const safePoints = points.filter(
    (point) => Number.isFinite(point.low) && Number.isFinite(point.base) && Number.isFinite(point.high)
  );

  if (!safePoints.length) return null;

  const width = 1000;
  const height = 360;
  const padding = { top: 24, right: 28, bottom: 56, left: 28 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...safePoints.map((point) => point.high), 1);
  const yTicks = [0, maxValue * 0.33, maxValue * 0.66, maxValue];

  const xForIndex = (index: number) =>
    padding.left + (safePoints.length === 1 ? innerWidth / 2 : (index / (safePoints.length - 1)) * innerWidth);
  const yForValue = (value: number) => padding.top + innerHeight - (value / maxValue) * innerHeight;

  const lowPoints = safePoints.map((point, index) => ({ x: xForIndex(index), y: yForValue(point.low) }));
  const basePoints = safePoints.map((point, index) => ({ x: xForIndex(index), y: yForValue(point.base) }));
  const highPoints = safePoints.map((point, index) => ({ x: xForIndex(index), y: yForValue(point.high) }));

  const bandPath = [
    buildPath(highPoints),
    ...lowPoints
      .slice()
      .reverse()
      .map((point, index) => `${index === 0 ? "L" : "L"}${point.x} ${point.y}`),
    "Z",
  ].join(" ");

  const checkpoints = [
    safePoints[0],
    safePoints[Math.floor((safePoints.length - 1) / 2)],
    safePoints[safePoints.length - 1],
  ].filter(Boolean);

  return (
    <div className={cn(strategyCardShell, className)}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">12-month opportunity curve</div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
              Modeled monthly traffic trajectory across 12 months. The confidence band shows low-to-high range, with the base case plotted as the central line.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Estimate-only</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Y-axis: modeled traffic</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/8 bg-black/20 p-3 md:p-4">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full sm:h-[250px] md:h-[280px]">
            <defs>
              <linearGradient id="opportunity-band" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(244,228,205,0.24)" />
                <stop offset="100%" stopColor="rgba(244,228,205,0.02)" />
              </linearGradient>
            </defs>

            {yTicks.map((tick) => {
              const y = yForValue(tick);
              return (
                <g key={tick}>
                  <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="6 8" />
                  <text x={width - padding.right} y={y - 8} textAnchor="end" fill="rgba(255,255,255,0.42)" fontSize="12">
                    {formatWhole(tick)}
                  </text>
                </g>
              );
            })}

            <path d={bandPath} fill="url(#opportunity-band)" />
            <path d={buildPath(lowPoints)} fill="none" stroke="rgba(244,228,205,0.32)" strokeWidth="2" strokeDasharray="8 8" />
            <path d={buildPath(highPoints)} fill="none" stroke="rgba(244,228,205,0.38)" strokeWidth="2" strokeDasharray="8 8" />
            <path d={buildPath(basePoints)} fill="none" stroke="#f4e4cd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            {basePoints.map((point, index) => (
              <g key={labelForPoint(safePoints[index], index)}>
                <circle cx={point.x} cy={point.y} r="5" fill="#f4e4cd" />
                <circle cx={point.x} cy={point.y} r="10" fill="rgba(244,228,205,0.12)" />
                <text x={point.x} y={height - 18} textAnchor="middle" fill="rgba(255,255,255,0.48)" fontSize="12">
                  {labelForPoint(safePoints[index], index)}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {checkpoints.map((point, index) => (
            <div key={`${labelForPoint(point, index)}-${index}`} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{labelForPoint(point, index)}</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">Low</div>
                  <div className="mt-1 text-white/72">{formatWhole(point.low)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">Base</div>
                  <div className="mt-1 text-white">{formatWhole(point.base)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">High</div>
                  <div className="mt-1 text-white/72">{formatWhole(point.high)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

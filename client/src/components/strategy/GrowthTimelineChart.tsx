import { cn } from "@/lib/utils";
import { strategyCardShell, strategyPillClass } from "./theme";

export interface GrowthTimelinePoint {
  label?: string;
  month?: number | string;
  low: number;
  base: number;
  high: number;
}

export interface GrowthTimelineMilestone {
  label: string;
  title: string;
  detail: string;
  month?: number | string;
  trafficLabel?: string;
  trafficValue?: number;
}

function formatWhole(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? Math.round(value) : 0
  );
}

function buildPath(points: { x: number; y: number }[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
}

function labelForPoint(point: GrowthTimelinePoint, index: number) {
  if (point.label) return point.label;
  if (point.month !== undefined) return `M${point.month}`;
  return `M${index + 1}`;
}

function normalizeMonth(value: number | string | undefined) {
  if (value === undefined || value === null) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  return raw.toLowerCase().replace(/\s+/g, "");
}

export function GrowthTimelineChart({
  points,
  milestones,
  className,
}: {
  points: GrowthTimelinePoint[];
  milestones: GrowthTimelineMilestone[];
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
      .map((point) => `L${point.x} ${point.y}`),
    "Z",
  ].join(" ");

  const milestoneLookup = new Map(
    milestones.map((milestone, index) => [normalizeMonth(milestone.month || milestone.label), { milestone, index }])
  );

  const chartMilestones = safePoints
    .map((point, index) => {
      const lookupKey = normalizeMonth(point.month ?? point.label ?? `${index + 1}`);
      const found = lookupKey ? milestoneLookup.get(lookupKey) : null;
      return found
        ? {
            index: found.index,
            milestone: found.milestone,
            point,
            position: basePoints[index],
          }
        : null;
    })
    .filter(Boolean) as Array<{
    index: number;
    milestone: GrowthTimelineMilestone;
    point: GrowthTimelinePoint;
    position: { x: number; y: number };
  }>;

  return (
    <div className={cn(strategyCardShell, className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,228,205,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3">
          <div>
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Operating timeline</div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">
              A single growth curve with deployment milestones layered onto it, so the founder can see what ships,
              when it ships, and how the program compounds over time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
            <span className={strategyPillClass}>estimate-only</span>
            <span className={strategyPillClass}>deployment + traffic progression</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/8 bg-black/20 p-3 md:p-4">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-[240px] w-full sm:h-[280px] md:h-[300px]">
            <defs>
              <linearGradient id="growth-timeline-band" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(244,228,205,0.24)" />
                <stop offset="100%" stopColor="rgba(244,228,205,0.02)" />
              </linearGradient>
            </defs>

            {yTicks.map((tick) => {
              const y = yForValue(tick);
              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    x2={width - padding.right}
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="6 8"
                  />
                  <text x={width - padding.right} y={y - 8} textAnchor="end" fill="rgba(255,255,255,0.42)" fontSize="12">
                    {formatWhole(tick)}
                  </text>
                </g>
              );
            })}

            <path d={bandPath} fill="url(#growth-timeline-band)" />
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

            {chartMilestones.map(({ index, position }) => (
              <g key={`milestone-${index}`}>
                <circle cx={position.x} cy={position.y} r="16" fill="rgba(8,8,8,0.92)" stroke="rgba(244,228,205,0.6)" strokeWidth="2" />
                <text x={position.x} y={position.y + 4} textAnchor="middle" fill="#f4e4cd" fontSize="12" fontWeight="700">
                  {index + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-6 space-y-3">
          {milestones.map((milestone, index) => (
            <div key={`${milestone.label}-${index}`} className="rounded-[24px] border border-white/10 bg-black/20 p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{milestone.label}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{milestone.title}</div>
                </div>
                {milestone.trafficValue !== undefined ? (
                  <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/48">
                    {milestone.trafficLabel || "Base traffic"}: {formatWhole(milestone.trafficValue)}
                  </div>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/62">{milestone.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

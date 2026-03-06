import { cn } from "@/lib/utils";
import { strategyCardShell } from "./theme";

type WorkstreamTone = "base" | "high" | "light";

export interface WorkstreamTimelineCell {
  label: string;
  tone?: WorkstreamTone;
}

export interface WorkstreamTimelineTrack {
  name: string;
  description?: string;
  cells: WorkstreamTimelineCell[];
}

const toneClasses: Record<WorkstreamTone, string> = {
  base: "border-white/10 bg-white/[0.06] text-white/78",
  high: "border-[#f4e4cd]/25 bg-[#f4e4cd]/12 text-[#f8ead6]",
  light: "border-white/8 bg-black/20 text-white/54",
};

export function WorkstreamTimeline({
  months,
  tracks,
  className,
}: {
  months: string[];
  tracks: WorkstreamTimelineTrack[];
  className?: string;
}) {
  return (
    <div className={cn(strategyCardShell, className)}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Concurrent monthly workstreams</div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
              Each track starts in month 1 and keeps shipping every month. The mix changes over time, but the operating system runs concurrently from day one.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
            monthly cadence, not linear phases
          </div>
        </div>

        <div className="overflow-x-auto">
          <div
            className="grid min-w-[960px] gap-3"
            style={{ gridTemplateColumns: `minmax(220px, 1.35fr) repeat(${months.length}, minmax(0, 1fr))` }}
          >
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">Workstream</div>
            {months.map((month) => (
              <div
                key={month}
                className="rounded-full border border-white/8 bg-white/[0.04] px-2 py-2 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-white/45"
              >
                {month}
              </div>
            ))}

            {tracks.map((track) => (
              <div key={track.name} className="contents">
                <div key={`${track.name}-meta`} className="rounded-[22px] border border-white/8 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">{track.name}</div>
                  {track.description ? <p className="mt-2 text-sm leading-6 text-white/55">{track.description}</p> : null}
                </div>
                {months.map((month, index) => {
                  const cell = track.cells[index] || { label: "Maintain", tone: "light" as WorkstreamTone };
                  return (
                    <div
                      key={`${track.name}-${month}`}
                      className={cn(
                        "flex min-h-[92px] items-center justify-center rounded-[20px] border px-2 py-3 text-center text-xs font-medium leading-5",
                        toneClasses[cell.tone || "base"]
                      )}
                    >
                      {cell.label}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { strategyCardShell, strategyPillClass } from "./theme";

export interface DeliveryScopeCategory {
  label: string;
  detail: string;
}

export interface DeliveryScopeLane {
  category: string;
  title: string;
  volume: string;
  whyItMatters: string;
  deliverables: string[];
}

export interface DeliveryScopeMilestone {
  window: string;
  output: string;
}

export function DeliveryScopeMatrix({
  categories,
  lanes,
  milestones,
  className,
}: {
  categories: DeliveryScopeCategory[];
  lanes: DeliveryScopeLane[];
  milestones: DeliveryScopeMilestone[];
  className?: string;
}) {
  return (
    <div className={cn(strategyCardShell, className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,228,205,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">Documented delivery scope</div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">
              This section makes the Memetik program concrete: what gets mapped, what gets built, what gets pushed into the market,
              and what gets optimized every week until the category starts to shift.
            </p>
          </div>
          <div className={strategyPillClass}>full-funnel program, not a light retainer</div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {categories.map((category) => (
            <div key={category.label} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Scope lane</div>
              <div className="mt-2 text-base font-semibold text-white">{category.label}</div>
              <p className="mt-2 text-sm leading-6 text-white/58">{category.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {lanes.map((lane) => (
            <div key={lane.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{lane.category}</div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{lane.title}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/48">
                  {lane.volume}
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/62">{lane.whyItMatters}</p>

              <div className="mt-4 space-y-2">
                {lane.deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-2 text-sm leading-6 text-white/72"
                  >
                    {deliverable}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[28px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">30 / 60 / 90 day rollout</div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {milestones.map((milestone) => (
              <div key={milestone.window} className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">{milestone.window}</div>
                <p className="mt-2 text-sm leading-6 text-white/68">{milestone.output}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

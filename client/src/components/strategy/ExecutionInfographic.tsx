import { cn } from "@/lib/utils";
import { strategyCardShell, strategyPillClass } from "./theme";

export interface ExecutionInfographicStep {
  label: string;
  detail: string;
}

export interface ExecutionInfographicTrack {
  name: string;
  description: string;
  deliverables: string[];
  outcome: string;
}

export interface ExecutionInfographicOutput {
  label: string;
  detail: string;
}

export function ExecutionInfographic({
  steps,
  tracks,
  outputs,
  className,
}: {
  steps: ExecutionInfographicStep[];
  tracks: ExecutionInfographicTrack[];
  outputs: ExecutionInfographicOutput[];
  className?: string;
}) {
  return (
    <div className={cn(strategyCardShell, className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,228,205,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-[#f4e4cd]">What execution looks like</div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">
              This is a weekly operating system, not a content calendar. Memetik runs research, production, distribution,
              and measurement in parallel so BTS gets visible deliverables and compounding market share every month.
            </p>
          </div>
          <div className={strategyPillClass}>visible deliverables, shipped continuously</div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.label} className="relative rounded-[24px] border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">0{index + 1}</div>
              <div className="mt-2 text-base font-semibold text-white">{step.label}</div>
              <p className="mt-2 text-sm leading-6 text-white/58">{step.detail}</p>
              {index < steps.length - 1 ? (
                <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 bg-white/15 md:block" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <div key={track.name} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Workstream</div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{track.name}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">
                  always on
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/62">{track.description}</p>

              <div className="mt-4 space-y-2">
                {track.deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-2 text-sm leading-6 text-white/72"
                  >
                    {deliverable}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[20px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 px-4 py-3">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What this creates</div>
                <p className="mt-2 text-sm leading-6 text-white">{track.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {outputs.map((output) => (
            <div key={output.label} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">BTS receives</div>
              <div className="mt-2 text-base font-semibold text-white">{output.label}</div>
              <p className="mt-2 text-sm leading-6 text-white/58">{output.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

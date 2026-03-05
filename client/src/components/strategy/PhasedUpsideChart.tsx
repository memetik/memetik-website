export interface PhasedUpsidePoint {
  phase: string;
  label?: string;
  low: number;
  base: number;
  high: number;
}

export function PhasedUpsideChart({
  points,
  className = "",
}: {
  points: PhasedUpsidePoint[];
  className?: string;
}) {
  const maxValue = Math.max(...points.map((p) => p.high), 1);

  return (
    <div className={`space-y-4 ${className}`}>
      {points.map((point) => {
        const lowWidth = `${Math.max(2, (point.low / maxValue) * 100)}%`;
        const baseWidth = `${Math.max(2, (point.base / maxValue) * 100)}%`;
        const highWidth = `${Math.max(2, (point.high / maxValue) * 100)}%`;

        return (
          <div key={point.phase} className="border border-border bg-secondary/5 p-4 md:p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <div className="text-sm font-mono text-primary uppercase tracking-widest">{point.phase}</div>
                {point.label && <div className="text-xs text-muted-foreground mt-1">{point.label}</div>}
              </div>
              <div className="text-xs text-muted-foreground">estimate-only</div>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Low</span>
                  <span>{point.low.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-secondary/20 border border-border">
                  <div className="h-full bg-primary/35" style={{ width: lowWidth }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Base</span>
                  <span>{point.base.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-secondary/20 border border-border">
                  <div className="h-full bg-primary/60" style={{ width: baseWidth }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>High</span>
                  <span>{point.high.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-secondary/20 border border-border">
                  <div className="h-full bg-primary" style={{ width: highWidth }} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

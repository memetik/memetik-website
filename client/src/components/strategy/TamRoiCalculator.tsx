import { useMemo, useState } from "react";

function toPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

export function TamRoiCalculator({
  baseReachableVisits,
  defaultLtv = 0,
  defaultVisitToCustomerRate = 0.01,
  className = "",
}: {
  baseReachableVisits: number;
  defaultLtv?: number;
  defaultVisitToCustomerRate?: number;
  className?: string;
}) {
  const [ltv, setLtv] = useState(defaultLtv);
  const [visitToCustomerRate, setVisitToCustomerRate] = useState(defaultVisitToCustomerRate);

  const result = useMemo(() => {
    const estimatedCustomers = baseReachableVisits * visitToCustomerRate;
    const revenuePotential = estimatedCustomers * ltv;
    return {
      estimatedCustomers,
      revenuePotential,
    };
  }, [baseReachableVisits, visitToCustomerRate, ltv]);

  return (
    <div className={`border border-border bg-secondary/5 p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-foreground font-bold">TAM × LTV Calculator</h3>
        <span className="text-xs text-muted-foreground">estimate-only</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <label className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Customer LTV</span>
          <input
            type="number"
            min={0}
            value={ltv}
            onChange={(e) => setLtv(Number(e.target.value || 0))}
            className="w-full bg-background border border-border px-3 py-2 text-foreground"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Visit → Customer Rate
          </span>
          <input
            type="number"
            min={0}
            max={1}
            step={0.001}
            value={visitToCustomerRate}
            onChange={(e) => setVisitToCustomerRate(Number(e.target.value || 0))}
            className="w-full bg-background border border-border px-3 py-2 text-foreground"
          />
          <div className="text-xs text-muted-foreground">{toPercent(visitToCustomerRate)}</div>
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-3">
        <div className="border border-border bg-background/40 p-4 text-center">
          <div className="text-xs font-mono text-muted-foreground mb-1">Base Reachable Visits</div>
          <div className="text-xl font-display font-bold text-foreground">{baseReachableVisits.toFixed(2)}</div>
        </div>
        <div className="border border-border bg-background/40 p-4 text-center">
          <div className="text-xs font-mono text-muted-foreground mb-1">Estimated Customers</div>
          <div className="text-xl font-display font-bold text-foreground">{result.estimatedCustomers.toFixed(2)}</div>
        </div>
        <div className="border border-border bg-background/40 p-4 text-center">
          <div className="text-xs font-mono text-muted-foreground mb-1">Revenue Potential</div>
          <div className="text-xl font-display font-bold text-primary">{result.revenuePotential.toFixed(2)}</div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Formula: <span className="text-foreground">Estimated Customers = Reachable Visits × Visit→Customer Rate</span>,
        then <span className="text-foreground">Revenue Potential = Estimated Customers × LTV</span>. Use first-party
        CRM/analytics data to calibrate before making commitments.
      </p>
    </div>
  );
}

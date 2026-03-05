import { useMemo, useState } from "react";

function sanitizeDecimalInput(raw: string, maxDecimals = 2) {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [intPart = "", decimalPart = ""] = cleaned.split(".");
  if (cleaned.includes(".")) {
    return `${intPart}.${decimalPart.slice(0, maxDecimals)}`;
  }
  return intPart;
}

function parseNumber(raw: string) {
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
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
  const [ltvInput, setLtvInput] = useState(
    defaultLtv > 0 ? sanitizeDecimalInput(String(defaultLtv), 0) : ""
  );
  const [visitToCustomerPercentInput, setVisitToCustomerPercentInput] = useState(
    defaultVisitToCustomerRate > 0 ? sanitizeDecimalInput(String(defaultVisitToCustomerRate * 100), 2) : ""
  );

  const result = useMemo(() => {
    const ltv = parseNumber(ltvInput);
    const visitToCustomerRate = parseNumber(visitToCustomerPercentInput) / 100;
    const estimatedCustomers = baseReachableVisits * visitToCustomerRate;
    const revenuePotential = estimatedCustomers * ltv;
    return {
      ltv,
      visitToCustomerRate,
      estimatedCustomers,
      revenuePotential,
    };
  }, [baseReachableVisits, visitToCustomerPercentInput, ltvInput]);

  return (
    <div className={`border border-border bg-secondary/5 p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-foreground font-bold">TAM × LTV Calculator</h3>
        <span className="text-xs text-muted-foreground">estimate-only</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <label className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Customer LTV</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={ltvInput}
              onChange={(e) => setLtvInput(sanitizeDecimalInput(e.target.value, 0))}
              className="w-full bg-background border border-border pl-7 pr-3 py-2 text-foreground"
              placeholder="2500"
            />
          </div>
          <div className="text-xs text-muted-foreground">{formatCurrency(result.ltv || 0)}</div>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Visit → Customer Rate
          </span>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={visitToCustomerPercentInput}
              onChange={(e) => setVisitToCustomerPercentInput(sanitizeDecimalInput(e.target.value, 2))}
              className="w-full bg-background border border-border pl-3 pr-8 py-2 text-foreground"
              placeholder="5"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
          </div>
          <div className="text-xs text-muted-foreground">{(result.visitToCustomerRate * 100).toFixed(2)}%</div>
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-3">
        <div className="border border-border bg-background/40 p-4 text-center">
          <div className="text-xs font-mono text-muted-foreground mb-1">Base Reachable Visits</div>
          <div className="text-xl font-display font-bold text-foreground">{formatNumber(baseReachableVisits)}</div>
        </div>
        <div className="border border-border bg-background/40 p-4 text-center">
          <div className="text-xs font-mono text-muted-foreground mb-1">Estimated Customers</div>
          <div className="text-xl font-display font-bold text-foreground">{formatNumber(result.estimatedCustomers)}</div>
        </div>
        <div className="border border-border bg-background/40 p-4 text-center">
          <div className="text-xs font-mono text-muted-foreground mb-1">Revenue Potential</div>
          <div className="text-xl font-display font-bold text-primary">{formatCurrency(result.revenuePotential)}</div>
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

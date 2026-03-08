import { useMemo, useState } from "react";
import { strategyCardShell, strategyInputClass } from "./theme";

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
    <div className={`${strategyCardShell} ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-white font-bold">TAM × LTV Calculator</h3>
        <span className="text-xs font-mono uppercase tracking-[0.18em] text-white/42">estimate-only</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <label className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-white/45">Customer LTV</span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={ltvInput}
              onChange={(e) => setLtvInput(sanitizeDecimalInput(e.target.value, 0))}
              className={`${strategyInputClass} pl-8`}
              placeholder="2500"
            />
          </div>
          <div className="text-xs text-white/45">{formatCurrency(result.ltv || 0)}</div>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-white/45">
            Visit → Customer Rate
          </span>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={visitToCustomerPercentInput}
              onChange={(e) => setVisitToCustomerPercentInput(sanitizeDecimalInput(e.target.value, 2))}
              className={`${strategyInputClass} pr-8`}
              placeholder="5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35">%</span>
          </div>
          <div className="text-xs text-white/45">{(result.visitToCustomerRate * 100).toFixed(2)}%</div>
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-3">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-4 text-center">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/42 mb-1">Base Reachable Visits</div>
          <div className="text-xl font-display font-bold text-white">{formatNumber(baseReachableVisits)}</div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-4 text-center">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/42 mb-1">Estimated Customers</div>
          <div className="text-xl font-display font-bold text-white">{formatNumber(result.estimatedCustomers)}</div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-4 text-center">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/42 mb-1">Revenue Potential</div>
          <div className="text-xl font-display font-bold text-[#f4e4cd]">{formatCurrency(result.revenuePotential)}</div>
        </div>
      </div>

      <p className="text-xs text-white/45 leading-relaxed">
        Formula: <span className="text-white">Estimated Customers = Reachable Visits × Visit→Customer Rate</span>, then{" "}
        <span className="text-white">Revenue Potential = Estimated Customers × LTV</span>. Use first-party
        CRM/analytics data to calibrate before making commitments.
      </p>
      </div>
    </div>
  );
}

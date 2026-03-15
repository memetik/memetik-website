import { CheckCircle } from "lucide-react";
import { strategyCardShell } from "./theme";
import { StrategyGlow } from "./StrategyGlow";
import { cn } from "@/lib/utils";

export function TldrSection({ items }: { items: string[] }) {
  return (
    <div className={cn(strategyCardShell)}>
      <StrategyGlow color="mixed" className="-right-16 -top-10 h-40 w-40 opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#f4e4cd]/60 to-transparent" />
      <div className="relative p-6 md:p-8">
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
          TL;DR — Key findings
        </div>
        <ul className="space-y-3 text-sm leading-7 text-white/75 md:text-base">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#f4e4cd]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

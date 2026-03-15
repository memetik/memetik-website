import { StrategySectionShell } from "./StrategySectionShell";
import { CheckCircle } from "lucide-react";

export function TldrSection({ items }: { items: string[] }) {
  return (
    <StrategySectionShell glow="mixed" className="mb-10 md:mb-12">
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
        TL;DR
      </div>
      <ul className="space-y-3 text-sm leading-7 text-white/72 md:text-base">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#f4e4cd]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </StrategySectionShell>
  );
}

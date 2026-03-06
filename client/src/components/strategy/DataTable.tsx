import { cn } from "@/lib/utils";
import { strategySectionShell } from "./theme";

export interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  highlightRow?: number;
  className?: string;
}

export const DataTable = ({ headers, rows, highlightRow, className = "" }: DataTableProps) => (
  <div className={cn(strategySectionShell, "overflow-hidden", className)}>
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
    <div className="relative overflow-x-auto">
      <table className="min-w-[600px] w-full text-left text-sm text-white/72">
        <thead className="bg-white/[0.04] text-white">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-5 py-4 md:px-6 md:py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/52">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={highlightRow === rowIdx ? "bg-white/[0.06]" : "bg-transparent"}>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={cn(
                    "px-5 py-4 md:px-6 md:py-5 align-top",
                    highlightRow === rowIdx ? "text-white font-medium" : "text-white/68"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

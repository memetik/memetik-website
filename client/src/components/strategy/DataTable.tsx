import { cn } from "@/lib/utils";
import { strategySectionShell } from "./theme";

export interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  highlightRow?: number;
  className?: string;
  tableClassName?: string;
}

export const DataTable = ({ headers, rows, highlightRow, className = "", tableClassName = "" }: DataTableProps) => (
  <div className={cn(strategySectionShell, "overflow-hidden", className)}>
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
    <div className="relative overflow-x-auto">
      <table className={cn("w-full table-fixed text-left text-sm text-white/72", tableClassName)}>
        <thead className="bg-white/[0.04] text-white">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-4 md:px-5 md:py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/52 whitespace-normal break-words align-top"
              >
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
                    "px-4 py-4 md:px-5 md:py-5 align-top whitespace-normal break-words leading-6",
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

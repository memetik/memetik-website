export interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  highlightRow?: number;
  className?: string;
}

export const DataTable = ({ headers, rows, highlightRow, className = "" }: DataTableProps) => (
  <div className={`overflow-x-auto border border-border rounded-lg ${className}`}>
    <table className="w-full text-left text-sm min-w-[600px]">
      <thead className="bg-secondary/20 text-foreground">
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="p-4 md:p-6 font-bold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border/20 bg-secondary/5">
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx} className={highlightRow === rowIdx ? "border-b border-primary/30 bg-primary/5" : ""}>
            {row.map((cell, cellIdx) => (
              <td
                key={cellIdx}
                className={`p-4 md:p-6 ${highlightRow === rowIdx ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

import { CheckCircle } from "lucide-react";

export const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 text-sm text-muted-foreground">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2">
        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

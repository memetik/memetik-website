import { CheckCircle } from "lucide-react";

export const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 text-sm text-white/68">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2">
        <CheckCircle className="w-4 h-4 text-[#f4e4cd] shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

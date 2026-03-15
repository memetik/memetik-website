import { Sparkles } from "lucide-react";

export function SummariseButton({ slug }: { slug: string }) {
  const url = `https://chatgpt.com/?q=Read+and+summarise+this+strategy+page+for+me:+https://memetik.ai/strategy/${slug}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#090b0d] shadow-[0_12px_40px_rgba(244,228,205,0.14)] transition-opacity hover:opacity-90"
    >
      <Sparkles className="h-3.5 w-3.5" />
      Summarise with AI
    </a>
  );
}

import { Sparkles } from "lucide-react";

export function SummariseButton({ slug }: { slug: string }) {
  const url = `https://chatgpt.com/?q=Read+and+summarise+this+strategy+page+for+me:+https://memetik.ai/strategy/${slug}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.05] px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white/90"
    >
      <Sparkles className="h-3.5 w-3.5" />
      Summarise with AI
    </a>
  );
}

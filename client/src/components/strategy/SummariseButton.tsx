import { Sparkles } from "lucide-react";

export function SummariseButton({ slug }: { slug: string }) {
  const url = `https://chatgpt.com/?q=Read+and+summarise+this+strategy+page+for+me:+https://memetik.ai/strategy/${slug}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-[#f4e4cd]/25 bg-[#f4e4cd]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-[#f4e4cd]/80 transition-colors hover:bg-[#f4e4cd]/18 hover:text-[#f4e4cd]"
    >
      <Sparkles className="h-3.5 w-3.5" />
      Summarise with AI
    </a>
  );
}

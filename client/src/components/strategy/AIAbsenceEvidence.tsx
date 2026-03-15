import { Bot, Search, Sparkles } from "lucide-react";
import { strategyCardShell } from "./theme";
import { cn } from "@/lib/utils";

interface AIAbsenceProps {
  company: string;
  platforms?: {
    name: string;
    icon: "chatgpt" | "gemini" | "google";
    prompt: string;
    result: string;
    mentioned: boolean;
  }[];
}

const platformIcons = {
  chatgpt: <Bot className="h-5 w-5" />,
  gemini: <Sparkles className="h-5 w-5" />,
  google: <Search className="h-5 w-5" />,
};

const platformColors = {
  chatgpt: "border-emerald-500/20 bg-emerald-500/[0.04]",
  gemini: "border-blue-400/20 bg-blue-400/[0.04]",
  google: "border-amber-400/20 bg-amber-400/[0.04]",
};

export function AIAbsenceEvidence({ company, platforms }: AIAbsenceProps) {
  if (!platforms || platforms.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400/80">
        Live AI search evidence — {company} absent
      </div>
      <div className="space-y-4">
        {platforms.map((p, i) => (
          <div
            key={i}
            className={cn(
              "relative overflow-hidden rounded-[22px] border p-5",
              platformColors[p.icon]
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70">
                {platformIcons[p.icon]}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                {p.name}
              </div>
              <div
                className={cn(
                  "ml-auto rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
                  p.mentioned
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border border-red-500/30 bg-red-500/10 text-red-400"
                )}
              >
                {p.mentioned ? "Mentioned" : "Not mentioned"}
              </div>
            </div>
            <div className="mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40">Prompt: </span>
              <span className="text-sm text-white/70 italic">"{p.prompt}"</span>
            </div>
            <div className="rounded-xl border border-white/8 bg-black/30 p-4">
              <p className="text-sm leading-7 text-white/55">{p.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

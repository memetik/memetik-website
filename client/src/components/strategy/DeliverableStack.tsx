import {
  FileText,
  Globe,
  Gauge,
  Shield,
  BarChart3,
  RefreshCw,
  Target,
  Search,
  Building2,
  MessageSquare,
  Newspaper,
  Link2,
  Bot,
  Eye,
  Layers3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { strategyCardShell } from "./theme";
import { StrategyGlow } from "./StrategyGlow";
import { cn } from "@/lib/utils";
import type { DeliverableStack as DeliverableStackType } from "@shared/strategyContentSchema";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Globe,
  Gauge,
  Shield,
  BarChart3,
  RefreshCw,
  Target,
  Search,
  Building2,
  MessageSquare,
  Newspaper,
  Link2,
  Bot,
  Eye,
  Layers3,
  Sparkles,
};

function DeliverableItemCard({
  label,
  description,
  icon,
}: {
  label: string;
  description: string;
  icon?: string;
}) {
  const Icon = icon ? iconMap[icon] : null;
  return (
    <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-5 transition hover:border-white/14 hover:bg-white/[0.05]">
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white">{label}</h4>
          <p className="mt-1 text-[13px] leading-6 text-white/55">{description}</p>
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  eyebrow,
  heading,
  children,
  glowColor,
}: {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
  glowColor?: "amber" | "blue" | "mixed";
}) {
  return (
    <div className={cn(strategyCardShell, "p-6 md:p-8")}>
      <StrategyGlow color={glowColor || "mixed"} className="-right-16 -top-10 h-32 w-32 opacity-60" />
      <div className="relative">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
          {eyebrow}
        </div>
        <h3 className="mb-5 text-xl font-display font-bold tracking-tight text-white md:text-2xl">
          {heading}
        </h3>
        {children}
      </div>
    </div>
  );
}

export function DeliverableStack({ stack }: { stack: DeliverableStackType }) {
  return (
    <div className="mt-8 space-y-6">
      <div className="mb-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f4e4cd]">
          What Memetik builds and ships
        </div>
        <h3 className="mt-2 text-2xl font-display font-bold tracking-tight text-white md:text-3xl">
          The complete deliverable stack
        </h3>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-white/60">
          Every engagement includes the full system below. No upsells, no bolt-ons — this is core scope.
        </p>
      </div>

      {stack.apexAssets ? (
        <CategorySection
          eyebrow="On-site"
          heading={stack.apexAssets.heading || "Decision-stage assets"}
          glowColor="amber"
        >
          <div className="space-y-3">
            {stack.apexAssets.items.map((item, i) => (
              <DeliverableItemCard key={i} {...item} />
            ))}
          </div>
        </CategorySection>
      ) : null}

      {stack.knowledgeGraph ? (
        <CategorySection
          eyebrow="Supporting coverage"
          heading={stack.knowledgeGraph.heading || "Retrieval density that compounds"}
          glowColor="blue"
        >
          <p className="max-w-3xl text-[15px] leading-8 text-white/65">
            {stack.knowledgeGraph.body}
          </p>
        </CategorySection>
      ) : null}

      {stack.trustRelay ? (
        <CategorySection
          eyebrow="Off-site authority"
          heading={stack.trustRelay.heading || "Third-party proof that reinforces every claim"}
          glowColor="mixed"
        >
          <div className="space-y-3">
            {stack.trustRelay.items.map((item, i) => (
              <DeliverableItemCard key={i} {...item} />
            ))}
          </div>
        </CategorySection>
      ) : null}

      {stack.technical ? (
        <CategorySection
          eyebrow="Technical foundation"
          heading={stack.technical.heading || "Machine-readable, indexable, and consistent"}
          glowColor="blue"
        >
          <div className="space-y-3">
            {stack.technical.items.map((item, i) => (
              <DeliverableItemCard key={i} {...item} />
            ))}
          </div>
        </CategorySection>
      ) : null}

      {stack.measurement ? (
        <CategorySection
          eyebrow="Measurement and proof"
          heading={stack.measurement.heading || "Know exactly what's working"}
          glowColor="amber"
        >
          <div className="space-y-3">
            {stack.measurement.items.map((item, i) => (
              <DeliverableItemCard key={i} {...item} />
            ))}
          </div>
        </CategorySection>
      ) : null}

      {stack.refresh ? (
        <CategorySection
          eyebrow="Refresh and defense"
          heading={stack.refresh.heading || "The work doesn't stop — it compounds"}
          glowColor="mixed"
        >
          <div className="space-y-3">
            {stack.refresh.items.map((item, i) => (
              <DeliverableItemCard key={i} {...item} />
            ))}
          </div>
        </CategorySection>
      ) : null}
    </div>
  );
}

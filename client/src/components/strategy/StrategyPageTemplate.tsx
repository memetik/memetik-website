import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Nav } from "@/components/Nav";
import {
  SectionHeader,
  HighlightBox,
  BulletList,
  DataTable,
  PhasedUpsideChart,
  GrowthTimelineChart,
  StrategyPageFrame,
  StrategyHero,
  StrategySectionShell,
  StrategyCard,
  StrategyCTA,
  StrategySectionLead,
  StrategyAppendixSection,
} from "@/components/strategy";
import { TldrSection } from "@/components/strategy/TldrSection";
import { SummariseButton } from "@/components/strategy/SummariseButton";
import type {
  StrategyContentData,
  StrategySection,
  StrategyStackCard,
  StrategyHighlightBox,
  StrategyStakesBlock,
  StrategyNarrativeBlock,
  StrategyAppendixSection as AppendixSectionType,
} from "@shared/strategyContentSchema";
import {
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  FileText,
  Gauge,
  Globe,
  Layers3,
  Link2,
  MessageSquare,
  Newspaper,
  Radar,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  Search: <Search className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  Bot: <Bot className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
  Gauge: <Gauge className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  Radar: <Radar className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Eye: <Eye className="h-5 w-5" />,
  Compass: <Compass className="h-5 w-5" />,
  Layers3: <Layers3 className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  Newspaper: <Newspaper className="h-5 w-5" />,
  Link2: <Link2 className="h-5 w-5" />,
};

function getIcon(name?: string): ReactNode | null {
  if (!name) return null;
  return iconMap[name] || null;
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/28 outline-none transition focus:border-white/20 focus:bg-white/[0.05]";

function formatWhole(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? Math.round(value) : 0,
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function sanitizeDecimalInput(raw: string, maxDecimals = 2) {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [intPart = "", decimalPart = ""] = cleaned.split(".");
  if (cleaned.includes(".")) {
    return `${intPart}.${decimalPart.slice(0, maxDecimals)}`;
  }
  return intPart;
}

function parseNumber(raw: string) {
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function ExecutiveMetricCard({
  icon,
  label,
  value,
  note,
  breakdown,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
  breakdown: { label: string; value: string; note?: string }[];
}) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
          <div className="mt-3 break-words text-[clamp(2.2rem,6vw,4rem)] font-display font-extrabold leading-[0.92] tracking-tight text-white">
            {value}
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">{note}</p>
        </div>
      </div>
      <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-4">
        <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Keyword attribution</div>
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div key={`${label}-${item.label}`} className="rounded-[18px] border border-white/8 bg-white/[0.03] px-3 py-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="text-sm text-white/60">{item.label}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
              {item.note ? <div className="mt-2 text-xs leading-6 text-white/42">{item.note}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </StrategyCard>
  );
}

function ImmediateActionCard({ number, title, detail }: { number: string; title: string; detail: string }) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-white/62">{detail}</p>
        </div>
      </div>
    </StrategyCard>
  );
}

function StackCardBlock({ card }: { card: StrategyStackCard }) {
  return (
    <StrategyCard glow={card.glow}>
      <div className="flex items-center gap-3">
        {getIcon(card.icon) ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
            {getIcon(card.icon)}
          </div>
        ) : null}
        {card.label ? <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{card.label}</div> : null}
      </div>
      {card.title ? <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{card.title}</h3> : null}
      <div className="mt-3 text-sm leading-7 text-white/64">
        {card.content ? card.content : null}
        {card.bullets ? <BulletList items={card.bullets} /> : null}
      </div>
    </StrategyCard>
  );
}

function PlatformStatusCard({ platform, status, detail }: { platform: string; status: string; detail: string }) {
  return (
    <StrategyCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Validated sample</div>
          <div className="mt-2 text-lg font-semibold text-white">{platform}</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
          {status}
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-white/62">{detail}</p>
    </StrategyCard>
  );
}

function PromptObservationCard({
  platform,
  market,
  prompt,
  observed,
}: {
  platform: string;
  market: string;
  prompt: string;
  observed: string;
}) {
  return (
    <StrategyCard>
      <div className="flex flex-wrap gap-2">
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
          {platform}
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">
          {market}
        </div>
      </div>
      <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Prompt</div>
      <div className="mt-2 text-sm font-semibold text-white">{prompt}</div>
      <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Observed answer pattern</div>
      <p className="mt-2 text-sm leading-7 text-white/62">{observed}</p>
    </StrategyCard>
  );
}

function MonthBlock({ label, title, bullets }: { label: string; title: string; bullets: string[] }) {
  return (
    <StrategyCard glow="blue">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{label}</div>
      <h3 className="mt-3 text-2xl font-display font-bold tracking-tight text-white">{title}</h3>
      <div className="mt-5">
        <BulletList items={bullets} />
      </div>
    </StrategyCard>
  );
}

function ScopeBlock({ label, title, icon, bullets }: { label: string; title: string; icon?: string; bullets: string[] }) {
  return (
    <StrategyCard>
      <div className="flex items-start gap-4">
        {getIcon(icon) ? (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#f4e4cd]">
            {getIcon(icon)}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
          <div className="mt-4">
            <BulletList items={bullets} />
          </div>
        </div>
      </div>
    </StrategyCard>
  );
}

function NarrativeProseBlock({ block }: { block: StrategyNarrativeBlock }) {
  return (
    <div className="max-w-3xl">
      {block.heading ? (
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">{block.heading}</h3>
      ) : null}
      <p className="text-[15px] leading-8 text-white/68">{block.body}</p>
    </div>
  );
}

function StakesBlock({ block, variant }: { block: StrategyStakesBlock; variant: "failure" | "success" }) {
  const isFailure = variant === "failure";
  return (
    <div
      className={`rounded-[28px] border p-6 md:p-8 ${
        isFailure
          ? "border-red-500/20 bg-red-500/[0.04]"
          : "border-[#f4e4cd]/20 bg-[#f4e4cd]/[0.04]"
      }`}
    >
      {block.eyebrow ? (
        <div
          className={`mb-3 font-mono text-[10px] uppercase tracking-[0.22em] ${
            isFailure ? "text-red-400/80" : "text-[#f4e4cd]"
          }`}
        >
          {block.eyebrow}
        </div>
      ) : null}
      <h3
        className={`text-xl font-display font-semibold tracking-tight md:text-2xl ${
          isFailure ? "text-red-300" : "text-[#f4e4cd]"
        }`}
      >
        {block.heading}
      </h3>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
        {block.bullets.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isFailure ? "bg-red-400/60" : "bg-[#f4e4cd]/60"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CommercialImpactCalculator({ baseVisits }: { baseVisits: number }) {
  const [ltvInput, setLtvInput] = useState("");
  const [visitRateInput, setVisitRateInput] = useState("1");

  const result = useMemo(() => {
    const ltv = parseNumber(ltvInput);
    const visitRate = parseNumber(visitRateInput) / 100;
    const estimatedCustomers = baseVisits * visitRate;
    const revenuePotential = estimatedCustomers * ltv;
    return { ltv, visitRate, estimatedCustomers, revenuePotential };
  }, [baseVisits, ltvInput, visitRateInput]);

  return (
    <StrategyCard glow="mixed">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Estimate-only</div>
          <h3 className="mt-2 text-xl font-semibold text-white">Traffic to revenue calculator</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/52">
          Expected traffic in 12 months: {formatWhole(baseVisits)}
        </div>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
        This is a founder planning tool, not a forecast guarantee. Plug in your own customer value and visit-to-customer rate to translate the traffic plan into commercial potential.
      </p>
      <div className="mt-6 space-y-4">
        <label className="block space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Customer LTV</span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={ltvInput}
              onChange={(e) => setLtvInput(sanitizeDecimalInput(e.target.value, 0))}
              className={`${inputClass} pl-8`}
              placeholder="2500"
            />
          </div>
        </label>
        <label className="block space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Visit → Customer rate</span>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={visitRateInput}
              onChange={(e) => setVisitRateInput(sanitizeDecimalInput(e.target.value, 2))}
              className={`${inputClass} pr-8`}
              placeholder="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35">%</span>
          </div>
        </label>
      </div>
      <div className="mt-6 space-y-3">
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Expected traffic in 12 months</div>
          <div className="mt-2 text-2xl font-display font-bold text-white">{formatWhole(baseVisits)}</div>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Estimated customers</div>
          <div className="mt-2 text-2xl font-display font-bold text-white">{formatWhole(result.estimatedCustomers)}</div>
        </div>
        <div className="rounded-[22px] border border-[#f4e4cd]/20 bg-[#f4e4cd]/8 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Revenue potential</div>
          <div className="mt-2 text-2xl font-display font-bold text-white">{formatCurrency(result.revenuePotential)}</div>
        </div>
      </div>
      <p className="mt-5 text-xs leading-6 text-white/45">
        Formula: estimated customers = expected traffic in 12 months × visit-to-customer rate; revenue potential = estimated customers × LTV.
        Revenue planning requires client ACV/AOV and funnel inputs.
      </p>
    </StrategyCard>
  );
}

function renderHighlightBox(box: StrategyHighlightBox, index: number) {
  return (
    <HighlightBox key={index} title={box.title} tone={box.tone}>
      {box.heading ? (
        <p className="text-xl font-display font-semibold tracking-tight text-white">{box.heading}</p>
      ) : null}
      {box.body ? <p className="text-sm leading-7 text-white/66">{box.body}</p> : null}
      {box.bullets ? <BulletList items={box.bullets} /> : null}
    </HighlightBox>
  );
}

function renderAppendixSection(section: AppendixSectionType, index: number) {
  if ("headers" in section && "rows" in section) {
    return (
      <StrategyAppendixSection
        key={index}
        title={section.title}
        description={section.description}
        defaultOpen={section.defaultOpen}
      >
        <DataTable headers={section.headers} rows={section.rows} />
      </StrategyAppendixSection>
    );
  }

  if ("bullets" in section && !("children" in section)) {
    return (
      <StrategyAppendixSection
        key={index}
        title={section.title}
        description={section.description}
        defaultOpen={section.defaultOpen}
      >
        <BulletList items={section.bullets} />
      </StrategyAppendixSection>
    );
  }

  if ("children" in section && Array.isArray((section as { children?: unknown[] }).children)) {
    const composite = section as import("@shared/strategyContentSchema").StrategyAppendixComposite;
    return (
      <StrategyAppendixSection
        key={index}
        title={composite.title}
        description={composite.description}
        defaultOpen={composite.defaultOpen}
      >
        <div className="space-y-4">
          {composite.children.map((child: import("@shared/strategyContentSchema").StrategyAppendixComposite["children"][number], ci: number) => {
            if (child.type === "table") {
              return <DataTable key={ci} headers={child.headers} rows={child.rows} />;
            }
            if (child.type === "bullets") {
              return <BulletList key={ci} items={child.items} />;
            }
            if (child.type === "highlight") {
              return (
                <HighlightBox key={ci} title={child.title} tone={child.tone}>
                  <BulletList items={child.bullets} />
                </HighlightBox>
              );
            }
            if (child.type === "card") {
              return (
                <StrategyCard key={ci}>
                  {child.eyebrow ? (
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{child.eyebrow}</div>
                  ) : null}
                  <div className="mt-4">
                    <BulletList items={child.bullets} />
                  </div>
                </StrategyCard>
              );
            }
            return null;
          })}
        </div>
      </StrategyAppendixSection>
    );
  }

  return null;
}

function renderSection(section: StrategySection) {
  return (
    <StrategySectionShell key={section.id}>
      <SectionHeader
        number={section.number}
        title={section.heading}
        eyebrow={section.eyebrow}
        subtitle={section.subtitle}
      />

      {section.sectionLead ? (
        <StrategySectionLead
          takeaway={section.sectionLead.takeaway}
          body={section.sectionLead.body}
          implication={section.sectionLead.implication}
        />
      ) : null}

      {section.narrativeProse ? (
        <div className="mb-8 space-y-6">
          {section.narrativeProse.map((block, i) => (
            <NarrativeProseBlock key={i} block={block} />
          ))}
        </div>
      ) : null}

      {section.highlightBoxes?.filter((_, i) => {
        const hasStackCards = section.stackCards && section.stackCards.length > 0;
        if (!hasStackCards) return true;
        return i === 0;
      }).map((box, i) => (
        <div key={`lead-highlight-${i}`} className="mt-6">
          {renderHighlightBox(box, i)}
        </div>
      ))}

      {section.stackCards ? (
        <div className="mt-6 space-y-6">
          {section.stackCards.map((card, i) => {
            if (!card.label && !card.title && card.bullets) {
              return (
                <StrategyCard key={i} glow={card.glow}>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What the numbers mean</div>
                  <div className="mt-4">
                    <BulletList items={card.bullets} />
                  </div>
                </StrategyCard>
              );
            }
            return <StackCardBlock key={i} card={card} />;
          })}
        </div>
      ) : null}

      {section.platformStatuses ? (
        <div className="mt-6 space-y-6">
          {section.platformStatuses.map((ps, i) => (
            <PlatformStatusCard key={i} platform={ps.platform} status={ps.status} detail={ps.detail} />
          ))}
        </div>
      ) : null}

      {section.promptObservations ? (
        <div className="mt-6 space-y-6">
          {section.promptObservations.map((po, i) => (
            <PromptObservationCard key={i} platform={po.platform} market={po.market} prompt={po.prompt} observed={po.observed} />
          ))}
        </div>
      ) : null}

      {section.upsideChart ? (
        <div className="mt-6">
          <PhasedUpsideChart points={section.upsideChart} />
        </div>
      ) : null}

      {section.calculator ? (
        <div className="mt-6">
          <CommercialImpactCalculator baseVisits={section.calculator.baseVisits} />
        </div>
      ) : null}

      {section.monthBlocks ? (
        <div className="mt-6 space-y-6">
          {section.monthBlocks.map((mb, i) => (
            <MonthBlock key={i} label={mb.label} title={mb.title} bullets={mb.bullets} />
          ))}
        </div>
      ) : null}

      {section.scopeBlocks ? (
        <div className="mt-6 space-y-6">
          {section.scopeBlocks.map((sb, i) => (
            <ScopeBlock key={i} label={sb.label} title={sb.title} icon={sb.icon} bullets={sb.bullets} />
          ))}
        </div>
      ) : null}

      {section.timelineChart ? (
        <div className="mt-6">
          <GrowthTimelineChart
            points={section.timelineChart.points}
            milestones={section.timelineChart.milestones}
          />
        </div>
      ) : null}

      {section.timelineChart && section.stackCards ? (
        <div className="mt-6 space-y-6">
          {section.stackCards.map((card, i) => (
            <StackCardBlock key={`post-timeline-${i}`} card={card} />
          ))}
        </div>
      ) : null}

      {section.highlightBoxes
        ?.filter((_, i) => {
          const hasStackCards = section.stackCards && section.stackCards.length > 0;
          if (!hasStackCards) return i > 0;
          return i > 0;
        })
        .map((box, i) => (
          <div key={`trailing-highlight-${i}`} className="mt-6">
            {renderHighlightBox(box, i)}
          </div>
        ))}
    </StrategySectionShell>
  );
}

import btsData from "@data/strategy-content/bts.json";
import bts2Data from "@data/strategy-content/bts-2.json";
import bts3Data from "@data/strategy-content/bts-3.json";
import signifyIpData from "@data/strategy-content/signify-ip.json";
import uleadsData from "@data/strategy-content/uleads.json";
import kinsoData from "@data/strategy-content/kinso.json";
import drinkhyroData from "@data/strategy-content/drinkhyro.json";
import hotWaterFunnelData from "@data/strategy-content/hot-water-funnel.json";
import creatorArmyData from "@data/strategy-content/creator-army.json";
import xoomaiData from "@data/strategy-content/xoomai.json";

const contentMap: Record<string, StrategyContentData> = {
  bts: btsData as unknown as StrategyContentData,
  "bts-2": bts2Data as unknown as StrategyContentData,
  "bts-3": bts3Data as unknown as StrategyContentData,
  "signify-ip": signifyIpData as unknown as StrategyContentData,
  uleads: uleadsData as unknown as StrategyContentData,
  kinso: kinsoData as unknown as StrategyContentData,
  drinkhyro: drinkhyroData as unknown as StrategyContentData,
  "hot-water-funnel": hotWaterFunnelData as unknown as StrategyContentData,
  "creator-army": creatorArmyData as unknown as StrategyContentData,
  xoomai: xoomaiData as unknown as StrategyContentData,
};

export default function StrategyPageTemplate({ slug }: { slug: string }) {
  const data = contentMap[slug] || null;

  useEffect(() => {
    if (data) {
      document.title = data.title;
      window.scrollTo(0, 0);
    }
  }, [data]);

  if (!data) return null;

  return (
    <StrategyPageFrame>
      <Nav />
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">
        <StrategyHero
          eyebrow={data.hero.eyebrow}
          title={data.hero.headline}
          accent={data.hero.accent}
          subtitle={data.hero.subtitle}
          tags={data.hero.tags}
        >
          <div className="mb-8">
            <SummariseButton slug={data.slug} />
          </div>

          <div className="mb-8">
            <TldrSection items={data.tldr} />
          </div>

          {data.executiveSummary ? (
            <StrategyCard glow="mixed">
              <SectionHeader
                number={data.executiveSummary.number}
                title={data.executiveSummary.heading}
                eyebrow={data.executiveSummary.eyebrow}
                subtitle={data.executiveSummary.subtitle}
              />
              <div className="space-y-4">
                {data.executiveSummary.metrics.map((metric) => (
                  <ExecutiveMetricCard
                    key={metric.label}
                    icon={getIcon(metric.icon) || <Search className="h-5 w-5" />}
                    label={metric.label}
                    value={metric.value}
                    note={metric.note}
                    breakdown={metric.breakdown || []}
                  />
                ))}
              </div>
              <div className="mt-8 border-t border-white/8 pt-6">
                <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Immediate actions</div>
                <div className="space-y-4">
                  {data.executiveSummary.immediateActions.map((action) => (
                    <ImmediateActionCard key={action.number} {...action} />
                  ))}
                </div>
              </div>
            </StrategyCard>
          ) : null}
        </StrategyHero>

        {data.sections.map((section) => renderSection(section))}

        {data.failureBlock ? (
          <div className="mx-auto max-w-4xl">
            <StakesBlock block={data.failureBlock} variant="failure" />
          </div>
        ) : null}

        {data.successBlock ? (
          <div className="mx-auto max-w-4xl">
            <StakesBlock block={data.successBlock} variant="success" />
          </div>
        ) : null}

        <StrategyCTA
          eyebrow={data.cta.eyebrow}
          title={data.cta.headline}
          body={data.cta.body}
          href={data.cta.href}
          ctaLabel={data.cta.ctaLabel}
        />

        {data.appendix ? (
          <StrategySectionShell>
            <SectionHeader
              number={data.appendix.number}
              title={data.appendix.heading}
              eyebrow={data.appendix.eyebrow}
              subtitle={data.appendix.subtitle}
            />
            {data.appendix.sectionLead ? (
              <StrategySectionLead
                takeaway={data.appendix.sectionLead.takeaway}
                body={data.appendix.sectionLead.body}
              />
            ) : null}
            <div className="space-y-6">
              {data.appendix.sections.map((section, i) => renderAppendixSection(section, i))}
            </div>
          </StrategySectionShell>
        ) : null}
      </div>
    </StrategyPageFrame>
  );
}

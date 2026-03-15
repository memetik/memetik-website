export interface StrategyMetric {
  label: string;
  value: string;
  note: string;
  icon?: string;
  breakdown?: { label: string; value: string; note?: string }[];
}

export interface StrategyImmediateAction {
  number: string;
  title: string;
  detail: string;
}

export interface StrategyUpsidePoint {
  month: number;
  low: number;
  base: number;
  high: number;
}

export interface StrategyTimelinePoint {
  month: number;
  title: string;
  detail: string;
  bullets: string[];
  trafficLabel: string;
  trafficValue: number;
  low: number;
  base: number;
  high: number;
}

export interface StrategyTimelineMilestone {
  label: string;
  month: number;
  title: string;
  detail: string;
  trafficLabel: string;
  trafficValue: number;
}

export interface StrategyStackCard {
  label: string;
  title: string;
  icon?: string;
  glow?: "blue" | "amber" | "mixed";
  content?: string;
  bullets?: string[];
}

export interface StrategyPlatformStatus {
  platform: string;
  status: string;
  detail: string;
}

export interface StrategyPromptObservation {
  platform: string;
  market: string;
  prompt: string;
  observed: string;
}

export interface StrategyScopeBlock {
  label: string;
  title: string;
  icon?: string;
  bullets: string[];
}

export interface StrategyMonthBlock {
  label: string;
  title: string;
  bullets: string[];
}

export interface StrategyHighlightBox {
  title?: string;
  tone?: "default" | "warning";
  heading?: string;
  body?: string;
  bullets?: string[];
}

export interface StrategyAppendixTable {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  headers: string[];
  rows: string[][];
}

export interface StrategyAppendixBullets {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  bullets: string[];
}

export interface StrategyAppendixComposite {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: Array<
    | { type: "table"; headers: string[]; rows: string[][] }
    | { type: "bullets"; items: string[] }
    | { type: "highlight"; title?: string; tone?: "default" | "warning"; bullets: string[] }
    | { type: "card"; eyebrow?: string; bullets: string[] }
  >;
}

export type StrategyAppendixSection =
  | StrategyAppendixTable
  | StrategyAppendixBullets
  | StrategyAppendixComposite;

export interface StrategyNarrativeBlock {
  heading?: string;
  body: string;
}

export interface StrategyStakesBlock {
  eyebrow?: string;
  heading: string;
  bullets: string[];
}

export interface StrategySection {
  id: string;
  number?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  sectionLead?: {
    takeaway?: string;
    body?: string;
    implication?: string;
  };
  narrativeProse?: StrategyNarrativeBlock[];
  stackCards?: StrategyStackCard[];
  highlightBoxes?: StrategyHighlightBox[];
  platformStatuses?: StrategyPlatformStatus[];
  promptObservations?: StrategyPromptObservation[];
  monthBlocks?: StrategyMonthBlock[];
  scopeBlocks?: StrategyScopeBlock[];
  upsideChart?: StrategyUpsidePoint[];
  calculator?: {
    baseVisits: number;
  };
  timelineChart?: {
    points: StrategyTimelinePoint[];
    milestones: StrategyTimelineMilestone[];
  };
}

export interface StrategyTransitionalCta {
  eyebrow?: string;
  headline: string;
  body: string;
  href?: string;
  ctaLabel?: string;
}

export interface StrategyContentData {
  slug: string;
  company: string;
  domain?: string;
  title: string;
  description: string;
  generatedAt: string;
  researchConfidence?: number;

  tldr: string[];

  hero: {
    eyebrow: string;
    headline: string;
    accent?: string;
    subtitle?: string;
    oneLiner?: string;
    tags?: string[];
  };

  executiveSummary?: {
    number: string;
    heading: string;
    eyebrow: string;
    subtitle?: string;
    metrics: StrategyMetric[];
    immediateActions: StrategyImmediateAction[];
  };

  sections: StrategySection[];

  failureBlock?: StrategyStakesBlock;
  successBlock?: StrategyStakesBlock;

  midPageCta?: StrategyTransitionalCta;
  transitionalCta?: StrategyTransitionalCta;

  cta: {
    eyebrow?: string;
    headline: string;
    body: string;
    href?: string;
    ctaLabel?: string;
  };

  appendix?: {
    number?: string;
    heading: string;
    eyebrow?: string;
    subtitle?: string;
    sectionLead?: {
      takeaway?: string;
      body?: string;
    };
    sections: StrategyAppendixSection[];
  };
}

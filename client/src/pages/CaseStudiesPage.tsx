import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import {
  MarketingCard,
  MarketingContainer,
  MarketingFooter,
  MarketingPage,
  MarketingPill,
  MarketingSectionGlow,
  MarketingSectionShell,
  marketingTheme,
} from "@/components/marketing/MarketingTheme";

const studies = [
  {
    sector: "B2B SaaS",
    title: "From invisible to the default AI recommendation",
    challenge: "A category leader was absent from the prompts buyers used before shortlisting vendors.",
    outcome: "Built the answer-share baseline, the missing bottom-of-funnel pages, and the authority layer needed to become a cited recommendation across category prompts.",
    metrics: ["#1 recommendation share", "$847K attributed pipeline", "90 days to first movement"],
  },
  {
    sector: "E-commerce",
    title: "Recovering discovery in zero-click product research",
    challenge: "AI assistants and answer-first SERP features were recommending competitors before buyers reached the site.",
    outcome: "Restructured comparison and product-supporting content, then reinforced authority so recommendation frequency improved across buying queries.",
    metrics: ["347% citation lift", "52% more AI-assisted sessions", "$2.3M influenced revenue"],
  },
  {
    sector: "B2B services",
    title: "Owning shortlist-stage recommendation prompts",
    challenge: "Prospects were researching the category in AI tools, but the firm rarely appeared in recommendations.",
    outcome: "Built service-page coverage, category comparisons, and trust-signal reinforcement that pushed the brand into shortlist conversations earlier.",
    metrics: ["Higher answer share", "Stronger branded discovery", "Improved qualified pipeline mix"],
  },
];

export default function CaseStudiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Case Studies | MEMETIK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "See representative MEMETIK outcomes across B2B SaaS, e-commerce, and service businesses competing for AI-driven discovery.");
    }
  }, []);

  return (
    <MarketingPage>
      <Nav />
      <main className="px-4 pb-8 pt-28 sm:px-6 md:px-12 md:pt-32">
        <MarketingContainer className="space-y-6">
          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-14">
            <MarketingSectionGlow className="-left-12 top-0 h-44 w-44" />
            <MarketingSectionGlow className="bottom-0 right-0 h-48 w-48" tone="amber" />
            <div className="relative z-10 max-w-4xl">
              <MarketingPill className="mb-6">Proof of work</MarketingPill>
              <h1 className="font-display text-4xl font-extrabold uppercase tracking-[-0.05em] leading-[0.9] text-white sm:text-5xl md:text-7xl">
                Case studies
              </h1>
              <p className="mt-5 max-w-3xl font-mono text-sm leading-7 text-white/60 sm:text-base">
                Representative outcomes from brands that needed more than rankings. They needed to become the credible answer when buyers asked AI who to trust.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/audit" className={marketingTheme.primaryButton}>
                  Get a free AI visibility audit
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/pricing" className={marketingTheme.secondaryButton}>
                  Review pricing
                </a>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid gap-4">
              {studies.map((study) => (
                <MarketingCard key={study.title} className="p-6 sm:p-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">{study.sector}</div>
                  <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white">
                    {study.title}
                  </h2>
                  <p className="mt-4 font-mono text-sm leading-7 text-white/60">
                    <strong className="text-white/82">Challenge:</strong> {study.challenge}
                  </p>
                  <p className="mt-3 font-mono text-sm leading-7 text-white/60">
                    <strong className="text-white/82">What changed:</strong> {study.outcome}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {study.metrics.map((metric) => (
                      <div key={metric} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                        {metric}
                      </div>
                    ))}
                  </div>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>
        </MarketingContainer>
      </main>

      <MarketingFooter
        title="Want the same answer-share lift in your category?"
        description="We will show you where the market is already being won, what is missing from your current coverage, and how to close the gap with a revenue-led buildout."
        ctaHref="/audit"
        ctaLabel="Get your free AI audit"
        note="Competitive answer-share review included"
      />
    </MarketingPage>
  );
}

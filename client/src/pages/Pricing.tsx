import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

const engagementSections = [
  {
    title: "Audit and market map",
    body: "Prompt testing, answer-share baselining, competitor analysis, and a prioritized demand-capture roadmap.",
  },
  {
    title: "Content and page infrastructure",
    body: "Bottom-of-funnel assets, comparison pages, topic coverage, and programmatic systems designed for citation and recommendation.",
  },
  {
    title: "Authority and reinforcement",
    body: "The trust signals, source coverage, and monitoring loops required to make recommendation gains stick.",
  },
];

const fit = [
  "Engagements start at $15K/month with a six-month minimum.",
  "Best for teams with real ACV, executive urgency, and a category worth owning.",
  "Not a fit for companies looking for cheap content volume or a short-term ranking spike.",
];

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Pricing | MEMETIK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Review MEMETIK pricing, engagement structure, deliverables, and who our AEO retainer is designed for.");
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
              <MarketingPill className="mb-6">Pricing</MarketingPill>
              <h1 className="font-display text-4xl font-extrabold uppercase tracking-[-0.05em] leading-[0.9] text-white sm:text-5xl md:text-7xl">
                Pricing and engagement structure
              </h1>
              <p className="mt-5 max-w-3xl font-mono text-sm leading-7 text-white/60 sm:text-base">
                MEMETIK engagements start at $15K per month with a six-month minimum. We price this like a growth system, not a content retainer, because the work spans answer-share measurement, demand-capture buildout, and authority reinforcement.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/audit" className={marketingTheme.primaryButton}>
                  Get a free AI visibility audit
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="https://cal.com/memetik/letstalk" className={marketingTheme.secondaryButton}>
                  Book a strategy call
                </a>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className={marketingTheme.eyebrow}>What is included</div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {engagementSections.map((section) => (
                <MarketingCard key={section.title} className="p-6">
                  <h2 className="font-display text-2xl font-extrabold uppercase tracking-[-0.03em] text-white">
                    {section.title}
                  </h2>
                  <p className="mt-4 font-mono text-sm leading-7 text-white/60">{section.body}</p>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className={marketingTheme.eyebrow}>Fit and scope</div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {fit.map((item) => (
                <MarketingCard key={item} className="flex items-start gap-3 p-5">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-white/70" />
                  <p className="font-mono text-sm leading-7 text-white/62">{item}</p>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>
        </MarketingContainer>
      </main>

      <MarketingFooter
        title="Need a custom scope?"
        description="We will baseline your category, show the revenue surfaces that matter, and scope the buildout around the amount of authority and content infrastructure your market actually requires."
        ctaHref="/audit"
        ctaLabel="Get your free AI audit"
        note="Scope and priority map included"
      />
    </MarketingPage>
  );
}

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

const pillars = [
  {
    title: "Answer-share audit",
    body: "We test the prompts, surfaces, and buyer questions that shape category preference across Google, ChatGPT, Perplexity, Gemini, and other answer engines.",
  },
  {
    title: "Demand capture buildout",
    body: "We ship the pages, programmatic infrastructure, and bottom-of-funnel assets that create recommendation-worthy coverage where pipeline is actually won.",
  },
  {
    title: "Authority reinforcement",
    body: "We strengthen the source and trust signals that make your brand easier for AI systems and buyers to trust.",
  },
];

const fitItems = [
  "Growth-stage SaaS teams with meaningful ACV and real buying journeys.",
  "E-commerce brands losing discovery to zero-click search and AI product recommendations.",
  "B2B service firms that need to become the default recommendation before sales ever gets involved.",
  "Operators who want executive reporting on answer share, not just rank tracking.",
];

export default function AEOAgency() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Answer Engine Optimization Agency | MEMETIK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "MEMETIK is the AEO agency for brands that need measurable AI visibility, category authority, and pipeline from search and answer engines.");
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
              <MarketingPill className="mb-6">Commercial page</MarketingPill>
              <h1 className="font-display text-4xl font-extrabold uppercase tracking-[-0.05em] leading-[0.9] text-white sm:text-5xl md:text-7xl">
                Answer engine optimization agency
              </h1>
              <p className="mt-5 max-w-3xl font-mono text-sm leading-7 text-white/60 sm:text-base">
                MEMETIK helps brands become the credible answer across Google, ChatGPT, Perplexity, Gemini, and the wider AI discovery layer. We build the systems that turn visibility into shortlist inclusion, category authority, and pipeline.
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
            <div className={marketingTheme.eyebrow}>What we build</div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => (
                <MarketingCard key={pillar.title} className="p-6">
                  <h2 className="font-display text-2xl font-extrabold uppercase tracking-[-0.03em] text-white">
                    {pillar.title}
                  </h2>
                  <p className="mt-4 font-mono text-sm leading-7 text-white/60">{pillar.body}</p>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className={marketingTheme.eyebrow}>Best fit</div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {fitItems.map((item) => (
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
        title="Want to own the recommendation layer?"
        description="We will show you where your brand is winning, where competitors are getting cited instead, and what has to be built to shift category preference in your favor."
        ctaHref="/audit"
        ctaLabel="Get your free AI audit"
        note="Answer-share baseline included"
      />
    </MarketingPage>
  );
}

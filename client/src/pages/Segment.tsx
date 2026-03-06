import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Nav } from "@/components/Nav";
import {
  ArrowRight,
  EyeOff,
  TrendingDown,
  AlertTriangle,
  Clock,
  ChevronDown,
} from "lucide-react";
import { segments } from "@/data/segments";
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

const iconMap: Record<string, React.ReactNode> = {
  "eye-off": <EyeOff className="w-5 h-5" />,
  "trending-down": <TrendingDown className="w-5 h-5" />,
  "alert-triangle": <AlertTriangle className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
};

export default function Segment() {
  const { segment } = useParams<{ segment: string }>();
  const data = segment ? segments[segment] : null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      document.title = data.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", data.metaDescription);
    }
  }, [data]);

  if (!data) {
    return (
      <MarketingPage>
        <Nav />
        <div className="px-4 pb-16 pt-32 sm:px-6 md:px-12">
          <MarketingContainer>
            <MarketingSectionShell className="px-8 py-16 text-center">
              <h1 className="text-3xl font-display font-extrabold uppercase mb-4">Page Not Found</h1>
              <Link href="/" className={marketingTheme.secondaryButton}>Back to home</Link>
            </MarketingSectionShell>
          </MarketingContainer>
        </div>
      </MarketingPage>
    );
  }

  return (
    <MarketingPage>
      <Nav />
      <main className="px-4 pb-8 pt-28 sm:px-6 md:px-12 md:pt-32">
        <MarketingContainer className="space-y-6">
          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-14">
            <MarketingSectionGlow className="-left-12 top-0 h-44 w-44" />
            <MarketingSectionGlow className="bottom-0 right-0 h-48 w-48" tone="amber" />
            <div className="relative z-10">
              <MarketingPill className="mb-8">
                <span className="h-2 w-2 rounded-full bg-[#78f0c4] shadow-[0_0_12px_rgba(120,240,196,0.85)]" />
                {data.badge}
              </MarketingPill>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)] lg:items-end">
                <div>
                  <h1 className="mb-6 max-w-5xl whitespace-pre-line font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {data.headline}
                  </h1>
                  <p className="mb-4 max-w-3xl text-xl text-white/74 sm:text-2xl md:text-3xl">
                    {data.subhead}
                  </p>
                  <p className="max-w-2xl font-mono text-sm leading-7 text-white/58">
                    {data.description}
                  </p>

                  <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Link href="/audit" className={marketingTheme.primaryButton}>
                      {data.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                      {data.ctaSubtext}
                    </span>
                  </div>
                </div>

                <MarketingCard className="p-6 sm:p-7">
                  <div className={marketingTheme.eyebrow}>Executive snapshot</div>
                  <div className="mt-6 space-y-4">
                    {data.stats.map((s, i) => (
                      <div key={i} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                        <div className="font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white">
                          {s.value}
                        </div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </MarketingCard>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className={marketingTheme.eyebrow}>Where teams lose momentum</div>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  Sound familiar?
                </h2>
              </div>
              <p className="max-w-xl font-mono text-sm leading-7 text-white/55">
                The problem is rarely effort. It is that legacy SEO programs were not built for AI recommendation systems.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {data.painPoints.map((p, i) => (
                <MarketingCard key={i} className="p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] text-white/72">
                    {iconMap[p.icon] || <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <p className="font-mono text-sm leading-7 text-white/68">{p.text}</p>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className={marketingTheme.eyebrow}>Execution system</div>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  How we fix it
                </h2>
              </div>
              <p className="max-w-xl font-mono text-sm leading-7 text-white/55">
                We build category authority, instrument answer share, and close the gap between search visibility and qualified pipeline.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {data.steps.map((s, i) => (
                <MarketingCard key={i} className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-4 font-mono text-sm leading-7 text-white/60">
                    {s.description}
                  </p>
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-center">
              <div>
                <div className={marketingTheme.eyebrow}>Custom engagement model</div>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  Every engagement is custom
                </h2>
                <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-white/58">
                  We scope strategy around your category dynamics, your sales motion, and the exact queries that influence revenue. 90-day performance guarantee included.
                </p>
              </div>

              <MarketingCard className="p-6 text-center sm:p-8">
                <a href="https://cal.com/memetik/letstalk" className={marketingTheme.primaryButton}>
                  Get your custom proposal
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">
                  30-min strategy call · No obligation
                </p>
              </MarketingCard>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8">
              <div className={marketingTheme.eyebrow}>Decision-maker FAQ</div>
              <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                Common questions
              </h2>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <MarketingCard key={i} className="p-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-mono text-sm font-semibold leading-6 text-white/80">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 flex-shrink-0 text-white/50 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="font-mono text-sm leading-7 text-white/60">{faq.a}</p>
                    </div>
                  )}
                </MarketingCard>
              ))}
            </div>
          </MarketingSectionShell>
        </MarketingContainer>
      </main>

      <MarketingFooter
        title="Ready to become the category answer?"
        description={data.ctaSubtext}
        ctaHref="/audit"
        ctaLabel={data.ctaText}
        note="Revenue-first audit · executive review in 24 hours"
      />
    </MarketingPage>
  );
}

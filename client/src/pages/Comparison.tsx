import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Nav } from "@/components/Nav";
import { ArrowRight, ChevronDown } from "lucide-react";
import { comparisons } from "@/data/comparisons";
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

export default function Comparison() {
  const { comparison } = useParams<{ comparison: string }>();
  const data = comparison ? comparisons[comparison] : null;
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
            <div className="relative z-10 max-w-5xl">
              <MarketingPill className="mb-8">{data.badge}</MarketingPill>
              <h1 className="mb-6 whitespace-pre-line font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
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
                  Get your free audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Executive comparison review in 24 hours
                </span>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className={marketingTheme.eyebrow}>Side-by-side analysis</div>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  The honest comparison
                </h2>
              </div>
              <p className="max-w-xl font-mono text-sm leading-7 text-white/55">
                The goal is not more activity. It is understanding which operating model compounds durable answer share and pipeline.
              </p>
            </div>

            <div className="hidden overflow-hidden rounded-[1.75rem] border border-white/10 md:block">
              <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03]">
                <div className="p-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">Category</div>
                <div className="border-l border-white/10 p-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">{data.themLabel}</div>
                <div className="border-l border-white/10 bg-white/[0.06] p-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">{data.usLabel}</div>
              </div>
              {data.rows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-white/10 last:border-b-0">
                  <div className="p-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/76">{row.category}</div>
                  <div className="border-l border-white/10 p-4 font-mono text-sm leading-7 text-white/56">{row.them}</div>
                  <div className="border-l border-white/10 bg-white/[0.03] p-4 font-mono text-sm leading-7 text-white/78">{row.us}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 md:hidden">
              {data.rows.map((row, i) => (
                <MarketingCard key={i} className="p-5">
                  <div className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/76">{row.category}</div>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/36">{data.themLabel}</div>
                    <p className="mt-2 font-mono text-sm leading-7 text-white/56">{row.them}</p>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">{data.usLabel}</div>
                    <p className="mt-2 font-mono text-sm leading-7 text-white/76">{row.us}</p>
                  </div>
                </MarketingCard>
              ))}
            </div>

            <MarketingCard className="mt-6 p-6 sm:p-8">
              <div className={marketingTheme.eyebrow}>The bottom line</div>
              <p className="mt-4 max-w-4xl font-mono text-sm leading-7 text-white/68">{data.bottomLine}</p>
            </MarketingCard>
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
        title="See the difference with an operator-level audit."
        description="We’ll show where your current model leaks visibility, where competitors are being surfaced first, and which moves create the biggest revenue advantage."
        ctaHref="/audit"
        ctaLabel="Get your free audit"
        note="Comparison-led audit · answer-share snapshot included"
      />
    </MarketingPage>
  );
}

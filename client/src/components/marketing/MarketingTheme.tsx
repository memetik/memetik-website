import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const marketingTheme = {
  page:
    "relative min-h-screen w-full overflow-hidden bg-[#050608] text-foreground selection:bg-primary selection:text-primary-foreground",
  sectionShell:
    "relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm",
  cardShell:
    "relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm",
  pill:
    "inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70",
  eyebrow:
    "font-mono text-[10px] uppercase tracking-[0.28em] text-white/45",
  title:
    "font-display text-4xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-5xl md:text-6xl",
  sectionTitle:
    "font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl md:text-5xl",
  body: "font-mono text-sm leading-7 text-white/62",
  muted: "font-mono text-xs uppercase tracking-[0.22em] text-white/42",
  primaryButton:
    "inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition hover:scale-[1.01] hover:opacity-95",
  secondaryButton:
    "inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/25 hover:bg-white/[0.06]",
};

export function MarketingAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(73,117,255,0.16),transparent_28%),radial-gradient(circle_at_75%_18%,rgba(255,183,77,0.12),transparent_18%),linear-gradient(180deg,#07080b_0%,#050608_45%,#07090d_100%)]" />
      <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,135,255,0.13)_0%,rgba(76,135,255,0.02)_45%,transparent_72%)] blur-3xl" />
      <div className="absolute right-[-8rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,172,89,0.08)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />
    </div>
  );
}

export function MarketingPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx(marketingTheme.page, className)}>
      <MarketingAtmosphere />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function MarketingContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx("max-w-7xl mx-auto", className)}>{children}</div>;
}

export function MarketingSectionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(marketingTheme.sectionShell, className)}>{children}</div>;
}

export function MarketingCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(marketingTheme.cardShell, className)}>{children}</div>;
}

export function MarketingPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(marketingTheme.pill, className)}>{children}</div>;
}

export function MarketingSectionGlow({
  className,
  tone = "blue",
}: {
  className?: string;
  tone?: "blue" | "amber";
}) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute rounded-full blur-3xl",
        tone === "amber"
          ? "bg-[radial-gradient(circle,rgba(255,172,89,0.12)_0%,transparent_72%)]"
          : "bg-[radial-gradient(circle,rgba(89,125,255,0.12)_0%,transparent_72%)]",
        className,
      )}
    />
  );
}

export function MarketingFooter({
  title,
  description,
  ctaHref,
  ctaLabel,
  note,
  eyebrow = "Ready to compound category authority?",
}: {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  note?: string;
  eyebrow?: string;
}) {
  const footerGroups = [
    {
      title: "For You",
      links: [
        ["SaaS Founders", "/for/saas-founders"],
        ["Marketing Leaders", "/for/marketing-leaders"],
        ["E-commerce", "/for/ecommerce-brands"],
        ["B2B Services", "/for/b2b-services"],
      ],
    },
    {
      title: "Solutions",
      links: [
        ["ChatGPT Visibility", "/solutions/chatgpt-visibility"],
        ["Perplexity Citations", "/solutions/perplexity-citations"],
        ["AI Overview Ranking", "/solutions/ai-overview-ranking"],
        ["Competitor Displacement", "/solutions/competitor-displacement"],
      ],
    },
    {
      title: "Compare",
      links: [
        ["vs SEO Agencies", "/vs/traditional-seo-agencies"],
        ["vs Content Agencies", "/vs/content-marketing-agencies"],
        ["vs DIY / Manual", "/vs/manual-seo"],
      ],
    },
    {
      title: "Resources",
      links: [
        ["Articles", "/resources"],
        ["AEO Agency", "/aeo-agency"],
        ["Pricing", "/pricing"],
        ["Case Studies", "/case-studies"],
        ["Free Audit", "/audit"],
      ],
    },
  ] as const;

  return (
    <>
      <section className="px-4 pb-8 pt-4 sm:px-6 md:px-12 md:pb-10">
        <MarketingContainer>
          <MarketingSectionShell className="px-6 py-10 sm:px-10 sm:py-12">
            <MarketingSectionGlow className="-left-10 top-0 h-40 w-40" />
            <MarketingSectionGlow className="bottom-0 right-0 h-40 w-40" tone="amber" />
            <div className="relative z-10 text-center">
              <div className={cx(marketingTheme.eyebrow, "mb-4")}>{eyebrow}</div>
              <h2 className="mx-auto max-w-4xl font-display text-3xl font-extrabold uppercase tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-mono text-sm leading-7 text-white/60">
                {description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={ctaHref} className={marketingTheme.primaryButton}>
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              {note && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">
                  {note}
                </p>
              )}
            </div>
          </MarketingSectionShell>
        </MarketingContainer>
      </section>

      <footer className="px-4 pb-10 pt-4 sm:px-6 md:px-12">
        <MarketingContainer>
          <MarketingSectionShell className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
              <div>
                <div className="font-display text-2xl font-extrabold uppercase tracking-[-0.06em] text-white">
                  MEMETIK
                </div>
                <p className="mt-3 max-w-xs font-mono text-xs uppercase tracking-[0.18em] text-white/42">
                  Revenue-led search infrastructure for the AI answer era.
                </p>
              </div>
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/38">
                    {group.title}
                  </div>
                  <ul className="mt-4 space-y-3">
                    {group.links.map(([label, href]) => (
                      <li key={href}>
                        <a href={href} className="font-mono text-xs text-white/62 transition hover:text-white">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="inline-flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#6b8cff] shadow-[0_0_14px_rgba(107,140,255,0.8)]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Executive search intelligence system
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                © 2026 MEMETIK
              </div>
            </div>
          </MarketingSectionShell>
        </MarketingContainer>
      </footer>
    </>
  );
}

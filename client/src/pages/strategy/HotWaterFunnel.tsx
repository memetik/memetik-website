import { useEffect } from "react";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  DollarSign,
  MapPin,
  Search,
  ShieldCheck,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import {
  HighlightBox,
  SectionHeader,
  StrategyCTA,
  StrategyHero,
  StrategyPageFrame,
  StrategySectionLead,
  StrategySectionShell,
  StrategyCard,
} from "@/components/strategy";

type DeliverableGroup = {
  title: string;
  bullets: string[];
};

type PackageTier = {
  kicker: string;
  title: string;
  body: string;
  total: string;
  setup: string;
  monthly: string;
  media: string;
  recommended?: boolean;
  glow: "amber" | "blue" | "mixed";
  groups: DeliverableGroup[];
  tradeoffs?: string[];
};

const heroMetrics = [
  {
    label: "Standard install offer",
    value: "$3,600",
    note: "A clear fixed-price offer gives your business a cleaner sales message than generic quote-first competitors.",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    label: "Gold Coast demand",
    value: "1.5k–3k+",
    note: "Estimated monthly search demand across heat pump, hot water replacement, rebate, and brand-intent terms.",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    label: "Launch period",
    value: "90 days",
    note: "The first 90 days put the channel live fast enough to start producing jobs and collecting real closed-job feedback.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    label: "Target output",
    value: "8–15 / week",
    note: "Long-range weekly booked-install target once the system is live, refined, and reinforced by ongoing monthly work.",
    icon: <Zap className="h-5 w-5" />,
  },
];

const heroActionCards = [
  {
    title: "You get a specialist local revenue channel",
    body:
      "Your offer becomes a dedicated local acquisition system instead of another service page buried inside a generic plumbing website.",
  },
  {
    title: "Your first 90 days focus on traction",
    body:
      "The opening phase gets the channel live, generates qualified demand, and aims to produce the first closed jobs quickly enough to create real commercial momentum.",
  },
  {
    title: "Closed installs fund faster growth",
    body:
      "Once installs start closing, that revenue can help fund the next layer of SEO, backlinks, local authority, and funnel optimisation rather than forcing everything into one large upfront build.",
  },
];

const opportunityBlocks = [
  {
    title: "The buyer already understands the offer",
    body:
      "Heat pump hot water has a cleaner buying story than many local trades offers: lower running costs, better efficiency, and a replacement decision that often arrives with urgency.",
  },
  {
    title: "The pricing can be positioned credibly",
    body:
      "Broader Australian installation benchmarks still leave room for a $3,600 standard-install offer to feel commercially believable rather than confusingly cheap or over-engineered.",
  },
  {
    title: "A specialist brand can out-position generalists",
    body:
      "Most local competitors still present as broad plumbing or multi-trade businesses. A narrower specialist position makes your business easier to remember, easier to trust, and easier to choose.",
  },
  {
    title: "The Gold Coast supports the product story",
    body:
      "Local climate conditions and household economics make the efficiency and savings story easier to communicate than in colder, more technically awkward markets.",
  },
];

const scopeBlocks = [
  {
    title: "Google Ads management",
    body:
      "We will set up and manage a paid acquisition layer that captures high-intent demand around replacement, rebate, heat pump, and brand-led searches.",
    bullets: [
      "Campaign structure and launch",
      "High-intent keyword targeting",
      "Search-term optimisation",
      "Ad testing and conversion refinement",
    ],
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Website and landing pages",
    body:
      "We will build a conversion-led site structure around one clear offer, one clear CTA path, and pages that support both paid traffic and organic search visibility.",
    bullets: [
      "Core service and savings pages",
      "Suburb and local-intent coverage",
      "Eligibility-first CTA flow",
      "Conversion-led page copy and structure",
    ],
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Google Business Profile and local SEO",
    body:
      "We will build the local visibility layer through Google Business Profile optimisation, on-page local SEO, service-area relevance, and supporting trust signals.",
    bullets: [
      "GBP optimisation and posting rhythm",
      "Local SEO page framework",
      "Service-area relevance",
      "Review and proof-layer support",
    ],
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Eligibility, booking, and deposit flow",
    body:
      "We will reduce quote friction by moving weaker-fit leads out early and guiding stronger-fit leads into a clearer qualification, booking, and deposit path.",
    bullets: [
      "Eligibility check flow",
      "Manual-review branch for edge cases",
      "Booking request or calendar layer",
      "Deposit logic for standard-fit jobs",
    ],
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "On-page and off-page SEO",
    body:
      "We will grow both the on-page SEO footprint and the off-page authority layer through service and suburb content, citations, backlinks, niche edits, guest posts, listicles, and ongoing local optimisation.",
    bullets: [
      "Service, suburb, and service + suburb page expansion",
      "Citations, backlinks, niche edits, guest posts, and listicle placements",
      "Monthly reporting and optimisation",
      "Ongoing on-page SEO, off-page SEO, GBP, and funnel improvement",
    ],
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const packageTiers: PackageTier[] = [
  {
    kicker: "Recommended",
    title: "Full-Funnel Revenue Engine",
    body:
      "This is the complete build: full on-page SEO footprint, full off-page authority building, full paid search coverage, full funnel automation, full Google Business Profile cadence, and the full customer journey from click to deposit to review to referral.",
    total: "$14,750 / 90 days",
    setup: "$2,000 one-off",
    monthly: "$3,000 / month management",
    media: "$1,250 / month ad spend",
    recommended: true,
    glow: "amber",
    groups: [
      {
        title: "Website + on-page SEO footprint",
        bullets: [
          "1 homepage anchored around the $3,600 standard-install offer",
          "4 core service pages",
          "7 brand pages",
          "60–80 Gold Coast suburb pages",
          "240–320 service + suburb pages across the 4 core services",
          "5 resource / comparison pages",
          "10–15 initial blog posts",
          "FAQ, about, reviews, refer, eligibility, privacy policy, and terms & conditions pages",
        ],
      },
      {
        title: "Off-page SEO + authority building",
        bullets: [
          "citation building and local directory placements",
          "backlink acquisition and authority outreach",
          "niche edits and contextual link placements",
          "guest posts, listicles, and comparison placements",
          "brand mention reinforcement around core service and suburb targets",
        ],
      },
      {
        title: "Google Ads build",
        bullets: [
          "4 campaign-aligned landing pages, one per ad set",
          "4 search campaign clusters: high intent, brand, rebate / savings, replacement / upgrade",
          "ad copy, keyword sets, negatives, assets, geo targeting, and conversion tracking",
          "weekly optimisation against lead quality and deposit conversion",
        ],
      },
      {
        title: "GBP + local trust layer",
        bullets: [
          "full GBP setup across categories, services, products, Q&A, and photos",
          "GBP offer setup and CTA alignment to the eligibility funnel",
          "1 GBP post per day for 90 days",
          "review request framework and review response protocol mirroring the source plan",
        ],
      },
      {
        title: "Funnel + automation + ops",
        bullets: [
          "5-step eligibility quiz",
          "booking calendar and Stripe deposit flow",
          "ServiceM8 job creation flow and internal notifications",
          "confirmation email + SMS, 48-hour reminder, on-the-way SMS, Day 3 check-in, Day 7 review email, Day 14 referral email, and Day 30 follow-up email",
        ],
      },
      {
        title: "Technical + reporting",
        bullets: [
          "schema, metadata, canonicals, sitemap, and GSC-ready structure",
          "call, form, quiz, booking, and deposit tracking",
          "monthly reporting against acquisition, funnel, review, referral, and revenue KPIs",
        ],
      },
    ],
  },
  {
    kicker: "Reduced scope",
    title: "Growth Launch",
    body:
      "This keeps the core acquisition and conversion system intact, but cuts back the on-page footprint, off-page authority activity, daily local activity, and automation depth. It still launches properly, just without the full local domination buildout.",
    total: "$10,250 / 90 days",
    setup: "$1,250 one-off",
    monthly: "$2,000 / month management",
    media: "$1,000 / month ad spend",
    glow: "blue",
    groups: [
      {
        title: "Website + on-page SEO footprint",
        bullets: [
          "1 homepage",
          "4 core service pages",
          "3 brand pages",
          "20–30 suburb pages",
          "60–90 service + suburb pages",
          "3 resource / comparison pages",
          "3–5 initial blog posts",
          "FAQ, about, reviews, eligibility, privacy policy, and terms & conditions pages",
        ],
      },
      {
        title: "Off-page SEO + authority building",
        bullets: [
          "foundational citations and local directory placements",
          "selective backlink outreach",
          "niche edits and contextual authority placements",
          "guest posts, listicles, and external mention work on priority targets",
        ],
      },
      {
        title: "Google Ads build",
        bullets: [
          "3 campaign-aligned landing pages",
          "3 search campaign clusters",
          "ad copy, keyword sets, negatives, and conversion tracking",
          "weekly optimisation on the live campaigns",
        ],
      },
      {
        title: "GBP + trust layer",
        bullets: [
          "full GBP setup",
          "GBP offer setup and CTA alignment",
          "3 GBP posts per week",
          "review request framework",
        ],
      },
      {
        title: "Funnel + automation",
        bullets: [
          "eligibility quiz",
          "booking request flow and deposit flow",
          "confirmation email + SMS",
          "Day 3 check-in and Day 7 review request",
        ],
      },
    ],
    tradeoffs: [
      "lighter suburb coverage",
      "smaller service + suburb page matrix",
      "reduced brand and content coverage",
      "lighter off-page SEO outreach and authority reinforcement",
      "no referral page or referral automation",
      "no daily GBP cadence",
    ],
  },
  {
    kicker: "Entry tier",
    title: "Lean Launch",
    body:
      "This is the stripped-down downsell: enough to test demand, launch the core page set, and establish a light off-page foundation, but nowhere near the full footprint needed to own the market.",
    total: "$5,350 / 90 days",
    setup: "$850 one-off",
    monthly: "$900 / month management",
    media: "$600 / month ad spend",
    glow: "mixed",
    groups: [
      {
        title: "Website + on-page SEO footprint",
        bullets: [
          "1 primary landing page / homepage hybrid",
          "1 core service page",
          "5 suburb pages",
          "1 rebate / savings page",
          "FAQ, eligibility / enquiry, privacy policy, and terms & conditions pages",
        ],
      },
      {
        title: "Off-page SEO + authority building",
        bullets: [
          "foundational citation setup",
          "core directory placements",
          "basic backlink and authority setup around the main service page",
        ],
      },
      {
        title: "Google Ads build",
        bullets: [
          "1 campaign-aligned landing page",
          "1 search campaign cluster",
          "basic keyword targeting and conversion tracking",
        ],
      },
      {
        title: "GBP + funnel",
        bullets: [
          "GBP setup pass",
          "GBP offer setup and CTA alignment",
          "1 GBP post per week",
          "simple eligibility capture and manual booking handoff",
          "basic confirmation email only",
        ],
      },
    ],
    tradeoffs: [
      "no brand page layer",
      "no service + suburb matrix at scale",
      "foundation-only off-page SEO",
      "no booking + Stripe + ServiceM8 automation",
      "no review or referral automation stack",
      "limited local SEO buildout",
    ],
  },
];

const financialBlocks = [
  {
    title: "Month 1",
    total: "$6,250",
    body:
      "Month 1 includes setup / launch plus the first month of ads management, SEO + authority, and paid media for the Full-Funnel Revenue Engine.",
    bullets: [
      "$2,000 setup / launch",
      "$1,000 ads management",
      "$2,000 on-page + off-page SEO",
      "$1,250 ad spend",
    ],
  },
  {
    title: "Month 2",
    total: "$4,250",
    body:
      "Once the channel is live, the spend shifts fully into management, SEO, and media rather than additional setup cost.",
    bullets: [
      "$1,000 ads management",
      "$2,000 on-page + off-page SEO",
      "$1,250 ad spend",
    ],
  },
  {
    title: "Month 3",
    total: "$4,250",
    body:
      "Month 3 keeps the full package running long enough to produce real optimisation data and the first meaningful closed-job cycle.",
    bullets: [
      "$1,000 ads management",
      "$2,000 on-page + off-page SEO",
      "$1,250 ad spend",
    ],
  },
  {
    title: "Full-Funnel total",
    total: "$14,750",
    featured: true,
    body:
      "This is the 90-day investment for the recommended package — the only tier that includes the full website footprint, daily GBP cadence, and complete automation stack.",
    bullets: [
      "full 90-day launch window",
      "complete package coverage",
      "first closed jobs begin funding the next layer of work",
    ],
  },
];

const revenueBlocks = [
  {
    title: "Conservative traction",
    output: "2–4 booked installs / week",
    revenue: "$28.8k–$57.6k monthly gross revenue",
    body:
      "Even at a conservative weekly pace, the economics become meaningful quickly because the offer value per standard install is already strong.",
  },
  {
    title: "Core performance range",
    output: "4–8 booked installs / week",
    revenue: "$57.6k–$115.2k monthly gross revenue",
    body:
      "This is where the channel starts to look like a serious acquisition engine rather than a light experiment.",
  },
  {
    title: "Long-range target",
    output: "8–15 booked installs / week",
    revenue: "$115.2k–$216k monthly gross revenue",
    body:
      "This is the longer-range upside once the funnel, local authority, and monthly optimisation are working together at a high level.",
    featured: true,
  },
];

const rolloutPhases = [
  {
    window: "Month 1",
    title: "Go live with the full acquisition system",
    body:
      "The first month gets the paid channel, core website, local presence, and booking flow live so the business can start taking qualified enquiries and deposits.",
    bullets: [
      "homepage, about, FAQ, reviews, eligibility, privacy policy, and terms & conditions live",
      "4 core service pages and 4 paid landing pages live",
      "first 30 suburb pages and first 120 service + suburb pages live",
      "citation, directory, and foundational off-page SEO setup underway",
      "Google Ads campaigns live with call, form, quiz, booking, and deposit tracking",
      "GBP fully optimised and posting daily",
      "booking calendar, Stripe deposit flow, and ServiceM8 connection tested end-to-end",
    ],
    live: "By the end of Month 1, paid traffic can hit campaign-specific pages, organic traffic has real local coverage, and deposits can be taken through a working funnel.",
  },
  {
    window: "Month 2",
    title: "Expand the local footprint and tighten conversion",
    body:
      "The second month pushes the local SEO footprint forward, improves lead quality, and turns live search-term and conversion data into better pages and better ad performance.",
    bullets: [
      "remaining suburb pages live",
      "brand pages and resource pages live",
      "next 120 service + suburb pages live",
      "backlinks, citations, niche edits, guest posts, and listicle placements underway",
      "review request flow running from completed installs",
      "daily GBP posting continues and offer / CTA alignment stays tight",
      "ads refined from live keyword, search-term, and lead-quality data",
    ],
    live: "By the end of Month 2, the site looks materially deeper, the local footprint is much harder to ignore, and the funnel is qualifying traffic more effectively.",
  },
  {
    window: "Month 3",
    title: "Finish the footprint and lock the growth loop",
    body:
      "The third month completes the first major build cycle and puts the compounding layer in place so the next quarter can scale from real commercial evidence.",
    bullets: [
      "remaining service + suburb pages live",
      "initial blog cluster live",
      "off-page SEO compounding through backlinks, citations, guest posts, niche edits, and listicle reinforcement",
      "referral page and referral email flow live on the Full-Funnel package",
      "post-install nurture sequence fully active",
      "reporting, optimisation, and next-quarter scale plan in place",
    ],
    live: "By the end of Month 3, the business has a full local acquisition system, a much larger SEO footprint, a live review engine, and a cleaner path to scale.",
  },
];

const compoundingBlocks = [
  {
    title: "Launch first, then scale with evidence",
    body:
      "Launch quickly, learn from real demand, and tighten the channel around actual closed jobs rather than assumptions.",
  },
  {
    title: "Closed jobs fund the next phase of growth",
    body:
      "Once installs start closing, that revenue can be used to fund more SEO coverage, more backlinks, more local authority work, and more funnel optimisation.",
  },
  {
    title: "The monthly structure stays simple",
    body:
      "After the first 90 days, the structure remains easy to understand: $1,000 / month for ads management, $2,000 / month for SEO + authority, plus the media budget that the closed-job economics can support.",
  },
];

const assumptions = [
  "standard replacement conditions",
  "standard plumbing and electrical connections",
  "no major relocation of the unit",
  "no major switchboard upgrade",
  "no asbestos or hazardous remediation",
  "no crane work or unusual access constraints",
  "no unusual structural modifications",
];

function MetricCard({
  label,
  value,
  note,
  icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <StrategyCard glow="blue">
      <div className="mb-3 flex text-[#f4e4cd]">{icon}</div>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
      <div className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-display font-extrabold leading-[0.92] tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 text-sm leading-7 text-white/68">{note}</p>
    </StrategyCard>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-7 text-white/68">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#f4e4cd]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PackageTierCard({ tier }: { tier: PackageTier }) {
  return (
    <StrategyCard glow={tier.glow}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">{tier.kicker}</div>
          <h3 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-white">{tier.title}</h3>
        </div>
        {tier.recommended ? (
          <div className="rounded-full border border-[#f4e4cd]/35 bg-[#f4e4cd]/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">
            Best option
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-7 text-white/68">{tier.body}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">90-day total</div>
          <div className="mt-2 text-2xl font-display font-bold tracking-tight text-white">{tier.total}</div>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Setup</div>
          <div className="mt-2 text-lg font-display font-semibold text-white">{tier.setup}</div>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Monthly management</div>
          <div className="mt-2 text-lg font-display font-semibold text-white">{tier.monthly}</div>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Media budget</div>
          <div className="mt-2 text-lg font-display font-semibold text-white">{tier.media}</div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {tier.groups.map((group) => (
          <div key={group.title}>
            <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{group.title}</div>
            <BulletList items={group.bullets} />
          </div>
        ))}
      </div>

      {tier.tradeoffs ? (
        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What drops off vs the Revenue Engine</div>
          <BulletList items={tier.tradeoffs} />
        </div>
      ) : null}
    </StrategyCard>
  );
}

export default function StrategyHotWaterFunnel() {
  useEffect(() => {
    document.title = "Hot Water Funnel — Sales-Led Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame>
      <Nav />

      <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
        <StrategyHero
          eyebrow="Gold Coast heat pump hot water strategy"
          title="Own Gold Coast heat pump demand"
          subtitle="Turn local search, Google Ads, and Google Business Profile into booked installs with one specialist conversion system."
          tags={[
            "Gold Coast",
            "Heat pump hot water",
            "$3,600 standard install",
            "90-day activation plan",
          ]}
          className="mb-10 md:mb-14"
        >
          <div className="space-y-4">
            <HighlightBox>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f4e4cd]">Executive summary</div>
              <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                Launch a specialist local acquisition system that starts producing qualified installs in the first 90 days, then use those wins to keep strengthening the channel month by month.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 md:text-base">
                You are not buying a brochure site. You are launching a revenue channel that combines Google Ads, local SEO, Google Business Profile, conversion-led pages, an eligibility path, and ongoing optimisation around one clear offer.
              </p>
            </HighlightBox>

            <div className="space-y-4">
              {heroMetrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="space-y-4">
              {heroActionCards.map((card) => (
                <StrategyCard key={card.title} glow="mixed">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Commercial outcome</div>
                  <h3 className="mt-2 text-xl font-display font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{card.body}</p>
                </StrategyCard>
              ))}
            </div>
          </div>
        </StrategyHero>

        <StrategySectionShell>
          <SectionHeader number="01" title="Why Your Offer Can Win on the Gold Coast" />
          <StrategySectionLead
            takeaway="Your offer gives you a strong local angle: fixed price, strong savings story, and a buying decision that often arrives with urgency."
            body="Buyers already understand the category, the price can be positioned credibly, and the path from replacement pain to booked install is cleaner than in many other local service categories."
          />

          <div className="space-y-4">
            {opportunityBlocks.map((block) => (
              <StrategyCard key={block.title}>
                <h3 className="text-xl font-display font-semibold text-white">{block.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{block.body}</p>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="02" title="What We Will Launch for You" />
          <StrategySectionLead
            takeaway="We will launch one connected system across acquisition, local visibility, qualification, booking, and monthly optimisation."
            body="Google Ads captures demand. On-page SEO builds the service and suburb footprint. Off-page SEO builds authority through citations, backlinks, niche edits, guest posts, and listicles. Google Business Profile and the funnel turn that visibility into booked installs."
          />

          <div className="space-y-4">
            {scopeBlocks.map((block) => (
              <StrategyCard key={block.title} glow="mixed">
                <div className="mb-3 flex text-[#f4e4cd]">{block.icon}</div>
                <h3 className="text-xl font-display font-semibold text-white">{block.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{block.body}</p>
                <div className="mt-5">
                  <BulletList items={block.bullets} />
                </div>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell glow="amber">
          <SectionHeader number="03" title="Choose Your 90-Day Rollout" />
          <StrategySectionLead
            takeaway="The Full-Funnel Revenue Engine is the complete build. The other two options exist as reduced-scope downsells, not equal alternatives."
            body="Each tier steps down the local footprint, ad coverage, content depth, automation, and GBP cadence so the top package remains the obvious commercial choice if the goal is to own the niche properly."
          />

          <div className="space-y-4">
            {packageTiers.map((tier) => (
              <PackageTierCard key={tier.title} tier={tier} />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="04" title="Full-Funnel Revenue Engine: 90-Day Investment Breakdown" />
          <StrategySectionLead
            takeaway="If the goal is to build the full engine properly, this is the 90-day commercial model to anchor on."
            body="These figures apply to the recommended package only: full website footprint, full ad coverage, daily GBP cadence, and the complete funnel / automation stack."
          />

          <div className="space-y-4">
            {financialBlocks.map((block) => (
              <StrategyCard key={block.title} glow={block.featured ? "amber" : "mixed"}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">{block.title}</div>
                <h3 className="mt-2 text-3xl font-display font-extrabold tracking-tight text-white">{block.total}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{block.body}</p>
                <div className="mt-5">
                  <BulletList items={block.bullets} />
                </div>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="05" title="Commercial Upside" />
          <StrategySectionLead
            takeaway="At $3,600 per standard install, the economics become meaningful quickly once the funnel starts producing booked jobs consistently."
            body="The ranges below show what booked-install volume can look like in gross revenue terms as the channel moves from early traction into stronger weekly output."
          />

          <div className="space-y-4">
            {revenueBlocks.map((block) => (
              <StrategyCard key={block.title} glow={block.featured ? "amber" : "blue"}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">{block.title}</div>
                <h3 className="mt-2 text-2xl font-display font-semibold text-white">{block.output}</h3>
                <p className="mt-2 text-lg font-display font-semibold text-[#f4e4cd]">{block.revenue}</p>
                <p className="mt-4 text-sm leading-7 text-white/68">{block.body}</p>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="06" title="What Goes Live Across The First 90 Days" />
          <StrategySectionLead
            takeaway="The recommended package is not vague. Each month has exact outputs tied to the website, Google Ads, Google Business Profile, and the funnel stack."
            body="This is the rollout for the Full-Funnel Revenue Engine — the package built to own the niche rather than just test it."
          />

          <div className="space-y-4">
            {rolloutPhases.map((phase) => (
              <StrategyCard key={phase.window} glow="mixed">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">{phase.window}</div>
                <h3 className="text-2xl font-display font-semibold text-white">{phase.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{phase.body}</p>
                <div className="mt-5">
                  <BulletList items={phase.bullets} />
                </div>
                <div className="mt-5 rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/78">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">What is live</span>
                  {phase.live}
                </div>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="07" title="How Revenue Keeps Strengthening the Channel" />
          <StrategySectionLead
            takeaway="The first wins should strengthen the next round of SEO, authority building, and funnel optimisation."
            body="Keep the monthly structure simple and use closed-job revenue to support the next layer of growth."
          />

          <div className="space-y-4">
            {compoundingBlocks.map((block, index) => (
              <StrategyCard key={block.title} glow={index === 2 ? "amber" : "blue"}>
                <h3 className="text-xl font-display font-semibold text-white">{block.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{block.body}</p>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="08" title="Standard Install Scope" />
          <StrategySectionLead
            takeaway="The offer works best when the public message stays simple and the operational boundaries stay explicit."
            body="The fixed price should remain visible, but it needs a clear standard-install definition so unusual jobs route into review rather than creating delivery friction later."
          />

          <StrategyCard glow="blue">
            <BulletList items={assumptions} />
            <div className="mt-5 rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/78">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4e4cd]">Commercial rule</span>
              Keep the public promise simple: <span className="text-white">$3,600 fully installed for standard installs.</span> If the job requires relocation,
              switchboard work, unusual access, structural modification, or any other non-standard element, it should move into manual review before final confirmation.
            </div>
          </StrategyCard>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Next step"
          title="Launch the full revenue engine, not a cut-down version"
          body="If the goal is to own the Gold Coast heat pump niche properly, the Full-Funnel Revenue Engine is the cleanest option: full website footprint, full paid search coverage, daily GBP activity, full automation, and a 90-day rollout built to start generating installs and compound from there."
          ctaLabel="Book Strategy Call"
        />
      </div>
    </StrategyPageFrame>
  );
}

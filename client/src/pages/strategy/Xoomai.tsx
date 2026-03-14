import { useEffect } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Cpu,
  Database,
  LineChart,
  Link2,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import {
  BulletList,
  DataTable,
  HighlightBox,
  SectionHeader,
  StrategyAppendixSection,
  StrategyCTA,
  StrategyCard,
  StrategyHero,
  StrategyPageFrame,
  StrategySectionLead,
  StrategySectionShell,
} from "@/components/strategy";

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <StrategyCard className="rounded-[28px]" glow="mixed">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
      <div className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-[0.95] tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 text-sm leading-7 text-white/66">{note}</p>
    </StrategyCard>
  );
}

function WorkstreamCard({
  icon,
  eyebrow,
  title,
  body,
  bullets,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
}) {
  return (
    <StrategyCard className="rounded-[28px]" glow="blue">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 text-[#f4e4cd]">
          {icon}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{eyebrow}</div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
      <div className="mt-4">
        <BulletList items={bullets} />
      </div>
    </StrategyCard>
  );
}

const heroMetrics = [
  {
    label: "Core offer motion",
    value: "6 pages",
    note: "XoomAI has already productised six service lines, but the site still behaves more like a consultancy brochure than a demand capture system.",
  },
  {
    label: "Flagship wedge",
    value: "XoomAgent™",
    note: "The AI employee / dedicated hardware offer is the clearest differentiator and should be the commercial centre of the outbound + search system.",
  },
  {
    label: "Dream 100 priority",
    value: "3 tiers",
    note: "The highest-return pipeline is not broad SMB demand. It is targeted founder and operator outreach into verticals where after-hours enquiries, admin drag, and compliance pressure are visible pain.",
  },
  {
    label: "System shift",
    value: "Inbound + outbound",
    note: "The site needs to move from generic AI-services positioning into a revenue system that combines Dream 100 account selection, proof-led pages, and authority capture.",
  },
];

const strengths = [
  {
    title: "There is a clear product wedge",
    body: "XoomAgent™ is stronger than generic AI consultancy language because it gives buyers a specific mental model: a fully managed AI employee on dedicated hardware with security and systems integration built in.",
  },
  {
    title: "The site already has service-page coverage",
    body: "AI strategy, Claude integration, automation, analytics, and training pages create enough topical breadth to support a stronger commercial narrative once they are reorganised around buying intent.",
  },
  {
    title: "Security and managed deployment are commercially useful",
    body: "Dedicated hardware, enterprise-grade security, and full management are powerful trust levers for legal, healthcare, property, and operationally sensitive businesses.",
  },
];

const gaps = [
  {
    title: "The current site is broad, not buyer-specific",
    body: "The messaging is credible, but it is still generalist. It speaks to ‘businesses using AI’ rather than to the exact operators most likely to buy a managed AI employee now.",
  },
  {
    title: "Dream 100 account selection is not reflected on-page",
    body: "There are no vertical pages, no role-specific pages, and no account-class pages that map to the businesses XoomAI should proactively target.",
  },
  {
    title: "The outbound story lacks proof packaging",
    body: "The site has useful claims, but it does not yet package them into a founder-facing conversion story with vertical pain points, ROI logic, objection handling, and outreach-ready social proof.",
  },
];

const dream100Tiers = [
  {
    tier: "Tier 1 — immediate fit",
    accounts: "Multi-location clinics, legal firms, accounting groups, property managers, and service businesses with after-hours lead leakage and heavy admin load.",
    why: "These verticals feel the pain quickly: missed enquiries, repetitive scheduling, document processing, and expensive headcount pressure.",
  },
  {
    tier: "Tier 2 — systems-rich operators",
    accounts: "Mid-market businesses using HubSpot, Salesforce, Microsoft 365, Xero, or practice-management systems with clear workflow bottlenecks.",
    why: "They already have the system surface area for XoomAI to plug into and demonstrate obvious operational leverage.",
  },
  {
    tier: "Tier 3 — authority and lighthouse logos",
    accounts: "Recognisable Australian firms in legal, health, education, and professional services that create downstream trust once won.",
    why: "These accounts are harder to close but disproportionately valuable as proof assets for the rest of the pipeline.",
  },
];

const workstreams = [
  {
    eyebrow: "Dream 100 account engine",
    title: "Build the account selection and outreach system first",
    body: "XoomAI should not wait for generic AI-consulting searches to do all the work. The first commercial advantage comes from selecting Dream 100 accounts by vertical pain, system complexity, and economic fit, then pairing that list with highly specific landing pages and outreach angles.",
    icon: <Target className="h-5 w-5" />,
    bullets: [
      "Define Dream 100 account universe by vertical, region, employee count, and systems complexity",
      "Segment targets by motion: after-hours enquiry capture, document automation, scheduling, or reporting/analytics",
      "Create account-level reason-to-reach messaging tied to visible operational pain rather than generic AI education",
    ],
  },
  {
    eyebrow: "Strategy page stack",
    title: "Deploy vertical strategy pages that match the outbound targets",
    body: "Every Dream 100 cluster should have a strategy page or vertical page that mirrors the exact pitch used in outbound. This lets prospects land on a page that feels written for their firm, not for ‘Australian businesses’ in general.",
    icon: <Building2 className="h-5 w-5" />,
    bullets: [
      "Launch vertical pages for legal, healthcare, accounting, and property-management buyers",
      "Lead with workload leakage, response time, admin load, and compliance/security proof",
      "Make XoomAgent™ the commercial centrepiece, with supporting service pages reinforcing the implementation layer",
    ],
  },
  {
    eyebrow: "Revenue-led search",
    title: "Capture high-intent searches around AI employee and workflow automation",
    body: "Search should support the outbound motion by owning the bottom-of-funnel terms buyers use when they are already translating pain into solution evaluation.",
    icon: <Search className="h-5 w-5" />,
    bullets: [
      "Build money pages around AI employee, AI receptionist, AI automation consultant, and industry-specific workflow automation queries",
      "Publish comparison pages against alternatives like hiring, generic chatbots, and disconnected tool stacks",
      "Use role-led language for founders, operations managers, practice managers, and office managers",
    ],
  },
  {
    eyebrow: "Authority loop",
    title: "Use proof, case narratives, and targeted backlinks to reinforce trust",
    body: "The site needs more than service descriptions. It needs a visible evidence layer that backs the outbound pitch and makes the buyer comfortable with security, integration, and ROI claims.",
    icon: <Link2 className="h-5 w-5" />,
    bullets: [
      "Publish mini case studies, before/after workflow narratives, and ROI-style proof blocks",
      "Secure backlinks and mentions from Australian business, SaaS, legal-tech, health-tech, and ops-focused publications",
      "Turn vertical wins into reusable trust assets across outreach and landing pages",
    ],
  },
];

const openingMoves = [
  "Reposition the site around XoomAgent™ as the primary commercial wedge, with strategy/integration services supporting delivery rather than leading the story.",
  "Create the first four Dream 100 vertical pages: AI for legal firms, AI for clinics, AI for accounting firms, and AI for property managers.",
  "Build one outbound sequence per vertical with a matching strategy page, a founder/ops-manager angle, and one proof-led CTA.",
  "Publish bottom-of-funnel comparison pages around AI employee vs staff hire, AI receptionist vs missed enquiries, and managed AI agent vs generic chatbot.",
  "Add a compact trust layer: security, dedicated hardware, integrations, implementation process, and ROI framing on every high-intent page.",
];

const pagePlanRows = [
  [
    "Legal firms",
    "after-hours legal enquiries, intake admin, document-heavy workflows",
    "AI employee for law firms / legal intake automation",
    "Dedicated hardware, client confidentiality, intake + follow-up automation",
  ],
  [
    "Healthcare / clinics",
    "appointment scheduling, reminders, patient admin, front-desk load",
    "AI receptionist for clinics / medical admin automation",
    "24/7 response, scheduling, reminders, staff time reallocation",
  ],
  [
    "Accounting / advisory",
    "client follow-ups, document collection, reporting, workflow bottlenecks",
    "AI workflow automation for accounting firms",
    "Document handling, recurring workflows, M365/Xero integration",
  ],
  [
    "Property / real estate operations",
    "lead response speed, routine follow-up, repetitive back-office tasks",
    "AI automation for property managers / real estate admin",
    "Lead triage, admin orchestration, scheduling, reporting",
  ],
];

const appendixRows = [
  [
    "Homepage",
    "Clear AI integration and XoomAgent™ positioning, but broad business language",
    "Sharpen around Dream 100 vertical pain and AI employee buyer intent",
  ],
  [
    "XoomAgent™ page",
    "Strongest commercial asset on the site",
    "Turn into the model for every vertical page and outbound CTA path",
  ],
  [
    "Service pages",
    "Good topical breadth across strategy, Claude, automation, analytics, training",
    "Reframe as supporting evidence and delivery modules around the flagship wedge",
  ],
  [
    "Trust layer",
    "Dedicated hardware and security claims are compelling",
    "Expand with stronger proof, example workflows, and vertical-specific objections",
  ],
];

export default function StrategyXoomai() {
  useEffect(() => {
    document.title = "XoomAI Dream 100 Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame mainClassName="mx-auto max-w-6xl">
      <Nav />

      <StrategyHero
        eyebrow="Dream 100 pipeline audit"
        title="XoomAI has the right product wedge."
        accent="Now it needs an account-led demand system."
        subtitle="The opportunity is not to look like a broader AI consultancy. It is to make XoomAgent™ the commercial centre, build Dream 100 target clusters around the highest-pain verticals, and deploy strategy pages that match outbound outreach one-for-one."
        tags={["xoomai.com.au", "Dream 100", "AI employee", "Revenue-led search"]}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {heroMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </StrategyHero>

      <StrategySectionShell glow="blue" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Current state"
          title="What XoomAI already has — and what the current site still lacks"
          subtitle="The current site is credible and better than most generic AI consultancies. The gap is not legitimacy. The gap is commercial focus."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <StrategyCard className="rounded-[28px]" glow="mixed">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <CheckCircle2 className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Observed strengths</div>
            </div>
            <div className="space-y-4">
              {strengths.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/66">{item.body}</p>
                </div>
              ))}
            </div>
          </StrategyCard>

          <StrategyCard className="rounded-[28px]" glow="amber">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <Search className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Primary gaps</div>
            </div>
            <div className="space-y-4">
              {gaps.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/66">{item.body}</p>
                </div>
              ))}
            </div>
          </StrategyCard>
        </div>
      </StrategySectionShell>

      <StrategySectionShell glow="mixed" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Opportunity / right to win"
          title="The right play is Dream 100-led, not broad-market AI traffic"
          subtitle="XoomAI should use outbound and search together: choose the right accounts, build pages for those exact accounts, then let search reinforce the same commercial story."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {dream100Tiers.map((item) => (
            <StrategyCard key={item.tier} className="rounded-[28px]" glow="blue">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{item.tier}</div>
              <h3 className="mt-3 text-xl font-semibold text-white">Target accounts</h3>
              <p className="mt-3 text-sm leading-7 text-white/66">{item.accounts}</p>
              <div className="mt-4 rounded-[20px] border border-white/8 bg-black/20 p-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Why this tier matters</div>
                <p className="mt-2 text-sm leading-6 text-white/72">{item.why}</p>
              </div>
            </StrategyCard>
          ))}
        </div>
      </StrategySectionShell>

      <StrategySectionShell glow="blue" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Competitive gap"
          title="The site should stop selling ‘AI services’ and start winning buyer-specific categories"
          subtitle="The strongest category language is already latent in the offer: AI employee, AI receptionist, workflow automation, and managed AI integration for specific vertical operators."
        />
        <DataTable
          headers={["Target vertical", "Pain to anchor", "Money page to build", "Core proof angle"]}
          rows={pagePlanRows}
        />
      </StrategySectionShell>

      <StrategySectionShell glow="amber" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="AI visibility / answer-surface gap"
          title="AI discovery will reward clearer category language than the current site uses"
          subtitle="Answer engines and retrieval systems are more likely to cite explicit, verticalised pages than a broad consultancy homepage."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <HighlightBox title="What AI systems need to see">
            <BulletList
              items={[
                "Clear page-level statements of who XoomAI serves and what XoomAgent™ replaces or augments",
                "Vertical-specific proof and workflow examples",
                "Explicit comparisons against hiring, generic chatbots, and disconnected automation stacks",
                "A repeatable structure across legal, healthcare, accounting, and property use cases",
              ]}
            />
          </HighlightBox>
          <HighlightBox title="What the current site does instead" tone="warning">
            <BulletList
              items={[
                "Explains capabilities broadly across many business contexts",
                "Uses strong but non-specific category language like strategy, integration, automation, and analytics",
                "Makes XoomAgent™ compelling without yet surrounding it with enough verticalised demand-capture pages",
                "Leaves too much of the buyer interpretation work to the visitor",
              ]}
            />
          </HighlightBox>
        </div>
      </StrategySectionShell>

      <StrategySectionShell glow="mixed" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="90-day opening move"
          title="The first 90 days should build the XoomAI demand engine, not just publish more generic service content"
          subtitle="The right first move is a compact system that aligns Dream 100 selection, vertical pages, comparison pages, and founder-facing outreach."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <StrategyCard className="rounded-[28px]" glow="amber">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <Workflow className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Opening moves</div>
            </div>
            <BulletList items={openingMoves} />
          </StrategyCard>
          <StrategyCard className="rounded-[28px]" glow="mixed">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <LineChart className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Commercial expectation</div>
            </div>
            <p className="text-sm leading-7 text-white/66">
              In the first 90 days, the goal is not scale by volume. The goal is to create a repeatable target-account motion: identify the best-fit firms, send them to a page that mirrors the outbound pitch, and use that system to learn which vertical pain points and proof assets convert fastest.
            </p>
            <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 p-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Success looks like</div>
              <BulletList
                items={[
                  "4 vertical strategy pages live",
                  "3 comparison pages live",
                  "Dream 100 lists segmented by vertical and role",
                  "Outbound sequences matched to each page",
                  "First meetings and objections feeding back into the page stack",
                ]}
              />
            </div>
          </StrategyCard>
        </div>
      </StrategySectionShell>

      <StrategySectionShell glow="blue" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Off-site authority"
          title="Authority should support the outbound story, not exist as generic SEO activity"
          subtitle="XoomAI should earn mentions and links from places that make the flagship wedge more believable to operators and founders."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {workstreams.map((item) => (
            <WorkstreamCard key={item.title} {...item} />
          ))}
        </div>
      </StrategySectionShell>

      <StrategySectionShell glow="amber" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="What Memetik builds and ships"
          title="This is the system we would deploy for XoomAI"
          subtitle="Not broad AI thought leadership. A revenue-led search and outbound infrastructure around the accounts most likely to buy now."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <StrategyCard className="rounded-[28px]" glow="mixed">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <Cpu className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Page system</div>
            </div>
            <BulletList
              items={[
                "XoomAgent™ core money page refinement",
                "4 Dream 100 vertical pages",
                "3 bottom-of-funnel comparison pages",
                "1 founder/operator narrative page explaining the managed AI employee thesis",
                "Trust-layer modules for security, integrations, onboarding, and ROI framing",
              ]}
            />
          </StrategyCard>
          <StrategyCard className="rounded-[28px]" glow="blue">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <MessageSquare className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Pipeline system</div>
            </div>
            <BulletList
              items={[
                "Dream 100 segmentation by vertical and operator role",
                "Outbound messaging angles tied to visible workflow pain",
                "Proof blocks and mini case-study narratives for each motion",
                "Search + answer-engine capture around the same commercial categories",
                "Feedback loop from meetings, objections, and wins into the page system",
              ]}
            />
          </StrategyCard>
        </div>
      </StrategySectionShell>

      <StrategySectionShell glow="mixed" className="mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Operating cadence"
          title="How the system compounds after launch"
          subtitle="Once the first pages and outbound lists are live, the work becomes a reinforcement loop instead of a one-off campaign."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <StrategyCard className="rounded-[28px]" glow="mixed">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <Briefcase className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Weekly</div>
            </div>
            <BulletList
              items={[
                "Dream 100 account review",
                "Outbound copy and page alignment",
                "SERP and answer-surface movement review",
                "New objections turned into page improvements",
              ]}
            />
          </StrategyCard>
          <StrategyCard className="rounded-[28px]" glow="blue">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <Database className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Monthly</div>
            </div>
            <BulletList
              items={[
                "New vertical and comparison page expansion",
                "Backlink and mention acquisition",
                "Proof-layer updates from new client outcomes",
                "Priority-keyword and conversion review",
              ]}
            />
          </StrategyCard>
          <StrategyCard className="rounded-[28px]" glow="amber">
            <div className="mb-4 flex items-center gap-3 text-[#f4e4cd]">
              <ShieldCheck className="h-5 w-5" />
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Quarterly</div>
            </div>
            <BulletList
              items={[
                "Re-score Dream 100 account classes",
                "Double down on the highest-converting vertical motion",
                "Refactor page stack around new proof and search behaviour",
                "Use wins to widen the authority footprint",
              ]}
            />
          </StrategyCard>
        </div>
      </StrategySectionShell>

      <StrategyCTA
        eyebrow="Strategy call"
        title="If you want, we can turn XoomAI into the obvious AI employee choice for the right accounts."
        body="The next move is not another generic AI services page. It is a targeted Dream 100 demand system anchored in XoomAgent™, vertical pages, bottom-of-funnel search capture, and operator-level trust."
        ctaLabel="Book Strategy Call"
      />

      <StrategySectionLead className="mt-16 md:mt-20">
        Supporting evidence appendix
      </StrategySectionLead>

      <div className="mt-6 space-y-6">
        <StrategyAppendixSection
          title="Observed page structure and offer packaging"
          description="Review of the current xoomai.com.au site and what it signals commercially today."
          defaultOpen
        >
          <DataTable
            headers={["Area", "Observed now", "Implication"]}
            rows={appendixRows}
          />
        </StrategyAppendixSection>

        <StrategyAppendixSection
          title="Commercial framing detected across the current site"
          description="These are the strongest commercial claims already present on the site and how they should be used in the next iteration."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <HighlightBox title="Strong claims worth keeping">
              <BulletList
                items={[
                  "Fully managed AI employee on dedicated hardware",
                  "24/7 enquiry handling and automation",
                  "Enterprise-grade security and compliance framing",
                  "Integration into CRM, email, calendar, and workflow systems",
                  "Less than half the cost of a hire",
                ]}
              />
            </HighlightBox>
            <HighlightBox title="Claims that need tighter packaging" tone="warning">
              <BulletList
                items={[
                  "100+ AI solutions deployed",
                  "50% average efficiency increase",
                  "98% client satisfaction rate",
                  "General AI strategy and analytics breadth",
                ]}
              />
            </HighlightBox>
          </div>
        </StrategyAppendixSection>

        <StrategyAppendixSection
          title="Recommended first page cluster"
          description="Suggested first pages to align search capture with Dream 100 outbound motion."
        >
          <BulletList
            items={[
              "AI employee for law firms",
              "AI receptionist for clinics",
              "AI automation for accounting firms",
              "AI workflow automation for property managers",
              "AI employee vs hiring admin staff",
              "Managed AI agent vs chatbot",
              "AI enquiry handling for Australian service businesses",
            ]}
          />
        </StrategyAppendixSection>
      </div>
    </StrategyPageFrame>
  );
}

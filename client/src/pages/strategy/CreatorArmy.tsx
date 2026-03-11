import { useEffect, type ReactNode } from "react";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers3,
  LineChart,
  Link2,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
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
  StrategyCard,
  StrategyCTA,
  StrategyEyebrow,
  StrategyHero,
  StrategyPageFrame,
  StrategySectionLead,
  StrategySectionShell,
} from "@/components/strategy";

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <StrategyCard className="rounded-[28px]" glow="mixed">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{label}</div>
      <div className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-display font-extrabold leading-[0.95] tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 text-sm leading-7 text-white/66">{note}</p>
    </StrategyCard>
  );
}

function ActionCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <StrategyCard className="rounded-[28px]" glow="blue">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] font-mono text-sm font-bold tracking-[0.18em] text-[#f4e4cd]">
          {number}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Immediate action</div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
    </StrategyCard>
  );
}

function NarrativeCard({
  icon,
  eyebrow,
  title,
  body,
  bullets,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
}) {
  return (
    <StrategyCard className="rounded-[28px]" glow="mixed">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 text-[#f4e4cd]">
          {icon}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">{eyebrow}</div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
      {bullets?.length ? <div className="mt-4"><BulletList items={bullets} /></div> : null}
    </StrategyCard>
  );
}

function ScopeBlock({
  label,
  title,
  body,
  items,
}: {
  label: string;
  title: string;
  body: string;
  items: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-md">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))]" />
      <div className="relative p-5 md:p-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{label}</div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/66">{body}</p>
        <div className="mt-5">
          <BulletList items={items} />
        </div>
      </div>
    </div>
  );
}

function PromptCard({
  prompt,
  issue,
  today,
  nextMove,
}: {
  prompt: string;
  issue: string;
  today: string;
  nextMove: string;
}) {
  return (
    <StrategyCard className="rounded-[28px]" glow="amber">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Priority buying prompt</div>
      <h3 className="mt-3 text-lg font-semibold text-white">{prompt}</h3>
      <div className="mt-4 space-y-3">
        <div className="rounded-[18px] border border-white/8 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">Current issue</div>
          <p className="mt-2 text-sm leading-6 text-white/72">{issue}</p>
        </div>
        <div className="rounded-[18px] border border-white/8 bg-black/20 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">What the public site says today</div>
          <p className="mt-2 text-sm leading-6 text-white/72">{today}</p>
        </div>
        <div className="rounded-[18px] border border-[#f4e4cd]/15 bg-[#f4e4cd]/8 p-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">What must change</div>
          <p className="mt-2 text-sm leading-6 text-white">{nextMove}</p>
        </div>
      </div>
    </StrategyCard>
  );
}

const heroMetrics = [
  {
    label: "Founder proof",
    value: "$600M",
    note:
      "Simon Beard's Culture Kings exit gives Creator Army immediate commercial credibility that most agencies and creator-education brands cannot match.",
  },
  {
    label: "Content proof",
    value: "500M+",
    note:
      "The brand already leads with large-view credibility and operator proof, which is useful if the site learns how to connect that proof to buyer-intent search demand.",
  },
  {
    label: "Creator supply",
    value: "100+",
    note:
      "Creator Army already signals a certified creator network, which supports the story for both enterprise delivery capacity and creator-side conversion.",
  },
  {
    label: "Commercial split",
    value: "2 motions",
    note:
      "The business has one higher-value enterprise acquisition motion and one creator acquisition motion. Search strategy has to separate them instead of blending both into one vague story.",
  },
];

const observedStrengths = [
  {
    title: "Strong founder-led proof",
    body:
      "Creator Army has real authority signals: Simon Beard's operator story, Culture Kings lineage, view-count proof, and a high-conviction performance angle.",
  },
  {
    title: "A clear enterprise thesis exists",
    body:
      "The homepage already states the enterprise promise clearly: build the content-to-conversion pipeline, align to CPA outcomes, and replace generic retainers with a more performance-oriented model.",
  },
  {
    title: "The creator supply motion is already productized",
    body:
      "Bootcamp, UGC course, AI course, certification, and marketplace access give Creator Army a tangible creator-side offer rather than a vague community play.",
  },
];

const observedGaps = [
  {
    title: "Enterprise search intent is under-served",
    body:
      "Public pages are much stronger at course conversion and brand-story persuasion than at capturing buyer-intent enterprise searches like UGC agency, performance creative agency, or paid social creative partner.",
  },
  {
    title: "The two business motions are blurred",
    body:
      "Search engines and answer layers currently get one blended brand story instead of a clean separation between enterprise acquisition pages and creator acquisition pages.",
  },
  {
    title: "Public category language is too broad",
    body:
      "Terms like creator platform, marketplace, and content creator can attract traffic, but they do not map tightly enough to the highest-value commercial searches the business should own first.",
  },
];

const priorityPrompts = [
  {
    prompt: "best ugc agency for ecommerce brands",
    issue: "This is a high-value buying question, but Creator Army does not currently present a dedicated enterprise page built to win it.",
    today:
      "The public site talks about a marketing machine and performance model, but not with enough page-level specificity to become the obvious answer for this query.",
    nextMove:
      "Build a dedicated enterprise page around UGC-for-performance positioning, ecommerce fit, creator supply quality, paid media integration, and outcome alignment.",
  },
  {
    prompt: "performance creative agency",
    issue: "This is closer to how enterprise buyers may classify Creator Army's actual offer than generic creator-platform language.",
    today:
      "The site has the ingredients for this story — creators, testing, media buying, CRO, performance model — but they are not assembled into a dedicated search destination.",
    nextMove:
      "Create a decision page that frames Creator Army as a performance creative engine for scaling brands, not just a network or training business.",
  },
  {
    prompt: "ugc creator course with brand deals",
    issue: "Creator Army is much closer to winning this family of queries because the offer is already explicit, productized, and tied to certification and marketplace access.",
    today:
      "The UGC, AI, and bootcamp pages already communicate a clear creator outcome: get skilled, get certified, get listed, get paid.",
    nextMove:
      "Keep this as the secondary SEO motion and build clearer page families around certification, brand-deal outcomes, and full-stack creator training.",
  },
];

const rollout = [
  {
    label: "Month 1",
    title: "Separate the two search businesses",
    body:
      "The first move is structural clarity. Creator Army needs one enterprise search layer and one creator search layer so Google and answer engines stop collapsing the business into generic creator-platform language.",
    bullets: [
      "Define enterprise priority buying queries and creator priority conversion queries separately",
      "Rewrite homepage messaging so enterprise commercial intent is more explicit without losing the creator flywheel",
      "Launch the first enterprise money page instead of relying on the homepage to do every job at once",
    ],
  },
  {
    label: "Month 2",
    title: "Ship the first bottom-of-funnel enterprise pages",
    body:
      "Once the structure is clear, Creator Army should open with pages that map directly to hiring intent from scaling ecommerce and paid-media buyers.",
    bullets: [
      "Build enterprise pages for UGC agency, performance creative agency, and creator-led marketing agency use cases",
      "Launch the first comparison and alternative pages where buyers are deciding between agencies, in-house teams, and UGC platforms",
      "Align proof, founder credibility, and case-style evidence to those pages rather than leaving them as broad homepage claims",
    ],
  },
  {
    label: "Month 3",
    title: "Reinforce the first winners with creator-side support and proof",
    body:
      "At this point the program should widen carefully. Enterprise pages stay the priority, but creator-side pages can support brand breadth and creator supply acquisition in parallel.",
    bullets: [
      "Expand into creator certification, UGC training, and AI course pages tied to clear commercial outcomes",
      "Publish founder-led evidence and proof assets that support enterprise buyer trust",
      "Start routing internal links and authority toward the first enterprise pages that show traction",
    ],
  },
  {
    label: "Months 4–6",
    title: "Compound authority and widen the search footprint",
    body:
      "By this stage the system shifts from first-launch pages into a true market-capture program: more coverage, more external proof, stronger answer-surface visibility, and refresh loops around what starts to work.",
    bullets: [
      "Expand enterprise coverage around ecommerce, paid social, creator-led growth, and conversion content",
      "Build review, editorial, community, and backlink reinforcement around the winning enterprise pages",
      "Refresh creator conversion pages and course pages using real demand language and creator-outcome proof",
    ],
  },
];

export default function StrategyCreatorArmy() {
  useEffect(() => {
    document.title = "Creator Army Strategy | Memetik";
    window.scrollTo(0, 0);
  }, []);

  return (
    <StrategyPageFrame mainClassName="mx-auto max-w-6xl">
      <Nav />

      <StrategyHero
        eyebrow="Founder strategy memo"
        title="Creator Army can own creator-led acquisition"
        subtitle="The opening move is not to chase broad creator traffic. It is to separate the business into two search motions, win enterprise buyer-intent pages first, and then use the creator training layer as the second engine rather than the main commercial story."
        tags={["creatorarmy.com", "Enterprise growth", "Creator marketplace", "Performance model"]}
      >
        <div className="max-w-4xl space-y-4">
          <div className="mb-2">
            <StrategyEyebrow>Executive Summary</StrategyEyebrow>
          </div>

          <HighlightBox>
            <div className="max-w-3xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">Founder read</div>
              <p className="mt-3 text-2xl font-display font-semibold tracking-tight text-white md:text-3xl">
                Creator Army already has enough proof to win a defined slice of enterprise demand. What is missing is not credibility. It is page-level commercial focus.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/66">
                Right now the public site blends enterprise growth, creator education, marketplace access, and founder story into one brand narrative. That is persuasive for a human visitor, but weaker for search and answer engines. The fix is to lead with enterprise buying pages first, then let the creator-side system compound behind them.
              </p>
            </div>
          </HighlightBox>

          <div className="space-y-4">
            {heroMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>

          <div className="pt-3">
            <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/46">Immediate actions</div>
            <div className="space-y-4">
              <ActionCard
                number="01"
                title="Open with enterprise money pages, not generic brand pages"
                body="Creator Army should first own the buyer-intent searches that map directly to enterprise revenue: UGC agency, performance creative agency, creator-led marketing partner, and adjacent decision queries for scaling ecommerce brands."
              />
              <ActionCard
                number="02"
                title="Split enterprise acquisition from creator acquisition"
                body="The site currently blends both motions. Search strategy should not. Enterprise pages need their own commercial language, proof stack, and conversion path. Creator pages should remain a second funnel with its own certification and marketplace narrative."
              />
              <ActionCard
                number="03"
                title="Filter keywords by revenue fit, not by volume"
                body="Broad creator or generic marketing terms may generate traffic, but they are weaker targets than high-intent enterprise terms. The right keyword map is narrower, more commercial, and much more aligned with what Creator Army actually sells."
              />
            </div>
          </div>
        </div>
      </StrategyHero>

      <div className="space-y-10 md:space-y-12">
        <StrategySectionShell>
          <SectionHeader number="01" title="State of Search 2026" />
          <StrategySectionLead
            takeaway="Google still captures commercial discovery, but answer engines increasingly shape who enters buying consideration before a sales conversation ever starts."
            body="That matters for Creator Army because the business serves both enterprise buyers and creators, and both audiences now move across classic search, social proof, and AI-guided comparison before they convert. The market story must therefore be specific enough for machines to classify and repeat correctly, not just inspiring enough for a homepage visitor."
            implication="The brand that wins is not the brand with the broadest story. It is the brand with the clearest commercial destinations for the right buying queries."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Search className="h-5 w-5" />}
              eyebrow="Commercial reality"
              title="Enterprise buyers search in narrow, decision-stage language"
              body="Brands do not only search for creator economy stories. They search for agencies, creative systems, paid social partners, performance content, and specific execution models tied to revenue outcomes."
            />
            <NarrativeCard
              icon={<Bot className="h-5 w-5" />}
              eyebrow="Answer-surface reality"
              title="Machines reward clearer classification than homepages usually provide"
              body="When the site blends marketplace, course, agency, and founder-story language together, answer engines have less confidence about what Creator Army should be recommended for."
            />
            <NarrativeCard
              icon={<Briefcase className="h-5 w-5" />}
              eyebrow="Strategic implication"
              title="Enterprise-side search deserves the first move"
              body="Enterprise acquisition terms are closer to revenue, easier to justify commercially, and more aligned with the unique performance-led offer than broad creator terms or vague creator-economy positioning."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="02" title="Where Creator Army Is Today" />
          <StrategySectionLead
            takeaway="Creator Army already has real commercial proof, but its public search footprint is stronger on brand persuasion than on category capture."
            body="The site clearly communicates founder pedigree, creator supply, certification, and marketplace access. What it does not yet do well enough is map that proof into specific enterprise buyer-intent pages that can win search and answer-surface consideration for high-value commercial queries."
            implication="This is a packaging and search-architecture gap, not a credibility gap."
          />

          <div className="space-y-4">
            {observedStrengths.map((item) => (
              <NarrativeCard
                key={item.title}
                icon={<ShieldCheck className="h-5 w-5" />}
                eyebrow="What is working"
                title={item.title}
                body={item.body}
              />
            ))}
            {observedGaps.map((item) => (
              <NarrativeCard
                key={item.title}
                icon={<Target className="h-5 w-5" />}
                eyebrow="What is missing"
                title={item.title}
                body={item.body}
              />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="03" title="Opportunity / Right to Win" />
          <StrategySectionLead
            takeaway="Creator Army can win by owning the creator-led performance acquisition conversation before broadening into the wider creator-marketplace story."
            body="The strongest opening move is not to compete for the broadest creator traffic. It is to become the most believable answer for enterprise buyers who want creator-made performance content, landing pages, media buying, testing, and outcome alignment in one system."
            implication="The site should first win the pages that map to enterprise spend, then widen into creator acquisition and category-shaping content once the first commercial layer is established."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<LineChart className="h-5 w-5" />}
              eyebrow="Priority one"
              title="Own enterprise acquisition language"
              body="Queries like UGC agency, UGC ads agency, performance creative agency, paid social creative agency, and creator-led marketing agency are closer to how buyers may classify Creator Army's actual service than broad creator-platform language."
              bullets={[
                "Maps directly to enterprise revenue",
                "Fits the actual delivery model on the homepage",
                "Creates clearer answer-surface classification",
              ]}
            />
            <NarrativeCard
              icon={<Compass className="h-5 w-5" />}
              eyebrow="Priority two"
              title="Keep creator education as the second funnel"
              body="Creator Army already has credible creator-side pages. Those should support supply acquisition and brand breadth, but they should not dominate the enterprise narrative or force the homepage to do every job at once."
              bullets={[
                "Bootcamp, UGC, and AI course pages stay relevant",
                "Certification and marketplace access remain strong creator conversion hooks",
                "Secondary motion should reinforce, not blur, enterprise positioning",
              ]}
            />
            <NarrativeCard
              icon={<Sparkles className="h-5 w-5" />}
              eyebrow="Priority three"
              title="Create a category story around creator-led acquisition"
              body="Once the enterprise pages are live, Creator Army can widen into thought-leadership around creator-led growth, performance content systems, and full-stack creator operations. That is the scale layer, not the opening move."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="04" title="Competitive Gap" />
          <StrategySectionLead
            takeaway="Creator Army is competing across three different search classes, and each class needs a different answer."
            body="The public search landscape is fragmented. Enterprise buyers will often encounter UGC agencies, DTC performance agencies, and paid social creative partners. Creators will encounter generic course platforms, standalone UGC educators, and brand-deal advice products. Creator Army needs to beat each class differently."
            implication="The search strategy should not ask one page to beat all three classes at once."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Briefcase className="h-5 w-5" />}
              eyebrow="Enterprise competitors"
              title="UGC agencies and performance agencies already own more obvious buying language"
              body="Public search results already surface agency roundups and paid-performance operators in the spaces Creator Army should care about. That means enterprise pages have to be explicit and comparison-ready rather than generic.
"
              bullets={[
                "Agency roundups and review pages define the commercial shortlist",
                "Performance marketing agencies own broad DTC language",
                "Creator Army needs a sharper service-page layer to enter those comparisons",
              ]}
            />
            <NarrativeCard
              icon={<GraduationCap className="h-5 w-5" />}
              eyebrow="Creator competitors"
              title="Generic UGC courses compete on accessibility, not on operator credibility"
              body="Udemy-style courses and standalone UGC educators can win beginner demand, but they are weaker on real marketplace access, founder proof, and commercial outcomes. That is where Creator Army can position differently."
              bullets={[
                "Compete on certification + marketplace + operator proof",
                "Avoid sounding like another generic beginner course",
                "Emphasize full-stack, commercial, and brand-linked outcomes",
              ]}
            />
            <NarrativeCard
              icon={<Layers3 className="h-5 w-5" />}
              eyebrow="Internal competitive risk"
              title="The current site lets the creator-side story overshadow the higher-value enterprise motion"
              body="The creator offer is already productized and easy to understand. The enterprise offer is commercially stronger, but its search destinations are underbuilt. That imbalance is the biggest internal strategic gap right now."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="05" title="AI Visibility / Answer-Surface Gap" />
          <StrategySectionLead
            takeaway="The current public site gives machines more evidence for creator education than for enterprise acquisition."
            body="This is the key answer-surface issue. If a machine is trying to classify Creator Army from the current public pages, it can more easily infer course, creator marketplace, and training language than the higher-value enterprise acquisition model."
            implication="That means the enterprise story needs its own explicit pages, proof structures, and query coverage before Creator Army becomes a repeatable recommendation for enterprise buyers."
          />

          <div className="space-y-4">
            {priorityPrompts.map((item) => (
              <PromptCard key={item.prompt} {...item} />
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="06" title="6-Month Growth Plan" />
          <StrategySectionLead
            takeaway="The first six months should separate the business, open enterprise money pages, and then widen with creator-side support and off-site proof."
            body="This sequence is built around revenue alignment. Enterprise-side decision pages come first. Creator-side expansion follows as a second growth motion."
            implication="If Creator Army tries to scale both directions equally from day one, the commercial story will stay too blurred."
          />

          <div className="space-y-4">
            {rollout.map((phase) => (
              <StrategyCard key={phase.label} className="rounded-[30px]" glow="mixed">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#f4e4cd]">{phase.label}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{phase.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{phase.body}</p>
                <div className="mt-5">
                  <BulletList items={phase.bullets} />
                </div>
              </StrategyCard>
            ))}
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="07" title="Off-site Authority" />
          <StrategySectionLead
            takeaway="Creator Army will not become a default recommendation through owned pages alone."
            body="Enterprise buyers and creators both pressure-test the market through reviews, roundups, founder content, communities, creator proof, and editorial mentions. That external layer needs to reinforce the same search story as the owned pages."
            implication="Off-site authority should be treated as core scope, not as a later amplification layer."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Star className="h-5 w-5" />}
              eyebrow="Founder proof"
              title="Use Simon Beard as commercial trust infrastructure"
              body="The founder story is a differentiator, but it should reinforce enterprise decision pages and creator conversion pages directly rather than living mostly as ambient brand credibility."
            />
            <NarrativeCard
              icon={<MessageSquare className="h-5 w-5" />}
              eyebrow="Community"
              title="Creator and ecommerce communities help validate the category claim"
              body="Creator Army should show up in the places where DTC operators, paid social teams, and creators discuss what actually performs, not only on controlled owned media."
            />
            <NarrativeCard
              icon={<Link2 className="h-5 w-5" />}
              eyebrow="Editorial + backlinks"
              title="Authority should route into enterprise money pages first"
              body="Backlinks, roundups, founder commentary, and editorial mentions should reinforce the enterprise pages that shape buyer consideration instead of dispersing authority across broad brand pages."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="08" title="What Memetik Actually Builds and Ships" />
          <StrategySectionLead
            takeaway="This is not a broad content-retainer pitch. It is a search and answer-surface packaging system built around business relevance."
            body="Memetik would build the category architecture, the first buyer-intent pages, the creator-side conversion support pages, the authority layer, and the refresh model that keeps Creator Army's first wins from decaying."
            implication="The core rule is simple: only build pages that match what Creator Army actually wants to rank for and what the business is capable of winning commercially."
          />

          <div className="space-y-4">
            <ScopeBlock
              label="Scope lane 01"
              title="Priority buying-query mapping"
              body="Before production scales, Memetik maps the exact enterprise and creator queries worth pursuing. This prevents broad keyword chasing and keeps execution tied to revenue or supply quality."
              items={[
                "Separate enterprise acquisition from creator acquisition",
                "Score keywords by offer fit, buyer intent, revenue alignment, and message fit",
                "Reject broad terms that dilute the commercial story",
              ]}
            />
            <ScopeBlock
              label="Scope lane 02"
              title="Bottom-of-funnel enterprise pages"
              body="Enterprise pages come first because they are the highest-value motion. The first layer should target the terms that most clearly map to what Creator Army sells to brands."
              items={[
                "UGC agency and UGC ads agency pages",
                "Performance creative agency and paid social creative pages",
                "Creator-led marketing and ecommerce growth pages",
              ]}
            />
            <ScopeBlock
              label="Scope lane 03"
              title="Comparison and alternative pages"
              body="Creator Army also needs pages that intercept buyers comparing agencies, in-house options, creator platforms, and execution models. This is where a lot of shortlist formation happens."
              items={[
                "Agency vs in-house creative team pages",
                "UGC platform vs performance partner pages",
                "Best-fit and alternative pages tied to ecommerce and paid social use cases",
              ]}
            />
            <ScopeBlock
              label="Scope lane 04"
              title="Creator conversion pages"
              body="Once the enterprise layer is explicit, Memetik expands the creator-side system around certification, UGC, AI training, and full-stack creator outcomes."
              items={[
                "UGC creator course and certification pages",
                "AI content creator and full-stack creator pages",
                "Brand-deal and creator marketplace outcome pages",
              ]}
            />
            <ScopeBlock
              label="Scope lane 05"
              title="Off-site authority and trust reinforcement"
              body="Memetik makes sure that founder proof, creator proof, editorial mentions, and community signals reinforce the same enterprise and creator narratives the site is trying to win."
              items={[
                "Founder-led authority content",
                "Roundups, creator-community, and ecommerce-community placements",
                "Backlink and editorial reinforcement into money pages",
              ]}
            />
            <ScopeBlock
              label="Scope lane 06"
              title="Infrastructure, refresh, and defense"
              body="Pages and authority only matter if the site stays crawlable, coherent, and actively maintained. Memetik keeps the infrastructure and refresh model visible so the first search wins compound instead of fading."
              items={[
                "Internal linking, schema, and crawl/index hygiene",
                "Monthly refresh of pages that start to win",
                "Reallocation based on traction across enterprise and creator funnels",
              ]}
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="09" title="Operating Model" />
          <StrategySectionLead
            takeaway="Creator Army needs monthly concurrent workstreams, not isolated publishing sprints."
            body="Each month should run the same core motions together: research, page production, publishing, off-site reinforcement, and review of what is gaining traction. The difference is that enterprise pages get the first allocation of force."
            implication="That is how the search system becomes commercial infrastructure instead of a content backlog."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Workflow className="h-5 w-5" />}
              eyebrow="Monthly rhythm"
              title="Enterprise pages first, creator support second"
              body="The monthly system should prioritize enterprise money pages, but always maintain enough creator-side support to keep the supply and certification flywheel healthy."
            />
            <NarrativeCard
              icon={<LineChart className="h-5 w-5" />}
              eyebrow="Measurement"
              title="Judge the program by relevance and traction, not raw traffic alone"
              body="The right KPI is not just visits. It is whether Creator Army becomes more visible for the specific queries that align with enterprise revenue and creator acquisition quality."
            />
            <NarrativeCard
              icon={<Compass className="h-5 w-5" />}
              eyebrow="Quarterly review"
              title="Refresh the winners and widen only when the first pages are working"
              body="The system should reinforce the enterprise pages that start showing traction, then widen into supporting creator and category pages without losing the core commercial story."
            />
          </div>
        </StrategySectionShell>

        <StrategySectionShell>
          <SectionHeader number="10" title="Why Memetik" />
          <StrategySectionLead
            takeaway="Memetik is useful here because the problem is not keyword collection. It is commercial packaging."
            body="Most SEO programs would either chase broad creator traffic or build generic marketing-agency pages without respecting the business model. Memetik's advantage is the discipline to only target terms Creator Army should actually care about and to translate that into a coherent founder-facing search system."
            implication="For Creator Army, that means one partner shaping the enterprise motion, the creator motion, the answer-surface story, and the authority layer as one commercial system."
          />

          <div className="space-y-4">
            <NarrativeCard
              icon={<Target className="h-5 w-5" />}
              eyebrow="Commercial focus"
              title="The work begins with revenue-aligned keyword selection"
              body="Memetik starts by filtering out broad, noisy, or off-message keywords and forces the program toward terms that match offer fit and buyer intent."
            />
            <NarrativeCard
              icon={<Layers3 className="h-5 w-5" />}
              eyebrow="Integrated execution"
              title="Owned pages, off-site proof, and answer-surface clarity stay connected"
              body="Creator Army does not need disconnected tactics. It needs the same market story to appear consistently across service pages, course pages, founder proof, external mentions, and machine-readable structure."
            />
            <NarrativeCard
              icon={<Bot className="h-5 w-5" />}
              eyebrow="Longer-term moat"
              title="Memetik builds default recommendation potential, not just rankings"
              body="The point is to make Creator Army easier to recommend, easier to shortlist, and harder to misclassify as the market moves further into blended search and AI-assisted buying behavior."
            />
          </div>
        </StrategySectionShell>

        <StrategyCTA
          eyebrow="Book a Strategy Call"
          title="Turn Creator Army into a commercial search category, not just a brand story"
          body="If you want Creator Army to win the right enterprise buying terms first, then compound that visibility with creator acquisition and stronger answer-surface classification, Memetik can map the opening move and build the first layer properly."
          href="https://cal.com/memetik/letstalk"
          ctaLabel="Book a Strategy Call"
        />

        <div className="mt-16 md:mt-20">
          <SectionHeader number="11" title="Supporting Evidence Appendix" />
          <StrategySectionLead
            takeaway="The main narrative is intentionally concise. The appendix below shows the observed page evidence, the keyword decisions, and the public-safe market framing behind the recommendation."
            body="Source trace: derived from live review of creatorarmy.com homepage, bootcamp page, UGC course page, AI course page, and public search-result review checked on 2026-03-11."
          />

          <div className="space-y-4">
            <StrategyAppendixSection
              title="Observed site evidence"
              description="Public-facing claims and structures that support the strategy recommendation."
              defaultOpen
            >
              <DataTable
                headers={["Page", "Observed signal", "Why it matters"]}
                rows={[
                  [
                    "Homepage",
                    "Performance-led promise, enterprise + creator split, $100K+/mo Meta-spend requirement, media buying + CRO + creators",
                    "Confirms enterprise motion is real and higher-value than generic creator-platform framing.",
                  ],
                  [
                    "Bootcamp",
                    "$499 bootcamp, certification, marketplace access, full-stack creator positioning",
                    "Confirms creator-side offer is already productized and conversion-ready.",
                  ],
                  [
                    "UGC course",
                    "1,000+ brands waitlisted, full-stack creator certification, remote UGC + AI + IRL tracks",
                    "Supports a differentiated creator-side conversion story centered on commercial outcomes.",
                  ],
                  [
                    "AI course",
                    "AI creator positioning, operator proof, marketplace access, commercial workflow framing",
                    "Extends creator-side value proposition beyond generic prompt training.",
                  ],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Priority keyword map"
              description="Keywords filtered by business relevance, not just by broad search popularity."
            >
              <DataTable
                headers={["Cluster", "Priority", "Audience", "Reason"]}
                rows={[
                  ["UGC agency / UGC ads agency", "Must target", "Enterprise", "Direct offer fit and close to revenue."],
                  ["Performance creative agency", "Must target", "Enterprise", "Better matches the actual delivery model than generic creator-platform language."],
                  ["Paid social creative agency", "Must target", "Enterprise", "Maps to media buying + creative testing + conversion outcomes."],
                  ["Creator-led marketing agency", "Must target", "Enterprise", "Strong category-creation bridge between creators and enterprise growth."],
                  ["UGC creator course / certification", "Should target", "Creators", "Clear second funnel with productized offer and marketplace access."],
                  ["AI content creator course", "Should target", "Creators", "Strong fit because the AI course is already explicit and commercial."],
                  ["Creator marketplace / creator platform", "Careful", "Mixed", "Relevant but too broad unless tightly framed."],
                  ["Content creator / creator economy / social media marketing", "Avoid / deprioritize", "Mixed", "Too broad, weak message fit, and likely low-quality traffic."],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="Recommended first page set"
              description="The first pages Memetik would ship because they are closest to enterprise revenue or creator conversion quality."
            >
              <DataTable
                headers={["Page type", "Example page", "Why first"]}
                rows={[
                  ["Enterprise money page", "UGC Agency for Ecommerce Brands", "Most direct bridge from search to enterprise demand."],
                  ["Enterprise money page", "Performance Creative Agency", "Best-fit category framing for the broader service stack."],
                  ["Enterprise money page", "Paid Social Creative Agency", "Ties creators, creative testing, media buying, and outcomes together."],
                  ["Comparison page", "UGC Agency vs In-House Creative Team", "Intercepts shortlist and budget-decision research."],
                  ["Comparison page", "UGC Platform vs Performance Partner", "Helps distinguish Creator Army from generic platforms."],
                  ["Creator conversion page", "UGC Creator Certification", "Captures creator-side demand with strong offer fit."],
                  ["Creator conversion page", "Full-Stack Content Creator Course", "Matches the program's strongest creator positioning."],
                  ["Creator conversion page", "AI Content Creator Course", "Maps directly to the existing AI course offer."],
                ]}
                highlightRow={0}
              />
            </StrategyAppendixSection>

            <StrategyAppendixSection
              title="What not to chase first"
              description="Public-safe deprioritization rules for Creator Army's search program."
            >
              <div className="space-y-4">
                <StrategyCard>
                  <BulletList
                    items={[
                      "Do not start with broad creator-economy vanity terms that do not map to an offer page.",
                      "Do not let creator-side education pages define the whole brand for enterprise buyers.",
                      "Do not treat generic marketing-agency language as automatically relevant; only keep what fits the actual service model.",
                      "Do not optimize for volume if the term pulls the wrong audience or weakens the positioning.",
                    ]}
                  />
                </StrategyCard>
              </div>
            </StrategyAppendixSection>
          </div>
        </div>
      </div>
    </StrategyPageFrame>
  );
}

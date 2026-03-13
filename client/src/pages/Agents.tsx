import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/Nav";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Minus,
  Plug,
  Plus,
  Rocket,
  Search,
  Shield,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
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

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const fadeInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const services = [
  {
    id: "01",
    title: "AI AGENTS",
    subtitle: "Deploy Digital Workers That Think",
    description:
      "Custom AI agents that handle repetitive knowledge work — support triage, data extraction, content ops, lead qualification. They run 24/7, never call in sick, and get smarter over time.",
    outcome: "Free your team from the tasks that burn hours but never make the shortlist for hiring",
    tags: ["SUPPORT", "LEAD QUALIFICATION", "DATA EXTRACTION"],
  },
  {
    id: "02",
    title: "WORKFLOW AUTOMATION",
    subtitle: "Zero-Touch Business Processes",
    description:
      "End-to-end process automation connecting your CRM, email, Slack, databases, and tools into flows that execute without human intervention. From lead to invoice, nothing falls through the cracks.",
    outcome: "Processes that ran on spreadsheets and Slack messages now run themselves",
    tags: ["CRM", "OPERATIONS", "ZERO-TOUCH"],
  },
  {
    id: "03",
    title: "INTEGRATION & ORCHESTRATION",
    subtitle: "Make Your Stack Work Together",
    description:
      "We wire AI into your existing tools — no rip-and-replace. n8n, Make, custom code, API glue. Your systems finally operate as one connected machine instead of a dozen disconnected tabs.",
    outcome: "Your tools finally talk to each other without a human in the middle",
    tags: ["API", "n8n", "CUSTOM CODE"],
  },
];

const phases = [
  {
    title: "OPERATIONS AUDIT",
    subtitle: "WEEK 1",
    icon: <Search className="w-12 h-12" />,
    description:
      "We map your team's manual processes, bottlenecks, and time-sinks. Every workflow gets scored by automation potential, ROI, and implementation complexity.",
    deliverables: [
      "Full process map",
      "ROI model per workflow",
      "Prioritised automation roadmap",
      "Quick-win identification",
    ],
    outcome: "Know exactly where time and money are being wasted on work AI should be doing.",
  },
  {
    title: "BUILD & SHIP",
    subtitle: "WEEK 2-4",
    icon: <Rocket className="w-12 h-12" />,
    description:
      "We design and deploy AI agents and automated workflows for your highest-impact processes. Working systems, not slide decks.",
    deliverables: [
      "Working automations in production",
      "AI agent configurations",
      "Integration connectors",
      "Testing and QA",
    ],
    outcome: "Live automations saving real hours within the first month.",
  },
  {
    title: "INTEGRATE & HARDEN",
    subtitle: "WEEK 3-6",
    icon: <Shield className="w-12 h-12" />,
    description:
      "We connect everything to your production stack, handle edge cases, build error recovery, and make the system robust enough to trust without supervision.",
    deliverables: [
      "Production deployment",
      "Monitoring and alerting",
      "Error handling and fallbacks",
      "Team documentation",
    ],
    outcome: "Systems you can trust to run without someone watching them.",
  },
  {
    title: "EVOLVE & EXPAND",
    subtitle: "MONTH 2+",
    icon: <Zap className="w-12 h-12" />,
    description:
      "We monitor performance, extend coverage, and build new agents as your needs grow. The system gets better every month, not worse.",
    deliverables: [
      "Monthly optimisation",
      "New workflow builds",
      "Usage analytics",
      "Expansion roadmap",
    ],
    outcome: "An automation layer that compounds in value instead of gathering dust.",
  },
];

const useCases = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "Lead Qualification + CRM Routing",
    description: "AI scores inbound leads, enriches contact data, and routes to the right rep — before anyone checks their inbox.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Proposal & SOW Generation",
    description: "Intake form submitted, proposal drafted, pricing pulled, and document sent for review — in minutes, not days.",
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Customer Onboarding",
    description: "Welcome emails, account setup, task assignments, and check-in sequences triggered automatically from a single signup event.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Invoice & Payment Follow-Up",
    description: "Overdue invoices get chased automatically with escalating reminders. No more awkward manual follow-ups.",
  },
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Support Ticket Triage",
    description: "AI reads every ticket, categorises urgency, drafts a response, and routes to the right person — or resolves it outright.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Weekly Reporting & KPI Dashboards",
    description: "Data pulled from 5 tools, formatted into a clean report, and dropped into Slack every Monday morning. Zero manual effort.",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "Document Extraction & Data Entry",
    description: "PDFs, contracts, and forms parsed by AI, key fields extracted, and records created in your database automatically.",
  },
  {
    icon: <Plug className="w-5 h-5" />,
    title: "Internal Knowledge Base Agent",
    description: "An AI agent that knows your SOPs, policies, and docs — and answers your team's questions instantly via Slack or chat.",
  },
];

const fitItems = [
  {
    main: "Team of 5-50 drowning in manual, repetitive operations",
    sub: "You know the work should be automated but nobody has time to build it.",
  },
  {
    main: "Clear processes that repeat daily or weekly",
    sub: "If a human follows the same steps every time, an agent can do it faster.",
  },
  {
    main: "Leadership that wants leverage, not more headcount",
    sub: "You want to scale output without scaling payroll.",
  },
  {
    main: "Existing tools that don't talk to each other",
    sub: "You have great software but spend hours moving data between them.",
  },
  {
    main: "Ready to invest in operational infrastructure",
    sub: "You see automation as a growth lever, not a cost centre.",
  },
];

const notFitItems = [
  {
    main: "Pre-revenue or still validating the business model",
    sub: "Automation works best when the process is proven and repeating.",
  },
  {
    main: "No defined processes to automate",
    sub: "We build systems around workflows that already exist, not ones that need inventing.",
  },
  {
    main: "Want a chatbot slapped on a website",
    sub: "We build operational infrastructure, not cosmetic features.",
  },
  {
    main: "Budget under $5K for the engagement",
    sub: "Meaningful automation requires proper scoping, building, and hardening.",
  },
];

const faqs = [
  {
    question: "What tools and platforms do you use?",
    answer:
      "We work with whatever fits the job — n8n, Make, custom Node.js, Python, OpenAI, Anthropic, and direct API integrations. We are not locked to one vendor. The architecture is chosen based on your stack, complexity, and long-term maintainability.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "The operations audit takes about a week. First working automations ship within 2-4 weeks. A full engagement with integration, hardening, and expansion typically runs 6-12 weeks depending on scope. Most clients see meaningful time savings within the first month.",
  },
  {
    question: "Do we need to change our existing tools?",
    answer:
      "No. We integrate with your current stack — CRM, email, project management, databases, whatever you already use. The goal is to make your existing tools work together, not replace them.",
  },
  {
    question: "What does it cost?",
    answer:
      "Engagements start at $8K for a focused automation build. Larger scopes with multiple workflows, AI agents, and ongoing maintenance typically run $12-25K/month. We price based on complexity and impact, not hours.",
  },
  {
    question: "Can you maintain the automations long-term?",
    answer:
      "Yes. Most clients stay on a monthly retainer for monitoring, maintenance, and expansion. Automations are not set-and-forget — they need tuning as your business evolves, and we handle that.",
  },
  {
    question: "What is the difference between this and hiring a developer?",
    answer:
      "A developer builds what you spec. We audit your operations, identify the highest-ROI automation targets, architect the solution, build it, and maintain it. You get a team that understands both the technology and the business logic — not just someone who writes code.",
  },
  {
    question: "Do you replace our team or work alongside them?",
    answer:
      "We work alongside your team. The goal is to free your people from repetitive work so they can focus on judgment, strategy, and relationships — the things humans are actually good at.",
  },
];

const stripItems = [
  "Lead Routing",
  "Document Processing",
  "Customer Onboarding",
  "Reporting & Alerts",
];

function IntelligenceStrip() {
  return (
    <section className="relative z-20 mt-3 px-4 sm:px-6 md:mt-4 md:px-12 mb-16 md:mb-24">
      <MarketingContainer>
        <MarketingSectionShell className="px-6 py-5 md:px-10 md:py-6">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white/72">
            {stripItems.map((item, index) => (
              <div key={item} className="flex items-center gap-3 md:gap-4">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
                  {item}
                </span>
                {index < stripItems.length - 1 && <span className="h-px w-6 bg-white/12" />}
              </div>
            ))}
          </div>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[88vh] w-full flex flex-col justify-center overflow-hidden text-foreground pt-16 md:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090c] via-[#060709] to-[#050608]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(91,123,255,0.14),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(230,165,97,0.1),transparent_18%)]" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[56rem] text-center">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 sm:inline-flex"
          >
            <span className="h-2 w-2 rounded-full bg-[#78f0c4] shadow-[0_0_16px_rgba(120,240,196,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
              AI Workflow Automation
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-[18ch] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-extrabold leading-[0.94] tracking-tight text-white mb-6"
          >
            Stop Hiring for Work{" "}
            <em
              className="inline text-[1.02em] font-medium italic tracking-[-0.02em] text-[#f4e4cd]"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              AI Should Be Doing.
            </em>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mx-auto max-w-2xl text-base leading-8 text-white/68 mb-12 md:text-lg"
          >
            We build custom AI agents and automated workflows that replace manual ops, eliminate
            bottlenecks, and run your business processes 24/7 — so your team can focus on work that
            actually moves the needle.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="mb-8 flex justify-center"
          >
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#090b0d] transition-opacity hover:opacity-90 shadow-[0_12px_40px_rgba(244,228,205,0.14)]"
            >
              Book an Automation Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            className="text-white/44"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]">
              Built for SaaS, professional services, e-commerce, and operations-heavy teams.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="text-foreground py-16 md:py-24 relative overflow-hidden">
      <MarketingContainer>
        <MarketingSectionShell className="px-4 py-10 sm:px-6 md:px-12 md:py-14">
          <MarketingSectionGlow className="-left-24 top-24 h-56 w-56" />
          <MarketingSectionGlow className="-right-16 bottom-0 h-52 w-52" tone="amber" />
          <div className="relative mb-12">
            <MarketingPill className="mb-6">What we build</MarketingPill>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
              Your Team Has Better Things to Do.
            </h2>
            <p className="text-base text-white/65 max-w-2xl">
              Every engagement is built around the workflows burning the most time and money.
              We automate them, integrate them, and hand back the hours.
            </p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
              >
                <MarketingCard className="group flex flex-col min-h-[460px] p-6 md:p-8 hover:border-white/15 transition-all duration-300">
                  <MarketingSectionGlow
                    tone={index === 1 ? "amber" : "blue"}
                    className="-right-16 -bottom-20 h-40 w-40"
                  />
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-white/35">{item.id}</span>
                  </div>
                  <h3 className="relative text-2xl sm:text-3xl md:text-[2rem] font-display font-bold tracking-tight leading-[0.95] text-white mb-2 break-words max-w-[12ch]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-lg sm:text-xl text-white mb-4">{item.subtitle}</p>
                  <p className="text-base leading-relaxed text-white/65 mb-6">{item.description}</p>
                  <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 mb-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mb-1">
                      What You Get
                    </div>
                    <p className="text-sm font-semibold text-white">{item.outcome}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-auto">
                    {item.tags.map((tag) => (
                      <div
                        key={tag}
                        className="border border-white/12 rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/65 bg-white/[0.02]"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </MarketingCard>
              </motion.div>
            ))}
          </div>
          <div className="relative mt-12 text-center">
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#090b0d] transition-opacity hover:opacity-90 shadow-[0_12px_40px_rgba(244,228,205,0.14)]"
            >
              See What We Can Automate for You
              <span>→</span>
            </a>
          </div>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

function Differentiation() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground relative overflow-hidden">
      <MarketingContainer>
        <MarketingSectionShell className="p-8 md:p-12">
          <MarketingSectionGlow className="left-[8%] top-20 h-48 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div {...fadeInView} transition={{ duration: 0.5, ease: "easeOut" }}>
              <MarketingPill className="mb-6">Why Memetik</MarketingPill>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-[0.9] mb-2 tracking-tight text-white">
                You Don't Need Another Tool. You Need the Workflows Built.
              </h2>
              <p className="font-sans text-lg sm:text-xl text-white/60 mb-6">
                Most teams know what should be automated. The problem is nobody has time to build it.
              </p>
              <p className="text-base leading-relaxed text-white/68">
                We come in, audit your operations, and ship working automations — not a proposal
                deck, not a 6-month discovery phase, not a SaaS subscription that covers 60% of
                what you need. Real systems, deployed into your stack, running in weeks.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <MarketingCard className="p-6 h-full">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 pb-2 border-b border-white/10">
                    The Old Way
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Hire another ops person to manage the spreadsheets",
                      "Spend 6 months building an internal tool",
                      "Buy a SaaS that does 60% of what you need",
                      "Let it stay manual because nobody owns it",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/40 line-through text-sm">
                        <X className="w-3 h-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </MarketingCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <MarketingCard className="p-6 bg-white/[0.08] text-white h-full">
                  <MarketingSectionGlow tone="amber" className="-right-14 top-0 h-36 w-36" />
                  <div className="relative font-mono text-[10px] uppercase tracking-widest text-white/55 mb-4 pb-2 border-b border-white/10">
                    The Memetik Way
                  </div>
                  <ul className="relative space-y-3">
                    {[
                      "Audit your workflows in 1 week",
                      "Ship working automations in 2-4 weeks",
                      "AI agents that learn and improve over time",
                      "We maintain and evolve the system with you",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white text-sm font-semibold">
                        <Check className="w-3 h-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </MarketingCard>
              </motion.div>
            </div>
          </div>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

function Methodology() {
  return (
    <section className="py-24 md:py-32 text-foreground px-4 md:px-0 relative overflow-hidden">
      <MarketingContainer>
        <MarketingSectionShell className="px-6 py-10 md:px-12 md:py-14">
          <MarketingSectionGlow className="left-[12%] top-28 h-56 w-56" />
          <MarketingSectionGlow className="right-[6%] top-40 h-48 w-48" tone="amber" />
          <div className="relative mb-16">
            <MarketingPill className="mb-6">The System</MarketingPill>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-4">
              From Audit to Autopilot in 6 Weeks
            </h2>
            <p className="text-base text-white/65 max-w-2xl mb-8">
              A four-phase system designed to find the highest-impact automation targets, build
              them fast, harden them for production, and expand over time.
            </p>
            <div className="h-px w-full bg-white/10 mb-12" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
              >
                <MarketingCard className="group flex flex-col justify-between min-h-[500px] p-8 md:p-12 transition-all duration-300">
                  <MarketingSectionGlow
                    tone={index % 2 === 0 ? "blue" : "amber"}
                    className="-right-12 bottom-0 h-40 w-40"
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <span className="bg-white text-[#070809] px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-widest">
                        {phase.subtitle}
                      </span>
                      <div className="text-white/20">{phase.icon}</div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-[0.9] tracking-tight text-white mb-8">
                      {phase.title}
                    </h3>
                    <div className="mt-auto relative z-10">
                      <div className="mb-6 border-l-2 border-[#f0be83] pl-6">
                        <p className="font-sans text-lg text-white/78 leading-tight">{phase.description}</p>
                      </div>
                      <div className="bg-black/20 border border-white/10 rounded p-3 mb-6">
                        <p className="font-mono text-xs text-white/55 uppercase mb-1">Expected Outcome</p>
                        <p className="text-sm font-semibold text-white">{phase.outcome}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 text-[10px] font-mono border border-white/12 rounded text-white/65 uppercase tracking-wider bg-white/[0.02]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </MarketingCard>
              </motion.div>
            ))}
          </div>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

function UseCases() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground relative overflow-hidden">
      <MarketingContainer>
        <MarketingSectionShell className="p-8 md:p-12">
          <MarketingSectionGlow className="-left-12 top-0 h-48 w-48" />
          <MarketingSectionGlow className="bottom-0 right-0 h-52 w-52" tone="amber" />
          <div className="relative mb-12">
            <MarketingPill className="mb-6">What we automate</MarketingPill>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
              Real Workflows. Real Results.
            </h2>
            <p className="text-base text-white/65 max-w-2xl">
              These are the automations we build most often. If your team is doing any of this
              manually, there is a faster way.
            </p>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((uc, index) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
              >
                <MarketingCard className="p-5 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-white/70 mb-4">
                    {uc.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-white mb-2">
                    {uc.title}
                  </h3>
                  <p className="font-mono text-xs leading-6 text-white/55">{uc.description}</p>
                </MarketingCard>
              </motion.div>
            ))}
          </div>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

function Qualification() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground relative overflow-hidden">
      <MarketingContainer>
        <MarketingSectionShell className="p-8 md:p-12">
          <MarketingSectionGlow className="right-[8%] top-24 h-52 w-52" />
          <MarketingPill className="mb-6">Who this is for</MarketingPill>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
            Built for Teams That Want Leverage, Not Headcount.
          </h2>
          <p className="text-base text-white/65 max-w-2xl mb-12">
            The best fits are companies with real workflows, real bottlenecks, and leadership that
            sees automation as a growth investment.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div {...fadeInView} transition={{ duration: 0.5, ease: "easeOut" }}>
              <MarketingCard className="p-6 md:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-accent text-xl">&#10003;</span>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                    You're a Great Fit If:
                  </h3>
                </div>
                <ul className="space-y-4">
                  {fitItems.map((item, i) => (
                    <motion.li
                      key={item.main}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-accent mt-1">&bull;</span>
                      <div>
                        <span className="text-sm font-semibold text-white">{item.main}</span>
                        <span className="text-sm text-white/60"> &mdash; {item.sub}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </MarketingCard>
            </motion.div>
            <motion.div
              {...fadeInView}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            >
              <MarketingCard className="p-6 md:p-8 bg-white/[0.03] h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-red-400 text-xl">&#10007;</span>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
                    Not a Fit If:
                  </h3>
                </div>
                <ul className="space-y-4">
                  {notFitItems.map((item, i) => (
                    <motion.li
                      key={item.main}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-red-400 mt-1">&bull;</span>
                      <div>
                        <span className="text-sm font-semibold text-white">{item.main}</span>
                        <span className="text-sm text-white/60"> &mdash; {item.sub}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </MarketingCard>
            </motion.div>
          </div>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

function CombinedOfferCTA() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground relative overflow-hidden">
      <MarketingSectionGlow className="left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2" />
      <MarketingContainer>
        <MarketingSectionShell className="p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 border border-white/15 rounded-full flex items-center justify-center bg-white/[0.04]">
            <Zap className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
            Get Found by AI. Then Let AI Run Your Business.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/68 mb-8 max-w-2xl mx-auto">
            Most clients come to us for AI search visibility. Then they see what we can automate.
            The brands winning right now are doing both — capturing demand and eliminating the
            operational drag that slows everything else down.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#090b0d] transition-opacity hover:opacity-90 shadow-[0_12px_40px_rgba(244,228,205,0.14)]"
            >
              See What We Can Automate for You
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/" className={marketingTheme.secondaryButton}>
              Explore AI search services
            </a>
          </div>
          <p className="text-xs text-white/42 max-w-xl mx-auto">
            Free 30-minute automation audit. We will show you exactly where time and money are
            being wasted on manual work — and what it would look like automated.
          </p>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 text-foreground relative overflow-hidden">
      <MarketingSectionGlow className="left-[10%] top-16 h-48 w-48" />
      <MarketingContainer>
        <MarketingSectionShell className="p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
              Questions We Get Asked
            </h2>
          </div>
          <div className="border-t border-white/10">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                className="border-b border-white/10 last:border-b-0"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-base font-semibold pr-8 text-white">{faq.question}</span>
                  <span className="flex-shrink-0 w-8 h-8 border border-white/15 bg-white/[0.03] rounded flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#090b0d] transition-colors">
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-base text-white/68 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-white/60 mb-4">Ready to see what we can automate?</p>
            <a
              href="https://cal.com/memetik/letstalk"
              className="inline-flex items-center gap-3 rounded border border-[#f4e4cd] bg-[#f4e4cd] px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#090b0d] transition-opacity hover:opacity-90 shadow-[0_12px_40px_rgba(244,228,205,0.14)]"
            >
              Book a Call — We'll Map It Out
            </a>
          </div>
        </MarketingSectionShell>
      </MarketingContainer>
    </section>
  );
}

export default function Agents() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "AI Agents & Workflow Automation | MEMETIK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "MEMETIK builds custom AI agents and automated workflows that replace manual ops, eliminate bottlenecks, and run your business processes 24/7. Automation audit included.",
      );
    }
  }, []);

  return (
    <MarketingPage>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <IntelligenceStrip />
        <ServicesGrid />
        <Differentiation />
        <Methodology />
        <UseCases />
        <Qualification />
        <CombinedOfferCTA />
        <FAQSection />
      </main>
      <MarketingFooter
        eyebrow="Ready to automate what's slowing you down?"
        title="Your team is spending hours on work AI can do in seconds."
        description="We will audit your operations, show you exactly where automation creates the most leverage, and build the systems to make it happen."
        ctaHref="https://cal.com/memetik/letstalk"
        ctaLabel="Book your automation audit"
        note="Free 30-min audit · Clear ROI model · No obligation"
      />
    </MarketingPage>
  );
}

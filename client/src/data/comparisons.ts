export interface Comparison {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  headline: string;
  subhead: string;
  description: string;
  themLabel: string;
  usLabel: string;
  rows: { category: string; them: string; us: string }[];
  bottomLine: string;
  faqs: { q: string; a: string }[];
}

export const comparisons: Record<string, Comparison> = {
  "manual-seo": {
    slug: "manual-seo",
    title: "Memetik vs DIY AEO",
    metaTitle: "Memetik vs DIY AEO: Why In-House Fails | MEMETIK",
    metaDescription:
      "Thinking about doing AEO in-house? Here's what it actually takes vs what Memetik delivers in 90 days.",
    badge: "Memetik vs DIY",
    headline: "DIY AEO sounds\ngreat in theory.",
    subhead: "Here's why it fails in practice.",
    description:
      "You could hire a team, buy the tools, and figure out AEO from scratch. Or you could be live in 2 weeks with a team that's already cracked the code. Here's the honest comparison.",
    themLabel: "DIY / In-House",
    usLabel: "With Memetik",
    rows: [
      {
        category: "Time to first results",
        them: "6-12 months (learning curve + experimentation)",
        us: "30-45 days (proven methodology)",
      },
      {
        category: "Cost (first year)",
        them: "$150-250K (salary + tools + opportunity cost)",
        us: "$84-180K (retainer, fully managed)",
      },
      {
        category: "AI citation tracking",
        them: "Manual, inconsistent, no benchmarks",
        us: "Automated monitoring across ChatGPT, Perplexity, Gemini",
      },
      {
        category: "Methodology",
        them: "Trial and error -- no playbook exists yet",
        us: "Battle-tested across 50+ brands",
      },
      {
        category: "Risk",
        them: "High -- no guarantee it works",
        us: "90-day money-back guarantee",
      },
      {
        category: "Opportunity cost",
        them: "Your team diverted from core marketing",
        us: "Your team stays focused, we handle AEO",
      },
    ],
    bottomLine:
      "DIY AEO makes sense if you have 12+ months to experiment and a dedicated team. For everyone else, the 90-day head start with Memetik pays for itself with the first AI-driven deal.",
    faqs: [
      {
        q: "Can we eventually bring AEO in-house?",
        a: "Absolutely. Many clients start with us to get results fast, then we train their team to maintain and expand. Our 6-month engagement is designed with handoff in mind.",
      },
      {
        q: "What tools would we need for DIY AEO?",
        a: "There are no mature AEO tools yet. You'd need to build custom monitoring, manually query AI engines, and develop scoring frameworks from scratch. That's exactly what we've already built.",
      },
      {
        q: "Is $7K/month really cheaper than hiring someone?",
        a: "A junior SEO hire costs $60-80K/year, won't have AEO expertise, and needs 6+ months to ramp. Our Foundation tier is $84K/year with a team of AEO specialists delivering from day one.",
      },
    ],
  },

  "traditional-seo-agencies": {
    slug: "traditional-seo-agencies",
    title: "Memetik vs SEO Agencies",
    metaTitle: "AEO Agency vs Traditional SEO Agency | MEMETIK",
    metaDescription:
      "Your SEO agency doesn't measure AI citations. Here's why AEO requires a fundamentally different approach.",
    badge: "Memetik vs SEO Agencies",
    headline: "Your SEO agency\ncan't do this.",
    subhead: "Different problem. Different solution.",
    description:
      "SEO agencies optimize for Google rankings. We optimize for AI recommendations. These are fundamentally different algorithms, different content formats, and different success metrics. Your SEO agency is great at what they do -- they just can't do what we do.",
    themLabel: "Traditional SEO Agency",
    usLabel: "Memetik (AEO)",
    rows: [
      {
        category: "Optimizes for",
        them: "Google search rankings (links, keywords, technical SEO)",
        us: "AI recommendations (ChatGPT, Perplexity, Gemini citations)",
      },
      {
        category: "Success metric",
        them: "Keyword rankings, organic traffic, backlinks",
        us: "AI citation count, recommendation position, category share",
      },
      {
        category: "Content approach",
        them: "Long-form blog posts optimized for keywords",
        us: "Structured, citable content optimized for LLM consumption",
      },
      {
        category: "Tracking",
        them: "Google Search Console, Ahrefs, SEMrush",
        us: "AI citation monitoring across all major LLMs",
      },
      {
        category: "Time horizon",
        them: "3-6 months for ranking improvements",
        us: "30-90 days for AI citation improvements",
      },
      {
        category: "The gap",
        them: "No AI search expertise, no citation tracking",
        us: "Purpose-built for the AI search era",
      },
    ],
    bottomLine:
      "Keep your SEO agency for Google. Add Memetik for AI. The two channels are complementary, not competitive. But only one of them is growing 10x year-over-year.",
    faqs: [
      {
        q: "Should we fire our SEO agency?",
        a: "No. Keep them for Google organic -- it still matters. Add us for the AI layer. Most of our clients run both in parallel. The work is complementary.",
      },
      {
        q: "Why can't our SEO agency just add AEO?",
        a: "Because AEO requires different tools (AI citation monitoring vs Google rank tracking), different content formats (structured data vs keyword-optimized blogs), and different expertise (LLM behavior vs search engine algorithms).",
      },
      {
        q: "How do you work alongside existing agencies?",
        a: "We focus exclusively on AI search. We share insights that help your SEO agency too (content gaps, query patterns), but we don't overlap. Clean swim lanes.",
      },
    ],
  },

  "content-marketing-agencies": {
    slug: "content-marketing-agencies",
    title: "Memetik vs Content Agencies",
    metaTitle: "AEO vs Content Marketing Agencies | MEMETIK",
    metaDescription:
      "Content marketing agencies create great content. But content alone doesn't get you cited by AI. Here's what's missing.",
    badge: "Memetik vs Content Agencies",
    headline: "Great content.\nZero AI citations.",
    subhead: "Content alone isn't enough anymore.",
    description:
      "Your content agency writes excellent blog posts. But ChatGPT doesn't recommend you. Because content quality is table stakes -- what matters is how that content is structured, attributed, and positioned for AI consumption. That's a different skill entirely.",
    themLabel: "Content Marketing Agency",
    usLabel: "Memetik (AEO)",
    rows: [
      {
        category: "Focus",
        them: "Creating high-quality content (blogs, whitepapers, videos)",
        us: "Engineering content for AI citation and recommendation",
      },
      {
        category: "Content format",
        them: "Narrative, storytelling, brand voice",
        us: "Structured, definitive, schema-annotated, citation-optimized",
      },
      {
        category: "Distribution",
        them: "Blog, social media, email newsletter",
        us: "LLM training data, AI knowledge graphs, structured web presence",
      },
      {
        category: "Measurement",
        them: "Page views, engagement, social shares",
        us: "AI citations, recommendation position, competitive displacement",
      },
      {
        category: "Schema markup",
        them: "Basic or none",
        us: "Comprehensive JSON-LD (Article, FAQ, HowTo, Organization, Speakable)",
      },
      {
        category: "AI awareness",
        them: "Content isn't structured for LLM parsing",
        us: "Every piece is built for AI consumption from day one",
      },
    ],
    bottomLine:
      "Content marketing creates the raw material. AEO engineers that material into AI recommendations. You need both -- but without AEO, your content is invisible to the fastest-growing discovery channel.",
    faqs: [
      {
        q: "Can our content agency learn to do AEO?",
        a: "Content agencies are great at storytelling and brand content. AEO requires technical SEO, structured data expertise, and AI behavior analysis. It's a different discipline -- like asking a graphic designer to do data engineering.",
      },
      {
        q: "Do you create content or just optimize existing?",
        a: "Both. We audit and restructure existing content for AI parseability, and create new content targeting queries where you're invisible. We can work with your content agency's output and AEO-optimize it.",
      },
      {
        q: "What's the biggest thing content agencies miss?",
        a: "Structure. LLMs need definitive answers, expert attribution, schema markup, and FAQ-style formatting. Most content agencies write beautiful narrative content that AI models struggle to parse into recommendations.",
      },
    ],
  },
};

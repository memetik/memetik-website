export interface Segment {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  headline: string;
  subhead: string;
  description: string;
  painPoints: { icon: string; text: string }[];
  stats: { value: string; label: string }[];
  steps: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  ctaSubtext: string;
}

export const segments: Record<string, Segment> = {
  "saas-founders": {
    slug: "saas-founders",
    title: "AEO for SaaS Founders",
    metaTitle: "AEO for SaaS Founders | MEMETIK",
    metaDescription:
      "Your SaaS brand is invisible in ChatGPT. We engineer your product into AI recommendations so buyers find you, not your competitors.",
    badge: "For SaaS Founders",
    headline: "Your SaaS is invisible\nin ChatGPT.",
    subhead: "We fix that in 90 days.",
    description:
      "41% of enterprise buyers now start their research in AI search. When they ask 'best project management tool' or 'top CRM for startups', your competitor shows up. You don't. We change that.",
    painPoints: [
      {
        icon: "eye-off",
        text: "Buyers ask ChatGPT 'best [your category]' and your competitor shows up, not you",
      },
      {
        icon: "trending-down",
        text: "Your blog has 200+ posts but AI models don't cite any of them",
      },
      {
        icon: "alert-triangle",
        text: "You're spending $50K/month on content that AI search engines ignore",
      },
      {
        icon: "clock",
        text: "Every month you wait, competitors are training LLMs to recommend them",
      },
    ],
    stats: [
      { value: "41%", label: "Of enterprise buyers start with LLMs" },
      { value: "71%", label: "Of queries end with zero clicks" },
      { value: "90", label: "Days to measurable results" },
    ],
    steps: [
      {
        title: "Audit your AI visibility",
        description:
          "We check where your brand appears (or doesn't) across ChatGPT, Perplexity, and Gemini for your category keywords.",
      },
      {
        title: "Engineer your content",
        description:
          "We restructure and create content that LLMs can parse, cite, and recommend -- targeting the exact queries your buyers use.",
      },
      {
        title: "Monitor and compound",
        description:
          "Track AI citations in real-time. Expand to new queries. Build an unassailable lead in your category.",
      },
    ],
    faqs: [
      {
        q: "How long until we see results?",
        a: "Most SaaS clients see their first AI citations within 30-45 days. Meaningful category presence takes 60-90 days. We guarantee measurable improvement in 90 days or your money back.",
      },
      {
        q: "We already invest heavily in SEO. Why do we need AEO?",
        a: "SEO gets you ranked in Google. AEO gets you recommended by ChatGPT, Perplexity, and Gemini. With 40-70% of high-intent research now happening in AI, SEO alone leaves you invisible to a growing share of your buyers.",
      },
      {
        q: "Do you work with our existing content or create new?",
        a: "Both. We audit and optimize your existing content for AI parseability, then create new content targeting the specific queries where you're invisible.",
      },
      {
        q: "What if a competitor is already dominant in AI search?",
        a: "That's exactly when you need us. We've displaced established competitors in AI recommendations. The models update constantly -- there's always an opportunity to overtake.",
      },
    ],
    ctaText: "Get Your Free AI Visibility Audit",
    ctaSubtext: "See exactly where your SaaS ranks in ChatGPT vs competitors",
  },

  "ecommerce-brands": {
    slug: "ecommerce-brands",
    title: "AEO for E-commerce",
    metaTitle: "AEO for E-commerce Brands | MEMETIK",
    metaDescription:
      "AI is the new product discovery engine. Get your products recommended by ChatGPT, Perplexity, and Gemini when shoppers ask for the best in your category.",
    badge: "For E-commerce Brands",
    headline: "AI is the new\nproduct discovery.",
    subhead: "Are you in the recommendations?",
    description:
      "When shoppers ask ChatGPT 'best running shoes for flat feet' or 'top skincare for sensitive skin', the brands that appear sell. The brands that don't, lose. Google organic traffic is declining 15-30% YoY. AI product recommendations are the new shelf space.",
    painPoints: [
      {
        icon: "eye-off",
        text: "Shoppers ask AI for product recommendations and your brand isn't mentioned",
      },
      {
        icon: "trending-down",
        text: "Google organic traffic declining 15-30% year over year",
      },
      {
        icon: "alert-triangle",
        text: "Competitor products are the default AI recommendation in your category",
      },
      {
        icon: "clock",
        text: "Product comparison queries are moving from Google to ChatGPT and Perplexity",
      },
    ],
    stats: [
      { value: "58%", label: "Of shoppers use AI for product research" },
      { value: "3x", label: "Higher conversion from AI recommendations" },
      { value: "30%", label: "YoY decline in Google organic traffic" },
    ],
    steps: [
      {
        title: "Map your product visibility",
        description:
          "We test every major product query in your category across ChatGPT, Perplexity, and Gemini. You'll see exactly which brands AI recommends -- and where you're missing.",
      },
      {
        title: "Optimize your product content",
        description:
          "We restructure product pages, reviews, and comparison content so AI models understand your products, their benefits, and why they should recommend them.",
      },
      {
        title: "Dominate product recommendations",
        description:
          "Expand across product queries, comparison tables, and 'best of' recommendations. Become the default answer in your category.",
      },
    ],
    faqs: [
      {
        q: "Does this work for DTC and marketplace brands?",
        a: "Yes. We work with both DTC brands and marketplace sellers. The approach differs -- DTC focuses on brand site optimization, marketplace focuses on review aggregation and third-party content.",
      },
      {
        q: "How is this different from product listing SEO?",
        a: "Product listing SEO optimizes for Google Shopping and marketplace search. AEO optimizes for AI-generated product recommendations -- a completely different algorithm and content format.",
      },
      {
        q: "What categories work best?",
        a: "Any category where buyers research before purchasing. We've seen the strongest results in tech products, health & wellness, home goods, and B2B supplies.",
      },
      {
        q: "Can you help with Amazon product visibility in AI?",
        a: "AI models pull from multiple sources including Amazon reviews. We optimize the broader content ecosystem around your products so AI models build a strong association with your brand.",
      },
    ],
    ctaText: "Get Your Free Product Visibility Audit",
    ctaSubtext: "See which brands AI recommends in your product category",
  },

  "b2b-services": {
    slug: "b2b-services",
    title: "AEO for B2B Services",
    metaTitle: "AEO for B2B Service Firms | MEMETIK",
    metaDescription:
      "When buyers ask AI 'best consulting firm for X' or 'top agency for Y', be the answer. We engineer B2B service brands into AI recommendations.",
    badge: "For B2B Services",
    headline: "Be the firm\nAI recommends.",
    subhead: "Not the one it forgets.",
    description:
      "B2B buyers are asking ChatGPT and Perplexity for vendor recommendations before they ever visit your website. If you're not in those answers, you're not in the consideration set. Referrals are declining. AI recommendations are the new word-of-mouth.",
    painPoints: [
      {
        icon: "eye-off",
        text: "Prospects ask AI for vendor recommendations and you're not mentioned",
      },
      {
        icon: "trending-down",
        text: "Referral pipeline is shrinking as buyers self-research via AI",
      },
      {
        icon: "alert-triangle",
        text: "Newer, smaller competitors are showing up in AI recommendations ahead of you",
      },
      {
        icon: "clock",
        text: "Your thought leadership content isn't structured for AI consumption",
      },
    ],
    stats: [
      { value: "67%", label: "Of B2B buyers use AI to shortlist vendors" },
      { value: "4x", label: "More trust in AI recommendations vs ads" },
      { value: "12mo", label: "Window before AI search is commoditized" },
    ],
    steps: [
      {
        title: "Audit your vendor visibility",
        description:
          "We test how AI responds to every variation of 'best [your service] firm' -- and identify who's currently winning those recommendations.",
      },
      {
        title: "Build your authority layer",
        description:
          "We create and optimize the content ecosystem that makes AI models confident recommending you: case studies, methodology pages, expert content, and structured data.",
      },
      {
        title: "Own the recommendation",
        description:
          "Expand from your core service to adjacent queries. When a buyer asks any question related to your expertise, your firm is the answer.",
      },
    ],
    faqs: [
      {
        q: "We're a consulting firm, not a tech company. Does AEO apply to us?",
        a: "Absolutely. Any time a buyer asks AI 'best consulting firm for X', 'top agency for Y', or 'who should I hire for Z', AEO determines who appears. We have service firm clients seeing 3x more inbound after 90 days.",
      },
      {
        q: "We rely on referrals. Why should we care about AI search?",
        a: "Even referral-based buyers now validate recommendations with AI. When someone says 'check out Firm X', the buyer asks ChatGPT about you. If AI doesn't reinforce the referral, you lose deals you never knew about.",
      },
      {
        q: "How do you handle confidential client work?",
        a: "We can build your AI authority using anonymized case studies, methodology frameworks, and expert content. Named case studies convert better, but anonymized work still builds AI visibility.",
      },
      {
        q: "What's the ROI for a service firm?",
        a: "One new client from AI-driven discovery typically covers 6+ months of our engagement. Most service firms see 2-4 new qualified inbound leads per month from AI search within 90 days.",
      },
    ],
    ctaText: "Get Your Free Vendor Visibility Audit",
    ctaSubtext: "See if AI recommends you or your competitors",
  },

  "marketing-leaders": {
    slug: "marketing-leaders",
    title: "AEO for Marketing Leaders",
    metaTitle: "AEO for CMOs & VPs of Marketing | MEMETIK",
    metaDescription:
      "Your board is asking about AI search. Show them you're already on it. Measurable AI visibility metrics, 90-day guarantee, executive-ready reporting.",
    badge: "For Marketing Leaders",
    headline: "Your board will\nask about AI search.",
    subhead: "Have the answer ready.",
    description:
      "Every quarter, the question gets louder: 'What's our AI search strategy?' You need measurable metrics, clear ROI, and a partner who understands that marketing leaders need results they can report -- not experiments they have to explain.",
    painPoints: [
      {
        icon: "eye-off",
        text: "No visibility into whether your brand appears in AI search results",
      },
      {
        icon: "trending-down",
        text: "Organic traffic declining but you can't attribute it to AI search shifts",
      },
      {
        icon: "alert-triangle",
        text: "Your current SEO agency doesn't measure or optimize for AI citations",
      },
      {
        icon: "clock",
        text: "Leadership is asking for an AI search strategy and you don't have one yet",
      },
    ],
    stats: [
      { value: "73%", label: "Of CMOs say AI search is a top-3 priority" },
      { value: "0%", label: "Of SEO tools track AI citations" },
      { value: "90", label: "Day guarantee on measurable results" },
    ],
    steps: [
      {
        title: "Baseline your AI visibility",
        description:
          "We deliver an executive-ready audit: your AEO score, competitor benchmarks, and a clear picture of where you stand across ChatGPT, Perplexity, and Gemini.",
      },
      {
        title: "Execute with clear KPIs",
        description:
          "Every action maps to a metric you can report: AI citation count, category share of voice, recommendation position. No vanity metrics.",
      },
      {
        title: "Report results quarterly",
        description:
          "Board-ready reports showing AI visibility improvement, competitive displacement, and pipeline attribution. We make you look good.",
      },
    ],
    faqs: [
      {
        q: "How do I justify this to the CFO?",
        a: "Our audit shows the revenue at risk from AI search invisibility. When 40-70% of high-intent research happens in AI, being absent is a measurable pipeline gap. We provide the data to make the case.",
      },
      {
        q: "Can this integrate with our existing marketing stack?",
        a: "Yes. We work alongside your SEO team, content team, and existing agencies. AEO is additive -- it doesn't replace what's working, it captures the traffic that traditional channels are losing.",
      },
      {
        q: "What metrics do you report on?",
        a: "AI citation count, recommendation position, category share of voice, competitive displacement rate, and pipeline attribution. All trackable, all reportable.",
      },
      {
        q: "We already have an SEO agency. Do we need both?",
        a: "Different problem, different solution. SEO agencies optimize for Google rankings. We optimize for AI recommendations. Most of our clients keep their SEO agency and add us for the AI layer.",
      },
    ],
    ctaText: "Get Your Executive AI Visibility Report",
    ctaSubtext: "Board-ready audit of your AI search presence",
  },
};

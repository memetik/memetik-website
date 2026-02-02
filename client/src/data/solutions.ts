export interface Solution {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  headline: string;
  subhead: string;
  description: string;
  problemTitle: string;
  problems: string[];
  steps: { title: string; description: string }[];
  results: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export const solutions: Record<string, Solution> = {
  "chatgpt-visibility": {
    slug: "chatgpt-visibility",
    title: "ChatGPT Visibility",
    metaTitle: "Get Recommended by ChatGPT | MEMETIK",
    metaDescription:
      "Be the brand ChatGPT recommends when buyers search your category. We engineer your content into ChatGPT's recommendation layer.",
    badge: "ChatGPT Optimization",
    headline: "Get recommended\nby ChatGPT.",
    subhead: "Not just indexed. Recommended.",
    description:
      "ChatGPT is where your buyers go before they Google. When they ask 'what's the best tool for X', ChatGPT gives them a confident answer. If that answer isn't you, you've lost before you even knew you were competing.",
    problemTitle: "The ChatGPT Problem",
    problems: [
      "ChatGPT recommends your competitor as the #1 option in your category",
      "Your brand isn't mentioned at all in ChatGPT responses for key queries",
      "ChatGPT has outdated or incorrect information about your product",
      "You have no way to track or measure your ChatGPT presence",
    ],
    steps: [
      {
        title: "Map your ChatGPT presence",
        description:
          "We test 50+ purchase-intent queries to see exactly where and how ChatGPT mentions your brand vs competitors.",
      },
      {
        title: "Engineer citation-worthy content",
        description:
          "We create and optimize content that ChatGPT's models can parse, understand, and confidently recommend. Structured data, expert attribution, definitive answers.",
      },
      {
        title: "Monitor and expand",
        description:
          "Track your ChatGPT citations in real-time. Expand to new query patterns. Build an unassailable recommendation position.",
      },
    ],
    results: [
      { value: "50+", label: "Brands optimized for ChatGPT" },
      { value: "3x", label: "Average citation lift in 90 days" },
      { value: "#1", label: "Recommendation position for category leaders" },
    ],
    faqs: [
      {
        q: "How does ChatGPT decide what to recommend?",
        a: "ChatGPT synthesizes information from its training data and web browsing. It favors brands with clear, authoritative, well-structured content that definitively answers user queries. We engineer your content to match exactly what ChatGPT's models look for.",
      },
      {
        q: "Can you guarantee a #1 recommendation?",
        a: "We guarantee measurable improvement in AI citations within 90 days, or your money back. Specific ranking depends on your category competitiveness, but we've achieved #1 recommendations for multiple clients.",
      },
      {
        q: "How quickly does ChatGPT update its recommendations?",
        a: "ChatGPT with web browsing updates in real-time. The base model updates periodically. Our approach targets both: immediate visibility through web-accessible content and long-term positioning for model training.",
      },
      {
        q: "Does this work for ChatGPT Plus, Teams, and Enterprise?",
        a: "Yes. Our optimization targets all ChatGPT tiers. Enterprise users with browsing enabled see the most immediate results, but our structured content approach improves visibility across all versions.",
      },
    ],
  },

  "perplexity-citations": {
    slug: "perplexity-citations",
    title: "Perplexity Citations",
    metaTitle: "Get Cited by Perplexity AI | MEMETIK",
    metaDescription:
      "Perplexity cites sources with direct links. Get your brand cited and linked when buyers research your category.",
    badge: "Perplexity Optimization",
    headline: "Get cited in\nPerplexity.",
    subhead: "With a direct link to your site.",
    description:
      "Perplexity is different from ChatGPT -- it cites sources with clickable links. When a buyer asks about your category, Perplexity shows them exactly which brands it trusts. Getting cited means direct, qualified traffic from high-intent buyers.",
    problemTitle: "The Perplexity Opportunity",
    problems: [
      "Perplexity cites your competitors with direct links but not you",
      "Your content doesn't appear in Perplexity's source citations",
      "Competitor review sites and blogs are cited instead of your own content",
      "You're missing the highest-intent traffic source on the internet",
    ],
    steps: [
      {
        title: "Analyze your citation footprint",
        description:
          "We map every query where Perplexity cites competitors and not you. Unlike ChatGPT, Perplexity shows its sources -- so we know exactly what to target.",
      },
      {
        title: "Build citation-worthy authority",
        description:
          "Perplexity favors fresh, authoritative, well-structured content. We create the content ecosystem that makes Perplexity choose you as a primary source.",
      },
      {
        title: "Track citation growth",
        description:
          "Monitor your Perplexity citations week-over-week. Track click-through traffic. Expand to new query categories as your authority grows.",
      },
    ],
    results: [
      { value: "5x", label: "Average Perplexity citation growth" },
      { value: "12%", label: "CTR from Perplexity citations" },
      { value: "90", label: "Days to consistent citations" },
    ],
    faqs: [
      {
        q: "Why is Perplexity different from ChatGPT for optimization?",
        a: "Perplexity always cites its sources with clickable links, making it a direct traffic driver. ChatGPT recommendations are more implicit. Perplexity optimization is closer to traditional SEO in that source authority and content freshness matter heavily.",
      },
      {
        q: "How much traffic can Perplexity citations drive?",
        a: "Perplexity citations have a 10-15% CTR -- much higher than Google organic. While Perplexity's total user base is smaller, the traffic is extremely high-intent because users are actively researching purchase decisions.",
      },
      {
        q: "Does Perplexity favor certain content formats?",
        a: "Perplexity favors comprehensive, well-structured pages with clear expertise signals. FAQ sections, data-backed claims, and recently updated content get cited more frequently.",
      },
    ],
  },

  "ai-overview-ranking": {
    slug: "ai-overview-ranking",
    title: "Google AI Overview Ranking",
    metaTitle: "Rank in Google AI Overviews | MEMETIK",
    metaDescription:
      "Google AI Overviews are replacing traditional search results. Get your brand featured in the AI-generated answers at the top of Google.",
    badge: "AI Overview Optimization",
    headline: "Google AI Overviews\nare eating your traffic.",
    subhead: "Be featured, not buried.",
    description:
      "Google now shows AI-generated summaries above all organic results. If your brand isn't in that summary, you're below the fold on the most important page on the internet. AI Overviews are the new position zero.",
    problemTitle: "The AI Overview Shift",
    problems: [
      "AI Overviews push your #1 ranking below the fold",
      "Google's AI summary cites competitors instead of you",
      "Click-through rates on organic results dropping 30-50% when AI Overview appears",
      "Your existing SEO doesn't account for AI Overview optimization",
    ],
    steps: [
      {
        title: "Identify AI Overview opportunities",
        description:
          "We find every query in your category where Google shows an AI Overview and analyze which sources it cites. Many of these are different from the top organic results.",
      },
      {
        title: "Optimize for AI extraction",
        description:
          "Google's AI pulls from sources it trusts for definitive, well-structured answers. We optimize your content format, authority signals, and structured data to become a preferred source.",
      },
      {
        title: "Measure and expand",
        description:
          "Track your AI Overview appearances, citation position, and traffic impact. Expand to new query categories as Google rolls out AI Overviews to more searches.",
      },
    ],
    results: [
      { value: "40%", label: "Of searches now show AI Overviews" },
      { value: "2x", label: "CTR for brands cited in AI Overviews" },
      { value: "60d", label: "Average time to first AI Overview citation" },
    ],
    faqs: [
      {
        q: "Are AI Overviews replacing traditional search results?",
        a: "Not replacing, but pushing them down. For queries where AI Overviews appear, traditional organic results see 30-50% lower CTR. Being cited in the AI Overview maintains or increases your visibility.",
      },
      {
        q: "Is this the same as featured snippet optimization?",
        a: "Related but different. Featured snippets pulled from one source. AI Overviews synthesize from multiple sources and use different ranking factors. The optimization approach is more nuanced.",
      },
      {
        q: "How do AI Overviews interact with paid ads?",
        a: "Ads still appear above AI Overviews in many cases. But for informational and comparison queries, AI Overviews dominate the visible space. Organic visibility through AI Overviews is the most cost-effective approach.",
      },
    ],
  },

  "competitor-displacement": {
    slug: "competitor-displacement",
    title: "Competitor Displacement",
    metaTitle: "Displace Competitors in AI Search | MEMETIK",
    metaDescription:
      "Your competitor is the brand AI recommends. We change that. Systematic competitor displacement across ChatGPT, Perplexity, and Gemini.",
    badge: "Competitor Displacement",
    headline: "Your competitor is\nthe AI's answer.",
    subhead: "Let's change that.",
    description:
      "Right now, when a buyer asks AI about your category, someone else's name comes up first. That's not random -- it's because their content is better optimized for AI consumption. We systematically displace competitors from AI recommendations and install your brand as the default answer.",
    problemTitle: "The Displacement Problem",
    problems: [
      "A specific competitor is consistently recommended ahead of you in AI search",
      "You're mentioned as 'also consider' instead of the primary recommendation",
      "AI models have stronger associations with your competitor's brand",
      "Your competitor is investing in AEO and widening the gap",
    ],
    steps: [
      {
        title: "Competitive intelligence",
        description:
          "We reverse-engineer exactly why AI recommends your competitor: which content sources, what data points, which queries. Then we build the counter-strategy.",
      },
      {
        title: "Systematic displacement",
        description:
          "We create content that directly addresses the same queries with better structure, more authority, and more comprehensive answers. We make your brand the objectively better source for AI models.",
      },
      {
        title: "Position defense",
        description:
          "Once you're the recommended brand, we build moats: broader query coverage, deeper content, stronger authority signals. Make displacement of YOUR position extremely difficult.",
      },
    ],
    results: [
      { value: "80%", label: "Displacement success rate" },
      { value: "90d", label: "Average time to displace competitor" },
      { value: "1", label: "Client per category (exclusivity)" },
    ],
    faqs: [
      {
        q: "Can you really displace an established competitor?",
        a: "Yes. AI models don't have brand loyalty -- they recommend whatever content best answers the query. We've displaced venture-backed competitors, public companies, and category incumbents. The key is better content engineering, not bigger budgets.",
      },
      {
        q: "What if they fight back?",
        a: "That's why Step 3 is position defense. We don't just get you to #1 -- we build moats that make it extremely expensive for competitors to displace you. First-mover advantage in AEO is massive.",
      },
      {
        q: "Do you work with only one client per category?",
        a: "Yes. Category exclusivity is core to our model. We can't help you displace a competitor while also working with that competitor. Once you secure your category with us, it's locked.",
      },
      {
        q: "How do you track displacement progress?",
        a: "Weekly AI citation monitoring across ChatGPT, Perplexity, and Gemini. We track your recommendation position vs the target competitor across 50+ queries. You'll see the gap closing in real-time.",
      },
    ],
  },
};

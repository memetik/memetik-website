/**
 * Post-generation enrichment for strategy page content JSON.
 * Adds deliverableStack from standard Memetik doctrine and validates oneLiner.
 */

function buildDeliverableStack(companyName, category) {
  return {
    apexAssets: {
      heading: "Decision-stage assets we build",
      items: [
        {
          label: "Best-of and buyer guide pages",
          description: `Own the "best ${category}" queries that shape buying decisions before buyers ever reach out.`,
          icon: "Target",
        },
        {
          label: "Head-to-head comparison pages",
          description: "Win shortlist formation with direct competitor matchups — the pages buyers read right before they choose.",
          icon: "BarChart3",
        },
        {
          label: "Alternative-to pages",
          description: "Capture buyers actively looking to switch from competitors. These are the highest-intent pages in any category.",
          icon: "Layers3",
        },
        {
          label: "Pricing transparency pages",
          description: "Answer the pricing question before competitors do. Buyers who can't find pricing move on.",
          icon: "FileText",
        },
        {
          label: "Original research and benchmarks",
          description: "Publish category data that gets cited, linked to, and recommended by answer engines as the authoritative source.",
          icon: "Search",
        },
        {
          label: "Case-evidence assets",
          description: "Proof that converts — real results, real implementations, real outcomes that make the recommendation credible.",
          icon: "Shield",
        },
        {
          label: "Calculators, tools, and interactive assets",
          description: "Earn links, citations, and return visits with utility-first content that buyers actually use.",
          icon: "Gauge",
        },
        {
          label: "Use-case and persona pages",
          description: `Match the right solution to the right buyer in the right context — every angle ${companyName} can win.`,
          icon: "Building2",
        },
      ],
    },
    knowledgeGraph: {
      heading: "Supporting coverage that compounds",
      body: `Memetik builds as many supporting pages as the category demands — long-tail permutations, contextual variations, adjacent use cases, FAQ depth, and topical clusters — all routing authority back to ${companyName}'s decision pages. This layer scales from hundreds to thousands depending on the category and creates the retrieval density that makes answer engines find the same recommendation in more and more contexts over time.`,
    },
    trustRelay: {
      heading: "Off-site authority that proves every claim",
      items: [
        {
          label: "Review-platform presence",
          description: "Active profiles, review acquisition, and response workflows on the platforms buyers actually check before choosing.",
          icon: "MessageSquare",
        },
        {
          label: "Community and forum seeding",
          description: "Authentic participation where your category gets discussed — Reddit, niche forums, industry communities.",
          icon: "Globe",
        },
        {
          label: "Professional network distribution",
          description: "LinkedIn thought leadership, newsletter placements, and expert commentary that spreads the same story to decision-makers.",
          icon: "Building2",
        },
        {
          label: "Third-party listicles and publications",
          description: "Get featured in the best-of lists and roundups buyers actually read when comparing options.",
          icon: "Newspaper",
        },
        {
          label: "Editorial and digital PR",
          description: "Tier-one media placements that build brand authority and earn high-value citations answer engines trust.",
          icon: "Sparkles",
        },
        {
          label: "High-authority backlinks",
          description: "DR70+ links pointed at your most important commercial pages — the trust signal that compounds everything else.",
          icon: "Link2",
        },
      ],
    },
    technical: {
      heading: "Machine-readable, indexable, and citable",
      items: [
        {
          label: "Crawler eligibility across all AI surfaces",
          description: "OAI-SearchBot, PerplexityBot, Googlebot, BingBot — every answer engine can find and cite you.",
          icon: "Bot",
        },
        {
          label: "Structured data matched to visible content",
          description: "Schema that helps machines understand what you offer — not just what you claim.",
          icon: "FileText",
        },
        {
          label: "Internal linking architecture",
          description: "Every supporting page feeds authority into your most important commercial pages.",
          icon: "Link2",
        },
        {
          label: "Sitemap, canonical, and duplicate discipline",
          description: "One canonical URL per intent. No dilution, no confusion, no wasted crawl budget.",
          icon: "Gauge",
        },
        {
          label: "Entity consistency",
          description: "Same brand story across owned pages, review platforms, directories, and third-party mentions.",
          icon: "Shield",
        },
        {
          label: "IndexNow and Bing Webmaster Tools",
          description: "Fast indexation and AI-performance visibility through Microsoft's citation and answer stack.",
          icon: "Search",
        },
      ],
    },
    measurement: {
      heading: "Know exactly what's working",
      items: [
        {
          label: "AI citation tracking",
          description: `Monitor where ${companyName} appears — and where it doesn't — across ChatGPT, Gemini, Perplexity, and AI Overviews.`,
          icon: "Eye",
        },
        {
          label: "Prompt testing and recommendation-share",
          description: "Track the share of relevant prompts where your brand is the recommended answer — the metric that actually matters.",
          icon: "Bot",
        },
        {
          label: "Monthly performance reporting",
          description: "Rankings, traffic, citation movement, workstream completion, and business outcomes — every month.",
          icon: "BarChart3",
        },
        {
          label: "Quarterly strategy reviews",
          description: "Entity ownership status, defended vs weak prompts, refresh priorities, and commercial readout.",
          icon: "Target",
        },
      ],
    },
    refresh: {
      heading: "The work doesn't stop — it compounds",
      items: [
        {
          label: "Monthly data and pricing refreshes",
          description: "Keep decision pages current so engines keep citing them. Stale data kills recommendations.",
          icon: "RefreshCw",
        },
        {
          label: "Quarterly asset reviews",
          description: "Identify what's winning, what's slipping, and what needs reinforcement — then act on it.",
          icon: "Search",
        },
        {
          label: "Competitor-response updates",
          description: "When competitors move into prompts you've already won, respond before the position erodes.",
          icon: "Shield",
        },
        {
          label: "Drift correction",
          description: "When a previously owned prompt softens, diagnose and fix before the recommendation is lost.",
          icon: "Gauge",
        },
      ],
    },
  };
}

function enrichContentJson(parsed, company) {
  const companyName = parsed.company || company.name || "the company";
  const category = company.category || "this category";

  // Add deliverableStack if not present
  if (!parsed.deliverableStack) {
    parsed.deliverableStack = buildDeliverableStack(companyName, category);
  }

  // Validate and generate oneLiner fallback if missing
  if (!parsed.hero?.oneLiner && parsed.tldr && parsed.tldr.length > 0) {
    const firstTldr = parsed.tldr[0];
    const match = firstTldr.match(/(\d[\d,.]*[MKBmkb]?\+?)\s/);
    if (match) {
      parsed.hero.oneLiner = `${firstTldr.split("—")[0].trim().slice(0, 60)}`;
    } else {
      parsed.hero.oneLiner = `${companyName} is invisible in AI search today.`;
    }
    console.log(`  Generated fallback oneLiner: "${parsed.hero.oneLiner}"`);
  }
}

module.exports = { enrichContentJson, buildDeliverableStack };

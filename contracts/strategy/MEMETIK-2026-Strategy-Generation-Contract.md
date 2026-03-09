# MEMETIK 2026 Strategy Generation Contract

Thin operational distillation of `/Users/house/Mind/Areas/Agency/Lead-Magnets/MEMETIK-2026-AEO-Master-Reference.md`. This contract is for deterministic generation and validation. It is **not** a second full playbook.

## 1. Contract identity

| Field | Value |
| --- | --- |
| Canonical upstream doctrine | `MEMETIK-2026-AEO-Master-Reference.md` |
| Purpose | Lock source precedence, terminology, handoffs, blocking rules, traceability, and delivery doctrine for downstream strategy generation. |
| Canonical chain | `research payload -> internal strategy brief -> founder-facing website strategy page -> founder-advisory content drafts` |
| Canonical public-output contract | `website-strategy-page-contract.md` |
| Canonical derivative-output contract | `strategy-content-draft-contract.md` |
| Output rule | Lower layers may transform, compress, and sequence. They may not invent doctrine, rename core systems, or erase required delivery/cadence substance. |

## 2. Source precedence

Use sources in this order. Higher layers win on conflict.

1. `MEMETIK-2026-AEO-Master-Reference.md`
2. Current first-party platform documentation for volatile platform/crawler/indexing claims
3. This contract
4. Approved company strategy brief
5. `website-strategy-page-contract.md`
6. Older specs, checklists, playbook phrasing, prompts, scripts, or sales collateral

## 3. Canonical generation chain and handoff boundaries

| Layer | Required input | Required output | Layer responsibility | Must not do |
| --- | --- | --- | --- | --- |
| Research payload | Company data, category framing, current-state evidence, competitor evidence, prompt/query evidence, source dates | Evidence pack for the brief | Supply company-specific facts and traceable evidence | Skip evidence, hide freshness, or fabricate certainty |
| Internal strategy brief | Payload + this contract + fresh platform rechecks when needed | Canonical planning artifact | Decide wedge, priorities, delivery scope, gaps, caveats, and page-ready storyline | Publish directly, hide blockers, or invent unsupported claims |
| Website strategy page | Approved brief + page contract | Founder-facing page | Transform the brief into concise public narrative and preserve doctrine that must survive publicly | Read raw payload as canonical input, expose operator-only detail, or reinterpret doctrine |
| Founder-advisory content drafts | Approved brief + canonical page + derivative-output contract | Portable script/post drafts | Transform the canonical page into reusable founder-advisory content without inventing claims or leaking operator-only doctrine | Ignore the approved page, switch angles mid-draft, or overstate unsupported certainty |

### Handoff rules

- The **brief is canonical downstream planning state**. The page is a rendering of the brief, not a parallel strategy.
- The **page is the canonical public narrative state** for downstream founder-advisory content drafts.
- If a later layer needs a new claim, it must be added to the brief first with traceability.
- Later layers may simplify wording for founders, but they must preserve the chosen wedge, the core delivery system, and the cadence doctrine.

## 4. Canonical terminology and retired labels

| Canonical term | Required meaning | Retire / map from |
| --- | --- | --- |
| Answer Engine Optimization (AEO) | Recommendation visibility, citation strength, and default-answer status across answer surfaces | AI SEO when used as a full replacement label |
| recommendation-share | Share of relevant prompts where the brand is recommended or cited | AI share of voice when used loosely, mention share |
| Money Entities | Highest-intent commercial prompts that shape shortlists and purchase decisions | money keywords, bottom-funnel keywords |
| Apex Assets | Flagship commercial answer assets | Foundation Assets, BOFU assets, flagship pages |
| Knowledge Graph | Scaled supporting retrieval layer | pSEO, programmatic SEO, TOFU layer |
| Trust Relay | External authority and distribution layer | off-site amplification, authority distribution |
| Authority nodes | Review platforms, editorials, communities, newsletters, professional networks, forums | channels, placements |
| Entity foundation | Technical/entity consistency layer that makes the brand machine-readable and trustworthy | schema setup, entity SEO when used too narrowly |

### Terminology rule

- Use the canonical term once and keep using it.
- If a legacy synonym appears in source material, normalize it instead of carrying both labels forward.

## 5. Non-negotiables for all downstream generation

1. The goal is **recommendation-share** and category ownership, not generic traffic language alone.
2. Every important Money Entity needs one clear owned destination and one clear commercial story.
3. Downstream outputs must preserve the three-layer execution system: **Apex Assets + Knowledge Graph + Trust Relay**.
4. **Trust Relay is core scope**, not optional amplification; review-platform work, backlinks, community/forum distribution, listicles, and digital PR must remain visible in strategy.
5. Technical and entity foundation work must remain explicit: crawl/index eligibility, canonicals, schema matched to visible content, sitemap hygiene, Bing/Webmaster/IndexNow handling, and entity consistency.
6. Freshness must be signaled, not assumed.
7. If evidence is weak, stale, or conflicting, downgrade or block instead of smoothing over gaps.
8. Public output may simplify operator language, but it must not erase 30/60/90 delivery expectations, ongoing cadence, or the real scope of work.

## 6. Source-trace and freshness protocol

Every major brief claim must carry this fixed field set, either inline or in an adjacent evidence block.

```yaml
claim_record:
  statement: string
  source_class: canonical_internal | first_party_platform | field_research
  source_pointer: string
  checked_at: YYYY-MM-DD
  freshness_tier: tier_1_volatile | tier_2_semi_stable | tier_3_stable
  freshness_status: current | caution | stale
  certainty: high | medium | low
  page_handling: use | soften | omit | block
```

### Trace rules

- Strategy, terminology, scope, cadence, and planning logic should trace to canonical internal doctrine.
- Platform/crawler/indexing/product-behavior claims should trace to first-party documentation and be rechecked before public reuse.
- Field research may support company-specific opportunity claims, but unsupported field claims may not be upgraded into doctrine.
- Major sections should keep a section-level `Source trace:` note or equivalent evidence reference.

### Freshness rules

- `tier_1_volatile`: recheck before using in a new public page; if not rechecked, soften or omit.
- `tier_2_semi_stable`: review quarterly and before repeating a tooling-dependent claim.
- `tier_3_stable`: treat as durable unless Memetik intentionally changes doctrine.

## 7. Missing-input and no-hallucination behavior

### Blocking matrix

| Missing or weak input | Brief status | Page status | Required handling |
| --- | --- | --- | --- |
| Company identity, domain, category, or ICP context missing | Block | Block | Stop generation |
| No prioritized Money Entities or no clear commercial prompt set | Block | Block | Stop until mapped |
| No current-state evidence or no competitor evidence | Block | Block | Stop until evidence exists |
| Major claim has no source pointer or freshness status | Block | Block | Add trace or remove claim |
| Wedge/prioritized sequence cannot be justified from payload | Block | Block | Stop instead of inventing a plan |
| Delivery scope lacks on-site, off-site, and technical/entity work | Block | Block | Restore full doctrine |
| Source conflict or stale volatile platform guidance | Caution or Block | Block if public claim depends on it | Downgrade, mark assumption, or remove |
| Minor proof gap on a non-core supporting detail | Caution | Caution | Mark as assumption or omit detail |

### No-hallucination rules

- Never invent competitors, proof, volumes, platform capabilities, or company priorities.
- If certainty is `low`, the brief must label the claim as an assumption, deferred validation, or unresolved gap.
- The page may only include a low-certainty item when it is honestly framed as a caveat and does not drive the core recommendation.
- If the brief contains unresolved blockers, page generation fails closed.

## 8. Internal brief vs founder-facing page boundary

| Belongs in internal brief | Belongs in founder-facing page |
| --- | --- |
| Raw evidence log, source pointers, confidence flags, unresolved gaps, rejected options, internal sequencing logic, operator notes | Clear commercial narrative, current-state diagnosis, opportunity, right-to-win, 90-day wedge, delivery scope, cadence, CTA |
| Explicit blocker list and assumption ledger | Only the caveats founders need to interpret the strategy honestly |
| Detailed rationale for why priorities were chosen | Concise explanation of why the chosen wedge matters |
| Section-level trace detail for every major recommendation | Founder-readable supporting evidence or compact appendix only |

The dedicated page rules live in `website-strategy-page-contract.md`. If this contract and the page contract appear to conflict on public copy, this contract decides doctrine and the page contract decides presentation.

## 9. Delivery and cadence doctrine that must survive downstream generation

### 9.1 Delivery scope bands

| Program depth | Money Entities | Apex Assets total | Comparison/evaluation pages | Knowledge Graph pages | Trust Relay placements | DR70+ backlinks |
| --- | --- | --- | --- | --- | --- | --- |
| Foundation | 15 total | 20-35 | 13-20 | 400-600 | 15-20 | 20-30 |
| Ownership | 25 total | 50-80 | 27-38 | 1,000-1,500 | 40-50 | 40-50 |
| Dominance | 40 total | 75-120 | 35-55 | 1,500-2,500 | 60+ | 50-70+ |

### 9.2 Off-site work that may not disappear

- review-platform presence
- community/forum participation
- professional-network distribution
- third-party listicles and publication-style placements
- editorial and digital PR placements
- backlinks to Apex Assets

### 9.3 30/60/90 rollout doctrine

| Window | Foundation | Ownership | Dominance |
| --- | --- | --- | --- |
| Day 0-30 | 5-10 Apex Assets, 100-250 Knowledge Graph pages, review-platform setup, 8-12 early Trust Relay placements | 8-15 Apex Assets, 200-400 Knowledge Graph pages, review-platform setup, 10-15 early Trust Relay placements | 10-18 Apex Assets, 250-500 Knowledge Graph pages, review-platform setup, 12-18 early Trust Relay placements |
| Day 31-60 | 10-20 cumulative Apex Assets, 250-450 cumulative Knowledge Graph pages, 12-18 cumulative placements, first backlinks | 18-30 cumulative Apex Assets, 450-800 cumulative Knowledge Graph pages, 18-30 cumulative placements, first backlinks | 25-40 cumulative Apex Assets, 600-1,000 cumulative Knowledge Graph pages, 25-40 cumulative placements, first backlinks |
| Day 61-90 | 20-35 cumulative Apex Assets, 400-600 cumulative Knowledge Graph pages, 15-20 cumulative placements, active review footprint | 30-45 cumulative Apex Assets, 700-1,100 cumulative Knowledge Graph pages, 25-40 cumulative placements, active review footprint | 40-60 cumulative Apex Assets, 900-1,500 cumulative Knowledge Graph pages, 35-55 cumulative placements, active review footprint |

### 9.4 Ongoing cadence doctrine

| Cadence | Required meaning |
| --- | --- |
| Weekly operating rhythm | Monday priority review, Tuesday briefing/research, Wednesday drafting/QA, Thursday publishing/indexing, Friday Trust Relay/review actions and feedback capture |
| Monthly performance report | Recommendation visibility, citation share, prompt coverage, workstream completion, authority proof, downstream search indicators, business-facing evidence |
| Quarterly strategy review | Entity ownership status, defended vs weak prompts, consolidation decisions, refresh priorities, and commercial impact readout |

## 10. Deterministic generation rules

- Preserve section order: source precedence -> chain -> terminology -> trace/freshness -> blocking -> delivery/cadence -> output boundary.
- Use canonical terminology exactly.
- Omit unsupported specifics rather than filling whitespace.
- Never collapse the strategy into a generic content plan or a pure SEO-retainer frame.
- The contract stays compact. Doctrine detail lives upstream in the master reference.

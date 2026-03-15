# Website Strategy Page Contract

Canonical public-output contract for founder-facing strategy pages derived from the approved internal strategy brief. This file defines page rules only. It does not replace the master reference or the generation contract.

## 1. Role and required inputs

| Field | Rule |
| --- | --- |
| Canonical upstream doctrine | `MEMETIK-2026-AEO-Master-Reference.md` via `MEMETIK-2026-Strategy-Generation-Contract.md` |
| Canonical direct input | Approved company strategy brief |
| Forbidden direct-canonical input | Raw research payload, scattered prompts, old playbook-only instructions |
| Audience | Founder, CEO, CMO, or commercial lead |
| Job | Turn the brief into a concise public strategy that preserves the real wedge, delivery scope, and cadence without leaking operator-only detail |

## 2. Founder-facing page rules

1. The page must read like a founder strategy memo, not an internal brief dump.
2. The page must stay company-specific; no generic advice blocks with only superficial substitution.
3. The page must preserve the chosen wedge, right-to-win logic, and concrete delivery engine.
4. The page must show the real Memetik system, but translate operator-only doctrine into plain founder language on public pages: **priority buying queries, bottom-of-funnel pages, supporting content coverage, off-site authority, technical/entity foundation, refresh/defense**.
5. The page must include a visible 6-month engagement view with Month 1, Month 2, Month 3, and Months 4–6, plus a founder-readable monthly operating system.
6. The page must use a vertical-first reading flow. In the main narrative, default to single-column stacked blocks rather than side-by-side layouts.
7. Hero metrics must stay at the top of the page in a vertical stack, and the number typography must fit cleanly without wrapping or overflow.
8. Immediate actions must stack underneath the hero metrics, not beside them.
9. If canonical keyword attribution is available, each hero metric card should show a compact competitor-keyword vs non-competitor / unbranded breakdown directly beneath the headline number.
10. Public pages must not mention prior internal page versions, old page drafts, or origin-story commentary; the published page should read as the canonical page, not a meta-description of how it evolved.
11. Public AI visibility evidence should use unbranded market prompts by default; branded prompts may inform internal diagnostics, but they should not anchor the visible page narrative.
12. Public pages must avoid operator-only labels such as `Apex Assets`, `Knowledge Graph`, `Trust Relay`, `wedge`, `shortlist`, and `recommendation-share`; keep those canonical upstream in doctrine and briefs, then translate them for founders.
13. Public pages must not promise a fixed count of bottom-of-funnel pages; they should explain that Memetik builds as many commercial decision pages as needed to cover the relevant demand.
14. The page must not include pricing, staffing minutiae, hidden assumptions presented as facts, or internal QA labels.
15. The hero H1 must use a contrast or direct-address formula that makes the stakes immediately obvious to a founder who knows nothing about AI search. Preferred headline formulas in priority order:
    - Direct address + tension: `Your buyers are searching. They can't find you yet.`
    - Contrast / before-after: `From invisible to the default recommendation.` or `Zero visibility today. Category leader in 12 months.`
    - Quantified gap: `14.8M searches. Zero results for [Company].`
    - Provocative question: `Who gets the deal when [Company] doesn't show up?`
    - NEVER use the old `<Brand> can own the <category> conversation` pattern — it reads as agency jargon to founders.
16. Do not split the core hero claim across a long `title` plus a long `accent`. If an accent line is used at all, it should be very short; the real nuance should live in the subtitle.

## 2b. Layout doctrine

1. The page should scroll like a premium founder memo, not read like a dashboard.
2. The main story should have one reading axis: vertical.
3. Charts may be wide, but primary narrative blocks should not force left-right reading.
4. In the main narrative, avoid 2-column, 3-column, or 4-column content grids as the default storytelling pattern.
5. If a section contains multiple ideas, stack them vertically in sequence.
6. The hero must stack: eyebrow -> H1 -> subhead -> executive summary note -> stacked metric cards -> stacked immediate actions.
7. The hero H1 should land one sharp idea fast. Use contrast, direct address, or a quantified gap — not an internal ownership claim. Avoid qualifying clauses like `before...`, `while...`, or `so that...` inside the headline itself.
8. The Revenue / Commercial Impact section should stack: section lead -> explanation -> curve -> calculator -> assumptions/caveat note.
9. The 6-month Growth Plan should stack Month 1, Month 2, Month 3, and Months 4–6 vertically.
10. The Operating Model should use a timeline / curve visual with deployment milestones, not a dense workstream matrix.
11. The Operating Model should show the full 12-month progression where the page exposes 12-month traffic planning, not only a compressed subset of months.
12. If the timeline component supports interaction, hovering on desktop and tapping on mobile should reveal what is being deployed in the active month.
13. The "What Memetik Builds and Ships" section should use vertically stacked scope blocks, not a matrix or dashboard-like execution table.
14. Detailed comparison tables belong in the appendix, not the main narrative.

## 3. Required section order — StoryBrand 3-act narrative

The page follows a StoryBrand + PAS hybrid structure. The prospect is the hero. Memetik is the guide. The old 12-section consultant-report structure is replaced by 5 narrative acts plus a CTA and optional appendix.

| Order | Section | StoryBrand Principle | What It Covers | Brief Sources |
| --- | --- | --- | --- | --- |
| 00 | **Hero + TLDR + Executive Snapshot** | Character wants something | Headline claim, TLDR bullets, 4 metric cards, 3 immediate actions | Company context, wedge, TAM |
| 01 | **The Problem** | Has a problem (external + internal + philosophical) | Where the company stands today, why they're invisible, the competitive gap, AI visibility gap — told as ONE narrative about what's broken. Merges old State of Search, Current State, Competitive Gap, and AI Visibility into one story. | Sections 4, 5, AI visibility, prompt evidence |
| 02 | **The Opportunity** | Meets a guide | The wedge, why this company can win, the commercial upside, the revenue curve, the calculator. Merges old Opportunity, Right to Win, and Revenue/Commercial Impact. | Sections 3, 6, 7, TAM model |
| 03 | **The Plan** | Who gives them a plan | 6-month growth plan, what Memetik builds and ships, off-site authority, operating model — told as ONE coherent execution story with a simple 3-step overview at the top. Merges old Growth Plan, Off-site Authority, Delivery Scope, and Operating Model. | Sections 7–13 |
| -- | **Failure block** | Helps them avoid failure | Brief agitation block: what happens if they do nothing (2-4 bullets). Rendered between the last section and the CTA. | Derived from competitive gap + AI visibility gap |
| -- | **Success block** | Ends in success | Brief future-pacing block: what the company looks like in 12 months if they execute (2-4 bullets). Rendered before the CTA. | Derived from TAM model + wedge |
| 04 | **CTA** | Calls them to action | Book a strategy call | Next actions |
| 05 | **Supporting evidence appendix** | Supporting evidence | Detailed tables, prompt evidence, assumptions, source trace | Page-safe evidence subset |

### Narrative rules for the 3-act structure

1. **No "State of Search 2026" section.** Market context belongs in 1-2 sentences inside "The Problem," not its own section.
2. **Max 2-3 cards per section.** Use `narrativeProse` blocks for story flow; reserve cards for data or distinct concepts.
3. **Cut StrategySectionLead from most sections.** Use it sparingly (at most 1 section). Other sections should use a short subtitle and/or narrativeProse for pacing.
4. **"The Problem" should agitate.** Name the external problem (invisible in search and AI), the internal problem (losing deals they don't know about), and the philosophical problem (inferior competitors getting recommended instead).
5. **"The Opportunity" should excite.** Show the size of the prize AND why THIS company specifically can win it. Include the revenue/upside curve and calculator here.
6. **"The Plan" should reassure.** Open with a 3-step summary (like StoryBrand Principle 4), then expand into month blocks and scope blocks underneath.
7. **"Why Memetik" is 2-3 sentences max**, not a full section with cards. Fold it into the CTA transition or a brief highlight box.
8. **failureBlock and successBlock are mandatory.** They create the emotional contrast that drives the CTA conversion.

## 4. Transformation rules: brief to page

| Brief content type | Page transformation | Never expose directly |
| --- | --- | --- |
| Raw source pointers and evidence ledger | Summarize into compact evidence notes or appendix references | Internal file paths, operator research scratch notes |
| Confidence flags and unresolved gaps | Convert into honest caveats or omit unsupported details | Internal scoring labels, hidden blocker metadata |
| Alternative wedges or rejected priorities | Show only the approved wedge | Internal decision debates |
| Operator sequencing detail | Translate into founder-readable Month 1 / Month 2 / Month 3 / Months 4–6 and an operating timeline tied to growth progression | Staffing plans, internal queue mechanics |
| Full assumption log | Surface only material assumptions that affect interpretation | Minor internal QA warnings that do not change the recommendation |

## 5. Public claim-trace and freshness rules

- Every material page claim must come from a brief claim record with source class, check date, freshness tier, and certainty.
- Volatile platform or crawler claims must be rechecked before public use; otherwise soften or omit them.
- If evidence is blended rather than first-party precise, say so plainly.
- The page may use a compact `Source trace:` note or appendix summary, but it must not pretend unsupported precision.

## 6. Public-safe caveat discipline

- Do not silently upgrade a low-certainty brief item into a confident page claim.
- If a caveat materially changes the recommendation, preserve it in plain language.
- If a caveat would only confuse the reader and is not core to the recommendation, omit the claim instead of publishing a weak statement.

## 7. Delivery doctrine that must remain visible on the page

The page must make these workstreams unmistakable:

- Money Entity mapping and priority prompt selection
- Apex Assets for flagship commercial pages and comparison/evaluation pages
- Knowledge Graph coverage for supporting retrieval density
- Trust Relay distribution across review platforms, communities/forums, newsletters/professional networks, listicles, editorial placements, and digital PR
- Backlinks that reinforce Apex Assets
- Technical/entity foundation: crawl/index eligibility, canonicals, schema matched to visible content, sitemaps, Bing/Webmaster/IndexNow handling, entity consistency
- Refresh and defense after first-wave shipping

### Required cadence surface

| Surface | Minimum public treatment |
| --- | --- |
| 6-month rollout | Show what ships in Month 1, Month 2, Month 3, and Months 4–6, and how the system compounds across the engagement |
| Monthly operating system | Show that research/prioritization, production, publishing/indexing, off-site authority, and measurement run concurrently every month, but surface them through a clear visual timeline rather than a dense matrix |
| Monthly report | Show that recommendation visibility, authority proof, and workstream completion are reviewed monthly |
| Quarterly review | Show that the program refreshes, consolidates, and reallocates effort rather than running on autopilot |

## 8. Blocking rules for page generation

Block page generation when any of the following is true:

- no approved brief exists
- the brief still has unresolved blockers
- the page would need to invent a wedge, competitor gap, or delivery scope not present in the brief
- volatile public claims are stale and cannot be rechecked
- the page omits the concrete delivery engine or ongoing cadence and would read like a vague content-retainer pitch

## 9. Canonical terminology on public pages

Keep these names canonical upstream in doctrine and briefs:

- `Money Entities`
- `Apex Assets`
- `Knowledge Graph`
- `Trust Relay`
- `recommendation-share`

Translate them on public pages like this:

- `Money Entities` -> `priority buying queries`
- `Apex Assets` -> `bottom-of-funnel pages` or `decision pages`
- `Knowledge Graph` -> `supporting content coverage` or `supporting content network`
- `Trust Relay` -> `off-site authority`
- `recommendation-share` -> `default recommendation` or equivalent founder-readable phrasing
- `wedge` -> `opening move`
- `shortlist` -> `buying consideration` / `vendor consideration`

For creator-platform pages where the brief supports it, the public page should also:

- position the company for serious creators building real businesses
- counter-position clearly against Whop where relevant in the comparison layer
- make Reddit/community participation visible inside the off-site authority narrative
- explain that Memetik builds as many bottom-of-funnel pages as needed to cover demand rather than promising a fixed public page count

Map and retire these labels if they appear upstream in older material:

- `Foundation Assets` -> `Apex Assets`
- `pSEO` / `programmatic SEO` as system name -> `Knowledge Graph`
- loose `AI share of voice` phrasing -> `recommendation-share` when the strategic meaning is intended

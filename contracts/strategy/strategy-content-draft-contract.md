# Strategy Content Draft Contract

Canonical public-derivative contract for founder-advisory content drafts generated from the approved internal strategy brief and the canonical website strategy page.

## 1. Role and required inputs

| Field | Rule |
| --- | --- |
| Canonical upstream doctrine | `MEMETIK-2026-AEO-Master-Reference.md` via `MEMETIK-2026-Strategy-Generation-Contract.md` |
| Canonical direct inputs | Approved company strategy brief + generated website strategy page |
| Forbidden direct-canonical input | Raw research payload as a replacement for the brief/page pair |
| Output | One markdown file containing a Source Angle, Rough Video Script, and LinkedIn Post |
| Audience | Founder, CEO, CMO, operator, or advisor consuming in-feed content |
| Job | Turn the company strategy into portable founder-advisory content without inventing claims or leaking operator-only doctrine |

## 2. Canonical chain

`research payload -> internal strategy brief -> founder-facing website strategy page -> founder-advisory content drafts`

## 3. Founder-advisory transformation rules

1. Lead with one sharp company-specific angle anchored in supported missed opportunity: traffic, revenue potential, AI visibility, or competitor capture.
2. Keep the tone founder-advisory: direct, calm, commercial, and credible. Do not write like a hype account or a paid-ad template.
3. Use only public-safe numbers already supported by the brief/page. If a number is modeled, say so plainly with wording like `modeled` or `estimate-only`.
4. Never invent revenue math when first-party ACV/AOV or funnel inputs are missing. Say the upside needs first-party revenue inputs instead.
5. Keep operator-only labels out of the content: `Money Entities`, `Apex Assets`, `Knowledge Graph`, `Trust Relay`, `recommendation-share`, and similar internal doctrine terms must be translated into plain founder language.
6. Do not mention internal drafts, strategy-page lineage, contracts, prompts, or old page versions.
7. Make the mechanism concrete: what competitors own today, what the company is missing, and what execution would actually need to ship.
8. If keyword attribution data is available, use competitor-keyword vs non-competitor / unbranded demand split to sharpen the diagnosis.
9. Close with a soft CTA. Default to a comment-based CTA if no stronger company-specific CTA is available.
10. The rough video script should feel like a 45-90 second talking-head draft: short spoken lines, a clear hook, a clear diagnosis, a clear upside, and a soft CTA.
11. The LinkedIn post should be skimmable short paragraphs, not a dense essay. Avoid hashtags by default.
12. Keep one primary angle across all derivatives so the script and post feel like the same campaign, not disconnected drafts.

## 4. Required output structure

```md
# <Company> Strategy Content Drafts

## Source Angle
- Primary hook
- Why it matters now
- Proof points to use
- Caveats / claims to avoid
- Suggested CTA

## Rough Video Script
### Hook
### Body
### CTA

## LinkedIn Post

## Adaptation Notes
```

## 5. Blocking rules

Block generation when any of the following is true:

- no approved brief exists
- no canonical website strategy page exists
- the derivative would need to invent a claim, metric, competitor, or wedge not present upstream
- the content would require unsupported revenue certainty
- the draft depends on operator-only doctrine that cannot be translated into plain founder language

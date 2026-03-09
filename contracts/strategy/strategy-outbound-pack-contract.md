# Strategy Outbound Pack Contract

Canonical downstream contract for folder-based outbound packs derived from the approved strategy brief and canonical website strategy page.

## 1. Role and required inputs

| Field | Rule |
| --- | --- |
| Canonical upstream doctrine | `MEMETIK-2026-AEO-Master-Reference.md` via `MEMETIK-2026-Strategy-Generation-Contract.md` |
| Canonical direct inputs | Approved company strategy brief + canonical website strategy page |
| Optional supporting input | Existing single-note `Strategy Content Drafts` output |
| Forbidden direct-canonical input | Raw research payload as a replacement for the brief/page pair |
| Output | Folder-based outbound pack for Obsidian + repo mirror |
| Audience | Founder-advisory operator turning strategy into outbound assets |
| Job | Convert the canonical strategy into a reusable outbound campaign pack without inventing claims or breaking the source-of-truth chain |

## 2. Canonical chain

`research payload -> internal strategy brief -> founder-facing website strategy page -> founder-advisory content drafts -> strategy outbound pack`

## 3. Required pack structure

The pack must create these assets:

- `00 Campaign Brief.md`
- `01 Traffic Angle.md`
- `02 Revenue Angle.md`
- `03 AI Visibility Angle.md`
- `04 Hook Bank.md`
- `05 Carousel Outline.md`
- `06 Loom Script.md`
- `07 Comment DM Follow-Up.md`
- `08 Cold Email.md`
- `99 Publishing Log.md`
- `Archive/`

## 4. Transformation rules

1. Keep one company-specific thesis across the full pack.
2. The three angle files are different entry points into the same thesis, not three disconnected stories.
3. Use only public-safe claims already supported by the brief/page.
4. Keep operator-only labels out of founder-facing copy.
5. If upside is modeled, say so plainly.
6. If revenue inputs are incomplete, say revenue planning requires first-party ACV/AOV and funnel inputs.
7. Every note must include frontmatter with file status, source lineage, and asset type.
8. The outbound pack must remain additive. It must not create runtime or routing dependencies for the website.

## 5. Blocking rules

Block outbound-pack generation when any of the following is true:

- no approved strategy brief exists
- no canonical strategy page exists
- the pack would need to invent a claim, metric, or competitor not present upstream
- the pack would require unsupported revenue certainty
- the pack would replace the website generation path instead of sitting downstream of it

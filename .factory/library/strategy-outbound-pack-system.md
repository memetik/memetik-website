# Strategy Outbound Pack System

Canonical runbook for how outbound packs are generated in `memetik-website`.

## Purpose

The outbound-pack system exists to turn one completed strategy into a reusable campaign pack for outbound and founder-advisory distribution.

Canonical chain:

`research payload -> internal strategy brief -> founder-facing website strategy page -> founder-advisory content drafts -> strategy outbound pack`

## Source of truth

- Brief: `/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/briefs/{PascalCaseSlug}-Strategy-Brief.md`
- Repo brief snapshot: `content/strategy-briefs/{PascalCaseSlug}-Strategy-Brief.md`
- Strategy page generator: `scripts/research-pipeline/generate-strategy.cjs`
- Outbound pack generator: `scripts/research-pipeline/generate-outbound-pack.cjs`
- Outbound pack contract: `contracts/strategy/strategy-outbound-pack-contract.md`
- Existing single-note drafts: `content/strategy-content-drafts/`

## Pack outputs

Repo mirror:

- `content/strategy-outbound-packs/{slug}/`

Obsidian mirror:

- `/Users/house/Mind/Areas/Agency/Clients/SaaS/memetik/Strategy Outbound Packs/{Company}/`

Required files:

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

## Operating rule

Outbound packs are downstream-only.

They may not invent claims, replace the approved brief/page chain, or change website routing/rendering.

## Commands

Generate strategy page only:

```sh
node scripts/research-pipeline/generate-strategy.cjs --slug drinkhyro
```

Generate strategy page + outbound pack:

```sh
node scripts/research-pipeline/generate-strategy.cjs --slug drinkhyro --outbound-pack
```

Research + strategy + outbound pack:

```sh
node scripts/research-pipeline/orchestrate.cjs --company "Hyro" --mode strict --generate --outbound-pack
```

## Safety notes

- Keep `--outbound-pack` opt-in.
- Keep the legacy single-note `Strategy Content Drafts` output for compatibility unless explicitly retiring it.
- Validate with `npm run check` and `npm run build` after generator changes.

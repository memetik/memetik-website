# Dream 100 System

Canonical runbook for how Dream 100 client research, strategy generation, routing, validation, and publishing work in `memetik-website`.

Use this file as the source of truth for future droids and new sessions.

## Purpose

The Dream 100 system exists to:

- maintain a growing list of target companies
- generate research payloads for those companies
- turn validated research into canonical strategy briefs
- generate founder-facing strategy pages
- wire those pages into the website
- validate the build
- publish the result live

This file documents how the system works now, including what is automated and what still requires explicit handling.

## Source of truth map

### Dream client registry

- `data/dream-clients.json`

This is the entrypoint for all Dream 100 clients.

All main scripts resolve companies from this file by `name` or `slug`.

If a company is not in this file, the standard pipeline cannot run it by name.

### Research pipeline

- `scripts/research-pipeline/index.cjs`

This performs research only.

### Research + generation orchestrator

- `scripts/research-pipeline/orchestrate.cjs`

This runs research, and optionally strategy generation, for one company or a batch.

### Strategy page generator

- `scripts/research-pipeline/generate-strategy.cjs`

This consumes a research payload plus canonical doctrine inputs, creates/updates the canonical brief, writes a repo brief snapshot, and generates a strategy page TSX file.

### Canonical doctrine chain

These are required upstream inputs:

- `/Users/house/Mind/Areas/Agency/Lead-Magnets/MEMETIK-2026-AEO-Master-Reference.md`
- `/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/MEMETIK-2026-Strategy-Generation-Contract.md`
- `/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/client-strategy-brief-schema.yaml`
- `/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/website-strategy-page-contract.md`

Canonical chain:

`master reference -> generation contract -> brief -> page`

The page is not the strategy source of truth. The brief is.

### Generated artifacts

Research payload:

- `data/research/{slug}.json`

Debug logs:

- `data/research/_debug/{slug}-{timestamp}.json`

Canonical brief in Mind:

- `/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/briefs/{PascalCaseSlug}-Strategy-Brief.md`
- special-case BTS example: `examples/BTS-Strategy-Brief.md`

Portable repo brief snapshot:

- `content/strategy-briefs/{PascalCaseSlug}-Strategy-Brief.md`
- special-case BTS snapshot: `content/strategy-briefs/BTS-Strategy-Brief.md`

Generated strategy page:

- `client/src/pages/strategy/{PascalCaseSlug}.tsx`

### Routing and prerender

Shared route registry:

- `shared/strategyRouteRegistry.json`

App router:

- `client/src/App.tsx`

Prerender build logic:

- `scripts/prerender.cjs`

### Validation helpers

- `.factory/bin/verify_generation_contracts.py`
- `.factory/services.yaml`

### Deployment

- `.vercel/project.json`
- production deploy target: `www.memetik.ai`

## How the system runs now

## 1. Add or validate a client in `data/dream-clients.json`

Minimum viable client record:

```json
{
  "slug": "exampleco",
  "name": "ExampleCo",
  "domain": "example.com",
  "category": "Category / Subcategory",
  "industry": "Category"
}
```

Recommended enriched record for ambiguous or non-B2B categories:

```json
{
  "slug": "exampleco",
  "name": "ExampleCo",
  "domain": "example.com",
  "category": "Category / Subcategory",
  "industry": "Category",
  "brandDisambiguation": "clear category label",
  "semanticSeeds": ["seed one", "seed two"],
  "semanticExclusions": ["irrelevant term one", "irrelevant term two"],
  "promptModifiers": {
    "categoryLabel": "clear category label"
  },
  "competitorSeeds": [
    { "name": "Competitor A", "domain": "comp-a.com" },
    { "name": "Competitor B", "domain": "comp-b.com" }
  ]
}
```

Use enriched records when:

- the brand name is ambiguous
- the category is consumer rather than B2B SaaS
- the search space is likely to drift semantically
- seeded competitors materially improve research quality

## 2. Run research

Research-only command:

```sh
node scripts/research-pipeline/index.cjs --company "ExampleCo"
```

What research does now:

1. preflight auth check
2. competitor discovery
3. target + competitor domain metrics and backlinks
4. ranked keywords + keyword gaps
5. full keyword universe + semantic expansion
6. AI visibility checks across supported platforms
7. topical integrity + TAM modeling
8. website audit
9. quality gate + payload confidence scoring

Important rules:

- strict mode is the default
- if quality gate fails in strict mode, research fails closed
- topical integrity is treated as a real guardrail

Primary research output:

- `data/research/{slug}.json`

## 3. Generate the brief and page

Generation from existing research:

```sh
node scripts/research-pipeline/generate-strategy.cjs --slug exampleco
```

What generation does now:

1. loads canonical doctrine inputs from Mind
2. validates research payload presence and required fields
3. builds or updates the canonical brief in Mind
4. writes the portable repo brief snapshot
5. sends the approved brief plus component context to the configured model endpoint
6. validates the generated TSX against required checks
7. writes `client/src/pages/strategy/{PascalCaseSlug}.tsx`

Important rule:

- generation must not bypass the brief layer

## 4. Orchestrate research + generation together

Single-company full run:

```sh
node scripts/research-pipeline/orchestrate.cjs --company "ExampleCo" --generate
```

Batch run:

```sh
node scripts/research-pipeline/orchestrate.cjs --batch --start 0 --limit 5 --generate
```

Current limitation:

- the orchestrator does research + generation only
- it does not currently auto-wire routes, auto-commit, or auto-deploy by itself

## 5. Wire the page into the website

For a page to resolve on the live site, the file alone is not enough.

The system must also know:

- what URL maps to the page
- what metadata belongs to that URL
- whether prerender should build HTML for it

Current required wiring:

1. add a route entry to `shared/strategyRouteRegistry.json`
2. ensure `client/src/App.tsx` can load the new page component
3. ensure the route is included in the prerender build through the registry
4. ensure the repo brief snapshot exists if the route uses `prerenderMode: "brief"`

Example registry entry:

```json
{
  "slug": "exampleco",
  "route": "/strategy/exampleco",
  "componentKey": "exampleco",
  "title": "ExampleCo — Founder Strategy Memo | MEMETIK",
  "description": "Founder-facing strategy memo for ExampleCo.",
  "prerenderMode": "brief",
  "briefPath": "content/strategy-briefs/Exampleco-Strategy-Brief.md"
}
```

## 6. Validate

Typecheck:

```sh
npm run check
```

Client build:

```sh
npm run build:client
```

Full build + prerender:

```sh
npm run build
```

Contract verification helpers:

```sh
python3 .factory/bin/verify_generation_contracts.py --mode contracts
python3 .factory/bin/verify_generation_contracts.py --mode brief
python3 .factory/bin/verify_generation_contracts.py --mode full
```

## 7. Publish

Current live publish path:

1. commit changes
2. push to `main`
3. deploy to Vercel production

Typical deploy command:

```sh
vercel --prod --yes
```

## Current end-to-end command set

### Research only

```sh
node scripts/research-pipeline/index.cjs --company "Hyro"
```

### Research + generation

```sh
node scripts/research-pipeline/orchestrate.cjs --company "Hyro" --generate
```

### Regenerate page from existing research

```sh
node scripts/research-pipeline/generate-strategy.cjs --slug drinkhyro
```

### Validate and publish

```sh
npm run check
npm run build
git add -A
git commit -m "Your message"
git push origin main
vercel --prod --yes
```

## Environment requirements

Project `.env` / shell must provide at least:

- `DATAFORSEO_LOGIN`
- `DATAFORSEO_PASSWORD`
- `OPENAI_API_KEY`

Commonly relevant:

- `STRATEGY_MODEL`
- `TARGET_MARKETS`
- `RESEARCH_MODE`

Notes:

- `generate-strategy.cjs` defaults to `gpt-5.4`
- research is strict by default
- market scope can materially affect runtime and reliability

## Current known realities

These are important for future sessions.

### What is automated now

- client lookup from `dream-clients.json`
- research payload generation
- canonical brief generation
- portable repo brief snapshot creation
- strategy page TSX generation
- build/prerender after route registration

### What still needs explicit handling

- route registration for each new public strategy page
- app loader registration if the page is not already wired into `App.tsx`
- commit/push/deploy sequencing
- batch safety and stop-on-first-failure behavior at the operator level

### Known quality caveats

- some DataForSEO endpoints can be unstable or unavailable by market
- some AI visibility endpoints may return unsupported-path or not-found responses
- strict mode can fail otherwise-usable runs if the quality gate is too narrow for the category
- consumer categories often need stronger seed/exclusion tuning than B2B SaaS categories

## Guidance for adding new Dream 100 clients

When adding a new company:

1. choose a stable slug
2. prefer explicit `brandDisambiguation` for ambiguous names
3. add `semanticSeeds` if the category can drift
4. add `semanticExclusions` when irrelevant meanings are likely
5. add `competitorSeeds` when the default discovery path may miss the true market
6. use the company’s actual public domain as `domain`

## Guidance for future batch automation

This repo does not yet have a true one-button batch-publish command.

If future work adds one, it should:

- accept a count or subset selector
- stop on first failure
- generate research + brief + page for each selected client
- auto-wire route/prerender for each generated page
- run `npm run check` and `npm run build`
- commit and push only if everything succeeds
- deploy to Vercel only after a clean full pass

## Suggested operator phrases for future sessions

Use phrases like:

- `Add this company to Dream 100 and run end-to-end`
- `Run Dream 100 GTM for 5 clients`
- `Generate and publish the next 10 Dream 100 clients`
- `Regenerate and republish the strategy page for drinkhyro`
- `Run research only for this Dream 100 client`

## What a future droid should always do first

1. read this file
2. inspect `data/dream-clients.json`
3. determine whether the task is:
   - add client
   - research only
   - generate page
   - wire route/prerender
   - publish
   - batch run
4. preserve the canonical chain: `master reference -> generation contract -> brief -> page`
5. never treat raw research as the direct public strategy source

## Bottom line

Dream 100 currently works as a real end-to-end system, but not yet as a single-button bulk publisher.

Right now, the safe mental model is:

`dream-clients registry -> research -> canonical brief -> page -> route/prerender wiring -> validation -> deploy`

Any future automation or droid behavior should preserve that order.

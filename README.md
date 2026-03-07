# Memetik Website

Memetik's website repo, including the public site, strategy pages, and the strategy-generation pipeline that feeds them.

## Local development

```bash
npm install
npm run dev:client
npm run build:client
npm run build
```

- `npm run dev:client` starts the Vite client on port `5000`.
- `npm run build:client` builds the client bundle.
- `npm run build` runs the full site build and prerender pipeline.

## Strategy-generation flow

Canonical chain:

```text
master reference -> strategy-generation contract -> approved strategy brief -> website strategy page
```

Canonical artifacts live in:

- `/Users/house/Mind/Areas/Agency/Lead-Magnets/MEMETIK-2026-AEO-Master-Reference.md`
- `/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/`

Representative validated example: `bts-2`.

Generate the BTS strategy artifact with:

```bash
node scripts/research-pipeline/generate-strategy.cjs --slug bts-2
```

## Validation

```bash
npm run check
npm run build:client
npm run build
python3 .factory/bin/verify_generation_contracts.py --mode full
```

## Local proxy requirement

Strategy generation is approved to run through ChatGPT 5.4 via the local CLI proxy at `http://127.0.0.1:8327/v1` using model id `gpt-5.4`. The generator expects that proxy to be available locally before you run strategy-generation commands.

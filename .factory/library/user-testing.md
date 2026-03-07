# User Testing

Manual validation surface and evidence expectations for the strategy-generation-layer mission.

**What belongs here:** how to inspect Mind artifacts, BTS brief/page outputs, and build/prerender results.

---

## Validation Surfaces

1. **Mind contract layer**
   - Strategy-generation contract
   - Brief schema/template
   - Website strategy page contract
2. **Mind example brief**
   - BTS strategy brief under the approved `Strategy-Generation/examples/` path
3. **Website generation layer**
   - `scripts/research-pipeline/generate-strategy.cjs`
   - `.factory/droids/strategy-builder.md`
   - `client/src/App.tsx`
   - `scripts/prerender.cjs`
4. **Build output**
   - `dist/public/strategy/bts-2/index.html`

## Manual Checks

- Confirm the brief exists before page generation and is clearly the canonical downstream planning artifact.
- Compare contract -> BTS brief -> BTS page -> prerendered HTML for section parity and terminology alignment.
- Check that low-confidence or assumption-tagged material in the brief is not promoted into overconfident page claims.
- Inspect prerendered HTML directly to ensure important founder-facing strategy sections are present without JS execution.

## Core Evidence

- File paths and excerpts from Mind artifacts
- Terminal output from `npm run check`, `npm run build:client`, and `npm run build`
- Excerpts from generated TSX and emitted prerendered HTML
- Grep/check outputs for banned-term and parity validation where applicable

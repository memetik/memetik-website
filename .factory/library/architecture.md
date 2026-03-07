# Architecture

Canonical structure and source precedence for the strategy-generation-layer mission.

**What belongs here:** artifact roles, handoff boundaries, source precedence, and route/prerender invariants.

---

## Canonical Downstream Flow

`master reference -> strategy-generation contract -> company brief -> website strategy page`

The master reference stays as doctrine. The generation contract is a thin operational layer. The internal Mind brief is the canonical downstream planning artifact. The website page is a rendering layer derived from the brief.

## Artifact Roles

- `MEMETIK-2026-Strategy-Generation-Contract.md`
  - machine-readable doctrine distillation
  - canonical non-negotiables
  - terminology, caveat, and missing-input rules
- `client-strategy-brief-schema.yaml`
  - normalized internal brief structure
  - payload-to-brief mapping
  - evidence/gap handling
- `website-strategy-page-contract.md`
  - founder-facing rendering rules
  - required page sections/order
  - visual/content constraints for strategy pages

## Source Precedence

1. `MEMETIK-2026-AEO-Master-Reference.md`
2. strategy-generation contract
3. company brief schema + generated brief
4. website page contract
5. page-generation code and builder workflow

If lower layers conflict with higher layers, higher layers win.

## Invariants

- The website generator must not bypass the brief layer.
- The existing builder workflow must be updated, not silently bypassed by a second undocumented path.
- App route registration and prerender output must derive from the same canonical strategy-route source.
- Prerendered strategy HTML must contain meaningful strategy sections, not stub title/description shells.

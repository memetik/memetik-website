# Environment

Environment variables, paths, dependencies, and external requirements for the strategy-generation-layer mission.

**What belongs here:** output paths, repo/tooling facts, proxy dependency, payload/example locations.
**What does NOT belong here:** service start/stop commands or ports beyond high-level reference (use `.factory/services.yaml`).

---

- Working repo: `/Users/house/projects/agency/memetik-website`
- Mind output root: `/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/`
- Canonical upstream doctrine: `/Users/house/Mind/Areas/Agency/Lead-Magnets/MEMETIK-2026-AEO-Master-Reference.md`
- Existing generator: `scripts/research-pipeline/generate-strategy.cjs`
- Existing builder workflow: `.factory/droids/strategy-builder.md`
- Representative payload: `data/research/bts-2.json`
- Representative page: `client/src/pages/strategy/Bts2.tsx`
- Approved AI path: ChatGPT 5.4 via local cli proxy at `http://127.0.0.1:8327/v1` using proxy model id `gpt-5.4`
- Constraint: do not depend on Factory-backed worker spawning for AI execution
- Known validation caveat: prerender coverage currently drifts from route registration and must be fixed in this mission

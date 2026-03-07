---
name: website-strategy-worker
description: Integrates the strategy generation layer into the website pipeline and validates route/build/prerender outputs.
---

# Website Strategy Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the work procedure for generator code, builder workflow, routing, prerender, and BTS example validation in the website repo.

## When to Use This Skill

Use this skill for features that update `scripts/research-pipeline/`, `.factory/droids/strategy-builder.md`, `client/src/App.tsx`, `scripts/prerender.cjs`, generated strategy pages, or build-output validation related to the strategy-generation layer.

## Work Procedure

1. Read the mission files, repo `.factory/library/*.md`, the relevant Mind contract artifacts, and the exact website files in scope before editing.
2. Turn the feature's `fulfills` assertions into a checklist that names which code paths or output files prove each assertion.
3. When possible, add or tighten validation checks before changing the main generation path so failures are visible early (for example helper checks, route/prerender parity checks, or banned-term checks).
4. Update only the minimal set of repo files needed to make the contract -> brief -> page flow real. Do not preserve a second undocumented generation path.
5. Keep the local cli proxy path explicit and avoid any dependence on Factory-backed worker spawning.
6. After code changes, run the repo validators from the manifest:
   - `npm run check`
   - `npm run build:client`
   - `npm run build`
   - plus `python3 /Users/house/projects/agency/memetik-website/.factory/bin/verify_generation_contracts.py --mode full` when the BTS example is involved
7. Manually inspect the generated artifacts that matter for the feature: Mind brief, TSX page, route registration, and emitted prerendered HTML.
8. In the handoff, list the exact files changed, commands run, whether the route/prerender outputs matched, and any doctrine drift or caveat-preservation issues still unresolved.

## Example Handoff

```json
{
  "salientSummary": "Updated the generator and strategy-builder workflow to require the new contract + brief-first flow, then wired BTS through routing and prerender validation. The repo now builds cleanly and emits /strategy/bts-2 with meaningful prerendered HTML instead of a stub shell.",
  "whatWasImplemented": "Changed generate-strategy.cjs to load the new generation contract and consume a validated BTS brief before page generation. Updated .factory/droids/strategy-builder.md to the same flow, aligned client/src/App.tsx and scripts/prerender.cjs to a shared strategy-route source, and added output checks so dist/public/strategy/bts-2/index.html contains section-level founder-facing content.",
  "whatWasLeftUndone": "No remaining implementation gaps for the BTS validation path; future company scaling is left to later missions.",
  "verification": {
    "commandsRun": [
      {
        "command": "python3 /Users/house/projects/agency/memetik-website/.factory/bin/verify_generation_contracts.py --mode full",
        "exitCode": 0,
        "observation": "Contract artifacts, brief schema, and BTS example brief were all present and free of TODO/TBD markers."
      },
      {
        "command": "npm run check",
        "exitCode": 0,
        "observation": "TypeScript passed after generator, route, and prerender changes."
      },
      {
        "command": "npm run build:client",
        "exitCode": 0,
        "observation": "Client bundle succeeded and included the BTS strategy page chunk."
      },
      {
        "command": "npm run build",
        "exitCode": 0,
        "observation": "Full build and prerender completed; dist/public/strategy/bts-2/index.html was emitted."
      }
    ],
    "interactiveChecks": [
      {
        "action": "Read the BTS brief, BTS page TSX, and dist/public/strategy/bts-2/index.html.",
        "observed": "The brief and page shared the same wedge, delivery scope, and caveat language, and the prerendered HTML contained founder-facing strategy sections rather than only title text."
      }
    ]
  },
  "tests.added": [],
  "discoveredIssues": [
    {
      "severity": "medium",
      "description": "If a future company route is added without using the shared strategy-route source, route/prerender drift could return.",
      "suggestedFix": "Keep route and prerender generation centralized in one registry or helper."
    }
  ]
}
```

## When to Return to Orchestrator

- The local cli proxy is unavailable or generation requires a different model path than the approved one.
- Route/prerender alignment would require a broader architectural change than the current feature reasonably covers.
- The BTS payload is too incomplete to generate a valid brief without changing mission scope or upstream research rules.

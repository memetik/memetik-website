---
name: generation-contract-worker
description: Creates and refines the Mind-based generation contract, brief schema, and related doctrine artifacts for strategy generation.
---

# Generation Contract Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the work procedure for Mind doctrine artifacts and brief-schema work.

## When to Use This Skill

Use this skill for features that create or update the strategy-generation contract, website strategy page contract, brief schema/template, or example brief artifacts under `~/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation/`.

## Work Procedure

1. Read `mission.md`, `validation-contract.md`, `features.json`, mission `AGENTS.md`, repo `.factory/library/*.md`, and the canonical master reference before editing.
2. Translate the feature's `fulfills` assertions into a short checklist and map each assertion to the exact artifact/section you will create.
3. Read only the doctrine sources needed for the assigned artifact. Distill from the master reference; do not restate the entire doctrine in a second giant playbook.
4. For schema/template work, prefer fixed sections, explicit required fields, and explicit gap/blocking behavior over loose prose.
5. Preserve canonical terminology and non-negotiables. If you find drift, normalize it in the artifact rather than carrying it forward.
6. Re-read adjacent sections after edits to ensure the artifact is compact, deterministic, and usable by downstream generation code.
7. Run the relevant helper checks:
   - `python3 /Users/house/projects/agency/memetik-website/.factory/bin/verify_generation_contracts.py --mode contracts`
   - `python3 /Users/house/projects/agency/memetik-website/.factory/bin/verify_generation_contracts.py --mode brief` when the schema exists
8. Perform manual verification by reading the changed artifact and confirming each `fulfills` assertion with explicit evidence.
9. In the handoff, name the exact Mind artifact paths created/updated, what fixed-field or blocking rules were added, and any unresolved doctrine ambiguity.

## Example Handoff

```json
{
  "salientSummary": "Created the generation contract and website page contract under the new Strategy-Generation folder, locking source precedence, downstream flow, canonical terminology, and missing-input rules. Ran the contract verifier and manually confirmed the contracts explicitly separate internal brief rules from founder-facing page rules.",
  "whatWasImplemented": "Added MEMETIK-2026-Strategy-Generation-Contract.md and website-strategy-page-contract.md in the approved Mind path. The contract now defines the payload -> brief -> page lineage, fixed non-negotiables, source-trace/freshness handling, and fail-closed rules for weak or missing inputs. The page contract separately defines required public-page sections and transformation rules.",
  "whatWasLeftUndone": "The brief schema and BTS example brief still need to be authored in later features.",
  "verification": {
    "commandsRun": [
      {
        "command": "python3 /Users/house/projects/agency/memetik-website/.factory/bin/verify_generation_contracts.py --mode contracts",
        "exitCode": 0,
        "observation": "Both contract artifacts existed, were non-empty, and contained no TODO/TBD markers."
      }
    ],
    "interactiveChecks": [
      {
        "action": "Read the strategy-generation contract and website page contract in Mind.",
        "observed": "The contracts clearly identify the master reference as upstream, require the brief-first flow, and separate operator-only rules from founder-facing output rules."
      }
    ]
  },
  "tests.added": [],
  "discoveredIssues": [
    {
      "severity": "medium",
      "description": "If downstream generator code still hard-loads the old playbook as canonical input, website integration must explicitly remove that precedence in a later feature.",
      "suggestedFix": "Update generate-strategy.cjs and the strategy-builder workflow to require the new contract inputs."
    }
  ]
}
```

## When to Return to Orchestrator

- The master reference and mission requirements conflict in a way that changes source precedence or artifact roles.
- The needed artifact shape depends on website implementation details that are not yet understood well enough to keep the contract deterministic.
- Required Mind paths or doctrine sources are missing or unexpectedly unavailable.

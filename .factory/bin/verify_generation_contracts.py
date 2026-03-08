from __future__ import annotations

import argparse
import json
from pathlib import Path


ROOT = Path("/Users/house/Mind/Areas/Agency/Lead-Magnets/Strategy-Generation")
REPO_ROOT = Path("/Users/house/projects/agency/memetik-website")
CONTRACT = ROOT / "MEMETIK-2026-Strategy-Generation-Contract.md"
PAGE_CONTRACT = ROOT / "website-strategy-page-contract.md"
BRIEF_SCHEMA = ROOT / "client-strategy-brief-schema.yaml"
PORTABLE_BTS_BRIEF = REPO_ROOT / "content" / "strategy-briefs" / "BTS-Strategy-Brief.md"
APP_FILE = REPO_ROOT / "client" / "src" / "App.tsx"
BTS_PAGE = REPO_ROOT / "client" / "src" / "pages" / "strategy" / "Bts2.tsx"
BTS_HTML = REPO_ROOT / "dist" / "public" / "strategy" / "bts-2" / "index.html"
PRERENDER_SCRIPT = REPO_ROOT / "scripts" / "prerender.cjs"
STRATEGY_REGISTRY = REPO_ROOT / "shared" / "strategyRouteRegistry.json"


def must_exist(path: Path) -> None:
    if not path.exists():
        raise SystemExit(f"Missing required artifact: {path}")


def must_look_like_markdown(path: Path) -> None:
    text = path.read_text().strip()
    if not text:
      raise SystemExit(f"Artifact is empty: {path}")
    if "TODO" in text or "TBD" in text:
        raise SystemExit(f"Artifact still contains TODO/TBD markers: {path}")
    if path.suffix == ".md" and not text.startswith("#"):
        raise SystemExit(f"Markdown artifact should start with a heading: {path}")


def must_look_like_yaml(path: Path) -> None:
    text = path.read_text().strip()
    if not text:
        raise SystemExit(f"Artifact is empty: {path}")
    if "TODO" in text or "TBD" in text:
        raise SystemExit(f"Artifact still contains TODO/TBD markers: {path}")
    if ":" not in text:
        raise SystemExit(f"YAML artifact does not appear to contain key/value fields: {path}")


def must_contain_all(text: str, terms: list[str], *, label: str) -> None:
    lowered = text.lower()
    missing = [term for term in terms if term.lower() not in lowered]
    if missing:
        raise SystemExit(f"{label} is missing required parity terms: {', '.join(missing)}")


def must_exclude_all(text: str, terms: list[str], *, label: str) -> None:
    lowered = text.lower()
    present = [term for term in terms if term.lower() in lowered]
    if present:
        raise SystemExit(f"{label} still contains banned downstream terms: {', '.join(present)}")


def load_registry() -> dict:
    must_exist(STRATEGY_REGISTRY)
    return json.loads(STRATEGY_REGISTRY.read_text())


def resolve_registry_path(raw_path: str) -> Path:
    path = Path(raw_path)
    return path if path.is_absolute() else REPO_ROOT / path


def verify_bts_route_and_parity() -> None:
    registry = load_registry()
    routes = registry.get("routes", [])
    parity = registry.get("parity", {})
    internal_terms = parity.get("internalCanonicalTerms", [])
    public_required_terms = parity.get("publicRequiredTerms", [])
    banned_terms = parity.get("publicBannedTerms", [])
    required_html_sections = parity.get("requiredHtmlSections", [])

    bts_route = next((route for route in routes if route.get("slug") == "bts-2"), None)
    if not bts_route:
        raise SystemExit("Strategy route registry is missing the bts-2 entry")
    if bts_route.get("route") != "/strategy/bts-2":
        raise SystemExit("Strategy route registry has an unexpected route for bts-2")
    if resolve_registry_path(bts_route.get("briefPath", "")) != PORTABLE_BTS_BRIEF:
        raise SystemExit("Strategy route registry does not point bts-2 at the portable BTS brief snapshot")

    must_exist(APP_FILE)
    must_exist(PRERENDER_SCRIPT)
    must_exist(BTS_PAGE)
    must_exist(BTS_HTML)
    must_exist(PORTABLE_BTS_BRIEF)

    app_text = APP_FILE.read_text()
    prerender_text = PRERENDER_SCRIPT.read_text()
    contract_text = CONTRACT.read_text()
    brief_text = PORTABLE_BTS_BRIEF.read_text()
    page_text = BTS_PAGE.read_text()
    html_text = BTS_HTML.read_text()

    if "@shared/strategyRouteRegistry.json" not in app_text or ".routes.map" not in app_text:
        raise SystemExit("App router is not wired to the canonical strategy route registry")
    if "strategyRouteRegistry.json" not in prerender_text or "STRATEGY_REGISTRY.routes" not in prerender_text:
        raise SystemExit("Prerender script is not wired to the canonical strategy route registry")

    must_contain_all(contract_text, internal_terms, label="Strategy generation contract")
    must_contain_all(brief_text, internal_terms, label="Canonical BTS brief")
    must_contain_all(page_text, public_required_terms, label="BTS page TSX")
    must_contain_all(html_text, public_required_terms, label="Prerendered BTS HTML")

    must_exclude_all(page_text, banned_terms, label="BTS page TSX")
    must_exclude_all(html_text, banned_terms, label="Prerendered BTS HTML")
    must_contain_all(html_text, required_html_sections, label="Prerendered BTS HTML")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["contracts", "brief", "full"], default="contracts")
    args = parser.parse_args()

    must_exist(CONTRACT)
    must_exist(PAGE_CONTRACT)
    must_look_like_markdown(CONTRACT)
    must_look_like_markdown(PAGE_CONTRACT)

    if args.mode in {"brief", "full"}:
        must_exist(BRIEF_SCHEMA)
        must_look_like_yaml(BRIEF_SCHEMA)

    if args.mode == "full":
        must_exist(PORTABLE_BTS_BRIEF)
        must_look_like_markdown(PORTABLE_BTS_BRIEF)
        verify_bts_route_and_parity()

    print(f"Generation artifacts verified for mode: {args.mode}")
    if args.mode == "full":
        print("Parity verified for /strategy/bts-2 across contract -> brief -> page -> emitted HTML")


if __name__ == "__main__":
    main()

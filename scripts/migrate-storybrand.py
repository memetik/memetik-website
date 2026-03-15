#!/usr/bin/env python3
"""Migrate strategy page JSONs from old multi-section structure to StoryBrand 3-act structure."""

import json
import os
import sys
import copy

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE, "data", "strategy-content")

# Section ID -> which act it maps to
# "problem" = sections about state of search, current state, competitive gap, AI visibility gap
# "opportunity" = sections about opportunity, right to win, commercial impact
# "plan" = sections about growth plan, off-site authority, delivery scope, operating model
# "drop" = sections to drop (why-memetik gets folded into CTA, executive-summary removed)

SECTION_MAP = {
    # Problem act
    "state-of-search-2026": "problem",
    "where-behind-the-scenes-is-today": "problem",
    "where-bts-is-today": "problem",
    "where-hyro-is-today": "problem",
    "where-kinso-is-today": "problem",
    "current-state": "problem",
    "competitive-gap": "problem",
    "ai-visibility-gap": "problem",
    "competitive-landscape": "problem",
    "the-landscape": "problem",

    # Opportunity act
    "the-opportunity": "opportunity",
    "why-behind-the-scenes-can-win": "opportunity",
    "why-bts-can-win": "opportunity",
    "why-hyro-can-win": "opportunity",
    "why-kinso-can-win": "opportunity",
    "revenue-commercial-impact": "opportunity",
    "the-1b-gmv-thesis": "opportunity",
    "commercial-upside": "opportunity",
    "why-your-offer-can-win-on-the-gold-coast": "opportunity",
    "strategy-content-led-lead-gen-aeo": "opportunity",

    # Plan act
    "the-strategy": "plan",
    "the-playbook": "plan",
    "90-day-opening-move": "plan",
    "6-month-growth-plan": "plan",
    "six-month-growth-plan": "plan",
    "off-site-authority": "plan",
    "what-memetik-actually-builds-and-ships": "plan",
    "operating-model": "plan",
    "apac-defense": "plan",
    "execution-protocol": "plan",
    "what-to-expect": "plan",
    "what-we-will-launch-for-you": "plan",
    "choose-your-90-day-rollout": "plan",
    "full-funnel-revenue-engine-90-day-investment-breakdown": "plan",
    "what-goes-live-across-the-first-90-days": "plan",
    "how-revenue-keeps-strengthening-the-channel": "plan",
    "standard-install-scope": "plan",

    # Drop
    "executive-summary": "drop",
    "why-memetik": "drop",
    "what-i-need-from-bts": "drop",
    "commercial-terms": "drop",
    "next-steps": "drop",
}

HEADLINES = {
    "bts": "Creators are searching for tools. BTS isn't in the conversation.",
    "bts-2": "Serious creators need better tools. They can't find BTS yet.",
    "bts-3": "The creator economy is booming. BTS is invisible in it.",
    "drinkhyro": "Thousands search for electrolytes daily. Hyro doesn't show up.",
    "kinso": "Teams search for shared inbox tools. Kinso isn't in the results.",
    "uleads": "Leads are being searched for. ULeads is nowhere to be found.",
    "hot-water-funnel": "Gold Coast homeowners want heat pumps. They can't find you.",
}

SUBTITLES = {
    "bts": "Millions of creators search for monetization tools, link-in-bio platforms, and business solutions every month. Right now, BTS appears in none of those conversations — not in Google, not in ChatGPT, not in Gemini. This strategy shows how to change that.",
    "bts-2": "Creator-economy demand is exploding across search and AI answer engines. Right now, Behind the Scenes does not appear in any of those conversations. This strategy shows exactly how to change that.",
    "bts-3": "Creator-economy demand is exploding across search and AI answer engines. Right now, BTS does not appear in any of those conversations. This strategy shows exactly how to change that.",
    "drinkhyro": "Thousands of health-conscious consumers search for electrolyte drinks, hydration supplements, and recovery products every month. Right now, Hyro is invisible in those results. This strategy shows exactly how to change that.",
    "kinso": "Teams searching for shared inbox and collaborative email tools are choosing competitors because Kinso doesn't appear anywhere — not in Google, not in ChatGPT, not in Gemini. This strategy shows exactly how to change that.",
    "uleads": "Businesses looking for lead generation solutions can't find ULeads in search results or AI recommendations. This strategy shows exactly how to change that.",
    "hot-water-funnel": "Gold Coast homeowners searching for heat pump hot water systems are finding your competitors first. This strategy shows exactly how to capture that demand.",
}

FAILURE_BLOCKS = {
    "bts": {
        "eyebrow": "What happens if nothing changes",
        "heading": "The cost of staying invisible",
        "bullets": [
            "Every month without commercial pages is a month where creators choose competitor tools they can actually find.",
            "AI answer engines are training on the market right now — platforms absent today become harder to surface tomorrow.",
            "Competitors like Stan Store and Gumroad keep getting recommended while BTS has no indexed presence.",
            "The longer BTS waits, the more the creator-economy conversation gets defined by other platforms."
        ]
    },
    "bts-2": {
        "eyebrow": "What happens if nothing changes",
        "heading": "The cost of staying invisible",
        "bullets": [
            "Every month without commercial pages is a month where serious creators choose platforms they can actually find.",
            "AI answer engines are forming their recommendation patterns now — brands absent today get locked out tomorrow.",
            "Even modest competitors with indexed content will keep getting recommended over a platform with no search presence.",
            "The longer Behind the Scenes waits, the more the creator-tools narrative gets defined by other brands."
        ]
    },
    "bts-3": {
        "eyebrow": "What happens if nothing changes",
        "heading": "The cost of staying invisible",
        "bullets": [
            "Every month without commercial pages is a month where creators default to platforms they can actually find.",
            "AI answer engines are being trained on the current market — absence now means absence in future recommendations.",
            "Competitors with even basic search presence will keep appearing while BTS remains invisible.",
            "The creator economy conversation is being shaped right now by whoever shows up first."
        ]
    },
    "drinkhyro": {
        "eyebrow": "What happens if nothing changes",
        "heading": "The cost of staying invisible",
        "bullets": [
            "Every month without decision-stage pages is a month where buyers choose electrolyte brands they can actually find.",
            "AI answer engines are forming product recommendation patterns now — brands absent today get locked out tomorrow.",
            "Competitors like LMNT and Liquid IV keep getting recommended while Hyro has no indexed presence.",
            "The longer Hyro waits, the more the hydration conversation gets defined by other brands."
        ]
    },
    "kinso": {
        "eyebrow": "What happens if nothing changes",
        "heading": "The cost of staying invisible",
        "bullets": [
            "Every month without commercial pages is a month where teams choose inbox tools they can actually find.",
            "AI answer engines are forming their recommendation patterns now — tools absent today get locked out tomorrow.",
            "Competitors like Front, Missive, and Hiver keep getting recommended while Kinso has no indexed presence.",
            "The longer Kinso waits, the more the shared-inbox category gets defined by established players."
        ]
    },
    "uleads": {
        "eyebrow": "What happens if nothing changes",
        "heading": "The cost of staying invisible",
        "bullets": [
            "Every month without commercial pages is a month where businesses choose lead-gen providers they can actually find.",
            "AI answer engines are forming recommendation patterns now — providers absent today get locked out.",
            "Competitors with even basic search presence will keep appearing while ULeads remains invisible.",
            "The lead generation market is being defined right now by whoever shows up first."
        ]
    },
    "hot-water-funnel": {
        "eyebrow": "What happens if nothing changes",
        "heading": "The cost of staying invisible",
        "bullets": [
            "Every month without optimized pages is a month where homeowners choose heat pump installers they can actually find.",
            "AI answer engines are forming their local recommendation patterns now — businesses absent today get locked out.",
            "Competitors already ranking for Gold Coast heat pump queries will keep capturing the demand.",
            "The longer you wait, the more expensive it becomes to break into a market that others already own."
        ]
    },
}

SUCCESS_BLOCKS = {
    "bts": {
        "eyebrow": "What 12 months from now looks like",
        "heading": "BTS becomes the default answer for serious creators",
        "bullets": [
            "When creators search for monetization tools, link-in-bio alternatives, and business platforms, BTS shows up in Google, ChatGPT, and Gemini.",
            "The platform owns the decision-stage conversation — buyer guides, comparisons, and evaluation pages that shape creator choice.",
            "Third-party proof reinforces the same story across every surface creators research on.",
            "A defensible organic channel compounds instead of renting attention month after month."
        ]
    },
    "bts-2": {
        "eyebrow": "What 12 months from now looks like",
        "heading": "Behind the Scenes becomes the default recommendation",
        "bullets": [
            "When serious creators search for tools to build their business, Behind the Scenes shows up in Google results, ChatGPT recommendations, and Gemini answers.",
            "The brand owns the decision-stage conversation with buyer guides, comparisons, and evaluation pages.",
            "Third-party proof reinforces the same story across every surface where creators research tools.",
            "A defensible organic channel that compounds instead of renting attention."
        ]
    },
    "bts-3": {
        "eyebrow": "What 12 months from now looks like",
        "heading": "BTS becomes the platform creators recommend",
        "bullets": [
            "When creators search for tools to monetize their audience, BTS shows up in Google, ChatGPT, and Gemini.",
            "BTS owns the decision-stage conversation with commercial pages that shape how creators choose.",
            "Third-party proof reinforces the same commercial story everywhere creators look.",
            "A defensible organic position that compounds over time instead of requiring constant ad spend."
        ]
    },
    "drinkhyro": {
        "eyebrow": "What 12 months from now looks like",
        "heading": "Hyro becomes the default electrolyte recommendation",
        "bullets": [
            "When health-conscious consumers search for electrolyte drinks and hydration supplements, Hyro shows up in Google results, ChatGPT recommendations, and Gemini answers.",
            "The brand owns the decision-stage conversation — best-for lists, comparisons, and evaluation content that shapes buyer choice.",
            "Third-party proof reinforces the same story across every surface where buyers research hydration products.",
            "A defensible organic channel that compounds instead of renting attention from paid ads."
        ]
    },
    "kinso": {
        "eyebrow": "What 12 months from now looks like",
        "heading": "Kinso becomes the default shared inbox recommendation",
        "bullets": [
            "When teams search for shared inbox tools, collaborative email, and team communication solutions, Kinso shows up in Google results, ChatGPT recommendations, and Gemini answers.",
            "Kinso owns the decision-stage conversation with buyer guides, comparisons, and evaluation pages.",
            "Third-party proof reinforces the same commercial story across every surface where teams research tools.",
            "A defensible organic channel that compounds instead of renting attention."
        ]
    },
    "uleads": {
        "eyebrow": "What 12 months from now looks like",
        "heading": "ULeads becomes the go-to lead generation partner",
        "bullets": [
            "When businesses search for lead generation services, ULeads shows up in Google results and AI recommendations.",
            "ULeads owns the decision-stage conversation with commercial pages that shape buyer choice.",
            "Third-party proof reinforces the same story across every surface where businesses research providers.",
            "A defensible organic channel that compounds month after month."
        ]
    },
    "hot-water-funnel": {
        "eyebrow": "What 12 months from now looks like",
        "heading": "You become the default heat pump installer on the Gold Coast",
        "bullets": [
            "When Gold Coast homeowners search for heat pump hot water systems, your business shows up first in Google, Maps, and AI answers.",
            "You own the local decision-stage conversation with pages that answer every buyer question.",
            "Reviews, local citations, and community proof reinforce the same story everywhere homeowners look.",
            "A defensible local organic channel that generates leads without ongoing ad spend."
        ]
    },
}


def extract_sectionlead_as_prose(sections):
    """Convert sectionLead paragraphs from old sections into narrativeProse format."""
    prose = []
    for s in sections:
        sl = s.get("sectionLead", {})
        if not sl:
            continue
        # Use section heading as prose heading, body from sectionLead
        body_parts = []
        if sl.get("takeaway"):
            body_parts.append(sl["takeaway"])
        if sl.get("body"):
            body_parts.append(sl["body"])
        if sl.get("paragraphs"):
            body_parts.extend(sl["paragraphs"])
        if body_parts:
            prose.append({
                "heading": s.get("heading", ""),
                "body": " ".join(body_parts)
            })
    return prose


def collect_data_blocks(sections, block_type):
    """Collect all instances of a data block type from multiple sections."""
    result = []
    for s in sections:
        items = s.get(block_type, [])
        if items:
            if isinstance(items, list):
                result.extend(items)
            else:
                result.append(items)
    return result


def build_problem_section(sections, company):
    """Build the Problem section from problem-mapped sections."""
    prose = extract_sectionlead_as_prose(sections)
    
    # Collect data
    stack_cards = collect_data_blocks(sections, "stackCards")[:3]
    prompt_obs = collect_data_blocks(sections, "promptObservations")
    highlight_boxes = collect_data_blocks(sections, "highlightBoxes")[:1]
    platform_statuses = collect_data_blocks(sections, "platformStatuses")
    data_tables = collect_data_blocks(sections, "dataTables")

    section = {
        "id": "the-problem",
        "number": "01",
        "heading": "The Problem",
        "eyebrow": f"Where {company} stands today",
        "subtitle": f"{company} has category potential, but right now, buyers researching solutions in this space cannot find you — not in Google, not in ChatGPT, not in Gemini.",
    }

    if prose:
        section["narrativeProse"] = prose[:4]
    if stack_cards:
        section["stackCards"] = stack_cards
    if prompt_obs:
        section["promptObservations"] = prompt_obs
    if highlight_boxes:
        section["highlightBoxes"] = highlight_boxes
    if platform_statuses:
        section["platformStatuses"] = platform_statuses
    if data_tables:
        section["dataTables"] = data_tables

    return section


def build_opportunity_section(sections, company):
    """Build the Opportunity section from opportunity-mapped sections."""
    prose = extract_sectionlead_as_prose(sections)
    
    stack_cards = collect_data_blocks(sections, "stackCards")[:3]
    highlight_boxes = collect_data_blocks(sections, "highlightBoxes")[:1]

    section = {
        "id": "the-opportunity",
        "number": "02",
        "heading": "The Opportunity",
        "eyebrow": f"Why {company} can win — and what it is worth",
        "subtitle": f"The market has significant unbranded demand and {company} does not need to outspend incumbents — it needs to show up first where buyers are making decisions.",
    }

    if prose:
        section["narrativeProse"] = prose[:4]
    if stack_cards:
        section["stackCards"] = stack_cards
    if highlight_boxes:
        section["highlightBoxes"] = highlight_boxes

    # Look for upsideChart and calculator in source sections
    for s in sections:
        if s.get("upsideChart"):
            section["upsideChart"] = s["upsideChart"]
        if s.get("calculator"):
            section["calculator"] = s["calculator"]

    return section


def build_plan_section(sections, company):
    """Build the Plan section from plan-mapped sections."""
    month_blocks = collect_data_blocks(sections, "monthBlocks")
    scope_blocks = collect_data_blocks(sections, "scopeBlocks")
    stack_cards = collect_data_blocks(sections, "stackCards")[:3]
    highlight_boxes = collect_data_blocks(sections, "highlightBoxes")[:1]

    # Build a summary from section leads
    steps = []
    for s in sections[:3]:
        sl = s.get("sectionLead", {})
        if sl and sl.get("takeaway"):
            steps.append(sl["takeaway"])
        elif s.get("heading"):
            steps.append(s["heading"])

    section = {
        "id": "the-plan",
        "number": "03",
        "heading": "The Plan",
        "eyebrow": "How we get there",
        "subtitle": "Three phases. Own the decision stage. Reinforce it everywhere buyers look. Then expand into the broader market.",
        "sectionLead": {
            "takeaway": " ".join([f"Step {i+1}: {s}" for i, s in enumerate(steps[:3])]) if steps else "Step 1: Build the pages that answer buying questions. Step 2: Make the market hear the same story off-site. Step 3: Compound and defend."
        }
    }

    if month_blocks:
        section["monthBlocks"] = month_blocks
    if scope_blocks:
        section["scopeBlocks"] = scope_blocks
    if stack_cards:
        section["stackCards"] = stack_cards
    if highlight_boxes:
        section["highlightBoxes"] = highlight_boxes

    # Look for timelineChart
    for s in sections:
        if s.get("timelineChart"):
            section["timelineChart"] = s["timelineChart"]
            break

    return section


def migrate_file(slug):
    path = os.path.join(DATA_DIR, f"{slug}.json")
    with open(path) as f:
        data = json.load(f)

    company = data.get("company", slug)

    # Classify sections
    problem_sections = []
    opportunity_sections = []
    plan_sections = []
    
    for s in data["sections"]:
        sid = s["id"]
        act = SECTION_MAP.get(sid, "drop")
        if act == "problem":
            problem_sections.append(s)
        elif act == "opportunity":
            opportunity_sections.append(s)
        elif act == "plan":
            plan_sections.append(s)
        elif act == "drop":
            pass  # fold into CTA if needed
        else:
            print(f"  WARNING: unmapped section {sid} in {slug}")

    # Build new sections
    new_sections = []
    if problem_sections:
        new_sections.append(build_problem_section(problem_sections, company))
    if opportunity_sections:
        new_sections.append(build_opportunity_section(opportunity_sections, company))
    if plan_sections:
        new_sections.append(build_plan_section(plan_sections, company))

    # Update the data
    data["sections"] = new_sections
    
    # Update headline
    data["hero"]["headline"] = HEADLINES[slug]
    data["hero"]["subtitle"] = SUBTITLES[slug]
    
    # Remove executiveSummary
    data.pop("executiveSummary", None)

    # Add failureBlock and successBlock
    data["failureBlock"] = FAILURE_BLOCKS[slug]
    data["successBlock"] = SUCCESS_BLOCKS[slug]

    # Renumber appendix to 04 if present
    if data.get("appendix"):
        data["appendix"]["number"] = "04"

    # Write
    with open(path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    
    print(f"  Migrated {slug}: {len(data['sections'])} sections, headline={data['hero']['headline']!r}")
    return True


def main():
    targets = ["bts", "bts-2", "bts-3", "drinkhyro", "kinso", "uleads", "hot-water-funnel"]
    
    # Verify no unmapped sections
    for slug in targets:
        path = os.path.join(DATA_DIR, f"{slug}.json")
        data = json.load(open(path))
        for s in data["sections"]:
            if s["id"] not in SECTION_MAP:
                print(f"ERROR: Unmapped section '{s['id']}' in {slug}")
                sys.exit(1)
    
    for slug in targets:
        migrate_file(slug)

    print(f"\nDone. Migrated {len(targets)} files.")


if __name__ == "__main__":
    main()

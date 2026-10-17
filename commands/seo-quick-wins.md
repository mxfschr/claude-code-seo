---
description: Find quick-win SEO opportunities for a domain (Pos 4-15 + high impressions, with country-split truth and SERP validation)
argument-hint: "<domain or sc-domain:domain>"
---

You are running a SEO Quick-Wins audit for: **$ARGUMENTS**

This is based on the knowledge base (Sections 17, 19, 24):
- Quick wins live at Position 4-15 with high impressions
- GSC "Avg Position" lies — country-split is the truth
- A live SERP is one snapshot (rotation + personalization): use it for composition, not position (Section 13)
- CTR optimization only makes sense at Position 1-5 (Section 24)
- Republish candidates: Position 8-25 with KD<30 (Re-Eval Hack, Section 19)

## Execute in order

### Step 1: Pull GSC Quick Wins
Call `mcp__gsc__quick_wins` with:
- days=28
- min_impressions=100
- max_position=15
- Pass site_url override if $ARGUMENTS differs from the default GSC property

### Step 2: For each of top-5 Quick Wins, get country-split truth
For each candidate keyword, call `mcp__gsc__advanced_search_analytics`:
- dimensions=["country"]
- filters=[{dimension: "query", operator: "equals", expression: "<keyword>"}]
- order_by: impressions descending
- This reveals if the avg position is real or distorted by long-tail countries

Flag any candidate where US/main-market position is >10 positions worse than GSC avg → that's a "phantom ranking" not a quick win.

### Step 3: Market difficulty for top candidates
Call `mcp__dataforseo__dataforseo_labs_bulk_keyword_difficulty` with the top-5 keywords.
- KD < 30 = realistic push or Re-Eval Hack candidate (route to /seo-re-eval)
- KD 30-50 = needs more authority work
- KD > 50 = skip for now

### Step 4: SERP validation for top-1 candidate
Call `mcp__dataforseo__serp_organic_live_advanced` for the highest-priority keyword:
- search_engine: "google"
- location_name: "United States" (or your primary market)
- language_code: "en"
- depth: 20

Analyze the **composition**: Is there an AI Overview? Are competitors Reddit/Wikipedia/authority-sites? Which SERP features show (video, PAA)?

> **The snapshot is not position truth** (KB Section 13, "Rank readings are snapshots"). Google rotates results, in some SERPs hourly, and personalizes for logged-in users. Note where the domain shows up in this one reading, but if it disagrees with Step 2, the GSC 28-day country-split position wins. Never call a page "dropped" or "ranking" from a single live SERP.

### Step 5: Synthesize action recommendations
For each quick-win, recommend ONE specific action:
- **Title/Meta optimization** ONLY if domain is Position 1-5 in the main market (Section 24)
- **Content depth expansion** if at Position 4-10 with AI Overview competition
- **Internal link push** if at Position 6-15 and KD<40 (Section 17: route authority FROM high-click hub pages TO this one; never link TO pages already at Pos 1-3 or Pos 95+)
- **Re-Evaluation Republish** if Position 8-25 + KD<30 + page is >6 months old (route to /seo-re-eval)
- **Skip** if phantom ranking (avg distorted by tail countries)

> **7-day cooldown:** if a page was modified within the last 7 days, skip it this round — GSC needs time to register the change, and stacked edits make cause-and-effect unreadable.

> **Internal-link relevance gate (Sections 1 + 26.3 — required whenever you recommend an "Internal link push"):** a link only passes authority if it's topically relevant. Require ALL four: (1) **anchor + surrounding paragraph match the target's topic** (Reasonable-Surfer Topical-Match — off-topic links carry ~0 weight, even from a strong hub); (2) a **user-bridge** — people searching the source page's topic also plausibly search the target's (Section 1 Topical Bridges; adjacent topics are fine, unrelated ones are not); (3) a **descriptive 2-5-word anchor** (not "click here", not a bare keyword); (4) placed **mid-paragraph, in-content** (never footer/sidebar/nav). In the recommendation, name the exact source page, the anchor, and the one-line bridge rationale — never just "add an internal link".

## Output Format

Present as a scannable markdown table:

| Keyword | GSC Avg Pos | US Pos | Impressions | KD | Action | Priority |
|---|---|---|---|---|---|---|

Below table: 2-3 sentences explaining the SINGLE highest-leverage action.

Be honest: if 0 quick wins exist, say so. Don't manufacture opportunities.

## Cost
~$0.05 per audit (Labs bulk_keyword_difficulty + 1 SERP live).

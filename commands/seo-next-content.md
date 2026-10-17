---
description: Recommend the next 3-5 content pieces to publish with full publish plan (slug, title, outline, internal link plan in+out)
argument-hint: "<domain or sc-domain:domain>"
---

You are running a Content-Action audit for: **$ARGUMENTS**

This is the prescriptive sister to /seo-cluster-expand. The goal: produce a publish-ready plan. NOT diagnostic advice — concrete pieces with link wiring.

Methodology (knowledge base sections):
- Section 1: PageRank is a page-level system. Each new page needs authority routed TO it from existing strong pages.
- Sections 5+17: Internal links flow authority. Link FROM authority hubs (high clicks, Pos 1-3 for own keywords) TO pages that need a push (Pos 4-20). NEVER link to pages at Pos 1-3 (no help needed) or Pos 95+ (not ready).
- Section 9: Bottom-of-Funnel content prioritized over Top-of-Funnel. 400-800 words. "X vs Y" / "best X for Y" patterns convert better.
- Section 18: Thin Starter Pages — 200-400 words, publish, let GSC validate before expanding.
- Section 19: NavBoost 13mo-window — new pages get evaluated with current site authority.
- Section 20: pSEO templates if there's a data-source (locations, comparisons, alternatives).
- Section 26.3: siteRadius — don't write off-topic pages, they reduce site cohesion.

## Execute in order

### Step 0: Pull the product truth LIVE (fact-check source) — DO THIS FIRST
The product is what the site is SELLING — every page is Bottom-of-Funnel (Section 9: "why your business is the answer for this query"). To write conversion copy WITHOUT inventing capabilities, **run the live `/seo-product-facts` extraction now** — fresh from source, every run, no cache (a hand-maintained manifest goes stale):
- Auto-detect the sources: the product app repo + its `-website` sibling (e.g. `../acme` + the current `acme-website`). Read the high-signal files LIVE — `package.json` dependencies, pricing route/config, feature components + `app/api` routes, and `not-implemented`/TODO markers — exactly as `/seo-product-facts` specifies, with `file:line` provenance.
- Also read any existing `/vs/<competitor>` page in the website repo — already-published, fact-checked claims to reuse near-verbatim.
- Result: exact pricing, supported platforms/integrations, real features, **honest limitations** (the ❌ NOT-implemented list), per-competitor differentiators, audience pain points.
- **This live-extracted fact-sheet is the ONLY allowed source of product claims for the rest of this brief.** Code is the source of truth; any `FEATURE-MANIFEST.md` is a hint only and code wins on conflict. If no app/site repo is reachable, STOP and tell the user — do NOT guess features. (If the site is purely informational with no product, say so and skip the product-positioning blocks below.)

### Step 1: Map existing authority graph
Call `mcp__gsc__advanced_search_analytics`:
- dimensions=["page"]
- days=90
- order_by: clicks descending
- row_limit=50

This identifies **Authority Hubs** — pages with most clicks. These are the candidates to send internal links FROM (their authority transfers to linked pages).

Tag the top-5 pages as "primary hubs" — they will be the senders.

**Click-gate (hard rule):** a hub must have actual CLICKS — not just impressions or position. A page at Pos 4 with zero clicks in 28 days has no authority to donate. And **new pages need ~28 days of GSC data before they qualify as senders**: publish → wait → only pages with confirmed clicks become link sources. Never wire links FROM unproven pages.

### Step 2: Identify almost-there pages (link RECIPIENTS)
Call `mcp__gsc__advanced_search_analytics`:
- dimensions=["query", "page"]
- days=90
- order_by: impressions descending
- row_limit=100

Filter: Pos 4-20 (the "fast lane" per Section 17). These pages need authority routed TO them.

### Step 3: Identify topical bridges
Look at the queries that drive traffic to authority hubs. What are the dominant themes? List 3-5 topical clusters with strongest existing authority signal.

### Step 4: Find cluster-expansion candidates
For each strong cluster, call in parallel:
- `mcp__dataforseo__dataforseo_labs_google_related_keywords` (seed = cluster's main keyword, limit=50)
- `mcp__dataforseo__dataforseo_labs_google_keyword_ideas` (keywords=[cluster main], limit=50)

Then `mcp__dataforseo__dataforseo_labs_search_intent` on merged list.

### Step 5: Difficulty + cannibalization check
For top-20 candidates per cluster (highest volume + best intent match):
- `mcp__dataforseo__dataforseo_labs_bulk_keyword_difficulty`
- Cross-check against Step 2 output: are we ALREADY ranking for variations? If yes, the candidate is a target for the EXISTING page (route to /seo-quick-wins), not a new page.

### Step 6: SERP-type validation for surviving candidates
For each surviving candidate (top 5-10), call `mcp__dataforseo__serp_organic_live_advanced` (depth=10, primary market).

Check the SERP composition:
- If 6+ results are blog/comparison/listicle → write a blog post or comparison
- If 6+ results are category/product/landing pages → build a landing page, NOT a blog
- If AI Overview dominates + Reddit/Wiki in top 3 → very hard, deprioritize or use as MoF only
- If clear gap (no good result in top 5) → priority candidate

### Step 7: Build publish plan

For each of the final 3-5 recommendations, output a complete brief:

**Brief format per recommendation:**

```
## #1: [Keyword]
**Volume**: X/mo  |  **KD**: Y  |  **Intent**: informational/commercial  |  **Funnel**: BoF/MoF/ToF

### What to publish
- **URL Slug**: /blog/[slug] or /alternatives/[slug] or /[parent]/[slug] (keyword core only: drop words Google already infers, e.g. `/trip-to-como`, not `/how-to-enjoy-a-day-at-lake-como-italy`; one keyword = one page on the domain, Section 5)
- **Title Tag** (150-220 chars per Section 5): "Primary keyword - secondary intent variant - tertiary - Brand"
- **H1**: [exact keyword phrasing for max query match]
- **Meta Description**: [120-160 chars, but Google rewrites anyway — fine to skip per Section 8]
- **Word count target**: 400-800 (Section 9 BoF range) or 200-400 (Section 18 Thin Starter)
- **Document type**: blog post / comparison / landing page / alternative roundup
- **First paragraph**: Direct answer to query (Featured Snippet bait per Section 16)

### Outline (H2 structure)
1. [Direct answer / definition]
2. [Comparison or list, depending on SERP composition]
3. [Edge cases / "What about X"]
4. [Decision criteria — when to choose what]
5. [CTA + product mention if commercial]

### PAA satellite pages (Section 15)
From the Step 6 SERP call, list the People-Also-Ask questions for this keyword. Each question = its OWN ~120-word page — exact-match title/slug/H1, NO FAQ accordion on the main page — linking back to this page. List 3-5: question → `/faq/[slug]`. For low-authority sites this is the cheapest topical-authority surface available.

### Product positioning (fact-checked — the conversion layer, from Step 0)
This is what turns an info-page into a sale. Every claim traces to the fact-sheet.
- **Comparison tables MUST include a [Product] column/row** with REAL specs (price, platforms, features) — never blank, never invented. For "X vs Y" topics, add [Product] as the third option AND the recommended pick, truthfully (e.g. "X is heavy, Y is subscription — [Product] is web-based, one-time price").
- **"Why [Product] for [this query/audience]"**: map the searcher's pain (use the fact-sheet's quoted pain points) to 2-3 REAL features that solve it. Documented capabilities only.
- **Honesty converts (Section 22 + the fact-sheet's own rule):** state the real limitation where relevant ("[competitor] supports more platforms; [Product] covers the 6 most common = 95% of use cases"). Honest framing builds trust and avoids false claims propagating through LLMs.
- **CTA:** the actual offer with the real number (e.g. "$X once · self-hosted · MIT license") and a real link. Not "learn more".

### Internal Link Plan IN (authority flowing TO this page)
- **From**: [Hub Page URL] (current Pos 1-3 for [keyword]) → anchor: "[descriptive 2-5 word phrase, not 'click here']"
  - Location: middle of paragraph about [topic-bridge to new page]
- **From**: [Secondary Hub URL] → anchor: "[anchor variant]"
- **From**: [Topic-adjacent existing page] → anchor: "[anchor]"

(Section 17: max 3 internal links pointing in is plenty for early-stage push; source them from topically-relevant hubs — outbound links don't cost a hub its own rank, but each one thins its authority flow, so keep hub outlinks few and on-topic)

### Internal Link Plan OUT (this page sends authority to)
- **To**: [Existing money page that needs Pos 4-15 push] → anchor: "[descriptive anchor]"
- **To**: [Other adjacent cluster page] (sibling link)

Rules applied:
- NO link to current Pos 1-3 pages (they don't need it, would just dilute this page's outgoing authority)
- NO link to Pos 95+ pages (not ready, authority would evaporate)
- Max 2-3 outbound internal links from a new BoF page (Section 17 — targeted, not generous)

### Expected outcome (with proper linking)
- Indexed: 1-2 weeks
- Initial position: typically 20-40 for KD<30, 40-70 for KD 30-50
- 4-8 week target: Pos 10-15 if linking is executed
- 13-week target (NavBoost window): Pos 5-10 if cluster authority is real

### Cluster fit
This page strengthens which existing pages? (Section 1: page-level authority — the cluster gets stronger as we add pieces around it)
```

### Step 8: Final priority order

Sort the 3-5 recommendations by:
1. **ROI** = Search Volume × (1 / KD) × Intent-Conversion-Multiplier (commercial=3, informational=1)
2. **Cluster reinforcement** — does this strengthen an already-winning cluster? Bonus +1 to ROI ranking
3. **Link-graph health** — does it close a gap (orphan page exists but has no inbound links)? Bonus +1

Present top recommendation as "do this first", then descending.

## Output Format

```
## Content Action Plan for <domain>

### Current Authority Snapshot
- Top 3 Hubs: [URLs with click counts]
- Top 3 Clusters: [topic labels with combined impressions]
- Almost-there pages (Pos 4-20): N pages totaling X monthly impressions

### Recommendations (priority order)
[Brief blocks per Step 7 format above, ranked]

### Cross-Cutting Internal Link Audit
Existing pages that should be updated to add the new internal links once new content is live:
| Source URL | Add link to | Anchor text | Where in content |
```

## Cost
~$0.15 per audit (heavier DataForSEO usage: 2 cluster expansions + 5-10 SERP live + intent + KD batch).

## Operating rules
- BE CONCRETE. No "consider exploring this topic". Always: "write THIS page with THIS title".
- BE HONEST. If 0 high-confidence recommendations exist, say so — don't manufacture.
- If the domain has <10 ranked queries total, recommend `/seo-cluster-expand` first to build initial cluster before doing prescriptive briefs.
- **FACT DISCIPLINE (non-negotiable).** Product claims come ONLY from the Step 0 fact-sheet. Never invent a feature, never promise a roadmap item as a current capability, never change pricing/licensing, never claim security beyond what's documented. If the fact-sheet marks something ❌ NOT-implemented, do not claim it. When in doubt, omit. Writing nonsense about the product is worse than writing nothing.

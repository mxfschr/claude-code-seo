---
description: Authority-first "new analysis" — derives your proven ranking ceiling from GSC, then recommends 3-5 next topics that expand from authority you ALREADY have (no DR gate)
argument-hint: "<domain or sc-domain:domain>"
---

You are running an **Authority-First Content Analysis** for: **$ARGUMENTS**

This is the orchestrating front door for the whole `/seo-*` suite: it maps your proven authority and routes you to the right deep-dive command.

## The core idea: proven authority, not domain pessimism

Most SEO tools gate keyword selection on a single domain number (a rule like `KD ≤ DR × 0.7 + 10`). That contradicts the knowledge base:
- **Sections 1 / 25 / 26.3:** Authority is **page- and topic-level**, proven by actual ranking + clicks (NavBoost/Echo). "DA/DR is a homepage assumption, NOT inherited by every page."
- **Proof in the data:** a DR-~20 site can rank **Pos 5 for a KD-36 keyword** inside a cluster where it has topical authority. A DR gate would label that "longterm" and never recommend it — i.e. it would reject the site's best page.

So this command **does not gate on DR**. It measures what you've *already proven you can rank for*, and expands from there. DR is used **only** as a cold-start prior when there's almost no GSC history (see Step 2).

Methodology anchors (knowledge base): Section 1 (topical authority + bridges), Sections 5+17 (internal-link authority flow), Section 7 (Beachhead — GSC reveals the real keyword universe), Section 9 (BoF > ToF, 400-800w — **every pick is a conversion play: the page positions the product as the answer, fact-checked against a LIVE pull of the product's code (`/seo-product-facts`), never invented**), Section 18 (Thin Starter), Section 19 (Re-Evaluation / NavBoost 13mo), Section 24 (CTR as authority signal).

**Product-first framing:** if this site sells a product, every page is a conversion play, not an info blog. When recommending picks, note for each how the product wins the query (BoF angle) — but the actual product claims get grounded later in the brief by a LIVE `/seo-product-facts` pull of the app + website code (auto-detected siblings, never cached). Do not invent capabilities here either.

## Execute in order

### Step 1 — Pull the proven footprint (GSC, 90d)
Call `mcp__gsc__advanced_search_analytics` (pass `site_url` if $ARGUMENTS differs from the default):
- dimensions=["query","page"], days=90, order_by=impressions, order_direction=descending, row_limit=200

Split the rows into three buckets by position:
- **Owned** (Pos ≤ 7): proven wins — these define your authority.
- **Striking distance** (Pos 7.01–20, impressions ≥ 30): one push from the top — highest ROI.
- **Latent** (Pos 20–50, impressions ≥ 50): topical traction, not yet competitive.

If the site has **< 15 Owned queries total**, it's effectively cold-start → skip Step 2's ceiling, fall back to the DR prior (`KD ≤ DR×0.7+10`, fetch DR via `mcp__dataforseo__dataforseo_labs_google_domain_rank_overview`), and tell the user this is a cold-start run.

### Step 2 — Compute the PROVEN AUTHORITY CEILING (the key step)
Take the top ~25 **Owned** queries (Pos ≤ 7) by impressions and call `mcp__dataforseo__dataforseo_labs_bulk_keyword_difficulty` on them.

- **Site ceiling** = the highest KD at which you have **≥ 2** Pos-≤7 rankings. (Use ≥2 so a single fluke doesn't set the bar.) This is your empirical, honest "DR" — what you've *demonstrably* ranked for.
- Report it explicitly: *"Proven ceiling: KD {N} — you already rank top-7 for {example keyword} (KD {N})."*

This number replaces the DR threshold for the rest of the run.

**Position proves the ceiling; clicks prove authority.** A page at Pos ≤ 7 with zero clicks over the window still informs the ceiling (it demonstrates rankability), but it is NOT an authority source — never plan internal links FROM click-less pages (the click-gate in `/seo-next-content` enforces this).

### Step 3 — Cluster the footprint into authority centers
Group Owned + Striking-distance queries into 3–6 topical clusters (by shared head terms / entities — e.g. for a database-tool product: "X vs Y db tool", "pgadmin/dbeaver alternative", "<db> client", "<tool> pricing").

For each cluster compute a **cluster ceiling** = highest KD with ≥2 top-7 wins *in that cluster* (fall back to the site ceiling if <2 examples). Comparison/alternative clusters often punch far above the site average — that's the whole point.

### Step 4 — Generate candidates from four streams
Run these in parallel:

**(a) Quick-Win Push** — directly from the Striking-distance bucket (Step 1). No API cost. These are keywords you already rank Pos 8–20 for.

**(b) Bridge Expansion** — for each authority center, call `mcp__dataforseo__dataforseo_labs_google_related_keywords` (seed = cluster's strongest keyword, location_name="United States", language_code="en", limit=60). These are the adjacent keywords you don't own yet (Section 1 bridges).

**(c) Content Gap** — optionally call `mcp__gsc__content_gaps` and/or seed `mcp__dataforseo__dataforseo_labs_google_keyword_ideas` from cluster heads to surface terms competitors rank for and you don't.

**(d) Competitor Brand × Differentiator** (Section 9; only if the site sells a product with named competitors). Searches for a competitor's brand plus a modifier that competitor doesn't serve are BoF traffic with almost no competition.
- **Competitors:** brands that appear in your Owned/Striking-distance queries ("X vs Y", "X alternative") plus any `/vs/<competitor>` page in the website repo. Take the top 3 by impressions.
- **Differentiators:** run the `/seo-product-facts` extraction for sections B (pricing), C (platforms) and G (per-competitor differentiators) only. Code-verified facts only, never invent one.
- For each competitor call `mcp__dataforseo__dataforseo_labs_google_keyword_suggestions` (keyword = competitor brand, location_name="United States", language_code="en", limit=100).
- **Keep** suggestions whose modifier matches a verified differentiator (platform: "windows", "linux", "web", "online"; model: "lifetime", "one time", "free", "open source", "self hosted"; a feature the competitor lacks) plus the generic BoF modifiers "alternative", "vs", "pricing", "cheaper". **Drop** navigational noise (login, download, support, crack, careers) and any modifier your product doesn't really cover.
- These are BoF by definition. Run them through the same Step 5 filter: they usually land far below the ceiling.

Merge, dedupe, drop keywords you already Own (Pos ≤ 7 — covered) and obvious off-topic noise (keywords sharing no entity/term with any authority center — this is the niche filter the lightweight commands lack).

### Step 5 — Authority-first realism filter (NOT a DR gate)
Get KD for the merged candidates via `mcp__dataforseo__dataforseo_labs_bulk_keyword_difficulty` (chunk if >100). Mark each candidate **REALISTIC** if **any** of these hold:
1. KD ≤ its cluster ceiling + 5 (headroom), OR
2. you already rank Pos ≤ 20 for it (proximity proof — you're in the SERP already), OR
3. it's clearly an adjacent variant of an Owned query (same entities, "vs"/"alternative"/"pricing" of a tool you already rank for).

Everything else → **PARK** (genuinely above your proven reach — needs more cluster authority first). Do **not** silently drop parked items; surface the count and the single biggest one so the user sees what's gated and why.

### Step 6 — Score & validate the realistic candidates (keep the good parts)
For the realistic set, apply (cheap, no per-keyword AI):
- **Funnel (Section 9):** BoF (vs / alternative / pricing / best / "for X") > MoF > ToF. BoF wins ties.
- **Intent / CPC:** higher CPC = stronger commercial intent = higher priority.
- **SERP validation** — for the top ~5 only, call `mcp__dataforseo__serp_organic_live_advanced` (location "United States", depth 10): if 6+ results are commercial/comparison → confirm BoF + decide doc type (blog vs landing vs comparison); if AI-Overview + Reddit/Wiki dominate → deprioritize.
- **SERP composition adjusts the ceiling per keyword.** The flat ceiling is a prior; the live SERP is the posterior. KD 20 against 8 genuine topical authorities is harder than KD 36 where positions 4-8 are Reddit threads and generic listicles. Count the top 10: 4+ weak slots (forums, UGC, thin listicles) → treat effective difficulty one tier easier; wall-to-wall niche authorities → one tier harder, regardless of what KD says.
- **Cannibalization:** if a realistic candidate is just a variant of a Striking-distance query → it's NOT a new page, it's a push on the existing page (route to that page, Section 5 "Pos 9-11 = integrate as H2").
- **Freshness (Section 19):** year-sensitive terms ("best", "vs", current year) → current year in title/slug.

### Step 7 — Diversify into 3–5 recommendations
Pick a deliberately diverse set:
1. **Quick-Win Push** — best Striking-distance keyword (already Pos 8–20). Lowest effort, fastest result.
2. **Bridge Expansion** — best realistic new keyword adjacent to a strong cluster. Grows the footprint.
3. **Content Gap / Authority Builder** — best realistic keyword from a *different* cluster (diversify the topical surface).
4. **Competitor Gap** (product sites only): the best stream (d) keyword, competitor brand + a modifier your product verifiably covers. State the differentiator and its `file:line` source.
5. Next best of any type.

Also flag (route, don't fully expand here):
- **Re-Evaluation** candidates (Owned-cluster pages now at Pos 8–25, >6 mo old) → "run `/seo-re-eval`".
- If a cluster is deep and templatable (locations/tools/alternatives) → note pSEO potential (Section 20), but only where each page has its own data or inventory. Search volume alone as the reason = scaled content abuse (Section 10).

## Output Format

```
## Authority Analysis — <domain>

### Proven authority (what the data says you can do)
- **Proven ceiling: KD {N}** (you rank top-7 for "{kw}" at KD {N}) — this, not DR, is the bar.
- Owned: {n} queries Pos ≤7 · Striking distance: {n} (Pos 8-20) · Latent: {n}
- Authority centers: [cluster A (ceiling KD x)] · [cluster B (ceiling KD y)] · ...

### Do next (priority order)
For each of 3-5 picks:

#### #1 · [Keyword]  —  [Quick-Win Push | Bridge Expansion | Content Gap | Competitor Gap]
**Why this**: [proven-authority reason, e.g. "you rank Pos 11 for it / KD 34 ≤ cluster ceiling 36 — within proven reach"]
Vol X/mo · KD Y (ceiling Z) · Funnel BoF · {already Pos N | new page}
**Plan**: slug `/...` · Title (150-220c) "..." · doc type {blog|comparison|landing|thin-starter} · {word target}
**Link IN** (authority TO this page): from [hub Pos 1-3 for "kw"] → anchor "..." (Section 17: not from Pos 1-3-for-this, not to Pos 95+)
**Link OUT**: to [Pos 4-15 page needing push] → anchor "..."

### Parked (above proven reach — revisit after cluster grows): {count}
- biggest: "{kw}" (KD {n} > ceiling {m}) — needs {what} first

### Deep-dive handoffs
- Full brief for a pick → `/seo-next-content`  ·  Quick wins detail → `/seo-quick-wins`  ·  Republish → `/seo-re-eval`  ·  Cannibalization → `/seo-cannibal`  ·  LLM fan-out → `/seo-llm-audit`
```

After the table, offer: *"Say `brief 2` and I'll generate the full publish-ready brief for pick #2 (using the `/seo-next-content` format) — product-grounded by a LIVE `/seo-product-facts` pull from your app + website code (every run, no cache), so every comparison carries a truthful [Product] column and a real CTA, never invented features."*

## Cost
~$0.12-0.24 per run (1-2 bulk_keyword_difficulty batches + 1-2 related_keywords + ~5 SERP live, plus ~$0.02 per competitor for stream (d), max 3). GSC calls are free. Comparable to one `/seo-next-content`, but covers the whole site instead of one cluster.

## Operating rules
- **NEVER gate on DR.** The proven ceiling (Step 2) is the only difficulty bar. DR appears only in explicit cold-start runs (<15 Owned queries).
- **Lead with the proof.** Every recommendation states the authority evidence ("you already rank Pos N" / "KD ≤ cluster ceiling"), not a generic score.
- **BE CONCRETE.** "Write THIS page with THIS title", never "consider exploring".
- **BE HONEST.** If there are 0 realistic expansions beyond your proven reach, say so and pivot the advice to link-building / DR growth — don't manufacture picks.
- **Don't re-derive what a sub-command does better.** This is the map; route to `/seo-quick-wins`, `/seo-re-eval`, `/seo-cannibal`, `/seo-next-content` for depth.

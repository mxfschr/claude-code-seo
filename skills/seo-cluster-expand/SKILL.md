---
name: seo-cluster-expand
description: "Scouts the semantic neighborhood of a seed keyword with DataForSEO and Search Console and sorts it into three buckets: push an existing page, write a thin starter page, or skip. Use when the user enters a new topic, wants keyword ideas around a seed keyword, or asks how to build topical authority in a cluster."
argument-hint: "<seed-keyword> [domain]"
---

You are running Topical Cluster Expansion for seed keyword: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the seed keyword and wait for the answer.

Background (Sections 1, 5, 7, 18 of the knowledge base):
- Topical Authority builds by ranking, getting clicks, expanding into adjacent topics
- "Topical Bridges" exist: queries that overlap in user behavior even if semantically distant
- Don't write 2000-word articles for unproven keywords — use Thin Starter Pages (200-400 words) and let GSC tell you what to expand

If second argument is provided, treat it as the target domain. Otherwise use the default GSC property.

<!-- state-protocol:start -->
## State: seo/{domain}/

This skill keeps state in `seo/{domain}/` inside the current working directory. `{domain}` is the domain argument lowercased, with `sc-domain:`, `https://`, `http://`, a leading `www.` and any trailing `/` removed (`sc-domain:Example.com` becomes `example.com`). Two files live there, both markdown tables:

- `log.md`, written only by `/seo-log`. Header: `| Date | Page | Query | Action | Change | Why | Baseline | Revisit | Result | Outcome |`
- `backlog.md`, written by every skill that recommends work. Header: `| ID | Added | Skill | Page | Query | Action | Note | Status |`

Action is one of: `title`, `content`, `internal-link`, `republish`, `merge`, `new-page`, `tech-fix`, `evaluate`. Status is one of: `open`, `done`, `dropped`. Outcome is one of: `pending`, `gain`, `no-gain`, `loss`. Dates are YYYY-MM-DD.

**Before the first step:**
1. Read `seo/{domain}/log.md` and `seo/{domain}/backlog.md` if they exist. A missing folder or file is not an error: continue without it.
2. **Cooldown (7 days).** A page with a `log.md` row dated within the last 7 days is cooling down. Recommend no action on it and use it as no link source this run; list it under "Cooling down" with the date it is free again (row date + 7 days).
3. **Tried twice, stop.** When `log.md` has 2 or more rows for the same Page and Action with Outcome `no-gain` or `loss`, do not recommend that Action for that Page again. List it under "Stopped: tried twice without gain" with both dates.
4. **Revisits due.** Count the `log.md` rows with Outcome `pending` and a Revisit date on or before today.

**After the output:**
5. Append each recommendation of this run to `backlog.md` as one row: ID = `B` plus the next number (highest existing ID + 1, first row `B1`), Added = today, Skill = this skill's name, Page = full URL (`new` for a page that does not exist yet), Query = target query or `-`, Action from the list for this skill below, Note = at most 100 characters, Status = `open`. Replace any `|` inside a value with `/`. Skip a recommendation when an `open` row with the same Page (for `new`: the same Query) and the same Action already exists, and write "already in backlog as B7" (that row's ID) next to it in the output.
6. If `seo/{domain}/` does not exist yet, create it and `backlog.md` with the header row and the separator row `|---|---|---|---|---|---|---|---|`. When this run created the folder and the working directory is a git repository where `git check-ignore -q seo/` exits non-zero, add this line to the output: "Note: seo/ holds Search Console numbers. If this repository is public, add seo/ to .gitignore."
7. End the output with these lines: if the count from rule 4 is above 0, "N change(s) are due for review: run `/seo-log review {domain}`." Then always: "State: " followed by the absolute path of `seo/{domain}/`.
<!-- state-protocol:end -->

**State in this skill:** The domain is the second argument. Without it, skip every State rule for this run and say so in one line. Backlog actions: Bucket A → `internal-link` (Page = the existing page to push, Query = the keyword); Bucket B → `new-page` (Page `new`, Query = the keyword); Bucket C → no row.

## Execute

### Step 1: Get the semantic candidate pool
Run in parallel:
- `mcp__dataforseo__dataforseo_labs_google_related_keywords` (seed = first arg, location_name="United States", language_code="en", limit=100)
- `mcp__dataforseo__dataforseo_labs_google_keyword_ideas` (keywords=[seed], location_name="United States", language_code="en", limit=100)

Merge into one candidate list, deduplicate.

### Step 2: Classify intent
Call `mcp__dataforseo__dataforseo_labs_search_intent` for the merged list (chunk if >50).

Keep only:
- **informational** (good for topical authority + Thin Starter Pages)
- **commercial** (good for BoF / "X vs Y" / "best X" pages)

Drop "navigational" (brand searches) and "transactional" (typically converted by existing pages, not topical expansion).

### Step 3: Find what we already cover
Call `mcp__gsc__advanced_search_analytics`:
- dimensions=["query"]
- filter the candidate list via regex (limit to ~20 of the most interesting; if list bigger, sample by impressions)
- days=90
- This tells us which cluster keywords we're ALREADY ranking for (even Pos 50+)

### Step 4: Difficulty for unranked candidates
For candidates we DON'T already rank for, call `mcp__dataforseo__dataforseo_labs_bulk_keyword_difficulty`.

### Step 5: Three-bucket output

Sort candidates into:

**Bucket A — Push existing**: Already ranking Pos 6-30 for these. KD<40. Internal link push from authority pages (Section 17). Highest ROI. **Relevance gate (Sections 1 + 26.3):** only link where the anchor + surrounding paragraph match the target topic AND a user-bridge exists (source-topic searchers also plausibly search the target); descriptive 2-5-word anchor, placed mid-paragraph, never footer/nav — off-topic links carry ~0 weight even from a strong hub.

**Bucket B — Thin Starter Page candidates**: Not ranking yet. KD<25. Search volume >50/mo. Section 18 protocol: 200-400 word draft, publish, watch GSC for 2-4 weeks, expand only if traction.

**Bucket C — Skip / Park**: KD>50 (need more authority first), OR informational intent but already over-saturated SERP (AI Overview + Reddit + Wiki dominant).

## Output Format

Three markdown tables, one per Bucket, with Keyword, Position (where ranking), Impressions, Volume, KD, Intent.

Below: 1-paragraph cluster strategy summary. What's the topical story we'd tell with these new pages? What's the natural Hub URL we should create or already have?

## Cost
~$0.10 per cluster expansion (Labs related/ideas/intent/difficulty calls).

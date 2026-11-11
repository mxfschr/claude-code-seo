---
name: seo-cannibal
description: "Detects keyword cannibalization in Search Console (several pages of one domain competing for the same query), tells real conflicts from normal SERP rotation and recommends merge, canonical, noindex or differentiation per conflict. Use when the user asks about cannibalization, pages competing with each other, or two URLs swapping for one keyword."
argument-hint: "<domain or sc-domain:domain>"
---

You are running a Cannibalization audit for: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the domain (or GSC property) and wait for the answer.

Background (Sections 1, 5, 26.6 of the knowledge base):
- Each page accumulates its own authority — multiple pages claiming the same keyword block each other
- Embedding-similarity >=0.85 between competing pages = real duplicate, not just keyword overlap
- Resolution priorities: 301 merge > canonical > noindex > content differentiation

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

**State in this skill:** Backlog actions: 301 merge → `merge` (Page = the loser URL); canonical or noindex → `tech-fix` (Page = the loser URL); differentiation → `content` (Page = the page that changes); accept → no row. Cooldown (rule 2) applies to master and loser pages: a conflict where either page is cooling down is listed but gets no action this run.

## Execute

### Step 1: Pull all cannibalization conflicts
Call `mcp__gsc__cannibalization_check`:
- days=28
- min_impressions=50

If no results: report cleanly that no cannibalization exists with current thresholds. Don't manufacture findings.

### Step 2: Categorize each conflict

For each conflict, identify the **Master Page** (best candidate to consolidate to):
- Highest clicks
- Best position
- Best title-query match
- Most internal links pointing to it (if data available via GSC advanced_search_analytics with page dimension)

The other competing pages are **Loser Pages**.

### Step 3: Pattern-detect the conflict type

Common patterns to detect:
- **Anchor-fragments** (e.g. `/blog/x` vs `/blog/x#section`): Both rank for same query. Page = same. Solution: header IDs not crawled as separate pages — server-side rewrite h2 IDs or use data-nosnippet.
- **Filter-parameters** (e.g. `/?city=austin` vs `/`): Server-side noindex on parameter URLs OR convert to canonical routes (`/jobs/austin`).
- **Topical near-duplicates** (e.g. `/blog/best-pgadmin-alternatives` vs `/blog/best-postgresql-client`): Real competition between articles. Resolve by intent differentiation or 301 to master.
- **Brand variants** (e.g. all subpages rank for own brand): Expected behavior, not a problem. Skip.
- **SERP rotation (NOT cannibalization)**: pages alternating in the SERP over time, one visible at a time, combined visibility stable. Normal Google behavior — NO action needed. Only treat as true cannibalization when both pages are suppressed simultaneously (combined impressions sag while neither holds the position either page reached alone). Check the 28-90d trend before recommending any 301 — misclassifying rotation causes unnecessary redirects.

### Step 4: Action plan per conflict

For each non-trivial conflict, output the master URL, loser URLs, pattern type, recommended action (301 / noindex / differentiation / accept), and estimated impact (high/medium/low).

## Output Format

Markdown table for the conflicts, sorted by combined impressions descending:

| Query | Combined Imp. | Master | # Losers | Pattern | Action |
|---|---|---|---|---|---|

Below: prioritized fix list (top 3 by impact).

Be specific: if pattern is "anchor-fragment", give the exact CSS/HTML fix. If "filter-param", show the noindex meta-tag syntax.

## Cost
~$0 (GSC API is free).

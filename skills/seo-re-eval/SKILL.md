---
name: seo-re-eval
description: "Finds old pages worth a re-evaluation republish: position 8 to 25, keyword difficulty under 30, first seen more than 6 months ago, in a cluster that has grown since. Adds a topic gap matrix against the top results and a 301 plan. Use when the user asks which old posts to refresh, update or republish, or why an older page is stuck on page 2."
argument-hint: "<domain or sc-domain:domain>"
---

You are running a Re-Evaluation Hack audit for: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the domain (or GSC property) and wait for the answer.

Background (Sections 19, 26.3 of the knowledge base):
- NavBoost uses a 13-month rolling click-data window (Pandu Nayak sworn DOJ testimony)
- Pages published when cluster was small got evaluated with old authority — never re-evaluated
- Republish under new URL + 301 from old = Google evaluates with current authority
- Target: pages at Pos 8-25 with KD<30 where you've built more cluster authority since publish

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

**State in this skill:** Backlog action: every surviving candidate → `republish` (Page = current URL, Query = its top query). Cooldown (rule 2) and tried twice (rule 3) apply to the current URL.

## Execute

### Step 1: Identify candidate range (Pos 8-25)
Call `mcp__gsc__advanced_search_analytics`:
- dimensions=["query", "page"]
- order_by: impressions descending
- days=90 (longer window for trend confidence)
- row_limit=100

Filter results to Pos 8-25 inclusive in your post-processing.

### Step 2: Group by page URL
Multiple queries may point to the same page. Aggregate per page: sum impressions, list of queries, weighted-avg position.

Keep only pages where total impressions across all queries >= 200/mo (otherwise re-eval ROI too low).

### Step 3: Difficulty check on the highest-volume query per page
For each candidate page's top query, call `mcp__dataforseo__dataforseo_labs_bulk_keyword_difficulty`.

Filter: KD < 30.

### Step 4: Discovery date check
For each surviving candidate, call `mcp__gsc__inspect_url` with the page URL.
- Extract discovered_date (when Google first found the URL)
- If discovered_date is < 6 months ago: skip (not enough time for cluster authority growth)
- If discovered_date is > 6 months ago: strong republish candidate

### Step 4b: Topic gap matrix
For the 3 surviving candidates with the most impressions, build the topic gap matrix below with the candidate's top query as the keyword and its current URL as our ranking page.

<!-- topic-gap-matrix:start -->
#### Topic gap matrix (no word counts)
1. Take the top 5 organic results for the keyword from this run's `mcp__dataforseo__serp_organic_live_advanced` call for it. If this run has none for the keyword, call it once (search_engine "google", location_name "United States" or the primary market, language_code "en", depth 10). Skip results from the domain itself and from reddit.com, quora.com, youtube.com and wikipedia.org, and take the next organic result instead.
2. Call `mcp__dataforseo__on_page_content_parsing` (enable_javascript false) on each of the 5 URLs and on our ranking page. A call that errors marks that URL "not readable"; continue with the others and name it under the matrix.
3. For each page, turn its H2 and H3 headings (the `##` and `###` lines of the parsed markdown) into short topic labels, one label per distinct question the section answers. Merge labels that mean the same across pages.
4. Build one table: a row per topic, a column per result plus `Us`, ✓ where the page covers the topic, and a Priority column. **High**: 4 or 5 of the 5 cover it and we don't. **Medium**: 2 or 3 cover it and we don't. **Low**: 1 covers it and we don't. **Only us**: we cover it and none of them does; keep it, it is our angle.
5. Never count, compare or recommend word counts or page length (KB Section 16: Google is content agnostic; a page wins by answering more of the searcher's questions, not by being longer). Never propose schema markup, an FAQ accordion, a "last updated" line or LSI terms as a gap fix (KB Myths #1, #6 and #10; Section 15 gives each PAA question its own page).
6. Turn every High and Medium row into one sentence: the question the page must answer and where it goes (a new H2, or which existing section).
<!-- topic-gap-matrix:end -->

### Step 5: Output republish plan

For each surviving page give: current URL, suggested new URL (year-bump or topic-clarification), primary keyword, current position, total monthly impressions, KD, age, estimated lift (based on position curve, e.g. Pos 15 to Pos 5 = 5-8x traffic).

## Output Format

Markdown table sorted by est. lift descending.

Below: 301-redirect rule examples (for nginx/Cloudflare) and a republish checklist:
1. Create new URL with improved content: the High and Medium rows of the topic gap matrix (Step 4b), plus year-bump and modernized tone
2. Set 301 from old URL to new URL
3. Update internal links to point at new URL
4. Wait 4-8 weeks for NavBoost re-evaluation
5. Track in GSC

## Cost
~$0.05 per audit, plus up to 3 SERP calls and 18 On-Page content parsing calls (billed per page) for the topic gap matrices.

## Important warnings
- DO NOT republish pages at Pos 1-5 (already winning, don't break it)
- DO NOT republish without 301 (loses external backlinks)
- DO NOT republish without content improvement (Google detects stale rewrites)

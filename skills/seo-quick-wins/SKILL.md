---
name: seo-quick-wins
description: "Finds quick-win keywords for a domain: queries at position 4 to 15 with real impressions, checked against the country split (phantom rankings), keyword difficulty and the live SERP, with one concrete action each and a topic gap matrix where content is missing. Use when the user asks for quick wins, low-hanging fruit, keywords close to page one, or how to move a page from page 2 to page 1."
argument-hint: "<domain or sc-domain:domain>"
---

You are running a SEO Quick-Wins audit for: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the domain (or GSC property) and wait for the answer.

This is based on the knowledge base (Sections 17, 19, 24):
- Quick wins live at Position 4-15 with high impressions
- GSC "Avg Position" lies — country-split is the truth
- A live SERP is one snapshot (rotation + personalization): use it for composition, not position (Section 13)
- CTR optimization only makes sense at Position 1-5 (Section 24)
- Republish candidates: Position 8-25 with KD<30 (Re-Eval Hack, Section 19)

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

**State in this skill:** Backlog actions: Title/Meta optimization → `title`; Content depth expansion → `content`; Internal link push → `internal-link`; Re-Evaluation Republish → `republish`; Skip → no row. The 7-day check in Step 5 reads `log.md` (rule 2). Rule 3 applies per page and action: when it blocks the action Step 5 would pick, recommend the next applicable action, or Skip.

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
- **Title/Meta optimization** ONLY if domain is Position 1-5 in the main market (Section 24). Controlled title tests worth trying (KB Section 28.2, SearchPilot): "Updated" wording instead of month + year, an always-current price instead of a static one. Frame them as tests with a change-log entry, not as sure wins
- **Content depth expansion** if at Position 4-10 with AI Overview competition
- **Internal link push** if at Position 6-15 and KD<40 (Section 17: route authority FROM high-click hub pages TO this one; never link TO pages already at Pos 1-3 or Pos 95+)
- **Re-Evaluation Republish** if Position 8-25 + KD<30 + page is >6 months old (route to /seo-re-eval)
- **Skip** if phantom ranking (avg distorted by tail countries)

> **7-day cooldown:** a page with a `log.md` row from the last 7 days is skipped this round (State, rule 2). GSC needs time to register each change, and stacked edits make cause-and-effect unreadable.

> **Internal-link relevance gate (Sections 1 + 26.3 — required whenever you recommend an "Internal link push"):** a link only passes authority if it's topically relevant. Require ALL four: (1) **anchor + surrounding paragraph match the target's topic** (Reasonable-Surfer Topical-Match — off-topic links carry ~0 weight, even from a strong hub); (2) a **user-bridge** — people searching the source page's topic also plausibly search the target's (Section 1 Topical Bridges; adjacent topics are fine, unrelated ones are not); (3) a **descriptive 2-5-word anchor** (not "click here", not a bare keyword); (4) placed **mid-paragraph, in-content** (never footer/sidebar/nav). In the recommendation, name the exact source page, the anchor, and the one-line bridge rationale — never just "add an internal link".

### Step 6: Topic gap matrix for Content depth expansion
For each keyword whose action is Content depth expansion (at most 2 per run, highest impressions first), build the topic gap matrix below. "Our ranking page" is the page that ranks for the keyword in Step 2.

<!-- topic-gap-matrix:start -->
#### Topic gap matrix (no word counts)
1. Take the top 5 organic results for the keyword from this run's `mcp__dataforseo__serp_organic_live_advanced` call for it. If this run has none for the keyword, call it once (search_engine "google", location_name "United States" or the primary market, language_code "en", depth 10). Skip results from the domain itself and from reddit.com, quora.com, youtube.com and wikipedia.org, and take the next organic result instead.
2. Call `mcp__dataforseo__on_page_content_parsing` (enable_javascript false) on each of the 5 URLs and on our ranking page. A call that errors marks that URL "not readable"; continue with the others and name it under the matrix.
3. For each page, turn its H2 and H3 headings (the `##` and `###` lines of the parsed markdown) into short topic labels, one label per distinct question the section answers. Merge labels that mean the same across pages.
4. Build one table: a row per topic, a column per result plus `Us`, ✓ where the page covers the topic, and a Priority column. **High**: 4 or 5 of the 5 cover it and we don't. **Medium**: 2 or 3 cover it and we don't. **Low**: 1 covers it and we don't. **Only us**: we cover it and none of them does; keep it, it is our angle.
5. Never count, compare or recommend word counts or page length (KB Section 16: Google is content agnostic; a page wins by answering more of the searcher's questions, not by being longer). Never propose schema markup, an FAQ accordion, a "last updated" line or LSI terms as a gap fix (KB Myths #1, #6 and #10; Section 15 gives each PAA question its own page).
6. Turn every High and Medium row into one sentence: the question the page must answer and where it goes (a new H2, or which existing section).
<!-- topic-gap-matrix:end -->

## Output Format

Present as a scannable markdown table:

| Keyword | GSC Avg Pos | US Pos | Impressions | KD | Action | Priority |
|---|---|---|---|---|---|---|

Below table: 2-3 sentences explaining the SINGLE highest-leverage action.

For each Content depth expansion: its topic gap matrix and the High and Medium sentences as the to-do list.

Be honest: if 0 quick wins exist, say so. Don't manufacture opportunities.

## Cost
~$0.05 per audit (Labs bulk_keyword_difficulty + 1 SERP live), plus up to 2 SERP calls and 12 On-Page content parsing calls (billed per page) when Content depth expansion gets a topic gap matrix.

---
name: seo-competitor-watch
description: "Tracks which pages competitors newly rank with. Snapshots each competitor's top pages from DataForSEO Labs into seo/{domain}/competitors/, compares them with the last run and routes the keywords worth a page to /seo-quick-wins or /seo-next-content. Use when the user asks what competitors published, which of their pages started ranking, or wants a monthly competitor check."
argument-hint: "<domain or sc-domain:domain> [competitor1,competitor2,...]"
---

You are running a competitor watch for: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the domain (or GSC property) and wait for the answer.

Data: DataForSEO Labs and Search Console. Use no other source: no sitemap fetches, no WebFetch.

Why rankings, not sitemaps: a sitemap shows what a competitor published, not what Google rewards (KB Section 23: sitemaps don't decide indexing). DataForSEO Labs shows which of their pages rank and for how many keywords. A page that newly ranks, or one that gained many keywords, is the signal worth acting on. Labs data refreshes about monthly, so run this monthly.

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

**State in this skill:** Rules 2 and 3 do not apply: this skill recommends no change to an existing page. Backlog actions: every Step 5 route → `evaluate`. Snapshots live in `seo/{domain}/competitors/`.

## Execute in order

### Step 1: The competitor list
Use the first source that has competitors:
1. The second argument (comma-separated domains). Write them to `seo/{domain}/competitors/list.md`, replacing its content.
2. `seo/{domain}/competitors/list.md`.
3. `mcp__dataforseo__dataforseo_labs_google_competitors_domain` (target = the domain, location_name "United States" or the primary market, language_code "en", exclude_top_domains true). Drop the domain itself and every domain whose `full_domain_metrics.organic.count` is above 100000 (platforms such as github.com or stackoverflow.com that rank for everything). Take the first 5 remaining domains, write them to `list.md` and tell the user they can edit that file.

`list.md` format: the first line `# Competitors: {domain}`, then one line `- competitor.com` per domain. At most 5 competitors per run; with more in the list, take the first 5.

### Step 2: Snapshot
For each competitor call `mcp__dataforseo__dataforseo_labs_google_relevant_pages` (target = the competitor, location_name and language_code as in Step 1, limit 100, order_by ["metrics.organic.etv,desc"]). Write `seo/{domain}/competitors/<competitor>/<YYYY-MM-DD>.json` with today's date (a second run on the same day overwrites it), in this shape:

```json
{"competitor": "competitor.com", "date": "YYYY-MM-DD", "location": "United States", "pages": [{"url": "<page_address>", "keywords": 0, "etv": 0.0, "top10": 0, "new_keywords": 0}]}
```

`keywords` = `metrics.organic.count`, `etv` = `metrics.organic.etv`, `top10` = `pos_1` + `pos_2_3` + `pos_4_10`, `new_keywords` = `metrics.organic.is_new`. A missing field counts as 0.

### Step 3: Compare
Previous = the snapshot in the same folder with the latest date before today. Without one, report "Baseline saved for <competitor>; the comparison starts with the next run (monthly)." and skip this competitor in Steps 3 to 5.
- **New**: a URL in today's snapshot that is not in the previous one. It newly ranks among their top 100 pages; that does not prove it was published recently.
- **Grown**: a URL in both whose keywords are now at least 1.5 times the previous count and at least 10 more.
- **Dropped**: a URL in the previous snapshot that is gone today. Report the count only.

### Step 4: What the new and grown pages rank for
Take the New and Grown pages of all competitors, highest etv first, at most 10. For each call `mcp__dataforseo__dataforseo_labs_google_ranked_keywords` (target = the page URL with `https://`, location_name and language_code as in Step 1, limit 5, order_by ["keyword_data.keyword_info.search_volume,desc"]) and keep the keywords.

### Step 5: Do we cover it?
Call `mcp__gsc__advanced_search_analytics` twice (pass site_url when the domain differs from the default property):
- dimensions=["query","page"], days=90, row_limit=500, filters=[{dimension:"query", operator:"includingRegex", expression: the Step 4 keywords joined with `|`, regex special characters escaped}]
- dimensions=["query"], days=90, row_limit=200, order_by="impressions" (the site's own query vocabulary, for the niche filter)

Per keyword:
- we rank at position 10 or better: covered, no action
- we rank 11 to 30: route to `/seo-quick-wins` (backlog `evaluate`, Page = our ranking page, Query = the keyword)
- we don't rank, or worse than 30: route to `/seo-next-content` (backlog `evaluate`, Page `new`, Query = the keyword), but only when the keyword shares at least one word, other than stop words, with the site's top 200 queries. Otherwise list it as "off-topic for this site" with no backlog row.

Whether a new page is worth writing is decided in `/seo-next-content` (SERP validation, difficulty against the proven ceiling, unique-angle gate). This skill only routes.

## Output Format

Per competitor, a heading `### competitor.com` and a table:

| Page | Status | Keywords (before → now) | Top keywords | Our position | Route |
|---|---|---|---|---|---|

Status is New or Grown; for New, "before" is `-`. Then "Dropped: N pages". A competitor without a previous snapshot gets the baseline line instead of a table. Then the closing lines of State, rule 7.

If nothing changed: "No new or grown pages since <previous date>." Don't manufacture findings.

## Cost
~$0.10 to $0.25 per run: 1 competitors call on the first run only, up to 5 relevant pages calls, up to 10 ranked keywords calls. Search Console calls are free.

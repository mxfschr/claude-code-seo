---
name: seo-log
description: "Keeps the SEO change log for a domain in seo/{domain}/log.md. Records a page change with its Search Console baseline and a revisit date 90 days out; review mode measures the result and marks each change gain, no-gain or loss. Use when the user changed a page for SEO, says they did a recommendation, or asks which SEO changes worked."
argument-hint: "<domain> <page-url or backlog ID> <action> <what changed> because <why>, or: review <domain>"
---

You are keeping the SEO change log for: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the domain, the page, the action and what changed, and wait for the answer.

Why this exists (KB Section 28.1, Edward Sturm): without a change log you can't tell which change moved a page, and the 7-day cooldown and the "tried twice, stop" rule in the other skills have nothing to check. Every change gets a Search Console baseline now and a measured result about 3 months later.

## Files

State lives in `seo/{domain}/` inside the current working directory. `{domain}` is the domain argument lowercased, with `sc-domain:`, `https://`, `http://`, a leading `www.` and any trailing `/` removed.

- `log.md`. Header row: `| Date | Page | Query | Action | Change | Why | Baseline | Revisit | Result | Outcome |`, separator row: `|---|---|---|---|---|---|---|---|---|---|`.
- `backlog.md`, written by the other skills. Header row: `| ID | Added | Skill | Page | Query | Action | Note | Status |`.

Action is one of: `title`, `content`, `internal-link`, `republish`, `merge`, `new-page`, `tech-fix`. Outcome is one of: `pending`, `gain`, `no-gain`, `loss`. Dates are YYYY-MM-DD. Replace any `|` inside a value with `/`.

## Mode 1: record a change (default)

### Step 1: Read the arguments
From the arguments take: the domain; the page (a full URL, a path, which gets `https://{domain}` in front, or a backlog ID like `B7`); the action; what changed; why. An optional target query may follow the page in quotes. If any of domain, page, action, what changed or why is missing, ask for exactly the missing ones in one message and wait.

With a backlog ID: read that row in `seo/{domain}/backlog.md` and take Page, Query and Action from it (an action the user named wins). If the ID is not in the file, say so and ask for the page and the action. If the row's Page is `new`, ask for the URL the new page got. If the row's Action is `evaluate`, ask which action was actually done.

### Step 2: Baseline from Search Console
For Action `new-page` the Baseline is `n/a`; skip the call. Otherwise call `mcp__gsc__advanced_search_analytics` with days=28 (pass site_url when the domain differs from the default property):
- with a Query: dimensions=["query","page"], filters=[{dimension:"page", operator:"equals", expression:<page URL>}, {dimension:"query", operator:"equals", expression:<query>}]
- without: dimensions=["page"], filters=[{dimension:"page", operator:"equals", expression:<page URL>}]

If that returns no row, repeat once with operator "contains" and the URL path as the page expression. Baseline = the position rounded to one decimal, then ` / `, then the clicks (for example `8.4 / 37`). No row after the retry: `n/a`.

### Step 3: Cooldown check
If `log.md` has a row for the same Page dated within the last 7 days, still record this change, and add to the output: "This page was also changed on <that date>. Both changes now share one measurement (7-day rule)."

### Step 4: Write
Create `seo/{domain}/` and `log.md` with its header and separator rows if they don't exist. Append one row: Date = today, Page, Query (or `-`), Action, Change (at most 120 characters), Why (at most 120 characters), Baseline, Revisit = today + 90 days, Result = `-`, Outcome = `pending`.

With a backlog ID: set that row's Status in `backlog.md` to `done` and change nothing else in the file.

### Step 5: Output
Show the row you wrote, then: "Revisit on <Revisit date>: run `/seo-log review {domain}`." If `seo/{domain}/` was created in this run and the working directory is a git repository where `git check-ignore -q seo/` exits non-zero, add: "Note: seo/ holds Search Console numbers. If this repository is public, add seo/ to .gitignore." End with "State: " and the absolute path of `seo/{domain}/`.

## Mode 2: review (`/seo-log review <domain>`)

### Step 1: Find what is due
Read `seo/{domain}/log.md`. If it does not exist, say "No change log for {domain} yet." and stop. Due rows: Outcome `pending` and Revisit on or before today. If there are none, say "Nothing due." plus the earliest Revisit date among pending rows (or "No pending changes.") and stop.

### Step 2: Measure
For each due row, make the same call as Mode 1, Step 2 (same Page, same Query, days=28). Result = `position / clicks` in the Baseline format, or `n/a`.

### Step 3: Outcome
Read Baseline as base_pos / base_clicks and Result as res_pos / res_clicks. Apply the first rule that matches:
1. Baseline `n/a`: `gain` if res_pos is 20 or better, else `no-gain`.
2. Result `n/a` (the page lost all impressions): `loss`.
3. pos_delta = base_pos minus res_pos (positive means better). Clicks count only when base_clicks or res_clicks is 10 or more; then click_ratio = res_clicks / max(base_clicks, 1).
4. `gain` if pos_delta is 1.0 or more, or if clicks count, click_ratio is 1.2 or more and pos_delta is above -1.0.
5. `loss` if pos_delta is -1.0 or less, or if clicks count, click_ratio is 0.8 or less and pos_delta is below 1.0.
6. Otherwise `no-gain`.

### Step 4: Write back
In each reviewed row change only Result and Outcome. Leave every other row and cell as it is.

### Step 5: Output
A table of the reviewed rows (Date, Page, Action, Baseline, Result, Outcome), then the count per Outcome. Then "Tried twice without gain": every Page and Action with 2 or more rows whose Outcome is `no-gain` or `loss`; the other skills stop recommending that action for that page. Close with two reading notes:
- "A 28-day position is an average over all countries and devices; it is comparable here because baseline and result are measured the same way."
- "90 days can cross a seasonal swing. Before crediting a change, compare with the site's overall clicks over the same period; for a real test, change a group of similar pages and keep a control group (KB Section 28.1)."

End with "State: " and the absolute path of `seo/{domain}/`.

## Rules
- Search Console is the only data source.
- Never edit or delete log rows, except Result and Outcome in review mode.
- Never mark a backlog row `done` without writing its log row.

## Cost
$0. Search Console calls are free.

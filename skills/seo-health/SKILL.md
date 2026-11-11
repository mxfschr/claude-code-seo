---
name: seo-health
description: "Technical health and indexing check for a domain, from Search Console and DataForSEO On-Page: error status codes, internal links that redirect, canonicals pointing elsewhere, pages no other page links to in the content, missing titles and H1s, content that only appears after JavaScript, and the index status of linked pages that never get impressions. Use when the user asks for a technical SEO audit, site health, indexing problems or crawled, not indexed."
argument-hint: "<domain or sc-domain:domain>"
---

You are running a technical health and indexing check for: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the domain (or GSC property) and wait for the answer.

Data: Search Console (free) and DataForSEO On-Page (`on_page_instant_pages`, `on_page_content_parsing`). Use no other fetcher: no WebFetch, no curl.

What the knowledge base says this check is for (Section 23):
- Indexing follows authority. "Crawled, currently not indexed" and "Discovered, currently not indexed" are authority problems: the fix is an in-content link from a page that gets clicks, never a sitemap resubmit, a manual GSC submit or an indexing API.
- Google renders JavaScript (SSR is not mandatory), but it spends rendering only on pages with enough authority, and LLM fetchers read the raw HTML. Content that exists only after JavaScript is a risk, not an error.
- A manual GSC submit is right in two cases only: after removing a noindex, and after changing a page's content so the SERP shows the new version.
- Pages are discovered inside other pages. A page no other page links to in its content depends on a sitemap Google may not read.

Not checked on purpose, with the reason:
- Page speed and Core Web Vitals (KB Myth #5)
- Schema markup (KB Myth #1, Section 7)
- Title length (KB Section 5: long title tags carry several intent variants)
- Meta descriptions (a CTR lever only at position 1 to 5, handled by `/seo-quick-wins`; KB Section 24)
- Word count and readability scores (KB Section 16)
- XML sitemaps (KB Section 23)
- llms.txt (KB Myth #11, Section 28.2)

DataForSEO On-Page returns several of these (for example `checks.title_too_long`, `page_timing`, `onpage_score`, the readability indexes, `plain_text_word_count`). Ignore them and never report them as findings.

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

**State in this skill:** Rules 2 and 3 do not apply: technical errors are bugs and are never held back by the cooldown. Backlog actions are listed per finding in Step 7.

## Execute in order

### Step 1: The pages Google shows
Call `mcp__gsc__advanced_search_analytics`: dimensions=["page"], days=90, order_by="impressions", order_direction="descending", row_limit=500 (pass site_url when the domain differs from the default property). This list is G. If G is empty, say "Search Console shows no pages for this property in the last 90 days." and stop.

### Step 2: Parse the top pages
C = the first 50 pages of G (all of them if G has fewer). For each page in C call `mcp__dataforseo__on_page_content_parsing` (enable_javascript false). From the returned markdown keep:
- the in-content links: every markdown link `[anchor](url)` whose host is the domain, with or without `www.`. Normalize each URL: lowercase the host, drop the `#fragment`, drop a trailing `/` except on the homepage.
- whether the markdown has an H1 line (a line starting with `# `), and the length of the markdown in characters.

A call that errors marks the page "not parsed"; it still gets Steps 3 and 5.

### Step 3: Status, canonical, title, H1
N = the internal link targets from Step 2 that are not in G (linked from the top pages, no impressions in 90 days). Keep the 50 that are linked from the most pages of C. For each page in C and N call `mcp__dataforseo__on_page_instant_pages` (enable_javascript false). Use only these fields of `items[0]`: `status_code`, `url` (the final URL after redirects), `meta.title`, `meta.htags.h1`, `meta.canonical`.

### Step 4: Content that needs JavaScript
Candidates: the first 10 pages of C, plus at most 2 more pages of C whose URL contains `pricing`. For each candidate where Step 2 found no H1 line or fewer than 300 characters, call `mcp__dataforseo__on_page_content_parsing` again with enable_javascript true. If the rendered version has an H1 that the raw one lacks, or at least 3 times the characters, the page's content appears only after JavaScript.

### Step 5: Index status
Call `mcp__gsc__inspect_url` for every page in C and N (at most 100 calls). Record the verdict, the coverage state, the user-declared canonical and the Google-selected canonical. If a call fails or returns no verdict, the page's index status is "not verified". Never write "indexed" for a page unless its inspection says so; pages of G that were not inspected are "had impressions in the last 90 days".

### Step 6: Findings
Build the findings from Steps 2 to 5:

| Finding | Rule | Severity | Fix |
|---|---|---|---|
| Error status | `status_code` 400 or higher, or the inspection reports not found, soft 404 or server error | High | Remove or repoint every link to it (name the linking pages from Step 2). If the URL had impressions, 301 it to the closest live page. |
| Unintended noindex | inspection: excluded by noindex | High if the page is in G, else Medium | If unintended: remove the noindex, then request indexing for this URL once in GSC (KB Section 23: removing a noindex needs a page-by-page submit). |
| Blocked by robots.txt | inspection: blocked by robots.txt | High if the page is in G, else Medium | If unintended: fix the robots.txt rule. |
| JavaScript-only content | Step 4 | High for a pricing page, else Medium | Put the main content into the server HTML (at least the H1 and the first paragraph, and the prices on a pricing page). Google may render it later; LLM fetchers won't. |
| Redirecting internal link | the requested URL and `url` differ after normalizing | Medium | Point the link on each linking page straight at the final URL. |
| Canonical points elsewhere | `meta.canonical` is set and, normalized, is not the page's own final URL | Medium | Intended for a duplicate or parameter URL: keep. Otherwise point it at the page itself. |
| Google chose another canonical | inspection: the Google-selected canonical differs from the user-declared one | Medium | Two pages claim one topic: run `/seo-cannibal`. |
| Not indexed | inspection: crawled or discovered, currently not indexed | Medium | Authority, not crawling (KB Section 23): one in-content link from a page with clicks in the last 28 days, topically relevant, descriptive anchor, mid-paragraph. No sitemap resubmit, no manual submit, no indexing API. |
| Missing title | `meta.title` is empty | Medium | Write a title that mirrors the page's main query (KB Section 16). |
| Content orphan | a page of C, not the homepage, that no other page of C links to in its content | Medium | One in-content link from a relevant page of C that gets clicks. Only the top 50 pages were parsed, so a link from a page outside C may exist; say so. |
| Missing H1 | `meta.htags.h1` is empty | Low | Add one H1 with the page's main query phrasing. |
| Duplicate titles | 2 or more pages of C with the same `meta.title` | Low | One query, one page (KB Section 5): run `/seo-cannibal`. Duplicate content is not a penalty (KB Myth #8). |

### Step 7: Backlog rows
Error status, unintended noindex, blocked by robots.txt, JavaScript-only content, missing title, missing H1 → `tech-fix` (Page = the page). Redirecting internal link and canonical points elsewhere → `tech-fix` (Page = the page to edit: the linking page, or the page with the canonical). Not indexed and content orphan → `internal-link` (Page = the page that needs the link). Google chose another canonical and duplicate titles → `evaluate` (Page = one of the pages).

## Output Format

One summary line: pages Google showed (G), pages parsed (C), linked pages without impressions (N), On-Page calls made, inspections made.

Then the findings, sorted High, Medium, Low:

| Severity | Finding | Page | Evidence | Fix |
|---|---|---|---|---|

Evidence quotes the field or the inspection state, for example `status_code 404, linked from /blog/a and /pricing`.

Then "Not checked on purpose" with the list from the top of this skill, one line each. Then the closing lines of State, rule 7.

If there are no findings, say "No technical findings in the checked pages." Don't manufacture issues.

## Cost
Search Console calls are free. DataForSEO On-Page is billed per page: up to 50 content parsing calls, up to 100 instant pages calls and up to 12 JavaScript renders per run. The summary line reports the real count.

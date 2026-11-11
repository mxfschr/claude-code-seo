---
name: seo-product-facts
description: "Extracts a code-verified product fact sheet (pricing, platforms, features, honest limitations, competitor differentiators with source and date) live from the product's app and website repositories, every fact with a file:line source. Drift mode finds website text that still states a fact the code has changed. Use before writing product claims, after a pricing or feature change, or when the user asks what the product really does."
argument-hint: "[drift [days]] [app-folder] [website-folder] (all optional; auto-detects sibling repos)"
---

You are extracting a **code-verified product fact-sheet** for: **$ARGUMENTS** (or the current project if no args).

If the arguments start with the word `drift`, run **Drift mode** (below) instead of Steps 2 and 3. A number right after `drift` is the number of days to look back (default 30); the remaining arguments are the folders, as in Step 1.

Purpose: pull the REAL facts about the product — exact pricing, supported platforms, actual features, honest limitations — straight from the **source code, LIVE, every single time**. No hand-maintained manifest (those go stale the moment the app changes). Every fact carries `file:line` provenance so a brief can sell the tool truthfully and auditably.

**Hard rule: always live, never cached.** Re-read the source on every run. Code is the source of truth — if any doc/`FEATURE-MANIFEST.md` disagrees with the code, **the code wins** (treat the doc as a hint only).

## Step 1: Resolve the source repos (auto, zero-config)
- The current working directory is one source.
- Derive the sibling by naming convention: if the cwd ends in `-website`, the app repo is the same name **without** `-website` (e.g. `acme-website` → `../acme`); otherwise the site is `<name>-website`. Check both sibling dirs exist.
- If folder args are passed, use those instead of auto-detect.
- Confirm each path is a real repo (`package.json` or `.git`). State which repos you're reading. If only one is found, proceed with it and say so. If none reachable, STOP and tell the user.

## Step 2: Extract facts LIVE — targeted reads, every run
Use Glob/Grep to LOCATE the high-signal files, then Read them. Do NOT dump the whole codebase — target these per category (read from BOTH the app repo for capability truth and the website repo for published positioning):

**A · Identity & positioning** — `README.md`, app homepage (`app/page.tsx` / marketing route), hero + `<meta>` copy, any `/vs/<competitor>` pages on the site.
**B · Pricing** — pricing route (`**/pricing*`), price constants / Stripe config (`grep -i "price|lifetime|/mo|/year|\$[0-9]|plan|tier"`). Report exact numbers + model (one-time vs subscription). Never read secret values — field names only.
**C · Supported platforms / integrations** — `package.json` dependencies (e.g. DB drivers: `pg`, `mysql2`, `better-sqlite3`, `mongodb`, …) **cross-checked** with the connection-type enum/switch in the app (`grep` the driver names / a type union / connection manager). List only verified types.
**D · Features** — feature components (`components/**`), routes (`app/**/page.tsx`), API endpoints (`app/api/**/route.ts`), feature flags. Derive the capability list from what actually exists in code.
**E · Honest limitations (CRITICAL)** — `grep -ri "not implemented|coming soon|TODO|roadmap|@deprecated"` + stubs that `return []` / `return null` / `throw .*not`. These become the ❌-NOT-implemented list. Roadmap items are "planned", never "current".
**F · Security / tech claims** — only code-evidenced (encryption libs, auth middleware, Docker, framework versions from `package.json`).
**G · Per-competitor differentiators** — derive from real architecture (web app vs desktop, pricing model, self-hosted/Docker) + reuse claims already published on the site's `/vs/` pages. Every claim about a competitor carries a source and an as-of date: a published `/vs/` page (cite `repo/path:line`; as-of = `git log -1 --format=%ad --date=short -- <path>`), or the competitor's own page read with `mcp__dataforseo__on_page_content_parsing` (cite the URL; as-of = today). No source, no claim.

## Step 3: Output the fact-sheet
Structured markdown. **Every fact cites its source as `repo/path:line`** (or `repo/path` for whole-file signals). Sections:

```
# Product Facts — <product> (live-extracted <date>, no cache)
Sources read: <app repo> @ <git short-hash> · <website repo> @ <git short-hash>

## Identity / positioning        (tagline, value prop, category)
## Pricing                       (exact $, model)            — src
## Supported platforms           (verified list)             — src
## Features (✅ verified)         (capability → what it does) — src each
## NOT implemented / roadmap (❌) (do NOT claim as current)  — src each
## Security / tech                (only code-evidenced)       — src
## Per-competitor differentiators (web vs desktop, price, self-hosted…; source and as-of date per competitor claim)
## Audience pain points           (from README/homepage copy)
## ⚠️ Low-confidence / inferred   (facts not 100% certain from code — flag for human check)
```

## Drift mode (`/seo-product-facts drift [days]`)

Purpose: when the code changes a fact (a price, a plan, a supported platform, a feature that shipped or was pulled), find every place in the website repo that still states the old fact. LLMs repeat what the site publishes (KB Section 22), and a change nobody announced doesn't exist for them (KB Section 28.3, "Publish changes explicitly"). This mode only reports; it changes no file.

### D1: Repos and window
Resolve the repos as in Step 1. The window is the given number of days, default 30. For each repo run `git -C <repo> log --since="<days> days ago" --date=short --format="%h %ad %s"`. No commits in any repo: say "No commits in the last <days> days, so nothing can have drifted." and stop.

### D2: Facts that changed
Locate the high-signal files of categories B (pricing), C (platforms and integrations), D (features) and E (limitations) with the same Glob and Grep targets as Step 2. Then run `git -C <app repo> log --since="<days> days ago" -p -- <those files>`. From the diff keep the removed (`-`) and added (`+`) lines that state a fact:
- a price: a number with `$`, `€`, `USD` or `EUR`, or a `price` or `amount` field
- a plan or tier name, or a one-time vs subscription marker (`lifetime`, `once`, `/mo`, `/year`, `monthly`, `yearly`)
- a dependency or enum value that adds or removes a platform or integration (category C)
- a `not implemented`, `coming soon`, `TODO`, `roadmap` or `@deprecated` marker added or removed

Pair a removed line with an added line when they state the same fact with a different value; that pair is a changed fact (old value, new value). A removed limitation marker means the feature shipped; an added one means it was pulled. Ignore test files, lockfiles and comments that state no fact.

### D3: Where the website still says the old value
For each changed fact run `git -C <website repo> grep -n -I -F "<old value>"` (tracked files only, so `node_modules` and build output are skipped; with no website repo, search the app repo). For a shipped feature also run `git -C <website repo> grep -n -I -i -E "<feature name>.*(not supported|coming soon|not available|roadmap)"` with regex special characters in the feature name escaped, to find text that still says it is missing. Each hit is a stale mention with `path:line`. A hit in a path that contains `changelog` (any case) is history: list it as "history, keep" and do not count it as stale.

If the site's text lives outside the repo (a CMS or a database), say so in one line: those pages are not covered by this check.

### D4: Output

```
# Product fact drift: <product> (last <days> days, <date>)
Sources: <app repo> @ <short hash> · <website repo> @ <short hash>

| Fact | Old | New | Commit | Stale mentions | Fix |
|---|---|---|---|---|---|
```

Stale mentions list `path:line`, or "none". Fix says in one sentence what to change at each mention. Then:
- **Announce:** for each shipped feature and each price or plan change, one plain sentence the owning page should say (subject, verb, object; KB Section 28.3) and a changelog entry if the site has a changelog.
- **New queries:** for each shipped feature or new platform: "New differentiator: run `/seo-analyze <domain>` (stream d) to find the competitor + modifier searches it now wins."

If no fact changed: "No product facts changed in the last <days> days." Don't manufacture drift.

## Rules
- **LIVE every run, no cache.**
- **Code wins.** A `FEATURE-MANIFEST.md` or marketing page is a hint; verify against code, prefer code on conflict.
- **Cite `file:line` for every claim.** No citation → not a fact → don't state it.
- **Limitations are features** — surface them honestly (an honest "covers the 6 most common platforms" beats a false "supports everything").
- **Never invent.** If it's not in the code, it doesn't go in the sheet. Flag anything inferred under Low-confidence.
- **Drift mode reports, never edits.** It changes no file in either repo.

## Cost
~$0 external API (local Glob/Grep/Read only). Token cost scales with repo size — targeted reads (not full-codebase dumps) keep each live pull bounded.

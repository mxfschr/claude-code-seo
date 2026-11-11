# claude-code-seo

**An executable SEO system for [Claude Code](https://claude.com/claude-code): a 28-section knowledge base distilled from the most credible practitioners — plus 12 skills that turn it into live audits against your real Google Search Console and DataForSEO data.**

A while ago I posted in r/SEO about following [u/WebLinkr](https://www.reddit.com/user/WebLinkr/)'s advice and watching it work on my own site. A bunch of people asked me to share my notes. This is those notes — the full markdown file — plus the part that actually does the work: the Claude Code skills my SEO runs on.

## ⚠️ Work in progress — read this first

I'm not an SEO professional and I don't claim to be one. This is the working system of someone who reads, tries things on his own sites, keeps what survives contact with GSC, and deletes what doesn't. **There is almost certainly still some dumb-ass shit in here.**

If you actually know SEO: please tear it apart. Open an [issue](../../issues) telling me which section is wrong and why, or send a PR that fixes it. Corrections with evidence (a test, a SERP, a primary source) beat opinions — but I'll take opinions too. That's the whole point of making this public.

## What's different about this

Most SEO content tells you *what* to think. This repo is built to *run*:

```
/seo-analyze yourdomain.com
```

…pulls your last 90 days of GSC data, computes your **proven ranking ceiling** (the highest keyword difficulty you already rank top-7 for — instead of gating everything on DR), clusters your real authority, validates candidates against live SERPs, and hands you 3-5 concrete picks with titles, slugs, and an internal-link wiring plan.

No dashboard, no subscription, no "content score". Claude Code + two MCP servers + a methodology that fits in one markdown file.

## What's inside

```
knowledge-base/
└── seo-knowledge-base.md   The full methodology. 28 sections: Topical Authority,
                            PageRank mechanics, the biggest SEO myths, link building,
                            LLM/AI-search visibility (Query Fan-Out), BoF strategy,
                            Thin Starter Pages, Authority Shaping, the Re-Evaluation
                            republish hack, pSEO, CTR-as-signal, backlink quality —
                            down to the T*/Q*/P* ranking architecture confirmed by
                            the May 2024 Google leak and DOJ trial testimony — plus
                            field notes from experiments on my own sites, with the
                            actual numbers (Section 27), and what published
                            controlled tests show (Section 28).
skills/                     12 skills for Claude Code (Agent Skills format):
├── seo-analyze/            The front door: proven authority map + next 3-5 topics
├── seo-quick-wins/         Pos 4-15 keywords one push from page one (+ country-split truth, topic gap matrix)
├── seo-next-content/       Publish-ready briefs: slug, title, outline, unique angle, link wiring in+out
├── seo-product-facts/      Live code-extraction of product facts; drift mode finds pages stating old facts
├── seo-cluster-expand/     Semantic neighborhood scouting around a seed keyword
├── seo-re-eval/            Old pages worth republishing (NavBoost 13-month window)
├── seo-cannibal/           Pages competing against each other, with merge/differentiate calls
├── seo-llm-audit/          Where LLMs cite you invisibly (Pos 1-10, zero clicks)
├── seo-link-vet/           Vet a backlink/exchange offer: real traffic, niche fit, or link farm?
├── seo-health/             Technical health + index status: status codes, canonicals, orphans, JS-only content
├── seo-competitor-watch/   Which competitor pages newly rank, compared month over month
└── seo-log/                Change log with GSC baseline, 90-day revisit, gain / no-gain / loss
.claude-plugin/             Plugin + marketplace manifest (install with /plugin)
docs/
├── setup.md                MCP setup (GSC free, DataForSEO pay-per-call) — 15 minutes
└── workflow.md             How the skills chain into one loop, with cadence
```

## Quickstart

1. **Install the plugin.** In Claude Code:
   ```
   /plugin marketplace add mxfschr/claude-code-seo
   /plugin install seo@mxfschr
   ```
   Updates: `/plugin marketplace update mxfschr`, or turn on auto-update for the marketplace in `/plugin`. Without the plugin system, copy the folders in `skills/` to `~/.claude/skills/`. Coming from the old slash commands? Delete `~/.claude/commands/seo-*.md` first, otherwise `/seo-analyze` keeps running the old copy (the plugin version stays reachable as `/seo:seo-analyze`).
2. **Connect the data.** Two MCP servers, see [docs/setup.md](docs/setup.md). GSC is free; DataForSEO is prepaid pay-per-call, most runs cost $0 to $0.25, no subscription and **no** Backlinks API needed.
3. **Run it:** `/seo-analyze yourdomain.com`

Then follow the loop in [docs/workflow.md](docs/workflow.md): publish into proven authority, push what's almost there, republish what got stuck.

## State that survives between runs

The skills remember. Each one keeps two markdown tables in `seo/<domain>/`, inside the folder you run Claude Code from:

- `backlog.md`: every recommendation, so the next run says "already in backlog as B7" instead of repeating itself.
- `log.md`: every change you made, written by `/seo-log` with its Search Console baseline. Ninety days later `/seo-log review` measures the result. The other skills read it to hold a page for 7 days after a change and to stop recommending a fix that failed twice on the same page.

Run the skills from your website's repo and the state is versioned with the site. It contains Search Console numbers: if that repo is public, add `seo/` to `.gitignore`.

## The ideas that carry the system

1. **Authority is page-level and proven, not a domain score.** "DA/DR is a homepage assumption, not inherited by every page." Your difficulty bar is what you already rank for — measured, not estimated. (Sections 1, 25)
2. **Bottom-of-funnel first.** "X vs Y", "best X for Y", 400-800 words. Top-of-funnel CTR has cratered in the AI-Overview era; BoF converts. (Section 9)
3. **Internal links are plumbing.** Authority flows from high-click hubs to Pos-4-20 pages, mid-paragraph, descriptive anchors — never to pages that already won, never to pages that aren't ready. (Sections 5, 17)
4. **Publish thin, expand on proof.** 200-400 word starter pages; GSC tells you within weeks what deserves depth. (Section 18)
5. **LLM visibility is a GSC pattern, not a new discipline.** LLMs Google your niche and cite whoever ranks for the fan-out queries — Pos 1-10 with zero clicks is the signature. (Sections 7, 8B)
6. **Never invent product facts.** Briefs ground every claim in a live read of your product's code, with `file:line` provenance. Honest limitations beat fake features — especially once LLMs start repeating you. (`/seo-product-facts`)

## Sources & credit

More people deserve credit for this than I can trace — that's the honest version. I got to essentially all of it through **[u/WebLinkr](https://www.reddit.com/user/WebLinkr/)**, who has been generous enough to share everything freely across years of r/SEO comments, posts, and links. This file would not exist without that. Through him I found the rest of the sources distilled here: **David Quaid**'s Topical Authority / Query Fan-Out frameworks, **Edward Sturm**'s daily podcast (where much of Quaid's material and Krešimir Ćorluka's SEO meta-study surfaced), **SearchPilot**'s controlled tests, **Bill Hartzer**, **SEO Pub**, Google's own statements (Matt Cutts, official docs), sworn DOJ-trial testimony (Pandu Nayak, HJ Kim, Eric Lehman), and the May 2024 Google Content-Warehouse leak. Errors of distillation are mine. None of this is affiliated with or endorsed by them — and if you see your idea here uncredited, open an issue and I'll fix the attribution.

Battle-tested on my own bootstrapped projects, including [queryglow.com](https://queryglow.com) — where this exact loop took a zero-authority domain to page-one rankings in its niche.

## FAQ

**Do I need Claude Code specifically?** The skills are written for it (plugin + MCP) and follow Anthropic's Agent Skills format, so other agents that read SKILL.md files can load them; the MCP tool names have to match. The knowledge base is plain markdown — useful with any agent or none.

**What does it cost to run?** GSC API: free. DataForSEO: prepaid credit, $0.02-0.25 per run for most skills (each skill lists its cost); `/seo-health` adds On-Page calls, billed per page. A month of weekly audits costs less than a coffee.

**Is this "AI SEO slop"?** The opposite. The skills force honesty: country-split truth before celebrating rankings, "0 quick wins exist" when none do, and product claims only from code. The methodology section on AI slop is one of the longer ones.

**Can I use this for my company's sites / my freelance work?** Yes — use it to do SEO for any site you work on. The license (CC BY-NC-SA 4.0) draws the line at *selling the material itself*: no repackaging it into a paid product, course, ebook, or service, no building a business on distributing it. Share improvements under the same license.

**License?** [CC BY-NC-SA 4.0](LICENSE) — free to use, share, and adapt. Not free to sell.

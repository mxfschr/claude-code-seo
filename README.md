# claude-code-seo

**An executable SEO system for [Claude Code](https://claude.com/claude-code): a 26-section knowledge base distilled from the most credible practitioners — plus 9 slash commands that turn it into live audits against your real Google Search Console and DataForSEO data.**

A while ago I posted in r/SEO about following [u/WebLinkr](https://www.reddit.com/user/WebLinkr/)'s advice and watching it work on my own site. A bunch of people asked me to share my notes. This is those notes — the full markdown file — plus the part that actually does the work: the Claude Code commands my SEO runs on.

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
└── seo-knowledge-base.md   The full methodology. 26 sections: Topical Authority,
                            PageRank mechanics, the biggest SEO myths, link building,
                            LLM/AI-search visibility (Query Fan-Out), BoF strategy,
                            Thin Starter Pages, Authority Shaping, the Re-Evaluation
                            republish hack, pSEO, CTR-as-signal, backlink quality —
                            down to the T*/Q*/P* ranking architecture confirmed by
                            the May 2024 Google leak and DOJ trial testimony — plus
                            field notes from experiments on my own sites, with the
                            actual numbers (Section 27).
commands/                   9 slash commands for Claude Code:
├── seo-analyze.md          The front door: proven authority map + next 3-5 topics
├── seo-quick-wins.md       Pos 4-15 keywords one push from page one (+ country-split truth)
├── seo-next-content.md     Publish-ready briefs: slug, title, outline, link wiring in+out
├── seo-product-facts.md    Live code-extraction of product facts so briefs never invent features
├── seo-cluster-expand.md   Semantic neighborhood scouting around a seed keyword
├── seo-re-eval.md          Old pages worth republishing (NavBoost 13-month window)
├── seo-cannibal.md         Pages competing against each other, with merge/differentiate calls
├── seo-llm-audit.md        Where LLMs cite you invisibly (Pos 1-10, zero clicks)
└── seo-link-vet.md         Vet a backlink/exchange offer: real traffic, niche fit, or link farm?
docs/
├── setup.md                MCP setup (GSC free, DataForSEO pay-per-call) — 15 minutes
└── workflow.md             How the commands chain into one loop, with cadence
```

## Quickstart

1. **Install the commands** — copy `commands/*.md` to `~/.claude/commands/`
2. **Connect the data** — two MCP servers, see [docs/setup.md](docs/setup.md) (GSC is free; DataForSEO is prepaid pay-per-call, each command run costs $0-0.24 — no subscription, and **no** Backlinks API needed)
3. **Run it** — `/seo-analyze yourdomain.com`

Then follow the loop in [docs/workflow.md](docs/workflow.md): publish into proven authority, push what's almost there, republish what got stuck.

## The ideas that carry the system

1. **Authority is page-level and proven, not a domain score.** "DA/DR is a homepage assumption, not inherited by every page." Your difficulty bar is what you already rank for — measured, not estimated. (Sections 1, 25)
2. **Bottom-of-funnel first.** "X vs Y", "best X for Y", 400-800 words. Top-of-funnel CTR has cratered in the AI-Overview era; BoF converts. (Section 9)
3. **Internal links are plumbing.** Authority flows from high-click hubs to Pos-4-20 pages, mid-paragraph, descriptive anchors — never to pages that already won, never to pages that aren't ready. (Sections 5, 17)
4. **Publish thin, expand on proof.** 200-400 word starter pages; GSC tells you within weeks what deserves depth. (Section 18)
5. **LLM visibility is a GSC pattern, not a new discipline.** LLMs Google your niche and cite whoever ranks for the fan-out queries — Pos 1-10 with zero clicks is the signature. (Sections 7, 8B)
6. **Never invent product facts.** Briefs ground every claim in a live read of your product's code, with `file:line` provenance. Honest limitations beat fake features — especially once LLMs start repeating you. (`/seo-product-facts`)

## Sources & credit

More people deserve credit for this than I can trace — that's the honest version. I got to essentially all of it through **[u/WebLinkr](https://www.reddit.com/user/WebLinkr/)**, who has been generous enough to share everything freely across years of r/SEO comments, posts, and links. This file would not exist without that. Through him I found the rest of the sources distilled here: **David Quaid**'s Topical Authority / Query Fan-Out frameworks, **Bill Hartzer**, **SEO Pub**, Google's own statements (Matt Cutts, official docs), sworn DOJ-trial testimony (Pandu Nayak, HJ Kim, Eric Lehman), and the May 2024 Google Content-Warehouse leak. Errors of distillation are mine. None of this is affiliated with or endorsed by them — and if you see your idea here uncredited, open an issue and I'll fix the attribution.

Battle-tested on my own bootstrapped projects, including [queryglow.com](https://queryglow.com) — where this exact loop took a zero-authority domain to page-one rankings in its niche.

## FAQ

**Do I need Claude Code specifically?** The commands are written for it (slash commands + MCP). The knowledge base is plain markdown — useful with any agent or none.

**What does it cost to run?** GSC API: free. DataForSEO: prepaid credit, $0.02-0.24 per command run (each command lists its cost). A month of weekly audits costs less than a coffee.

**Is this "AI SEO slop"?** The opposite. The commands force honesty: country-split truth before celebrating rankings, "0 quick wins exist" when none do, and product claims only from code. The methodology section on AI slop is one of the longer ones.

**Can I use this for my company's sites / my freelance work?** Yes — use it to do SEO for any site you work on. The license (CC BY-NC-SA 4.0) draws the line at *selling the material itself*: no repackaging it into a paid product, course, ebook, or service, no building a business on distributing it. Share improvements under the same license.

**License?** [CC BY-NC-SA 4.0](LICENSE) — free to use, share, and adapt. Not free to sell.

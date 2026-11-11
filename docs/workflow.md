# The Workflow

The skills form one loop: **map your proven authority → publish into it → maintain what ranks**. Claude Code executes each step against live GSC + DataForSEO data; you make the calls.

```mermaid
flowchart TD
    A["/seo-analyze<br/><i>map proven authority,<br/>pick 3-5 topics</i>"] --> B["/seo-next-content<br/><i>publish-ready briefs<br/>with link wiring</i>"]
    B -.->|"pulls live"| F["/seo-product-facts<br/><i>code-verified product truth</i>"]
    B --> C["✍️ publish"]
    C --> L["/seo-log<br/><i>record the change,<br/>review after 90 days</i>"]
    L --> D["maintain (recurring)"]
    D --> D1["/seo-quick-wins<br/><i>weekly · Pos 4-15 pushes</i>"]
    D --> D2["/seo-re-eval<br/><i>monthly · republish hack</i>"]
    D --> D3["/seo-cannibal<br/><i>monthly · page conflicts</i>"]
    D --> D4["/seo-llm-audit<br/><i>monthly · AI citations</i>"]
    D --> D5["/seo-health<br/><i>monthly · tech + index status</i>"]
    D --> D6["/seo-competitor-watch<br/><i>monthly · what competitors newly rank with</i>"]
    D1 --> A
    D6 --> B
    E["/seo-cluster-expand<br/><i>new topic? scout the cluster first</i>"] --> B
```

## The cadence

| When | Command | What you get |
|---|---|---|
| Start / every ~6 weeks | `/seo-analyze yourdomain.com` | Your proven ranking ceiling + 3-5 prioritized topics that expand authority you already have |
| Per topic you green-light | `/seo-next-content yourdomain.com` | Publish-ready brief: slug, title, outline, internal links in+out, fact-checked product angle |
| Before any product claim | `/seo-product-facts` | Live code-extracted fact sheet (pricing, features, honest limitations) — runs automatically inside next-content |
| Weekly | `/seo-quick-wins yourdomain.com` | Pos 4-15 keywords one push from page one, with the ONE action each needs |
| Monthly | `/seo-re-eval yourdomain.com` | Old pages stuck at Pos 8-25 worth republishing under a new URL (NavBoost re-evaluation) |
| Monthly | `/seo-cannibal yourdomain.com` | Pages competing against each other for the same query, with merge/differentiate calls |
| Monthly | `/seo-llm-audit yourdomain.com` | Queries where LLMs cite you invisibly (Pos 1-10, zero clicks) — your AI-search footprint |
| Entering a new topic | `/seo-cluster-expand "seed keyword"` | The semantic neighborhood: what to push, what to thin-start, what to skip |
| A link/exchange offer comes in | `/seo-link-vet <their-domain>` | Accept / counter / decline verdict: does the linking page have real traffic, does the niche fit, is it a link farm |
| After every change you make | `/seo-log yourdomain.com <page> <action> <what> because <why>` | The change with its GSC baseline; `/seo-log review yourdomain.com` measures it 90 days later |
| Monthly | `/seo-health yourdomain.com` | Status codes, redirecting links, canonicals, content orphans, JS-only content, index status of linked pages without impressions |
| Monthly | `/seo-competitor-watch yourdomain.com` | Competitor pages that newly rank or grew, routed to a quick win or a new brief |
| After a release that changes pricing or features | `/seo-product-facts drift` | Website text that still states the old fact, plus what to announce |

One operational rule across all of it: **7-day cooldown** — never touch the same page twice within a week. GSC needs time to register each change, and stacked edits make cause-and-effect unreadable. The skills enforce it from `seo/<domain>/log.md`, which `/seo-log` writes.

`/seo-log` keeps the **change log** for every change a skill leads you to make: page, date, baseline position (GSC, 28 days), what changed, *why*, and a revisit date 90 days out; `/seo-log review` fills in the result. When something moves, the log tells you which change did it; without it you're doing random work until something sticks (Edward Sturm, KB Section 28.1). A fix that failed twice on the same page is not recommended a third time.

## The five principles behind it

These come from the [knowledge base](../knowledge-base/seo-knowledge-base.md) — the skills enforce them so you don't have to remember:

1. **Authority is page-level and proven, not a domain score.** The bar for "can we rank this?" is the highest difficulty you *already* rank top-7 for (your proven ceiling) — not DR. (Sections 1, 25)
2. **Bottom-of-funnel first.** "X vs Y", "best X for Y", "X alternative" — 400-800 words that position your product as the answer. Top-of-funnel traffic doesn't pay rent. (Section 9)
3. **Internal links are the cheapest authority you own.** Route from high-click hubs to Pos-4-20 pages, in-content, descriptive anchors, topically bridged. Never to Pos 1-3 (wasted) or Pos 95+ (evaporates). (Sections 5, 17)
4. **Publish thin, expand on proof.** 200-400 word starter pages; GSC tells you within weeks which ones deserve the full treatment. (Section 18)
5. **Never invent product facts.** Every claim in a brief traces to the live code extraction (`file:line`). Honest limitations convert better than fake features — and false claims propagate through LLMs. (`/seo-product-facts`)

## A realistic first month

```
Day 1    Setup (docs/setup.md) → /seo-analyze yourdomain.com → /seo-health yourdomain.com
Day 1-7  Publish picks #1-2 via /seo-next-content (including the internal links it wires)
Day 7    /seo-quick-wins — execute the single highest-leverage action
Day 14   /seo-quick-wins again · publish pick #3
Day 21   /seo-quick-wins · /seo-cannibal (first conflict sweep)
Day 28   /seo-re-eval + /seo-llm-audit + /seo-competitor-watch · re-run /seo-analyze if picks are exhausted
```

Expectation management (Section 19): new pages index in 1-2 weeks, reach Pos 10-15 in 4-8 weeks *if the internal linking is executed*, and get their real NavBoost evaluation over ~13 months of click data. SEO compounds; the loop is designed to be run, not admired.

## Running this for clients?

State is per domain (`seo/<domain>/`), so one working folder can hold several clients. One addition still makes sense (suggested by the community):

- **Dual reporting:** the skill output is operator-speak. Translate the verdicts into plain English for the client ("we moved page X from page 2 to page 1 by adding one link from your most-visited article"), and keep the raw output and `log.md` as your working log.

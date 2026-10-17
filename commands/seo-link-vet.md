---
description: Vet a backlink / link-exchange / guest-post offer — does the linking page have real traffic, does the site fit your niche, or is it a link farm? Verdict + reply strategy, plus a keyword harvest from what their pages rank for. No Backlinks API needed.
argument-hint: "<candidate domain or the exact page that would carry your link>"
---

You are vetting a link opportunity: **$ARGUMENTS**

This runs on the cheap DataForSEO **Labs** endpoints + reading the actual site — it does NOT need the (expensive, subscription-only) Backlinks API. The methodology is Section 25 of the knowledge base, operationalized:

- A link only transfers authority if the linking **PAGE** itself ranks and earns clicks. Even 1 click/week counts; a DR-70 page with zero traffic transfers nothing.
- DR/DA is a homepage assumption — never evaluate the domain, always the page.
- Link-farm neighborhoods (100+ outbound links across random niches) are worthless at best, a footprint at worst.

## Execute in order

### Step 1: Resolve the real domain
WebFetch the given URL/domain. Follow redirects (vanity domains often 301 elsewhere — vet the destination, not the shell). Note who runs it if discoverable (about/contact page).

### Step 2: Does the DOMAIN have organic life at all?
Call `mcp__dataforseo__dataforseo_labs_google_domain_rank_overview` (target = resolved domain).
- Organic keyword count, position distribution, ETV (estimated traffic value).
- **ETV under ~100/mo or zero top-10 rankings → the whole domain is barely alive; everything below it inherits that.**

### Step 3: What does it actually rank FOR?
Call `mcp__dataforseo__dataforseo_labs_google_ranked_keywords` (target = domain, limit 100, ordered by search volume desc). The top 20 answer the niche question below; the full list feeds the Step 7 keyword harvest.
- Are the top keywords in or adjacent to YOUR niche — or random one-offs from guest posts (a dev-tools blog ranking mainly for "maui car rentals" is a guest-post farm, not a topical site)?
- Niche fit test: would a user searching their top keywords plausibly also search yours? (Section 1, Topical Bridges)

### Step 4: The page that would carry your link
This is the decisive check.
- If a specific page/section was offered, WebFetch it. If it exists already: call `ranked_keywords` on that exact URL — does THE PAGE rank or get traffic?
- If the offered placement is a NEW page (fresh guest post, "partners" page): it starts with zero rank, zero traffic → per Section 25 its value today is zero. It can become valuable later only if that page itself starts ranking.
- **Red flags:** dedicated link sections ("partners", "friends", "sponsors", "wingmen"-style), 50-100+ outbound links across unrelated niches (roofing next to crypto next to gyms), every post written for/about a different external business.

### Step 5: Editorial smell test
WebFetch 1-2 of their regular articles. Real editorial content for readers, or content that exists to carry links? Count irrelevant dofollow outbounds per article — more than a couple is a seller/exchange pattern.

### Step 6: Verdict + reply strategy

Output exactly one of:

- **ACCEPT** — the specific linking page ranks/has traffic, niche fits, outbound profile clean. Proceed: in-content placement, descriptive partial-match anchor (not exact-money), mid-paragraph. Reciprocate only from a mid-tier article of yours WITH traffic (protect your top pages), and only AFTER their link is live and verified. Prefer a 3-way (A→B→C) if they run multiple sites.
  - **Pick YOUR target page, and it's not the homepage** (Sections 1 + 17: authority is page-level). Call `mcp__gsc__advanced_search_analytics` (dimensions=["page","query"], days=90, row_limit=100) and choose the page at **Pos 4-20** whose topic matches their linking page's paragraph. Name that URL and the anchor in the verdict.
- **COUNTER** — domain is real but the offered placement is worthless (new guest page, link section). Counter with: contextual in-content link inside an article of theirs that ALREADY ranks, on a topic adjacent to yours. Provide the exact counter-message text.
  - **Partner variant** (KB Section 6.13): if they're a real, non-competing business serving your audience, propose partner work instead of a swap: a joint page on the topic you overlap on, named after a keyword *they* can win, which you help rank (keyword research, sharing). A link on a page that starts earning traffic outlasts and outweighs any swap. Include that offer in the counter text.
- **DECLINE** — no traffic, no fit, or link-farm pattern. Decline politely, leave the door open ("if you ever have an in-content spot in a ranking article about <your niche>, happy to revisit"). Provide the decline text.

Always include: the 2-3 data points that decided it (ETV, top keywords, the linking page's own rank/traffic) so the human can sanity-check the call.

### Step 7: Keyword harvest (no extra call, runs for every verdict)
Link sellers and link-heavy sites *must* keep their pages ranking, so their ranking pages carry titles and slugs that were already iterated until they worked (KB Section 5, "Free Keyword Research"). Mine the Step 3 data even on a DECLINE:
- Keep keywords from the 100 that sit **in or adjacent to your niche** (same entities/terms as your product or your GSC footprint) where their page ranks **Pos ≤ 20**.
- For each: keyword, their ranking URL (its slug and title are the pattern to learn from), their position, search volume, KD if returned.
- Flag the ones you don't rank for yet as candidates for `/seo-cluster-expand` or `/seo-next-content`. Never copy their pages; take the keyword and the document-name pattern.
- If fewer than 3 niche keywords survive, say so in one line. Don't pad the list with off-niche terms.

## Operating rules
- **Never reveal your target URLs first** — share your domain and samples, but lock the exact pairing only after their side is verified.
- **Your reciprocal link goes live only after vetting passes AND their link is placed.** Sequence is the protection.
- Be honest in the verdict: a polite decliner today can be a great partner in 6 months when their pages rank.

## Cost
~$0.02–0.05 per vet (2-3 Labs calls; WebFetch and GSC are free; the keyword harvest reuses Step 3 data). No Backlinks API subscription needed.

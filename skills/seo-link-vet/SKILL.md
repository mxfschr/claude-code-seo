---
name: seo-link-vet
description: "Vets a backlink, link exchange or guest post offer: does the linking page itself rank and get traffic, does the site fit the niche, or is it a link farm. Gives an accept, counter or decline verdict with a reply strategy, without the Backlinks API. Use when the user received a link offer, a guest post pitch or a link exchange request."
argument-hint: "<candidate domain or the exact page that would carry your link>"
---

You are vetting a link opportunity: **$ARGUMENTS**

If the target above is empty or still shows an unfilled argument placeholder, ask the user for the domain or the exact page that would carry the link, and wait for the answer.

This runs on the cheap DataForSEO **Labs** endpoints plus DataForSEO **On-Page** reads of the actual site; it does NOT need the (expensive, subscription-only) Backlinks API. Every page read goes through DataForSEO On-Page: no WebFetch, no curl. The methodology is Section 25 of the knowledge base, operationalized:

- A link only transfers authority if the linking **PAGE** itself ranks and earns clicks. Even 1 click/week counts; a DR-70 page with zero traffic transfers nothing.
- DR/DA is a homepage assumption — never evaluate the domain, always the page.
- Link-farm neighborhoods (100+ outbound links across random niches) are worthless at best, a footprint at worst.

## Execute in order

### Step 1: Resolve the real domain
Call `mcp__dataforseo__on_page_instant_pages` on the given URL (put `https://` in front of a bare domain). `items[0].url` is the final URL after redirects: vanity domains often 301 elsewhere, so vet the destination, not the shell. A `status_code` of 400 or higher: stop and report that the site does not resolve. To see who runs it, call `mcp__dataforseo__on_page_content_parsing` on `/about` and then `/contact` of the resolved domain; if both calls error, write "operator not discoverable".

### Step 2: Does the DOMAIN have organic life at all?
Call `mcp__dataforseo__dataforseo_labs_google_domain_rank_overview` (target = resolved domain).
- Organic keyword count, position distribution, ETV (estimated traffic value).
- **ETV under ~100/mo or zero top-10 rankings → the whole domain is barely alive; everything below it inherits that.**
- ETV and keyword counts are tool estimates built from the tool's own keyword database, and they can be pushed by ranking for exactly those keywords (KB Section 25, "Link churn"). A seller's screenshot of DR, DA or Authority Score proves nothing; this call and Step 4 are the check.

### Step 3: What does it actually rank FOR?
Call `mcp__dataforseo__dataforseo_labs_google_ranked_keywords` (target = domain, limit 100, ordered by search volume desc). The top 20 answer the niche question below; the full list feeds the Step 7 keyword harvest.
- Are the top keywords in or adjacent to YOUR niche — or random one-offs from guest posts (a dev-tools blog ranking mainly for "maui car rentals" is a guest-post farm, not a topical site)?
- Niche fit test: would a user searching their top keywords plausibly also search yours? (Section 1, Topical Bridges)

### Step 4: The page that would carry your link
This is the decisive check.
- If a specific page/section was offered, call `mcp__dataforseo__on_page_instant_pages` on it. With `status_code` 200 it exists: call `ranked_keywords` on that exact URL (with `https://`). Does THE PAGE rank or get traffic?
- If the offered placement is a NEW page (fresh guest post, "partners" page): it starts with zero rank, zero traffic → per Section 25 its value today is zero. It can become valuable later only if that page itself starts ranking.
  - **One exception, and it's temporary:** a new article that the site links from its homepage or a hub that ranks gets authority through that link path before it ranks itself (KB Section 25, "Traffic is the proxy"). Check the homepage with `mcp__dataforseo__on_page_instant_pages` (url = the resolved homepage, custom_js = snippet B below with `PLACEMENT_PATH` replaced by the path of the placement URL). `custom_js_response.where` names the container (NAV, HEADER, MAIN, SECTION, ASIDE, FOOTER, BODY) and the nearest heading for each link to the placement; `found: 0` means the homepage does not link it. A heading such as "Latest", "Recent" or "News" marks a rotating feed: the value lasts days to weeks, say so in the verdict.
- **Red flags:** dedicated link sections ("partners", "friends", "sponsors", "wingmen"-style), 50-100+ outbound links across unrelated niches (roofing next to crypto next to gyms), every post written for/about a different external business.

### Step 5: Editorial smell test
Take 1-2 of their regular articles from the Step 3 ranking URLs (not the offered page, not the homepage). For each:
- `mcp__dataforseo__on_page_content_parsing` (enable_javascript false): read it. Real editorial content for readers, or content that exists to carry links?
- `mcp__dataforseo__on_page_instant_pages` with custom_js = snippet A below. `custom_js_response.links` lists every outbound link inside the article (or main) element as host, follow or nofollow (nofollow, sponsored and ugc count as nofollow), and anchor text; `followed` is the number of followed ones.

Count the followed outbound links to unrelated niches per article: more than a couple is a seller/exchange pattern. Report followed and nofollow separately. Nofollow links still count when they bring traffic (KB Sections 13 and 28.2), so an article full of unrelated nofollow links is still a link carrier.

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

## DataForSEO On-Page snippets (custom_js)

Pass each snippet as the `custom_js` string of `mcp__dataforseo__on_page_instant_pages`, unchanged except for `PLACEMENT_PATH` in snippet B. The On-Page JavaScript runtime has no `URL` constructor, so the snippets parse links with `getAttribute` and a regex; keep them that way. The result arrives in `items[0].custom_js_response`.

**Snippet A: outbound links in the article**
```js
var H=location.hostname.replace(/^www\./,'');var root=document.querySelector('article')||document.querySelector('main')||document.body;var A=root.querySelectorAll('a[href]');var o=[];for(var i=0;i<A.length;i++){var x=A[i].getAttribute('href')||'';var m=x.match(/^(?:https?:)?\/\/([^\/?#:]+)/i);if(!m)continue;var d=m[1].toLowerCase().replace(/^www\./,'');if(d===H||d.slice(-H.length-1)==='.'+H)continue;var rel=(A[i].getAttribute('rel')||'').toLowerCase();o.push(d+' | '+(/nofollow|sponsored|ugc/.test(rel)?'nofollow':'follow')+' | '+(A[i].textContent||'').replace(/\s+/g,' ').trim().slice(0,50))}var r={scope:root.tagName,external:o.length,followed:o.filter(function(s){return s.indexOf(' | follow | ')>0}).length,links:o.slice(0,60).join(' ;; ')};r;
```

**Snippet B: where the homepage links the placement**
```js
var P='PLACEMENT_PATH';var A=document.querySelectorAll('a[href]');var o=[];for(var i=0;i<A.length;i++){var x=A[i].getAttribute('href')||'';if(x.indexOf(P)<0)continue;var c=A[i].closest('nav,header,footer,aside,article,main,section');var hd=c?c.querySelector('h1,h2,h3,h4'):null;o.push((c?c.tagName:'BODY')+' | '+(hd?hd.textContent.replace(/\s+/g,' ').trim().slice(0,60):'-'))}var r={found:o.length,where:o.join(' ;; ')};r;
```

## Operating rules
- **Never reveal your target URLs first** — share your domain and samples, but lock the exact pairing only after their side is verified.
- **Your reciprocal link goes live only after vetting passes AND their link is placed.** Sequence is the protection.
- Be honest in the verdict: a polite decliner today can be a great partner in 6 months when their pages rank.

## Cost
~$0.02-0.06 per vet (2-3 Labs calls plus up to 7 On-Page calls, billed per page; GSC is free; the keyword harvest reuses Step 3 data). No Backlinks API subscription needed.

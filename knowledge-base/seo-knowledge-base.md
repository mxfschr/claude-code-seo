# SEO Knowledge Base

## 1. TOPICAL AUTHORITY - The Core Concept

### Definition
- **Every keyword = a topical space.** If you rank for a keyword and get clicks, you build topical authority in that area.
- **Mechanical, not mystical:** Google sees clicks in a topic → you gain credibility in that topic. You expand the topic footprint → you expand the authority footprint.

### Page-Level System
- **PageRank is NOT a domain system — it is a page system.** Every page accumulates its own authority, relevance, and its own signal graph.
- That's why canonicals and cannibalization exist: multiple pages on one domain can claim the same keyword and block each other.
- **"The domain ranks for X" does not exist.** The domain only provides a baseline; the individual page competes.
- **Think mechanistically:** You have to understand PageRank and SEO as a mechanism, not as a list of rules. It is a system with mathematical relationships between pages, links, and authority.

### Topical Bridges
- Topics overlap in unexpected directions - no clean silos.
- If you publish in one topic and get clicks, you can expand into adjacent topics through linking and content in the desired direction.
- **Bridges exist:** If users who search query A also frequently search query B, there is a bridge there.
- **Architecture mechanics:** In the May 2024 leak, Topical Authority is modeled as `siteAuthority` × `siteFocusScore` × `(1 - siteRadius)` — for the full T/Q/P composition see Section 26.3.

---

## 2. GOOGLE AS A SYSTEM - Why It Works the Way It Does

### Google's Scale
- **1 billion+ questions per day** from 181 countries in 146 languages
- **15% of search queries are completely new** - never seen before
- Google cannot evaluate the internet manually → relies on algorithms and human traces

### Google Is NOT a "Content Appreciation Engine"
- Google is not designed to read content like a human and award points for craftsmanship.
- **Search is not an art contest.** Google's job is to rank pages by UTILITY, not literary quality.
- Utility is measured by EXTERNAL signals, not internal admiration.

### YouTube Example
- Google does not "watch" videos to decide which ones are good.
- Google looks at user behavior because that is the only scalable, cost-effective, real-world indicator of usefulness.
- **Google cannot evaluate the internet manually** → relies on the traces people leave behind.

### Backlinks as Proof
- Backlinks are not decoration - they are real-world endorsements.
- A backlink = proof that someone pointed at your page and said "This is worth sending others to."
- **Clicks behave the same way:** A click is a vote backed by time and attention.
- The combination of both = a working proxy for trust.

### The Echo Theory
- **The engine does not reward content quality in isolation. It rewards the ECHO of that quality:** links, clicks, repeated interactions - things that only appear when a piece of work has actual utility.

---

## 3. PAGERANK IN DETAIL (Google's Official Explanation)

### Core Principle
- PageRank interprets a link from page A to page B as a VOTE by page A for page B.
- Volume is not all that counts: Google also analyzes the page casting the vote.
- **Votes from "important" pages carry more weight** and help make other pages "important."

### PageRank Scale
- 0-10 scale (simplified for external display)
- Internal scores are far more granular
- **Toolbar PageRank ≠ internal PageRank:** the toolbar is only a snapshot every few months

### Important Clarification
- **High PageRank does NOT guarantee a high ranking for a specific term.**
- Example: Adobe (PR10) does not appear at the top for every search.
- PageRank is only ONE of 200+ ranking factors.

### PageRank Is Legally Protected Opinion
- A US court ruled: "PageRanks are opinions — opinions of the significance of particular Web sites"
- **First Amendment protected** - Google may adjust PageRank scores at its own discretion
- Important to understand: PageRank is Google's subjective assessment, not an objective measure

### Anchor Text Is Often More Important Than PageRank
**Example: Nike vs Zappos:**
- Nike gets hundreds of PR9 links with the anchor "Nike" → ranks well for "Nike"
- Zappos gets PR4-6 links with the anchor "Zappos For Shoes" → ranks better for "shoes" despite lower PR

**Proof:** Search for something and check whether pages with lower PR rank above pages with higher PR. It happens all the time.

---

## 4. THE 10 BIGGEST SEO MYTHS (from u/WebLinkr)

1. **XML sitemaps do not force Google to crawl your site**
2. **GSC errors do not count "negatively" against you**
3. **Refreshing content does not mean "better SEO"**
4. **Spammy-looking backlinks do not get you in trouble**
5. **Google does not enforce any content/document structure**
6. **Google does NOT use bounce rates/dwell time** as ranking signals (still a myth). **Chrome data** is more nuanced: the May 2024 Content Warehouse leak shows `chromeInTotal` as a site-level aggregate signal (a collective popularity measure, not per-session tracking). SERP CTR remains the strongest authority signal — see Section 24, T/Q/P architecture in Section 26.
7. **Site speed does not matter for SEO** (but it does for user experience)
8. **Google cannot judge whether a page is universally "the best"**
9. **EEAT is not a thing in SEO** (vague, variable, not measurable)
10. **Low-DA backlinks do not "harm your site"**

### u/WebLinkr's Extended 12-Myth List:
1. Schema makes you rank ❌
2. You need an image to rank ❌
3. Author bios are crucial ❌
4. HTML structure is critical ❌
5. Page speed is a ranking factor ❌
6. Freshness is a ranking factor ❌
7. EEAT exists as a signal ❌
8. Duplicate content is fatal ❌
9. Outbound citations help ❌
10. NLP (Natural Language Processing) optimization ❌
11. LLM.txt matters ❌
12. AI writing style detection ❌

### More Debunked Myths:
- **Emojis in meta descriptions boost rankings** ❌ (they don't improve CTR either)
- **Keywords in HTML class tags** ❌
- **Backlinks are the ONLY thing that counts** ❌ - SEO is the sum of all its parts
- **You ONLY need backlinks from your relevant niche** ❌ - All backlinks help. A realistic backlink profile has links from everywhere.
- **Interlinking your own websites is bad** ❌ - Only if it looks like a PBN
- **"Content is king" in isolation** ❌ - Many SEOs successfully game Google with bad content. What counts is the ECHO (links, clicks, engagement)
- **"Semantic Musicality"** ❌ - Someone claimed bold keywords + rhymes = ranking boost 😂

---

## 5. PRACTICAL SEO TIPS THAT WORK

### Hierarchical Website Structure
- Sections with child pages that deepen a topic = more credible to Google
- **Place important pages in the navigation/header**
- Create hub pages for bottom-of-funnel SEO landing pages
- Place the hub page in the footer (e.g. "Uses", "Services", "Collections")

### Category/Collection Page Scaling (E-Commerce, Job Boards, Marketplaces)
- Systematically create category pages for EVERY relevant keyword variant
- **1 keyword = 1 dedicated page** with an exact match in URL, title, H1
- Category pages are the main source of transactional traffic
- Individual product/job pages rarely rank for generic category keywords
- **Example job board:** /jobs/frontend-developer-jobs/berlin, /jobs/software-engineer-jobs/remote, /jobs/engineering-manager-jobs/
- **Example e-commerce:** /collections/foldable-electric-bikes, /collections/electric-bikes-for-adults

### Google Does Not Differentiate Between "Page Types"
- **Google does not know "blog pages" vs "landing pages" vs "product pages"** - they are all documents
- What counts: how relevant the document name (title/URL) is to the search query

### "Search Intent" Is a Proxy, Not a Ranking Factor
- **"Search intent" is a concept content writers use** - it is not a Google signal
- What actually happens: your document name is highly relevant to the search query. That has nothing to do with "intent."
- Stop it with "informational intent" vs "transactional intent" - that's podcaster-speak, not a mechanism

### SERP Analysis for Page-Type Decisions
- Before you build a page: look at the top-10 SERP. Which document type ranks?
- If 6/10 results are category/collection pages, build a category page. If blog posts rank, write a blog post.
- This is not "intent" — it is observing which document type delivers the highest user satisfaction
- **Example:** If you google "electric bikes for adults" and only see collection pages, a product page will never rank there

### Why Long-Tail Keywords Are Easier to Rank For
- **It's simpler than you think:** high-volume authority sites target short-tail keywords
- These sites CANNOT run both strategies at once (short-tail + long-tail)
- That's why long-tail keywords are less competitive - not because of "low search volume" but because the big players aren't there
- **Each page (one per long-tail keyword)** ranks more easily because the document name has maximum relevance to the search query
- **The high-CPC, high-competition terms are the END of your road map, not the start** (David Quaid). List them first so you know where you're heading, then start at the low-difficulty side and earn your way up. `/seo-analyze` enforces exactly this with the proven ceiling and the parked list.

### Free Keyword Research: What Link Sellers' Pages Rank For
- Link sellers send spreadsheets of sites they sell placements on. Ask for the ones in your niche. Ignore the advertised names ("USA Today"), look at the pages that actually rank.
- Those operators *must* keep their pages ranking, or the links they sell are worthless. So the titles, slugs and document names on their ranking pages have already been iterated and republished until they worked: pre-validated keyword research, for free.
- Take the domains to a keyword tool (or Bing Webmaster Tools) and pull what they rank for. Pages that don't rank: walk away.
- `/seo-link-vet` does this as a byproduct: every vetted domain also yields a keyword harvest.

### Keyword Placement (the Basics)
- Place keywords deliberately in: page title, URL slug, meta description, H1, start of the first sentence
- **Work them in naturally**, not as a list at the end
- **Slug = the keyword core, nothing else.** Drop every word Google already infers: `/trip-to-como/`, not `/how-to-enjoy-a-wonderful-day-out-at-lake-como-in-italy/` (Google knows Como is a lake in Italy). The simpler the slug, the easier Google can slot the page into an index (David Quaid). Long title tags (below) are a separate decision: titles can carry variants, slugs carry the core.
- **One keyword = one page on your domain** (two pages on the same keyword cannibalize, Section 1). On other people's domains you can reuse it as often as you like: LinkedIn post, YouTube title, partner page, slides, press release (Section 6).

### Exact-Match Domains (EMDs): Relevance in the Domain Name
- An EMD (`saascrm.com` for "SaaS CRM") carries the primary keyword's relevance in the domain itself. A branded domain (`hubspot.com`) has to earn that relevance with links and clicks first.
- **Where it works:** SERPs that aren't fully contested yet. With little authority on either side, relevance decides (same ad-rank logic as Section 15). David Quaid runs EMDs from day one alongside the branded domain and reports them working with almost no backlinks in young niches (GEO/AEO). No data was shown, so treat that as a hypothesis to test, not a benchmark.
- **The demotion exists, the blanket penalty doesn't.** The May 2024 leak contains `exactMatchDomainDemotion` (lineage: the 2012 EMD update against low-quality EMDs). Its strength is unknown (the leak has no weights, Section 26.4). It targets thin EMDs that exist only to rank.
- **Rule: every EMD needs its own job.** A news site, a training/certification hub, a collaboration between two companies, a distinct product line. Big companies do the same (Google runs its free certification programs as their own properties). Never build an EMD as a link source for your main domain: then it's a PBN (Section 4), and networks built to manipulate search are what Google deindexes wholesale.
- **It still starts at zero.** EMD relevance lowers how much authority you need, it doesn't replace the first clicks and links (Section 13, "New domains").

### Image SEO
- Structure file names: `articles_best-standing-desks-2025_description.jpeg`
- The keyword is automatically in every image because it's in the slug
- Additional description after the underscore for more keyword reach

### Using Google Search Console
- Take queries from GSC and work them NATURALLY into relevant pages
- Do not paste them in verbatim as a list

### Separating Branded vs. Non-Branded Traffic
- **Branded traffic** (people searching for your name) measures brand awareness, NOT SEO success
- **Non-branded traffic** (generic searches) = the real SEO KPI
- ALWAYS analyze them separately in GSC and analytics
- Filter out branded keywords when you want to measure SEO progress

### Internal Links (from Bill Hartzer)
- **Links to other pages in the MIDDLE of a paragraph**
- Helps users go deeper into the content
- Structures the site with information architecture
- Increases time on site and brand engagement

### IMPORTANT: Internal Linking - Authority Flow & Dilution
- **Links do NOT reduce the authority of the page they sit on** - they dilute the FLOW to the target pages
- The more you link, the less authority flow per individual link to the target pages
- Main nav links = good for users + crawling
- **Linking for ranking must be TARGETED**
- Recommendation for authority pages: **maximum 2 internal links**
- Linking is NOT an architectural sitemap for bots - that's a fairy tale from Google that influencers picked up
- **"Dampening effect":** Google built in a mathematical decay that prevents sites from ranking all their pages. Every point needs fresh sources of authority.
- **Damping factor `d = 0.85`** (original PageRank paper, Brin/Page 1998): mathematically, 85% survives per hop, 15% is lost to the random restart. BUT: every outlink dilutes on top of that (`0.85 × P / N_outlinks`). In practice this means: at a typical 50-100 outlinks per page, the effective authority passed on is very small. Authority practically "dies" after 3-4 hops — not from damping alone, but from damping × outlink dilution × hop count. **The practical takeaway stands: link deliberately, not generously.** A site with one Microsoft backlink does not automatically rank for everything. (Per-link Reasonable Surfer refinement in Section 26.3.)
- **Linking to everything = link spirals** that devalue the flow to every single target page
- You cannot "spam" with internal links in the Google-penalty sense - but you can kill your own authority through too much linking
- **Golden rule:** Link to pages that NEED MORE authority, not to pages that already rank. A page that ranks does not need extra authority (unless you want to send users there).

### Why Internal Links Work (Mechanistically)
- You have pages with traffic → they have authority
- Through internal links you shift authority from those pages to other pages and help them rank
- **That is the only reason internal links work** - not because "spiders understand the architecture"
- **Link context determines relevance:** Crawlers look at the text AROUND the link — not the whole domain, not the whole page, not the author. Only the context the link sits in determines relevance for the linked page. → That's why you place links in the MIDDLE of topically relevant paragraphs.

### Internal Linking Rules (Prioritized)
1. **Link deliberately** - there is no point linking to pages that already rank
2. **Do not link to pages sitting at position 95+** (not yet) - they first need their own sources of authority
3. **Every link dilutes the others proportionally** - use your own math to decide how many links make sense
4. **Breadcrumbs contribute very little** to SEO

### Trending/Popular Articles on the Homepage
- Can help get new content indexed
- BUT: if the page does not hold its own rank, the effect may be too short-lived
- SEO is a system - don't look for hard rules, think in systems

### Ultra-Long Title Tags (from SEO Pub)
- Ignore the 60-character limit
- Write **150-250 character title tags**
- 2-3 title tags separated by hyphens
- They match slightly different queries/intents
- Google picks the segment that best matches the search
- **Result: 10-20% traffic increase minimum**

**Example:**
- Short: "Setting up a Minecraft Server - Acme Corp"
- Long: "Setting up a Minecraft Server for Beginners and Experts - Simple Guide to Hosting Your Own Minecraft Server - Optimizing Your Self-Hosted Minecraft Game - Acme Corp"

### Content Freshness
- Update old content and change the year in the SEO title
- URL: `best-standing-desks-2025`
- Every year: 301 redirect from the old URL to the new one
- Date in ALL key spots: page title, URL slug, H1, meta description, start of the first sentence

### Write for Humans, Not for Search Engines
- If it feels like "SEO optimized copy" → Google hates it
- Keyword stuffing is obvious and gets punished
- **Write for the human behind the computer searching for this keyword**
- **AI is not the trigger.** ChatGPT "SEO-optimized" copy is weak because it writes around the query instead of answering it (Section 16), not because a machine wrote it. Google's spam policy targets mass production "no matter how it's created" (Section 10, "Scaled content abuse")

---

## 6. LINK BUILDING STRATEGIES

### 1. Broken Link Building
- Doesn't work as well as it used to, but still works
- **Trick:** Don't just rely on broken link checkers - also search manually for broken links AND redirects
- Reach out: "Hey, your link is broken, I have replacement content"

### 2. Link Exchanges
- **ABC link exchanges** are best: you work with someone who has multiple sites
- They link to you from site A, you link to their site B
- Don't lean on it too much - mix strategies

### 3. Guest Post Outreach
- A numbers game, but it works
- Many blogs charge money for links

### 4. Sponsor Local Groups/Events
- **Make sure follow links are part of the package**
- Double benefit: marketing + backlinks
- Branded searches, top-of-mind awareness

### 5. Networking
- **The most important tip of all**
- Network with people in your niche
- Arrange link exchanges
- Especially effective with relevant, non-competing businesses
- Links that send referral traffic = extremely valuable (even nofollow!)
- "Be a genuine part of your community" - doors open

### 6. HARO/Qwoted (Help a Reporter Out)
- Journalists need expert quotes
- You submit a quote → you get a mention + link
- Share mentions on social media for additional authority

### 7. Press Releases
- Do something newsworthy and put out a press release
- Still works when done right
- Also influences what AI tools say about your brand
- **Root the headline in the keyword, not the brand** (David Quaid): "New coffee shop in Lake Tahoe", not "Cup of John's opens its doors". People search the category; the brand name is the end of the headline, not the start. The value is the keyword-rooted document, not the backlink
- It can go out on launch day, there's no reason to wait (Section 13, "New domains")

### 8. Linkbait Content / Linkable Assets
- Statistics pages, tools, etc. that attract links naturally
- Works better when you already have traffic
- The content must actually be linkable

### 9. Unsplash Backlink Hack
- Upload relevant high-quality photos to stock sites (Unsplash, Pexels)
- People use the photos and link back
- Reverse image search → find who uses your photos without credit
- Message: "Hey, I took that photo, would be cool if you credited me"
- **5-7% backlink conversion rate**
- **100-200 backlinks per photo possible**
- Can be automated with AI agents

### 10. .edu Backlinks
- Colleges often have outdoor clubs/teams
- $500 for a sponsored link on their website
- Example: little kit car racing teams at universities
- **.edu backlinks carry enormous juice**

### 11. Photography Strategy
- Take photographs in your niche
- Submit them to editorials → accreditation + link
- Can take 6 months to 2 years
- Result: links from NYT, Forbes, top publications

### 12. Outsourcing Strategy for Link Building
- **80% of link building is manual work**
- Fiverr freelancers for scraping + verifying prospects (relevant sites with organic traffic)
- **Do the outreach YOURSELF** - keeps it authentic
- Saves massive time at consistent quality

### 13. Partner Link Building: Make the Linking Page Rank
"Going to market on your own is the worst idea" (David Quaid). Microsoft, Google and HubSpot all go to market with partners. The same works at small scale:
- **Pick partners, not link sellers:** non-competing businesses that serve the same customers. A plumber and an electrician in the same city, a SaaS tool and a hosting company that serves SaaS, a web designer and a local charity. From Google's and an LLM's point of view it doesn't matter whether a customer or a service provider talks about you.
- **Publish the relationship.** Google and LLMs only know real-world relationships that are written down online. A partnership nobody publishes doesn't exist for them.
- **The key move: help the partner's page rank.** Do their keyword research, name the joint page, podcast episode or slides after a keyword they can actually win, share it so it gets eyeballs. A link is only worth what the linking page earns (Section 25). Here you raise that value yourself. This is the active answer to Section 27.1: a link on an unranked page is a lottery ticket, and partner work is how you make the ticket win.
- **Find the overlap.** Shared modifiers (same city, same audience) bridge two businesses (Section 1). "Commercial painters in Slough" and "moving services in Slough" share a place, so pages on the partner's site that serve that overlap can link to you naturally.
- **Durability:** partner links survive because the partner benefits from the page too. Bought links on pages nobody maintains die off; a page that earns both sides traffic is the goose that lays the golden egg.
- **Point links at deep pages, not your homepage.** Authority is page-level (Section 1): send each external link to the page that needs it (your Pos 4-20 pages, Section 17), with your bio or profile link aimed at the matching product page.
- **Profiles can rank themselves.** Build your target keywords into bios and profiles on platforms that rank (LinkedIn, expert platforms, podcast guest pages). That's the modern, legitimate form of parasite SEO.
- **Join communities long before you need them.** Pay it forward first. Founders who show up in a subreddit at beta asking for testers get banned: they ask a favor from a party of strangers.
- **It's a numbers game.** Pitch 6-12 partners, trade publications or podcasts per idea. One hits. Giving up after each miss gets you nowhere.

---

## 7. LLM/AI SEARCH VISIBILITY - The Query Fan Out

### What is Query Fan Out?
Query Fan Out is the process AI search systems use to break ONE question into MANY smaller, related questions to build a richer answer.

**Instead of matching your query as a single string:**
- The system breaks it into subtopics and angles
- Runs separate lookups for each
- Then assembles the final answer

**Example:** If you enter "best GEO strategy for SaaS", the system does NOT just search for that exact phrase. It spins off internal questions like:
- "what is GEO"
- "GEO for SaaS examples"
- "pricing and implementation considerations"
- "risks or limitations"

### Why Query Fan Out changes everything
- **Your visibility in AI answers NO longer depends only on the exact query**
- What counts: how often your content can serve as a good answer for the HIDDEN sub-queries
- Content that only addresses a very narrow version of the question → may match the main query, but misses most internal branches

**Content that works:**
- Covers the broader intent space
- Definitions, comparisons, edge cases, objections, next steps, related entities
- Has more chances of being selected as supporting evidence

### How to see Fan Outs

**Perplexity (easier):**
- With the paid version: you see the "Assistant Steps"
- Shows you exactly which queries were executed
- Example: "SEO Agency NYC" → fans out to:
  - "seo agencies nyc"
  - "top seo companies new york city"
  - "best seo firms ny"

**ChatGPT (harder, but possible):**
1. Right-click → Inspect → Network tab
2. Copy the query string from the URL
3. Paste it into the filter
4. Refresh the page
5. Click the orange bracket → Response → search for "query"
6. There you see the actual search queries

**Important:** If you ask ChatGPT "What did you search for?" → It doesn't know / it makes it up

### The "Drift" - Queries change
- Fan Outs are **different for different LLMs**
- Fan Outs are **different at different times of day**
- The "Drift" = the change of Fan Out queries over time
- **Perplexity often adds "2025" to queries** - that's why pages with the year in the title rank better

### The core truth: LLMs = Google + synthesis

**LLMs do NOT run their own ranking index:**
- They cannot store the amount of data Google processes in one hour
- They use standard SEO (Google, Bing, Brave Search) for rankings
- They just break the prompt into different queries
- They do keep a **cache** of the pages their fan-outs fetch, see Section 8B "2026 update"

**Proof:**
1. Take the Fan Out query from Perplexity
2. Paste it into Google
3. **Results are nearly identical, in almost exact order**

**Near-real-time crawling (with latency):**
- Perplexity sends crawlers to fetch documents right after a search
- You can rank in Google NOW
- Minutes later you can appear in Perplexity, even if you weren't there 10 minutes ago
- But appearing as a cited *source* is faster than having your content *quoted* in the answer: there is latency, see Section 8B "2026 update"

### Schema is NOT important for LLM visibility

**The truth about Schema:**
- For blog articles, Schema contains NOTHING that isn't already in the post
- Schema doesn't replace the post
- Schema contains nothing that says more about the post than the post itself
- **Scammers can implement Schema too** → not a trust signal

**Where Schema is actually useful:**
- Flight departures, review data, structured data
- Very specific cases with standardized formats
- **99% of content doesn't need Schema**

**Warning:** Schema agencies are popping up and charging big money for unnecessary implementation

### Why Reddit appears in LLMs
- **LLMs do NOT "prefer" Reddit**
- Reddit appears because it often shows up in Google's rankings
- Google has a special "Discussions and Forums" section
- ChatGPT possibly ignores this boosted section deliberately

### Tracking LLM traffic

**In Google Analytics 4:**
1. Reports → Traffic Acquisition
2. Primary dimension: Source
3. Filter: "chatgpt" or "perplexity" or "claude"
4. Secondary dimension: Landing Page
5. Shows which pages get traffic from which LLM

**Better method: Looker Studio**
- Bring all LLM engines together (ChatGPT, Perplexity, Gemini, Claude)
- Monthly graphs per engine
- Track landing pages + conversions
- **Takes ~20 minutes to set up** (or $20 on Fiverr)

**Click-through rate reality:**
- LLM CTR is roughly **0.1% to 1%** (vs 1-40% for SEO)
- Sometimes as low as **0.01%**
- But: you're probably already in LLMs without knowing it

### Spotting LLM queries in Google Search Console

**The keyword "evaluate":**
- Often synonymous with "compare" in Google
- Very long queries with "evaluate" = often LLM Fan Outs
- Lots of impressions, NO clicks
- But position in the top 10

**Examples from GSC:**
- "evaluate fintech company ramp"
- "evaluate fintech company arc on banking and finance"
- "evaluate company arc on banking for consulting firms"

**When you see this:**
- Top 3 positions
- Lots of impressions
- Zero clicks
- **→ Those are LLM Fan Outs!**
- Clicks come in as referral traffic, not search traffic

**Caveat: this signal depends on the pipe.** It only shows up because LLM retrieval hits Google's SERPs in a way that logs impressions. Google is actively restricting automated SERP access (Section 13, "Rank readings are snapshots"). If that pipe changes, fan-out impressions in GSC can shrink while your actual LLM visibility stays the same. Cross-check with GA4 LLM referrals and Bing's AI Performance report (Section 8B) before reading a drop as a loss.

### Practical LLM optimization

**Optimizing content for Query Fan Out:**
- Don't think "one keyword per URL"
- Think: **cover the complete intent cluster**
- Anticipate obvious follow-up questions
- Cover: definitions, comparisons, edge cases, objections, next steps

**Trick: Reddit for prompt research:**
```
Search Reddit for my ICP for people looking for [your service]
and what questions they're asking as prompts
```
- Removes bias from your marketing content
- Shows what people REALLY ask
- Saves 10 days of reading Reddit

**Trick: Reverse-engineering prompts:**
1. Screenshot your GA4 landing pages (LLM traffic)
2. Paste into Perplexity
3. Ask: "Guess the prompts people used to get to these pages"
4. Use these prompts for content optimization

### Live ranking in LLMs

**David Quaid's proof:**
1. Updated a blog post
2. "Request Indexing" in Google Search Console
3. Google re-ranks immediately
4. **10 minutes later** visible in Perplexity with the new content

**This means:**
- You can run a search where you don't appear
- Create and publish content for it
- Come back and test
- Test multiple times to understand Drift
- Adjust content to be "ever present"
- **Test cited and quoted separately:** being linked as a source within minutes doesn't mean your content is used in the answer yet. Quaid sees fast citations but slower quoting (Section 8B "2026 update")

---

## 8. GEO VS SEO - The Disinformation

### The campaign
- GEO tools pay SEOs/creators to spread the message that "SEO is dead"
- Sponsored content partnerships with equity offers (2-year engagement)
- Messaging: "Traditional keyword-first SEO is becoming outdated"
- **Creator Advisory Boards** with equity for "ongoing advocacy"
- 3.5 million in funding for disinformation campaigns

### The reality
- **If you want to appear in AI tools: do good SEO**
- AI Mode, AI Overviews, ChatGPT, Perplexity all use the Google/Bing index
- GEO, AEO, LMEO, "AEIOU-EO" - all marketing buzzwords
- **Perplexity's own blog confirms it: it's the Query Fan Out**

### What additionally works for AI:
1. **Press releases** for brand messaging to AI
   - All the reasons why your brand is good
   - 5/5 stars, testimonials
   - AI tools cite and synthesize these

2. **Pages targeting purchase intent keywords**
   - Explain why your brand is a fit for these keywords

3. **Lots of documentation about your brand**

4. **Be indexed in Google AND Bing**
   - Use Bing Webmaster Tools
   - Use Google Search Console
   - **ChatGPT possibly uses Google instead of Bing** (Barry Schwartz research)

5. **Language for AI**
   - Don't go over the top with hyperbole/superlatives
   - AI prefers more neutral language
   - But still say why you're a good choice for keyword X

### Which search engine do LLMs use?
- **Perplexity:** Google
- **Claude:** Brave Search (a PageRank clone, works almost identically to Google)
- **ChatGPT:** Probably Google (not Bing) - tests show pages indexed only in Google get cited
- **Nothing has beaten PageRank** - everything is built on it

---

## 8B. QUERY FAN OUT & LLM VISIBILITY (by David Quaid)

### What is Query Fan Out?
Query Fan-Out is the process AI search systems use to split **one question into many smaller, related questions** to build a richer answer.

**Instead of** matching your query as a single string against pages:
- The system **breaks it down** into subtopics and angles
- Runs **separate lookups** for each
- Then **combines** the final answer

**Core concept:** Your visibility in AI answers is NO longer tied only to the exact query someone types. **What really counts: how often your content serves as a good answer for the HIDDEN sub-queries** that "fan out" from the original prompt.

**You need to appear in at least one, ideally ALL Fan-Out queries.** The more often and the higher you rank, the higher you get placed in the synthesized answer (the most frequently repeated pattern across the input documents wins).

**Example:** You search "best GEO strategy for SaaS"
→ The system internally generates:
- "what is GEO"
- "GEO for SaaS examples"
- "pricing and implementation considerations"
- "risks or limitations"

**Example 2:** You search "SEO Agency NYC"
→ Perplexity runs 3 different Google searches:
- "seo agencies nyc"
- "top seo companies new york city"
- "best seo firms ny"

**CRITICAL PROOF:** You can literally copy these Fan-Out queries and paste them into Google - you see EXACTLY the same results, in almost exact order.

This proves definitively: **LLMs use Google/Bing, not their own search indexes.**

### Why Query Fan Out matters
- **Your visibility in AI answers is NO longer tied only to the exact query**
- What counts: how often your content serves as a good answer for the **hidden sub-queries**
- If your page only answers a very narrow version of the question → it may match the main query, but misses most internal branches

### Content strategy for Query Fan Out
**Optimizing for Query Fan-Out = designing content around the WHOLE conversation, not just the starting query**

A strong page:
- Anticipates obvious follow-up questions
- Covers related terms and alternative phrasings
- Answers them directly OR links cleanly to supporting content

**Think in intent clusters, not one keyword per URL**

If your page only answers a very narrow version of the question:
- It may match the main query
- But misses most internal branches the system uses for the answer

Content that covers the broader intent space - **definitions, comparisons, edge cases, objections, next steps, adjacent entities** - has more chances of being selected as supporting evidence for multiple sub-queries.

### SEO experts talking about Query Fan Outs
- **David Quaid** - Primary Position SEO
- **Mike King** - iPullRank
- **Aleyda Solis**
- **Ryan Jones** - Founder at Razorfish, builder of SERPrecon
- **Chris Long**
- **Dejan**
- **Mark Williams-Cook** (debunked the Schema-for-LLMs myth)

### The "Drift" - Why results change
- Fan-Outs are **different for different LLMs**
- Fan-Outs are **different at different times of day**
- LLMs often add "2025" to queries (matches page titles with a year)
- The Drift tries to circumvent SEO tactics → only sites ranking for MANY variants get cited consistently
- Fan-Outs are **different for different users**: search history and the running conversation shape them (see "2026 update" below)

**Practical consequence of Drift:**
You may need to **publish the same articles under different keyphrases** to target the different Drift phrases. If you rank for "E-E-A-T SEO guide" but not for "EEAT SEO guide 2025", you miss the drifted traffic.

### LLMs are NOT search engines
**Fundamental misconception:** Many think LLMs are trained on all web content like a cache.

**Reality:**
- LLMs cannot store the amount of data Google processes in one hour
- **Perplexity, ChatGPT etc. use standard SEO (Google/Bing) for rankings**
- They just break the query into different queries
- **Claude uses Brave Search** (a PageRank clone, works almost identically to Google)
- They do cache what they fetch, but the cache is fed by search-engine results, not by a ranking system of their own (see "2026 update")

### Near-Real-Time Crawling
- LLM crawlers do NOT build a daily copy of the web like Google crawlers do
- Fetching happens right after the search: you can rank in Google and **minutes later** repeat the search in Perplexity and be in the results
- It *looks* real-time, but it isn't fully: there is a cache and there is latency (see "2026 update")

**Proof:** David Quaid changed a blog post, requested re-indexing from Google, and the new content appeared in Perplexity within minutes.

### 2026 update: caches, latency and personalization (David Quaid)
Quaid revised the real-time picture himself (David Quaid SEO Show, ep. 10, 2026), drawing on Ryan Jones's teardown of Perplexity's retrieval architecture and on his own citation tests:
- **LLMs cache what their fan-outs fetch.** Pages returned for fan-out queries land in a local store, an index of sorts, augmented alongside training data. That is still not an independent *ranking* index: which pages come back is decided by the search engines and crawl sources (Google, Bing, Common Crawl), and link-based authority (PageRank) remains the only objective quality filter.
- **"Real time" has latency.** You can publish and be *cited* (linked as a source) within ~10 minutes, while being *quoted* (your content used in the answer) can lag. Brands also show up in answers because they were found in an earlier citation, even when they're not in the current citation list. That's where the "baked into the model" theories come from.
- **Personalization is a new axis.** More of the user's search history feeds into each answer. An LLM can narrow its fan-out to one vendor (e.g. a `site:` search on a company the user keeps mentioning), which excludes everyone that vendor doesn't talk about.
- **"3D ranking":** visibility = which keywords you rank for × how many × *when* (time and user context). Ranking once is no longer proof of permanent visibility.
- **What stays the same:** the top (retrieval via search engines) and the bottom (quality control via links) are SEO. Only the fuzzy middle changes: how many pages get pulled, which ones get cited.
- **Purchases still route through search.** Quaid reports from client work that buyers may research in LLMs, but the purchase comes through Google (or Bing) search and ads. Another reason BoF pages that rank in Google stay the priority (Section 9).

### How to see Query Fan Outs

**In Perplexity (easy):**
- Paid version shows "Assistant Steps" with the actual queries
- Free version: look at page titles for consistent keywords

**In ChatGPT (DevTools method):**
1. Search something with a date (e.g. "winter 2025 fashion trends")
2. Right-click → Inspect → Network tab
3. Copy the string after "c/" from the URL
4. Paste into the filter, then refresh the page
5. Click the orange bracket → Response
6. Search for "query" (q-u-e-r-y)
7. This shows the actual search terms

### Measuring LLM traffic in analytics

**Google Search Console:**
- Look for queries with the word "evaluate" (often synonymous with "compare" for LLMs)
- Very long, deep search queries
- **Top 10 position BUT 0 clicks** = LLM Fan-Out queries
- Example: "evaluate fintech company ramp" - position 3, no clicks

**Google Analytics / Looker Studio:**
- LLM clicks come in as **referral traffic**, not search traffic
- Reports → Traffic Acquisition → Source = "chatgpt" or "perplexity" or "claude"
- Then add landing page to see which pages get traffic

**Bing Webmaster Tools: AI Performance report (public preview since February 2026):**
- The only first-party report that shows fan-outs directly: **grounding queries** (the phrases the AI used to retrieve content it cited), cited pages, citation counts and **citation share** (a share-of-voice number no other AI tool gives you)
- Covers Microsoft Copilot, Bing's AI summaries and select partner integrations
- Limits: no clicks or traffic, and no mapping of which grounding query triggered which citation. Exportable as a spreadsheet
- **Quaid's gap map:** collect your grounding queries + your organic queries + competitor names + the compare/evaluate phrasings around them. Mark where you're not cited, build content for those gaps, then measure what share of it lands

**Click-through rate from LLMs:**
- Extremely low: **0.01% to 0.1%**
- Horrendous compared to SEO (1-40% CTR)

### Why Reddit appears in LLMs
**Myth:** LLMs prefer Reddit
**Reality:** Reddit appears in LLMs because Reddit often shows up in Google's rankings

- Google has a special "Discussions and Forums" band for Reddit/forums
- ChatGPT sometimes seems to ignore this band
- Reddit was at times removed entirely from ChatGPT results

### Schema for LLM visibility
**Schema is NOT necessary for LLM visibility**

- David Quaid's top-ranking pages have NO Schema
- Schema for blog articles contains nothing useful (just publisher info)
- Schema doesn't replace the post and contains nothing that says more about the post than the post itself

**From community tests (Reddit r/SEO):**
- "We dont see any influence of schema, PR etc - it seems like it works on standard SEO"
- Presence of schema doesn't help you get included
- Absence of schema doesn't prevent you from ranking
- Every time it was tested, Schema was avoided - visibility was not affected

**What we DON'T know:**
- Exactly how Fan-Outs are formed
- How many permutations there are

**What we know:**
- Perplexity and ChatGPT have NO ranking index of their own (they cache fetched pages, but the search engines decide what gets fetched)
- Sites like Reddit/Wikipedia only have influence IF they show up in returned queries
- It runs on standard SEO
- Google mostly ignores entity schema too: entities get created from search behavior (people searching a name and clicking a domain), not from markup that declares them (David Quaid)

**Where Schema REALLY helps:**
- Very specific cases like flight data, reviews
- Structured data with codes, times, specific formats

**Warning:** Schema agencies charge big money for unnecessary implementation. Scammers can use Schema too - it's not a trust signal.

### Practical method: from analytics to content
1. Screenshot your top LLM landing pages from analytics
2. Paste into Perplexity: "guess the prompts people used to get to these pages"
3. You get prompt ideas
4. Take a prompt and test it in Perplexity
5. Check whether you get cited
6. If not: create or expand content

### Using Reddit for prompt research
**Prompt:** "Search Reddit for my ICP for people looking for [your niche] and what questions they're asking as prompts"

Example output for a cyber security agency:
- Security incidents handling
- Backup and restore processes
- SOC 2 compliance
- Vendor incident response
- Maturity assessment criteria

→ Those are the topics that belong in your content

### The "Beachhead" strategy for keyword research
1. **Keyword tools (Semrush, Google Ads Planner)** only have ~5% of the keyword universe
2. **Better:** establish a "beachhead" - get one page onto page 1
3. In GSC you then see **far more keyword variants** than any tool shows
4. Long-tail variants, page 8 rankings (= high-volume queries)

**If you rank at position 72-76 and see 130 impressions:**
- Less than 1% of people go to page 8
- Page 1 impressions would be 10-100x higher
- → That's a keyword worth investing in

### When to create a new page vs. expand an existing one?
- **Broad match keyword** (e.g. "Google"): add as an H2 on an existing page
- **Exact match / specific query**: create a new page
- **Position 9-11**: rather as an H2 on the same page

### Minimum Viable SEO
**Problem:** the "Everything SEO Bagel" - bullet points, images, Schema, alt tags, EVERYTHING
→ The more steps, the longer every piece of content takes

**Solution:** reduce to a Minimum Viable Product
- No meta description? Works. Google writes it itself.
- No image? Works.
- No Schema? Works.
- No author bio? Works.

**David Quaid's proof:**
- Uses NO meta descriptions on his own blog
- His pages still rank (e.g. above Google Help, above Google itself)
- Google just grabs the text from the page
- "I don't allow meta descriptions on my own blog as much as possible"

**More myths debunked:**
- Page without publisher info → ranks
- Page without EEAT signals → ranks
- Page with "relatively terrible" content → ranks if it gets links

**Test it yourself:** When someone says "you MUST have X", try it without. Be scientific, not superstitious.

**When someone tells you "this is how a search engine or LLM works", ask for proof.** Ask for screenshots. You should be able to do the same. These engines cite data all the time - if someone else can do it, they must be able to prove it.

---

## 9. BOTTOM-OF-FUNNEL VS TOP-OF-FUNNEL

### Top-of-Funnel Content (NOT recommended)
- "Guide to finding the best [type of business]"
- People get their answers from AI (AI Overviews, ChatGPT, Claude)
- **Click-through rates for top-of-funnel content have dropped 34.5%** (Ahrefs)
- More effort: more research, thousands of words

### Bottom-of-Funnel Content (RECOMMENDED)
- Why your business is a good option for the searched query
- 400-800 words — short and conversion-focused:
  - 400-500 for pure "Why X" pages (David Quaid's original)
  - 500-800 for comparison/versus pages with tables (multiple options, pros/cons)
  - Automated content pipeline default: 0.8 × competitor median, floored at 400, capped at 800
  - The 800 ceiling is deliberately the MoF floor → clean funnel transition with no gap
- Far less competitive
- Higher conversion

### Versus Blog Strategy (BoF)
- **"[Your brand] vs [competitor]"** — catches people deciding between you and a competitor
- **"[Competitor A] vs [Competitor B]"** — positions you as the third (better) option
- Google Autosuggest with "[brand] vs" delivers the keywords
- Comparison keywords ("vs", "comparison", "alternative") have the highest conversion rates after direct-purchase keywords
- **Example:** Write "Jetson vs Swagtron", then "but actually [your brand] beats both" — you intercept traffic from competitor comparisons

### Competitor Brand × Your Differentiator (BoF)
- Search demand that contains a competitor's brand plus a modifier the competitor *doesn't serve* is bottom-of-funnel traffic with almost no competition, and keyword tools rarely surface it (David Quaid)
- **Quaid's example:** people search "Cup of John's matcha", but the shop only does coffee. A matcha place that targets that phrase picks up buyers in position 2-3 with nobody else competing
- **SaaS version:** a Mac-only competitor + "windows", a subscription competitor + "lifetime" or "one-time", a cloud-only competitor + "self-hosted". The modifier must match something your product really does (never invent a differentiator)
- **How to find them:** seed a keyword tool or the Google Ads keyword planner with the competitor's brand name, then filter the suggestions for modifiers like alternative, pricing, location, platform, features. `/seo-analyze` runs this as stream (d), using the differentiators from `/seo-product-facts`
- Your competitors' success builds the road map to displace them: the more people search their brand, the more modifier gaps appear

---

## 10. GOOGLE'S ANTI-SPAM MEASURES

### Spam tactics Google fights:
1. **Cloaking:** Showing different content to crawlers vs users
2. **Keyword stuffing:** Cramming a page full of keywords
3. **Paid links:** Paying for links to manipulate PageRank
4. **Scaled content abuse** (spam policy since March 2024): many pages generated "for the primary purpose of manipulating search rankings", by AI, automation, scraping or humans. See below

### Google's approach:
- More than 1 million spam pages are created PER HOUR
- Combination of algorithms and manual actions
- **516 improvements to Search in 2010 alone**

### Manual intervention only for:
- Security concerns (malware, personal data)
- Legal issues (DMCA, illegal content)
- Exception lists (false positives like essex.edu classified as porn)
- Spam (after guideline violations)

### Panda Update (historical context)
- One of the biggest algorithm changes ever
- **Affected 11.8% of all Google searches**
- Designed to demote low-quality sites that offer no useful original content
- Better rankings for high-quality sites with original research, in-depth reports, thoughtful analysis
- Shows: Google CAN and WILL demote at scale, and the net catches sites that didn't deserve it (see "Expect overcorrection" below)

### Scaled content abuse: purpose, not method (David Quaid, Oct 2026)
The wave of "Google is punishing AI content" posts misreads what's happening. What sites are hitting is scaled content abuse enforcement, and that policy is method-agnostic by design.
- **The test is volume + primary purpose.** Were these pages mass-produced mainly to manipulate rankings rather than to help anyone? Google's own examples list generative AI next to scraping, stitching content together, spreading it over multiple sites and keyword-filled pages that make no sense to a reader. 3,000 near-identical "[service] in [city]" pages written by a human team fall under it; 50 carefully edited AI-assisted articles don't. Local service page farms got hit for this long before ChatGPT existed.
- **What gets detected is the shape of the site, not the writing.** Google doesn't grade prose (Section 16; E-E-A-T is a rater framework, not a score). It can detect the patterns of mass production: templated structure, thin variation between pages, publishing velocity, and a page count that makes no sense for the entity behind the site. Quaid puts the tripping point at roughly 100+ pages built that way. That's his estimate, no data shown.
- **That's why "beating" it is alchemy.** Better prompts, more variation, a different template, a layer of human editing on top: none of it changes the shape, and enforcement only gets better.
- **Scale is fine when the pages have a reason to exist.** Amazon, eBay, Reddit, Zillow, Yelp and TripAdvisor run millions of generated pages and rank, because each page serves someone who wants it. A marketplace with 2 million listings has 2 million pages because it has 2 million things to sell (Section 20).
- **Expect overcorrection.** Panda, Penguin and the helpful content updates all swept up legitimate sites alongside the guilty ones. Sites with lots of templated pages will get caught here too. The fix is still the same: make each page's purpose unmistakable, or have fewer pages. Not a better content generator.

### A penalty is a throttle, not a removal
- Algorithmic enforcement usually keeps you in the index: your pages still show up in a `site:` search, they just can't rank for anything that matters. The throttle can be temporary, semi-permanent or permanent, depending on what tripped it and whether Google thinks the behavior will stop (David Quaid).
- **"We got de-indexed" usually means "we stopped ranking".** Different problem, different fix. Check `site:` and GSC's Page indexing report first: pages indexed + traffic gone = throttled.
- Full removal does exist. Google's policy says violating sites "may rank lower in results or not appear in results at all", and the GSC Manual Actions report shows when a human reviewer acted. Look there before you diagnose.
- Neither is the same as "Crawled, not indexed" on individual pages, which is an authority problem (Section 23).

**Source:** David Quaid, [AI Content Penalty](https://primaryposition.com/blog/ai-content-penalty/) (Primary Position, 2026-10-22); Google Search Central, [spam policies: scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies)

---

## 11. TESTING & EVALUATION AT GOOGLE

### Google's process for algorithm changes:
1. Idea from an engineer
2. Implementation on a test version
3. Generate before/after results
4. **Raters** (trained evaluators) evaluate search quality
5. **Live experiment** on a small % of users (typically <1%)
6. Analyze click data (do users click the new #1 result more often?)

### Numbers from 2010 (shows the scale):
- **13,311 precision evaluations** — testing whether changes have a positive/negative effect
- **8,157 side-by-side experiments** — raters compare two results pages
- **2,800 click evaluations** — how real users react to changes
- **516 improvements launched** — in a single year

---

## 12. THE FUNDAMENTALS - SUMMARY

**SEO boils down to boring basics:**
1. Be relevant
2. Publish consistently within your topical space
3. Build or earn links that show someone else found the work valuable

**The system is mechanical, not mystical.** Mechanical systems can be reasoned through. They require no faith, only observation.

**"SEO is dead" has died 4-6x per year for 20 years.** With AI, the "SEO is dead" rate has risen to 6 deaths per year. 😄

---

## 13. KEY ADDITIONAL INSIGHTS

### Branded searches are getting more important
- The open web is in "rapid decline" (Google's own lawyer)
- Fewer people blogging = fewer backlinks
- Google has to find other authority signals
- **Backlinks in YouTube videos** (especially with engagement) are becoming more valuable
- **Any link that sends referral traffic = extremely valuable** (even nofollow!)
- Brand mentions count too

**But a branded query is "just another keyword" (David Quaid):** Google keeps no registry of companies. It learns that `cupofjohns.com` is "Cup of John's" because people search the name and click that domain. The authority those clicks build is narrow: relevant to the brand term, not to the whole site. It spreads outward through bridges (Section 1): brand → brand + category ("Cup of John's coffee") → category + place ("coffee Las Vegas"). Treat branded search as the seed of a topical footprint, not as a site-wide multiplier, and keep measuring SEO on non-branded traffic (Section 5).

### New domains: no sandbox, only zero factors
"New domains must sit for a year" is wrong (David Quaid). The time in SEO is the time it takes to earn authority, nothing else:
- **Evidence:** scaled-content sites (black hat, they crash later) ramp up within weeks. If a blanket sandbox existed, they couldn't.
- **Mechanism:** ranking behaves like a product of factors (Section 26.2). A new domain has near-zero authority and click history, so the product is near zero, regardless of page count. The leak's `hostAge` exists, but it sandboxes fresh *spam* (Section 26.4), not every new site.
- **What actually unlocks a new domain:** a trickle of data on every factor. Relevance where the SERP is uncontested (long tail, exact-match slugs, an EMD with a purpose: Section 5), first clicks (branded searches from people who already know you), and a handful of real links from pages that rank (Section 6, "Partner Link Building").
- **Start before launch.** Community, partners, profiles and the press release can all be prepared months ahead and go out on launch day. No committee watches new domains.

### Metrics are approximations
- DR/DA behave non-linearly
- Lose backlinks while shipping content in a tight topical band = traffic can still rise
- Tools interpret a traffic increase as authority gain even when the backlink graph shrinks
- **PageRank hasn't changed much in 10 years**

### Rank readings are snapshots (hyper-rotation)
- Google rotates results in some SERPs as often as hourly (David Quaid's observation), and personalizes for logged-in users: your own visits make your site rank higher for you
- A single live SERP check can show you crashing or ranking when you're only rotating in or out for that hour
- Rank trackers get noisier: Google is walling off automated SERP access (it sued the scraping API SerpApi in December 2025). Quaid's read: part of a moat against LLM companies riding Google's index
- **Position truth = aggregated GSC data over 28+ days**, split by country (`/seo-quick-wins`). Use live SERPs to see *who* competes and *which* features show (AI Overview, video, PAA), not where you rank

### Give searchers what they want
- Give searchers what they want ABOVE THE FOLD, before they scroll
- Then think about what they want NEXT (adjacent topic)
- Take them down the page → more topical authority across the full breadth of the keyword

### The uncomfortable truth about "Content is King"
- Many SEOs successfully game Google with bad content
- But those SEOs don't build successful companies
- They get quick wins, get caught, get penalized
- Then they complain on X that Google's results are bad
- **Long term: helpful content for real humans = sustainable success**

### Dead web & AI slop
- Many Reddit subs allow bots
- Bots have fake conversations with other bots
- "Case studies" without sources = red flag
- AI-generated content gets cited in research papers
- **Danger:** Hallucinated content trains new AI models
- Theory: solution to the Fermi paradox — civilizations invent AI and pollute their knowledge base with AI slop 😄

---

## 14. QUICK REFERENCE: DO / DON'T

### ✅ DO:
- Keywords in title, URL, H1, meta, first sentence
- Internal links in the MIDDLE of paragraphs
- Long title tags (150-250 chars) with multiple intent variants
- Year in URLs for "best of" content
- Networking in your niche
- Prioritize links that bring referral traffic
- Be indexed on Google AND Bing
- Press releases for brand narrative
- Prioritize bottom-of-funnel content
- Write for humans
- **Cover intent clusters** (for query fan-out)
- **Track LLM traffic in analytics** (referral source)
- **Search GSC for "evaluate" queries with 0 clicks**
- **Use Reddit for ICP prompt research**
- **Create content for follow-up questions**
- **Copy fan-out queries into Google to verify rankings**
- **Same article under different keyphrases for drift variants**
- **Use DevTools to see ChatGPT's real queries**
- **Set up a Looker Studio dashboard for LLM traffic** (~20 min, or $20 on Fiverr)
- **Thin starter pages for untested keywords** (200-400 words, then watch GSC)
- **Actively shape authority** (link only to pages at position 4-20, not to #1-3)
- **Programmatic SEO with real data** (template + variable = scalable long-tail pages)
- **Re-evaluation via republish** (old pages under a new URL + 301 once authority has grown)
- **Press releases for LLM visibility** ($50-150, LLMs scrape PR platforms)
- **Video for keywords with a video carousel** (YouTube + embedded + Shorts = 3x visibility)
- **Let crawlers find pages inside other pages** (don't submit manually, don't rely on sitemaps)
- **HTML sitemap instead of XML sitemap** for small sites (gives crawlers context)
- **Place links in topically relevant context** (crawlers use the text around the link for relevance)
- **Prioritize backlinks from pages WITH traffic** (1 click/week is enough; DA90 without traffic = worthless)
- **Recycle pSEO URLs** for perishable content (jobs, offers, events)
- **Optimize CTR only once you're at position 1-5** (before that it does nothing)
- **Partner links where you help the linking page rank** (the link is worth what that page earns)
- **Point external links at deep pages** that need authority, not at the homepage
- **Target competitor brand + a modifier they don't serve** (BoF with almost no competition)
- **Keep slugs to the keyword core** (`/trip-to-como/`, drop what Google infers)
- **Start a new domain's authority work before launch** (there's no sandbox to wait out)
- **Use Bing's AI Performance report** for grounding queries and citation share

### ❌ DON'T:
- Keyword lists at the bottom of the page
- Excessive internal linking (dilutes authority flow to target pages, creates link spirals)
- Linking to already-ranking pages just for SEO (they don't need more authority)
- Linking to pages sitting at position 95+ (they're not ready for authority transfer yet)
- Treating breadcrumbs as an SEO measure (they do very little)
- Treating "search intent" as a ranking factor (it's a content-writer proxy, not a Google signal)
- Obsessing over DR/DA metrics
- Focusing only on niche-relevant backlinks
- ChatGPT "SEO-optimized" copy
- GEO tools that claim SEO is dead
- Treating schema as a ranking factor
- Optimizing bounce rate
- Treating site speed as a ranking factor
- Emojis in meta descriptions
- **Implementing schema for LLM visibility** (doesn't help)
- **Believing LLMs have their own ranking indexes** (they cache, but search engines decide what gets fetched)
- **The "everything SEO bagel"** — too many unnecessary steps
- **Asking ChatGPT "what did you search for?"** (it lies/doesn't know — use DevTools)
- **Treating LLMs as research tools** (they just Google and regurgitate blogger versions)
- **Being superstitious** ("I MUST have an image", "I MUST have schema")
- **2,000-word articles for untested keywords** (thin page first, then expand based on GSC)
- **Too many internal links per page** (>30 links = authority dilution, each link gets less)
- **pSEO without unique data** (template pages without real content = thin content penalty)
- **Using API indexing services** (John Mueller: treated as spam)
- **Using GSC manual submit for discovery** (it's only for SERP updates, not for indexing)
- **Trying to fix "crawled, not indexed" with sitemaps** (it's an authority problem, not a crawling problem)
- **Optimizing CTR at position 20+** (nobody clicks on page 3 — logically pointless)
- **DA90 as a backlink criterion** (it's a homepage assumption, not inherited by every page)
- **pSEO pages with identical title + H1** (Google sees duplicates, no matter what the rest says)
- **Modeling a domain-age sandbox** (`hostAge` targets fresh spam; slow starts are zero factors)
- **EMDs as link sources for your main domain** (that's a PBN; every EMD needs its own job)
- **Reading one live SERP as your position** (hyper-rotation + personalization; GSC over 28 days is the truth)
- **Reading a drop in GSC fan-out impressions as lost LLM visibility** without cross-checking GA4 and Bing
- **Mass-producing pages because a keyword tool showed volume** (scaled content abuse; the policy is method-agnostic, AI or human)
- **Blaming AI for a scaled-content hit** (the fix is a reason for each page to exist, or fewer pages, not a better generator)
- **Calling a ranking drop "de-indexed"** without checking `site:` and GSC (indexed + invisible = throttled, Section 10)

---

## 15. PEOPLE ALSO ASK (PAA) → FAQ PAGES STRATEGY

### The 5-minute hack (from David Quaid)

**The concept:**
1. Google search for your main keyword
2. Open and expand the "People Also Ask" box
3. Screenshot the PAA questions
4. Paste into Perplexity/an LLM: "Write a 120-word answer for each question"
5. **Each question = its own page**

**Why 120 words?**
- Short enough for quick wins
- Long enough for a substantial answer
- Perfect for Featured Snippets

### Why individual pages instead of an FAQ accordion?

**Accordion (all on one page):**
- Authority dilution: all questions share one URL
- Schema required to separate question/answer
- Google has to decide which question is most relevant
- Only works if you already have authority

**Individual FAQ pages:**
- Each question gets a 100% title-query match
- Page title = the exact question → maximum relevance
- No schema needed (the title IS the question)
- Google ranks the most specific answer higher
- Systematically builds topical authority

**David Quaid's explanation:**
> "The less authority you have, the greater the relevance to the search phrase, the greater your authority is used. It's like ad rank - ad quality score times by dollar bid."

→ If you have little authority, you need maximum relevance. You only get that with a dedicated page per question.

### "Isn't 120 words useless to the visitor?"

The most common objection (raised by [u/CaitlinHuxley](https://www.reddit.com/user/CaitlinHuxley/)) — and it comes from picturing the page as a *destination*. It isn't one. It's an *answer*.

- **Google is content-agnostic (Section 16):** it rewards answering the query, not word count. Someone who searched that exact question and gets a direct answer in the first two sentences — instead of scrolling through 2,000 words of filler — got a *better* experience, not a worse one.
- **It's a doorway, not a dead end:** every FAQ page links back to the main guide. The visitor who wants depth is one click away. The page captures a long-tail / Featured-Snippet visitor you'd never win on the head term, then hands them to your real content.
- **The page's job is relevance, not depth.** For a low-authority site, maximum relevance to one exact question is the *only* lever that ranks (the ad-rank math above). Depth is what the parent article is for.

**The caveat that makes or breaks it:** this only works as a *spoke in a hub*. A 120-word page that answers a genuinely distinct question and links up to its parent = topical-authority builder. A 120-word page with no parent, or a near-duplicate of its siblings = thin content, and Google treats it as exactly that. Never ship these as orphans (see the ❌ list below).

### Structure for FAQ pages

**URL structure:**
```
/faq/[question-as-slug]/
or
/[topic]-faq/[question-as-slug]/
```

**Page layout:**
1. **H1:** The exact PAA question
2. **First paragraph:** Direct answer in 2 sentences (for the Featured Snippet!)
3. **Key points:** 3-4 bullet points with details
4. **Internal link:** Back to the main article (natural anchor)
5. **More links:** To related FAQ pages (siblings)

**Example:**
```
H1: What is the difference between whiskey and bourbon?

Bourbon is a specific type of whiskey produced in the USA.
The main difference lies in composition and production.

- Bourbon must contain at least 51% corn
- Bourbon must be aged in new, charred oak barrels
- Bourbon may only be produced in the USA
- Whiskey is the umbrella term for all grain spirits

→ More in our [complete whiskey guide](/whiskey-guide/)
```

### Schema for FAQ pages

**NOT needed on a dedicated page:**
- Schema only helps text scrapers separate question from answer
- On a dedicated page that's unnecessary — the title IS the question
- The entire content IS the answer

**Only needed with an accordion:**
- When multiple FAQs sit on one page
- Schema then separates the individual Q&A pairs

### When to create FAQ pages?

**Good timing:**
- After SERP validation of a topic (PAA data available)
- Once the main article is published (for internal linking)
- As a topical authority booster ahead of important keywords

**Workflow:**
1. Write and publish the main article
2. Pull the PAA questions from Google
3. Create one FAQ page per question
4. Link every FAQ page to the main article
5. Link from the main article to the FAQ pages

### ✅ FAQ pages DO:
- Exact PAA question as H1 and title
- Direct answer in the first 2 sentences
- 120 words max
- Internal link to the parent article
- Subfolder structure for FAQ pages

### ❌ FAQ pages DON'T:
- Schema on individual FAQ pages (unnecessary)
- Overlong answers (>200 words)
- Keyword stuffing in the answer
- FAQ pages without a parent article
- Accordion when you have little authority
- Bulk runs across your whole keyword list. A handful of answers per main article is the method; dozens of LLM-written pages a week is the scaled-content shape (Section 10)

---

## 16. GOOGLE IS CONTENT AGNOSTIC

### The principle

Google doesn't judge whether your content is "good". Google judges whether users are satisfied with your result.

**Proof:** A leaked Google-internal slide says verbatim: "We are agnostic about what content the user is looking for." Google's Quality Raters Guidelines confirm it: raters assess whether a page satisfies user intent, not whether the content is "well written".

**What this means:**
- E-E-A-T is not an algorithm signal — it's a guideline for quality raters
- Google measures user satisfaction (clicks, pogo-sticking, dwell time), not "content quality"
- A 300-word article that answers the question perfectly beats a 3,000-word article that writes around the topic
- "Skyscraper content" doesn't work because it's long — it works because it answers more questions

### Consequence for content strategy

1. **Don't ask:** "Is this content good enough?"
2. **Ask instead:** "Does this page answer the query better than the current #1?"
3. **Measure:** GSC click-through rate and pogo-sticking rate
4. **Optimize:** Not the prose — the answer to the question

### Practical implementation

- **Title tag:** Must mirror the query, not be "creative"
- **First paragraph:** Direct answer to the query (for Featured Snippets AND user satisfaction)
- **Page structure:** What the user is searching for must be visible above the fold
- **No filler:** Intro paragraphs like "In today's digital world..." are poison. Get straight to the point.

**Source:** Leaked Google-internal slide, Google Quality Raters Guidelines, David Quaid's analysis

---

## 17. AUTHORITY MANAGEMENT / SHAPING

### The principle

Authority is a finite resource you have to actively manage. Every internal link distributes authority from the sending page to the receiving page. Link wrong and you waste authority on pages that don't need it — or worse, you dilute the authority your money pages need.

**Core insight (u/WebLinkr / David Quaid):**
> Authority flows like water through a plumbing system. Every internal link is a pipe. If you have 50 links on a page, each link gets 1/50 of the available authority. Most pages have far too many links.

### The 3 authority mistakes

1. **Authority dilution:** Too many internal links per page → each link gets only a fraction
2. **Authority to the wrong pages:** Links to pages that already rank (they don't need help) instead of pages that need a push
3. **Link spirals:** A links to B, B to C, C to A → authority spins in circles instead of flowing

### Practical implementation

**Authority audit:**
1. Identify your top 10 money pages (highest commercial intent)
2. Check: how many internal links point to each money page?
3. Check: which pages do those links come from? (strong pages = valuable links)
4. Check: do your money pages have too many outgoing links?

**Authority Shaping rules:**
- **Max 20-30 internal links per page** (fewer = stronger authority flow per link)
- **Don't link to pages ranking at position 1-3** (they don't need help)
- **Prioritize pages at position 4-20** (those are the "almost there" pages)
- **Do NOT link to pages at position 95+** (not ready yet — the authority evaporates)
- **Place links MID-paragraph** (not in sidebars, footer, navigation)

**Authority flow direction:**
```
Hub page (high authority) → Money page (needs a push) → Conversion
      ↑
Supporting content (builds Topical Authority)
```

- Supporting content links to the hub
- Hub links to money pages
- Money pages do NOT link back (to retain authority)

**Source:** u/WebLinkr, David Quaid's Authority Shaping framework

**Live example with real numbers: Section 27.2** — one in-content link from a power page moved a stuck page from position 13.8 to 5.4.

---

## 18. THIN STARTER PAGES

### The principle

Not every page has to be a 2,000-word article from day one. A "Thin Starter Page" is a deliberately short page (200-400 words) you publish to test whether Google indexes and ranks it at all — before you invest time in a full article.

**Why it works:**
- Google indexes the page and GSC shows you which queries it triggers
- Within 2-4 weeks you see whether the page gets impressions
- You save hours of work on keywords that turn out to be worthless
- You can expand the content later based on real GSC data

### Workflow

1. **Create a thin page:**
   - H1 = exact target keyword
   - 200-400 words of direct answer
   - No filler, no padding
   - Internal link from a relevant hub page

2. **Wait 2-4 weeks:**
   - Watch GSC: is the page getting impressions?
   - Which queries trigger the page? (often surprising!)
   - What position is it at?

3. **Decide based on data:**
   - **Impressions + position 10-30:** → Worth it! Expand into a full article
   - **Impressions + position 50+:** → Potential, but the content needs more depth
   - **No impressions after 4 weeks:** → Keyword is too hard or irrelevant. Stop investing.
   - **Unexpected queries:** → Adjust the content toward the actual queries

4. **Expand:**
   - Keep the same URL (no redirect needed)
   - Expand the content based on the queries GSC shows
   - Add more internal links

### When to use thin pages

- **Yes:** New niche, untested keywords, long-tail queries, PAA questions
- **No:** Head keywords you know you rank for, money pages, competitive SERPs
- **Not as a batch.** A thin starter is one page for one real query, written to answer it. Hundreds at once from the same template, at a velocity that makes no sense for your site, is the scaled-content shape (Section 10), no matter who or what wrote them

### Advantage over "research first, then write"

Traditional: 4h research → 8h writing → publish → hope
Thin page: 30min writing → publish → 2 weeks of GSC → decide on data → expand or delete

**You test with real Google data instead of keyword-tool estimates.**

---

## 19. TOPICAL AUTHORITY RE-EVALUATION HACK

### The principle

When you publish a page, Google scores it based on your Topical Authority in that topic at that moment. If you had 3 pages on the topic back then and 30 now, Google never updated your authority — the page is still being scored with the old, low authority.

**Mechanics behind it:** Pandu Nayak confirmed under oath (DOJ testimony) that NavBoost uses a **rolling 13-month window** of aggregated click data. A republish under a new URL hits a fresh window — that is the mathematical reason this hack works. Full NavBoost mechanics: see Section 26.3.

**The problem:**
- You published an article on "Best CRM Tools" 12 months ago
- Back then you had 5 pages on CRM
- Today you have 25 pages on CRM
- The article ranks at position 15 — even though you now have 5x the authority
- Google never re-evaluated the page

### The hack: republish under a new URL

1. **Identify candidates:**
   - Pages ranking at position 8-25 (visible, but not top)
   - Keyword difficulty < 30 (should be rankable)
   - You've published significantly more content in this cluster since the original publish

2. **Republish:**
   - Create the page under a new URL (e.g. `/crm-tools-2026/` instead of `/crm-tools/`)
   - Update and improve the content
   - Fresh meta data, current year in the title

3. **Set up a 301 redirect:**
   - Old URL → new URL (301 permanent redirect)
   - Transfers link equity from external backlinks
   - Google crawls the new URL and scores it **with your current authority**

4. **Result:**
   - Google re-evaluates the page with your current Topical Authority
   - Position can improve significantly (15 → 5 is possible)
   - You keep all external backlinks via the 301 redirect

### When NOT to re-evaluate

- The page already ranks at position 1-5 (don't break it)
- You haven't built additional authority (no cluster growth)
- The page has many valuable backlinks and you're unsure the 301 will work cleanly

### Automating detection

You can flag re-evaluation candidates automatically in your own tooling:
- Compare cluster size at the page's publish date vs. today (count of published pages in the same topic cluster)
- Run a position + KD analysis (position 8-25 and KD < 30 = rankable but underperforming)
- Compute an authority growth factor (cluster size now ÷ cluster size at publish) and rank candidates by it

**Source:** David Quaid's Topical Authority framework, u/WebLinkr

---

## 20. PROGRAMMATIC SEO

### The principle

Programmatic SEO (pSEO) means: build a template, change one variable, generate hundreds of pages. Each page targets a specific long-tail keyword.

**Examples:**
- `/jobs-in-[country]/` → 176 pages for 176 countries (job board)
- `/[tool]-alternatives/` → 50 pages for 50 tools (tool directory)
- `/cost-of-living-in-[city]/` → 200 pages for 200 cities
- `/[keyword]-guide-[year]/` → automatically updated yearly guides

### Why it works

1. **Scale:** One template, hundreds of rankable pages
2. **Long-tail:** Every page is an exact query match
3. **Topical Authority:** 200 pages on the topic "jobs by city" build massive authority
4. **Low competition:** Long-tail keywords are often uncontested

### Prerequisites

- **You need data:** Without unique data, pSEO pages are thin content
- **The template must be good:** The variable component must deliver real value
- **Every page must be valuable on its own:** Not just "[city] is a place in [country]"

### Implementing it right

**Template structure:**
```
H1: [variable] + context keyword
Intro: Dynamic paragraph with unique data points
Data section: Table/charts with the specific data
Context: Comparison with similar entries
CTA: Relevant call to action
Internal links: To related programmatic pages + hub
```

**Quality checks:**
1. Does every page have at least 3 unique data points?
2. Does every page answer a real search query?
3. Is there a reason a user would visit THIS page?
4. Is the data current and correct?

### Hub + Spoke model for pSEO

```
Hub: /jobs/
  ├── /jobs/spain/
  │     ├── /jobs/spain/madrid/
  │     └── /jobs/spain/barcelona/
  ├── /jobs/greece/
  └── /jobs/brazil/
```

- Hub links to all programmatic pages
- Programmatic pages link back to the hub
- Sibling links between related pages (e.g. cities in the same country)

### pSEO traps

- **Scaled content abuse:** the risk isn't the template, it's the reason. 5,000 pages that exist only because a keyword tool showed search volume are a scaled content site, whatever you call it internally. Many "we got hit for pSEO" posts describe exactly that: the technique didn't get them penalized, the purpose did (David Quaid, Section 10)
- **Index bloat:** Thousands of low-quality pages can damage the entire domain
- **Duplicate content:** Templates that differ in only one word
- **No data:** "Best restaurants in [city]" without real restaurant data = worthless

### pSEO mechanics (David Quaid, detail insights)

**URL recycling for ephemeral content:**
- Job specs, offers, events etc. that are only live briefly → recycle the URL instead of creating a new one
- Example: `/cpa-in-new-york/` stays in place; new job content gets published under the same URL
- The URL keeps its authority and keeps ranking

**Authority distribution on large pSEO sites:**
- Authority thins out fast across hops (damping `d=0.85` per hop + outlink dilution × hop count) → on 1M+ page sites, most pages are NOT within 3 tiers of the homepage. For the math see Section 5 Internal Linking; Reasonable Surfer refinement in Section 26.3.
- **The biggest pSEO problem:** How do you build pages that get traffic themselves, so that their child pages get indexed?
- You want category pages indexed that link to live content, NOT the individual content pages directly
- Authority is "lumpy" — not evenly distributed. Different pages at different levels. That's intentional — you want authority centers.

**Duplicate detection in pSEO:**
- **Identical page title + H1 on two pages = Google sees a duplicate** — regardless of the rest of the content
- Changing only title + H1 is enough to differentiate
- If page titles differ and contain variables → Google treats them as individual pages

**Slug determines index order:**
- Slug with a word outside your Topical Authority → the page struggles
- 20 pages overlapping on the same slug → they compete against each other in rankings
- **With identical pSEO pages (same authority, same distance from the homepage): crawl order determines which gets indexed first**

**"Crawl budget" doesn't exist:**
- Triaging happens automatically through authority
- If everyone reached DA70, DA70 would become DA20 → self-correcting system
- Worrying about crawl efficiency is a waste of time

**Uncontested keywords as a growth strategy:**
- If you build 200 pSEO pages covering 2,000 keywords and ONE takes off → that page becomes an authority center
- Like spoke-and-hub: the successful page distributes authority to its child pages
- Low KD + no competition = the best pSEO candidates
- Each of the 200 still needs its own reason to exist (real data, real inventory, see Prerequisites). If search volume is the only reason, that's the scaled-content pattern from the traps above

---

## 21. VIDEO SERP DOMINATION

### The principle

Google shows video results for many queries — especially "how to", tutorials, and reviews. If you have a video on YouTube AND embedded on your page, you can occupy two SERP positions at once: an organic text result + a video result.

**Why multi-platform:**
- YouTube is the second-largest search engine
- Google favors YouTube videos in video carousels
- A video on your page + YouTube + TikTok/Shorts = 3x visibility for the same content

### Strategy

1. **Identify video keywords:**
   - Check the SERPs: does Google show a video carousel for your target keyword?
   - "How to", "tutorial", "review", "comparison" → almost always video SERPs
   - No video carousel → video is less worth it

2. **Create the video:**
   - Doesn't need high production value — screencasts and talking head are enough
   - Same content as the article, presented visually
   - Title = exact target keyword + year
   - Description = summary + link to the article

3. **Multi-platform distribution:**
   - **YouTube:** Full version (5-15 min), SEO-optimized title, chapters, timestamps
   - **Your own page:** Embed the video + VideoObject schema
   - **TikTok/Shorts/Reels:** 30-60 second short version, link in bio/description

4. **Video schema on your page:**
   ```json
   {
     "@type": "VideoObject",
     "name": "Video title",
     "description": "Description",
     "thumbnailUrl": "...",
     "uploadDate": "2026-01-01",
     "contentUrl": "youtube-url"
   }
   ```

### When to do video content

- **Yes:** How-to queries, tool reviews, comparisons, tutorials
- **No:** Informational queries that work better as text (definitions, lists)
- **Bonus:** Videos that get clicks on YouTube send engagement signals that also help your article

---

## 22. PRESS RELEASES FOR LLM MANIPULATION

### The principle

LLMs (ChatGPT, Perplexity, Gemini) scrape and index news sources and press-release platforms. If you publish a press release about your product, that information gets absorbed into the LLMs' training data and RAG indexes. Which means: LLMs cite your product when users ask relevant questions.

**Why it works:**
- LLMs prioritize sources that look like "news"
- Press-release platforms have high domain authority
- Content on PR platforms gets picked up by news aggregators
- LLMs don't distinguish between real news and paid press releases

### Costs and platforms

- **Cheap PR platforms:** $50-150 per release (e.g. PRWeb, Newswire, EIN Presswire)
- **Expensive PR platforms:** $400-800 (Business Wire, PR Newswire) — more distribution
- **ROI:** Far cheaper than traditional backlink campaigns

### Practical implementation

1. **Write the press release:**
   - **Headline = the query people search, brand at the end** ("New screenshot tool for Windows", not "[Brand] launches v2"). Searchers look for the category, not for a name they don't know yet (Section 6.7)
   - Find a newsworthy angle (launch, update, study, award)
   - Include a quote from the "founder" (LLMs love quotes with attribution)
   - Product name + USP + website in the first 2 paragraphs
   - Naturally work in the keywords you want to trigger in LLMs

2. **Distribution:**
   - Publish on 2-3 PR platforms simultaneously
   - Timing: Tuesday-Thursday mornings (highest pickup rate)
   - Follow-up: check 2-4 weeks later whether the LLMs picked up the info

3. **Test whether it works:**
   - Ask ChatGPT/Perplexity about your product or your niche
   - Check whether your product/brand shows up in the answers
   - Compare before/after

### Optimizing for LLM pickup

- **Clear facts:** "X has feature Y and costs Z" → LLMs can quote that directly
- **Comparison context:** "Compared to [competitor], X offers..." → LLMs use that for comparison answers
- **Quotes:** "According to [founder name], founder of X, ..." → LLMs love attributing
- **Numbers:** User counts, pricing, performance metrics → concrete data LLMs can repeat

### Warning

- Press releases are NOT a substitute for real PR and real backlinks
- Works best as a complement to organic content
- Don't overdo it: 1-2 press releases per quarter is enough
- Content must be factual — LLMs spread your claims further, and that can backfire

**Source:** LLM SEO research, PR distribution analyses

---

## 23. CRAWLING & INDEXING MECHANICS

### Indexing Speed = Authority (Matt Cutts)

- **Google can index within seconds** when a high-authority site links to you
- CNN links to you → Google crawls you immediately
- Blogs with enough links → Google comes back frequently
- **The easiest way to get indexed faster: earn more links** that show you are a useful site
- There is no shortcut — authority determines crawl frequency

### Google Bot Architecture

**All Google bots since 2016 are full Chromium browsers:**
- They can render client-side JavaScript
- SSR (server-side rendering) is NOT mandatory for SEO
- SPAs (single-page applications) can be read by Google
- BUT: Google only invests rendering resources if enough PageRank/links exist
- Stripped-down Chromium version — lightweight, covers ~50% of sites
- Complicated JavaScript → goes into a separate worker queue that can take weeks

**Google supports 57 file types:**
- HTML is only ONE of them
- It can read: BAS, TXT, PDF, Sheets, and 52 more formats
- If all your SEO rules are based on HTML document structure (meta description, H1, HX tags, images), you are ignoring 56 other file types Google indexes

### 5 Tiers of Google Bots

1. **Tier 1 — top 1% of the web:** CNN, White House, top pages of Facebook/X — real-time crawling, the bot returns every few seconds
2. **Tier 2 — important mid-web pages:** Not the whole domain, only individual pages with authority
3. **Tier 3 — discovery bots:** The Chrome browser logs ALL visited URLs into a crawl list, regardless of whether those URLs already sit on other lists
4. **Tier 4-5 — long tail:** Rare crawling, low priority

**Important:** You CANNOT control crawling. Google wants to crawl the entire web. More crawling ≠ more indexing.

### "Crawled, Not Indexed" = primarily an AUTHORITY problem

**What Google says:** your content lacks quality.
**What actually happens:** you usually lack authority.

**Proof:** the same content on a high-authority site gets indexed immediately. On a new site it does not. **Authority dominates the indexing decision**, but quality is not zero — the May 2024 Content Warehouse leak shows `OriginalContentScore` (0-127, 7-bit) and `CompressedQualitySignals` as per-document quality bundles. Practical order: for 99% of sites, authority is the bottleneck.

**Authority gates index inclusion; quality acts in ranking** (clean separation — see Section 26.3 for the full T/Q/P architecture).

**Google's practical reasoning (David Quaid's assessment — still directionally correct):**
- Google has NO EEAT-based hard quality guidelines for indexing (E-E-A-T is a rater guideline, not a bot algorithm)
- Google cannot check whether content is "true" — how would Google know whether a product launched yesterday is real?
- Opinion cannot be right or wrong — Google cannot filter by "craftsmanship quality"
- **The status "crawled" means: there is NO crawling problem. The bot has read the content. Indexing fails primarily on authority — not on content craft, though for AI-generated near-duplicate content `OriginalContentScore` can additionally kick in.**

### How to Fix "Crawled, Not Indexed"

1. **An in-body link from a page with traffic** — even 1 click/week is enough
2. **Do not submit manually via GSC** — that is the wrong path
3. **Do not rely on sitemaps** — they do not help here
4. **Pages must be discovered by crawlers INSIDE OTHER PAGES** — that earns the highest rating
5. **Do not post on social media** — no authority transfer

**What does NOT work:**
- API indexing services — John Mueller said they are treated as spam. These services only transfer fake authority via faux links.
- "How do I index my backlinks?" → If you have to ask, you are buying bad backlinks.

### Sitemaps: What They Actually Do (and What They Don't)

**XML sitemaps:**
- Are NOT an instruction set — they do not tell Google what it MUST index
- Do not tell Google to remove pages that are missing from them
- Useful for LARGE sites with authority to understand index rate (200 published — how many indexed?)
- For sites WITHOUT authority: Google does not read the sitemap; it sits at the very bottom of the priority list
- Do not delete an existing sitemap (no harm), but do not invest energy building one if you have none
- WordPress ships a basic feed for blog posts — Google finds it automatically
- **Even Amazon/eBay sit at only ~42% indexing rate** — because many pages have no links

**HTML sitemaps > XML sitemaps (for small sites):**
- HTML sitemaps are real pages with real links in real context
- Crawlers look at links AND the context around them — HTML sitemaps deliver that context, XML does not
- Footer link to the HTML sitemap → the sitemap receives authority from every page
- Pages with clicks help; pages without clicks dilute
- For 10-page websites: helps distribute authority (not efficient, but better than nothing)

### No-Index Pitfalls

- **Removing no-index ≠ automatic re-indexing** — must be submitted page by page manually via GSC
- No-indexed pages do NOT get crawled (frustrating)
- Penalized sites, by contrast, still get crawled daily
- **Danger of site-wide no-index:** if you no-index 1,400 pages for a month and then lift it, pages get ingested in a different order → can introduce cannibalization that did not exist before

### GSC Manual Submit

- **Limited to 20-25 crawl requests per day**
- Meant for: SERP updates after page content changed (e.g. the CTO changed and SERPs still show the old one)
- NOT meant for: discovery or forcing indexing
- The old "crawl all links on page" function was removed — for good reason

**Source:** Matt Cutts (Google), David Quaid (Primary Position SEO), Edward Show podcast

---

## 24. CTR AS AN AUTHORITY SIGNAL

### The Principle

**SERP click-through rate is a form of authority.** With a high enough CTR you do not get "rotated out" — that is a vital part of PageRank.

### Key Differentiation

| Signal | Does Google use it? | Explanation |
|--------|--------------------|-------------|
| **SERP CTR** | ✅ Yes | Clicks on your result in the SERPs = voting signal, prevents rotation |
| **Bounce rate** | ❌ No | On-site metric; Google does not use it as a ranking signal |
| **Dwell time** | ❌ No | On-site metric; no confirmed ranking signal |
| **Chrome data** | ⚠️ Site-level | `chromeInTotal` from the May 2024 leak: aggregated site views as a popularity proxy. NO per-session bounce/dwell tracking. |

**May 2024 leak update (Chrome data differentiation):** The Content Warehouse leak made the Chrome data field more nuanced. `chromeInTotal` is a site-level aggregate metric (comparable to branded search volume), not user-session tracking. The practical recommendation stands: bounce/dwell are NOT ranking signals (do not try to optimize them); CTR is and remains the most important voting signal. Structurally, Chrome data belongs to the P\* component — full architecture overview in Section 26.3.

### CTR Only Works in Certain Positions

- **Positions 1-3:** CTR optimization makes sense — this is where people click
- **Positions 4-5:** Sometimes still relevant
- **Positions 6-19:** Only at very high search volume (millions/month)
- **Position 20+:** CTR optimization is pointless — simple logic, nobody clicks through to page 3

**Implication:** Get into the top positions first (authority + relevance), THEN optimize CTR (title tags, meta descriptions). The order is not reversible.

### CTR and the LLM Era

- Fewer clicks due to LLM answers → the CTR signal gets harder to build
- Still unclear how Google will manage this
- But: as long as clicks exist, CTR remains a rotation-protection mechanism

**Source:** David Quaid (Primary Position SEO), Edward Show podcast

---

## 25. BACKLINK QUALITY: WHAT ACTUALLY COUNTS

### DA/DR Is a Homepage Assumption

- DA90 means: the HOMEPAGE has authority score 90
- That is NOT inherited by every single page of the domain
- Pages with no traffic, no clicks, or nofollow transfer NO authority
- **Most link sellers use DA90 as a distraction** — if the page you get the link from does not rank itself, you get nothing

### What Actually Counts

- **Does the linking page itself have traffic?** Even 1 click per week is enough
- **Does the page rank?** If the linking page does not rank, the link is worthless
- **Google does NOT segment websites by niche** — a plumber can link to a landscaper, an electrician to a kite shop. Google understands that.

### Diagnostics

- **"How do I index my backlinks?"** → Fundamentally wrong question. Like "How do I clean my gasoline?" — if you buy cheap gas, you are not helping yourself.
- If a backlink needs to be indexed, it is not from a real page with real traffic

**Live example with real numbers: Section 27.1** — a DR-70 directory link whose page has no traffic of its own = zero effect.

---

## 26. T\*/Q\*/P\* ARCHITECTURE + TWIDDLER SYSTEM (May 2024 Leak + DOJ Trial)

### Context

In May 2024, Google's internal Content Warehouse API leaked (~14,000 features documented). In parallel, DOJ trial testimony (USA vs. Google, 2023-2024) disclosed Google's ranking architecture under oath. Together, these two sources deliver the first consistent picture of the internal top-level architecture — not the exact score, but the structural form.

This Section 26 documents the **confirmed signals and the form in which they combine**. It complements the practical Sections 1-25 with the architecture layer underneath — and maps how to approximate it in your own tooling (see 26.6).

---

### 26.1 The Three Top-Level Signals (T\*, Q\*, P\*)

DOJ trial exhibits identify three "fundamental top-level signals" that feed into all of Google's ranking:

**T\* (Topicality) — query-specific**
Measures how well the page matches the concrete query. Three sub-components combined "in a relatively hand-crafted way" (HJ Kim, DOJ testimony):
- **A** (Anchors) — anchor-text match on backlinks AND internal links
- **B** (Body) — body-text match (classic TF-IDF + neural)
- **C** (Clicks) — query × URL click patterns from NavBoost

**Q\* (Quality) — query-independent, site-stable**
Measures how trustworthy the site/page is in general. Eric Lehman (17 years in Google Quality, DOJ testimony): Q\* is *"easily reverse-engineered"* because it is largely query-independent and very stable over time.

**P\* (Popularity) — site-level**
Powered by Chrome data + NavBoost. Pandu Nayak (DOJ): Chrome data + behavioral signals = P\*. Hard to fake because branded search volume, direct traffic, and brand mentions are collective signals.

**Important:** Authority = a function of Q\* AND P\* (not either one alone). The research simplification "T\*/Q\*/P\* with log-linear combination" directly matches what the DOJ exhibits show.

---

### 26.2 The Log-Linear Form (HJ Kim DOJ Disclosure)

HJ Kim, active Google Search engineer, under oath:

> "the vast majority of signals are hand-crafted... combined in a linear way... weighted sum, log-scaled, and we aim for monotonicity"

Translated, that means:

```
log A(p) = α · log T(p, q)
         + β · log Q(p)
         + γ · log P(p)
         + log SiteMod(p)
         + Σ_i log Twiddler_i(p)
```

with `α + β + γ ≈ 1`. Three implications:

1. **No neural black box** for the top-level combination — explicitly a weighted linear sum
2. **Log-scaling on every signal** — prevents any single signal from overruling all others
3. **Monotonicity** — more of a good signal must never lower the score
4. **A zero factor zeroes the product.** In the multiplicative reading, a page with near-zero authority or click history scores near zero no matter how much content you add: 1,000 pages × 0 = 0, 10,000 pages × 0 = 0. Even a tiny trickle of data on every factor beats a lot of data on some. This is what new domains experience as a "sandbox" (Section 13).

**Mathematically equivalent: the multiplicative form**
`log(a·b·c) = log a + log b + log c` — so a multiplicative boost stack is mathematically identical to the log-additive form. Pipelines that compute `score × multiplier1 × multiplier2 × ...` are already structurally close to the DOJ form.

(Cross-ref Section 5 damping: the log form explains why 0.85 per hop and outlink dilution compound multiplicatively instead of simply adding.)

---

### 26.3 Confirmed Signals from the May 2024 Leak

#### Link-Graph Signals (PageRank Family)

| Feature | Meaning |
|---|---|
| `PageRankNS` | "Nearest Seeds" PageRank — modern PR variant based on distance to trusted seed sites (.gov, .edu, top news). TrustRank lineage. |
| `homepagePagerankNs` | Homepage PR as a baseline proxy for new pages on the domain |
| `siteAuthority` | Composite per-site score, feeds into Q\* |
| `sourceType` | Quality tier of the linking document: `TYPE_HIGH` / `TYPE_MEDIUM` / `TYPE_LOW` |
| `homePageInfo` | Trust enum: `NOT_TRUSTED` / `PARTIALLY_TRUSTED` / `FULLY_TRUSTED` |
| `phraseAnchorSpamCount` | Spam detection in the anchor graph |

**Implication:** "DA90" (Ahrefs/Moz) is an approximation of `homepagePagerankNs`, not of `PageRankNS` or `siteAuthority`. This matches Section 25 ("DA90 is a homepage assumption, not inherited by every page") — the leak confirms it mathematically.

---

#### Reasonable Surfer Model (US Patent 8,117,209, 2010)

Not all links are worth the same. Per-link weight = click probability, parameterized by:

- **Position on the page** (top in-content > mid > footer/sidebar > nav boilerplate)
- **Visibility** (font size, font color — hidden text = 0)
- **Anchor-text quality** (descriptive 2-5 words > single keyword > "click here" > image without alt)
- **Source trust** (`sourceType` × `homePageInfo`)
- **Topical match** (anchor + surrounding paragraph context vs. target topic)

**Mathematically:** `rs_weight(i→p) ∈ [0..1]`, then `LinkScore(p) = (1-d) + d × Σ rs_weight(i→p) × LinkScore(i) / outlinks(i)`.

**Implication:** Section 5 ("crawlers use the text around the link") + the Section 6.1 backlink strategy are Reasonable-Surfer-consistent. Two heuristics worth building into your own tooling: default internal anchor text to the target page's primary keyword, and weight hub pages higher (~×1.3) when distributing internal links. Per-link position factors and source-trust tiers are a further refinement (see 26.6).

---

#### Click Signals (NavBoost — DOJ-Confirmed)

NavBoost is **not a "probable" system — it is a provably existing re-ranking system**. Pandu Nayak (DOJ testimony): NavBoost uses a **rolling 13-month window** (previously 18 months) of aggregated click data. Eric Lehman (DOJ): NavBoost is *"not a machine learning system. It's just a big table"* — a lookup table `(query, URL) → click-counts`.

| Feature | Meaning |
|---|---|
| `goodClicks` | Clicks classified as positive |
| `badClicks` | Pogo-stick clicks (quick return to the SERP) |
| `lastLongestClicks` | Longest click of a session — marks "user arrived satisfied" |
| `unsquashedClicks` | Raw, non-normalized clicks |
| `chromeInTotal` | Site-level Chrome views (see Section 24 update) |
| `lastGoodClickDate` | Content decay through absence of recent good clicks |
| `impressions` | SERP appearances, basis for CTR calculation |
| `squashing` | Normalization against click manipulation |

**The 13-month window with decay** is the mathematical form behind Section 19 (re-evaluation hack): when old URLs are republished after cluster growth, they hit a fresh 13-month window. That is why the republish trick works — see Section 19 for the practical application, NavBoost-13mo here for the mechanics.

---

#### Brand/Popularity Signals

| Feature | Meaning |
|---|---|
| Branded search volume | Pandu Nayak, DOJ: strong authority signal |
| Direct traffic / navigational queries | A user typing a niche SaaS site's domain straight into the browser = the brand exists in people's heads |
| Brand mentions (even without a link) | Unlinked mentions count toward Q\* |
| `queriesForWhichOfficial` | Direct brand-protection boost — a site ranks for its own brand name automatically |

**Hard to fake:** Branded search volume cannot simply be bought (unlike backlinks). That makes it the most stable P\* signal — see Section 13 ("branded searches are becoming more important") for the application note.

---

#### Quality Signals (page-level, query-independent)

| Feature | Meaning |
|---|---|
| `OriginalContentScore` | 0-127, 7-bit per-document originality score |
| `titlematchScore` | How well the title matches typical queries for the page |
| `ymylHealthScore` / `ymylNewsScore` | YMYL topic scoring (Your Money Your Life: medicine, finance) |
| `CompressedQualitySignals` | Per-document quality bundle |
| `contentEffort` | LLM-based estimate of content depth/multimedia/effort |
| `predictedDefaultNsr` | Predicted site quality for new pages before click data exists |

**Implication for Section 23 Crawled-Not-Indexed:** `OriginalContentScore` is measurable. For AI-generated near-duplicate content, this score can kick in on top of authority ineligibility. The practical order stands: 99% authority, the rest quality.

---

#### Site-Modifier Signals (Q\*-Differentiator)

| Feature | Meaning |
|---|---|
| `rhubarb` | Page-quality DELTA versus the site's average quality — a weak page on a strong site gets punished |
| `siteRadius` | Embedding distance of the page to the site-mean embedding — how far does the page deviate from the site topic? |
| `siteFocusScore` | Site-internal topical cohesion — how thematically consistent is the site? |
| `OnsiteProminence` | Simulated homepage traffic flow to the page (internal PageRank) |
| `TOFU` (Trust on First Use) | Baseline for new pages until `predictedDefaultNsr` matures |

**Implication:** `siteRadius` mathematically operationalizes what Section 1 describes as a page-level system. A crypto page on a gardening site gets `siteRadius` ≈ 0.8 → minimal `siteAuthority` transfer. If your tooling already stores per-page embeddings, you can approximate this directly (embedding distance of each page to the site-mean embedding — see 26.6).

---

#### Freshness Signals

| Feature | Meaning |
|---|---|
| `bylineDate` | Author/publish date from content metadata |
| `syntacticDate` | Date from URL/title (e.g. "/2026/" or "best-tools-2026") |
| `semanticDate` | Date from body-content analysis |
| `FreshnessTwiddler` | Re-ranking boost for news/trending queries |

Section 5 ("date in ALL key locations") is `syntacticDate` optimization. The Section 19 re-evaluation hack triggers a `bylineDate` refresh.

---

### 26.4 Twiddler System (≥65 in Production)

Twiddlers are a **re-ranking layer AFTER initial retrieval**: first the top 1,000 candidates are found (Ascorer), then Twiddlers cut that down to the top 100 for SuperRoot. Twiddlers combine multiplicatively — equivalent to the log-additive form from 26.2.

**The leak names these signals, it does not weigh them.** The Content Warehouse documentation contains attribute names and short descriptions, no multipliers, weights or thresholds. Earlier versions of this table listed effect sizes like "×0.5" or "×0.2-0.7": those numbers had no source and were removed. What the leak supports is the *direction* (demotion or promotion) and the description below, nothing more.

#### Demotions (direction: score down)

| Signal | What the leak says / what it targets | Source |
|---|---|---|
| `babyPandaDemotion` / `babyPandaV2Demotion` | Helpful-content-style quality demotion | May 2024 leak |
| `exactMatchDomainDemotion` | Demotion for exact-match domains (lineage: the 2012 EMD update against low-quality EMDs). Strength unknown, see Section 5 "Exact-Match Domains" | May 2024 leak |
| `productReviewPDemoteSite` | Weak review sites | May 2024 leak |
| `AnchorMismatch` | Per-link demotion when the anchor does not match the target topic | May 2024 leak |
| `SerpDemotion` | Demotion based on SERP behavior (e.g. pogo-sticking back to the results) | May 2024 leak |
| `NavDemotion` | Poor on-site UX after the click | May 2024 leak |
| `hostAge` | "The earliest firstseen date of all pages in this host/domain", used in a twiddler to sandbox **fresh spam** at serving time. Not a blanket penalty on new domains, see Section 13 "New domains: no sandbox" | May 2024 leak |
| `unauthoritativeScore` / `scamness` / `uacSpamScore` | Actively computed spam penalties | May 2024 leak |

#### Promotions (direction: score up)

| Signal | What the leak says / what it targets | Source |
|---|---|---|
| `FreshnessTwiddler` | News/trending boost | May 2024 leak |
| `authorityPromotion` | Positive boost field | May 2024 leak |
| `queriesForWhichOfficial` | Brand protection (for your own brand name) | May 2024 leak |

**Architecture implication for your own scoring stack:**
If your content-scoring pipeline applies multiplicative boosts (e.g. topic-tier boosts ×1.05-1.15, difficulty penalties ×0.70-0.85), it is structurally a **Twiddler stack** — mathematically equivalent to the log-additive form. Document which boost approximates which T\*/Q\*/P\* component, and keep every multiplier small and bounded so no single signal overrules the rest (Google's log-scaling lesson).

---

### 26.5 "Easily Reverse-Engineered" — What That Means

Eric Lehman (17 years in Google Quality) said under oath: Q\* is *"easily reverse-engineered"* because it is largely query-independent and very stable. Translated for tool builders:

**What is approximable:**
- Q\* components via embedding similarity (`OriginalContentScore` approximation), title-query match, YMYL classification
- P\* via GSC clicks + branded search volume + Chrome data aggregate (see Section 24 update)
- Site modifiers (`siteRadius`, `siteFocusScore`, `rhubarb`) via embeddings + per-page quality mean

**What is structurally NOT approximable:**
- `lastLongestClicks` / `goodClicks` / `badClicks` differentiation — the GSC API delivers only aggregates, not per-session detail
- Exact `SeedDistance` / `PageRankNS` — would require the complete backlink graph with traffic-filtered seed sites
- Exact Twiddlers — all Google-internal, exact multipliers not public

**Confidence layers (research output):**
- Which signals exist: ~90% (leak + DOJ + 2 independent analyst clusters)
- Structure (T×Q×P × Twiddler): ~85% (DOJ exhibit, explicit)
- Log-linear form: ~85% (HJ Kim, direct quote)
- 13-month window: ~100% (Pandu Nayak, sworn testimony)
- Exact weights α/β/γ: ~25% (documented nowhere, query-type-dependent)

**Realistic ceiling:** tool builders can land at ~75-80% of the "real" model. The missing quarter is exact weights (query-type-dependent anyway) and internal ML re-rankers (RankBrain, RankEmbed-BERT, DeepRank).

---

### 26.6 Implementation mapping (theory → practice)

You cannot rebuild Google — but any topic-recommendation or content-scoring system gets better the closer its internal authority approximation tracks the DOJ/leak model. Heuristics that translate directly into your own tooling:

**P\* — popularity approximation**

Approximate per-page popularity as a weighted blend of log-scaled signals:
- ~60% click data (GSC clicks over a 28-90 day window, log10-scaled; optionally apply exponential time decay `exp(-t/τ)` so recent clicks weigh more)
- ~30% internal-link score (inbound internal-link count, log10-scaled; weight links from hub pages higher, ~×1.3; a Reasonable Surfer position factor is a further refinement if you can extract link position from the rendered DOM)
- ~10% impressions (log10-scaled)

Boost topic clusters where the site already earns clicks (e.g. ×1.05 growing, ×1.10 strong) — an empirical per-topic click signal, equivalent to NavBoost aggregation. Branded search volume can be layered on as a site-level popularity term.

**Q\* — quality approximation**

- Title validation against target queries — a `titlematchScore` precursor (enforce descriptive titles within a fixed length band, e.g. 150-220 characters)
- Embedding-based duplicate/cannibalization detection: **cosine similarity ≥ 0.85 between two pages = true duplicate/cannibalization** — block or merge before publishing. An `OriginalContentScore` precursor.
- Page-quality delta versus the site mean — a `rhubarb` precursor: flag pages that fall far below the site's average quality

**T\* — topicality approximation**

- SERP-intent override: if 6 of the top 10 results for a keyword are commercial, classify it bottom-of-funnel regardless of phrasing
- Funnel-position pattern matching (BoF/MoF/ToF indicator terms)
- GSC match boost: upweight topics where the site already ranks for related queries — a click-match (C) precursor
- Anchor defaults: when generating internal links, default the anchor text to the target page's primary keyword (descriptive 2-5-word anchors beat generic ones) — a direct A-component heuristic
- The full composition mirrors the DOJ ABC structure: `T = a_A·AnchorMatch + a_B·BodyMatch + a_C·ClickMatch` with documented weights

**Site modifiers**

If you store per-page embeddings, both leak signals are directly computable:
- `siteFocusScore` (site-level): topical cohesion — how tightly pages cluster around the site-mean embedding
- `siteRadius` (page-level): embedding distance of a page to the site-mean embedding; dampen authority transfer for off-topic pages (siteRadius > 0.5 → reduced transfer)

**Twiddler stack**

Structure boosts/demotions as an explicit stack of bounded multipliers (mathematically equivalent to the log-additive DOJ form — see 26.2 and 26.4). The values are your own tuning choices, not Google's (the leak contains none). Approximable demotions:
- Originality below threshold → ×0.85 (Panda-style quality demotion, own heuristic)

Do **not** add a domain-age penalty. `hostAge` targets fresh *spam*, and a new domain's slow start is already explained by near-zero click and link factors in the multiplicative form (26.2). Modeling age on top double-counts it and makes your tooling more pessimistic about new sites than Google is.

Hard to approximate without Google-internal data (document as known limits rather than faking them):
- `goodClicks` / `badClicks` / `lastLongestClicks` differentiation — GSC delivers aggregates only, no per-session browser telemetry
- Exact `SeedDistance` / `PageRankNS` — requires a complete backlink graph with traffic-filtered seed sites
- Exact demotion multipliers — Google-internal, never published

---

### 26.7 Sources

**Primary sources (public + sworn):**
- Mike King — *"Secrets from the Google Algorithm Leak"*, iPullRank (May 2024) — ipullrank.com/google-algo-leak
- May 2024 Content Warehouse leak — searchengineland.com/google-search-document-leak-ranking-442617
- Pandu Nayak, DOJ trial testimony 2023 — NavBoost, Glue, 13-month window
- Eric Lehman, DOJ trial disclosure — *"Q\* easily reverse-engineered"*, NavBoost as a big table
- HJ Kim, trial exhibit — *"linear-log, weighted sum, monotonicity"*

**Academic foundations:**
- Brin/Page (1998) — *"The Anatomy of a Large-Scale Hypertextual Web Search Engine"* — original PageRank
- Boldi/Vigna (2005) — *"PageRank as a Function of the Damping Factor"* — vigna.di.unimi.it
- US Patent 8,117,209 (2010) — Reasonable Surfer model
- Liu et al. (2008) — BrowseRank, Microsoft Research — user-browse graph parallel to the link graph

**Secondary analysis:**
- Hobo-Web — *"How Google Works in 2025 — DOJ Disclosures"*
- Search Engine Land — *"The ABCs of Google Ranking Signals (Q\*, P\*, Magnitude)"*
- Grumpy Old SEO — *"Twiddlers and re-ranking architecture"*
- Bill Slawski (SEO by the Sea) — Reasonable Surfer patent analysis

**Cross-references to other sections:**
- Section 1 (Topical Authority) → 26.3 site modifiers (`siteRadius` operationalizes the page-level system)
- Section 5 (Internal Linking + Damping) → 26.3 Reasonable Surfer (per-link rs_weight)
- Section 19 (Re-Evaluation Republish) → 26.3 NavBoost 13-month window (the mechanics behind the hack)
- Section 23 (Crawled-Not-Indexed) → 26.3 quality signals (`OriginalContentScore` as a secondary filter)
- Section 24 (CTR as authority signal) → 26.3 NavBoost (`chromeInTotal`, site-level)
- Section 25 (Backlink quality, DA90) → 26.3 link graph (`homepagePagerankNs` ≠ `siteAuthority`)

**Source:** David Quaid (Primary Position SEO)

---

## 27. FIELD NOTES — TESTED ON MY OWN SITES

The sections above are distilled from other people's work. This one is different: things I ran on my own (small) sites, with the numbers I actually saw. Sample size = 1, treat accordingly — but these are the experiments that turned the theory above from "sounds plausible" into "watched it happen". More get added as I run them.

### 27.1 The DR-70 directory link that does nothing (yet)

**The setup:** Startup directories advertise "DR 70+ dofollow backlink". I listed one of my products on TrustMRR. The domain looks great on paper — per DataForSEO it pulls ~2,400 organic clicks/month and ranks for plenty of keywords (probably more; these tools aren't 100% accurate).

**The catch:** the page my link actually sits on neither ranks nor has any traffic of its own.

**What Section 25 predicts:** a link only transfers authority if the linking PAGE itself ranks and earns clicks. Domain-level numbers are a homepage assumption.

**What happened:** nothing. The link's current SEO value is ~zero. DR went up (number go up, feels nice) — rankings did not move.

**The nuance worth keeping:** this is "yet", not "never". If that listing page ever starts ranking and earning clicks, the link becomes genuinely valuable at that moment — and the reverse holds too: a link from a DR-0 page WITH real clicks is super valuable today. A directory listing is a lottery ticket on the page's future, not a transfer of the domain's present.

**Lesson: evaluate the page that carries your link, never the domain.**

### 27.2 The internal-link push, measured: position 13.8 → 5.4

**The setup (Section 17 in action):**
- My "power page" — the most organic clicks on the site after the homepage.
- A second page ranking for a commercially important keyword, stuck around **position 13.8** (GSC) — squarely in the 10-20 "almost there" zone.

**The action:** ONE in-content link from the power page to the stuck page. Conditions checked first:
1. **Contextual bridge** — the test: would a user who clicks for the power page's keyword plausibly also click for the target's keyword? Yes → the link makes sense (Section 1, Topical Bridges).
2. Target sits in the **position 10-20 zone** — not at 90 (too early, the authority evaporates), not at 1-3 (doesn't need it).
3. The power page keeps **few outbound links** — every additional outlink dilutes the flow per link. The power page itself doesn't suffer no matter how many links it carries; only what it passes on thins out (Section 5).

**What happened:** the stuck page climbed from **position 13.8 to 5.4** over the following weeks. Page two to top half of page one.

**Lesson: internal links from pages that earn clicks are the cheapest authority you own. Route them deliberately — contextual, into the 10-20 zone, few at a time.**

---

# Setup

Three pieces: the **skills** (a Claude Code plugin), two **MCP servers** (live data: Google Search Console + DataForSEO), and the **knowledge base** (the methodology the skills cite).

## 1. Install the skills

As a plugin (updates come through the marketplace):

```
/plugin marketplace add mxfschr/claude-code-seo
/plugin install seo@mxfschr
```

Update later with `/plugin marketplace update mxfschr`, or turn on auto-update for the marketplace in `/plugin`.

Without the plugin system, copy the skill folders:

```bash
# global (all projects)
cp -r skills/* ~/.claude/skills/

# or per-project
cp -r skills/* your-project/.claude/skills/
```

They show up as `/seo-analyze`, `/seo-quick-wins` and so on (as a plugin also as `/seo:seo-analyze`). Coming from the old slash commands? Delete `~/.claude/commands/seo-*.md`, otherwise the old copies keep answering to `/seo-analyze`.

## 2. Google Search Console MCP (free, required)

The skills call tools named `mcp__gsc__*`, so the server **must be registered under the name `gsc`**.

This setup uses [`suganthan-gsc-mcp`](https://www.npmjs.com/package/suganthan-gsc-mcp), which ships SEO-specific tools beyond raw search analytics (`quick_wins`, `cannibalization_check`, `inspect_url`, `content_gaps`, …).

```jsonc
// .mcp.json (project) or claude_desktop_config.json (global), under "mcpServers":
"gsc": {
  "command": "npx",
  "args": ["-y", "suganthan-gsc-mcp"],
  "env": {
    "GSC_AUTH_MODE": "oauth",
    "GSC_OAUTH_SECRETS_FILE": "/path/to/your-oauth-client-secret.json",
    "GSC_SITE_URL": "sc-domain:yourdomain.com",
    "GSC_SITE_URLS": "sc-domain:yourdomain.com,sc-domain:yourotherdomain.com"
  }
}
```

> On Windows, wrap the command as `"command": "cmd", "args": ["/c", "npx", "-y", "suganthan-gsc-mcp"]`.

Getting the OAuth secrets file (one-time, ~5 minutes):
1. [Google Cloud Console](https://console.cloud.google.com/) → create/select a project
2. Enable the **Search Console API**
3. Credentials → Create **OAuth client ID** (Desktop app) → download the JSON
4. Point `GSC_OAUTH_SECRETS_FILE` at it; first run opens a browser to authorize

`GSC_SITE_URL` is the default property the skills query; `GSC_SITE_URLS` lets you switch between several properties. Domain properties use the `sc-domain:` prefix.

**Heads-up on date ranges:** the tools take a `days` parameter (28/90/180). Explicit start/end dates are ignored — widen via `days`.

## 3. DataForSEO MCP (paid, pay-per-call, required for difficulty/SERP/volume)

The skills call tools named `mcp__dataforseo__*`, so the server **must be registered under the name `dataforseo`**.

```jsonc
"dataforseo": {
  "command": "npx",
  "args": ["-y", "dataforseo-mcp-server@2.9.13"],
  "env": {
    "DATAFORSEO_USERNAME": "your-account-email",
    "DATAFORSEO_PASSWORD": "your-api-password"
  }
}
```

**Pin version 2.9.13.** Version 3 of `dataforseo-mcp-server` replaced the named tools the skills call (`dataforseo_labs_*`, `on_page_*`) with four generic ones, so the skills break on it. On Windows, if `npx` is not found, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "dataforseo-mcp-server@2.9.13"]`.

Sign up at [dataforseo.com](https://dataforseo.com/) — it's prepaid credit, **no subscription needed**. The skills only use:
- **DataForSEO Labs** (keyword difficulty, related keywords, keyword ideas, keyword suggestions, ranked keywords, search intent, domain rank)
- **SERP API** (live Google results for validation, fetched by `scripts/serp.mjs`, see below)
- **On-Page API** (`/seo-health`, `/seo-link-vet`, the topic gap matrix in `/seo-quick-wins` and `/seo-re-eval`, the unique-angle gate in `/seo-next-content`; billed per page)

Real-world cost per skill run: **$0-0.25** (each skill lists its cost at the bottom; GSC calls are always free). You do **NOT** need the Backlinks API subscription (~$100+/mo) — nothing here uses it.

### Live SERPs come from `scripts/serp.mjs`

Since late September 2026 Google has been serving altered ("poisoned") result pages to many automated clients, and DataForSEO's Live SERPs are hit hard: in a test of 20 keywords on 2026-11-17, DataForSEO's own check flagged 16 as poisoned. The skills therefore fetch live Google SERPs with `scripts/serp.mjs` instead of the MCP tool `serp_organic_live_advanced`. The script asks DataForSEO to repair poisoned SERPs (`resolve_poisoned_results`), which adds the price of one SERP page: about $0.004 instead of $0.002 per 10 results. Where a skill needs the real page URLs (topic gap matrix, unique-angle gate), it also resolves Google's redirect links (`resolve_goto_urls`), which adds about a minute per call.

- It needs Node.js 18 or newer on the PATH.
- It reads `DATAFORSEO_LOGIN` (or `DATAFORSEO_USERNAME`) and `DATAFORSEO_PASSWORD` from the environment. If they are not set, it takes them from the `dataforseo` server entry in `.mcp.json` in the current folder, then in `~/.claude.json`, then in the Claude Desktop config. It never prints them.
- Claude Code asks for permission the first time a skill runs it.

SERP-based advice these skills gave before `scripts/serp.mjs` existed rests on unrepaired SERPs. Re-run the skill before acting on it.

**Optional, no setup:** Bing Webmaster Tools' **AI Performance** report (grounding queries + citation share for Copilot/Bing AI). There's no MCP for it here; `/seo-llm-audit` asks for a spreadsheet export and folds it in when you have one.

## 4. The knowledge base

The skills cite the methodology by section number ("Section 17", "Section 26.3") — all of it lives in [`knowledge-base/seo-knowledge-base.md`](../knowledge-base/seo-knowledge-base.md).

Two ways to use it:
- **Just run the skills.** The relevant rules are baked into each skill's instructions; the knowledge base is the source they were distilled from.
- **Give Claude the full base.** Copy `seo-knowledge-base.md` into your project (e.g. `docs/`) and add one line to your `CLAUDE.md`: `SEO methodology: docs/seo-knowledge-base.md`. Now Claude can look up the reasoning behind any rule mid-task — and you can ask it things like "what does the base say about republishing?"

## 5. Sanity check

Start Claude Code and run:

```
/seo-quick-wins yourdomain.com
```

If you get a table of Pos-4-15 keywords (or an honest "0 quick wins"), everything is wired up.

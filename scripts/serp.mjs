#!/usr/bin/env node
// Live Google SERP from DataForSEO with poisoned-SERP repair (resolve_poisoned_results).
// Source of truth: github.com/mxfschr/claude-code-seo, scripts/serp.mjs.
// positioning-system/skill/scripts/serp.mjs is a byte-identical copy.

import { readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const USAGE = 'Usage: node serp.mjs --keyword "<text>" [--location "United States"] [--language en] [--depth 10] [--device desktop|mobile] [--resolve-urls]';
const NO_CREDENTIALS = 'no DataForSEO credentials found. Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD, or register the dataforseo MCP server with them (docs/setup.md).';
const TIMEOUT_MS = 280000;

const GOTO_RE = /^https?:\/\/(www\.)?google\.[a-z.]+\/(goto|url)\?/i;
const BREADCRUMB_HOST_RE = /^(?:https?:\/\/)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})(?=$|[\s\/›])/i;
const PLATFORMS = { reddit: 'reddit.com', youtube: 'youtube.com', facebook: 'facebook.com', instagram: 'instagram.com', tiktok: 'tiktok.com', linkedin: 'linkedin.com', quora: 'quora.com', medium: 'medium.com', pinterest: 'pinterest.com', x: 'x.com' };

const VALUE_FLAGS = ['--keyword', '--location', '--language', '--depth', '--device'];
const PLACEHOLDER_RE = /^\$\{[^}]*\}$/;

function fail(message, code) {
  process.stderr.write(`serp.mjs: ${message}\n`);
  if (code === 2 && message !== NO_CREDENTIALS) process.stderr.write(USAGE + '\n');
  process.exitCode = code;
}

function parseArgs(argv) {
  const values = {};
  let resolveUrls = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--resolve-urls') {
      resolveUrls = true;
    } else if (VALUE_FLAGS.includes(arg)) {
      if (i + 1 >= argv.length) return { error: `missing value for ${arg}` };
      values[arg] = argv[++i].trim();
    } else {
      return { error: `unknown option ${arg}` };
    }
  }
  for (const flag of VALUE_FLAGS.slice(1)) {
    if (values[flag] === '') return { error: `missing value for ${flag}` };
  }
  let depth = 10;
  if (values['--depth'] !== undefined) {
    const raw = values['--depth'];
    depth = /^\d+$/.test(raw) ? Number(raw) : NaN;
    if (!(depth >= 10 && depth <= 100)) return { error: '--depth must be a whole number from 10 to 100' };
  }
  const device = values['--device'] ?? 'desktop';
  if (device !== 'desktop' && device !== 'mobile') return { error: '--device must be desktop or mobile' };
  const keyword = values['--keyword'];
  if (!keyword) return { error: 'missing --keyword' };
  return {
    keyword,
    location: values['--location'] ?? 'United States',
    language: values['--language'] ?? 'en',
    depth,
    device,
    resolveUrls,
  };
}

function usable(value) {
  return typeof value === 'string' && value !== '' && !PLACEHOLDER_RE.test(value);
}

function credentialsFrom(env) {
  if (!env || typeof env !== 'object') return null;
  const login = usable(env.DATAFORSEO_LOGIN) ? env.DATAFORSEO_LOGIN : usable(env.DATAFORSEO_USERNAME) ? env.DATAFORSEO_USERNAME : null;
  const password = usable(env.DATAFORSEO_PASSWORD) ? env.DATAFORSEO_PASSWORD : null;
  return login && password ? { login, password } : null;
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
  } catch {
    return null;
  }
}

function desktopConfigPath() {
  if (process.platform === 'win32') {
    return path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'Claude', 'claude_desktop_config.json');
  }
  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  }
  return path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
}

function findCredentials() {
  const norm = s => s.replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase();
  const fromEnv = credentialsFrom(process.env);
  if (fromEnv) return fromEnv;
  const mcp = readJson(path.join(process.cwd(), '.mcp.json'));
  const fromMcp = credentialsFrom(mcp?.mcpServers?.dataforseo?.env);
  if (fromMcp) return fromMcp;
  const claude = readJson(path.join(os.homedir(), '.claude.json'));
  const fromClaude = credentialsFrom(claude?.mcpServers?.dataforseo?.env);
  if (fromClaude) return fromClaude;
  const projects = claude?.projects;
  if (projects && typeof projects === 'object') {
    const cwd = norm(process.cwd());
    for (const k of Object.keys(projects)) {
      if (norm(k) !== cwd) continue;
      const fromProject = credentialsFrom(projects[k]?.mcpServers?.dataforseo?.env);
      if (fromProject) return fromProject;
    }
  }
  const desktop = readJson(desktopConfigPath());
  return credentialsFrom(desktop?.mcpServers?.dataforseo?.env);
}

function normalizeHost(host) {
  return host.toLowerCase().replace(/^www\./, '');
}

function domainOf(item, url) {
  if (url) {
    try {
      const host = new URL(url).hostname;
      if (host) return normalizeHost(host);
    } catch {
      // fall through to breadcrumb and platform
    }
  }
  if (typeof item.breadcrumb === 'string') {
    const match = BREADCRUMB_HOST_RE.exec(item.breadcrumb);
    if (match) return normalizeHost(match[1]);
  }
  if (typeof item.website_name === 'string') {
    const name = item.website_name.split('·')[0].trim().toLowerCase();
    if (Object.hasOwn(PLATFORMS, name)) return PLATFORMS[name];
  }
  return null;
}

function shape(args, task, result) {
  const items = Array.isArray(result.items) ? result.items : [];
  const organic = [];
  const serpFeatures = [];
  const peopleAlsoAsk = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const type = item.type;
    if (type === 'organic') {
      const url = typeof item.url === 'string' && item.url !== '' && !GOTO_RE.test(item.url) ? item.url : null;
      organic.push({
        rank: item.rank_group ?? null,
        domain: domainOf(item, url),
        url,
        title: item.title ?? '',
        breadcrumb: item.breadcrumb ?? null,
        website_name: item.website_name ?? null,
        from_web: Array.isArray(item.checks) && item.checks.includes('from_web'),
      });
    } else if (typeof type === 'string' && !serpFeatures.includes(type)) {
      serpFeatures.push(type);
    }
    if (type === 'people_also_ask' && Array.isArray(item.items)) {
      for (const question of item.items) {
        const title = typeof question?.title === 'string' ? question.title.trim() : '';
        if (title) peopleAlsoAsk.push(title);
      }
    }
  }
  return {
    keyword: args.keyword,
    location: args.location,
    language: args.language,
    device: args.device,
    depth: args.depth,
    urls_resolved: args.resolveUrls,
    repaired: organic.some(o => o.from_web),
    cost_usd: typeof task.cost === 'number' ? task.cost : null,
    serp_features: serpFeatures,
    people_also_ask: peopleAlsoAsk,
    organic,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.error) return fail(args.error, 2);

  const credentials = findCredentials();
  if (!credentials) return fail(NO_CREDENTIALS, 2);

  const base = (process.env.DATAFORSEO_API_BASE || 'https://api.dataforseo.com').replace(/\/+$/, '');
  const body = [{
    keyword: args.keyword,
    location_name: args.location,
    language_code: args.language,
    depth: args.depth,
    device: args.device,
    resolve_poisoned_results: true,
    resolve_goto_urls: args.resolveUrls,
  }];

  let res;
  try {
    res = await fetch(base + '/v3/serp/google/organic/live/advanced', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(credentials.login + ':' + credentials.password).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    if (err?.name === 'TimeoutError') return fail('request failed: timed out after 280 s', 1);
    return fail(`request failed: ${err?.message}`, 1);
  }

  if (!res.ok) return fail(`HTTP ${res.status}`, 1);

  let json;
  try {
    json = JSON.parse(await res.text());
  } catch {
    return fail('response is not JSON', 1);
  }

  if (json?.status_code !== 20000) return fail(`DataForSEO error ${json?.status_code}: ${json?.status_message}`, 1);
  const task = json.tasks?.[0];
  if (!task) return fail('DataForSEO returned no result', 1);
  if (task.status_code !== 20000) return fail(`DataForSEO error ${task.status_code}: ${task.status_message}`, 1);
  const result = task.result?.[0];
  if (!result) return fail('DataForSEO returned no result', 1);

  process.stdout.write(JSON.stringify(shape(args, task, result), null, 1) + '\n');
  process.exitCode = 0;
}

await main();

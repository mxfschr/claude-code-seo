import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), 'serp.mjs');

const W = [
  { type: 'ai_overview', rank_group: 1 },
  { type: 'organic', rank_group: 1, url: 'https://google.com/goto?url=CAESabc&gsessionid=x', domain: 'google.com', title: 'E-Invoicing Software & Solutions', breadcrumb: 'https://www.opentext.com › e-invoice-management', website_name: 'OpenText', checks: null },
  { type: 'people_also_ask', rank_group: 1, items: [ { type: 'people_also_ask_element', title: 'What is e-invoicing software?' }, { type: 'people_also_ask_element', title: 'Is e-invoicing mandatory?' } ] },
  { type: 'organic', rank_group: 2, url: 'https://google.com/goto?url=CAESdef', domain: 'google.com', title: 'Best invoicing software?', breadcrumb: '30+ comments  ·  1 year ago', website_name: 'Reddit · r/AccountingDepartment', checks: null },
  { type: 'organic', rank_group: 3, url: 'https://google.com/goto?url=CAESghi', domain: 'google.com', title: 'inkl. kostenlosem Tool', breadcrumb: 'Ca. 8230 Aufrufe  ·  vor 1 Jahr', website_name: 'YouTube · sevdesk', checks: ['is_video'] },
  { type: 'organic', rank_group: 4, url: 'https://google.com/goto?url=CAESjkl', domain: 'google.com', title: 'Unknown thing', breadcrumb: '8 years ago', website_name: 'Some Blog', checks: null },
  { type: 'related_searches', rank_group: 1 }
];

const R = [
  { type: 'organic', rank_group: 1, url: 'https://www.semrush.com/blog/seo-tools/', domain: 'www.semrush.com', title: 'SEO Tools', breadcrumb: 'https://www.semrush.com › blog', website_name: 'Semrush', checks: ['from_web'] },
  { type: 'organic', rank_group: 2, url: 'https://moz.com/tools', domain: 'moz.com', title: 'Moz Tools', breadcrumb: 'https://moz.com › tools', website_name: 'Moz', checks: ['from_web'] },
  { type: 'organic', rank_group: 3, url: 'https://google.com/goto?url=CAESxyz', domain: 'google.com', title: 'Ahrefs', breadcrumb: 'https://ahrefs.com › seo-tools', website_name: 'Ahrefs', checks: ['from_web'] }
];

const N = [ { type: 'organic', rank_group: 1, url: 'https://google.com/goto?url=CAESnbsp', domain: 'google.com', title: 'SEO tools video', breadcrumb: '4.8K+ views\u00a0 ·\u00a0 1 year ago', website_name: 'YouTube\u00a0·\u00a0Nathan Gotch', checks: null } ];

const PASSWORD = 's3cr3t-pw';
const basic = pair => 'Basic ' + Buffer.from(pair).toString('base64');
const fileHomeJson = '\uFEFF' + JSON.stringify({ mcpServers: { dataforseo: { env: { DATAFORSEO_USERNAME: 'file-login', DATAFORSEO_PASSWORD: 'file-pw' } } } });

let server;
let port;
let lastRequest = null;
let requestCount = 0;
const tempDirs = [];

function reply(res, status, payload) {
  const text = typeof payload === 'string' ? payload : JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type': typeof payload === 'string' ? 'text/plain' : 'application/json' });
  res.end(text);
}

function ok(cost, items) {
  return { status_code: 20000, status_message: 'Ok.', tasks: [{ status_code: 20000, status_message: 'Ok.', cost, result: [{ items }] }] };
}

function handle(req, res) {
  let raw = '';
  req.setEncoding('utf8');
  req.on('data', chunk => { raw += chunk; });
  req.on('end', () => {
    let body = null;
    try { body = JSON.parse(raw); } catch { body = null; }
    requestCount++;
    lastRequest = { method: req.method, path: req.url, authorization: req.headers.authorization, body };
    const keyword = body?.[0]?.keyword;
    if (keyword === 'repaired') return reply(res, 200, ok(0.004, R));
    if (keyword === 'taskerror') return reply(res, 200, { status_code: 20000, status_message: 'Ok.', tasks: [{ status_code: 40501, status_message: "Invalid Field: 'keyword'.", cost: 0, result: null }] });
    if (keyword === 'nbsp') return reply(res, 200, ok(0.002, N));
    if (keyword === 'httperror') return reply(res, 500, 'oops');
    if (keyword === 'empty') return reply(res, 200, { status_code: 20000, status_message: 'Ok.', tasks: [{ status_code: 20000, status_message: 'Ok.', cost: 0, result: null }] });
    return reply(res, 200, ok(0.002, W));
  });
}

function tempDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serp-test-'));
  tempDirs.push(dir);
  return dir;
}

function context({ credentials = true, homeFile = null, mcpFile = null } = {}) {
  const home = tempDir();
  const cwd = tempDir();
  if (homeFile !== null) fs.writeFileSync(path.join(home, '.claude.json'), homeFile);
  if (mcpFile !== null) fs.writeFileSync(path.join(cwd, '.mcp.json'), mcpFile);
  const env = {};
  for (const key of ['PATH', 'SYSTEMROOT', 'TEMP', 'TMP']) {
    if (process.env[key] !== undefined) env[key] = process.env[key];
  }
  env.HOME = home;
  env.USERPROFILE = home;
  env.APPDATA = path.join(home, 'AppData', 'Roaming');
  env.DATAFORSEO_API_BASE = `http://127.0.0.1:${port}`;
  if (credentials) {
    env.DATAFORSEO_LOGIN = 'test-login';
    env.DATAFORSEO_PASSWORD = PASSWORD;
  }
  return { cwd, env };
}

function run(args, ctx = context()) {
  return new Promise(resolve => {
    execFile(process.execPath, [script, ...args], { cwd: ctx.cwd, env: ctx.env, encoding: 'utf8', timeout: 30000 }, (err, stdout, stderr) => {
      const code = err ? (typeof err.code === 'number' ? err.code : -1) : 0;
      resolve({ code, stdout, stderr });
    });
  });
}

function assertNoSecret(out) {
  assert.ok(!out.stdout.includes(PASSWORD), 'stdout leaks the password');
  assert.ok(!out.stderr.includes(PASSWORD), 'stderr leaks the password');
}

before(async () => {
  server = http.createServer(handle);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  port = server.address().port;
});

after(async () => {
  await new Promise(resolve => server.close(resolve));
  for (const dir of tempDirs) fs.rmSync(dir, { recursive: true, force: true });
});

test('wrapped SERP: urls null, domains from breadcrumb and platform, features and PAA', async () => {
  const out = await run(['--keyword', 'wrapped']);
  assert.equal(out.code, 0, out.stderr);
  const json = JSON.parse(out.stdout);
  assert.deepEqual(json.organic, [
    { rank: 1, domain: 'opentext.com', url: null, title: 'E-Invoicing Software & Solutions', breadcrumb: 'https://www.opentext.com › e-invoice-management', website_name: 'OpenText', from_web: false },
    { rank: 2, domain: 'reddit.com', url: null, title: 'Best invoicing software?', breadcrumb: '30+ comments  ·  1 year ago', website_name: 'Reddit · r/AccountingDepartment', from_web: false },
    { rank: 3, domain: 'youtube.com', url: null, title: 'inkl. kostenlosem Tool', breadcrumb: 'Ca. 8230 Aufrufe  ·  vor 1 Jahr', website_name: 'YouTube · sevdesk', from_web: false },
    { rank: 4, domain: null, url: null, title: 'Unknown thing', breadcrumb: '8 years ago', website_name: 'Some Blog', from_web: false }
  ]);
  assert.deepEqual(json.serp_features, ['ai_overview', 'people_also_ask', 'related_searches']);
  assert.deepEqual(json.people_also_ask, ['What is e-invoicing software?', 'Is e-invoicing mandatory?']);
  assert.equal(json.repaired, false);
  assert.equal(json.urls_resolved, false);
  assert.equal(json.cost_usd, 0.002);
  assertNoSecret(out);
});

test('repaired SERP: from_web marks, real urls, unresolved wrapper stays null', async () => {
  const out = await run(['--keyword', 'repaired']);
  assert.equal(out.code, 0, out.stderr);
  const json = JSON.parse(out.stdout);
  assert.equal(json.repaired, true);
  assert.equal(json.organic[0].domain, 'semrush.com');
  assert.equal(json.organic[0].url, 'https://www.semrush.com/blog/seo-tools/');
  assert.equal(json.organic[0].from_web, true);
  assert.equal(json.organic[1].domain, 'moz.com');
  assert.equal(json.organic[2].url, null);
  assert.equal(json.organic[2].domain, 'ahrefs.com');
  assert.equal(json.organic[2].from_web, true);
  assert.deepEqual(json.serp_features, []);
  assert.deepEqual(json.people_also_ask, []);
  assert.equal(json.cost_usd, 0.004);
});

test('request body and auth header with --resolve-urls --depth 20 --device mobile', async () => {
  const out = await run(['--keyword', 'repaired', '--resolve-urls', '--depth', '20', '--device', 'mobile']);
  assert.equal(out.code, 0, out.stderr);
  assert.equal(lastRequest.method, 'POST');
  assert.equal(lastRequest.path, '/v3/serp/google/organic/live/advanced');
  assert.equal(lastRequest.authorization, basic('test-login:s3cr3t-pw'));
  assert.deepEqual(lastRequest.body, [{ keyword: 'repaired', location_name: 'United States', language_code: 'en', depth: 20, device: 'mobile', resolve_poisoned_results: true, resolve_goto_urls: true }]);
  const json = JSON.parse(out.stdout);
  assert.equal(json.urls_resolved, true);
  assert.equal(json.depth, 20);
  assert.equal(json.device, 'mobile');
});

test('defaults: depth 10, desktop, resolve_goto_urls false', async () => {
  const out = await run(['--keyword', 'wrapped', '--location', 'Germany', '--language', 'de']);
  assert.equal(out.code, 0, out.stderr);
  assert.deepEqual(lastRequest.body, [{ keyword: 'wrapped', location_name: 'Germany', language_code: 'de', depth: 10, device: 'desktop', resolve_poisoned_results: true, resolve_goto_urls: false }]);
});

test('task error exits 1 with DataForSEO message', async () => {
  const out = await run(['--keyword', 'taskerror']);
  assert.equal(out.code, 1);
  assert.ok(out.stderr.includes("DataForSEO error 40501: Invalid Field: 'keyword'."), out.stderr);
  assert.equal(out.stdout, '');
  assertNoSecret(out);
});

test('HTTP 500 exits 1', async () => {
  const out = await run(['--keyword', 'httperror']);
  assert.equal(out.code, 1);
  assert.ok(out.stderr.includes('serp.mjs: HTTP 500'), out.stderr);
  assertNoSecret(out);
});

test('empty result exits 1', async () => {
  const out = await run(['--keyword', 'empty']);
  assert.equal(out.code, 1);
  assert.ok(out.stderr.includes('DataForSEO returned no result'), out.stderr);
});

test('usage errors exit 2', async () => {
  const cases = [
    [[], 'missing --keyword'],
    [['--keyword', '  '], 'missing --keyword'],
    [['--keyword', 'x', '--depth', '5'], '--depth must be a whole number from 10 to 100'],
    [['--keyword', 'x', '--depth', '101'], '--depth must be a whole number from 10 to 100'],
    [['--keyword', 'x', '--depth', '1.5'], '--depth must be a whole number from 10 to 100'],
    [['--keyword', 'x', '--device', 'tablet'], '--device must be desktop or mobile'],
    [['--keyword', 'x', '--bogus'], 'unknown option --bogus'],
    [['--keyword', 'x', '--location'], 'missing value for --location']
  ];
  const countBefore = requestCount;
  for (const [args, reason] of cases) {
    const out = await run(args);
    assert.equal(out.code, 2, `${args.join(' ')}: ${out.stderr}`);
    assert.ok(out.stderr.includes('Usage: node serp.mjs'), out.stderr);
    assert.ok(out.stderr.includes(reason), `${args.join(' ')}: ${out.stderr}`);
  }
  assert.equal(requestCount, countBefore);
});

test('no credentials exits 2', async () => {
  const out = await run(['--keyword', 'wrapped'], context({ credentials: false }));
  assert.equal(out.code, 2);
  assert.ok(out.stderr.includes('no DataForSEO credentials found'), out.stderr);
});

test('credentials from ~/.claude.json with BOM', async () => {
  const out = await run(['--keyword', 'wrapped'], context({ credentials: false, homeFile: fileHomeJson }));
  assert.equal(out.code, 0, out.stderr);
  assert.equal(lastRequest.authorization, basic('file-login:file-pw'));
});

test('placeholder in .mcp.json is skipped', async () => {
  const mcpFile = JSON.stringify({ mcpServers: { dataforseo: { env: { DATAFORSEO_USERNAME: '${DATAFORSEO_USERNAME}', DATAFORSEO_PASSWORD: '${DATAFORSEO_PASSWORD}' } } } });
  const out = await run(['--keyword', 'wrapped'], context({ credentials: false, homeFile: fileHomeJson, mcpFile }));
  assert.equal(out.code, 0, out.stderr);
  assert.equal(lastRequest.authorization, basic('file-login:file-pw'));
});

test('environment wins over config files', async () => {
  const out = await run(['--keyword', 'wrapped'], context({ homeFile: fileHomeJson }));
  assert.equal(out.code, 0, out.stderr);
  assert.equal(lastRequest.authorization, basic('test-login:s3cr3t-pw'));
});

test('platform name with non-breaking spaces', async () => {
  const out = await run(['--keyword', 'nbsp']);
  assert.equal(out.code, 0, out.stderr);
  const json = JSON.parse(out.stdout);
  assert.equal(json.organic[0].domain, 'youtube.com');
  assert.equal(json.organic[0].url, null);
});

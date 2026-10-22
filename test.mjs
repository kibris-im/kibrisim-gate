import worker, { DEFENSIVE } from './src/index.js';
import { domainToASCII, domainToUnicode } from 'node:url';
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log('PASS', m); } else { fail++; console.log('FAIL', m); } };
const env = { N8N_WEBHOOK_URL: 'https://n8n.example/hook/secret-path', N8N_SECRET: 's3cret', TURNSTILE_SECRET: 'ts', TURNSTILE_SITEKEY: 'site', CONTACT_EMAIL: 'x@y.z', ASSETS: { fetch: async () => new Response('img', { headers: { 'Content-Type': 'image/jpeg' } }) } };
const realFetch = globalThis.fetch;
let forwarded = [], tsResult = true, n8nStatus = 200;
globalThis.fetch = async (u, init) => {
  const s = String(u?.url || u);
  if (s.includes('siteverify')) return new Response(JSON.stringify({ success: tsResult }));
  if (s.startsWith('https://n8n.example')) { forwarded.push({ s, init }); return new Response('{}', { status: n8nStatus }); }
  return new Response('ORIGIN');
};
const get = (u, e = env, init) => worker.fetch(new Request(u, init), e);
const post = (body, o = {}) => worker.fetch(new Request('https://kibrisim.com.tr/api/signup', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://kibrisim.com.tr', ...o.h }, body: typeof body === 'string' ? body : JSON.stringify(body) }), o.env || env);
const good = { email: 'A@B.com', role: 'user', region: 'girne', lang: 'tr', consent: true, turnstile: 'tok', website: '' };

// punycode
ok(DEFENSIVE.has('xn--kbrsm-n4acb.com.tr'), 'kıbrısım.com.tr ascii form present');
ok(DEFENSIVE.has('xn--imkbrs-r9ac.tr'), 'imkıbrıs.tr ascii form present');
ok(!DEFENSIVE.has('xn--kbrsm-o4a62a.com.tr') && !DEFENSIVE.has('xn--imkbrs-s9a.tr'), 'Gemini wrong strings absent');
ok(domainToUnicode('xn--kbrsm-n4acb.com') === 'kıbrısım.com' && domainToASCII('imkıbrıs.net') === 'xn--imkbrs-r9ac.net', 'node round-trip');
ok(DEFENSIVE.size === 14, '14 defensive domains');

// redirects
let r = await get('https://kibrisim.tr/foo?utm=1&x=2');
ok(r.status === 302 && r.headers.get('Location') === 'https://kibrisim.com.tr/foo?utm=1&x=2', 'defensive keeps path+query');
r = await get('https://www.xn--kbrsm-n4acb.com.tr/', { ...env, PERMANENT_REDIRECTS: '1' });
ok(r.status === 301, 'permanent flag → 301, www stripped');
r = await get('https://kibris.im/');
ok(r.status === 200, 'kibris.im root 200');
r = await get('https://kibris.im/a/b?c=1');
ok(r.status === 302 && r.headers.get('Location') === 'https://beta.kibris.im/a/b?c=1', 'kibris.im subpath → beta with query');

// gate page
r = await get('https://kibrisim.com.tr/');
let h = await r.text();
const csp = r.headers.get('Content-Security-Policy');
const nonce = /nonce-([A-Za-z0-9]+)/.exec(csp)[1];
ok(r.status === 200 && h.includes(`nonce="${nonce}"`), 'nonce matches CSP');
ok(!h.includes('n8n.example') && !h.includes('s3cret') && !h.includes('ts"'), 'no webhook/secret in HTML');
ok(!/SearchAction|ru-RU|bolge\//.test(h), 'no fake SearchAction / ru-RU / district urls');
ok(/rel="canonical" href="https:\/\/kibrisim.com.tr\/"/.test(h) && h.includes('og:image') && h.includes('name="description"'), 'canonical + OG + description');
ok(!/PROTOKOL|Protokol|PROTOCOL|Zero Trust|SİSTEM BAŞLATILIYOR/i.test(h), 'protocol vocabulary gone');
ok(!/style="/.test(h), 'no inline style attributes (CSP safe)');
for (const k of ['X-Content-Type-Options', 'Referrer-Policy', 'X-Frame-Options', 'Strict-Transport-Security']) ok(r.headers.get(k), k + ' header');
ok(csp.includes("frame-ancestors 'none'") && csp.includes('challenges.cloudflare.com'), 'CSP frame-ancestors + turnstile');
const e2 = { ...env, TURNSTILE_SITEKEY: '' };
r = await get('https://kibrisim.com.tr/', e2); h = await r.text();
ok(!h.includes('challenges.cloudflare.com') && !r.headers.get('Content-Security-Policy').includes('challenges'), 'no turnstile when sitekey unset');
r = await get('https://kibrisim.com.tr/', env, { method: 'HEAD' });
ok(r.status === 200, 'HEAD ok');

// privacy visible before step 2
{ const m = await (await get('https://kibrisim.com.tr/')).text(); const p1 = m.slice(m.indexOf('id="pane1"'), m.indexOf('id="pane2"'));
  ok(p1.includes('/gizlilik'), 'privacy link on step 1'); ok(m.slice(m.indexOf('class="foot"')).includes('/gizlilik'), 'privacy link in footer');
  const m2 = await (await get('https://kibrisim.com.tr/', { ...env, ART: [{ d: 'girne', f: 'x-y', e: 'webp', tr: 'A', en: 'B' }] })).text();
  ok(m2.includes('src="/art/x-y.webp"'), 'manifest drives background'); }
// 404s / robots / misc
for (const p of ['/sitemap.xml', '/kesfet/', '/bolge/girne/', '/wp-login.php']) { r = await get('https://kibrisim.com.tr' + p); ok(r.status === 404, p + ' → 404'); }
r = await get('https://kibrisim.com.tr/robots.txt'); let t = await r.text();
ok(/Disallow: \/api\//.test(t) && !/Sitemap/.test(t), 'robots: no sitemap, blocks api only');
r = await get('https://kibrisim.com.tr/gizlilik'); h = await r.text();
ok(['Veri sorumlusu','Hangi verileri','Hukuki sebep','Kimlerle paylaşıyoruz','Saklama','Haklarınız','Çerezler','KVKK'].every((k) => h.includes(k)), 'TR notice has all KVKK sections');
ok(r.status === 200 && h.includes('x@y.z') && r.headers.get('X-Robots-Tag') === 'noindex', 'privacy page TR');
r = await get('https://kibrisim.com.tr/privacy'); h = await r.text(); ok(h.includes('Privacy and data-protection notice') && h.includes('Your rights') && h.includes('Cloudflare'), 'privacy page EN');
r = await get('https://kibrisim.com.tr/og.jpg'); ok(r.headers.get('Content-Type') === 'image/jpeg', 'og.jpg via ASSETS');
r = await get('https://kibrisim.com.tr/email/header.jpg'); ok(r.status === 200, 'email header served');
r = await get('https://kibris.im/email/header.jpg'); ok(r.status === 200, 'email header on kibris.im');
r = await get('https://kibrisim.com.tr/art/magusa.svg'); ok(r.status === 200, 'art svg served');
r = await get('https://kibrisim.com.tr/', env, { method: 'POST' }); ok(r.status === 405, 'POST / → 405');
r = await get('https://elsewhere.org/'); ok(r.status === 404, 'unknown host 404');

// gate off
r = await get('https://kibrisim.com.tr/anything', { ...env, GATE_ENABLED: '0' });
ok((await r.text()) === 'ORIGIN', 'GATE_ENABLED=0 passes through');
r = await get('https://kibrisim.tr/x', { ...env, GATE_ENABLED: '0' });
ok(r.status === 302, 'defensive redirects survive gate off');

// signup
r = await get('https://kibrisim.com.tr/api/signup'); ok(r.status === 405, 'GET signup 405');
r = await post(good, { h: { Origin: 'https://evil.com' } }); ok(r.status === 403, 'bad origin 403');
r = await worker.fetch(new Request('https://kibrisim.com.tr/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(good) }), env);
ok(r.status === 403, 'missing origin 403');
r = await post('{bad'); ok(r.status === 400, 'bad json');
r = await post('x'.repeat(3000)); ok(r.status === 413, 'oversize 413');
r = await post({ ...good, email: 'nope' }); ok(r.status === 400, 'bad email');
r = await post({ ...good, role: 'admin' }); ok(r.status === 400, 'bad role');
r = await post({ ...good, region: 'mars' }); ok(r.status === 400, 'bad region');
r = await post({ ...good, consent: false }); ok(r.status === 400, 'no consent');
r = await post({ ...good, role: 'business', business_name: '  ' }); ok(r.status === 400, 'business needs name');
forwarded = [];
r = await post({ ...good, website: 'spam' }); ok(r.status === 200 && forwarded.length === 0, 'honeypot: fake ok, nothing forwarded');
tsResult = false; r = await post(good); ok(r.status === 400 && (await r.json()).error === 'verify' && forwarded.length === 0, 'turnstile fail blocks');
tsResult = true; r = await post({ ...good, turnstile: '' }); ok(r.status === 400, 'missing turnstile token blocks');
r = await post(good);
ok(r.status === 200 && forwarded.length === 1, 'valid signup forwarded');
const f = forwarded[0], pl = JSON.parse(f.init.body);
ok(f.init.headers['X-Kibrisim-Secret'] === 's3cret', 'secret header sent');
ok(pl.email === 'a@b.com' && pl.role === 'user' && pl.region_label === 'Girne' && pl.business_name === null && pl.consent === true && !!pl.consent_at, 'payload normalised, server timestamp');
ok(!('turnstile' in pl) && !('website' in pl), 'no junk fields forwarded');
forwarded = []; r = await post({ ...good, role: 'business', business_name: 'Girne Otel\n<b>' }); const pl2 = JSON.parse(forwarded[0].init.body);
ok(pl2.business_name === 'Girne Otel <b>', 'control chars stripped');
n8nStatus = 500; r = await post(good); ok(r.status === 502, 'upstream failure → 502 (client sees retry)');
n8nStatus = 200;
r = await post(good, { env: { ...env, N8N_WEBHOOK_URL: '' } }); ok(r.status === 503, 'unconfigured → 503');
r = await post(good, { env: { ...env, TURNSTILE_SECRET: '' } }); ok(r.status === 200, 'dev mode without turnstile secret works');

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);

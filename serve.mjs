import http from 'node:http'; import fs from 'node:fs';
import worker from './src/index.js';
const hooks = [];
const env = { N8N_WEBHOOK_URL: 'https://n8n.example/h', N8N_SECRET: 'x', CONTACT_EMAIL: 'privacy@example.com',
  ASSETS: { fetch: async (rq) => { const p = 'public' + new URL(rq.url).pathname; return fs.existsSync(p) ? new Response(fs.readFileSync(p), { headers: { 'Content-Type': p.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg' } }) : new Response('nf', { status: 404 }); } } };
const rf = globalThis.fetch;
globalThis.fetch = async (u, i) => { if (String(u).startsWith('https://n8n.example')) { hooks.push(JSON.parse(i.body)); return new Response('{}'); } return rf(u, i); };
http.createServer(async (req, res) => {
  if (req.url === '/__hooks') { res.end(JSON.stringify(hooks)); return; }
  const chunks = []; for await (const c of req) chunks.push(c);
  const h = { ...req.headers }; delete h.host; if (h.origin) h.origin = 'https://kibrisim.com.tr';
  const r = await worker.fetch(new Request('https://kibrisim.com.tr' + req.url, { method: req.method, headers: h, body: ['GET','HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks) }), env);
  res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer()));
}).listen(8787);

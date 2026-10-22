// Writes preview.html: the exact gate page, openable by double-click (art embedded, submit faked, nothing is sent).
// Uses the manifest in src/art-manifest.js; embeds one picture per district so the file stays small.
import fs from 'node:fs';
import worker from './src/index.js';
import { ART } from './src/art-manifest.js';
const mime = { svg: 'image/svg+xml', webp: 'image/webp' };
const seen = new Set(), pick = [];
for (const a of ART) {
  if (seen.has(a.d)) continue;
  const f = `public/art/${a.f}.${a.e}`;
  if (!fs.existsSync(f)) continue;
  seen.add(a.d);
  pick.push({ ...a, u: `data:${mime[a.e]};base64,` + fs.readFileSync(f).toString('base64') });
}
const env = { TURNSTILE_SITEKEY: '', CONTROLLER_NAME: '', ART: pick.length ? pick : undefined };
const r = await worker.fetch(new Request('https://kibrisim.com.tr/'), env);
let h = await r.text();
h = h.replace('<head>', '<head>\n<script>window.fetch=async()=>new Response(\'{"ok":true}\');</script>');
h = h.replace(/href="\/gizlilik[^"]*"/g, 'href="#"').replace('href="/favicon.svg"', 'href="data:,"');
fs.writeFileSync('preview.html', h);
console.log('preview.html', h.length, 'bytes,', pick.length, 'pictures embedded');

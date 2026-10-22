// Kıbrısım pre-launch gate.
// Hosts: kibrisim.com.tr (canonical), kibris.im (root shows gate), defensive brand domains (redirect).

import { ART as DEFAULT_ART } from './art-manifest.js';

// Brand-defence domains. Punycode is derived from the Unicode names, not typed by hand.
const toAscii = (d) => new URL('http://' + d).hostname;
const DEFENSIVE_UNICODE = [
  'kibrisim.tr',
  'imkibris.com.tr', 'imkibris.tr', 'imkibris.com', 'imkibris.net', 'imkibris.org',
  'kıbrısım.com.tr', 'kıbrısım.tr', 'kıbrısım.com', 'kıbrısım.net',
  'imkıbrıs.com.tr', 'imkıbrıs.tr', 'imkıbrıs.com', 'imkıbrıs.net',
];
export const DEFENSIVE = new Set(DEFENSIVE_UNICODE.map(toAscii));

const CANONICAL = 'https://kibrisim.com.tr';
const GATE_HOSTS = new Set(['kibrisim.com.tr', 'kibris.im']);
const ROLES = ['business', 'user', 'partner'];
const REGIONS = ['girne', 'magusa', 'lefkosa', 'iskele', 'guzelyurt', 'lefke', 'abroad'];
const REGION_LABEL = {
  girne: 'Girne', magusa: 'Gazimağusa', lefkosa: 'Lefkoşa', iskele: 'İskele',
  guzelyurt: 'Güzelyurt', lefke: 'Lefke', abroad: 'Ada Dışı',
};

const I18N = {
  tr: {
    title: 'Kıbrısım | Kuzey Kıbrıs için yerel keşif ve güven platformu',
    desc: 'Kuzey Kıbrıs için yerel keşif ve güven platformu hazırlanıyor. Kapalı betaya katılın.',
    status: 'Kapalı beta · Çok yakında',
    sub: 'Kuzey Kıbrıs için yerel keşif ve güven platformu hazırlanıyor. Kapalı betaya başvurun; onaylandığınızda ilk siz denemiş olun.',
    lblEmail: 'E-posta', phEmail: 'adiniz@ornek.com', next: 'Devam →', back: '← E-postayı düzenle',
    lblRole: 'Rolünüz', roleDefault: 'Seçiniz…',
    roleBusiness: 'Yerel işletme / tesis sahibi', roleUser: 'Ada sakini / bireysel kullanıcı', rolePartner: 'Kurumsal temsilci / ortak',
    lblBusiness: 'İşletme / tesis adı', phBusiness: 'Örn: Girne Butik Otel',
    lblRegion: 'Bölge', regionDefault: 'Seçiniz…',
    girne: 'Girne', magusa: 'Gazimağusa', lefkosa: 'Lefkoşa', iskele: 'İskele', guzelyurt: 'Güzelyurt', lefke: 'Lefke',
    abroad: 'Ada dışı (TR / uluslararası)',
    consent: 'E-posta ve profil bilgilerimin beta başvurusu ve lansman duyuruları için işlenmesini kabul ediyorum. <a href="/gizlilik">Gizlilik bildirimi</a>',
    submit: 'Betaya katıl', sending: 'Gönderiliyor…',
    success: 'Teşekkürler, başvurunuz alındı. Değerlendirip bu adrese haber vereceğiz.',
    errGeneric: 'Kaydınız şu an alınamadı. Lütfen biraz sonra tekrar deneyin.',
    errEmail: 'Lütfen geçerli bir e-posta adresi girin.',
    errVerify: 'Doğrulama tamamlanamadı. Lütfen tekrar deneyin.',
    slogan: '«Güven, bir selamla başlar.»',
    subSlogan: 'Kuzey Kıbrıs işletmelerini, esnafını ve mekanlarını gerçek bir güven ağıyla buluşturan yerel platform.',
    arch: 'Teknoloji partneri: <a href="https://eplani.com.tr" target="_blank" rel="noopener">EPLANI</a>',
    privH: 'Gizlilik bildirimi',
    note: 'E-posta adresiniz yalnızca bu beta başvurusu için kullanılır.',
    privLink: 'Gizlilik ve KVKK bilgilendirmesi',
  },
  en: {
    title: 'Kıbrısım | Local discovery & trust platform for Northern Cyprus',
    desc: 'A local discovery and trust platform for Northern Cyprus is on its way. Join the closed beta.',
    status: 'Closed beta · Coming soon',
    sub: 'A local discovery and trust platform for Northern Cyprus is on its way. Apply for the closed beta and be among the first to try it.',
    lblEmail: 'Email', phEmail: 'you@example.com', next: 'Continue →', back: '← Edit email',
    lblRole: 'Your role', roleDefault: 'Select…',
    roleBusiness: 'Local business / venue owner', roleUser: 'Island resident / individual', rolePartner: 'Corporate representative / partner',
    lblBusiness: 'Business / venue name', phBusiness: 'E.g. Kyrenia Boutique Hotel',
    lblRegion: 'Region', regionDefault: 'Select…',
    girne: 'Kyrenia (Girne)', magusa: 'Famagusta (Gazimağusa)', lefkosa: 'Nicosia (Lefkoşa)', iskele: 'İskele (Trikomo)',
    guzelyurt: 'Morphou (Güzelyurt)', lefke: 'Lefka (Lefke)', abroad: 'Off-island (TR / international)',
    consent: 'I agree to my email and profile details being processed for the beta application and launch announcements. <a href="/gizlilik?lang=en">Privacy notice</a>',
    submit: 'Join the beta', sending: 'Sending…',
    success: 'Thank you, your application is in. We will review it and email this address.',
    errGeneric: 'We could not save your details right now. Please try again shortly.',
    errEmail: 'Please enter a valid email address.',
    errVerify: 'Verification did not complete. Please try again.',
    slogan: '“Trust begins with a greeting.”',
    subSlogan: 'The local platform connecting Northern Cyprus businesses, shops and venues through real trust.',
    arch: 'Technology partner: <a href="https://eplani.com.tr" target="_blank" rel="noopener">EPLANI</a>',
    privH: 'Privacy notice',
    note: 'Your email is used only for this beta application.',
    privLink: 'Privacy and data-protection notice',
  },
};


const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const jsonForScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

function securityHeaders(nonce, { turnstile }) {
  const csp = [
    "default-src 'none'",
    `script-src 'nonce-${nonce}'${turnstile ? " https://challenges.cloudflare.com" : ""}`,
    turnstile ? "frame-src https://challenges.cloudflare.com" : "frame-src 'none'",
    `style-src 'nonce-${nonce}' https://fonts.googleapis.com`,
    "font-src https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    `connect-src 'self'${turnstile ? " https://challenges.cloudflare.com" : ""}`,
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
  ].join('; ');
  return {
    'Content-Security-Policy': csp,
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000',
  };
}

const CSS = `
:root{--bg:#FAF9F5;--ink:#233759;--body:#16404E;--teal:#266A6D;--orange:#F3861F;--on-orange:#00171F;--line:rgba(35,55,89,.22);--field:rgba(255,255,255,.75);--ring:rgba(35,55,89,.18);--veil1:rgba(250,249,245,.9);--veil2:rgba(250,249,245,.35)}
@media (prefers-color-scheme:dark){:root{--bg:#00171F;--ink:#FAF9F5;--body:#CBD5E1;--teal:#62D3C1;--line:rgba(250,249,245,.28);--field:rgba(0,23,31,.75);--ring:rgba(98,211,193,.3);--veil1:rgba(0,23,31,.93);--veil2:rgba(0,23,31,.6)}.bg img.on{opacity:.34;filter:brightness(.55) saturate(.8)}}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{font-family:Inter,-apple-system,"Segoe UI",sans-serif;background:var(--bg);color:var(--body);min-height:100vh;min-height:100dvh;display:flex;justify-content:center;align-items:center;padding:24px;line-height:1.7}
.bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.bg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 2.2s ease}
.bg img.on{opacity:.5}
.bg::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,var(--veil1) 30%,var(--veil2) 100%)}
.cap{position:fixed;right:16px;bottom:12px;z-index:1;font-family:"JetBrains Mono",monospace;font-size:.72rem;color:var(--teal);letter-spacing:.04em;text-align:right;max-width:60vw}
.wrap{position:relative;z-index:1;max-width:580px;width:100%;border-left:3px solid var(--ink);padding-left:32px}
.top{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.logo{font-family:Poppins,sans-serif;font-weight:700;font-size:2.2rem;color:var(--ink);letter-spacing:-.02em;line-height:1}
.logo span{color:var(--orange)}
.lang{display:flex;gap:4px;align-items:center;font-family:"JetBrains Mono",monospace;font-size:.78rem}
.lang button{background:none;border:0;border-bottom:2px solid transparent;color:var(--body);cursor:pointer;font:inherit;padding:4px 6px;min-height:32px}
.lang button[aria-pressed=true]{color:var(--ink);font-weight:700;border-bottom-color:var(--orange)}
.status{font-family:"JetBrains Mono",monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--teal);font-weight:700;margin-bottom:20px;display:flex;gap:8px;align-items:center}
.status::before{content:"";width:8px;height:8px;border-radius:50%;border:2px solid var(--orange)}
.sub{font-size:1.02rem;margin-bottom:28px}
.viewport{overflow:hidden;padding:4px;margin:-4px;transition:height .35s cubic-bezier(.16,1,.3,1)}
.track{display:flex;align-items:flex-start;width:200%;transition:transform .4s cubic-bezier(.16,1,.3,1)}
.track.step2{transform:translateX(-50%)}
.pane{width:50%;flex-shrink:0;display:flex;flex-direction:column;gap:16px;padding:2px}
.pane[inert]{visibility:hidden}
.field{display:flex;flex-direction:column;gap:6px}
.field[hidden]{display:none}
label{font-family:"JetBrains Mono",monospace;font-size:.78rem;text-transform:uppercase;color:var(--ink);font-weight:700;letter-spacing:.03em}
input[type=email],input[type=text],select{width:100%;padding:15px;background:var(--field);border:1px solid var(--line);border-radius:8px;color:var(--body);font:inherit;font-size:1rem}
input:focus-visible,select:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid var(--orange);outline-offset:2px}
select{appearance:none;padding-right:40px;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23266A6D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 14px center;background-size:14px}
select option{background:var(--bg);color:var(--body)}
.btn{background:var(--orange);color:var(--on-orange);border:0;padding:16px 28px;font-family:Poppins,sans-serif;font-weight:600;font-size:1rem;border-radius:32px;cursor:pointer;width:100%}
.btn:hover{filter:brightness(1.06)}
.btn:disabled{opacity:.6;cursor:not-allowed}
.back{background:none;border:0;color:var(--teal);font-family:"JetBrains Mono",monospace;font-size:.78rem;cursor:pointer;text-align:left;padding:6px 0;width:fit-content}
.back:hover{text-decoration:underline}
label.consent{text-transform:none;font-family:inherit;font-weight:400;letter-spacing:0;color:var(--body)}
.mb{margin-bottom:24px}
.consent{display:flex;gap:10px;align-items:flex-start;font-size:.85rem;line-height:1.5}
.consent input{margin-top:3px;width:18px;height:18px;flex-shrink:0;accent-color:var(--orange)}
.consent a{color:var(--ink)}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.msg{font-size:.92rem;padding:14px 16px;border-radius:8px;margin-top:12px;border:1px solid var(--line);color:var(--ink)}
.msg[hidden]{display:none}
.msg.err{border-color:#B3261E}
.foot{margin-top:48px;border-top:1px dashed var(--line);padding-top:22px;font-size:.88rem}
.slogan{font-family:Poppins,sans-serif;font-weight:600;font-size:.98rem;color:var(--ink);display:block;margin-bottom:4px}
.arch{font-family:"JetBrains Mono",monospace;font-size:.74rem;margin-top:14px;color:var(--teal)}
.arch a{color:var(--ink);font-weight:700}
.note{font-size:.82rem;line-height:1.5;color:var(--body)}
.note a,.legal a{color:var(--ink)}
.legal{margin-top:12px;font-size:.78rem}
.doc h2{font-family:Poppins,sans-serif;color:var(--ink);font-size:1.02rem;margin:20px 0 6px}
.doc .langs{font-family:"JetBrains Mono",monospace;font-size:.78rem;margin-bottom:12px}
.doc h1{font-family:Poppins,sans-serif;color:var(--ink);font-size:1.5rem;margin-bottom:16px}
.doc p,.doc li{margin-bottom:10px;font-size:.95rem}
.doc ul{padding-left:20px}
.doc a{color:var(--ink)}
@media (max-width:600px){.cap{display:none}.wrap{padding-left:20px;border-left-width:2px}.logo{font-size:1.85rem}}
@media (prefers-reduced-motion:reduce){.track,.viewport,.bg img{transition:none}}
`;

function client(CFG) {
  const ART = CFG.art;
  const $ = (id) => document.getElementById(id);
  const T = CFG.i18n;
  let lang = 'tr';
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'tr') lang = q;
  else lang = (navigator.language || 'tr').toLowerCase().startsWith('tr') ? 'tr' : 'en';

  const form = $('f'), track = $('track'), p1 = $('pane1'), p2 = $('pane2');
  const msg = $('msg'), email = $('email'), role = $('role'), biz = $('biz'), bizField = $('bizField');
  const btn = $('submit');
  let step = 1, busy = false, done = false;

  function setStep(n) {
    step = n;
    track.classList.toggle('step2', n === 2);
    p1.inert = n !== 1;
    p2.inert = n !== 2;
    fit();
    (n === 2 ? role : email).focus({ preventScroll: true });
  }
  const vp = $('wizard');
  function fit() { vp.style.height = (step === 1 ? p1 : p2).offsetHeight + 4 + 'px'; }
  if (window.ResizeObserver) { const ro = new ResizeObserver(fit); ro.observe(p1); ro.observe(p2); }
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  // Background: slow rotation through the district illustrations; picking a region jumps to that district.
  const layers = [$('bgA'), $('bgB')];
  const cap = $('cap');
  const still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lite = !!(navigator.connection && navigator.connection.saveData);
  const artUrl = (a) => a.u || '/art/' + a.f + '.' + a.e;
  let cur = ART.findIndex((a) => artUrl(a) === layers[0].getAttribute('src'));
  if (cur < 0) cur = 0;
  let front = 0, timer = null, swaps = 0, loading = false;
  const seen = [cur];
  function showArt(i) {
    if (loading) return;
    loading = true;
    const probe = new Image();
    probe.onload = () => {
      const next = layers[1 - front];
      next.src = probe.src;
      layers[front].classList.remove('on');
      next.classList.add('on');
      front = 1 - front; cur = i; swaps++;
      cap.textContent = ART[i][lang];
      loading = false;
    };
    probe.onerror = () => { loading = false; };
    probe.src = artUrl(ART[i]);
  }
  function advance(district) {
    const all = ART.map((a, i) => i).filter((i) => i !== cur && (!district || ART[i].d === district));
    const fresh = all.filter((i) => seen.indexOf(i) < 0);
    const pool = fresh.length ? fresh : all;
    if (!pool.length) return;
    const i = pool[Math.floor(Math.random() * pool.length)];
    seen.push(i); if (seen.length > 16) seen.shift();
    showArt(i);
  }
  function startRotation() {
    if (still || lite || timer || ART.length < 2) return;
    timer = setInterval(() => {
      if (document.hidden) return;
      if (swaps >= 14) { clearInterval(timer); timer = null; return; }
      advance();
    }, 9000);
  }
  $('region').addEventListener('change', (e) => { advance(e.target.value); clearInterval(timer); timer = null; startRotation(); });
  function show(text, isErr) {
    msg.hidden = !text;
    msg.textContent = text || '';
    msg.classList.toggle('err', !!isErr);
  }
  function applyLang(l) {
    lang = l;
    const t = T[l];
    document.documentElement.lang = l;
    document.title = t.title;
    document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = t[el.dataset.t]; });
    document.querySelectorAll('[data-h]').forEach((el) => { el.innerHTML = t[el.dataset.h]; });
    document.querySelectorAll('[data-ph]').forEach((el) => { el.placeholder = t[el.dataset.ph]; });
    $('langTr').setAttribute('aria-pressed', String(l === 'tr'));
    $('langEn').setAttribute('aria-pressed', String(l === 'en'));
    if (!busy && !done) btn.textContent = t.submit;
    cap.textContent = ART[cur][l];
    document.querySelectorAll('a.plink').forEach((a) => { a.href = '/gizlilik' + (l === 'en' ? '?lang=en' : ''); });
    fit();
    if (done) show(t.success, false);
  }

  $('langTr').addEventListener('click', () => applyLang('tr'));
  $('langEn').addEventListener('click', () => applyLang('en'));
  $('next').addEventListener('click', goNext);
  $('back').addEventListener('click', () => { show(''); setStep(1); });
  role.addEventListener('change', () => {
    const isBiz = role.value === 'business';
    bizField.hidden = !isBiz;
    fit();
    biz.required = isBiz;
    if (!isBiz) biz.value = '';
  });

  function goNext() {
    if (!email.value.trim() || !email.checkValidity()) { email.reportValidity(); return; }
    show('');
    setStep(2);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy || done) return;
    if (step === 1) { goNext(); return; }
    if (!form.reportValidity()) return;
    const t = T[lang];
    busy = true; btn.disabled = true; btn.textContent = t.sending; show('');
    const fd = new FormData(form);
    const body = {
      email: email.value.trim().toLowerCase(),
      role: role.value,
      business_name: biz.value.trim(),
      region: $('region').value,
      lang,
      consent: $('consent').checked,
      website: fd.get('website') || '',
      turnstile: fd.get('cf-turnstile-response') || '',
    };
    try {
      const res = await fetch('/api/signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) {
        done = true;
        $('wizard').hidden = true;
        show(T[lang].success, false);
        msg.setAttribute('role', 'status');
      } else {
        show(j.error === 'verify' ? t.errVerify : j.error === 'email' ? t.errEmail : t.errGeneric, true);
        if (window.turnstile) try { window.turnstile.reset(); } catch (_) {}
      }
    } catch (_) {
      show(t.errGeneric, true);
    } finally {
      busy = false; btn.disabled = false;
      if (!done) btn.textContent = T[lang].submit;
    }
  });

  p2.inert = true;
  applyLang(lang);
  startRotation();
  fit();
}

function pageHtml(env, nonce, host) {
  const tr = I18N.tr;
  const ART = env.ART || DEFAULT_ART;
  const first = ART[Math.floor(Math.random() * ART.length)];
  const artUrl = (a) => a.u || `/art/${a.f}.${a.e}`;
  const turnstile = !!env.TURNSTILE_SITEKEY;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': CANONICAL + '/#org', name: 'Kıbrısım', url: CANONICAL + '/' },
      { '@type': 'WebSite', '@id': CANONICAL + '/#website', url: CANONICAL + '/', name: 'Kıbrısım',
        description: tr.desc, inLanguage: ['tr', 'en'], publisher: { '@id': CANONICAL + '/#org' } },
    ],
  };
  const opt = (v, k) => `<option value="${v}" data-t="${k}">${esc(tr[k])}</option>`;
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tr.title)}</title>
<meta name="description" content="${esc(tr.desc)}">
<link rel="canonical" href="${CANONICAL}/">
<meta name="theme-color" content="#00171F">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kıbrısım">
<meta property="og:title" content="${esc(tr.title)}">
<meta property="og:description" content="${esc(tr.desc)}">
<meta property="og:url" content="${CANONICAL}/">
<meta property="og:image" content="${CANONICAL}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="tr_TR">
<meta property="og:locale:alternate" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<script type="application/ld+json" nonce="${nonce}">${jsonForScript(ld)}</script>
<style nonce="${nonce}">${CSS}</style>
</head>
<body>
<div class="bg" aria-hidden="true"><img id="bgA" class="on" src="${esc(artUrl(first))}" alt="" width="1280" height="720" decoding="async"><img id="bgB" alt="" width="1280" height="720" decoding="async"></div>
<div class="cap" id="cap" aria-hidden="true">${esc(first.tr)}</div>
<main class="wrap">
  <div class="top">
    <div class="logo">Kıbrısım<span>.</span></div>
    <div class="lang" role="group" aria-label="Language / Dil">
      <button type="button" id="langTr" aria-pressed="true">TR</button>
      <button type="button" id="langEn" aria-pressed="false">EN</button>
    </div>
  </div>
  <p class="status" data-t="status">${esc(tr.status)}</p>
  <p class="sub" data-t="sub">${esc(tr.sub)}</p>

  <div id="wizard" class="viewport">
    <form id="f" novalidate="" autocomplete="on">
      <div class="track" id="track">
        <div class="pane" id="pane1">
          <div class="field">
            <label for="email" data-t="lblEmail">${esc(tr.lblEmail)}</label>
            <input type="email" id="email" name="email" required autocomplete="email" maxlength="254" inputmode="email" data-ph="phEmail" placeholder="${esc(tr.phEmail)}">
          </div>
          <button type="button" class="btn" id="next" data-t="next">${esc(tr.next)}</button>
          <p class="note"><span data-t="note">${esc(tr.note)}</span> <a class="plink" href="/gizlilik" data-t="privLink">${esc(tr.privLink)}</a></p>
        </div>
        <div class="pane" id="pane2" inert>
          <button type="button" class="back" id="back" data-t="back">${esc(tr.back)}</button>
          <div class="field">
            <label for="role" data-t="lblRole">${esc(tr.lblRole)}</label>
            <select id="role" name="role" required>
              <option value="" disabled selected data-t="roleDefault">${esc(tr.roleDefault)}</option>
              ${opt('business', 'roleBusiness')}${opt('user', 'roleUser')}${opt('partner', 'rolePartner')}
            </select>
          </div>
          <div class="field" id="bizField" hidden>
            <label for="biz" data-t="lblBusiness">${esc(tr.lblBusiness)}</label>
            <input type="text" id="biz" name="business_name" maxlength="120" autocomplete="organization" data-ph="phBusiness" placeholder="${esc(tr.phBusiness)}">
          </div>
          <div class="field">
            <label for="region" data-t="lblRegion">${esc(tr.lblRegion)}</label>
            <select id="region" name="region" required>
              <option value="" disabled selected data-t="regionDefault">${esc(tr.regionDefault)}</option>
              ${REGIONS.map((r) => opt(r, r)).join('')}
            </select>
          </div>
          <div class="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <label class="consent" for="consent">
            <input type="checkbox" id="consent" required>
            <span data-h="consent">${tr.consent}</span>
          </label>
          ${turnstile ? `<div class="cf-turnstile" data-sitekey="${esc(env.TURNSTILE_SITEKEY)}" data-theme="auto"></div>` : ''}
          <button type="submit" class="btn" id="submit" data-t="submit">${esc(tr.submit)}</button>
        </div>
      </div>
    </form>
  </div>
  <div id="msg" class="msg" role="alert" hidden></div>
  <noscript><p class="msg">JavaScript gerekli / JavaScript is required.</p></noscript>

  <div class="foot">
    <span class="slogan" data-t="slogan">${esc(tr.slogan)}</span>
    <span data-t="subSlogan">${esc(tr.subSlogan)}</span>
    <div class="arch" data-h="arch">${tr.arch}</div>
    <div class="legal"><a class="plink" href="/gizlilik" data-t="privLink">${esc(tr.privLink)}</a></div>
  </div>
</main>
${turnstile ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' : ''}
<script nonce="${nonce}">var __name=function(t,v){if(t)Object.defineProperty(t,"name",{value:v,configurable:!0});return t};(${client.toString()})(${jsonForScript({ i18n: I18N, art: ART })});</script>
</body>
</html>`;
}

function privacyHtml(env, lang, nonce) {
  const en = lang === 'en';
  const who = esc(env.CONTROLLER_NAME || 'Kıbrısım');
  const addr = env.CONTROLLER_ADDRESS ? ', ' + esc(env.CONTROLLER_ADDRESS) : '';
  const mail = env.CONTACT_EMAIL ? `<a href="mailto:${esc(env.CONTACT_EMAIL)}">${esc(env.CONTACT_EMAIL)}</a>` : '';
  const S = en
    ? { h: 'Privacy and data-protection notice', back: '← Back', secs: [
        ['Who is responsible', `${who}${addr}. Technology services are provided by EPLANI.${mail ? ' Contact: ' + mail + '.' : ''}`],
        ['What we process', 'Your email address, role (business owner, island resident or corporate representative), region, the business name if you are a business owner, your chosen language, and the time of your application and consent. For security, Cloudflare briefly processes connection data (such as your IP address) to verify you are not a bot and to protect the site.'],
        ['Why', 'To review your closed-beta application; if approved, to set up your access and email you; and to tell you when Kıbrısım launches.'],
        ['Legal basis', 'Your explicit consent, given with the checkbox on the form. You can withdraw it at any time; your application and any beta access are then removed.'],
        ['Who receives it', 'We do not sell your data or share it for advertising. We use service providers to run the application: Cloudflare (hosting, security, access control), Google (application list), Brevo (email delivery), Telegram (internal team notification) and automation software on our own servers. Some of these providers are located outside Türkiye and Northern Cyprus, so your data may be transferred abroad.'],
        ['How long we keep it', 'Until your application has been handled and the beta phase is over. Deleted sooner if you ask.'],
        ['Your rights', `You may ask whether your data is processed, request a copy, have it corrected or deleted, object to its processing and withdraw consent (under Türkiye’s Law No. 6698 on the Protection of Personal Data, Article 11, and the applicable Northern Cyprus rules).${mail ? ' Write to ' + mail + '.' : ''}`],
        ['Cookies and third-party requests', 'This page sets no cookies of its own. While it loads, fonts come from Google Fonts and the bot check from Cloudflare Turnstile; those services can see your IP address.'],
      ] }
    : { h: 'Gizlilik ve KVKK bilgilendirmesi', back: '← Geri', secs: [
        ['Veri sorumlusu', `${who}${addr}. Teknoloji hizmetleri EPLANI tarafından sağlanır.${mail ? ' İletişim: ' + mail + '.' : ''}`],
        ['Hangi verileri işliyoruz', 'E-posta adresiniz, rolünüz (işletme sahibi, ada sakini veya kurumsal temsilci), bölgeniz, işletme sahibiyseniz işletme adı, seçtiğiniz dil ile başvuru ve onay zamanı. Güvenlik için bağlantı bilgileriniz (ör. IP adresi), bot doğrulaması ve siteyi koruma amacıyla Cloudflare tarafından geçici olarak işlenir.'],
        ['Amaçlar', 'Kapalı beta başvurunuzu değerlendirmek; onaylanırsa erişiminizi tanımlamak ve size e-posta ile haber vermek; Kıbrısım yayına girdiğinde sizi bilgilendirmek.'],
        ['Hukuki sebep', 'Başvuru formundaki onay kutusuyla verdiğiniz açık rıza. Rızanızı istediğiniz zaman geri çekebilirsiniz; bu durumda başvurunuz ve varsa beta erişiminiz kaldırılır.'],
        ['Kimlerle paylaşıyoruz', 'Verilerinizi satmayız, reklam amacıyla paylaşmayız. Başvuruyu yürütmek için hizmet sağlayıcılardan yararlanırız: Cloudflare (barındırma, güvenlik, erişim kontrolü), Google (başvuru listesi), Brevo (e-posta gönderimi), Telegram (ekip içi bildirim) ve kendi sunucularımızda çalışan otomasyon yazılımı. Bu sağlayıcıların bir kısmı Türkiye ve KKTC dışında bulunur; verileriniz yurt dışına aktarılabilir.'],
        ['Saklama süresi', 'Başvurunuz sonuçlanıp beta süreci tamamlanana kadar. Siz isterseniz daha erken silinir.'],
        ['Haklarınız', `Verilerinizin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltme, silme, işlemeye itiraz etme ve rızayı geri çekme haklarına sahipsiniz (6698 sayılı KVKK m.11 ve ilgili KKTC mevzuatı kapsamında).${mail ? ' Başvuru: ' + mail + '.' : ''}`],
        ['Çerezler ve üçüncü taraf istekleri', 'Bu sayfa kendi çerezlerimizi kullanmaz. Sayfa yüklenirken yazı tipleri Google Fonts’tan, bot doğrulaması Cloudflare Turnstile’dan alınır; bu hizmetler IP adresinizi görebilir.'],
      ] };
  return `<!DOCTYPE html><html lang="${en ? 'en' : 'tr'}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>${S.h} | Kıbrısım</title>
<meta name="robots" content="noindex"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<style nonce="${nonce}">${CSS}</style></head><body><main class="wrap doc">
<div class="logo mb">Kıbrısım<span>.</span></div>
<p class="langs"><a href="/gizlilik">TR</a> · <a href="/gizlilik?lang=en">EN</a></p>
<h1>${S.h}</h1>
${S.secs.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join('\n')}
<p><a href="/">${S.back}</a></p></main></body></html>`;
}

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#00171F"/><text x="14" y="46" font-family="Poppins,Arial,sans-serif" font-weight="700" font-size="40" fill="#FAF9F5">K</text><circle cx="49" cy="43" r="5" fill="#F3861F"/></svg>`;

const randNonce = () => {
  const b = crypto.getRandomValues(new Uint8Array(16));
  let s = ''; for (const x of b) s += String.fromCharCode(x);
  return btoa(s).replace(/[^A-Za-z0-9]/g, 'x');
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });

async function handleSignup(request, env) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });

  // Same-site only: browser forms send Origin; anything else is a script.
  const origin = request.headers.get('Origin');
  let originHost = '';
  try { originHost = new URL(origin).hostname; } catch (_) {}
  if (!GATE_HOSTS.has(originHost.replace(/^www\./, ''))) return json({ ok: false, error: 'origin' }, 403);

  if (!(request.headers.get('Content-Type') || '').startsWith('application/json')) return json({ ok: false, error: 'type' }, 415);
  const raw = await request.text();
  if (raw.length > 2048) return json({ ok: false, error: 'size' }, 413);
  let b;
  try { b = JSON.parse(raw); } catch (_) { return json({ ok: false, error: 'json' }, 400); }
  if (!b || typeof b !== 'object') return json({ ok: false, error: 'json' }, 400);

  // Honeypot: pretend success, store nothing.
  if (typeof b.website === 'string' && b.website !== '') return json({ ok: true });

  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  if (email.length > 254 || !/^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/.test(email)) return json({ ok: false, error: 'email' }, 400);
  if (!ROLES.includes(b.role) || !REGIONS.includes(b.region)) return json({ ok: false, error: 'field' }, 400);
  if (b.consent !== true) return json({ ok: false, error: 'consent' }, 400);
  const lang = b.lang === 'en' ? 'en' : 'tr';
  let business = '';
  if (b.role === 'business') {
    business = String(b.business_name || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 120);
    if (!business) return json({ ok: false, error: 'field' }, 400);
  }

  if (!env.N8N_WEBHOOK_URL) return json({ ok: false, error: 'config' }, 503);

  if (env.TURNSTILE_SECRET) {
    const token = typeof b.turnstile === 'string' ? b.turnstile : '';
    if (!token || token.length > 2048) return json({ ok: false, error: 'verify' }, 400);
    const form = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) form.set('remoteip', ip);
    let ok = false;
    try {
      const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
      ok = (await r.json()).success === true;
    } catch (_) {}
    if (!ok) return json({ ok: false, error: 'verify' }, 400);
  }

  const payload = {
    email, role: b.role, business_name: business || null,
    region: b.region, region_label: REGION_LABEL[b.region], lang,
    consent: true, consent_version: 'v1', consent_at: new Date().toISOString(),
    source_host: originHost,
  };
  try {
    const r = await fetch(env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Kibrisim-Secret': env.N8N_SECRET || '' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) return json({ ok: false, error: 'upstream' }, 502);
  } catch (_) {
    return json({ ok: false, error: 'upstream' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    const path = url.pathname;

    // 1. Brand-defence domains → canonical, path AND query kept.
    if (DEFENSIVE.has(host)) {
      const status = env.PERMANENT_REDIRECTS === '1' ? 301 : 302;
      return Response.redirect(CANONICAL + path + url.search, status);
    }
    if (!GATE_HOSTS.has(host)) return new Response('Not found', { status: 404 });

    // 2. kibris.im: root is the gate, anything deeper belongs to the beta site.
    if (host === 'kibris.im' && path !== '/' && !['/api/signup', '/favicon.svg', '/og.jpg', '/email/header.jpg', '/robots.txt', '/gizlilik', '/privacy'].includes(path) && !path.startsWith('/art/')) {
      return Response.redirect('https://beta.kibris.im' + path + url.search, 302);
    }

    // 3. Gate switched off at launch: let the real site answer.
    if (env.GATE_ENABLED === '0') return fetch(request);

    if (path === '/api/signup') return handleSignup(request, env);

    const turnstile = !!env.TURNSTILE_SITEKEY;
    const readOnly = request.method === 'GET' || request.method === 'HEAD';
    if (!readOnly) return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });

    if (path === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /api/\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
    }
    if (path === '/favicon.svg') {
      return new Response(FAVICON, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } });
    }
    if ((path === '/og.jpg' || path === '/email/header.jpg' || /^\/art\/[a-z0-9-]+\.(svg|webp)$/.test(path)) && env.ASSETS) return env.ASSETS.fetch(request);

    const nonce = randNonce();
    const htmlHeaders = (extra = {}) => ({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Content-Language': 'tr, en',
      ...securityHeaders(nonce, { turnstile }),
      ...extra,
    });

    if (path === '/') return new Response(pageHtml(env, nonce, host), { headers: htmlHeaders() });
    if (path === '/gizlilik' || path === '/privacy') {
      const lang = path === '/privacy' || url.searchParams.get('lang') === 'en' ? 'en' : 'tr';
      return new Response(privacyHtml(env, lang, nonce), { headers: htmlHeaders({ 'X-Robots-Tag': 'noindex' }) });
    }

    // Everything else is a real 404, not a copy of the gate.
    return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' } });
  },
};

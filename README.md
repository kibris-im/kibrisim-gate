# kibrisim-gate

Pre-launch gate for kibrisim.com.tr / kibris.im. Replaces the Gemini draft.

## Deploy
1. `wrangler secret put N8N_WEBHOOK_URL` (the n8n webhook URL; it is no longer in the page)
2. `wrangler secret put N8N_SECRET` (any long random string)
3. Cloudflare → Turnstile → new widget for kibrisim.com.tr + kibris.im.
   Put the site key in `TURNSTILE_SITEKEY` (wrangler.toml), `wrangler secret put TURNSTILE_SECRET`.
4. Fill `CONTROLLER_NAME` and `CONTACT_EMAIL` in wrangler.toml (shown on /gizlilik).
5. `wrangler deploy`, then attach the domains (kibrisim.com.tr, kibris.im and every defensive domain).
6. WAF → Rate limiting rule: `URI Path equals /api/signup` and `Method equals POST`, 5 requests / 10 min / IP, action Block.

## n8n side
Import the gatekeeper workflow template as a NEW workflow (inactive), fix the credentials, test, then switch it on and the old one off.
- Create credential "Kibrisim Gate Secret" (Header Auth): name `X-Kibrisim-Secret`, value = N8N_SECRET.
- Add two columns to the sheet header row: `ID`, `Dil`.
- Telegram buttons from the old workflow ("approve:email") stop working; new ones use short IDs.

## Approval email (Brevo) and the Cloudflare code
1. Brevo → Transactional → Templates: create two templates from `email/kibrisim-approved-tr.html` and `-en.html`
   (paste as custom HTML). Note their IDs; the workflow node "Send Approval Email" assumes TR = 1, EN = 2: edit the numbers there.
   Set sender and subject inside Brevo (subjects: "Kıbrısım kapalı beta: başvurunuz onaylandı" / "Kıbrısım closed beta: your application is approved").
2. n8n credential "Brevo API": Header Auth, name `api-key`, value = your Brevo API key.
3. The header image is served by the Worker at https://kibrisim.com.tr/email/header.jpg. After the gate is switched off,
   keep that file reachable on the real site, or upload it to Brevo and change the URL in both templates.
4. Cloudflare Access cannot mint or send a code on your behalf. The person asks for it themselves on beta.kibris.im, and Cloudflare emails it
   (noreply@notify.cloudflare.com, 10 minutes, single use) only if their address is in the allowed group. So the order is: add to group → send approval email.

## Background pictures (the 85 JPEG masters)
The Worker shows whatever is listed in `src/art-manifest.js` (default: six SVG emblems).
To use the detailed JPEGs, on your own computer (Drive folder synced or downloaded):

    pip install pillow
    python3 tools/make-art.py "/path/to/Kıbrısım Tasarım Varlıkları (Visual Assets)"
    wrangler deploy

`tools/art-captions.json` lists the 64 pictures used (the best version of each place, with TR/EN captions); edit it to add, drop or rename.
Each picture becomes a 1280×720 WebP in `public/art/`; the manifest is rewritten. Only one picture loads at a time (rotation every 9 s, stops after 14 changes, off for reduced-motion and data-saver).

## Privacy
/gizlilik (TR) and /gizlilik?lang=en: full notice. Linked on the first step of the form, in the footer and by the consent box.
Fill `CONTROLLER_NAME`, `CONTROLLER_ADDRESS` (optional) and `CONTACT_EMAIL` in wrangler.toml, otherwise the page has no named controller or contact.
Have a lawyer check it (KVKK / KKTC rules, foreign-processor wording, retention period).

## Preview
`node preview.mjs` writes `preview.html` (double-click it; one picture per district embedded, submit is faked, nothing is sent).

## Licence

- **Code:** MIT — see [`LICENSE`](LICENSE).
- **Artwork, images, email templates, texts, and the Kıbrısım name/logo/slogans:** all rights reserved — see [`ASSETS-LICENSE.md`](ASSETS-LICENSE.md).

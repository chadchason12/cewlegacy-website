# CEW Legacy Homes — Website Handoff

This file is the authoritative context document for anyone working on cewlegacy.com.
Read it fully before making any changes.

---

## What this project is

**cewlegacy.com** is the public website for CEW Legacy Homes, a family-owned house renovation and flipping company in Palestine, TX. Chad Chason owns the company.

- CEW Legacy LLC was founded in 2020 (the legal entity)
- CEW Legacy Homes was formed in 2026 (the DBA / operating brand for house flipping)
- The person managing and developing this website going forward is Chad's wife

The site does four things:
1. Showcases the active renovation project so buyers landing from the yard sign QR code see it immediately
2. Collects buyer interest via the "Get Notified" form (name, phone, email, bed/bath/price preferences)
3. Tells the company's story and values
4. Hosts legally required SMS compliance pages for Twilio A2P carrier approval

---

## How to deploy changes

The site is **pure HTML and CSS — no build step, no framework, no backend**.

- Local files: `/Users/chadchason/Documents/Claude/Projects/cewlegacy-website/`
- GitHub repo: https://github.com/chadchason12/cewlegacy-website
- Hosting: Vercel — **auto-deploys within ~60 seconds whenever you push to the `main` branch**
- DNS: Cloudflare (cewlegacy.com)

**Workflow:** Edit the file → commit → push to main → live. That's it.

After every edit, always commit and push to main. Never hand the user a git command to run — do it yourself.

---

## Files in this project

| File | Purpose |
|---|---|
| `index.html` | Home page — property + notify form only |
| `about.html` | About page — hero + family story, company values |
| `contact.html` | Contact page — email, area served, text message policy |
| `privacy.html` | Privacy Policy — legally required, see restrictions below |
| `terms.html` | SMS Terms & Conditions — legally required, see restrictions below |
| `vercel.json` | Clean URL config (removes .html extensions) — do not touch |
| `CLAUDE.md` | This file |

Each HTML page is fully self-contained (own `<style>` block, own copy of shared CSS) — there's no shared stylesheet or templating. A sitewide design change (like the color palette) has to be applied to each page's `<style>` block individually.

---

## Current page structure (as of Sep 2026)

The site is three pages (split from one long page in Sep 2026, so buyers landing from the yard sign QR code hit property + signup immediately with nothing else in the way; Contact was later split out of About into its own page too):

**Home (`index.html`)**
1. **Nav** — sticky, logo only (no nav-bar tagline text), links to Home / About / Contact / Get Notified
2. **Active Project** — centered intro headline + paragraph, then a single taupe "diptych" frame holding the property photo and a details/CTA card side by side
3. **Flourish divider** — small roofline glyph between sections, echoing the logo
4. **Get Notified form** — buyer interest form with SMS consent, wired to Formspree, framed to match the photo
5. **Footer** — italic tagline, copyright, nav links, privacy/terms links

**About (`about.html`)**
1. **Nav** — same as Home
2. **Hero** — headline + company description, beside a card telling the family's story (Carl, the company's founding, who runs it today)
3. **About** — "Every house has a story worth keeping" intro + a 2x2 grid of company values (no more separate "mission" box — folded into the story)
4. **Footer** — same as Home

**Contact (`contact.html`)**
1. **Nav** — same as Home
2. **Contact** — email, area served, text message policy, "email us about your own property" card
3. **Footer** — same as Home

The site also has a thin forest-green accent bar above the nav on every page, and the nav has a soft shadow instead of a hard border line.

Cross-page links use absolute paths (`/`, `/about`, `/contact`, `/#notify`) since they now point across pages, not to anchors on one page.

---

## Design system

The site uses a warm, light theme (switched from the original dark theme in Sep 2026). All colors are defined as CSS custom properties (variables) at the top of `index.html` inside `:root {}`. Variable names are historical (e.g. `--bronze` now holds a green, `--cream` now holds a dark ink color) — only the hex values changed, not the names, to keep the edit low-risk. Rename them if that confusion is worth cleaning up later.

| Variable | Hex | Role |
|---|---|---|
| `--bg-deep` | `#f6f0e4` | Main page background (cream) |
| `--bg-surface` | `#ece0c8` | Section backgrounds (deeper cream) |
| `--bg-card` | `#f1e8d4` | Cards, nested elements |
| `--border` | `#d9cbab` | All borders and dividers |
| `--cream` | `#241a12` | Primary text and headings (dark ink brown) |
| `--muted` | `#6b5540` | Secondary text, labels, subheadings (walnut) |
| `--bronze` | `#40543a` | Accent — buttons, badges, icons, highlights (forest green) |
| `--bronze-dk` | `#2e3e29` | Button hover state (deeper forest) |
| `--gold` | `#40543a` | Links, stat numbers (same forest green) |
| `--gold-lt` | `#2e3e29` | Link hover state |
| `--on-accent` | `#f6f0e4` | Text sitting on top of a `--bronze` (green) background — buttons, the nav CTA, the logo mark |

There's also a warm taupe, `#b7a488`, used (with a faint grain texture) as the "picture mat" frame behind the property photo and the notify-form card — it's a literal color, not a CSS variable, used in a couple of `background-image` declarations.

**Font:** Google Fonts — `Fraunces` (serif, headlines/h1-h3/.section-title) paired with `Libre Franklin` (sans, body text/UI). Loaded via `<link>` tags in `<head>`.

**She can freely change any of this.** Colors, fonts, layout — all of it is hers to redesign. The only constraint is the SMS compliance pages (privacy.html, terms.html) — see below.

---

## Active Legacy Project — how to update

### Property photo
In `index.html`, find the comment: `<!-- PHOTO: Replace the placeholder below -->`.

There is currently a placeholder div. When a real photo is ready:
1. Upload the photo to the `images/` folder in the GitHub repo
2. Replace the `<div class="project-photo-placeholder">` block with:
   `<img class="project-photo" src="images/FILENAME.jpg" alt="1305 E Park Ave, Palestine TX" />`

### Property bio
In `index.html`, find the comment: `<!-- BIO: Replace this placeholder -->`.

Edit the text inside `<p class="project-bio">`. 2–4 sentences in her own voice.

### Adding a second property
Duplicate the entire `<!-- ── PROPERTY CARD ── -->` block and place it after the first one inside `.project-grid`. The layout stacks automatically.

### Current property details
- Address: 1305 E Park Ave
- Location: Palestine, TX · Anderson County
- Tags: Full Renovation, Single-Family, Palestine TX

---

## Get Notified form

The form is wired to **Formspree** (endpoint `xyezgzwl`). Submissions go to info@cewlegacy.com automatically. No backend needed.

**What the form collects:** first name, last name, phone (required), email (optional). Bedrooms/bathrooms/price range fields were removed (Sep 2026) — just contact info now.

**Consent checkboxes (two separate — required by Twilio):**
1. SMS consent — agrees to receive property listing text notifications
2. T&C acknowledgment — confirms they've read Privacy Policy and SMS Terms

The submit button says "Yes, Notify Me." A compliance footer repeats STOP/HELP instructions with links to both policy pages.

**Do not combine the two checkboxes into one.** Twilio requires them to be separate.

---

## Twilio A2P SMS

A Twilio A2P 10DLC campaign was submitted and approved on September 15, 2026. Campaign SID `CM27f24e935951510c2a464b03c19aad84`, Messaging Service SID `MGd22f1ae49733f6d0d5841810b20d4aad`, sending number `(903) 522-5109`.

**Auto-confirmation text is now live**, and **every submission is also recorded in Supabase.** When someone submits the "Get Notified" form, `index.html`'s submit handler posts to Formspree as before (so email notifications keep working unchanged), then separately calls `/api/send-confirmation.js` — a Vercel serverless function (no dependencies, no build step — matches the rest of the site) that does two things: (1) inserts the lead into the `buyer_leads` table in the **CEW Legacy app's Supabase project** (`rentalops-prod`, project ref `ouknovnayycezioutacy`) so the company app/portal can show and notify leads about future listings, and (2) sends a one-time SMS via Twilio's REST API confirming the signup. Both calls are fire-and-forget from the visitor's perspective: if either fails, the form submission still succeeds and they still see the on-page success message.

The function reads three Twilio secrets from Vercel's Environment Variables (Project → Settings → Environment Variables) — `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_MESSAGING_SERVICE_SID`. The Auth Token is a real secret; it was added directly in the Vercel dashboard and has never been shared in chat. The Supabase URL and anon/publishable key are hardcoded directly in `api/send-confirmation.js` — that's intentional and safe, since Supabase publishable keys are designed to be exposed, and Row Level Security on `buyer_leads` only allows the `anon` role to INSERT (never read, update, or delete). Only signed-in app users can read the table.

The confirmation text reads: *"Thanks for signing up with CEW Legacy Homes! We'll text you the moment a home matching your interest is ready. Reply STOP to opt out."* — to change the wording, edit the `message` string in `api/send-confirmation.js`.

**`buyer_leads` schema** (in the app's Supabase, not this repo): `id`, `first_name`, `last_name`, `email`, `phone` (E.164, e.g. `+19035550100`), `sms_consent`, `terms_consent`, `source` (always `'website'` from here), `notified_at`, `unsubscribed`, `created_at`, plus nullable preference columns `preferred_bedrooms`, `preferred_bathrooms`, `preferred_sqft_min`, `price_min`, `price_max` — added ahead of time for when the form collects buyer preferences; until then they're just always null. The CEW Legacy app (Chad's separate Next.js/Supabase project, on TestFlight) reads this table to let Holly view leads and send bulk "new listing" texts — that app is a different codebase, not something managed from this repo.

**STOP/opt-out sync.** Twilio's Advanced Opt-Out (Messaging Service → Opt-Out tab) already blocks sends to numbers that have texted STOP and auto-replies on its own — that part is automatic and requires nothing from us. But so `buyer_leads.unsubscribed` reflects reality (rather than the app's lead list going stale), `api/twilio-opt-out.js` is a webhook that reads the inbound message body for STOP/START-family keywords and flips `unsubscribed` accordingly. It needs `SUPABASE_SERVICE_ROLE_KEY` in Vercel's env vars (a real secret — add it directly in Vercel, it bypasses RLS so it must never be exposed client-side or hardcoded in this repo). It's wired up as the Messaging Service's general inbound webhook in the Twilio console (Messaging → Services → the messaging service → **Settings** tab → Incoming Messages / Request URL): `https://cewlegacy.com/api/twilio-opt-out`. Unverified: whether Twilio still forwards a message to this webhook when Advanced Opt-Out intercepts it as a STOP/START keyword, vs. handling it silently at the carrier level and never calling this URL at all — test by texting STOP to the number and checking whether the matching row's `unsubscribed` actually flips in Supabase.

---

## SMS compliance pages — do not modify without understanding the consequences

`privacy.html` and `terms.html` are required for Twilio's A2P 10DLC carrier approval. They must remain live at `cewlegacy.com/privacy` and `cewlegacy.com/terms`.

**Do not:**
- Remove these pages
- Remove or soften the opt-out language
- Remove or soften the "no data sharing" language
- Remove the message frequency disclosure
- Remove the exact statement: "We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes"

The Twilio A2P 10DLC campaign was approved on 2026-09-15. `sms-consent-script.html` (the legacy verbal consent script) was deleted the same day since it's no longer needed.

---

## Contact info

- **Email:** info@cewlegacy.com (used in the site, in Formspree, and in Twilio)
- **Old email:** cewlegacyllc@gmail.com — this is outdated, do not use it
- If the email ever changes, it appears in: `index.html` (multiple places), `privacy.html`, `terms.html`

---

## What she can freely change

Everything except the SMS compliance pages. She can:
- Redesign the colors, fonts, layout
- Rewrite any copy
- Add sections, remove sections, reorder sections (except keep the compliance page content intact)
- Add a logo image instead of the "CL" text mark
- Add more property cards
- Change the form fields (but keep both consent checkboxes separate)
- Anything else she wants

This is her website to develop. The compliance pages are the only hard constraint.

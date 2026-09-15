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
| `index.html` | The entire website — all sections live here |
| `privacy.html` | Privacy Policy — legally required, see restrictions below |
| `terms.html` | SMS Terms & Conditions — legally required, see restrictions below |
| `sms-consent-script.html` | Legacy verbal consent script — can be deleted after Twilio campaign is approved |
| `vercel.json` | Clean URL config (removes .html extensions) — do not touch |
| `CLAUDE.md` | This file |

---

## Current page structure (as of Sep 2026)

Section order on the homepage, top to bottom:

1. **Nav** — sticky, logo + nav links + "Get Notified" CTA button
2. **Active Legacy Project** — property card (photo + address + bio + tags) + sidebar copy + CTA
3. **Get Notified form** — buyer interest form with SMS consent, wired to Formspree
4. **Hero** — headline, company description, "What We Stand For" promise card
5. **About** — company values, mission statement
6. **Contact** — email, area served, text message policy
7. **Footer** — copyright, nav links, privacy/terms links

The section order was intentional: QR codes on yard signs drive traffic directly to the site, so buyers see the active property and the sign-up form before anything else.

---

## Design system

The site uses a dark theme. All colors are defined as CSS custom properties (variables) at the top of `index.html` inside `:root {}`.

| Variable | Hex | Role |
|---|---|---|
| `--bg-deep` | `#141414` | Main page background |
| `--bg-surface` | `#1e1e1e` | Section backgrounds |
| `--bg-card` | `#252525` | Cards, nested elements |
| `--border` | `#333333` | All borders and dividers |
| `--cream` | `#e8d5b0` | Primary text and headings |
| `--muted` | `#8a8275` | Secondary text, labels, subheadings |
| `--bronze` | `#b87333` | Accent — buttons, badges, icons, highlights |
| `--bronze-dk` | `#9a5f28` | Button hover state |
| `--gold` | `#d4a843` | Links, stat numbers |
| `--gold-lt` | `#f0cc6e` | Link hover state |

**Font:** System font stack — `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. No external fonts are loaded.

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

A Twilio A2P 10DLC campaign was submitted on September 15, 2026. Carrier approval is pending (typically a few business days).

Once approved, the next step is to wire up an auto-confirmation text that fires when someone submits the form. That requires connecting Twilio to Formspree submissions via a small backend or webhook — it has not been built yet.

Until then, form submissions reach info@cewlegacy.com and can be followed up by email or phone.

---

## SMS compliance pages — do not modify without understanding the consequences

`privacy.html` and `terms.html` are required for Twilio's A2P 10DLC carrier approval. They must remain live at `cewlegacy.com/privacy` and `cewlegacy.com/terms`.

**Do not:**
- Remove these pages
- Remove or soften the opt-out language
- Remove or soften the "no data sharing" language
- Remove the message frequency disclosure
- Remove the exact statement: "We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes"

If the Twilio campaign gets rejected again, these pages will be under review. Do not change them without checking with Chad first.

`sms-consent-script.html` (verbal consent script) is legacy and can be deleted once the Twilio campaign is approved.

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

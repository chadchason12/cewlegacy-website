# CEW Legacy Homes Website — Claude Handoff

This file gives Claude everything it needs to help manage the CEW Legacy Homes website.

---

## What this project is

**cewlegacy.com** is the public website for CEW Legacy Homes, a family-owned house renovation (house-flipping) company in Palestine, TX and surrounding East Texas. Chad Chason owns the company. CEW Legacy LLC was founded in 2020; CEW Legacy Homes was formed in 2026.

The site's job is to:
- Show prospective buyers the active renovation project ("Active Legacy Project")
- Collect buyer interest via the "Get Notified" opt-in form (name, phone, email, bed/bath/price preference)
- Tell the company's story and values
- Handle legal compliance for SMS messaging (Twilio A2P) — listing alert notifications
- Give contact info (info@cewlegacy.com)

---

## The site at a glance

- **Live URL:** https://cewlegacy.com
- **GitHub repo:** https://github.com/chadchason12/cewlegacy-website
- **Hosting:** Vercel — auto-deploys when you push to the `main` branch on GitHub
- **Domain/DNS:** Managed through Cloudflare (cewlegacy.com)
- **Contact email on site:** info@cewlegacy.com

The site has no backend, no database, and no login. It is pure HTML and CSS files.

---

## Page section order (as of Sep 2026)

1. Nav
2. Active Legacy Project (first thing visitors see — QR code on yard sign drives traffic here)
3. Get Notified form
4. Hero / intro copy
5. About
6. Contact
7. Footer

---

## Files in this project

| File | What it is |
|---|---|
| `index.html` | The main homepage — everything the public sees |
| `privacy.html` | Privacy Policy at cewlegacy.com/privacy |
| `terms.html` | SMS Terms & Conditions at cewlegacy.com/terms |
| `sms-consent-script.html` | Legacy verbal consent script — can be removed after Twilio campaign is approved |
| `vercel.json` | Tells Vercel to use clean URLs (no .html in the address bar) |
| `CLAUDE.md` | This file — context for Claude |

---

## How to make a change and put it live

1. Open the file you want to edit (usually `index.html`)
2. Make the change with Claude's help
3. Claude will commit and push to GitHub
4. Vercel picks up the push automatically and the live site updates within about 60 seconds

You do NOT need to do anything in Vercel or Cloudflare for normal content edits.

---

## Design system

The site uses a consistent dark theme with these colors:

| Name | Hex | Used for |
|---|---|---|
| `--bg-deep` | `#141414` | Page background |
| `--bg-surface` | `#1e1e1e` | Section backgrounds, cards |
| `--bg-card` | `#252525` | Nested cards, stat boxes |
| `--border` | `#333333` | All borders and dividers |
| `--cream` | `#e8d5b0` | Primary text, headings |
| `--muted` | `#8a8275` | Secondary text, labels |
| `--bronze` | `#b87333` | Accent color, buttons, icons |
| `--bronze-dk` | `#9a5f28` | Button hover state |
| `--gold` | `#d4a843` | Links, highlighted numbers |
| `--gold-lt` | `#f0cc6e` | Link hover state |

The font is the system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`). No external font libraries are loaded.

---

## Current content facts (verify before changing)

- **Active project:** 1305 E Park Ave, Palestine, TX (full renovation in progress)
- **Contact email:** info@cewlegacy.com
- No phone number listed on the site
- SMS use case: property listing alert notifications (not rental applications)
- Twilio A2P campaign: submitted Sep 15 2026, pending carrier approval
- Formspree endpoint: xyezgzwl (already wired up — form submissions go to info@cewlegacy.com)

---

## Editable sections for Chad's wife (non-developer)

### Active Legacy Project — property photo
In `index.html`, find the comment "PHOTO: Replace the placeholder below".
Replace the `<div class="project-photo-placeholder">` block with:
`<img class="project-photo" src="images/FILENAME.jpg" alt="DESCRIPTION" />`
Upload the photo file to an `images/` folder in the project first.

### Active Legacy Project — property bio
In `index.html`, find the comment "BIO: Replace this placeholder".
Edit the text inside `<p class="project-bio">`. 2–4 sentences, written naturally.

### Adding a second property
Duplicate the entire `<!-- ── PROPERTY CARD ── -->` block in `index.html`
and place it after the first one inside `.project-grid`. The layout handles the rest.

### Formspree (already set up)
The "Get Notified" form already sends submissions to info@cewlegacy.com via Formspree endpoint `xyezgzwl`. No action needed — just test a submission to confirm delivery.

---

## Get Notified form — what's in it

The form collects: first name, last name, phone (required), email (optional), bedrooms, bathrooms, price range.

It has two required checkboxes:
1. SMS consent — agrees to receive property listing text notifications
2. T&C agreement — confirms they've read the Privacy Policy and SMS Terms

Submit button says "Yes, Notify Me." A compliance footer below the button repeats the STOP/HELP instructions and links to both policy pages.

---

## SMS compliance pages (important — do not change without understanding why)

The `privacy.html` and `terms.html` pages are required for Twilio's A2P 10DLC compliance review.

Key rules:
- CEW Legacy Homes may send 1 to 3 texts per available property matching a subscriber's preferences
- Consent is optional — users can email info@cewlegacy.com without providing a phone number
- No financial data is collected on the interest form
- No phone numbers or consent data are shared or sold to any third party
- The privacy policy contains the exact required statement: "We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes"

Do not remove or water down the opt-out language, the "no data sharing" language, or the message frequency disclosure. These are required by Twilio and the TCPA.

---

## What NOT to do

- Do not add a backend, database, or login system — this site does not need one
- Do not remove the privacy/terms/SMS pages — they are legally required
- Do not change the contact email without updating every place it appears (index.html, privacy.html, terms.html)
- Do not commit secrets, passwords, or API keys — there are none in this project and it should stay that way

---

## How Claude should work on this project

- Read the file before editing it
- After any edit, commit and push to `main` — Vercel deploys automatically
- Use `git add <filename> && git commit -m "..."  && git push origin main`
- Keep changes focused — one thing at a time
- The site has no build step — what you write is what goes live

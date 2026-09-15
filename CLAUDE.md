# CEW Legacy Homes Website — Claude Handoff

This file gives Claude everything it needs to help manage the CEW Legacy Homes website.

---

## What this project is

**cewlegacy.com** is the public website for CEW Legacy Homes, a family-owned house renovation (house-flipping) company in Palestine, TX and surrounding East Texas. Chad Chason owns the company. CEW Legacy LLC was founded in 2020; CEW Legacy Homes was formed in 2026.

The site's job is to:
- Tell prospective buyers about the company and its renovation philosophy
- Showcase the active renovation project ("Active Legacy Project")
- Collect buyer interest via the "Get Notified" opt-in form (name, phone, email, bed/bath/price preference)
- Handle legal compliance for SMS messaging (Twilio A2P) — listing alert notifications
- Give contact info (info@cewlegacy.com)

---

## The site at a glance

- **Live URL:** https://cewlegacy.com
- **GitHub repo:** https://github.com/chadchason12/cewlegacy-website
- **Hosting:** Vercel — auto-deploys when you push to the `main` branch on GitHub
- **Domain/DNS:** Managed through Cloudflare (cewlegacy.com)
- **Contact email on site:** cewlegacyllc@gmail.com

The site has no backend, no database, and no login. It is pure HTML and CSS files.

---

## Files in this project

| File | What it is |
|---|---|
| `index.html` | The main homepage — everything the public sees first |
| `privacy.html` | Privacy Policy and SMS Terms (combined page) at cewlegacy.com/privacy |
| `terms.html` | SMS Terms and Conditions at cewlegacy.com/terms |
| `sms-consent-script.html` | Internal script for verbal SMS consent (used by Twilio A2P compliance) at cewlegacy.com/sms-consent-script |
| `vercel.json` | Tells Vercel to use clean URLs (no .html in the address bar) and no trailing slashes |
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
- Twilio A2P campaign: not yet approved — resubmission pending as of September 2026

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

### Formspree setup (required for the notify form to work)
1. Sign up at formspree.io using info@cewlegacy.com
2. Create a new form and copy the endpoint URL (looks like formspree.io/f/xxxxxxxx)
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT"`
4. Replace YOUR_FORMSPREE_ENDPOINT with the actual endpoint ID

---

## SMS compliance pages (important — do not change without understanding why)

The `privacy.html` and `terms.html` pages are required for Twilio's A2P 10DLC compliance review. They explain how CEW Legacy Homes handles SMS opt-in for property listing notifications.

Key rules:
- CEW Legacy Homes may send 1 to 3 texts per available property matching a subscriber's preferences
- Consent is optional — users can email info@cewlegacy.com without providing a phone number
- No financial data is collected on the interest form
- No phone numbers or consent data are shared or sold to any third party

Do not remove or water down the opt-out language, the "no data sharing" language, or the message frequency disclosure. These are required by Twilio and the TCPA.

The `sms-consent-script.html` page (verbal consent script) is no longer the primary opt-in method. The web form is. That page can be removed once the Twilio campaign is approved.

---

## What NOT to do

- Do not add a backend, database, or login system — this site does not need one
- Do not remove the privacy/terms/SMS pages — they are legally required
- Do not change the contact email without updating every place it appears (index.html has it in multiple spots)
- Do not commit secrets, passwords, or API keys — there are none in this project and it should stay that way

---

## How Claude should work on this project

- Read the file before editing it
- After any edit, commit and push to `main` — Vercel deploys automatically
- Use `git add <filename> && git commit -m "..."  && git push origin main`
- Keep changes focused — one thing at a time
- The site has no build step — what you write is what goes live

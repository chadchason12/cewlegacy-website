# CEW Legacy LLC Website — Claude Handoff

This file gives Claude everything it needs to help manage the CEW Legacy LLC website.

---

## What this project is

**cewlegacy.com** is the public website for CEW Legacy LLC, a family-owned residential rental property management company in Palestine and Elkhart, Texas (Anderson County). Chad Chason owns the company.

The site's job is to:
- Tell prospective tenants about the company and properties
- Explain how to apply for a rental
- Handle legal compliance for SMS messaging (Twilio A2P)
- Give contact info so people can get on the waitlist

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

- **17 residential properties** in the portfolio
- **2 communities:** Palestine, TX and Elkhart, TX (Anderson County)
- **No vacancies at this time** — a vacancy notice banner shows on the homepage
- Contact email: cewlegacyllc@gmail.com
- No phone number listed on the site

---

## SMS compliance pages (important — do not change without understanding why)

The `privacy.html`, `terms.html`, and `sms-consent-script.html` pages were created to satisfy Twilio's A2P 10DLC compliance review. These pages explain how CEW Legacy LLC handles SMS opt-in for rental applicants.

Key rules:
- CEW Legacy LLC may send 1 to 3 texts per rental application (application link, approval, denial)
- Consent is optional — tenants are never required to agree to texts to apply
- No SSN is collected in the rental application process
- No phone numbers or consent data are shared or sold to any third party

Do not remove or water down the opt-out language, the "no data sharing" language, or the message frequency disclosure. These are required by Twilio and the TCPA.

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

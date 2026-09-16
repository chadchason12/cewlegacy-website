// Twilio calls this on every inbound text to our Messaging Service —
// configured as the Messaging Service's general inbound webhook (Twilio
// console: Messaging → Services → the service → Settings → "Incoming
// Messages" / Request URL. See CLAUDE.md for exact steps). Twilio's
// Advanced Opt-Out feature already blocks sends to opted-out numbers on its
// own and auto-replies to STOP/START on its own; this just reads the
// message body for the same keywords so public.buyer_leads.unsubscribed
// stays in sync — otherwise the company app's lead list would silently go
// stale instead of reflecting who's actually opted out.
//
// Twilio POSTs this as application/x-www-form-urlencoded, not JSON.

const SUPABASE_URL = "https://ouknovnayycezioutacy.supabase.co";

// Matches the keywords configured in Twilio's Opt-Out tab, plus Twilio's
// standard global keywords as a safety net.
const STOP_KEYWORDS = ["stop", "stopall", "unsubscribe", "cancel", "end", "quit"];
const START_KEYWORDS = ["start", "unstop", "yes"];

function toE164(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 10) return "+1" + digits;
  if (digits.length === 11 && digits.startsWith("1")) return "+" + digits;
  return null;
}

function parseFormBody(body) {
  const params = new URLSearchParams(body);
  return Object.fromEntries(params.entries());
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Vercel doesn't auto-parse x-www-form-urlencoded bodies, so read it raw.
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  const fields = parseFormBody(raw);

  const from = toE164(fields.From);
  const body = String(fields.Body || "").trim().toLowerCase();

  const isStop = STOP_KEYWORDS.includes(body);
  const isStart = START_KEYWORDS.includes(body);

  if (from && (isStop || isStart)) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    try {
      const updateRes = await fetch(
        `${SUPABASE_URL}/rest/v1/buyer_leads?phone=eq.${encodeURIComponent(from)}`,
        {
          method: "PATCH",
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ unsubscribed: isStop }),
        }
      );
      if (!updateRes.ok) {
        console.error("Supabase opt-out update failed:", await updateRes.text());
      }
    } catch (err) {
      console.error("Opt-out webhook error:", err);
    }
  }

  // Respond with empty TwiML so Twilio doesn't also send its own reply on
  // top of the auto-reply Advanced Opt-Out already sends.
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send("<Response></Response>");
}

// Twilio calls this automatically whenever someone texts STOP, START, or a
// similar keyword to the number tied to our Messaging Service — configured
// as the Messaging Service's "Opt-Out Callback URL" in the Twilio console
// (see CLAUDE.md for setup steps). Twilio's Advanced Opt-Out feature already
// blocks messages to opted-out numbers on its own; this just keeps
// public.buyer_leads.unsubscribed in sync so the company app's lead list
// reflects reality instead of silently going stale.
//
// Twilio POSTs this as application/x-www-form-urlencoded, not JSON.

const SUPABASE_URL = "https://ouknovnayycezioutacy.supabase.co";

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
  // Twilio's Opt-Out Callback sends OptOutType as STOP, START, or HELP.
  const optOutType = String(fields.OptOutType || "").toUpperCase();

  if (!from || !optOutType) {
    // Always 200 back to Twilio even on bad input — it doesn't retry
    // meaningfully on errors here, and we don't want retry storms.
    res.status(200).json({ ok: true, skipped: true });
    return;
  }

  const unsubscribed = optOutType === "STOP";
  const shouldUpdate = optOutType === "STOP" || optOutType === "START";

  if (shouldUpdate) {
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
          body: JSON.stringify({ unsubscribed }),
        }
      );
      if (!updateRes.ok) {
        console.error("Supabase opt-out update failed:", await updateRes.text());
      }
    } catch (err) {
      console.error("Opt-out webhook error:", err);
    }
  }

  res.status(200).json({ ok: true });
}

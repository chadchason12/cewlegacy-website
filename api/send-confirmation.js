// Runs after someone submits the "Get Notified" form (called from index.html
// right after the Formspree submission succeeds). Two jobs:
//   1. Record the lead in Supabase (public.buyer_leads) so the CEW Legacy
//      app/portal can show and notify them about future listings.
//   2. Send a one-time SMS confirmation via Twilio.
// Runs on Vercel as a serverless function — no dependencies, no build step,
// matches the rest of this static site. The Supabase lookup uses the
// publishable (anon) key, which is safe to use here since RLS on
// buyer_leads only allows anon to INSERT, never read/update/delete.

const SUPABASE_URL = "https://ouknovnayycezioutacy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_S7X3C1LXhAXlQfbT-euckg_87aznKmN";

function toE164(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 10) return "+1" + digits;
  if (digits.length === 11 && digits.startsWith("1")) return "+" + digits;
  return null;
}

async function recordLead({ first_name, last_name, email, phone, sms_consent, terms_consent }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/buyer_leads`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email: email || null,
      // Stored in E.164 (+1XXXXXXXXXX) so it matches the format Twilio
      // reports in opt-out webhooks — needed to reliably flag unsubscribes.
      phone,
      sms_consent: sms_consent === "yes",
      terms_consent: terms_consent === "yes",
      source: "website",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Supabase insert error:", errText);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { phone, first_name, last_name, email, sms_consent, terms_consent } = req.body || {};
  const to = toE164(phone);

  if (!to) {
    res.status(400).json({ error: "Missing or invalid phone number" });
    return;
  }

  // Record the lead regardless of whether the text send below succeeds —
  // losing a lead because of a Twilio hiccup would be worse than a missed text.
  await recordLead({ first_name, last_name, email, phone: to, sms_consent, terms_consent });

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const message =
    "Thanks for signing up with CEW Legacy Homes! We'll text you the moment a home matching your interest is ready. Reply STOP to opt out.";

  try {
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
    const body = new URLSearchParams({
      To: to,
      MessagingServiceSid: messagingServiceSid,
      Body: message,
    });

    const twilioRes = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

    if (!twilioRes.ok) {
      const errText = await twilioRes.text();
      console.error("Twilio error:", errText);
      res.status(502).json({ error: "Failed to send text" });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Send confirmation error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

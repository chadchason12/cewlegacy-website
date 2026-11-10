// Powers the hidden admin.html page: "a property just got listed, text everyone
// who signed up." Runs on Vercel as a serverless function, same pattern as
// send-confirmation.js and twilio-opt-out.js (no dependencies, no build step).
//
// Gated by a PIN (process.env.ADMIN_NOTIFY_PIN in Vercel) so a random visitor
// can't trigger a text blast. Reads every buyer_leads row with sms_consent
// true and unsubscribed not true via the Supabase service role key (the anon
// key can't SELECT — see CLAUDE.md), then sends each one an SMS through the
// same Twilio Messaging Service already approved for A2P 10DLC.

const SUPABASE_URL = "https://ouknovnayycezioutacy.supabase.co";

function buildMessage(template, address, link) {
  return template
    .replaceAll("{{address}}", address)
    .replaceAll("{{link}}", link);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { pin, address, link, message } = req.body || {};

  if (!pin || pin !== process.env.ADMIN_NOTIFY_PIN) {
    res.status(401).json({ error: "Incorrect PIN" });
    return;
  }

  if (!address || !link || !message) {
    res.status(400).json({ error: "Missing address, link, or message" });
    return;
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  let leads;
  try {
    const leadsRes = await fetch(
      // not.is.true (rather than is.false) so rows where unsubscribed is
      // still null — the default for everyone who hasn't texted STOP — are
      // included too, not just rows explicitly set to false.
      `${SUPABASE_URL}/rest/v1/buyer_leads?select=id,phone&sms_consent=eq.true&unsubscribed=not.is.true`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      }
    );
    if (!leadsRes.ok) {
      const errText = await leadsRes.text();
      console.error("Supabase lead fetch error:", errText);
      res.status(502).json({ error: "Could not load the sign-up list" });
      return;
    }
    leads = await leadsRes.json();
  } catch (err) {
    console.error("Lead fetch error:", err);
    res.status(500).json({ error: "Server error loading sign-ups" });
    return;
  }

  if (!leads.length) {
    res.status(200).json({ success: true, sent: 0, failed: 0 });
    return;
  }

  const finalMessage = buildMessage(message, address, link);
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  let sent = 0;
  let failed = 0;
  const notifiedIds = [];

  for (const lead of leads) {
    try {
      const body = new URLSearchParams({
        To: lead.phone,
        MessagingServiceSid: messagingServiceSid,
        Body: finalMessage,
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
      if (twilioRes.ok) {
        sent++;
        notifiedIds.push(lead.id);
      } else {
        failed++;
        console.error("Twilio send failed for a lead:", await twilioRes.text());
      }
    } catch (err) {
      failed++;
      console.error("Twilio send error for a lead:", err);
    }
  }

  // Best-effort: stamp notified_at on everyone we successfully texted.
  if (notifiedIds.length) {
    try {
      await fetch(
        `${SUPABASE_URL}/rest/v1/buyer_leads?id=in.(${notifiedIds.join(",")})`,
        {
          method: "PATCH",
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ notified_at: new Date().toISOString() }),
        }
      );
    } catch (err) {
      console.error("notified_at stamp error:", err);
    }
  }

  res.status(200).json({ success: true, sent, failed });
}

// Sends a one-time SMS confirmation via Twilio after someone submits the
// "Get Notified" form. Called from index.html right after the Formspree
// submission succeeds. Runs on Vercel as a serverless function — no
// dependencies, no build step, matches the rest of this static site.

function toE164(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 10) return "+1" + digits;
  if (digits.length === 11 && digits.startsWith("1")) return "+" + digits;
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { phone, first_name } = req.body || {};
  const to = toE164(phone);

  if (!to) {
    res.status(400).json({ error: "Missing or invalid phone number" });
    return;
  }

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

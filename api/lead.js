/**
 * ==============================================================================
 * Sigma Consulting — Vercel Serverless API Function (/api/lead)
 * ==============================================================================
 */

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed. Faqat POST so'rovlari qabul qilinadi.",
    });
  }

  try {
    const { name, phone, country, degree, reason } = req.body || {};

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        error: "Ismingizni kiritishingiz shart.",
      });
    }

    if (!phone || String(phone).replace(/\D/g, "").length < 7) {
      return res.status(400).json({
        success: false,
        error: "To'g'ri telefon raqam kiriting.",
      });
    }

    const BOT_TOKEN =
      process.env.TELEGRAM_BOT_TOKEN ||
      "8893326249:AAGiCF91gWbHbiJ8ZFygNikKe2cNQ8KGTHU";
    const ADMIN_CHAT_ID =
      process.env.TELEGRAM_ADMIN_CHAT_ID || "5627504385";

    const now = new Date();
    const formattedDate = now.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Tashkent",
    });
    const formattedTime = now.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Tashkent",
    });

    const escape = (str) =>
      String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const messageText = [
      "🎓 <b>YANGI ARIZA — SIGMA CONSULTING</b>",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `👤 <b>Mijoz:</b> ${escape(name)}`,
      `📞 <b>Telefon:</b> <code>${escape(phone)}</code>`,
      `🌍 <b>Qiziqqan davlat:</b> ${escape(country || "Belgilanmagan")}`,
      `📚 <b>Ta'lim bosqichi:</b> ${escape(degree || "Bakalavriat")}`,
      `📌 <b>Murojaat sababi / Manba:</b>`,
      `👉 <i>${escape(reason || "Umumiy bepul konsultatsiya so'rovi")}</i>`,
      "━━━━━━━━━━━━━━━━━━━━━━",
      `⏰ <b>Vaqt:</b> ${formattedTime} | ${formattedDate}`,
      `🌐 <b>Platforma:</b> Vercel Serverless API`,
    ].join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: messageText,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error("Telegram API Error:", result);
      return res.status(500).json({
        success: false,
        error: result.description || "Telegramga xabar yuborishda xatolik",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Arizangiz muvaffaqiyatli qabul qilindi!",
      timestamp: `${formattedDate} ${formattedTime}`,
    });
  } catch (error) {
    console.error("Vercel Lead API Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Server ichki xatoligi",
    });
  }
}

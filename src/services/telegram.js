const BOT_TOKEN =
  import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
  "8893326249:AAGiCF91gWbHbiJ8ZFygNikKe2cNQ8KGTHU";

const ADMIN_CHAT_ID =
  import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID || "5627504385";

/**
 * Sends a lead submission directly to the Telegram Admin via Bot API
 *
 * @param {Object} data
 * @param {string} data.name - Client name
 * @param {string} data.phone - Formatted or raw phone
 * @param {string} data.country - Selected country
 * @param {string} data.degree - Degree level
 * @param {string} [data.reason] - Reason or source (e.g. "Tarif: Standart", "Hero so'rov")
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function sendLeadToTelegram({
  name,
  phone,
  country,
  degree,
  reason,
}) {
  try {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const text = [
      "🎓 <b>YANGI ARIZA — SIGMA CONSULTING</b>",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `👤 <b>Mijoz:</b> ${escapeHtml(name)}`,
      `📞 <b>Telefon:</b> <code>${escapeHtml(phone)}</code>`,
      `🌍 <b>Qiziqqan davlat:</b> ${escapeHtml(country)}`,
      `📚 <b>Ta'lim bosqichi:</b> ${escapeHtml(degree)}`,
      `📌 <b>Murojaat sababi / Manba:</b>`,
      `👉 <i>${escapeHtml(reason || "Umumiy bepul konsultatsiya so'rovi")}</i>`,
      "━━━━━━━━━━━━━━━━━━━━━━",
      `⏰ <b>Kelib tushgan vaqti:</b> ${formattedTime} | ${formattedDate}`,
      `🌐 <b>Sayt:</b> sigmaconsulting.uz`,
    ].join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error("Telegram API Error:", result);
      return {
        success: false,
        error: result.description || "Telegramga yuborishda xatolik yuz berdi",
      };
    }

    return { success: true, result };
  } catch (error) {
    console.error("Failed to send lead to Telegram:", error);
    return {
      success: false,
      error: error.message || "Tarmoq xatosi yuz berdi",
    };
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * ==============================================================================
 * Sigma Consulting — Unified Lead Submission Service
 * ==============================================================================
 * Ushbu servis frontend arizalarini xavfsiz va kafolatlangan tarzda qabul qiladi:
 * 1. Avval server API ga yuboradi (/api/lead yoki /api/lead.php)
 * 2. Agar server mavjud bo'lmasa yoki offline bo'lsa, avtomatik ravishda to'g'ridan-to'g'ri
 *    Telegram botiga zaxira kanali orqali yetkazadi.
 * ==============================================================================
 */

import { siteConfig } from "../config/site";
import { escapeHtml, getFormattedDateTime } from "../utils/formatters";

// aHost yoki boshqa xosting URL manzili (agar frontend va backend alohida domenlarda bo'lsa)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";

/**
 * Submit student lead to backend API or fallback
 *
 * @param {Object} data
 * @param {string} data.name - Talaba ismi
 * @param {string} data.phone - Telefon raqami
 * @param {string} data.country - Tanlangan davlat
 * @param {string} data.degree - Ta'lim bosqichi
 * @param {string} [data.reason] - Murojaat manbasi/sababi
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function submitLead({ name, phone, country, degree, reason }) {
  const payload = {
    name: name?.trim() || "",
    phone: phone?.trim() || "",
    country: country || "Belgilanmagan",
    degree: degree || "Bakalavriat",
    reason: reason || "Sayt orqali umumiy konsultatsiya so'rovi",
  };

  // 1-bosqich: Server API ga yuborish (/api/lead yoki /api/lead.php)
  const apiEndpoints = [
    `${API_BASE_URL}/api/lead`,
    `${API_BASE_URL}/api/lead.php`,
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        if (result && result.success) {
          return {
            success: true,
            message:
              result.message ||
              "Arizangiz qabul qilindi. Tez orada mutaxassisimiz siz bilan bog'lanadi!",
          };
        }
      }
    } catch {
      // Keyingi endpointga yoki zaxira kanaliga o'tadi
    }
  }

  // 2-bosqich: Fallback (Agar server API javob bermasa, to'g'ridan-to'g'ri Telegram Botga yuborish)
  try {
    const BOT_TOKEN =
      import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
      siteConfig.telegramBot.defaultToken;
    const ADMIN_CHAT_ID =
      import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID ||
      siteConfig.telegramBot.defaultAdminChatId;

    const { date, time } = getFormattedDateTime();

    const text = [
      "🎓 <b>YANGI ARIZA — SIGMA CONSULTING</b>",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `👤 <b>Mijoz:</b> ${escapeHtml(payload.name)}`,
      `📞 <b>Telefon:</b> <code>${escapeHtml(payload.phone)}</code>`,
      `🌍 <b>Qiziqqan davlat:</b> ${escapeHtml(payload.country)}`,
      `📚 <b>Ta'lim bosqichi:</b> ${escapeHtml(payload.degree)}`,
      `📌 <b>Murojaat sababi / Manba:</b>`,
      `👉 <i>${escapeHtml(payload.reason)}</i>`,
      "━━━━━━━━━━━━━━━━━━━━━━",
      `⏰ <b>Vaqt:</b> ${time} | ${date}`,
      `🌐 <b>Sayt:</b> sigmaconsulting.uz`,
    ].join("\n");

    const directResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      }
    );

    const directResult = await directResponse.json();

    if (directResponse.ok && directResult.ok) {
      return {
        success: true,
        message:
          "Arizangiz qabul qilindi. Tez orada mutaxassisimiz siz bilan bog'lanadi!",
      };
    }

    return {
      success: false,
      error:
        directResult.description ||
        "Arizani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    };
  } catch (err) {
    console.error("Direct fallback error:", err);
    return {
      success: false,
      error: err.message || "Tarmoq xatosi yuz berdi.",
    };
  }
}

// Backwards compatibility alias
export const sendLeadToTelegram = submitLead;

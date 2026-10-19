import { useState, useEffect } from "react";
import { X, Send, Sparkles, CheckCircle2, Phone, User, Globe2, BookOpen, Loader2 } from "lucide-react";
import { sendLeadToTelegram } from "../services/telegram";
import { useLanguage } from "../contexts/LanguageContext";

export default function ConsultationModal({ isOpen, onClose, context = {} }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [country, setCountry] = useState(context?.country || t("modal_country_default"));
  const [degree, setDegree] = useState(t("degree_bachelor"));
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (context?.country) {
      setCountry(context.country);
    }
  }, [context]);

  if (!isOpen) return null;

  // Format 9 subscriber digits to XX XXX XX XX
  const formatUzbekPhone = (raw) => {
    if (!raw) return "";
    let res = raw.slice(0, 2);
    if (raw.length > 2) res += " " + raw.slice(2, 5);
    if (raw.length > 5) res += " " + raw.slice(5, 7);
    if (raw.length > 7) res += " " + raw.slice(7, 9);
    return res;
  };

  // Name handler: STRICTLY BLOCK NUMBERS
  const handleNameKeyDown = (e) => {
    // If key is a digit 0-9, prevent typing
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleNameChange = (e) => {
    // Strip any digits pasted or autocompleted
    const cleaned = e.target.value.replace(/[0-9]/g, "");
    setName(cleaned);
  };

  // Phone handler: STRICTLY BLOCK LETTERS AND ENFORCE MAX 9 DIGITS
  const handlePhoneKeyDown = (e) => {
    // Allow navigational/editing keys
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    // Block ANY key that is not a numeric digit
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    // Enforce max 9 digits: block additional digits unless text is highlighted/selected
    const target = e.target;
    const hasSelection = target.selectionStart !== target.selectionEnd;
    if (phoneDigits.length >= 9 && !hasSelection) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e) => {
    let cleaned = e.target.value.replace(/\D/g, "");
    // If full international format was pasted (+998...), strip the country code if > 9 digits
    if (cleaned.startsWith("998") && cleaned.length > 9) {
      cleaned = cleaned.slice(3);
    }
    // Strictly cap at 9 digits
    cleaned = cleaned.slice(0, 9);
    setPhoneDigits(cleaned);
    if (phoneError && cleaned.length === 9) {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneDigits.length !== 9) {
      setPhoneError(t("modal_phone_error"));
      return;
    }
    setPhoneError("");
    setIsSubmitting(true);

    const fullPhone = `+998 ${formatUzbekPhone(phoneDigits)}`;
    const reasonText = context?.reason || t("modal_reason_default");

    await sendLeadToTelegram({
      name,
      phone: fullPhone,
      country,
      degree,
      reason: reasonText,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setPhoneDigits("");
    setPhoneError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in-down">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#236B70]/60 bg-[#0B343B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-8 text-white">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute right-4 top-4 rounded-xl border border-[#236B70] bg-[#07262B] p-2 text-[#CBD5E1] hover:bg-[#104F5A] hover:text-white transition-colors"
          aria-label="Yopish"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3.5 py-1 text-xs font-bold text-[#D5A45B]">
              <Sparkles className="h-3.5 w-3.5 text-[#D5A45B]" />
              <span>{t("modal_badge")}</span>
            </div>
            <h3 className="mt-3 text-2xl font-black text-white">
              {t("modal_title")}
            </h3>

            {/* Context / Reason Pill */}
            {context?.reason && (
              <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-[#D5A45B]/30 bg-[#07262B] px-3 py-1.5 text-xs text-[#D5A45B]">
                <span className="h-2 w-2 rounded-full bg-[#D5A45B]" />
                <span className="truncate">
                <span className="font-semibold text-white/70">{t("modal_reason_label")}</span>{" "}
                {context.reason}
                </span>
              </div>
            )}

            <p className="mt-2 text-xs text-slate-300">
              {t("modal_desc")}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Name Field */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-200">
                    Ismingiz va familiyangiz
                  </label>
                    <span className="text-[10px] text-slate-400">
                      {t("modal_name_helper")}
                    </span>
                </div>
                <div className="flex h-12 w-full items-center rounded-xl border border-[#236B70] bg-[#07262B] px-3.5 transition-colors focus-within:border-[#D5A45B]">
                  <User className="h-4 w-4 shrink-0 text-[#D5A45B] mr-2.5" />
                  <input
                    type="text"
                    required
                    inputMode="text"
                    placeholder={t("modal_name_placeholder")}
                    value={name}
                    onKeyDown={handleNameKeyDown}
                    onChange={handleNameChange}
                    className="h-full w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-200">
                    Telefon raqamingiz
                  </label>
                  <span
                    className={`text-[11px] font-mono font-bold transition-colors ${
                      phoneDigits.length === 9
                        ? "text-emerald-400"
                        : phoneDigits.length > 0
                        ? "text-[#D5A45B]"
                        : "text-slate-400"
                    }`}
                  >
                    {t("modal_phone_count", { n: phoneDigits.length })} {phoneDigits.length === 9 ? "✓" : ""}
                  </span>
                </div>
                <div
                  className={`flex h-12 w-full items-center rounded-xl border bg-[#07262B] px-3.5 transition-colors ${
                    phoneError
                      ? "border-red-500/80 focus-within:border-red-400"
                      : "border-[#236B70] focus-within:border-[#D5A45B]"
                  }`}
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#D5A45B] mr-2.5" />
                  <span className="select-none font-bold text-sm text-[#D5A45B] border-r border-[#236B70] pr-2.5 mr-2.5">
                    +998
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    placeholder="90 123 45 67"
                    value={formatUzbekPhone(phoneDigits)}
                    onKeyDown={handlePhoneKeyDown}
                    onChange={handlePhoneChange}
                    className="h-full w-full bg-transparent text-sm font-semibold tracking-wider text-white placeholder-slate-500 outline-none"
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-xs text-red-400 font-medium">
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Country & Degree Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-200">
                    {t("modal_country_label")}
                  </label>
                  <div className="flex h-12 w-full items-center rounded-xl border border-[#236B70] bg-[#07262B] px-3 transition-colors focus-within:border-[#D5A45B]">
                    <Globe2 className="h-4 w-4 shrink-0 text-[#D5A45B] mr-2" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="h-full w-full bg-[#07262B] text-xs text-white outline-none cursor-pointer"
                    >
                      <option value="AQSH">{t("country_usa")}</option>
                      <option value="Kanada">{t("country_canada")}</option>
                      <option value="Buyuk Britaniya">{t("country_uk")}</option>
                      <option value="Italiya">{t("country_italy")}</option>
                      <option value="Germaniya">{t("country_germany")}</option>
                      <option value="Polsha">{t("country_poland")}</option>
                      <option value="Janubiy Koreya">{t("country_south_korea")}</option>
                      <option value="Yaponiya">{t("country_japan")}</option>
                      <option value="Xitoy">{t("country_china")}</option>
                      <option value="Singapur">{t("country_singapore")}</option>
                      <option value="Malayziya">{t("country_malaysia")}</option>
                      <option value="Latviya">{t("country_latvia")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-200">
                    {t("modal_degree_label")}
                  </label>
                  <div className="flex h-12 w-full items-center rounded-xl border border-[#236B70] bg-[#07262B] px-3 transition-colors focus-within:border-[#D5A45B]">
                    <BookOpen className="h-4 w-4 shrink-0 text-[#D5A45B] mr-2" />
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="h-full w-full bg-[#07262B] text-xs text-white outline-none cursor-pointer"
                    >
                      <option value="Bakalavr">{t("degree_bachelor")}</option>
                      <option value="Magistratura">{t("degree_master")}</option>
                      <option value="Til kursi">{t("degree_language_course")}</option>
                      <option value="Foundation">{t("degree_foundation")}</option>
                      <option value="Viza konsultatsiyasi">{t("degree_visa_consultation")}</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-btn mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wider uppercase shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t("modal_submitting")}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{t("modal_send_application")}</span>
                  </>
                )}
              </button>

              <p className="pt-2 text-center text-[11px] text-slate-400">
                {t("modal_privacy")}
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center animate-fade-in-up">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#D9E2DE]" />
            <h4 className="mt-4 text-2xl font-black text-white">
              {t("modal_success_title")}
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              {t("modal_success_msg", { name, phone: formatUzbekPhone(phoneDigits) })}
            </p>
            
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t("modal_sent_to_telegram")}</span>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="https://t.me/Sigma_consulting"
                target="_blank"
                rel="noreferrer"
                className="gold-btn flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider"
              >
                <Send className="h-4 w-4" />
                <span>{t("modal_success_link_telegram")}</span>
              </a>
              <button
                onClick={handleReset}
                className="rounded-xl border border-white/20 bg-white/10 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
              >
                {t("modal_close")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

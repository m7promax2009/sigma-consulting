import { Link } from "react-router-dom";
import {
  Send,
  Phone,
  MapPin,
  Mail,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Clock,
  ExternalLink,
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer({ onOpenModal }) {
  const { t } = useLanguage();
  return (
    <footer className="relative border-t border-[#236B70]/40 bg-[#071F22] text-[#D9E2DE] overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl bg-[#104F5A]/20 blur-[140px] -z-10" />

      {/* ─── 1. TOP PRE-FOOTER CTA CARD ─── */}
      <div className="border-b border-[#236B70]/40 bg-gradient-to-r from-[#0B343B] via-[#0D3F47] to-[#0B343B] py-8 sm:py-12">
        <div className="mx-auto flex max-w-[min(94vw,2800px)] flex-col items-center justify-between gap-6 px-4 text-center sm:px-8 xl:px-12 2xl:px-16 md:flex-row md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#236B70]/50 bg-[#104F5A]/40 px-3 py-0.5 text-xs font-bold text-[#D9E2DE]">
              <Sparkles className="h-3.5 w-3.5 text-[#D9E2DE]" />
              <span>{t("footer_official")}</span>
            </div>
            <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-black text-white">
              {t("footer_title")}
            </h3>
            <p className="text-xs sm:text-sm text-[#D9E2DE]/80 max-w-2xl">
              {t("footer_desc")}
            </p>
          </div>
          <button
            onClick={onOpenModal}
            className="gold-btn whitespace-nowrap rounded-xl px-7 2xl:px-9 py-3.5 2xl:py-4 text-xs 2xl:text-sm font-bold tracking-wider uppercase shadow-[0_4px_25px_rgba(217,226,222,0.2)] transition-all hover:scale-105"
          >
            {t("footer_cta")}
          </button>
        </div>
      </div>

      {/* ─── 2. MAIN FOOTER CONTENT GRID ─── */}
      <div className="mx-auto max-w-[min(94vw,2800px)] px-4 py-12 sm:px-8 xl:px-12 2xl:px-16 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-14">
          
          {/* Column 1: Brand & Credibility */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Sigma Consulting Logo"
                  className="h-8 2xl:h-9 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-white">
                  SIGMA <span className="text-[#D9E2DE]">CONSULTING</span>
                </span>
                <span className="text-[10px] text-[#D9E2DE]/60 uppercase tracking-widest">
                  {t("footer_tagline")}
                </span>
              </div>
            </Link>

            <p className="text-xs 2xl:text-sm leading-relaxed text-[#D9E2DE]/75">
              {t("footer_desc2")}
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com/sigmaconsulting.uz"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#236B70]/60 bg-[#104F5A]/40 text-[#D9E2DE] transition-all hover:border-[#D9E2DE] hover:bg-[#D9E2DE] hover:text-[#071F22] hover:scale-110"
                title="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/Sigma_consulting"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#236B70]/60 bg-[#104F5A]/40 text-[#D9E2DE] transition-all hover:border-[#D9E2DE] hover:bg-[#D9E2DE] hover:text-[#071F22] hover:scale-110"
                title="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="tel:+998974424737"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#236B70]/60 bg-[#104F5A]/40 text-[#D9E2DE] transition-all hover:border-[#D9E2DE] hover:bg-[#D9E2DE] hover:text-[#071F22] hover:scale-110"
                title={t("footer_title_call")}
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg border border-[#236B70]/50 bg-[#0B343B]/60 px-3 py-1.5 text-[11px] text-[#D9E2DE]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D9E2DE]" />
              <span>{t("footer_contract")}</span>
            </div>
          </div>

          {/* Column 2: Sahifalar */}
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#D9E2DE] uppercase">
              <span className="h-2 w-2 rounded-full bg-[#D9E2DE]" />
              <span>{t("footer_pages")}</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs 2xl:text-sm">
              {[
                { to: "/", key: "nav_home" },
                { to: "/tariflar", key: "footer_link_pricing" },
                { to: "/natijalar", key: "footer_link_results" },
                { to: "/jamoa", key: "footer_link_team" },
                { to: "/fikrlar", key: "footer_link_testimonials" },
                { to: "/savol-javoblar", key: "footer_link_faq" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-[#D9E2DE]/80 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-3 w-3 text-[#236B70] transition-transform group-hover:translate-x-1 group-hover:text-white" />
                    <span>{t(item.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Asosiy Yo'nalishlar */}
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#D9E2DE] uppercase">
              <span className="h-2 w-2 rounded-full bg-[#D9E2DE]" />
              <span>{t("footer_countries")}</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs 2xl:text-sm">
              {[
                { country: t("footer_country_usa_canada"), flag: "🇺🇸 🇨🇦", note: t("footer_note_f1_acceptance") },
                { country: t("footer_country_germany_italy"), flag: "🇩🇪 🇮🇹", note: t("footer_note_grant_dsu") },
                { country: t("footer_country_uk"), flag: "🇬🇧", note: t("footer_note_bachelor_master") },
                { country: t("footer_country_china_japan"), flag: "🇨🇳 🇯🇵", note: t("footer_note_csc_mext") },
                { country: t("footer_country_south_korea"), flag: "🇰🇷", note: t("footer_note_d2_d4_visa") },
                { country: t("footer_country_singapore_malaysia"), flag: "🇸🇬 🇲🇾", note: t("footer_note_business_it") },
              ].map((c, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[#236B70]/30 bg-[#0B343B]/40 px-2.5 py-1.5 transition-colors hover:border-[#D9E2DE]/40"
                >
                  <span className="font-medium text-white flex items-center gap-1.5">
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                  <span className="text-[10px] font-semibold text-[#D9E2DE]">
                    {c.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Aloqa va Manzil */}
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#D9E2DE] uppercase">
              <span className="h-2 w-2 rounded-full bg-[#D9E2DE]" />
              <span>{t("footer_contact")}</span>
            </div>
            <div className="mt-4 space-y-3 text-xs 2xl:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#D9E2DE] mt-0.5" />
                <div>
                  <span className="leading-snug block text-[#D9E2DE]/90">
                    {t("footer_address")}
                  </span>
                  <a
                    href="https://yandex.uz/maps/org/22428011414/?ll=69.223888%2C41.275290&z=17"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D9E2DE] underline hover:text-white"
                  >
                    <span>{t("footer_map")}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#D9E2DE]" />
                <span className="text-[#D9E2DE]/80">
                  {t("footer_hours")}
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Phone className="h-4 w-4 shrink-0 text-[#D9E2DE] mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href="tel:+998974424737"
                    className="font-bold text-white hover:text-[#D9E2DE] transition-colors"
                  >
                    +998 97 442 47 37
                  </a>
                  <a
                    href="tel:+998996113337"
                    className="text-[#D9E2DE]/70 hover:text-white transition-colors"
                  >
                    +998 99 611 33 37
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#D9E2DE]" />
                <a
                  href="mailto:sigmaconsutinguz@gmail.com"
                  className="text-[#D9E2DE]/80 hover:text-white transition-colors"
                >
                  sigmaconsutinguz@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ─── 3. BOTTOM COPYRIGHT BAR ─── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#236B70]/40 pt-6 text-[11px] 2xl:text-xs text-[#D9E2DE]/60 sm:flex-row">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-4 text-[#D9E2DE]/70">
            <span className="flex items-center gap-1.5 text-[#D9E2DE]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D9E2DE]" />
              <span>{t("footer_contract")}</span>
            </span>
            <span>•</span>
            <span>{t("footer_privacy")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

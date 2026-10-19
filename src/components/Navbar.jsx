import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Phone, Send, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { InstagramIcon } from "./Icons";
import { useLanguage } from "../contexts/LanguageContext";

const links = [
  { to: "/", key: "nav_home" },
  { to: "/tariflar", key: "nav_pricing" },
  { to: "/natijalar", key: "nav_results" },
  { to: "/jamoa", key: "nav_team" },
  { to: "/fikrlar", key: "nav_testimonials" },
  { to: "/savol-javoblar", key: "nav_faq" },
  { to: "/joylashuv", key: "nav_location" },
];

export default function Navbar({ onOpenModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const { lang, changeLanguage, languages, t } = useLanguage();

  // Close language dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full pointer-events-none">
      <div className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 pointer-events-auto">
        {/* iOS 26 style Floating Ultra-Glass Capsule Header (Enlarged Height & Spacing) */}
        <div className="relative flex items-center justify-between rounded-full border border-white/[0.08] bg-[#071F22]/80 px-4 sm:px-7 py-3 sm:py-3.5 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.1)_inset]">
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center shrink-0 pl-1">
            <div className="flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#071F22] p-0.5 shadow-[0_3px_15px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105">
              <img
                src="/sigma-logo.png"
                alt="Sigma Consulting Logo"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 shrink-0">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative whitespace-nowrap px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-[13px] font-semibold tracking-normal transition-all duration-200 rounded-full ${
                    isActive
                      ? "text-[#D5A45B] font-bold bg-[#D5A45B]/15 shadow-[0_0_12px_rgba(213,164,91,0.2)]"
                      : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                  }`
                }
              >
                {t(link.key)}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Section (Phone, Socials, CTA, Lang Switcher) */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Social Icons (Instagram, Telegram) */}
            <div className="hidden lg:flex items-center gap-1.5 text-white/70">
              <a
                href="https://instagram.com/sigmaconsulting.uz"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-all hover:border-[#D5A45B]/50 hover:bg-[#D5A45B]/10 hover:text-[#D5A45B] hover:scale-105"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/Sigma_consulting"
                target="_blank"
                rel="noreferrer"
                title="Telegram"
                aria-label="Telegram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-all hover:border-[#D5A45B]/50 hover:bg-[#D5A45B]/10 hover:text-[#D5A45B] hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>

            {/* Direct Phone Number - Clear & Visible in #D9E2DE */}
            <a
              href="tel:+998974424737"
              className="flex items-center gap-2 rounded-full border border-transparent px-3 sm:px-3.5 py-2 text-xs sm:text-sm 2xl:text-[15px] font-extrabold text-[#D5A45B] transition-all hover:border-[#D5A45B]/40 hover:bg-[#D5A45B]/10"
            >
              <Phone className="h-4 w-4" />
              <span className="whitespace-nowrap font-black tracking-tight">{t("phone")}</span>
            </a>

            {/* Consultation CTA Button */}
            <button
              onClick={onOpenModal}
              style={{
                backgroundColor: "#D5A45B",
                color: "#071F22",
                boxShadow: "0 4px 20px rgba(213, 164, 91, 0.4)",
              }}
              className="hidden md:flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-2.5 text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-[#071F22]" />
              <span>{t("cta_consultation")}</span>
            </button>

            {/* Mars-style Vertical Dropdown Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className={`flex h-9 w-9 sm:h-9 sm:w-11 items-center justify-center gap-0.5 rounded-full border transition-all ${
                  langMenuOpen
                    ? "border-[#D5A45B] bg-[#D5A45B]/15 text-[#D5A45B] shadow-[0_0_15px_rgba(213,164,91,0.3)]"
                    : "border-white/10 bg-white/[0.04] text-white hover:border-[#D5A45B]/40 hover:bg-white/[0.08]"
                }`}
                title="Tilni tanlash / Выбор языка"
                aria-label="Tilni tanlash"
                aria-expanded={langMenuOpen}
              >
                <span className="text-xs font-black tracking-tight uppercase">
                  {lang === "uz" ? "O'z" : lang === "ru" ? "Ru" : "En"}
                </span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
                    langMenuOpen ? "rotate-180 text-[#D5A45B]" : "text-white/60"
                  }`}
                />
              </button>

              {/* Vertical Dropdown Menu (Opens Below like Mars IT) */}
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.94 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-16 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#071F22]/95 p-1 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.65)] z-50 flex flex-col gap-1 items-center"
                  >
                    {languages.map((lg) => {
                      const isSelected = lang === lg.code;
                      const shortCode = lg.short || (lg.code === "uz" ? "O'z" : lg.code === "ru" ? "Ru" : "En");
                      return (
                        <button
                          key={lg.code}
                          type="button"
                          onClick={() => {
                            changeLanguage(lg.code);
                            setLangMenuOpen(false);
                          }}
                          className={`flex h-8 w-full items-center justify-center rounded-xl text-xs font-black tracking-tight transition-all ${
                            isSelected
                              ? "bg-[#D5A45B] text-[#071F22] shadow-[0_2px_8px_rgba(213,164,91,0.4)]"
                              : "text-white/80 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          {shortCode}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 xl:hidden"
              aria-label={t("menu_label")}
            >
              {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with iOS Frosted Glass */}
        {mobileOpen && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#071F22]/90 p-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#D5A45B]/15 text-[#D5A45B] font-bold"
                        : "text-white/80 hover:bg-white/[0.05] hover:text-white"
                    }`
                  }
                >
                  {t(link.key)}
                </NavLink>
              ))}

              {/* Social links row inside mobile menu */}
              <div className="flex items-center justify-around border-t border-white/[0.08] pt-3 mt-2">
                <a
                  href="https://instagram.com/sigmaconsulting.uz"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-[#D5A45B]"
                >
                  <InstagramIcon className="h-4 w-4 text-[#D5A45B]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://t.me/Sigma_consulting"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-[#D5A45B]"
                >
                  <Send className="h-4 w-4 text-[#D5A45B]" />
                  <span>Telegram</span>
                </a>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal();
                }}
                style={{
                  backgroundColor: "#D5A45B",
                  color: "#071F22",
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-extrabold uppercase tracking-wider shadow-lg transition-transform active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-[#071F22]" />
                <span>{t("cta_consultation_full")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

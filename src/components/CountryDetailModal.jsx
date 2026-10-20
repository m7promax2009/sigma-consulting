import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Building2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
  Coins,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Calendar,
  Award
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function CountryDetailModal({
  country,
  isOpen,
  onClose,
  onApply
}) {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("universities"); // "universities" | "programs" | "costs" | "requirements"
  const [searchQuery, setSearchQuery] = useState("");

  // Reset tab & search when country changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab("universities");
      setSearchQuery("");
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, country]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const countryName = country?.name?.[lang] || country?.name?.uz || "";
  const regionName = country?.region?.[lang] || country?.region?.uz || "";
  const badgeName = country?.badge?.[lang] || country?.badge?.uz || "";
  const grantName = country?.grant?.[lang] || country?.grant?.uz || "";
  const programName = country?.program?.[lang] || country?.program?.uz || "";

  // Filtered universities based on search query
  const filteredUniversities = useMemo(() => {
    if (!country?.universities) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return country.universities;
    return country.universities.filter((uni) => uni.toLowerCase().includes(q));
  }, [country, searchQuery]);

  if (!isOpen || !country) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-[#D5A45B]/40 bg-gradient-to-b from-[#0B343B] via-[#072428] to-[#041517] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ─── MODAL HEADER ─── */}
          <div className="relative px-5 py-4 sm:px-7 sm:py-5 border-b border-[#236B70]/40 bg-[#092B31]/80 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="text-3xl sm:text-4xl shrink-0 filter drop-shadow">
                  {country.flag}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="rounded-full bg-[#D5A45B]/15 border border-[#D5A45B]/30 px-2.5 py-0.5 text-[11px] font-bold text-[#F3C77C]">
                      {regionName}
                    </span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                      {badgeName}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-white truncate tracking-tight">
                    {countryName}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label={t("countries_modal_close_btn")}
                className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Program & Grant banner summary inside header */}
            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-[#236B70]/50 bg-[#071F22]/70 p-2.5 flex items-center gap-2 text-slate-200">
                <GraduationCap className="h-4 w-4 text-[#D5A45B] shrink-0" />
                <span className="truncate">{programName}</span>
              </div>
              <div className="rounded-xl border border-[#D5A45B]/30 bg-[#D5A45B]/10 p-2.5 flex items-center gap-2 text-[#F3C77C] font-semibold">
                <Sparkles className="h-4 w-4 text-[#D5A45B] shrink-0" />
                <span className="truncate">{grantName}</span>
              </div>
            </div>

            {/* ─── TABS NAVIGATION ─── */}
            <div className="mt-4 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-[#236B70]/30 pt-3">
              <button
                type="button"
                onClick={() => setActiveTab("universities")}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "universities"
                    ? "bg-[#D5A45B] text-[#071F22] shadow-[0_2px_12px_rgba(213,164,91,0.35)]"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>{t("countries_modal_unis_tab")}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-black ${
                    activeTab === "universities"
                      ? "bg-[#071F22] text-[#D5A45B]"
                      : "bg-[#236B70]/50 text-white"
                  }`}
                >
                  {country.universities?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("programs")}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "programs"
                    ? "bg-[#D5A45B] text-[#071F22] shadow-[0_2px_12px_rgba(213,164,91,0.35)]"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>{t("countries_modal_programs_tab")}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("costs")}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "costs"
                    ? "bg-[#D5A45B] text-[#071F22] shadow-[0_2px_12px_rgba(213,164,91,0.35)]"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Coins className="h-3.5 w-3.5" />
                <span>{t("countries_modal_costs_tab")}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("requirements")}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                  activeTab === "requirements"
                    ? "bg-[#D5A45B] text-[#071F22] shadow-[0_2px_12px_rgba(213,164,91,0.35)]"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>{t("countries_modal_docs_tab")}</span>
              </button>
            </div>
          </div>

          {/* ─── MODAL BODY CONTENT ─── */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
            {/* TAB 1: UNIVERSITIES */}
            {activeTab === "universities" && (
              <div className="space-y-4">
                {/* Search Bar & Counter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("countries_modal_search_placeholder")}
                      className="w-full rounded-xl border border-[#236B70]/60 bg-[#071F22]/80 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 outline-none focus:border-[#D5A45B] focus:ring-1 focus:ring-[#D5A45B]/40 transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 shrink-0">
                    {t("countries_modal_unis_count", {
                      count: country.universities?.length || 0,
                    })}
                  </div>
                </div>

                {/* Universities Grid */}
                {filteredUniversities.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <Building2 className="mx-auto h-10 w-10 text-slate-600 mb-2" />
                    <p className="text-sm font-medium">
                      {t("countries_modal_no_unis")}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[48vh] overflow-y-auto pr-1">
                    {filteredUniversities.map((uni, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-3 rounded-xl border border-[#236B70]/40 bg-[#092B31]/40 p-3 hover:bg-[#0E3B42]/70 hover:border-[#D5A45B]/50 transition-all"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D5A45B]/15 text-[#D5A45B] text-xs font-black">
                          {idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F3C77C] transition-colors leading-snug">
                            {uni}
                          </p>
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                            <ShieldCheck className="h-3 w-3 text-emerald-400" />
                            <span>Akkreditatsiyadan o'tgan davlat/xalqaro oliygoh</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: STUDY PROGRAMS */}
            {activeTab === "programs" && (
              <div className="space-y-4">
                <div className="text-xs sm:text-sm text-slate-300">
                  {countryName} davlatida quyidagi oliy va o'rta maxsus ta'lim bosqichlari bo'yicha to'liq qabul va viza ko'magi taqdim etiladi:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {country.programs?.map((prog, pIdx) => {
                    const progTitle = prog[lang] || prog.uz || "";
                    return (
                      <div
                        key={pIdx}
                        className="rounded-2xl border border-[#236B70]/50 bg-[#092B31]/60 p-4 space-y-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="rounded-xl bg-[#D5A45B]/15 p-2 text-[#D5A45B]">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <h4 className="text-sm font-bold text-white">
                            {progTitle}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Xalqaro tan olingan diplom, qonuniy talaba vizasi va bitiruvchilarga xalqaro mehnat bozorida ishlash imkoniyati.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-[#D5A45B]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Sigma Consulting orqali 100% kafolatlangan qabul</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: OFFICIAL COSTS & EXPENSES */}
            {activeTab === "costs" && (
              <div className="space-y-4">
                <div className="text-xs sm:text-sm text-slate-300">
                  {countryName} bo'yicha elchixona, viza, sug'urta va talabalar uchun taxminiy oylik yashash xarajatlari ro'yxati:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {country.costs?.map((cost, cIdx) => {
                    const label = cost.label?.[lang] || cost.label?.uz || "";
                    const note = cost.note?.[lang] || cost.note?.uz || "";
                    return (
                      <div
                        key={cIdx}
                        className="rounded-2xl border border-[#236B70]/50 bg-[#092B31]/60 p-4 space-y-1.5"
                      >
                        <div className="text-xs font-bold text-slate-300">
                          {label}
                        </div>
                        <div className="text-lg sm:text-xl font-black text-[#D5A45B]">
                          {cost.value}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-relaxed">
                          {note}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Barcha to'lovlar elchixonalar va davlat organlariga to'g'ridan-to'g'ri to'lanadi. Sigma Consulting sizga har bir to'lov bo'yicha to'liq shaffof chek va ko'rsatmalar beradi.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 4: REQUIRED DOCUMENTS */}
            {activeTab === "requirements" && (
              <div className="space-y-4">
                <div className="text-xs sm:text-sm text-slate-300">
                  {countryName} oliygohlariga hujjat topshirish va talaba vizasini rasmiylashtirish uchun talab etiladigan asosiy hujjatlar ro'yxati:
                </div>
                <div className="space-y-2 max-h-[46vh] overflow-y-auto pr-1">
                  {country.requirements?.map((req, rIdx) => {
                    const reqTitle = req[lang] || req.uz || "";
                    return (
                      <div
                        key={rIdx}
                        className="flex items-start gap-3 rounded-xl border border-[#236B70]/40 bg-[#092B31]/50 p-3"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <div className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                          {reqTitle}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-xl border border-[#236B70]/60 bg-[#071F22]/80 p-3 text-xs text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D5A45B] shrink-0" />
                  <span>
                    Hujjatlaringizni notarial tarjima va apostil qilishda Sigma Consulting mutaxassislari to'liq yordam beradi.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ─── MODAL FOOTER ACTION BAR ─── */}
          <div className="px-5 py-4 sm:px-7 sm:py-4 border-t border-[#236B70]/40 bg-[#092B31]/95 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                {t("countries_modal_close_btn")}
              </button>
              <a
                href="https://t.me/Sigma_consulting"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#236B70]/60 bg-[#071F22] px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-[#0B343B] hover:text-white transition-all"
              >
                <span>Telegram</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#D5A45B]" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onApply({
                  reason: `${countryName} davlatiga universitet va viza arizasi topshirish`,
                });
              }}
              className="gold-btn rounded-xl px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#071F22] shadow-[0_3px_20px_rgba(213,164,91,0.4)] flex items-center gap-2"
            >
              <span>{t("countries_modal_apply_btn")}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

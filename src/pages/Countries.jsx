import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink
} from "lucide-react";
import { FadeUp, SlideIn, TiltCard, Counter } from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";
import { countriesData } from "../data/countriesData";
import CountryDetailModal from "../components/CountryDetailModal";

const categoryTabs = [
  { uz: "Barchasi", ru: "Все", en: "All" },
  { uz: "AQSH & Kanada", ru: "США & Канада", en: "USA & Canada" },
  { uz: "Yevropa", ru: "Европа", en: "Europe" },
  { uz: "Osiyo", ru: "Азия", en: "Asia" },
];

export default function Countries({ onOpenModal }) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = useMemo(() => {
    return countriesData.filter((item) => {
      // Category filter
      const categoryMatch =
        activeCategory === "Barchasi" ||
        item.region[lang] === activeCategory ||
        item.region.uz === activeCategory ||
        (activeCategory === "AQSH & Kanada" &&
          (item.id === "usa" || item.id === "canada" || item.id === "australia")) ||
        (activeCategory === "Yevropa" &&
          [
            "germany",
            "uk",
            "italy",
            "poland",
            "ireland",
            "turkey",
            "france",
            "spain",
            "netherlands",
            "austria",
            "switzerland",
            "czech",
            "hungary",
          ].includes(item.id)) ||
        (activeCategory === "Osiyo" &&
          ["korea", "china", "malaysia", "japan", "singapore", "dubai"].includes(item.id));

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      if (!q) return categoryMatch;

      const nameMatch =
        (item.name[lang] || "").toLowerCase().includes(q) ||
        (item.name.uz || "").toLowerCase().includes(q) ||
        (item.name.ru || "").toLowerCase().includes(q) ||
        (item.name.en || "").toLowerCase().includes(q);

      const uniMatch = item.universities.some((u) => u.toLowerCase().includes(q));

      return categoryMatch && (nameMatch || uniMatch);
    });
  }, [activeCategory, searchQuery, lang]);

  return (
    <div className="relative pb-16 overflow-hidden">
      {/* Background ambient decorative light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#104F5A]/20 blur-[130px]" />
        <div className="absolute top-[650px] right-10 h-[450px] w-[450px] rounded-full bg-[#104F5A]/15 blur-[140px]" />
        <div className="absolute bottom-40 left-10 h-[450px] w-[450px] rounded-full bg-[#104F5A]/15 blur-[140px]" />
      </div>

      <div className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 pt-6 sm:pt-10">
        {/* ─── 1. HERO SECTION ─── */}
        <section className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-4 py-1.5 text-xs font-bold text-[#D5A45B] shadow-inner">
              <Globe2 className="h-4 w-4 text-[#D5A45B]" />
              <span>{t("countries_hero_badge")}</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">
              {t("countries_hero_title")}:{" "}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                {t("countries_hero_title_highlight")}
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base 2xl:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t("countries_hero_desc")}
            </p>
          </FadeUp>

          {/* Quick Stats Highlights */}
          <FadeUp delay={0.25}>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 max-w-2xl mx-auto">
              <div className="rounded-2xl border border-[#236B70]/40 bg-[#0B343B]/60 p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-3xl font-black text-[#D5A45B]">
                  <Counter to={35} suffix="+" duration={1.2} />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">
                  {t("countries_stats_countries")}
                </div>
              </div>
              <div className="rounded-2xl border border-[#236B70]/40 bg-[#0B343B]/60 p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-3xl font-black text-[#D5A45B]">
                  <Counter to={790} suffix="+" duration={1.4} />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">
                  {t("countries_stats_universities")}
                </div>
              </div>
              <div className="rounded-2xl border border-[#236B70]/40 bg-[#0B343B]/60 p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-3xl font-black text-[#D5A45B]">
                  <Counter to={98.4} decimals={1} suffix="%" duration={1.5} />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">
                  {t("countries_stats_visas")}
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ─── 2. SEARCH & FILTER CONTROLS ─── */}
        <section className="mt-10 sm:mt-14 max-w-5xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("countries_search_placeholder")}
                className="w-full rounded-2xl border border-[#236B70]/60 bg-[#0B343B]/60 pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-400 backdrop-blur-md outline-none focus:border-[#D5A45B] focus:ring-1 focus:ring-[#D5A45B]/40 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-white/10 rounded-full h-5 w-5 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Region Category Buttons */}
            <div className="flex w-full md:w-auto items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categoryTabs.map((cat, idx) => {
                const label = cat[lang] || cat.uz;
                const isActive =
                  activeCategory === cat.uz ||
                  activeCategory === label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveCategory(cat.uz)}
                    className={`rounded-xl px-4 py-3 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#D5A45B] text-[#071F22] shadow-[0_2px_15px_rgba(213,164,91,0.4)]"
                        : "border border-[#236B70]/40 bg-[#0B343B]/60 text-slate-200 hover:bg-[#104F5A]/40 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 3. COUNTRIES GRID ─── */}
        <section className="mt-8 sm:mt-12">
          {filteredCountries.length === 0 ? (
            <div className="text-center py-20">
              <Globe2 className="mx-auto h-12 w-12 text-slate-500 mb-3" />
              <p className="text-slate-300 font-bold text-base">
                {t("countries_no_results")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Barchasi");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-4 py-2 text-xs font-bold text-[#D5A45B] hover:bg-[#D5A45B]/20 transition-colors"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCountries.map((item, index) => {
                const countryName = item.name[lang] || item.name.uz;
                const regionName = item.region[lang] || item.region.uz;
                const badgeText = item.badge[lang] || item.badge.uz;
                const programText = item.program[lang] || item.program.uz;
                const grantText = item.grant[lang] || item.grant.uz;
                const remainingUnis = Math.max(0, item.universities.length - 4);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
                    className="h-full"
                  >
                    <div
                      onClick={() => setSelectedCountry(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedCountry(item);
                        }
                      }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#236B70]/50 bg-gradient-to-b from-[#0B343B]/80 to-[#071F22]/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D5A45B]/60 hover:shadow-[0_15px_40px_-10px_rgba(213,164,91,0.25)] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#D5A45B]"
                    >
                      {/* Top Country Photo */}
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={countryName}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B343B] via-[#0B343B]/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md shadow-md">
                            <span className="text-base">{item.flag}</span>
                            <span>{regionName}</span>
                          </span>

                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 backdrop-blur-md">
                            <ShieldCheck className="h-3 w-3 text-emerald-400" />
                            <span>Kafolatlangan Qabul</span>
                          </span>
                        </div>

                        {/* Highlight Badge */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5A45B]/40 bg-[#071F22]/90 px-3 py-1 text-xs font-bold text-[#D5A45B] backdrop-blur-md shadow">
                            <Award className="h-3.5 w-3.5" />
                            <span className="truncate">{badgeText}</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xl font-black text-white group-hover:text-[#F3C77C] transition-colors leading-tight">
                              {countryName}
                            </h3>
                            <span className="text-2xl shrink-0">{item.flag}</span>
                          </div>

                          {/* Visa & Work Program description */}
                          <div className="rounded-xl border border-[#236B70]/40 bg-[#071F22]/60 p-2.5 text-xs text-slate-200 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-[#D5A45B] shrink-0" />
                            <span className="line-clamp-2">{programText}</span>
                          </div>

                          {/* Grant & Scholarship highlight */}
                          <div className="rounded-xl border border-[#D5A45B]/30 bg-[#D5A45B]/10 p-2.5 text-xs font-bold text-[#F3C77C] flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#D5A45B] shrink-0" />
                            <span className="line-clamp-2">{grantText}</span>
                          </div>

                          {/* Top Verified Partner Universities List */}
                          <div className="pt-3 border-t border-[#236B70]/40">
                            <div className="flex items-center justify-between text-xs font-bold text-white/90 mb-2">
                              <span className="flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5 text-[#D5A45B]" />
                                <span>{t("countries_top_universities_label")}</span>
                              </span>
                              <span className="text-[11px] font-black text-[#D5A45B]">
                                {item.universities.length} ta oliygoh
                              </span>
                            </div>
                            <ul className="space-y-1.5">
                              {item.universities.slice(0, 4).map((uni, uIdx) => (
                                <li
                                  key={uIdx}
                                  className="flex items-center gap-2 text-xs text-slate-300"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#D5A45B] shrink-0" />
                                  <span className="font-semibold text-white/90 group-hover:text-white transition-colors truncate">
                                    {uni}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {remainingUnis > 0 && (
                              <div className="mt-2 text-[11px] font-bold text-[#D5A45B]/90 group-hover:text-[#F3C77C] transition-colors">
                                {t("countries_more_unis_badge", { count: remainingUnis })}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Footer Button */}
                        <div className="pt-4 border-t border-[#236B70]/40 flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1.5 font-bold text-[#D5A45B] group-hover:underline">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>{t("countries_view_details_btn")}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-[#D5A45B]/15 px-2.5 py-1 font-bold text-[#F3C77C] group-hover:bg-[#D5A45B] group-hover:text-[#071F22] transition-colors">
                            <span>Batafsil</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ─── 4. BOTTOM ACTION CTA ─── */}
        <section className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-[#236B70]/60 bg-gradient-to-r from-[#0B343B] via-[#0D3F47] to-[#0B343B] p-8 sm:p-12 text-center shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3.5 py-1 text-xs font-bold text-[#D5A45B]">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Qonuniy Shartnoma & Bepul Konsultatsiya</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {t("countries_cta_title")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {t("countries_cta_desc")}
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      reason: "Davlatlar sahifasi: 'Konsultatsiyaga yozilish' tugmasi",
                    })
                  }
                  className="gold-btn rounded-xl px-8 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#071F22] shadow-[0_4px_25px_rgba(213,164,91,0.4)]"
                >
                  {t("countries_cta_btn")}
                </button>
                <a
                  href="https://t.me/Sigma_consulting"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/15 transition-all"
                >
                  <span>Telegramda mutaxassis bilan bog'lanish</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ─── 5. IN-APP COUNTRY DETAIL MODAL ─── */}
      <CountryDetailModal
        country={selectedCountry}
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
        onApply={onOpenModal}
      />
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Award, GraduationCap, CheckCircle2, ArrowRight, Filter, Globe2 } from "lucide-react";
import { FadeUp, SlideIn, TiltCard, Counter, FloatingElement } from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";

const resultsData = [
  {
    id: 1,
    name: "Dilshod Azamov",
    image: "/images/student_visa_approved.jpg",
    country: { uz: "Janubiy Koreya", ru: "Южная Корея" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇰🇷",
    university: "Gyeongsang National University",
    program: { uz: "Magistratura IT", ru: "Магистратура IT" },
    grant: { uz: "100% Scholarship + D-2 Viza", ru: "100% Стипендия + Виза D-2" },
    status: { uz: "Viza Tasdiqlandi", ru: "Виза Подтверждена" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 2,
    name: "Madina Rahimova",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    country: { uz: "Germaniya", ru: "Германия" },
    region: { uz: "Yevropa", ru: "Европа" },
    flag: "🇩🇪",
    university: "Studienkolleg München",
    program: { uz: "Foundation · Tibbiyot", ru: "Фондация · Медицина" },
    grant: { uz: "Davlat Bepul Ta'limi", ru: "Государственное Бесплатное Обучение" },
    status: { uz: "Student Visa Olindi", ru: "Студенческая Виза Получена" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 3,
    name: "Sardorbek Usmonov",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    country: { uz: "AQSH", ru: "США" },
    region: { uz: "AQSH & Kanada", ru: "США & Канада" },
    flag: "🇺🇸",
    university: "Arizona State University",
    program: { uz: "Bakalavr · Computer Science", ru: "Бакалавр · Компьютерные Науки" },
    grant: { uz: "F-1 Viza & $18,000 Stipendiya", ru: "Виза F-1 & $18,000 Стипендия" },
    status: { uz: "Viza Tasdiqlandi", ru: "Виза Подтверждена" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 4,
    name: "Bobur Mirzayev",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    country: { uz: "Xitoy", ru: "Китай" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇨🇳",
    university: "Zhejiang University",
    program: { uz: "Magistratura · Xalqaro Savdo", ru: "Магистратура · Международная Торговля" },
    grant: { uz: "CSC 100% Grant + Yotoqxona", ru: "Грант CSC 100% + Общежитие" },
    status: { uz: "Grant Tasdiqlandi", ru: "Грант Подтвержден" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 5,
    name: "Aziza Toshmatova",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    country: { uz: "Italiya", ru: "Италия" },
    region: { uz: "Yevropa", ru: "Европа" },
    flag: "🇮🇹",
    university: "Politecnico di Milano",
    program: { uz: "Magistratura · Arxitektura", ru: "Магистратура · Архитектура" },
    grant: { uz: "100% DSU Grant + 7,200€ stipendiya", ru: "100% Грант DSU + 7,200€ стипендия" },
    status: { uz: "Viza Tasdiqlandi", ru: "Виза Подтверждена" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 6,
    name: "Jasur Nazarov",
    image: "/images/visa_success_office.jpg",
    country: { uz: "Polsha", ru: "Польша" },
    region: { uz: "Yevropa", ru: "Европа" },
    flag: "🇵🇱",
    university: "Warsaw University of Technology",
    program: { uz: "Bakalavr · Muhandislik", ru: "Бакалавр · Инженерия" },
    grant: { uz: "Yevropa Shengen Vizasi", ru: "Шенгенская Виза Европы" },
    status: { uz: "Viza 14 kunda chiqdi", ru: "Виза Получен за 14 дней" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 7,
    name: "Shahlo Karimova",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    country: { uz: "Kanada", ru: "Канада" },
    region: { uz: "AQSH & Kanada", ru: "США & Канада" },
    flag: "🇨🇦",
    university: "Seneca Polytechnic Toronto",
    program: { uz: "Post-Graduate Diploma · Biznes", ru: "Диплом После Бакалавриата · Бизнес" },
    grant: { uz: "Rasmiy Qabul & Study Permit", ru: "Официальное Зачисление & Study Permit" },
    status: { uz: "Viza Tasdiqlandi", ru: "Виза Подтверждена" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 8,
    name: "Davron Aliyev",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    country: { uz: "Yaponiya", ru: "Япония" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇯🇵",
    university: "Tokyo International Exchange College",
    program: { uz: "Til Maktabi + Bakalavr", ru: "Языковая Школа + Бакалавр" },
    grant: { uz: "MEXT Yo'llanmasi & COE", ru: "Рекомендация MEXT & COE" },
    status: { uz: "Viza Muvaffaqiyatli", ru: "Виза Успешно" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
  {
    id: 9,
    name: "Nilufar Ostonova",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    country: { uz: "Malayziya", ru: "Малайзия" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇲🇾",
    university: "Monash University Malaysia",
    program: { uz: "Bakalavr · Moliya va Bank", ru: "Бакалавр · Финансы и Банк" },
    grant: { uz: "Avstraliya Diplomi Qabuli", ru: "Прием Диплома Австралии" },
    status: { uz: "Qabul Tasdiqlandi", ru: "Зачисление Подтверждено" },
    year: { uz: "2026-yil Qabul", ru: "Набор 2026" },
  },
];

const categories = [
  { uz: "Barchasi", ru: "Все" },
  { uz: "AQSH & Kanada", ru: "США & Канада" },
  { uz: "Yevropa", ru: "Европа" },
  { uz: "Osiyo", ru: "Азия" },
];

export default function Results({ onOpenModal }) {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  const filteredResults =
    selectedCategory === "Barchasi"
      ? resultsData
      : resultsData.filter((r) => r.region.uz === selectedCategory);

  return (
    <div className="relative mx-auto max-w-7xl 2xl:max-w-9xl 3xl:max-w-10xl 4k:max-w-4k px-4 py-8 sm:px-6 2xl:px-12 3xl:px-16 sm:py-12 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute top-10 left-10 h-[350px] w-[350px] rounded-full bg-[#104F5A]/20 blur-[130px] -z-10" />

      {/* Header */}
      <FadeUp className="text-center">
        <div className="inline-block">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3.5 py-1 text-xs 2xl:text-sm font-bold text-[#D5A45B] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#D5A45B]" />
            <span>{t("results_badge")}</span>
          </div>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl 2xl:text-5xl font-black text-white">
          Sigma Consulting{" "}
          <span className="gold-gradient-text drop-shadow-[0_2px_20px_rgba(213,164,91,0.35)]">
            talabalari natijalari
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl 2xl:max-w-3xl text-xs 2xl:text-base text-slate-200 sm:text-sm">
          {t("results_desc")}
        </p>
      </FadeUp>

      {/* Numerical Stats Dashboard */}
      <div className="mt-8 grid grid-cols-2 gap-3.5 lg:grid-cols-4 sm:gap-5 2xl:gap-6">
        <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
            <Counter to={5140} suffix="+" duration={1.8} />
          </div>
          <div className="mt-1 text-xs 2xl:text-sm font-bold text-white">{t("results_stat_successful")}</div>
          <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("results_stat_since")}</div>
        </TiltCard>

        <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
            <Counter prefix="$" to={14.2} decimals={1} suffix="M+" duration={2} />
          </div>
          <div className="mt-1 text-xs 2xl:text-sm font-bold text-white">{t("results_stat_grants")}</div>
          <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("results_stat_effort")}</div>
        </TiltCard>

        <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
            <Counter to={98.4} decimals={1} suffix="%" duration={1.6} />
          </div>
          <div className="mt-1 text-xs 2xl:text-sm font-bold text-white">{t("results_stat_confirmation")}</div>
          <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("results_stat_consular")}</div>
        </TiltCard>

        <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
            <Counter to={180} suffix="+" duration={1.5} />
          </div>
          <div className="mt-1 text-xs 2xl:text-sm font-bold text-white">{t("results_stat_partners")}</div>
          <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("results_stat_contracts")}</div>
        </TiltCard>
      </div>

      {/* Filter Tabs with Animated Pill */}
      <FadeUp yOffset={15} className="mt-10 mb-4 flex flex-wrap items-center justify-center gap-2 2xl:gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.uz;
          return (
            <button
              key={cat.uz}
              onClick={() => setSelectedCategory(cat.uz)}
              className={`relative rounded-xl px-5 2xl:px-7 py-2 2xl:py-2.5 text-xs 2xl:text-sm font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                isSelected
                  ? "text-[#071F22] font-black shadow-[0_0_18px_rgba(213,164,91,0.4)]"
                  : "text-slate-200 hover:text-white border border-[#236B70]/60 bg-[#104F5A]/25 hover:border-[#D5A45B]/60"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D5A45B] to-[#F3C77C] shadow-[0_0_15px_rgba(213,164,91,0.35)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat[lang] || cat.uz}</span>
            </button>
          );
        })}
      </FadeUp>

      {/* Results Grid with 3D TiltCards and 4K Responsive Columns */}
      <motion.div
        layout
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 4k:grid-cols-4 2xl:gap-6"
      >
        <AnimatePresence>
          {filteredResults.map((item) => (
            <TiltCard
              key={item.id}
              maxTilt={2}
              scaleOnHover={1.015}
              className="glass-card group flex flex-col justify-between overflow-hidden p-0 h-full border border-[#236B70]/50 hover:border-[#D5A45B]/60 shadow-xl"
            >
              {/* Student Photo Header */}
              <div className="relative aspect-[16/11] 2xl:aspect-[16/10] w-full overflow-hidden bg-[#07262B]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-[#071F22]/20 to-transparent" />

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-0.5 backdrop-blur-md">
                  <span className="text-sm">{item.flag}</span>
                  <span className="text-[10px] 2xl:text-xs font-bold text-white">{item.country[lang] || item.country.uz}</span>
                </div>

                <div className="absolute top-2.5 right-2.5 rounded-full border border-emerald-400/40 bg-emerald-600 px-2 py-0.5 text-[9px] 2xl:text-xs font-black uppercase tracking-wider text-white shadow-md">
                  {item.status[lang] || item.status.uz}
                </div>

                <div className="absolute bottom-2.5 left-3 right-3">
                  <h3 className="text-base 2xl:text-lg font-black text-white drop-shadow-md group-hover:text-[#D5A45B] transition-colors">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4 2xl:p-5">
                <div>
                  <p className="text-xs 2xl:text-sm font-bold text-[#D5A45B]">{item.university}</p>
                  <p className="mt-0.5 text-xs text-slate-300">{item.program[lang] || item.program.uz}</p>

                  <div className="mt-3 rounded-xl border border-[#D5A45B]/30 bg-[#104F5A]/40 p-2.5 2xl:p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#D5A45B]">
                      {t("results_achievement_label")}
                    </div>
                    <div className="mt-0.5 text-xs 2xl:text-sm font-bold text-white">
                      {item.grant[lang] || item.grant.uz}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#236B70]/40 pt-2.5 text-[11px] text-slate-300">
                  <span>{item.year[lang] || item.year.uz}</span>
                  <span className="font-bold text-[#D5A45B]">{t("results_student_sigma")}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bottom CTA */}
      <FadeUp yOffset={25} className="mt-10 sm:mt-12">
        <div className="glass-card p-6 sm:p-10 2xl:p-12 text-center text-white border border-[#D5A45B]/40 shadow-xl relative overflow-hidden">
          <div className="inline-block">
            <Sparkles className="h-7 w-7 2xl:h-8 2xl:w-8 text-[#D5A45B] mx-auto" />
          </div>
          <h3 className="mt-2 text-xl 2xl:text-2xl font-black text-white sm:text-2xl">
            {t("results_cta_title")}
          </h3>
          <p className="mx-auto mt-2 max-w-xl 2xl:max-w-2xl text-xs 2xl:text-base text-slate-200 sm:text-sm">
            {t("results_cta_desc")}
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenModal}
            className="gold-btn mt-5 inline-flex items-center gap-2 rounded-xl px-7 2xl:px-9 py-3 2xl:py-3.5 text-xs 2xl:text-sm font-bold uppercase tracking-wider shadow-lg"
          >
            <span>{t("results_btn_evaluate")}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </FadeUp>
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Award,
  Globe2,
  FileCheck,
  Send,
  Play,
  ShieldCheck,
  Star,
  Users,
  Compass,
  Check,
  ChevronDown
} from "lucide-react";
import VideoReelsStrip from "../components/VideoReelsStrip";
import InteractiveGlobe from "../components/InteractiveGlobe";
import {
  FadeUp,
  SlideIn,
  TiltCard,
  FloatingElement,
  Counter,
  ScaleIn,
  staggerContainer,
  staggerItem
} from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";

const allDestinations = [
  {
    name: { uz: "Amerika Qo'shma Shtatlari", ru: "Соединенные Штаты Америки" },
    region: { uz: "Amerika & Kanada", ru: "Америка & Канада" },
    flag: "🇺🇸",
    image: "/countries/USA.webp",
    program: { uz: "F-1 Talaba Vizasi", ru: "Студенческая виза F-1" },
    benefit: { uz: "Top-100 Dunyo Universitetlari", ru: "Университеты из Топ-100 мира" },
    tag: { uz: "AQSH", ru: "США" },
  },
  {
    name: { uz: "Kanada", ru: "Канада" },
    region: { uz: "Amerika & Kanada", ru: "Америка & Канада" },
    flag: "🇨🇦",
    image: "/countries/Canada.jpg",
    program: { uz: "Universitet & Kollejlar", ru: "Университеты и колледжи" },
    benefit: {
      uz: "O'qishdan so'ng 3 yillik PGWP ish ruxsati",
      ru: "3-летняя рабочая виза PGWP после обучения",
    },
    tag: { uz: "Kanada", ru: "Канада" },
  },
  {
    name: { uz: "Germaniya", ru: "Германия" },
    region: { uz: "Yevropa", ru: "Европа" },
    flag: "🇩🇪",
    image: "/countries/Germany.jpeg",
    program: { uz: "Davlat Oliygohlari", ru: "Государственные университеты" },
    benefit: { uz: "100% Bepul Ta'lim & Studienkolleg", ru: "100% бесплатное обучение & Studienkolleg" },
    tag: { uz: "Bepul Ta'lim", ru: "Бесплатное обучение" },
  },
  {
    name: { uz: "Buyuk Britaniya", ru: "Великобритания" },
    region: { uz: "Yevropa", ru: "Европа" },
    flag: "🇬🇧",
    image: "/countries/UK.jpeg",
    program: { uz: "Foundation & Bakalavr", ru: "Foundation & Бакалавриат" },
    benefit: { uz: "2 yillik Graduate Visa (ishlash huquqi)", ru: "2-летняя виза для выпускников (право на работу)" },
    tag: { uz: "Elita Ta'lim", ru: "Элитное образование" },
  },
  {
    name: { uz: "Italiya", ru: "Италия" },
    region: { uz: "Yevropa", ru: "Европа" },
    flag: "🇮🇹",
    image: "/countries/Italy.jpg",
    program: { uz: "Davlat Universitetlari", ru: "Государственные университеты" },
    benefit: { uz: "100% Grant + 7,200€ yillik stipendiya", ru: "100% грант + 7,200€ стипендия в год" },
    tag: { uz: "DSU Grant", ru: "Грант DSU" },
  },
  {
    name: { uz: "Polsha", ru: "Польша" },
    region: { uz: "Yevropa", ru: "Европа" },
    flag: "🇵🇱",
    image: "/countries/Poland.webp",
    program: { uz: "Bakalavr & Magistratura", ru: "Бакалавриат & Магистратура" },
    benefit: { uz: "Yevropa Ittifoqi Diplomi & Shengen", ru: "Диплом ЕС & Шенген" },
    tag: { uz: "Tezkor Viza", ru: "Быстрая виза" },
  },
  {
    name: { uz: "Janubiy Koreya", ru: "Южная Корея" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇰🇷",
    image: "/countries/Korea.jpg",
    program: { uz: "D-2 / D-4 Vizalari", ru: "Визы D-2 / D-4" },
    benefit: { uz: "GKS Grantlari & 100% Stipendiya", ru: "Гранты GKS & 100% стипендия" },
    tag: { uz: "Koreya", ru: "Корея" },
  },
  {
    name: { uz: "Xitoy", ru: "Китай" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇨🇳",
    image: "/countries/China.jpg",
    program: { uz: "CSC Hukumat Grantlari", ru: "Государственные гранты CSC" },
    benefit: { uz: "100% Bepul O'qish, Yotoqxona & Stipendiya", ru: "100% бесплатное обучение, общежитие & стипендия" },
    tag: { uz: "CSC Grant", ru: "Грант CSC" },
  },
  {
    name: { uz: "Yaponiya", ru: "Япония" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇯🇵",
    image: "/countries/Japan.jpg",
    program: { uz: "MEXT & Til Maktablari", ru: "MEXT & Языковые школы" },
    benefit: { uz: "Nufuzli Oliygohlar & Qonuniy Ishlash", ru: "Престижные университеты & законная работа" },
    tag: { uz: "Yaponiya", ru: "Япония" },
  },
  {
    name: { uz: "Singapur", ru: "Сингапур" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇸🇬",
    image: "/countries/Singapore.jpg",
    program: { uz: "Biznes & IT Dasturlari", ru: "Бизнес и IT программы" },
    benefit: { uz: "Xalqaro Moliya Markazida Nufuzli Diplom", ru: "Престижный диплом в международном финансовом центре" },
    tag: { uz: "Biznes", ru: "Бизнес" },
  },
  {
    name: { uz: "Malayziya", ru: "Малайзия" },
    region: { uz: "Osiyo", ru: "Азия" },
    flag: "🇲🇾",
    image: "/countries/Malaysia.jpg",
    program: { uz: "Xalqaro Filiallar (UK/AU)", ru: "Международные филиалы (UK/AU)" },
    benefit: { uz: "Monash & Nottingham Kampuslari", ru: "Кампусы Monash & Nottingham" },
    tag: { uz: "Hamyonbop", ru: "Доступный" },
  },
  {
    name: { uz: "Avstraliya", ru: "Австралия" },
    region: { uz: "Okeaniya", ru: "Океания" },
    flag: "🇦🇺",
    image: "/countries/Australia.webp",
    program: { uz: "Subclass 500 Vizasi", ru: "Виза Subclass 500" },
    benefit: { uz: "Yuqori maoshli talabalar amaliyoti", ru: "Высокооплачиваемая стажировка студентов" },
    tag: { uz: "Okeaniya", ru: "Океания" },
  },
];

const destinationRegions = [
  { uz: "Barchasi", ru: "Все" },
  { uz: "Amerika & Kanada", ru: "Америка & Канада" },
  { uz: "Yevropa", ru: "Европа" },
  { uz: "Osiyo", ru: "Азия" },
  { uz: "Okeaniya", ru: "Океания" },
];

const steps = [
  {
    step: "01",
    title: { uz: "Suhbat & Bepul Diagnostika", ru: "Беседа и Бесплатная Диагностика" },
    desc: {
      uz: "Til darajangiz, baholaringiz va oilaviy byudjetingiz tahlil qilinib, sizga eng mos davlatlar va oliygohlar tanlanadi.",
      ru: "Анализируем ваш уровень языка, оценки и семейный бюджет, подбираем подходящие страны и университеты.",
    },
    badge: { uz: "15 daqiqada bepul tahlil", ru: "Бесплатный анализ за 15 минут" },
  },
  {
    step: "02",
    title: { uz: "Universitet & Grant Tanlovi", ru: "Выбор Университета и Гранта" },
    desc: {
      uz: "100% mos xalqaro oliygohlar, mavjud grant dasturlari tasdiqlanadi va rasmiy yuridik shartnoma imzolanadi.",
      ru: "Подтверждаются подходящие зарубежные университеты и программы грантов, подписывается официальный контракт.",
    },
    badge: { uz: "Kafolatlangan qabul", ru: "Гарантированное зачисление" },
  },
  {
    step: "03",
    title: { uz: "Qabul, Viza & Safar", ru: "Зачисление, Виза и Поездка" },
    desc: {
      uz: "Rasmiy qabul xati olinadi, konsullik intervyusi maxsus treningi o'tkaziladi va xorijda kutib olish ta'minlanadi.",
      ru: "Получается официальное письмо о зачислении, проходит специальная подготовка к консульской беседе, организуется встреча за границей.",
    },
    badge: { uz: "98.4% muvaffaqiyat", ru: "98.4% успешность" },
  },
];

export default function Home({ onOpenModal }) {
  const { t, lang } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState("Barchasi");

  const filteredDestinations =
    selectedRegion === "Barchasi"
      ? allDestinations
      : allDestinations.filter((d) => d.region === selectedRegion);

  return (
    <div className="relative pb-16 overflow-hidden">
      {/* Subtle Ambient Background Accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#104F5A]/15 blur-[120px]" />
        <div className="absolute top-[600px] right-5 h-[350px] w-[350px] rounded-full bg-[#104F5A]/15 blur-[120px]" />
        <div className="absolute bottom-40 left-10 h-[400px] w-[400px] rounded-full bg-[#104F5A]/10 blur-[130px]" />
      </div>

      {/* ─── 1. HERO SECTION (HONEST, AUTHENTIC, BALANCED & 4K RESPONSIVE) ─── */}
      <section className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden py-4 sm:py-6 lg:py-8">
        <div className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 2xl:gap-12">
            
            {/* Left 50% Content */}
            <SlideIn direction="left" distance={40} className="lg:col-span-6 space-y-5 2xl:space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3.5 py-1 text-xs 2xl:text-sm font-bold text-[#D5A45B] backdrop-blur-md shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#D5A45B]" />
                  <span>{t("home_hero_badge")}</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl sm:leading-[1.12]">
                {t("home_hero_title_part")}{" "}
                <span className="gold-gradient-text drop-shadow-[0_2px_20px_rgba(213,164,91,0.35)]">
                  {t("home_hero_title_highlight")}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs leading-relaxed text-[#E2ECE8] sm:text-base 2xl:text-lg max-w-xl">
                {t("home_hero_desc")}
              </p>

              {/* Action Button: Imkoniyatingizni bepul sinab ko'ring */}
              <div className="flex flex-col sm:flex-row sm:items-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    onOpenModal({
                      reason: "Bosh sahifa: Asosiy Hero 'Imkoniyatingizni bepul sinab ko'ring' tugmasi",
                    })
                  }
                  className="gold-btn inline-flex items-center justify-center gap-2.5 rounded-full px-8 2xl:px-10 py-3.5 2xl:py-4 text-xs 2xl:text-sm font-black uppercase tracking-wider shadow-[0_4px_25px_rgba(213,164,91,0.4)]"
                >
                  <Sparkles className="h-4 w-4 text-[#071F22]" />
                  <span>Imkoniyatingizni bepul sinab ko'ring</span>
                </motion.button>
              </div>

              {/* Trust Assurances */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                  <CheckCircle2 className="h-4 w-4 text-[#D5A45B] shrink-0" />
                  <span>{t("home_trust_licensed")}</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                  <CheckCircle2 className="h-4 w-4 text-[#D5A45B] shrink-0" />
                  <span>{t("home_trust_contract")}</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                  <CheckCircle2 className="h-4 w-4 text-[#D5A45B] shrink-0" />
                  <span>{t("home_trust_consular_prep")}</span>
                </div>
              </div>
            </SlideIn>

            {/* Right 50% Interactive 3D Earth Globe (iPhone Earth Wallpaper Style) */}
            <SlideIn direction="right" distance={40} className="lg:col-span-6 flex items-center justify-center w-full">
              <InteractiveGlobe />
            </SlideIn>

          </div>
        </div>
      </section>

      {/* ─── REST OF PAGE SECTIONS ─── */}
      <div className="space-y-12 sm:space-y-16 lg:space-y-20 pt-8 sm:pt-12">
        {/* ─── 2. NUMERICAL STATS BAR (ANIMATED JS COUNTERS) ─────────── */}
        <section id="stats-section" className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4 sm:gap-5 2xl:gap-6">
          <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
              <Counter to={8} suffix={t("home_stat_suffix_years")} duration={1.5} />
            </div>
            <div className="mt-1.5 text-xs 2xl:text-sm font-bold text-white">{t("home_stat_consulting")}</div>
            <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("home_stat_since_2018")}</div>
          </TiltCard>

          <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
              <Counter to={5140} suffix="+" duration={1.8} />
            </div>
            <div className="mt-1.5 text-xs 2xl:text-sm font-bold text-white">{t("home_stat_successful_students")}</div>
            <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("home_stat_admitted_visa")}</div>
          </TiltCard>

          <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
              <Counter to={98.4} decimals={1} suffix="%" duration={1.6} />
            </div>
            <div className="mt-1.5 text-xs 2xl:text-sm font-bold text-white">{t("home_stat_confirmation_rate")}</div>
            <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("home_stat_consular_effectiveness")}</div>
          </TiltCard>

          <TiltCard maxTilt={2} className="glass-card p-5 2xl:p-6 text-center border-t-2 border-t-[#D5A45B] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-[#D5A45B]">
              <Counter to={12} suffix={t("home_stat_countries")} duration={1.5} />
            </div>
            <div className="mt-1.5 text-xs 2xl:text-sm font-bold text-white">{t("home_stat_partner_countries")}</div>
            <div className="mt-0.5 text-[11px] 2xl:text-xs text-slate-300">{t("home_stat_regions")}</div>
          </TiltCard>
        </div>
      </section>

      {/* ─── 3. DESTINATIONS (AMERICA, CANADA, EUROPE, ASIA) ─────────── */}
      <section className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <FadeUp className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3 py-1 text-xs 2xl:text-sm font-bold text-[#D5A45B]">
              <Globe2 className="h-3.5 w-3.5 text-[#D5A45B]" />
              <span>{t("home_destinations_badge")}</span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
              {t("home_destinations_title")}
            </h2>
            <p className="mt-1.5 text-xs text-slate-300 sm:text-sm 2xl:text-base max-w-2xl">
              {t("home_destinations_desc")}
            </p>
          </div>
          <Link
            to="/natijalar"
            className="inline-flex items-center gap-1.5 text-xs 2xl:text-sm font-bold text-[#D5A45B] hover:text-[#F3C77C] transition-colors"
          >
            <span>{t("home_destinations_all_results")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>

        {/* Region Filter Buttons */}
        <FadeUp yOffset={15} className="mb-6 flex flex-wrap items-center gap-2 2xl:gap-3">
          {destinationRegions.map((region) => {
            const isSelected = selectedRegion === region.uz;
            return (
              <button
                key={region.uz}
                onClick={() => setSelectedRegion(region.uz)}
                className={`relative rounded-xl px-4 2xl:px-5 py-2 text-xs 2xl:text-sm font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? "text-[#071F22] font-black shadow-[0_0_18px_rgba(213,164,91,0.4)]"
                    : "text-slate-200 hover:text-white border border-[#236B70]/40 bg-[#104F5A]/20 hover:border-[#D5A45B]/60"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="homeRegionIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D5A45B] to-[#F3C77C] shadow-[0_0_15px_rgba(213,164,91,0.35)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{region[lang] || region.uz}</span>
              </button>
            );
          })}
        </FadeUp>

        {/* Countries Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6 2xl:gap-5"
        >
          <AnimatePresence>
            {filteredDestinations.map((c) => (
              <TiltCard
                key={c.name.uz}
                maxTilt={2.5}
                scaleOnHover={1.02}
                onClick={() =>
                  onOpenModal({
                    reason: `Bosh sahifa: ${c.name[lang] || c.name.uz} davlatini tanladi (${c.program[lang] || c.program.uz})`,
                    country: c.name[lang] || c.name.uz,
                  })
                }
                className="glass-card group cursor-pointer flex flex-col justify-between overflow-hidden p-0 h-full border border-[#236B70]/40 hover:border-[#D5A45B]/60 shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B343B]">
                  <img
                    src={c.image}
                    alt={c.name.uz}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-[#071F22]/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 rounded-full border border-[#D5A45B]/30 bg-black/75 px-2.5 py-0.5 text-xs font-bold text-white shadow-md backdrop-blur-md">
                    {c.flag} {c.tag[lang] || c.tag.uz}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4 2xl:p-5">
                  <div>
                    <h3 className="text-sm 2xl:text-base font-bold text-white group-hover:text-[#D5A45B] transition-colors flex items-center justify-between">
                      <span>{c.name[lang] || c.name.uz}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-[#D5A45B]" />
                    </h3>
                    <p className="mt-1 text-xs text-slate-300">{c.program[lang] || c.program.uz}</p>
                  </div>
                  <div className="mt-3 rounded-lg border border-[#D5A45B]/30 bg-[#104F5A]/40 px-2.5 py-1.5 text-[11px] 2xl:text-xs font-semibold text-[#E2ECE8]">
                    {c.benefit[lang] || c.benefit.uz}
                  </div>
                </div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ─── 4. AUTOPLAYING VIDEO REELS STRIP (INSTAGRAM REELS) ──────── */}
      <div className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <FadeUp yOffset={25}>
          <VideoReelsStrip
            title={t("reels_title_default")}
            subtitle={t("reels_subtitle_default")}
          />
        </FadeUp>
      </div>

      {/* ─── 5. QANDAY ISHLAYMIZ (HOW WE WORK) ───────────────────────── */}
      <section className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <FadeUp className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3.5 py-1 text-xs 2xl:text-sm font-bold text-[#D5A45B]">
            <Compass className="h-3.5 w-3.5 text-[#D5A45B]" />
            <span>{t("home_process_badge")}</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
            {t("home_process_title")}
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl 2xl:max-w-2xl text-xs text-slate-300 sm:text-sm 2xl:text-base">
            {t("home_process_desc")}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:gap-6">
          {steps.map((st, i) => (
            <TiltCard
              key={i}
              maxTilt={2.5}
              scaleOnHover={1.02}
              className="glass-card group relative flex flex-col justify-between p-6 2xl:p-8 text-left border-t-2 border-t-[#D5A45B] h-full shadow-lg transition-all duration-300 hover:border-[#D5A45B] hover:shadow-[0_12px_35px_rgba(213,164,91,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl 2xl:text-3xl font-black text-[#D5A45B] transition-transform duration-300 group-hover:scale-110 origin-left">
                    {st.step}
                  </span>
                  <span className="rounded-full bg-[#D5A45B]/15 px-2.5 py-0.5 text-[10px] 2xl:text-xs font-bold text-[#D5A45B] border border-[#D5A45B]/30 group-hover:border-[#D5A45B]">
                    {st.badge[lang] || st.badge.uz}
                  </span>
                </div>
                <h3 className="mt-3 text-base 2xl:text-lg font-bold text-white group-hover:text-[#D5A45B] transition-colors">
                  {st.title[lang] || st.title.uz}
                </h3>
                <p className="mt-2 text-xs 2xl:text-sm leading-relaxed text-slate-200">
                  {st.desc[lang] || st.desc.uz}
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-[#236B70]/40 flex items-center text-xs 2xl:text-sm font-bold text-[#D5A45B]">
                <Check className="h-3.5 w-3.5 mr-1.5 text-[#D5A45B]" />
                <span>{t("home_step_badge_contract")}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ─── 6. LEADERSHIP HIGHLIGHT (MAVLUDA TOLKUNOVA - ASOSCHI & DIREKTOR) ─── */}
      <section className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <FadeUp yOffset={30}>
          <TiltCard
            maxTilt={2}
            scaleOnHover={1.01}
            className="glass-card relative overflow-hidden p-6 sm:p-8 2xl:p-12 text-white border border-[#D5A45B]/40 shadow-2xl"
          >
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 2xl:gap-12">
              
              <SlideIn direction="left" className="lg:col-span-4 text-center lg:text-left">
                <div className="relative mx-auto inline-block">
                  <div className="h-56 w-56 2xl:h-64 2xl:w-64 overflow-hidden rounded-2xl border-2 border-[#D5A45B]/60 shadow-[0_10px_30px_rgba(213,164,91,0.25)] bg-[#0B343B]">
                    <img
                      src="/images/mavluda_tolkunova.jpg"
                      alt="To‘lkunova Mavluda Shomansurovna - Direktor va Asoschi"
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/images/ceo.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-[#D5A45B] to-[#F3C77C] px-3 py-1 text-[10px] 2xl:text-xs font-black uppercase text-[#071F22] shadow-lg">
                    ✓ {t("home_leadership_expert")}
                  </div>
                </div>
                <h3 className="mt-4 text-lg 2xl:text-xl font-black text-white">To‘lkunova Mavluda</h3>
                <p className="text-xs 2xl:text-sm text-[#D5A45B] font-bold">Direktor, Sigma Consulting asoschisi</p>
              </SlideIn>

              <SlideIn direction="right" className="lg:col-span-8">
                <div className="inline-block rounded-md border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-2.5 py-0.5 text-xs font-bold text-[#D5A45B]">
                  {t("home_leadership_team")}
                </div>
                <h2 className="mt-3 text-xl font-black text-white sm:text-2xl 2xl:text-3xl leading-snug">
                  "{t("home_leadership_quote")}"
                </h2>
                <p className="mt-3 text-xs 2xl:text-base leading-relaxed text-slate-200">
                  {t("home_leadership_bio")}
                </p>

                <div className="mt-6 flex flex-wrap gap-6 pt-5 border-t border-[#236B70]/40">
                  <div>
                    <div className="text-xl 2xl:text-2xl font-black text-[#D5A45B]">8+ Yil</div>
                    <div className="text-[11px] 2xl:text-xs text-slate-300">{t("home_leadership_stat_audit")}</div>
                  </div>
                  <div>
                    <div className="text-xl 2xl:text-2xl font-black text-[#D5A45B]">
                      <Counter to={35} suffix=" Davlat" duration={1.6} />
                    </div>
                    <div className="text-[11px] 2xl:text-xs text-slate-300">{t("home_leadership_stat_universities")}</div>
                  </div>
                  <div>
                    <div className="text-xl 2xl:text-2xl font-black text-[#D5A45B]">
                      24 / 7
                    </div>
                    <div className="text-[11px] 2xl:text-xs text-slate-300">{t("home_leadership_stat_curator")}</div>
                  </div>
                </div>
              </SlideIn>

            </div>
          </TiltCard>
        </FadeUp>
      </section>

      {/* ─── 7. BOTTOM CALL TO ACTION BANNER ────────────────────────── */}
      <section className="w-full max-w-[min(94vw,2800px)] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <FadeUp yOffset={25}>
          <TiltCard
            maxTilt={2}
            scaleOnHover={1.01}
            className="glass-card relative overflow-hidden p-6 sm:p-10 2xl:p-12 text-center border border-[#D5A45B]/40 shadow-xl"
          >
            <div className="inline-block">
              <Sparkles className="mx-auto h-7 w-7 2xl:h-8 2xl:w-8 text-[#D5A45B]" />
            </div>
            <h2 className="mt-2 text-xl font-black text-white sm:text-3xl 2xl:text-4xl">
              {t("home_cta_bottom_title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl 2xl:max-w-2xl text-xs text-slate-200 sm:text-sm 2xl:text-base">
              {t("home_cta_bottom_desc")}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  onOpenModal({
                    reason: t("home_reason_bottom_cta"),
                  })
                }
                className="gold-btn inline-flex items-center gap-2 rounded-xl px-7 2xl:px-9 py-3.5 2xl:py-4 text-xs 2xl:text-sm font-bold uppercase tracking-wider shadow-lg"
              >
                <span>{t("home_btn_consultation")}</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://t.me/Sigma_consulting"
                target="_blank"
                rel="noreferrer"
                className="teal-btn inline-flex items-center gap-2 rounded-xl px-6 2xl:px-8 py-3.5 2xl:py-4 text-xs 2xl:text-sm font-bold"
              >
                <Send className="h-4 w-4 text-[#D5A45B]" />
                <span>{t("home_cta_telegram")}</span>
              </motion.a>
            </div>
          </TiltCard>
        </FadeUp>
      </section>
      </div>
    </div>
  );
}
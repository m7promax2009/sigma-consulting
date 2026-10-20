import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
  PhoneCall
} from "lucide-react";
import { FadeUp, SlideIn, TiltCard, Counter } from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";

export const countriesData = [
  {
    id: "usa",
    name: {
      uz: "AQSH (Amerika Qo'shma Shtatlari)",
      ru: "США (Соединенные Штаты Америки)",
      en: "USA (United States of America)",
    },
    region: {
      uz: "AQSH & Kanada",
      ru: "США & Канада",
      en: "USA & Canada",
    },
    flag: "🇺🇸",
    image: "/countries/USA.webp",
    badge: {
      uz: "Top-100 Dunyo Universitetlari",
      ru: "Топ-100 Вузов Мира",
      en: "Top-100 Global Universities",
    },
    program: {
      uz: "F-1 Talaba Vizasi & 3 yillik STEM OPT ishlash huquqi",
      ru: "Студенческая виза F-1 & право на работу STEM OPT до 3 лет",
      en: "F-1 Student Visa & 3-Year STEM OPT Work Authorization",
    },
    grant: {
      uz: "100% gacha grantlar, $15,000 - $30,000 yillik Merit stipendiyalar",
      ru: "Гранты до 100%, годовые стипендии Merit $15,000 - $30,000",
      en: "Up to 100% scholarships, $15,000 - $30,000 annual Merit grants",
    },
    universities: [
      "Arizona State University (ASU)",
      "University of California, Los Angeles (UCLA)",
      "Columbia University (New York)",
      "Northeastern University (Boston)",
      "Florida International University (FIU)",
    ],
    finoUrl: "https://fino.uz/countries/the-united-states-of-america",
  },
  {
    id: "canada",
    name: {
      uz: "Kanada",
      ru: "Канада",
      en: "Canada",
    },
    region: {
      uz: "AQSH & Kanada",
      ru: "США & Канада",
      en: "USA & Canada",
    },
    flag: "🇨🇦",
    image: "/countries/Canada.jpg",
    badge: {
      uz: "3 Yillik PGWP Ish Ruxsati",
      ru: "Право на работу PGWP 3 года",
      en: "3-Year PGWP Work Permit",
    },
    program: {
      uz: "Study Permit & Kollej/Universitet amaliy diplomlari",
      ru: "Study Permit & прикладные дипломы колледжей и вузов",
      en: "Study Permit & Applied University/College Diplomas",
    },
    grant: {
      uz: "Kirish grantlari va akademik yutuq stipendiyalari",
      ru: "Вступительные гранты и академические стипендии",
      en: "Entrance scholarships & Academic excellence awards",
    },
    universities: [
      "University of Toronto",
      "Seneca Polytechnic Toronto",
      "University of British Columbia (UBC)",
      "Centennial College",
      "McGill University",
    ],
    finoUrl: "https://fino.uz/countries/canada",
  },
  {
    id: "germany",
    name: {
      uz: "Germaniya",
      ru: "Германия",
      en: "Germany",
    },
    region: {
      uz: "Yevropa",
      ru: "Европа",
      en: "Europe",
    },
    flag: "🇩🇪",
    image: "/countries/Germany.jpeg",
    badge: {
      uz: "100% Bepul Davlat Ta'limi",
      ru: "100% Бесплатное Гос. Обучение",
      en: "100% Tuition-Free Public Education",
    },
    program: {
      uz: "Davlat Oliy Ta'limi & Studienkolleg (18 oylik Job Seeker Visa)",
      ru: "Гос. университеты и штудиенколлег (виза на поиск работы 18 мес.)",
      en: "Public Universities & Studienkolleg (18-Month Job Seeker Visa)",
    },
    grant: {
      uz: "Mutlaqo bepul ta'lim (kontraktsiz) & DAAD stipendiyalari",
      ru: "Бесплатное обучение без контракта & стипендии DAAD",
      en: "Tuition-free higher education & DAAD research grants",
    },
    universities: [
      "Technical University of Munich (TUM)",
      "Ludwig Maximilian University of Munich (LMU)",
      "Heidelberg University",
      "RWTH Aachen University",
      "Humboldt University of Berlin",
    ],
    finoUrl: "https://fino.uz/countries/germany",
  },
  {
    id: "uk",
    name: {
      uz: "Buyuk Britaniya",
      ru: "Великобритания",
      en: "United Kingdom",
    },
    region: {
      uz: "Yevropa",
      ru: "Европа",
      en: "Europe",
    },
    flag: "🇬🇧",
    image: "/countries/UK.jpeg",
    badge: {
      uz: "2 Yillik Graduate Ishchi Vizasi",
      ru: "2 Года Рабочая Виза Выпускника",
      en: "2-Year Post-Study Graduate Visa",
    },
    program: {
      uz: "Foundation, Bakalavr, Magistratura va CAS akkreditatsiyasi",
      ru: "Foundation, бакалавриат, магистратура & аккредитация CAS",
      en: "Foundation, Bachelor's, Master's & CAS Confirmation",
    },
    grant: {
      uz: "Vice-Chancellor's Excellence va Global Merit grantlari",
      ru: "Гранты Vice-Chancellor's Excellence и Global Merit",
      en: "Vice-Chancellor's Excellence & Global Merit Awards",
    },
    universities: [
      "University of London",
      "University of Manchester",
      "King's College London",
      "Coventry University",
      "University of Birmingham",
    ],
    finoUrl: "https://fino.uz/countries/the-united-kingdom",
  },
  {
    id: "italy",
    name: {
      uz: "Italiya",
      ru: "Италия",
      en: "Italy",
    },
    region: {
      uz: "Yevropa",
      ru: "Европа",
      en: "Europe",
    },
    flag: "🇮🇹",
    image: "/countries/Italy.jpg",
    badge: {
      uz: "100% DSU Granti + 8,500€ Stipendiya",
      ru: "100% Грант DSU + 8,500€ Стипендия",
      en: "100% DSU Grant + 8,500€ Stipend",
    },
    program: {
      uz: "Bakalavr va Magistratura (Ingliz tilida 100% grant bilan)",
      ru: "Бакалавриат и магистратура на английском со 100% грантом",
      en: "English-Taught Bachelor's & Master's with 100% Scholarship",
    },
    grant: {
      uz: "DSU Regional Grant: 100% bepul o'qish, yotoqxona va yillik naqd stipendiya",
      ru: "Региональный грант DSU: бесплатное обучение, общежитие и стипендия",
      en: "DSU Regional Scholarship: Free tuition, accommodation, and cash stipend",
    },
    universities: [
      "Politecnico di Milano",
      "Sapienza University of Rome",
      "University of Bologna",
      "University of Padua",
      "Politecnico di Torino",
    ],
    finoUrl: "https://fino.uz/countries/italy",
  },
  {
    id: "poland",
    name: {
      uz: "Polsha",
      ru: "Польша",
      en: "Poland",
    },
    region: {
      uz: "Yevropa",
      ru: "Европа",
      en: "Europe",
    },
    flag: "🇵🇱",
    image: "/countries/Poland.webp",
    badge: {
      uz: "Tezkor Viza & IELTS-siz Qabul",
      ru: "Быстрая Виза & Прием Без IELTS",
      en: "Fast Visa & No IELTS Required",
    },
    program: {
      uz: "Yevropa Ittifoqi diplomi, Shengen vizasi va ichki imtihon bilan qabul",
      ru: "Диплом ЕС, шенгенская виза и зачисление по внутреннему тесту",
      en: "EU Accredited Degree, Schengen Visa & Internal Test Pathway",
    },
    grant: {
      uz: "Stefan Banach Scholarship va hamyonbop Yevropa kontraktlari",
      ru: "Стипендия Stefan Banach и доступные европейские контракты",
      en: "Stefan Banach Scholarships & Affordable European Tuition",
    },
    universities: [
      "Warsaw University of Technology",
      "University of Warsaw",
      "Jagiellonian University (Krakow)",
      "Kozminski University",
      "Vistula University",
    ],
    finoUrl: "https://fino.uz/countries/poland",
  },
  {
    id: "korea",
    name: {
      uz: "Janubiy Koreya",
      ru: "Южная Корея",
      en: "South Korea",
    },
    region: {
      uz: "Osiyo",
      ru: "Азия",
      en: "Asia",
    },
    flag: "🇰🇷",
    image: "/countries/Korea.jpg",
    badge: {
      uz: "GKS 100% Hukumat Granti",
      ru: "Гос. Грант GKS 100%",
      en: "100% GKS Government Scholarship",
    },
    program: {
      uz: "D-2 Talabalik vizasi, D-4 Til kursi & SKY universitetlari qabuli",
      ru: "Студенческая виза D-2, языковые курсы D-4 & топовые вузы SKY",
      en: "D-2 Degree Visa, D-4 Language Training & SKY Universities",
    },
    grant: {
      uz: "GKS 100% grant + bepul parvoz + TOPIK darajasi uchun 30-100% chegirmalar",
      ru: "Грант GKS 100% + перелет + скидки 30-100% за уровень TOPIK",
      en: "GKS 100% Full Scholarship + Flight + 30-100% TOPIK Tuition Waivers",
    },
    universities: [
      "Seoul National University (SNU)",
      "Korea University",
      "Yonsei University",
      "Gyeongsang National University",
      "KAIST (Korea Advanced Institute of Science & Technology)",
    ],
    finoUrl: "https://fino.uz/countries/south-korea",
  },
  {
    id: "china",
    name: {
      uz: "Xitoy",
      ru: "Китай",
      en: "China",
    },
    region: {
      uz: "Osiyo",
      ru: "Азия",
      en: "Asia",
    },
    flag: "🇨🇳",
    image: "/countries/China.jpg",
    badge: {
      uz: "100% CSC Granti + Bepul Yotoqxona",
      ru: "100% Грант CSC + Общежитие",
      en: "100% CSC Grant + Free Housing",
    },
    program: {
      uz: "CSC Hukumat dasturi, Bakalavr, Magistratura va Xitoy tili kurslari",
      ru: "Государственная программа CSC, бакалавриат, магистратура & языковые курсы",
      en: "CSC State Program, Bachelor's, Master's & Language Courses",
    },
    grant: {
      uz: "To'liq bepul kontrakt, bepul kampus yotoqxonasi va oylik stipendiya",
      ru: "Полное покрытие контракта, бесплатное проживание и ежемесячная стипендия",
      en: "100% Tuition Waiver, Free Campus Housing & Monthly Living Stipend",
    },
    universities: [
      "Zhejiang University",
      "Tsinghua University",
      "Peking University",
      "Shanghai Jiao Tong University",
      "Nanjing University",
    ],
    finoUrl: "https://fino.uz/countries/china",
  },
  {
    id: "malaysia",
    name: {
      uz: "Malayziya",
      ru: "Малайзия",
      en: "Malaysia",
    },
    region: {
      uz: "Osiyo",
      ru: "Азия",
      en: "Asia",
    },
    flag: "🇲🇾",
    image: "/countries/Malaysia.jpg",
    badge: {
      uz: "Buyuk Britaniya & Avstraliya Diplomi",
      ru: "Диплом Великобритании и Австралии",
      en: "Dual UK & Australian Degrees",
    },
    program: {
      uz: "Xalqaro filial oliygohlar, to'liq ingliz tilida ta'lim & transfer imkoniyati",
      ru: "Международные филиалы, обучение на английском & трансфер в UK/AU",
      en: "International Branch Campuses, 100% English & Global Transfer",
    },
    grant: {
      uz: "High Achiever Scholarship va 20-50% kirish chegirmalari",
      ru: "Стипендия High Achiever и скидки при поступлении 20-50%",
      en: "High Achiever Scholarship & 20-50% Merit Tuition Grants",
    },
    universities: [
      "Monash University Malaysia",
      "Universiti Malaya (UM)",
      "Taylor's University",
      "Sunway University",
      "Asia Pacific University (APU)",
    ],
    finoUrl: "https://fino.uz/countries/malaysia",
  },
  {
    id: "japan",
    name: {
      uz: "Yaponiya",
      ru: "Япония",
      en: "Japan",
    },
    region: {
      uz: "Osiyo",
      ru: "Азия",
      en: "Asia",
    },
    flag: "🇯🇵",
    image: "/countries/Japan.jpg",
    badge: {
      uz: "MEXT Hukumat Granti & Qonuniy Ish",
      ru: "Гос. Грант MEXT & Официальная Работа",
      en: "MEXT Government Grant & Work Rights",
    },
    program: {
      uz: "Ryugaku talaba vizasi, intensiv yapon tili maktablari va oliy ta'lim",
      ru: "Студенческая виза Ryugaku, языковые школы & зачисление в вузы",
      en: "Ryugaku Student Visa, Language Academies & University Degrees",
    },
    grant: {
      uz: "MEXT to'liq davlat granti & JASSO oylik yashash stipendiyalari",
      ru: "Полный гос. грант MEXT & ежемесячные стипендии JASSO",
      en: "MEXT Full State Scholarship & JASSO Monthly Living Stipends",
    },
    universities: [
      "Tokyo International Exchange College",
      "University of Tokyo",
      "Kyoto University",
      "Waseda University",
      "Osaka University",
    ],
    finoUrl: "https://fino.uz/countries/",
  },
  {
    id: "singapore",
    name: {
      uz: "Singapur",
      ru: "Сингапур",
      en: "Singapore",
    },
    region: {
      uz: "Osiyo",
      ru: "Азия",
      en: "Asia",
    },
    flag: "🇸🇬",
    image: "/countries/Singapore.jpg",
    badge: {
      uz: "Osiyoning #1 Moliya va IT Markazi",
      ru: "#1 Финансовый и IT Хаб Азии",
      en: "Asia's #1 Finance & Tech Hub",
    },
    program: {
      uz: "Global Biznes, Moliya va IT boshqaruvi (Singapur + UK diplomlari)",
      ru: "Бизнес, финансы и IT менеджмент (дипломы Сингапура и Великобритании)",
      en: "Global Business, Finance & IT Management (Dual Singapore & UK Degrees)",
    },
    grant: {
      uz: "SINGA (Singapore International Graduate Award) va xususiy grantlar",
      ru: "SINGA (Singapore International Graduate Award) & гранты институтов",
      en: "SINGA International Graduate Awards & Institutional Merit Grants",
    },
    universities: [
      "National University of Singapore (NUS)",
      "Nanyang Technological University (NTU)",
      "Management Development Institute of Singapore (MDIST)",
      "Singapore Institute of Management (SIM)",
    ],
    finoUrl: "https://fino.uz/countries/singapore",
  },
  {
    id: "ireland",
    name: {
      uz: "Irlandiya",
      ru: "Ирландия",
      en: "Ireland",
    },
    region: {
      uz: "Yevropa",
      ru: "Европа",
      en: "Europe",
    },
    flag: "🇮🇪",
    image: "/countries/Ireland.jpg",
    badge: {
      uz: "Yevropa Silikon Vodiysi & 2 Yillik Visa",
      ru: "Кремниевая Долина Европы & Виза 2 Года",
      en: "Silicon Valley of Europe & 2-Yr Visa",
    },
    program: {
      uz: "Ingliz tilidagi nufuzli ta'lim & Tech kompaniyalarda ishlash ruxsati",
      ru: "Англоязычное образование & стажировки в мировых tech-гигантах",
      en: "Top English-medium degrees & Tech multinational work rights",
    },
    grant: {
      uz: "Government of Ireland International Education Scholarship",
      ru: "Правительственная стипендия Government of Ireland",
      en: "Government of Ireland International Education Scholarship",
    },
    universities: [
      "Trinity College Dublin",
      "University College Dublin (UCD)",
      "Dublin City University (DCU)",
      "National University of Ireland Galway",
    ],
    finoUrl: "https://fino.uz/countries/ireland",
  },
  {
    id: "australia",
    name: {
      uz: "Avstraliya",
      ru: "Австралия",
      en: "Australia",
    },
    region: {
      uz: "AQSH & Kanada",
      ru: "США & Канада",
      en: "USA & Canada",
    },
    flag: "🇦🇺",
    image: "/countries/Australia.webp",
    badge: {
      uz: "Group of Eight Nufuzli Oliy Ta'limi",
      ru: "Престижные Вузы Group of Eight",
      en: "Prestigious Group of Eight",
    },
    program: {
      uz: "Subclass 500 talaba vizasi va o'qishdan keyin 2-4 yillik ish ruxsati",
      ru: "Студенческая виза Subclass 500 & рабочая виза после учебы 2-4 года",
      en: "Subclass 500 Student Visa & 2-4 Year Post-Study Work Permit",
    },
    grant: {
      uz: "Destination Australia va 25-50% International Merit stipendiyalari",
      ru: "Стипендии Destination Australia и International Merit 25-50%",
      en: "Destination Australia & 25-50% International Merit Scholarships",
    },
    universities: [
      "University of Melbourne",
      "University of Sydney",
      "Monash University Australia",
      "University of New South Wales (UNSW)",
      "Australian National University (ANU)",
    ],
    finoUrl: "https://fino.uz/countries/australia",
  },
  {
    id: "turkey",
    name: {
      uz: "Turkiya",
      ru: "Турция",
      en: "Turkey",
    },
    region: {
      uz: "Yevropa",
      ru: "Европа",
      en: "Europe",
    },
    flag: "🇹🇷",
    image: "/countries/Turkey.jpg",
    badge: {
      uz: "Türkiye Bursları 100% Hukumat Granti",
      ru: "100% Гос. Грант Türkiye Bursları",
      en: "100% Türkiye Bursları State Grant",
    },
    program: {
      uz: "Attestat bilan qabul, Yevropa akkreditatsiyasi & tibbiyot/muhandislik",
      ru: "Прием по аттестату, европейская аккредитация & медицина/инженерия",
      en: "High School Diploma Pathway, EU Accreditation & Medicine/Engineering",
    },
    grant: {
      uz: "Türkiye Bursları: 100% bepul o'qish, bepul yotoqxona va oylik stipendiya",
      ru: "Türkiye Bursları: бесплатное обучение, общежитие и ежемесячная стипендия",
      en: "Türkiye Bursları: Full Tuition Waiver, Free Dormitory & Monthly Stipend",
    },
    universities: [
      "Istanbul University",
      "Middle East Technical University (METU)",
      "Koc University",
      "Sabanci University",
      "Bogazici University",
    ],
    finoUrl: "https://fino.uz/countries/turkey",
  },
];

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

  const filteredCountries = useMemo(() => {
    return countriesData.filter((item) => {
      // Category filter
      const categoryMatch =
        activeCategory === "Barchasi" ||
        item.region[lang] === activeCategory ||
        item.region.uz === activeCategory ||
        (activeCategory === "AQSH & Kanada" && (item.id === "usa" || item.id === "canada" || item.id === "australia")) ||
        (activeCategory === "Yevropa" && ["germany", "uk", "italy", "poland", "ireland", "turkey"].includes(item.id)) ||
        (activeCategory === "Osiyo" && ["korea", "china", "malaysia", "japan", "singapore"].includes(item.id));

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
                  <Counter to={120} suffix="+" duration={1.4} />
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
        <section className="mt-10 sm:mt-14 max-w-5xl mx-auto space-y-5">
          {/* Search bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("countries_search_placeholder")}
              className="w-full rounded-2xl border border-white/10 bg-[#071F22]/90 py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder-slate-400 shadow-xl backdrop-blur-xl focus:border-[#D5A45B] focus:outline-none focus:ring-1 focus:ring-[#D5A45B] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categoryTabs.map((tab) => {
              const tabLabel = tab[lang] || tab.uz;
              const isSelected = activeCategory === tab.uz;
              return (
                <button
                  key={tab.uz}
                  type="button"
                  onClick={() => setActiveCategory(tab.uz)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#D5A45B] text-[#071F22] shadow-[0_4px_16px_rgba(213,164,91,0.35)] scale-105"
                      : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── 3. COUNTRIES GRID ─── */}
        <section className="mt-10 sm:mt-14">
          {filteredCountries.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#071F22]/80 p-12 text-center text-slate-400 max-w-md mx-auto">
              <Globe2 className="mx-auto h-12 w-12 text-slate-500 mb-3" />
              <p className="text-base font-bold text-white">{t("countries_no_results")}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Barchasi");
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#D5A45B] hover:underline"
              >
                Filtrni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCountries.map((item, idx) => {
                const countryTitle = item.name[lang] || item.name.uz;
                const badgeText = item.badge[lang] || item.badge.uz;
                const programText = item.program[lang] || item.program.uz;
                const grantText = item.grant[lang] || item.grant.uz;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.4) }}
                  >
                    {/* Entire card is clickable to https://fino.uz/countries/ */}
                    <a
                      href="https://fino.uz/countries/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col h-full overflow-hidden rounded-3xl border border-[#236B70]/50 bg-[#071F22]/90 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-[#D5A45B] hover:shadow-[0_15px_40px_rgba(213,164,91,0.2)] hover:-translate-y-1.5"
                      title={`${countryTitle} — fino.uz da to'liq ma'lumotni ochish`}
                    >
                      {/* Image Preview Banner */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#041316]">
                        <img
                          src={item.image}
                          alt={countryTitle}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-[#071F22]/30 to-transparent" />

                        {/* Top Flag and Country Code Pill */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-[#071F22]/85 backdrop-blur-md px-3 py-1 text-xs font-black text-white shadow-lg">
                            <span>{item.flag}</span>
                            <span>{countryTitle.split(" ")[0]}</span>
                          </span>
                        </div>

                        {/* Top Right Advantage Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="rounded-full border border-[#D5A45B]/60 bg-[#D5A45B]/90 px-3 py-1 text-[11px] font-black uppercase text-[#071F22] shadow-lg tracking-wider">
                            ★ {badgeText}
                          </span>
                        </div>

                        {/* External redirect indicator icon on top right hover */}
                        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#071F22]/90 border border-[#D5A45B]/40 text-[#D5A45B] shadow-md transition-all duration-300 group-hover:bg-[#D5A45B] group-hover:text-[#071F22] group-hover:scale-110">
                          <ExternalLink className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Country Name */}
                          <div className="flex items-start justify-between gap-2">
                            <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#F3C77C] transition-colors leading-snug">
                              {countryTitle}
                            </h2>
                          </div>

                          {/* Program & Visa info */}
                          <div className="mt-2 text-xs text-slate-300 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-[#D5A45B] shrink-0" />
                            <span>{programText}</span>
                          </div>

                          {/* Grant & Scholarship highlight */}
                          <div className="mt-2 rounded-xl border border-[#D5A45B]/30 bg-[#D5A45B]/10 p-2.5 text-xs font-bold text-[#F3C77C] flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#D5A45B] shrink-0" />
                            <span>{grantText}</span>
                          </div>

                          {/* Top Verified Partner Universities List */}
                          <div className="mt-4 pt-3 border-t border-[#236B70]/40">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-white/90 mb-2">
                              <Building2 className="h-3.5 w-3.5 text-[#D5A45B]" />
                              <span>{t("countries_top_universities_label")}</span>
                            </div>
                            <ul className="space-y-1.5">
                              {item.universities.map((uni, uIdx) => (
                                <li
                                  key={uIdx}
                                  className="flex items-center gap-2 text-xs text-slate-300"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#D5A45B] shrink-0" />
                                  <span className="font-semibold text-white/90 group-hover:text-white transition-colors">
                                    {uni}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Card Footer Button */}
                        <div className="pt-4 border-t border-[#236B70]/40 flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1 font-bold text-[#D5A45B] group-hover:underline">
                            <span>{t("countries_view_details_btn")}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            fino.uz/countries ↗
                          </span>
                        </div>
                      </div>
                    </a>
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
    </div>
  );
}

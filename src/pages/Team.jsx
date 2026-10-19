import { motion } from "framer-motion";
import { Sparkles, Users, Award, ShieldCheck, Mail, Phone, ArrowRight, CheckCircle2, Briefcase, GraduationCap, Globe2 } from "lucide-react";
import { FadeUp, SlideIn, TiltCard, Counter, FloatingElement } from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";

const teamMembers = [
  {
    id: "mavluda-tolkunova",
    name: "To‘lkunova Mavluda Shomansurovna",
    role: {
      uz: "Direktor, Sigma Consulting asoschisi",
      ru: "Директор, Основатель Sigma Consulting",
      en: "Director, Founder of Sigma Consulting",
    },
    badge: {
      uz: "Asoschi & Bosh Direktor",
      ru: "Основатель и Директор",
      en: "Founder & Director",
    },
    image: "/images/mavluda_tolkunova.jpg",
    experience: {
      uz: "8 yillik tajriba",
      ru: "Опыт 8 лет",
      en: "8 years of experience",
    },
    highlight: {
      uz: "35 ga yaqin davlat bilan hamkorlik",
      ru: "Партнёрство с ~35 странами",
      en: "Partnership with ~35 countries",
    },
    bio: {
      uz: [
        "Mavluda To‘lkunova konsalting sohasida 8 yillik tajribaga ega mutaxassis. Toshkentdagi Singapur universitetida biznes va moliya boshqaruvi yo‘nalishi bo‘yicha tahsil olgan. Faoliyati davomida Fino Consulting kompaniyasida direktor lavozimida ishlab, kompaniya boshqaruvi va mijozlar bilan ishlash bo‘yicha boy tajriba orttirgan.",
        "Sigma Consulting kompaniyasining asoschisi sifatida u kompaniyani noldan qurib, rivojlantirib kelmoqda va hozirda unga rahbarlik qiladi. Uning tashabbusi bilan kompaniya 35 ga yaqin davlat bilan hamkorlik aloqalarini yo‘lga qo‘ygan. Mavluda Tulkunova strategik boshqaruv, xalqaro hamkorlikni rivojlantirish va biznes jarayonlarini tashkil etish bo‘yicha yetakchi mutaxassislardan biri hisoblanadi."
      ],
      ru: [
        "Мавлуда Тулкунова — специалист с 8-летним стажем в сфере консалтинга. Окончила Сингапурский университет в Ташкенте по направлению управления бизнесом и финансами. Занимала должность директора в Fino Consulting, накопив солидный опыт руководства и работы с клиентами.",
        "Как основатель Sigma Consulting, создала компанию с нуля и успешно развивает её, являясь действующим руководителем. По её инициативе налажено партнёрство почти с 35 странами мира. Мавлуда Тулкунова — признанный эксперт в области стратегического менеджмента, международных связей и систематизации бизнес-процессов."
      ],
      en: [
        "Mavluda Tolkunova is an expert with 8 years of executive consulting experience. She graduated from MDIST (Singapore University in Tashkent) majoring in Business and Financial Management. Previously served as Director at Fino Consulting.",
        "As the founder of Sigma Consulting, she built and directs the company from the ground up. Through her direct initiative, the company has established international education partnerships with nearly 35 countries. She is a recognized leader in strategic leadership, global admissions, and business excellence."
      ]
    },
    specialties: [
      { uz: "Strategik boshqaruv", ru: "Стратегическое управление", en: "Strategic Leadership" },
      { uz: "Xalqaro hamkorlik (35 ta davlat)", ru: "Международное партнёрство (35 стран)", en: "Global Partnerships (35 countries)" },
      { uz: "Biznes jarayonlarini tashkil etish", ru: "Построение бизнес-процессов", en: "Business Process Architecture" },
    ],
    isFounder: true,
  },
  {
    id: "faxriddin-ergashev",
    name: "Ergashev Faxriddin Mirzohid o‘g‘li",
    role: {
      uz: "Loyiha rahbari",
      ru: "Руководитель проектов",
      en: "Head of Projects",
    },
    badge: {
      uz: "Loyiha Rahbari",
      ru: "Руководитель проектов",
      en: "Head of Projects",
    },
    image: "/images/faxriddin_ergashev.jpg",
    experience: {
      uz: "4 yillik tajriba",
      ru: "Опыт 4 года",
      en: "4 years of experience",
    },
    highlight: {
      uz: "Mars IT School & Modme CRM tajribasi",
      ru: "Опыт Mars IT School & Modme CRM",
      en: "Ex Mars IT School & Modme CRM",
    },
    bio: {
      uz: [
        "Faxriddin Ergashev ta’lim sohasida 4 yillik tajribaga ega mutaxassis. Faoliyatini Modme CRM kompaniyasida sotuv va mijozlarni qo‘llab-quvvatlash bo‘limida boshlagan, bu yerda mijozlar bilan ishlash va xizmat sifatini oshirish bo‘yicha amaliy tajriba orttirgan. Keyinchalik Mars IT School’da filial rahbari va loyiha rahbari lavozimlarida faoliyat yuritib, bir vaqtning o‘zida bir nechta o‘quv filiallarini muvaffaqiyatli boshqargan.",
        "Hozirda Sigma Consulting kompaniyasida loyiha rahbari sifatida loyihalarni rejalashtirish, jamoani tashkillashtirish va natijalarga erishishga mas’ul. Jamoa boshqaruvi, jarayonlarni tashkil etish hamda marketing va ijtimoiy tarmoqlarni faol yuritish uning asosiy kuchli tomonlari hisoblanadi."
      ],
      ru: [
        "Фахриддин Эргашев — специалист с 4-летним опытом в сфере образования. Начинал карьеру в Modme CRM в отделе продаж и поддержки клиентов, накопив сильные практические навыки клиентского сервиса. Позже работал директором филиала и проектным лидером в Mars IT School, одновременно управляя несколькими филиалами.",
        "В настоящее время в Sigma Consulting руководит проектами, организует команду и отвечает за достижение высоких результатов. Его ключевые компетенции — командный менеджмент, выстраивание процессов, а также маркетинг и ведение соцсетей."
      ],
      en: [
        "Fakhriddin Ergashev brings 4 years of solid expertise in education and project leadership. He started his career at Modme CRM in sales and client success. Later, he served as Branch Director and Project Lead at Mars IT School, managing multiple educational campuses simultaneously.",
        "At Sigma Consulting, he currently directs project planning, team operations, and strategic deliverables. His core strengths include team leadership, operational execution, and digital growth marketing."
      ]
    },
    specialties: [
      { uz: "Jamoa boshqaruvi", ru: "Управление командой", en: "Team Leadership" },
      { uz: "Jarayonlarni tashkil etish", ru: "Организация процессов", en: "Process Management" },
      { uz: "Marketing va SMM", ru: "Маркетинг и SMM", en: "Marketing & SMM" },
    ],
    isFounder: false,
  },
];

export default function Team({ onOpenModal }) {
  const { t, lang } = useLanguage();

  return (
    <div className="relative mx-auto max-w-7xl 2xl:max-w-9xl 3xl:max-w-10xl 4k:max-w-4k px-4 py-8 sm:px-6 2xl:px-12 3xl:px-16 sm:py-12 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute top-10 right-10 h-[380px] w-[380px] rounded-full bg-[#104F5A]/25 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-[320px] w-[320px] rounded-full bg-[#236B70]/20 blur-[130px] -z-10" />

      {/* Header */}
      <FadeUp className="text-center">
        <div className="inline-block">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#236B70]/50 bg-[#104F5A]/40 px-3.5 py-1 text-xs 2xl:text-sm font-bold text-[#D9E2DE] shadow-sm">
            <Users className="h-3.5 w-3.5" />
            <span>{t("team_badge")}</span>
          </div>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl 2xl:text-5xl font-black text-white">
          {t("team_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl 2xl:max-w-3xl text-xs 2xl:text-base text-[#D9E2DE]/80 sm:text-sm">
          {t("team_desc")}
        </p>
      </FadeUp>

      {/* Executive Showcase Stack */}
      <div className="mt-10 space-y-8">
        {teamMembers.map((member, index) => {
          const paragraphs = member.bio[lang] || member.bio.uz;
          const isReversed = index % 2 === 1;

          return (
            <SlideIn
              key={member.id}
              direction={isReversed ? "right" : "left"}
              delay={0.1 * (index + 1)}
            >
              <TiltCard
                maxTilt={2}
                scaleOnHover={1.01}
                className="glass-card relative overflow-hidden p-6 sm:p-8 2xl:p-10 border border-[#236B70]/50 shadow-2xl"
              >
                <div className={`grid grid-cols-1 items-start gap-8 lg:grid-cols-12 2xl:gap-12 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  
                  {/* Portrait Column */}
                  <div className={`lg:col-span-4 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative mx-auto aspect-[3/4] max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-2xl border-2 border-[#236B70]/70 shadow-2xl bg-[#0B343B]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                      {/* Top status badge */}
                      <div className="absolute top-3 left-3 rounded-full bg-[#071F22]/85 backdrop-blur-md border border-[#D9E2DE]/30 px-3 py-1 text-[11px] 2xl:text-xs font-bold text-[#D9E2DE] shadow-lg flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{member.badge[lang] || member.badge.uz}</span>
                      </div>
                    </div>
                  </div>

                  {/* Information Column */}
                  <div className={`text-left lg:col-span-8 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    {/* Top Credentials Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#236B70]/60 bg-[#104F5A]/50 px-3 py-1 text-xs 2xl:text-sm font-bold text-[#D9E2DE]">
                        <Briefcase className="h-3.5 w-3.5 text-[#D5A45B]" />
                        <span>{member.experience[lang] || member.experience.uz}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#236B70]/40 bg-[#071F22]/60 px-3 py-1 text-xs 2xl:text-sm font-medium text-[#D9E2DE]/90">
                        <Globe2 className="h-3.5 w-3.5 text-[#D9E2DE]/70" />
                        <span>{member.highlight[lang] || member.highlight.uz}</span>
                      </span>
                    </div>

                    {/* Name & Role */}
                    <h2 className="mt-4 text-2xl 2xl:text-4xl font-black text-white sm:text-3xl tracking-tight">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-sm 2xl:text-base font-bold text-[#D5A45B]">
                      {member.role[lang] || member.role.uz}
                    </p>

                    {/* Bio paragraphs */}
                    <div className="mt-4 space-y-3 text-xs sm:text-sm 2xl:text-base leading-relaxed text-[#D9E2DE]/90">
                      {paragraphs.map((p, pIndex) => (
                        <p key={pIndex}>{p}</p>
                      ))}
                    </div>

                    {/* Specialties / Key Competencies */}
                    <div className="mt-6 border-t border-[#236B70]/40 pt-4">
                      <div className="text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#D9E2DE]/70 mb-2.5">
                        {t("team_main_spec")}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((spec, sIndex) => (
                          <span
                            key={sIndex}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D9E2DE]/25 bg-[#104F5A]/60 px-3 py-1.5 text-xs 2xl:text-sm font-semibold text-[#D9E2DE] shadow-sm hover:border-[#D9E2DE]/50 transition-colors"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#D5A45B]" />
                            <span>{spec[lang] || spec.uz}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </SlideIn>
          );
        })}
      </div>

      {/* Bottom Guarantee Banner */}
      <FadeUp yOffset={25} className="mt-12">
        <div className="glass-card p-6 sm:p-10 2xl:p-12 text-center text-white border border-[#236B70]/50 shadow-xl relative overflow-hidden">
          <div className="inline-block">
            <Sparkles className="h-7 w-7 2xl:h-8 2xl:w-8 text-[#D5A45B] mx-auto" />
          </div>
          <h3 className="mt-2 text-xl 2xl:text-2xl font-bold text-white sm:text-2xl">
            {t("team_guarantee_title")}
          </h3>
          <p className="mx-auto mt-2 max-w-xl 2xl:max-w-2xl text-xs 2xl:text-base text-[#D9E2DE]/80 sm:text-sm">
            {t("team_guarantee_desc")}
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenModal}
            className="gold-btn mt-5 inline-flex items-center gap-2 rounded-xl px-7 2xl:px-9 py-3 2xl:py-3.5 text-xs 2xl:text-sm font-bold uppercase tracking-wider shadow-lg cursor-pointer"
          >
            <span>{t("team_btn_contact")}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </FadeUp>
    </div>
  );
}
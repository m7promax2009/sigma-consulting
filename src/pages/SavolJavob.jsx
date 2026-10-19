import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles, Send, PhoneCall } from "lucide-react";
import { FadeUp, FloatingElement, TiltCard } from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";

const faqData = [
  {
    category: { uz: "Viza va Elchixona", ru: "Виза и Посольство" },
    q: {
      uz: "Til sertifikati (IELTS yoki TOEFL) bo'lmasa ham chet elda o'qisa bo'ladimi?",
      ru: "Можно ли учиться за рубежом без языкового сертификата (IELTS или TOEFL)?",
    },
    a: {
      uz: "Ha, albatta! Italiya, Polsha, Latviya va Janubiy Koreyaning qator oliygohlarida universitetning o'z ichki ingliz tili imtihoni yoki maxsus til tayyorlov (Foundation) kurslari orqali IELTS sertifikatisiz ham to'liq qonuniy qabul qilinish va viza olish imkoniyati mavjud. Mutaxassislarimiz sizga sertifikatsiz qabul qiluvchi davlatlarni tanlab beradi.",
      ru: "Да, конечно! Во многих университетах Италии, Польши, Латвии и Южной Кореи существует возможность официального зачисления и получения визы без сертификата IELTS через внутренний экзамен университета по английскому языку или специальные подготовительные курсы (Foundation). Наши специалисты подберут вам страны, принимающие без сертификата.",
    },
  },
  {
    category: { uz: "Viza va Elchixona", ru: "Виза и Посольство" },
    q: {
      uz: "Viza chiqishiga qanday kafolat berasizlar?",
      ru: "Какую гарантию вы даете на получение визы?",
    },
    a: {
      uz: "Xalqaro qonunchilikka ko'ra, viza berish bo'yicha yakuniy qarorni elchixona konsullik xizmati qabul qiladi. Biz universitetga 100% rasmiy qabul (Offer Letter) olishni kafolatlaymiz hamda elchixona suhbatiga konsullik talablari asosida professional tayyorlaymiz. 2018-yildan buyon talabalarimizning viza tasdiqlanish ko'rsatkichi 98.4% ni tashkil etadi va barcha shartlar yuridik shartnoma bilan kafolatlanadi.",
      ru: "Согласно международному законодательству, окончательное решение о выдаче визы принимает консульская служба посольства. Мы гарантируем получение 100% официального письма о зачислении (Offer Letter) от университета и профессионально готовим к консульской беседе в посольстве. С 2018 года показатель подтверждения виз наших студентов составляет 98.4%, и все условия закрепляются юридическим контрактом.",
    },
  },
  {
    category: { uz: "Xorijdagi Hayot", ru: "Жизнь за Рубежом" },
    q: {
      uz: "Chet elda o'qish bilan bir vaqtda qonuniy ishlash mumkinmi?",
      ru: "Можно ли официально работать во время обучения за рубежом?",
    },
    a: {
      uz: "Ha. Yevropa Ittifoqi davlatlarida (Italiya, Germaniya, Polsha) talabalar rasman haftasiga 20 soat (ta'til vaqtida to'liq 40 soat) ishlash huquqiga ega. Janubiy Koreyada esa o'qish boshlanganidan 6 oy o'tgach qonuniy ishlash ruxsati beriladi. Bu talabalarga o'z xarajatlarini to'liq qoplash imkonini beradi.",
      ru: "Да. В странах ЕС (Италия, Германия, Польша) студенты имеют право официально работать 20 часов в неделю (в каникулы — полный рабочий день 40 часов). В Южной Корее право на официальную работу предоставляется через 6 месяцев после начала обучения. Это позволяет студентам полностью покрывать свои расходы.",
    },
  },
  {
    category: { uz: "Grantlar va To'lovlar", ru: "Гранты и Платежи" },
    q: {
      uz: "Xizmat haqni bo'lib to'lash (qismlab to'lash) imkoniyati bormi?",
      ru: "Есть ли возможность оплаты услуг частями (рассрочка)?",
    },
    a: {
      uz: "Albatta. Biz talabalar va ota-onalarga qulaylik yaratish maqsadida xizmat haqni 2 yoki 3 bosqichga bo'lib to'lash imkoniyatini taqdim etamiz. Dastlabki to'lov shartnoma tuzilganda, qolgan qismi esa universitetdan qabul xati chiqqanda yoki viza olinganda amalga oshiriladi.",
      ru: "Конечно. Для удобства студентов и родителей мы предоставляем возможность оплаты услуг в 2 или 3 этапа. Первоначальный платеж вносится при подписании контракта, остальная часть — при получении письма о зачислении из университета или оформлении визы.",
    },
  },
  {
    category: { uz: "Viza va Elchixona", ru: "Виза и Посольство" },
    q: {
      uz: "Hujjat topshirishdan to viza olguncha qancha vaqt ketadi?",
      ru: "Сколько времени занимает процесс от подачи документов до получения визы?",
    },
    a: {
      uz: "O'rtacha jarayon 1 oydan 3 oygacha vaqt oladi. Bu tanlangan davlat va universitetga bog'liq: masalan, Polsha va Latviyada qabul va viza 3-4 haftada bitishi mumkin, Italiya yoki Germaniyada esa grant tasdiqlanishi bilan birga 2-3 oy davom etishi mumkin.",
      ru: "В среднем процесс занимает от 1 до 3 месяцев. Это зависит от выбранной страны и университета: например, в Польше и Латвии зачисление и виза могут занять 3-4 недели, в Италии или Германии — с получением гранта 2-3 месяца.",
    },
  },
  {
    category: { uz: "Grantlar va To'lovlar", ru: "Гранты и Платежи" },
    q: {
      uz: "Yevropadagi 100% grantlar qanday yutiladi va qancha stipendiya beriladi?",
      ru: "Как выигрываются 100% гранты в Европе и какая стипендия выплачивается?",
    },
    a: {
      uz: "Italiya va Germaniyada xalqaro talabalar uchun oilaviy daromadga asoslangan DSU va mintaqaviy grantlar mavjud. Ushbu grantlar o'qish kontraktini 100% qoplaydi va yiliga 5,000 yevrodan 8,500 yevrogacha to'g'ridan-to'g'ri talabaning bank kartasiga stipendiya qilib o'tkaziladi. Sigma Consulting mutaxassislari bu hujjatlarni tayyorlashda eng yuqori tajribaga ega.",
      ru: "В Италии и Германии для иностранных студентов доступны гранты DSU и региональные гранты на основе семейного дохода. Эти гранты покрывают 100% стоимости обучения, а стипендия в размере от 5000 до 8500 евро в год перечисляется напрямую на банковскую карту студента. Специалисты Sigma Consulting имеют высший опыт подготовки этих документов.",
    },
  },
  {
    category: { uz: "Xorijdagi Hayot", ru: "Жизнь за Рубежом" },
    q: {
      uz: "Chet elga yetib borganimda meni kim kutib oladi?",
      ru: "Кто меня встретит после приезда за границу?",
    },
    a: {
      uz: "'Premium' tarifimiz doirasida xorijdagi vakillarimiz talabani aeroportda kutib oladi, oldindan tayyorlab qo'yilgan kvartira yoki talabalar yotoqxonasiga joylashtiradi, SIM-karta va bank kartasini ochishga yordam beradi va 1 yil davomida barcha muammolarni hal qilishda ko'maklashadi.",
      ru: "В рамках тарифа 'Premium' наши зарубежные агенты встретят студента в аэропорту, поселят в заранее подготовленную квартиру или студенческое общежитие, помогут оформить SIM-карту и банковскую карту, а также окажут помощь в решении всех вопросов в течение 1 года.",
    },
  },
  {
    category: { uz: "Viza va Elchixona", ru: "Виза и Посольство" },
    q: {
      uz: "Elchixona intervyusiga qanday tayyorlaysizlar?",
      ru: "Как вы готовите к консульскому собеседованию в посольстве?",
    },
    a: {
      uz: "Bosh viza koordinatori Alisher Usmonov va uning jamoasi har bir talaba bilan kamida 5-10 marta yakkama-yakka simulyatsiya intervyusi o'tkazadi. Talabaning maqsadi, kelajak rejalari, moliyaviy barqarorligi va viza ofitseri berishi mumkin bo'lgan provokatsion savollarga qat'iy va ishonchli javob berish ko'nikmasi shakllantiriladi.",
      ru: "Главный визовый координатор Алишер Усманов и его команда проводят с каждым студентом не менее 5-10 индивидуальных симуляций собеседования. Формируются навыки четких и уверенных ответов на цели студента, планы будущего, финансовую стабильность и возможные провокационные вопросы со стороны визового офицера.",
    },
  },
];

const categories = [
  { uz: "Barchasi", ru: "Все" },
  { uz: "Viza va Elchixona", ru: "Виза и Посольство" },
  { uz: "Grantlar va To'lovlar", ru: "Гранты и Платежи" },
  { uz: "Xorijdagi Hayot", ru: "Жизнь за Рубежом" },
];

export default function SavolJavob({ onOpenModal }) {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs =
    selectedCategory === "Barchasi"
      ? faqData
      : faqData.filter((f) => f.category.uz === selectedCategory);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="relative mx-auto max-w-[min(94vw,2000px)] px-4 py-8 sm:px-8 xl:px-12 2xl:px-16 sm:py-12 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute top-10 left-1/4 h-[350px] w-[350px] rounded-full bg-[#104F5A]/20 blur-[130px] -z-10" />

      {/* Header */}
      <FadeUp className="text-center">
        <div className="inline-block">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3.5 py-1 text-xs font-bold text-[#D5A45B] shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-[#D5A45B]" />
            <span>{t("faq_badge")}</span>
          </div>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl 2xl:text-5xl font-black text-white">
          Sigma Consulting{" "}
          <span className="gold-gradient-text drop-shadow-[0_2px_20px_rgba(213,164,91,0.35)]">
            ko'p beriladigan savollar
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-200 sm:text-sm">
          {t("faq_desc")}
        </p>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.uz;
            return (
              <button
                key={cat.uz}
                onClick={() => {
                  setSelectedCategory(cat.uz);
                  setOpenIndex(0);
                }}
                className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? "text-[#071F22] font-black shadow-[0_0_18px_rgba(213,164,91,0.4)]"
                    : "text-slate-200 hover:text-white border border-[#236B70]/60 bg-[#104F5A]/25 hover:border-[#D5A45B]/60"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="faqCatIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D5A45B] to-[#F3C77C] shadow-[0_0_15px_rgba(213,164,91,0.35)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat[lang] || cat.uz}</span>
              </button>
            );
          })}
        </div>
      </FadeUp>

      {/* Smooth Accordion List (Hover-to-Open & Click-to-Toggle, Stable Size) */}
      <div className="mt-8 space-y-3.5">
        {filteredFaqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.q.uz}
              onMouseEnter={() => setOpenIndex(idx)}
              onClick={() => toggleAccordion(idx)}
              className={`glass-card cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
                isOpen
                  ? "border-[#D5A45B] bg-[#104F5A]/60 shadow-[0_6px_25px_rgba(213,164,91,0.22)]"
                  : "border-[#236B70]/50 bg-[#0B343B]/40 hover:border-[#D5A45B]/60 hover:bg-[#104F5A]/30"
              }`}
            >
              <div className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white sm:text-base select-none">
                <span className={`pr-4 transition-colors ${isOpen ? "text-[#D5A45B]" : "text-white"}`}>
                  {item.q[lang] || item.q.uz}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                    isOpen
                      ? "border-[#D5A45B] bg-[#D5A45B] text-[#071F22]"
                      : "border-[#236B70]/40 bg-[#071F22] text-[#D5A45B]"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#236B70]/40 px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                      <p>{item.a[lang] || item.a.uz}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <FadeUp yOffset={25} className="mt-10 sm:mt-12">
        <div className="glass-card p-6 sm:p-10 2xl:p-12 text-center text-white border border-[#D5A45B]/40 shadow-xl relative overflow-hidden">
          <div className="inline-block">
            <Sparkles className="mx-auto h-7 w-7 2xl:h-8 2xl:w-8 text-[#D5A45B]" />
          </div>
          <h3 className="mt-2 text-xl 2xl:text-2xl font-black text-white sm:text-2xl">
            {t("faq_cta_title")}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-200 sm:text-sm">
            {t("faq_cta_desc")}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://t.me/Sigma_consulting"
              target="_blank"
              rel="noreferrer"
              className="gold-btn flex items-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              <Send className="h-4 w-4" />
              <span>{t("faq_btn_telegram")}</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenModal}
              className="teal-btn flex items-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider"
            >
              <PhoneCall className="h-4 w-4 text-[#D5A45B]" />
              <span>{t("faq_btn_call")}</span>
            </motion.button>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
import { motion } from "framer-motion";
import { Star, Sparkles, Quote, CheckCircle2, ArrowRight } from "lucide-react";
import { InstagramIcon } from "../components/Icons";
import VideoReelsStrip from "../components/VideoReelsStrip";
import { FadeUp, SlideIn, TiltCard, Counter, FloatingElement } from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";

const textReviews = [
  {
    name: "Rustam Qodirov",
    role: { uz: "Ota-ona (Toshkent)", ru: "Родитель (Ташкент)" },
    country: { uz: "O'g'li Italiyada o'qimoqda 🇮🇹", ru: "Сын учится в Италии 🇮🇹" },
    text: {
      uz: "O'g'limiz Sardorbekni chet elga yuborishda juda ko'p ikkilangandik. Sigma Consulting jamoasi barcha hujjatlarni 100% rasmiy qildi, to'liq grant yutib berdi. Hozir o'g'lim Milan shahrida bepul o'qib, oylik stipendiya ham olyapti. Rahmat sizlarga!",
      ru: "Мы очень переживали, отправляя сына Сардорбека за границу. Команда Sigma Consulting оформила все документы на 100% официально и помогла выиграть полный грант. Теперь наш сын бесплатно учится в Милане и получает ежемесячную стипендию. Спасибо вам!",
    },
    rating: 5,
    date: { uz: "12 Sentabr, 2026", ru: "12 Сентября, 2026" },
  },
  {
    name: "Malika Rahimova",
    role: { uz: "Talaba (Samarqand)", ru: "Студент (Самарканд)" },
    country: { uz: "Polsha, Varshava Universiteti 🇵🇱", ru: "Польша, Варшавский университет 🇵🇱" },
    text: {
      uz: "Menda IELTS yo'q edi, ko'p joylar 'viza chiqavermaydi' deb qaytargandi. Sigma mutaxassislari universitetning ichki imtihonidan o'tkazib, 2 haftada elchixonadan viza olib berishdi. Hozir Varshavadaman, hamma sharoit zo'r!",
      ru: "У меня не было IELTS, многие места отказывали, mówi 'визу не дадим'. Специалисты Sigma подготовили меня к внутреннему экзамену университета, и за 2 недели мы получили визу в посольстве. Теперь я в Варшаве, все условия отличные!",
    },
    rating: 5,
    date: { uz: "28 Avgust, 2026", ru: "28 Августа, 2026" },
  },
  {
    name: "Jasurbek Toirov",
    role: { uz: "Talaba (Namangan)", ru: "Студент (Наманган)" },
    country: { uz: "Janubiy Koreya, Seul 🇰🇷", ru: "Южная Корея, Сеул 🇰🇷" },
    text: {
      uz: "Koreyaga D-2 viza olish oson emas, ayniqsa bank hisob raqami masalasida. Faxriddin aka va viza jamoasi barcha talablarni to'g'ri shakllantirdi. Seulga yetib kelganimda aeroportda kutib olib, yotoqxonaga joylashtirishdi.",
      ru: "Получить студенческую визу D-2 в Корею нелегко, особенно с банковским счетом. Фахриддин и команда по визам правильно оформили все требования. Прибыв в Сеул, нас встретили в аэропорту и поселили в общежитие.",
    },
    rating: 5,
    date: { uz: "15 Iyul, 2026", ru: "15 Июля, 2026" },
  },
  {
    name: "Dilorom Karimova",
    role: { uz: "Ota-ona (Farg'ona)", ru: "Родитель (Фергана)" },
    country: { uz: "Qizi Germaniyada o'qimoqda 🇩🇪", ru: "Дочь учится в Германии 🇩🇪" },
    text: {
      uz: "Sigma Consulting bilan shartnoma tuzganimizdan hech ham afsuslanmadik. Boshidan oxirigacha shaffof, hech qanday qo'shimcha yashirin xarajatlarsiz ishlashdi. Qizim hozir Myunxenda davlat oliygohida mutlaqo bepul tahsil olyapti.",
      ru: "Мы ни на минуту не пожалели о контракте с Sigma Consulting. От начала до конца всё прозрачно, без скрытых платежей. Наша дочь бесплатно учится в государственном университете в Мюнхене.",
    },
    rating: 5,
    date: { uz: "04 May, 2026", ru: "04 Мая, 2026" },
  },
  {
    name: "Farrux Zokirov",
    role: { uz: "Talaba (Buxoro)", ru: "Студент (Бухара)" },
    country: { uz: "Latviya, Riga 🇱🇻", ru: "Латвия, Рига 🇱🇻" },
    text: {
      uz: "Schengen vizasi bilan Yevropaning istalgan davlatiga sayohat qilish imkoniyati bor. Universitetda darslar to'liq ingliz tilida. Sigma jamoasiga professional xizmat uchun minnatdorchilik bildiraman!",
      ru: "С шенгенской визой можно путешествовать по любой стране Европы. Занятия в университете проводятся полностью на английском языке. Выражаю благодарность команде Sigma за профессиональный сервис!",
    },
    rating: 5,
    date: { uz: "21 Aprel, 2026", ru: "21 Апреля, 2026" },
  },
  {
    name: "Shahnoza Alimova",
    role: { uz: "Talaba (Toshkent)", ru: "Студент (Ташкент)" },
    country: { uz: "AQSH, Arizona State University 🇺🇸", ru: "США, Аризонский государственный университет 🇺🇸" },
    text: {
      uz: "AQSH elchixonasidagi intervyu eng katta qo'rquvim edi. Sigma mutaxassisi Alisher aka bilan 10 martadan ortiq intervyu treningi o'tdik. Konsul atigi 2 ta savol berdi va vizamni 1 daqiqada tasdiqladi!",
      ru: "Интервью в посольстве США было моим самым большим страхом. С специалистом Sigma Алишером мы прошли более 10 тренингов по интервью. Консул задал 2 вопроса и одобрил мою визу за 1 минуту!",
    },
    rating: 5,
    date: { uz: "18 Mart, 2026", ru: "18 Марта, 2026" },
  },
];

export default function Testimonials({ onOpenModal }) {
  const { t, lang } = useLanguage();
  return (
    <div className="relative mx-auto max-w-7xl 2xl:max-w-9xl 3xl:max-w-10xl 4k:max-w-4k px-4 py-8 sm:px-6 2xl:px-12 3xl:px-16 sm:py-12 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute top-10 left-1/3 h-[380px] w-[380px] rounded-full bg-[#104F5A]/20 blur-[130px] -z-10" />

      {/* Header */}
      <FadeUp className="text-center">
        <div className="inline-block">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#236B70]/50 bg-[#104F5A]/40 px-3.5 py-1 text-xs font-bold text-[#D9E2DE] shadow-sm">
            <Star className="h-3.5 w-3.5 fill-[#D9E2DE] text-[#D9E2DE]" />
            <span>{t("heading_testimonials_badge")}</span>
          </div>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl 2xl:text-5xl font-black text-white">
          {t("testimonials_hero_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-[#D9E2DE]/80 sm:text-sm">
          {t("testimonials_hero_sub")}
        </p>

        {/* Global Rating Box */}
        <div className="mt-6 inline-block">
          <TiltCard maxTilt={2} className="inline-flex items-center gap-4 rounded-2xl glass-card p-3.5 sm:p-4 text-left border border-[#236B70]/50 shadow-lg">
            <div className="flex text-2xl sm:text-3xl font-black text-[#D5A45B]">5.0</div>
            <div className="h-8 w-px bg-[#236B70]/40" />
            <div>
              <div className="flex text-[#D5A45B]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
                <div className="text-[11px] font-medium text-[#D9E2DE]/80">
                  {t("testimonials_stats_label")}
                </div>
            </div>
          </TiltCard>
        </div>
      </FadeUp>

      {/* ─── 1. AUTOPLAYING VIDEO REELS GALLERY ───────────────────── */}
      <FadeUp yOffset={25} className="mt-8 sm:mt-10">
        <VideoReelsStrip
          title={t("video_reels_title_testimonials")}
          subtitle={t("video_reels_subtitle_testimonials")}
        />
      </FadeUp>

      {/* ─── 2. TEXT REVIEWS GRID ──────────────────────────────────── */}
      <div className="mt-10 sm:mt-12">
        <FadeUp className="mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t("heading_testimonials")}
          </h2>
          <p className="mt-1 text-xs text-[#D9E2DE]/70">
            {t("heading_testimonials_sub")}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {textReviews.map((r, i) => (
            <TiltCard
              key={i}
              maxTilt={2}
              scaleOnHover={1.015}
              className="glass-card flex flex-col justify-between p-5 sm:p-6 text-left border border-[#236B70]/40 h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D5A45B]">
                    {"★".repeat(r.rating).split("").map((s, idx) => (
                      <span key={idx} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-[#D9E2DE]/50">{r.date[lang] || r.date.uz}</span>
                </div>

                <p className="mt-4 text-xs italic leading-relaxed text-[#D9E2DE]/90">
                  "{r.text[lang] || r.text.uz}"
                </p>
              </div>

              <div className="mt-6 border-t border-[#236B70]/30 pt-4">
                <div className="font-bold text-white text-sm">{r.name}</div>
                <div className="text-[11px] text-[#D9E2DE]/70">{r.role[lang] || r.role.uz}</div>
                <div className="mt-1 text-[11px] font-bold text-[#D5A45B]">
                  {r.country[lang] || r.country.uz}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Instagram Official Banner */}
      <FadeUp yOffset={25} className="mt-10 sm:mt-12">
        <div className="glass-card p-6 sm:p-10 text-center text-white border border-[#236B70]/50 shadow-xl relative overflow-hidden">
          <div className="inline-block">
            <InstagramIcon className="mx-auto h-9 w-9 2xl:h-10 2xl:w-10 text-[#D5A45B]" />
          </div>
          <h3 className="mt-2 text-xl 2xl:text-2xl font-bold text-white sm:text-2xl">
            {t("heading_instagram")}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs text-[#D9E2DE]/80 sm:text-sm">
            {t("heading_instagram_sub")}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://instagram.com/sigmaconsulting.uz"
              target="_blank"
              rel="noreferrer"
              className="gold-btn flex items-center gap-2 rounded-xl px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>{t("btn_instagram")}</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenModal}
              className="teal-btn rounded-xl px-6 py-3 text-xs font-semibold"
            >
              {t("btn_grant_help")}
            </motion.button>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Building2,
  ExternalLink,
  Send,
  GraduationCap,
  Globe,
  Award,
  Users,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const stats = [
  { icon: Users, value: "5 000+", label: "Viza olgan talabalar" },
  { icon: Globe, value: "35+", label: "Davlat bo'yicha" },
  { icon: Award, value: "8 yil", label: "Tajriba" },
];

const features = [
  { emoji: "🎓", text: "Chet elda ta'lim — Grant + TOP universitetlar (QS/THE)" },
  { emoji: "🏆", text: "Viza & hujjatlar bo'yicha to'liq yordam" },
  { emoji: "💵", text: "Bepul konsultatsiya va moliyaviy reja" },
];

const infoCards = [
  {
    icon: Building2,
    label: "Bino va qavat",
    value: "76 NEUS Biznes Markazi — 4-qavat",
    color: "#D9E2DE",
  },
  {
    icon: MapPin,
    label: "Ko'cha manzili",
    value: "Arnasoy 2-daha ko'chasi, Chilonzor tumani",
    color: "#38bdf8",
  },
  {
    icon: Clock,
    label: "Ish vaqti",
    value: "Dushanba — Shanba: 09:00 — 18:00",
    color: "#4ade80",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+998 97 442 47 37",
    color: "#a78bfa",
  },
];

export default function Joylashuv({ onOpenModal }) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#071F22] pb-20 pt-10 md:pt-14">
      {/* Background subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(217, 226, 222,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9E2DE]/30 bg-[#D9E2DE]/10 px-3.5 py-1 text-xs font-bold text-[#D9E2DE]">
            <MapPin className="h-3.5 w-3.5" />
            Bizning manzil
          </span>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Joylashuv
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#D9E2DE]/70">
            SIGMA CONSULTING ofisi Toshkent shahrida qulay joyda joylashgan
          </p>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-8 grid grid-cols-3 gap-3"
        >
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
              className="flex flex-col items-center rounded-2xl border border-[#236B70]/40 bg-[#0B343B]/60 py-4 px-2 text-center"
            >
              <Icon className="mb-1.5 h-5 w-5 text-[#D9E2DE]" />
              <span className="text-xl font-black text-white sm:text-2xl">{value}</span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#D9E2DE]/55 sm:text-xs">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Company intro card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mb-8 rounded-2xl border border-[#D9E2DE]/25 bg-[#D9E2DE]/5 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-[#D9E2DE]" />
            <span className="text-base font-black text-white">Chet elda ta'lim</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {features.map(({ emoji, text }) => (
              <div key={text} className="flex items-start gap-2.5 text-sm text-[#D9E2DE]/85">
                <span className="text-base leading-none mt-0.5">{emoji}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Info Cards Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {infoCards.map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 + i * 0.07 }}
              className="flex items-start gap-4 rounded-2xl border border-[#236B70]/40 bg-[#0B343B]/60 p-5 backdrop-blur-sm"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D9E2DE]/50">
                  {label}
                </p>
                <p className="mt-0.5 text-sm font-bold text-white sm:text-base">{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Contact quick links ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-8 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="tel:+998974424737"
            className="flex flex-1 items-center gap-3 rounded-2xl border border-[#a78bfa]/30 bg-[#a78bfa]/8 px-5 py-4 text-white transition-all hover:border-[#a78bfa]/60 hover:bg-[#a78bfa]/15"
          >
            <Phone className="h-5 w-5 text-[#a78bfa] shrink-0" />
            <div>
              <p className="text-xs text-[#D9E2DE]/50 font-semibold uppercase tracking-wide">Qo'ng'iroq</p>
              <p className="text-sm font-bold">+998 97 442 47 37</p>
            </div>
          </a>
          <a
            href="https://t.me/Sigma_director"
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center gap-3 rounded-2xl border border-[#38bdf8]/30 bg-[#38bdf8]/8 px-5 py-4 text-white transition-all hover:border-[#38bdf8]/60 hover:bg-[#38bdf8]/15"
          >
            <Send className="h-5 w-5 text-[#38bdf8] shrink-0" />
            <div>
              <p className="text-xs text-[#D9E2DE]/50 font-semibold uppercase tracking-wide">Telegram</p>
              <p className="text-sm font-bold">@Sigma_director</p>
            </div>
          </a>
        </motion.div>

        {/* ── Map Embed ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-[#236B70]/50 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
        >
          <iframe
            title="Sigma Consulting joylashuvi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.664374063729!2d69.22042399999999!3d41.2753916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bc9ef78fe75%3A0x9aaccf8d92f889b4!2z0KHQmNCT0JzQkCDQodCe0J3QodCQ0JvQotCY0J3QlyDQptCV0J3QotCg!5e0!3m2!1suz!2suz!4v1700000000000!5m2!1suz!2suz"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://maps.app.goo.gl/ZkFJnV96RMuJBMWZA"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#D9E2DE]/40 bg-[#D9E2DE]/10 px-6 py-3.5 text-sm font-bold text-[#D9E2DE] transition-all hover:bg-[#D9E2DE]/20"
          >
            <Navigation className="h-4 w-4" />
            Google Xaritada ko'rish
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenModal}
            className="gold-btn flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold uppercase tracking-wide shadow-[0_6px_25px_rgba(217, 226, 222,0.4)]"
          >
            <Phone className="h-4 w-4 text-[#071F22]" />
            <span className="text-[#071F22]">Bepul Konsultatsiya</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ShieldCheck, ArrowRight, HelpCircle, Zap } from "lucide-react";
import { FadeUp, SlideIn, TiltCard, ScaleIn, FloatingElement } from "../components/Motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function Pricing({ onOpenModal }) {
  const { t } = useLanguage();

  const basePlans = [
  {
    id: "start",
    name: t("pricing_start"),
    badge: t("pricing_badge_start"),
    fullPrice: "10,000,000",
    monthlyPrice: "3,350,000",
    unit: t("pricing_unit"),
    popular: false,
    desc: t("pricing_desc_start"),
    features: [
      t("pricing_feature_start_1"),
      t("pricing_feature_start_2"),
      t("pricing_feature_start_3"),
      t("pricing_feature_start_4"),
      t("pricing_feature_start_5"),
      t("pricing_feature_start_6"),
      t("pricing_feature_start_7"),
    ],
    notIncluded: [
      t("pricing_not_included_start_1"),
      t("pricing_not_included_start_2"),
      t("pricing_not_included_start_3"),
    ],
  },
  {
    id: "standard",
    name: t("pricing_standard"),
    badge: t("pricing_badge_standard"),
    fullPrice: "15,000,000",
    monthlyPrice: "5,000,000",
    unit: t("pricing_unit"),
    popular: true,
    desc: t("pricing_desc_standard"),
    features: [
      t("pricing_feature_standard_1"),
      t("pricing_feature_standard_2"),
      t("pricing_feature_standard_3"),
      t("pricing_feature_standard_4"),
      t("pricing_feature_standard_5"),
      t("pricing_feature_standard_6"),
      t("pricing_feature_standard_7"),
    ],
    notIncluded: [
      t("pricing_not_included_standard_1"),
      t("pricing_not_included_standard_2"),
    ],
  },
  {
    id: "premium",
    name: t("pricing_premium"),
    badge: t("pricing_badge_premium"),
    fullPrice: "20,000,000",
    monthlyPrice: "6,670,000",
    unit: t("pricing_unit"),
    popular: false,
    desc: t("pricing_desc_premium"),
    features: [
      t("pricing_feature_premium_1"),
      t("pricing_feature_premium_2"),
      t("pricing_feature_premium_3"),
      t("pricing_feature_premium_4"),
      t("pricing_feature_premium_5"),
      t("pricing_feature_premium_6"),
      t("pricing_feature_premium_7"),
      t("pricing_feature_premium_8"),
    ],
    notIncluded: [],
  },
];
  const [billingCycle, setBillingCycle] = useState("full"); // "full" or "installment"

  return (
    <div className="relative mx-auto max-w-7xl 2xl:max-w-9xl 3xl:max-w-10xl 4k:max-w-4k px-4 py-8 sm:px-6 2xl:px-12 3xl:px-16 sm:py-12 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[380px] w-[380px] rounded-full bg-[#104F5A]/15 blur-[120px] -z-10" />

      {/* Header */}
      <FadeUp className="text-center mb-8 sm:mb-10">
        <div className="inline-block">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#236B70]/50 bg-[#104F5A]/40 px-3.5 py-1 text-xs font-bold text-[#D9E2DE] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#D9E2DE]" />
            <span>{t("pricing_header_badge")}</span>
          </div>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl 2xl:text-5xl font-black text-white">
          {t("pricing_header_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-[#D9E2DE]/80 sm:text-sm">
          {t("pricing_header_desc")}
        </p>

        {/* Interactive Payment Switcher */}
        <div className="mt-6 inline-flex items-center rounded-2xl border border-[#236B70]/50 bg-[#0B343B]/80 p-1.5 shadow-xl backdrop-blur-md">
          <button
            onClick={() => setBillingCycle("full")}
            className={`relative rounded-xl px-5 py-2 text-xs font-bold transition-all duration-300 ${
              billingCycle === "full"
                ? "bg-[#D9E2DE] text-[#071F22] shadow-md"
                : "text-[#D9E2DE]/80 hover:text-white"
            }`}
          >
            {t("pricing_full_payment")}
          </button>
          <button
            onClick={() => setBillingCycle("installment")}
            className={`relative flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold transition-all duration-300 ${
              billingCycle === "installment"
                ? "bg-[#D9E2DE] text-[#071F22] shadow-md"
                : "text-[#D9E2DE]/80 hover:text-white"
            }`}
          >
            <span>{t("pricing_installment")}</span>
            <span className="rounded-full bg-emerald-500/90 px-1.5 py-0.5 text-[9px] font-black uppercase text-white">
              {t("pricing_zero_percent")}
            </span>
          </button>
        </div>

        {/* Payment Guarantee Notice */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#D9E2DE]/70">
          <ShieldCheck className="h-4 w-4 text-[#D9E2DE]" />
          <span>{t("pricing_contract_notice")}</span>
        </div>
      </FadeUp>

      {/* Pricing Cards Grid (Maximally Uniform & Balanced) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
        {basePlans.map((p) => {
          const displayPrice = billingCycle === "full" ? p.fullPrice : p.monthlyPrice;
          const displaySubtitle =
            billingCycle === "full"
              ? t("pricing_full_price_label")
              : t("pricing_installment_label");

          return (
            <TiltCard
              key={p.id}
              maxTilt={2}
              scaleOnHover={1.015}
              className="glass-card group flex flex-col justify-between p-6 sm:p-7 2xl:p-8 h-full rounded-3xl border border-[#236B70]/50 hover:border-[#D9E2DE]/70 hover:shadow-[0_12px_40px_rgba(217,226,222,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Uniform Header Badge for ALL cards */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#236B70]/60 bg-[#104F5A]/40 px-3 py-1 text-[11px] font-bold tracking-wider text-[#D9E2DE] uppercase">
                    <Sparkles className="h-3 w-3 text-[#D9E2DE]" />
                    <span>{p.badge}</span>
                  </span>
                  <span className="text-xl font-black text-white group-hover:text-[#D9E2DE] transition-colors">
                    {p.name}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-[#D9E2DE]/80 min-h-[44px]">
                  {p.desc}
                </p>

                {/* Animated Price Section */}
                <div className="mt-5 border-b border-[#236B70]/40 pb-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={displayPrice}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline gap-1.5"
                    >
                      <span className="text-3xl font-black text-white sm:text-4xl">
                        {displayPrice}
                      </span>
                      <span className="text-xs font-bold text-[#D9E2DE]">
                        {p.unit} {billingCycle === "installment" && t("pricing_per_month")}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <span className="text-[11px] text-[#D9E2DE]/60 mt-1 block">
                    {displaySubtitle}
                  </span>
                </div>

                {/* Included Features */}
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D9E2DE]">
                    {t("pricing_included_features")}
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {p.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 rounded-lg px-2 py-1 -mx-2 transition-colors hover:bg-[#104F5A]/40"
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D9E2DE]/20 text-[#D9E2DE]">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="text-[#D9E2DE]/90">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Not Included */}
                  {p.notIncluded.length > 0 && (
                    <div className="pt-3 border-t border-dashed border-[#236B70]/40">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D9E2DE]/50">
                        {t("pricing_not_included")}
                      </p>
                      <ul className="mt-1.5 space-y-1 text-xs">
                        {p.notIncluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 line-through text-[#D9E2DE]/40 px-2 -mx-2">
                            <span>—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-5 border-t border-[#236B70]/30">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onOpenModal({
                      reason: `Xizmat tarifi: ${t("pricing_" + p.id)} (${billingCycle === "full" ? p.fullPrice : p.monthlyPrice + " " + t("pricing_per_month")})`,
                      plan: t("pricing_" + p.id),
                    })
                  }
                  className="gold-btn flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  <span>{t("pricing_select_tariff")}</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Comparison FAQ banner */}
      <FadeUp yOffset={25} className="mt-10 sm:mt-12">
        <div className="glass-card p-6 sm:p-10 text-center border border-[#236B70]/50 shadow-xl relative overflow-hidden">
          <FloatingElement duration={6} yRange={8} className="absolute -top-10 -right-10 pointer-events-none opacity-20">
            <Zap className="h-44 w-44 text-[#D9E2DE]" />
          </FloatingElement>
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {t("pricing_faq_title")}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs text-[#D9E2DE]/80 sm:text-sm">
            {t("pricing_faq_desc")}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenModal}
              className="gold-btn inline-flex items-center gap-2 rounded-xl px-7 py-3 text-xs font-bold uppercase tracking-wider"
            >
              <span>{t("btn_free_consultation")}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="https://t.me/Sigma_consulting"
              target="_blank"
              rel="noreferrer"
              className="teal-btn inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold"
            >
              <span>{t("btn_telegram_write")}</span>
            </motion.a>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
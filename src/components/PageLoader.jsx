import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function PageLoader({ onComplete }) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState(t("loader_status_loading"));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const step = Math.floor(Math.random() * 14) + 12;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 45) {
      setStatusText(t("loader_status_education_db"));
    } else if (progress < 85) {
      setStatusText(t("loader_status_grants_visas"));
    } else {
      setStatusText(t("loader_status_welcome"));
    }

    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 300);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071F22] text-white overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-[#104F5A]/30 blur-[140px] pointer-events-none" />
      <div className="absolute h-80 w-80 rounded-full bg-[#104F5A]/25 blur-[130px] pointer-events-none" />

      {/* Center Box */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm">
        {/* Animated Logo Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mb-6"
        >
          {/* Subtle spinning accent halo */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#104F5A] via-[#236B70] to-[#D9E2DE] opacity-60 blur-lg animate-pulse" />

          <div className="relative rounded-2xl border-2 border-[#236B70]/60 bg-white px-7 py-4 shadow-[0_0_40px_rgba(217,226,222,0.25)]">
            <img
              src="/logo.png"
              alt="Sigma Consulting Logo"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="space-y-1.5 mb-6"
        >
          <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#236B70]/50 bg-[#104F5A]/50 px-3 py-0.5 text-xs font-bold tracking-widest uppercase text-[#D9E2DE]">
            <Sparkles className="h-3 w-3 text-[#D9E2DE]" />
            <span>{t("loader_brand")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-white">
            SIGMA <span className="text-[#D9E2DE]">CONSULTING</span>
          </h2>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="w-64 sm:w-72 space-y-2.5"
        >
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#05181A] border border-[#236B70]/60 p-0.5 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#104F5A] via-[#236B70] to-[#D9E2DE] shadow-[0_0_14px_#D9E2DE]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          {/* Status & Percentage */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#D9E2DE]/80 px-1">
            <span className="truncate">{statusText}</span>
            <span className="font-mono font-bold text-[#D9E2DE]">{progress}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, ExternalLink, ZoomIn, ZoomOut, Download, FileText, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function LicenseModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D5A45B]/40 bg-[#071F22] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#236B70]/40 bg-gradient-to-r from-[#0B343B] via-[#0D3F47] to-[#0B343B] px-5 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D5A45B]/50 bg-[#D5A45B]/15 text-[#D5A45B] shadow-inner">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black tracking-wide text-white">
                    {t("license_modal_title")}
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    {t("license_modal_verified")}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#D5A45B] font-medium">
                  {t("license_modal_company")} • {t("license_modal_stir")}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:scale-105"
              aria-label={t("license_modal_close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Document Content / Image Viewport */}
          <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center bg-[#041316]">
            <div className="relative group max-w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#236B70]/40 shadow-2xl bg-white">
              <img
                src="/images/guvohnoma.jpg"
                alt="Davlat ro'yxatidan o'tganlik to'g'risidagi guvohnoma — SIGMA GO ABROAD MCHJ"
                className={`w-full max-h-[64vh] object-contain transition-transform duration-300 ${
                  isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
              />

              {/* Quick actions overlay banner */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 bg-[#071F22]/90 backdrop-blur-md border border-[#D5A45B]/40 rounded-xl p-1 shadow-lg opacity-90 transition-opacity">
                <button
                  type="button"
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-white hover:text-[#D5A45B] transition-colors"
                  title={isZoomed ? t("license_modal_zoom_out") : t("license_modal_zoom_in")}
                >
                  {isZoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
                  <span>{isZoomed ? t("license_modal_zoom_out") : t("license_modal_zoom_in")}</span>
                </button>
                <div className="h-3 w-[1px] bg-white/20" />
                <a
                  href="/images/guvohnoma.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#D5A45B] hover:text-[#F3C77C] transition-colors"
                  title={t("license_modal_open_full")}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{t("license_modal_open_full")}</span>
                </a>
              </div>
            </div>

            {/* Official Authority Description Card */}
            <div className="mt-4 w-full rounded-xl border border-[#236B70]/40 bg-[#0B343B]/60 p-3 sm:p-3.5 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#D5A45B] shrink-0" />
                <div>
                  <span className="font-semibold text-white">{t("license_modal_authority_label")}: </span>
                  <span>{t("license_modal_authority")}</span>
                </div>
              </div>
              <div className="text-[11px] font-medium text-[#D5A45B] whitespace-nowrap bg-[#D5A45B]/10 px-2.5 py-1 rounded-lg border border-[#D5A45B]/20">
                {t("license_modal_date")}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#236B70]/40 bg-[#071F22] px-5 sm:px-6 py-3.5">
            <span className="text-[11px] text-slate-400">
              ✓ {t("license_modal_legal_guarantee")}
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href="/images/guvohnoma.jpg"
                download="Sigma_Consulting_Guvohnoma.jpg"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#236B70] bg-[#104F5A]/40 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:border-[#D5A45B] hover:bg-[#D5A45B]/10"
              >
                <Download className="h-3.5 w-3.5 text-[#D5A45B]" />
                <span>{t("license_modal_download")}</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="gold-btn rounded-xl px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#071F22]"
              >
                {t("license_modal_close")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

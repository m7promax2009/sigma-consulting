import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConsultationModal from "./components/ConsultationModal";
import MobileBottomNav from "./components/MobileBottomNav";
import {
  ScrollProgressBar,
  LiveActivityToast,
} from "./components/Motion";
import PageLoader from "./components/PageLoader";
import { useLanguage } from "./contexts/LanguageContext";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Results from "./pages/Results";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";
import SavolJavob from "./pages/SavolJavob";
import Joylashuv from "./pages/Joylashuv";


import { Send, Phone } from "lucide-react";

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Inner routes with smooth page enter/exit animations
function AnimatedRoutes({ onOpenModal }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col min-w-0"
      >
        <Routes location={location}>
          <Route path="/" element={<Home onOpenModal={onOpenModal} />} />
          <Route path="/tariflar" element={<Pricing onOpenModal={onOpenModal} />} />
          <Route path="/natijalar" element={<Results onOpenModal={onOpenModal} />} />
          <Route path="/jamoa" element={<Team onOpenModal={onOpenModal} />} />
          <Route path="/fikrlar" element={<Testimonials onOpenModal={onOpenModal} />} />
          <Route path="/savol-javoblar" element={<SavolJavob onOpenModal={onOpenModal} />} />
          <Route path="/joylashuv" element={<Joylashuv onOpenModal={onOpenModal} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState({
    reason: t("app_modal_default_reason"),
    country: t("app_modal_default_country"),
  });

  const openModal = (ctx = {}) => {
    if (typeof ctx === "object" && ctx !== null && (ctx.reason || ctx.country || ctx.plan)) {
      setModalContext({
        reason: ctx.reason || t("app_modal_default_reason"),
        country: ctx.country || t("app_modal_default_country"),
        plan: ctx.plan || null,
      });
    } else {
      setModalContext({
        reason: t("app_modal_default_reason"),
        country: t("app_modal_default_country"),
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <BrowserRouter>
        {/* Luxury Initial Page Loader with Sigma Logo */}
        <AnimatePresence mode="wait">
          {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {/* Scroll to Top on Navigation */}
        <ScrollToTop />

        {/* Top Gold Scroll Progress Bar (JS Animated) */}
        <ScrollProgressBar />

        <div className="relative flex min-h-screen flex-col bg-[#071F22] text-[#D9E2DE] antialiased">
          {/* Navigation Bar */}
          <Navbar onOpenModal={() => openModal({ reason: t("app_reason_navbar") })} />

          {/* Animated Page Transitions */}
          <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
            <AnimatedRoutes onOpenModal={openModal} />
          </main>

          {/* Global Footer */}
          <Footer onOpenModal={() => openModal({ reason: t("app_reason_footer") })} />

          {/* Mobile Persistent Bottom Navigation Bar */}
          <MobileBottomNav />

          {/* Floating Quick Action Buttons (Bottom Right, elevated on mobile) */}
          <aside
            aria-label={t("app_aria_quick_actions")}
            className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 flex flex-col items-end gap-2.5 pointer-events-auto"
          >
            {/* Telegram Chat */}
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="https://t.me/Sigma_consulting"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#071F22]/85 backdrop-blur-xl p-3 text-[#D5A45B] shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all hover:border-[#D5A45B] hover:bg-[#D5A45B] hover:text-[#071F22]"
              title="Telegramda yozish"
            >
              <Send className="h-5 w-5" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover:max-w-xs group-hover:pr-2">
                  {t("app_telegram_write")}
                </span>
            </motion.a>

            {/* Quick Consultation Trigger */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal({ reason: t("app_reason_fab") })}
              className="gold-btn group flex items-center gap-2 rounded-full p-3 shadow-[0_8px_30px_rgba(213,164,91,0.45)] transition-all"
              title={t("app_title_free_consultation")}
            >
              <Phone className="h-5 w-5 text-[#071F22]" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-black tracking-wider uppercase transition-all duration-300 group-hover:max-w-xs group-hover:pr-2 text-[#071F22]">
                {t("app_title_consultation")}
              </span>
            </motion.button>
          </aside>

          {/* Live Recent Visa Approval Notification Toast (Bottom Left) */}
          <LiveActivityToast />

          {/* Global Consultation Modal */}
          <ConsultationModal isOpen={isModalOpen} onClose={closeModal} context={modalContext} />
        </div>
      </BrowserRouter>
  );
}
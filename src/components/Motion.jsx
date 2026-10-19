import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Sparkles, X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

// ─── 1. TOP SCROLL PROGRESS BAR (JS GLOW PROGRESS) ────────────────
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#104F5A] via-[#D5A45B] to-[#F3C77C] origin-left z-50 pointer-events-none shadow-[0_0_14px_rgba(213,164,91,0.8)]"
      style={{ scaleX }}
    />
  );
}

// ─── 2. AMBIENT MOUSE GLOW FOLLOWER ────────────────────────────────
export function MouseGlowFollower() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let frameId;
    const handleMove = (e) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-10 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        width: "500px",
        height: "500px",
        background:
          "radial-gradient(circle, rgba(217, 226, 222, 0.06) 0%, rgba(16, 79, 90, 0.04) 40%, transparent 70%)",
        filter: "blur(50px)",
      }}
    />
  );
}

// ─── 3. SCROLL FADE UP ANIMATION (BOTH WAYS: UP & DOWN) ────────────
export function FadeUp({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 35,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 4. SCROLL SLIDE FROM LEFT / RIGHT (BOTH WAYS) ─────────────────
export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.7,
  distance = 50,
  className = "",
}) {
  const xOffset = direction === "left" ? -distance : distance;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 5. SCALE IN WITH SPRING BOUNCE ────────────────────────────────
export function ScaleIn({
  children,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 6. INTERACTIVE 3D PERSPECTIVE TILT CARD ───────────────────────
export function TiltCard({
  children,
  className = "",
  onClick,
  maxTilt = 2.5,
  scaleOnHover = 1.015,
  glare = false,
}) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || maxTilt === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      whileHover={{ scale: scaleOnHover, y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 26,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── 7. SPOTLIGHT CARD (CURSOR LIGHT GLOW) ─────────────────────────
export function SpotlightCard({
  children,
  className = "",
  onClick,
  spotlightColor = "rgba(217, 226, 222, 0.14)",
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Light Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── 8. MAGNETIC INTERACTIVE BUTTON ────────────────────────────────
export function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.22,
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="inline-block"
    >
      <div onClick={onClick} className={className}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── 9. CONTINUOUS LUXURY FLOATING ELEMENT ─────────────────────────
export function FloatingElement({
  children,
  duration = 4.5,
  yRange = 10,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      animate={{
        y: [0, -yRange, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 10. ANIMATED NUMBER COUNTER (SCROLL TRIGGERED UP & DOWN) ───────
export function Counter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.6,
  className = "",
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });

  useEffect(() => {
    if (!isInView) {
      setCount(from);
      return;
    }

    let start = from;
    const end = parseFloat(to);
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Smooth ease-out cubic
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      const current = start + (end - start) * progress;

      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, from, to, duration]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ─── 11. LIVE RECENT VISA NOTIFICATION TOAST (JS ROTATING TICKER) ──
const liveApprovals = [
  {
    id: 1,
    name: "Dilshodbek Azamov",
    action: {
      uz: "Janubiy Koreya — D-2 Talaba Vizasi olindi",
      ru: "Южная Корея — Студенческая виза D-2 получена",
    },
    flag: "🇰🇷",
    time: { uz: "Hozirgina", ru: "Только что" },
    badge: { uz: "100% Grant", ru: "100% Грант" },
  },
  {
    id: 2,
    name: "Madina Rahimova",
    action: {
      uz: "Germaniya — Studienkolleg München qabul xati",
      ru: "Германия — Письмо о зачислении Studienkolleg München",
    },
    flag: "🇩🇪",
    time: { uz: "4 daqiqa oldin", ru: "4 минуты назад" },
    badge: { uz: "Bepul Ta'lim", ru: "Бесплатное Обучение" },
  },
  {
    id: 3,
    name: "Sardorbek Usmonov",
    action: {
      uz: "AQSH — F-1 Talaba Vizasi elchixonadan tasdiqlandi",
      ru: "США — Студенческая виза F-1 подтверждена в посольстве",
    },
    flag: "🇺🇸",
    time: { uz: "9 daqiqa oldin", ru: "9 минут назад" },
    badge: { uz: "Viza Tasdiqlandi", ru: "Виза Подтверждена" },
  },
  {
    id: 4,
    name: "Nilufar Ostonova",
    action: {
      uz: "Italiya — Politecnico di Milano 7,200€ stipendiya",
      ru: "Италия — Politecnico di Milano стипендия 7,200€",
    },
    flag: "🇮🇹",
    time: { uz: "15 daqiqa oldin", ru: "15 минут назад" },
    badge: { uz: "Yillik Grant", ru: "Годовой Грант" },
  },
  {
    id: 5,
    name: "Javohir To'rayev",
    action: {
      uz: "Buyuk Britaniya — University of London Pathway CAS",
      ru: "Великобритания — University of London Pathway CAS",
    },
    flag: "🇬🇧",
    time: { uz: "28 daqiqa oldin", ru: "28 минут назад" },
    badge: { uz: "Rasmiy Qabul", ru: "Официальное Зачисление" },
  },
];

export function LiveActivityToast() {
  const { t, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after user scrolls past header (scrollY > 300)
      if (window.scrollY > 300) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (dismissed || !hasScrolled) return;
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % liveApprovals.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, [dismissed, hasScrolled]);

  if (dismissed || !hasScrolled) return null;

  const item = liveApprovals[index];

  return (
    <aside
      aria-label={t("toast_aria_label")}
      className="fixed bottom-6 left-6 z-40 hidden sm:block pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[390px] max-w-[calc(100vw-3rem)] rounded-2xl border border-[#236B70]/60 bg-[#071F22]/95 p-3.5 shadow-[0_16px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            {/* Leading Header with Sigma Logo */}
            <div className="mb-2.5 flex items-center justify-between border-b border-[#236B70]/40 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-auto items-center rounded-md bg-white px-1.5 py-0.5 shadow-sm">
                  <img
                    src="/logo.png"
                    alt="Sigma Logo"
                    className="h-4 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                    <span className="text-[11px] font-black tracking-wider text-[#D9E2DE] uppercase">
                      {t("toast_brand")}
                    </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#D9E2DE]/50">
                  {item.time[lang] || item.time.uz}
                </span>
                <button
                  onClick={() => setDismissed(true)}
                  className="rounded-md p-0.5 text-slate-400 hover:text-white transition-colors"
                  aria-label={t("toast_aria_close")}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Notification Body */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#236B70]/50 bg-[#104F5A]/60 text-2xl shadow-inner">
                {item.flag}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-xs font-black text-white">
                    {item.name}
                  </p>
                  <span className="rounded bg-[#104F5A] px-1.5 py-0.5 text-[9px] font-bold text-[#D9E2DE] shrink-0 border border-[#236B70]/50">
                    {item.badge[lang] || item.badge.uz}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] font-medium text-[#D9E2DE]/90">
                  {item.action[lang] || item.action.uz}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

// ─── 12. STAGGER CONTAINERS FOR GRIDS ──────────────────────────────
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

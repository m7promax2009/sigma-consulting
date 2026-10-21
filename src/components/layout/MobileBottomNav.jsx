import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Globe2, Tag, Award, Users, PlaySquare, HelpCircle, MapPin } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const mobileLinks = [
  { to: "/", key: "nav_home", icon: Home },
  { to: "/davlatlar", key: "nav_countries", icon: Globe2 },
  { to: "/tariflar", key: "nav_pricing", icon: Tag },
  { to: "/natijalar", key: "nav_results", icon: Award },
  { to: "/jamoa", key: "nav_team", icon: Users },
  { to: "/fikrlar", key: "nav_testimonials", icon: PlaySquare },
  { to: "/savol-javoblar", key: "nav_faq", icon: HelpCircle },
  { to: "/joylashuv", key: "nav_location", icon: MapPin },
];

export default function MobileBottomNav() {
  const { t } = useLanguage();

  return (
    <nav
      aria-label={t("menu_label")}
      className="fixed bottom-2.5 left-2.5 right-2.5 z-40 mx-auto max-w-lg rounded-2xl border border-[#236B70]/60 bg-[#071F22]/95 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] p-1 md:hidden"
    >
      <div className="flex items-center justify-between gap-0.5">
        {mobileLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group relative flex flex-1 flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 select-none ${
                  isActive
                    ? "text-white"
                    : "text-[#D9E2DE]/65 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute inset-0 rounded-xl bg-[#D5A45B]/15 border border-[#D5A45B]/40 shadow-[0_0_15px_rgba(213,164,91,0.25)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    <Icon
                      className={`h-4.5 w-4.5 transition-transform duration-200 ${
                        isActive ? "scale-105 text-[#D5A45B]" : "text-white/60 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`text-[9.5px] tracking-tight mt-0.5 ${
                        isActive ? "font-bold text-[#D5A45B]" : "font-semibold text-white/60"
                      }`}
                    >
                      {t(item.key)}
                    </span>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { t, languages } from "../locales";

const LanguageContext = createContext(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export function LanguageProvider({ children }) {
  const stored = localStorage.getItem("sigma_lang");
  const initialLang = stored && ["uz", "ru"].includes(stored) ? stored : "uz";

  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    localStorage.setItem("sigma_lang", lang);
    document.documentElement.lang = lang;
    document.title = lang === "ru"
      ? "Sigma Consulting | Образование и виза за рубежом"
      : "Sigma Consulting | Chet elda ta'lim va viza markazi";
  }, [lang]);

  const changeLanguage = useCallback((newLang) => {
    setLang(newLang);
  }, []);

  const translated = useCallback(
    (key, params) => t(key, params, lang),
    [lang]
  );

  const current = languages.find((l) => l.code === lang) || languages[0];

  return (
    <LanguageContext.Provider value={{ lang, current, changeLanguage, t: translated, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
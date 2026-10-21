/**
 * Sigma Consulting — Central Site Configuration
 * Single source of truth for company contact details, addresses, and social links.
 */

export const siteConfig = {
  name: "Sigma Consulting",
  tagline: "Chet elda ta'lim va talaba vizalari bo'yicha rasmiy konsalting",
  domain: "sigmaconsulting.uz",
  url: "https://sigma-consulting-five.vercel.app",

  phones: {
    primary: "+998 97 442 47 37",
    primaryRaw: "+998974424737",
    secondary: "+998 99 611 33 37",
    secondaryRaw: "+998996113337",
  },

  socials: {
    telegram: "https://t.me/Sigma_consulting",
    telegramUsername: "@Sigma_consulting",
    instagram: "https://instagram.com/sigmaconsulting.uz",
    instagramHandle: "@sigmaconsulting.uz",
    email: "sigmaconsutinguz@gmail.com",
  },

  address: {
    city: "Toshkent shahri",
    district: "Chilonzor tumani",
    street: "Arnasoy 2-daha, 76-uy",
    landmark: "NEUS Biznes Markazi",
    full: "Toshkent shahri, Chilonzor tumani, Arnasoy 2-daha, 76 NEUS Biznes Markazi",
    yandexMapUrl:
      "https://yandex.uz/maps/org/22428011414/?ll=69.223888%2C41.275290&z=17",
    coordinates: {
      lat: 41.27529,
      lng: 69.223888,
    },
  },

  workingHours: {
    weekdays: "Dushanba — Shanba",
    time: "09:00 — 19:00",
    closed: "Yakshanba — Dam olish kuni",
  },

  company: {
    legalName: 'MCHJ "SIGMA GO ABROAD"',
    inn: "311 279 002",
    director: "To'lkunova Mavluda Shomansurovna",
    headOfProjects: "Ergashev Faxriddin Mirzohid o'g'li",
    foundedYear: 2018,
    stats: {
      experienceYears: "8+",
      visasApproved: "5,000+",
      countriesCount: "35+",
      universitiesCount: "790+",
      visaSuccessRate: "98.4%",
    },
  },

  telegramBot: {
    defaultToken: "8893326249:AAGiCF91gWbHbiJ8ZFygNikKe2cNQ8KGTHU",
    defaultAdminChatId: "5627504385",
  },
};

export default siteConfig;

// Instagram @sigmaconsulting.uz reels ma'lumotlari
// type: "otziv" → talaba/ota-ona video fikrlari (karuselda SHU'LAR aylanadi)
// type: "promo" → ma'lumot/video-loyihalar (karuselga KIRMAYDI)
// Yangi otziv qo'shish: public/videos/ ga mp4 qo'ying, pastdagi ro'yxatga yozing

export const reelsData = [
  {
    id: 1,
    type: "otziv",
    src: "/videos/video_1.mp4",
    studentName: "Talabamiz Viza Natijasi",
    country: "Xitoy 🇨🇳",
    university: "Top Davlat Universiteti",
    achievement: "100% Grant + Viza Pasporti",
    quote: "Sigma Consulting orqali 100% grant yutib, vizam muvaffaqiyatli chiqdi va orzuyimdagi oliygohga qabul qilindim!",
  },
  {
    id: 2,
    type: "otziv",
    src: "/videos/video_2.mp4",
    studentName: "Nilufar Ostonova (Ota-onalar)",
    country: "Italiya 🇮🇹",
    university: "Politecnico di Milano",
    achievement: "Farzandi Italiyada grantda",
    quote: "Farzandimning barcha hujjatlarini o'z vaqtida tayyorlab, viza va to'liq grant olishiga yordam berishdi. Katta rahmat!",
  },
  {
    id: 5,
    type: "otziv",
    src: "/videos/video_5.mp4",
    studentName: "Bitiruvchilar Marosimi",
    country: "Germaniya & Yevropa 🇩🇪",
    university: "14.6k Ko'rilgan 🎓",
    achievement: "Yevropa Diplomi & Karyera",
    quote: "Yevropaning nufuzli oliygohini tamomlab, xalqaro darajadagi diplomga ega bo'lgan talabalarimiz quvonchi!",
  },
  {
    id: 3,
    type: "promo",
    src: "/videos/video_3.mp4",
    studentName: "Ofisda Jonli Qabul",
    country: "Sigma Bosh Ofisi 🏢",
    university: "Individual Viza Strategiyasi",
    achievement: "Ota-onalar bilan shartnoma",
    quote: "Ota-onalar va talabalarimiz bilan ofisimizda to'g'ridan-to'g'ri hujjatlar tahlili va elchixona kafolati tuzilmoqda.",
  },
  {
    id: 4,
    type: "promo",
    src: "/videos/video_4.mp4",
    studentName: "Bepul Ta'lim Dasturlari",
    country: "21.5k Ko'rilgan 🔥",
    university: "100% Hukumat Grantlari",
    achievement: "Mutlaqo Bepul O'qish",
    quote: "Chet eldagi nufuzli universitetlarda bepul ta'lim, shinam yotoqxona va oylik stipendiya yutish sirlari!",
  },
  {
    id: 6,
    type: "promo",
    src: "/videos/video_6.mp4",
    studentName: "Schengen Vizasi",
    country: "Yevropa Ittifoqi 🇪🇺",
    university: "27 Davlatga Vizasiz Kirish",
    achievement: "Talaba Rezident Kartasi",
    quote: "Yevropa davlatlarida o'qish orqali barcha Schengen mamlakatlariga vizasiz erkin sayohat qilish imkoniyati!",
  },
];

// Karuselda faqat video OTZIVLAR aylanadi
export const otzivReels = reelsData.filter((v) => v.type === "otziv");

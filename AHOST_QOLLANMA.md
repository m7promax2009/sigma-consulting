# 🚀 aHost.uz (cPanel / LiteSpeed / Apache) ga Joylashtirish Qo'llanmasi
### "Shunda qo'ysa bo'ldi" formati

Ushbu loyiha **aHost.uz** ning har qanday cPanel yoki LiteSpeed hosting tarifida 100% ishlashga to'liq moslashtirildi. Hech qanday murakkab server buyruqlari talab etilmaydi.

---

## 📁 1-QADAM: Fayllarni aHost ga yuklash
1. `Desktop` dagi tayyor **`sigma_consulting_aHost_tayyor.zip`** faylini oling.
2. aHost dagi **cPanel** ga kiring -> **File Manager** (Fayl menejeri) ni oching.
3. Saytingizning asosiy jildi — **`public_html`** papkasiga kiring.
4. **Upload** tugmasini bosib, `sigma_consulting_aHost_tayyor.zip` ni yuklang.
5. Zip ustiga o'ng tugmani bosib, **Extract** (Arxivdan chiqarish) ni bosing.

---

## ⚙️ 2-QADAM: Qanday ishlaydi?
Arxiv ichida hamma narsa tayyor qilib joylashtirilgan:
- **`.htaccess`** — React SPA yo'naltirishlarini boshqaradi (`/davlatlar`, `/tariflar`, `/jamoa` va boshqalar sahifani yangilaganda ham xatosiz ochiladi).
- **`api/lead.php`** — PHP API backend. Talaba arizasini qabul qiladi, sanitizatsiya qiladi va serverdan turib Telegram botga yuboradi.
- **`api/.htaccess`** — API xavfsizlik qoidalari va CORS ruxsatnomalari.
- **`api/leads.csv`** — Zaxira (backup). Telegramda internet uzilsa ham, barcha tushgan arizalar ushbu CSV faylga avtomatik yozib boriladi.
- **`assets/`, `images/`, `videos/`, `countries/`** — Barcha optimallashgan multimedia resurslari.

---

## 🤖 3-QADAM: Telegram Bot Sozlamalari (Ixtiyoriy)
Odatiy holatda `api/lead.php` ichida Sigma Consulting rasmiy bot va admin chat ID lari kiritilgan:
- **Bot Token:** `8893326249:AAGiCF91gWbHbiJ8ZFygNikKe2cNQ8KGTHU`
- **Admin Chat ID:** `5627504385`

Agar kelajakda boshqa bot yoki boshqa kanalga yubormoqchi bo'lsangiz:
- `api/lead.php` faylini cPanel ichida **Edit** qilib, 35-qatoridagi `$ADMIN_CHAT_ID` yoki `$BOT_TOKEN` ni o'zgartirishingiz kifoya!

---

## 🧪 4-QADAM: Tekshirish
Saytingizga kiring (masalan: `https://sigmaconsulting.uz`):
1. Istalgan sahifani oching (`/davlatlar`, `/jamoa` va h.k.).
2. **"Konsultatsiyaga yozilish"** tugmasini bosib ariza qoldiring.
3. Telegram botingizga darhol chiroyli formatdagi ariza keladi!

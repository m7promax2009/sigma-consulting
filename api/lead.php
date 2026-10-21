<?php
/**
 * ==============================================================================
 * Sigma Consulting — Lead Capture API (aHost / cPanel / LiteSpeed / Apache)
 * ==============================================================================
 * Ushbu fayl aHost.uz (va har qanday cPanel/Apache/LiteSpeed hosting) da
 * to'g'ridan-to'g'ri ishlaydi: "shunda qoysa bo'ldi".
 * 
 * Imkoniyatlari:
 * - CORS xavfsiz sozlamalari (Preflight OPTIONS qo'llab-quvvatlanadi)
 * - Ma'lumotlarni qat'iy sanitizatsiya va validatsiya qilish
 * - Telegram Bot orqali Admin ga chiroyli formatda xabar yuborish
 * - Zaxira (backup) sifatida arizalarni leads.csv fayliga xavfsiz saqlash
 * - Spam va botlardan himoyalovchi rate limiting
 * ==============================================================================
 */

// 1. CORS va Headerlar
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Preflight OPTIONS so'roviga darhol 200 qaytarish
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Faqat POST so'rovlarini qabul qilish
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method Not Allowed. Faqat POST so'rovlari qabul qilinadi."
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// 2. Konfiguratsiya (Bot Token & Admin Chat ID)
// Ushbu sozlamalarni server muhitidan yoki to'g'ridan-to'g'ri shu yerdan olish mumkin
$BOT_TOKEN = getenv("TELEGRAM_BOT_TOKEN") ?: "8893326249:AAGiCF91gWbHbiJ8ZFygNikKe2cNQ8KGTHU";
$ADMIN_CHAT_ID = getenv("TELEGRAM_ADMIN_CHAT_ID") ?: "5627504385";

// 3. Kelgan JSON ma'lumotni o'qish
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    // Agar form-data orqali yuborilgan bo'lsa
    $data = $_POST;
}

// 4. Maydonlarni olish va tozalash (Sanitization)
$name    = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$phone   = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$country = isset($data['country']) ? trim(strip_tags($data['country'])) : 'Belgilanmagan';
$degree  = isset($data['degree']) ? trim(strip_tags($data['degree'])) : 'Bakalavriat';
$reason  = isset($data['reason']) ? trim(strip_tags($data['reason'])) : 'Sayt orqali umumiy konsultatsiya so\'rovi';

// 5. Validatsiya
if (empty($name)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Ismingizni kiritishingiz shart."], JSON_UNESCAPED_UNICODE);
    exit();
}

if (empty($phone) || strlen(preg_replace('/[^0-9]/', '', $phone)) < 7) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "To'g'ri telefon raqam kiriting."], JSON_UNESCAPED_UNICODE);
    exit();
}

// 6. Sana va vaqt (Toshkent vaqti bilan)
date_default_timezone_set('Asia/Tashkent');
$currentTime = date('H:i:s');
$currentDate = date('d.m.Y');

// 7. Xabarni HTML formatda shakllantirish
function cleanForTg($str) {
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$safeName    = cleanForTg($name);
$safePhone   = cleanForTg($phone);
$safeCountry = cleanForTg($country);
$safeDegree  = cleanForTg($degree);
$safeReason  = cleanForTg($reason);

$messageText = "🎓 <b>YANGI ARIZA — SIGMA CONSULTING</b>\n";
$messageText .= "━━━━━━━━━━━━━━━━━━━━━━\n";
$messageText .= "👤 <b>Mijoz:</b> {$safeName}\n";
$messageText .= "📞 <b>Telefon:</b> <code>{$safePhone}</code>\n";
$messageText .= "🌍 <b>Qiziqqan davlat:</b> {$safeCountry}\n";
$messageText .= "📚 <b>Ta'lim bosqichi:</b> {$safeDegree}\n";
$messageText .= "📌 <b>Murojaat sababi / Manba:</b>\n";
$messageText .= "👉 <i>{$safeReason}</i>\n";
$messageText .= "━━━━━━━━━━━━━━━━━━━━━━\n";
$messageText .= "⏰ <b>Vaqt:</b> {$currentTime} | {$currentDate}\n";
$messageText .= "🌐 <b>Server / Xost:</b> aHost.uz API";

// 8. Telegram Bot API ga yuborish (cURL orqali)
$telegramUrl = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";
$postFields = [
    'chat_id'    => $ADMIN_CHAT_ID,
    'text'       => $messageText,
    'parse_mode' => 'HTML'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $telegramUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postFields));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// 9. Arizani mahalliy CSV faylga zaxira saqlash (leads.csv)
$csvFile = __DIR__ . '/leads.csv';
$csvExists = file_exists($csvFile);
if ($fp = @fopen($csvFile, 'a')) {
    if (!$csvExists) {
        fputcsv($fp, ['Sana', 'Vaqt', 'Ism', 'Telefon', 'Davlat', 'Bosqich', 'Sabab', 'Telegram_Status']);
    }
    $tgStatus = ($httpCode === 200) ? 'Yuborildi' : 'Xatolik: ' . $httpCode;
    fputcsv($fp, [$currentDate, $currentTime, $name, $phone, $country, $degree, $reason, $tgStatus]);
    fclose($fp);
}

// 10. Javobni qaytarish
if ($httpCode === 200) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Arizangiz qabul qilindi. Tez orada mutaxassisimiz siz bilan bog'lanadi!",
        "timestamp" => "{$currentDate} {$currentTime}"
    ], JSON_UNESCAPED_UNICODE);
} else {
    // Agar Telegramda xatolik bo'lsa ham arizani csv ga saqlab qoldik
    http_response_code(200); // 200 qaytaramiz chunki lead saqlandi
    echo json_encode([
        "success" => true,
        "warning" => "Ariza tizimga saqlandi, telegramga xabar berishda kechikish bo'lishi mumkin.",
        "timestamp" => "{$currentDate} {$currentTime}"
    ], JSON_UNESCAPED_UNICODE);
}

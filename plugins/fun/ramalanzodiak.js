// Auto-generated plugin for Category: fun
// Command: ramalanzodiak
const axios = require('axios');

module.exports = {
    name: 'ramalanzodiak',
    command: ["ramalzodiak"],
    category: 'fun',
    description: 'Melihat ramalan zodiak acak harian',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Aries: Hari ini keuanganmu stabil, tapi jaga emosi agar tidak merusak hubungan kerja.",
            "Taurus: Kesehatan prima! Waktunya mencoba hal baru yang menantang.",
            "Gemini: Hubungan asmara sedang hangat-hangatnya, nikmati momen ini.",
            "Cancer: Jangan terburu-buru mengambil keputusan finansial hari ini.",
            "Leo: Keberanianmu akan membawa hasil manis di akhir pekan.",
            "Virgo: Luangkan waktu untuk istirahat, tubuhmu butuh relaksasi."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *RAMALANZODIAK* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

// Auto-generated plugin for Category: fun
// Command: love
const axios = require('axios');

module.exports = {
    name: 'love',
    command: ["cinta","lovecalculator"],
    category: 'fun',
    description: 'Menghitung persen kecocokan cinta antar dua nama',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const parts = text.split('|');
        const nama1 = parts[0]?.trim();
        const nama2 = parts[1]?.trim();
        if (!nama1 || !nama2) return await sock.sendMessage(from, { text: '❌ Format salah! Gunakan: .love nama1|nama2' }, { quoted: m });
        
        const rate = Math.floor(Math.random() * 100) + 1;
        let desc = 'Sangat buruk, sebaiknya berteman saja.';
        if (rate > 80) desc = 'Luar biasa! Kalian sangat jodoh dan ditakdirkan bersama.';
        else if (rate > 50) desc = 'Cukup bagus, pertahankan komunikasi kalian.';
        
        await sock.sendMessage(from, { text: `💖 *LOVE CALCULATOR* 💖\n\n👩 *Nama 1:* ${nama1}\n👨 *Nama 2:* ${nama2}\n\n📈 Persentase: *${rate}%*\n📌 Analisis: ${desc}` }, { quoted: m });

    }
};

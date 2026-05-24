// Auto-generated plugin for Category: fun
// Command: daresay
const axios = require('axios');

module.exports = {
    name: 'daresay',
    command: ["katakanlantang"],
    category: 'fun',
    description: 'Tantangan mengucapkan kata konyol secara lantang',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Ketik: \"AKU SAYANG ADMIN BOT RYU\" sebanyak 5 kali di grup.","VN berteriak \"KOKOK PETOK AKU AYAM\" dengan lantang.","Kirim chat ke gebetan/pacar: \"Kita udahan ya, aku mau fokus ternak lele\"."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *DARESAY* ✨\n\n${item}` }, { quoted: m });

    }
};

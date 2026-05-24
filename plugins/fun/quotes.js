// Auto-generated plugin for Category: fun
// Command: quotes
const axios = require('axios');

module.exports = {
    name: 'quotes',
    command: ["kutipan","motivasi"],
    category: 'fun',
    description: 'Mendapatkan kutipan motivasi hidup bijak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Jangan pernah menyerah, ingat masa depanmu masih panjang.","Kegagalan hari ini adalah pondasi kesuksesan hari esok.","Hiduplah seolah kamu mati besok. Belajarlah seolah kamu hidup selamanya.","Fokus pada prosesmu, jangan bandingkan dengan hasil orang lain.","Satu-satunya batasan dalam hidup adalah pikiranmu sendiri."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *QUOTES* ✨\n\n${item}` }, { quoted: m });

    }
};

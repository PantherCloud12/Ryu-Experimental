// Auto-generated plugin for Category: fun
// Command: bucin
const axios = require('axios');

module.exports = {
    name: 'bucin',
    command: ["gombalan","katabucin"],
    category: 'fun',
    description: 'Mendapatkan kata-kata gombalan bucin mematikan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Kalau kamu jadi senar gitar, aku gamau jadi gitarisnya. Soalnya aku gamau mutusin kamu.","Kamu tahu gak bedanya kamu sama pelajaran sejarah? Sejarah itu masa lalu, kalau kamu masa depanku.","Cukup jaringan aja yang 4G, cintaku ke kamu harus 5G (Forever and Ever)."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *BUCIN* ✨\n\n${item}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: fun
// Command: darkjoke
const axios = require('axios');

module.exports = {
    name: 'darkjoke',
    command: ["darkjokes"],
    category: 'fun',
    description: 'Mendapatkan lelucon gelap (Dark Joke)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Kenapa yatim piatu tidak bisa bermain tenis? Karena mereka tidak tahu apa itu \"servis\".","Saya memiliki hati seperti anak kecil. Di dalam toples di atas meja saya.","Kenapa kuburan dipagari? Karena orang-orang di dalam sangat ingin keluar."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *DARKJOKE* ✨\n\n${item}` }, { quoted: m });

    }
};

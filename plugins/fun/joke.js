// Auto-generated plugin for Category: fun
// Command: joke
const axios = require('axios');

module.exports = {
    name: 'joke',
    command: ["candaan","jokes","bapak2"],
    category: 'fun',
    description: 'Mendapatkan lelucon lucu garing ala bapak-bapak acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Hewan apa yang bersaudara? Katak beradik.","Minyak apa yang bikin mabuk? Minyaksikan senyumanmu.","Kenapa donat tengahnya bolong? Karena yang utuh hanyalah cintaku padamu.","Sayur apa yang sering muncul di akhir film? Sayur... Narra!","Kenapa komputer kalau panas harus dikasih es? Biar cold (dingin) juga bisa loading."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *JOKE* ✨\n\n${item}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: fun
// Command: truth
const axios = require('axios');

module.exports = {
    name: 'truth',
    command: ["truth","jujur"],
    category: 'fun',
    description: 'Mendapatkan tantangan menjawab jujur (Truth)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Kapan terakhir kali kamu berbohong dan untuk apa?","Siapa orang di grup ini yang paling ingin kamu jadikan pacar?","Apa kebiasaan terburukmu saat berada di kamar mandi?","Siapa cinta pertamamu?","Apa rahasia terbesar yang belum pernah kamu ceritakan ke siapapun?","Pernahkah kamu menyukai pacar temanmu sendiri?"];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *TRUTH* ✨\n\n${item}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: fun
// Command: predict
const axios = require('axios');

module.exports = {
    name: 'predict',
    command: ["ramalnasib"],
    category: 'fun',
    description: 'Meramal nasib dan keberuntungan kamu hari ini',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Hari ini kamu akan mendapatkan kejutan kecil berupa rejeki nomplok!","Keberuntunganmu hari ini biasa saja, tetap berhati-hati dalam bertindak.","Hindari mengambil keputusan besar hari ini. Kurangi pengeluaran!","Seseorang dari masa lalu akan menghubungi kamu hari ini."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *PREDICT* ✨\n\n${item}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: fun
// Command: pantun
const axios = require('axios');

module.exports = {
    name: 'pantun',
    command: ["pantunjenaka"],
    category: 'fun',
    description: 'Menampilkan pantun jenaka melayu acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Hari minggu berjalan santai,\nMenuju ke pasar membeli tomat.\nKalau kamu memang anak pandai,\nKenapa nilai matematika selalu mepet?","Buah manggis buah pepaya,\nDibeli dari pasar pagi.\nJanganlah kamu berlagak kaya,\nKalau dompet isinya kertas bon saja.","Satu titik dua koma,\nKamu cantik aku yang punya."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *PANTUN* ✨\n\n${item}` }, { quoted: m });

    }
};

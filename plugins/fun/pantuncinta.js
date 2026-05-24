// Auto-generated plugin for Category: fun
// Command: pantuncinta
const axios = require('axios');

module.exports = {
    name: 'pantuncinta',
    command: ["pcinta"],
    category: 'fun',
    description: 'Menampilkan pantun cinta romantis acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Satu titik dua koma, neng manis siapa yang punya.",
            "Hari minggu berjalan santai, cintaku padamu takkan usai.",
            "Minum sekoteng di batu jajar, hati neng copot abang belajar.",
            "Beli semen di toko bangunan, senyumanmu selalu jadi kenangan.",
            "Ada helikopter di atas awan, wajahmu manis menawan.",
            "Makan nasi pakai bakso, i love you so."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *PANTUNCINTA* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

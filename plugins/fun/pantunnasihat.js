// Auto-generated plugin for Category: fun
// Command: pantunnasihat
const axios = require('axios');

module.exports = {
    name: 'pantunnasihat',
    command: ["pnasihat"],
    category: 'fun',
    description: 'Menampilkan pantun nasihat kehidupan acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Ke sekolah membawa buku, tuntutlah ilmu sepanjang waktu.",
            "Membeli kelapa di pasar pagi, hormati orang tua agar diberkahi.",
            "Pohon beringin daunnya lebat, bekerjalah keras agar hebat.",
            "Air mengalir ke tempat rendah, bersyukur selalu hidup indah.",
            "Ada jarum di dalam peti, buanglah sifat sombong di hati."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *PANTUNNASIHAT* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

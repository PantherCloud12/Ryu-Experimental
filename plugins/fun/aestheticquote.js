// Auto-generated plugin for Category: fun
// Command: aestheticquote
const axios = require('axios');

module.exports = {
    name: 'aestheticquote',
    command: ["aestquotes"],
    category: 'fun',
    description: 'Kutipan estetik acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Biarkan semuanya mengalir seperti air, tidak perlu dipaksakan.",
            "Di antara hiruk pikuk dunia, temukan ruang kecil untuk dirimu sendiri.",
            "Senja mengajarkan kita bahwa keindahan tidak harus bertahan lama.",
            "Terbit dan terbenam, semuanya memiliki keindahan tersendiri.",
            "Rintik hujan adalah musik paling tenang bagi jiwa yang lelah."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *AESTHETICQUOTE* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

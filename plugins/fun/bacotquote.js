// Auto-generated plugin for Category: fun
// Command: bacotquote
const axios = require('axios');

module.exports = {
    name: 'bacotquote',
    command: ["bquote"],
    category: 'fun',
    description: 'Kutipan sindiran atau bacotan lucu acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Jangan pernah menyerah pada mimpi Anda, teruslah tidur.",
            "Kamu itu kayak iklan youtube, muncul di waktu yang gak tepat dan gak bisa diskip.",
            "Gaya selangit, saldo rekening irit.",
            "Katanya mau diet, tapi ngelihat promo makanan langsung goyah.",
            "Muka dua kok dipelihara, mending pelihara cupang biar berwarna."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *BACOTQUOTE* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

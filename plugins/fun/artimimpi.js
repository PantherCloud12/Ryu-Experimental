// Auto-generated plugin for Category: fun
// Command: artimimpi
const axios = require('axios');

module.exports = {
    name: 'artimimpi',
    command: ["tafsirmimpi"],
    category: 'fun',
    description: 'Tafsir mimpi acak untuk hiburan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Mimpi terbang: Menunjukkan bahwa Anda menginginkan kebebasan atau sedang mencapai tujuan baru.",
            "Mimpi jatuh: Menandakan adanya rasa cemas atau kurangnya kendali dalam kehidupan nyata.",
            "Mimpi gigi copot: Sering dikaitkan dengan rasa takut kehilangan sesuatu yang berharga.",
            "Mimpi dikejar sesuatu: Menunjukkan Anda sedang menghindari masalah di kehidupan nyata.",
            "Mimpi air jernih: Menandakan kedamaian hati dan emosi yang stabil."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *ARTIMIMPI* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

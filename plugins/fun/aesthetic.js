// Auto-generated plugin for Category: fun
// Command: aesthetic
const axios = require('axios');

module.exports = {
    name: 'aesthetic',
    command: ["aestheticquotes"],
    category: 'fun',
    description: 'Mendapatkan kutipan estetik puitis',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Biarkan senja mengajarkan kita bahwa yang indah hanya datang sekejap lalu pergi.","Bintang tidak akan bersinar tanpa adanya kegelapan malam.","Merelakan bukan berarti menyerah, tapi menerima bahwa ada hal yang tak bisa dipaksakan.","Di antara bisingnya dunia, aku menemukan ketenangan dalam diammu."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *AESTHETIC* ✨\n\n${item}` }, { quoted: m });

    }
};

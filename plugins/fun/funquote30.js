// Auto-generated plugin for Category: fun
// Command: funquote30
const axios = require('axios');

module.exports = {
    name: 'funquote30',
    command: ["fq30","funq30"],
    category: 'fun',
    description: 'Kutipan hiburan dan fakta lucu bagian 30',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const quotes = [
            "Tidur adalah aktivitas produktif bagi orang yang sedang lelah berpura-pura kuat.",
            "Uang memang bukan segalanya, tapi segalanya butuh uang.",
            "Jangan rindu, berat. Biar aku saja yang menanggung beban hidup ini.",
            "Kerja keraslah sampai tetangga mengira kamu memelihara babi ngepet.",
            "Hidup itu simpel. Kita saja yang sering mempersulit dengan overthinking."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(from, { text: `😄 *FUN QUOTE #30*\n\n"${randomQuote}"\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

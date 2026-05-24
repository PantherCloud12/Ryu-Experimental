// Auto-generated plugin for Category: islamic
// Command: islamicfact13
const axios = require('axios');

module.exports = {
    name: 'islamicfact13',
    command: ["ifact13","islq13"],
    category: 'islamic',
    description: 'Fakta dan kutipan islami bagian 13',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const facts = [
            "Membaca Ayat Kursi setelah sholat fardhu adalah jaminan masuk surga jika ia meninggal.",
            "Waktu mustajab untuk berdoa di hari Jumat adalah setelah Ashar hingga terbenam matahari.",
            "Senyum kepada saudaramu adalah sedekah.",
            "Amalan yang paling dicintai Allah adalah sholat pada waktunya.",
            "Dua kalimat yang ringan di lisan namun berat di timbangan: Subhanallah wa bihamdih, Subhanallahil adzim."
        ];
        const res = facts[Math.floor(Math.random() * facts.length)];
        await sock.sendMessage(from, { text: `🕌 *FAKTA ISLAMI #13*\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

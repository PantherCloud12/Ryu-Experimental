// Auto-generated plugin for Category: islamic
// Command: islamicfact40
const axios = require('axios');

module.exports = {
    name: 'islamicfact40',
    command: ["ifact40","islq40"],
    category: 'islamic',
    description: 'Fakta dan kutipan islami bagian 40',
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
        await sock.sendMessage(from, { text: `🕌 *FAKTA ISLAMI #40*\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

// Auto-generated plugin for Category: islamic
// Command: doapagi
const axios = require('axios');

module.exports = {
    name: 'doapagi',
    command: ["doapagihari"],
    category: 'islamic',
    description: 'Menampilkan doa pagi hari',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        await sock.sendMessage(from, { text: `🕌 *DOAPAGI* 🕌\n\nاللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ\n\n*Artinya:* Ya Allah, dengan-Mu kami memasuki pagi hari, dengan-Mu kami memasuki sore hari, dengan-Mu kami hidup, dengan-Mu kami mati, dan kepada-Mu kami kembali.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

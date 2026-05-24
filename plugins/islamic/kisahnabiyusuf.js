// Auto-generated plugin for Category: islamic
// Command: kisahnabiyusuf
const axios = require('axios');

module.exports = {
    name: 'kisahnabiyusuf',
    command: ["nabiyusuf"],
    category: 'islamic',
    description: 'Kisah singkat Nabi Yusuf AS',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        await sock.sendMessage(from, { text: `🕌 *KISAHNABIYUSUF* 🕌\n\nNabi Yusuf AS dikaruniai ketampanan luar biasa. Beliau dibuang ke dalam sumur oleh saudara-saudaranya yang cemburu, dijual sebagai budak di Mesir, dipenjara karena fitnah, dan akhirnya diangkat menjadi bendahara kerajaan setelah berhasil menafsirkan mimpi raja.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

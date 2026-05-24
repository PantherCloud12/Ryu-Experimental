// Auto-generated plugin for Category: islamic
// Command: kisahnabiadam
const axios = require('axios');

module.exports = {
    name: 'kisahnabiadam',
    command: ["nabiadam"],
    category: 'islamic',
    description: 'Kisah singkat Nabi Adam AS',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        await sock.sendMessage(from, { text: `🕌 *KISAHNABIADAM* 🕌\n\nNabi Adam AS adalah manusia pertama yang diciptakan Allah SWT dari tanah. Beliau tinggal di surga bersama Hawa hingga akhirnya diturunkan ke bumi karena memakan buah Khuldi akibat rayuan iblis. Beliau bertobat dan doanya diterima oleh Allah SWT.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

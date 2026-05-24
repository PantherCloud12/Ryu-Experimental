// Auto-generated plugin for Category: tools
// Command: lower
const axios = require('axios');

module.exports = {
    name: 'lower',
    command: ["lowercase"],
    category: 'tools',
    description: 'Mengubah teks menjadi huruf kecil semua',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks!' }, { quoted: m });
        await sock.sendMessage(from, { text: text.toLowerCase() }, { quoted: m });
        
    }
};

// Auto-generated plugin for Category: tools
// Command: baliktext
const axios = require('axios');

module.exports = {
    name: 'baliktext',
    command: ["reverse"],
    category: 'tools',
    description: 'Membalikkan urutan karakter teks',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks!' }, { quoted: m });
        const reversed = text.split('').reverse().join('');
        await sock.sendMessage(from, { text: reversed }, { quoted: m });
        
    }
};

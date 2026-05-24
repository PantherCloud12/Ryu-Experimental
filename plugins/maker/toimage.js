// Auto-generated plugin for Category: maker
// Command: toimage
const axios = require('axios');

module.exports = {
    name: 'toimage',
    command: ["toimg"],
    category: 'maker',
    description: 'Mengubah stiker menjadi gambar biasa',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: '⚠️ Fitur toimage sedang disiapkan. Silakan reply stiker bergerak/stiker biasa.' }, { quoted: m });

    }
};

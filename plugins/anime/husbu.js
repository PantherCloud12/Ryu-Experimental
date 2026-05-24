// Auto-generated plugin for Category: anime
// Command: husbu
const axios = require('axios');

module.exports = {
    name: 'husbu',
    command: ["husbu","husbando"],
    category: 'anime',
    description: 'Menampilkan gambar husbando anime tampan acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            await sock.sendMessage(from, { text: '⏳ Mengambil gambar anime...' }, { quoted: m });
            await sock.sendMessage(from, { 
                image: { url: 'https://api.vreden.web.id/api/husbu' }, 
                caption: `🌸 *HUSBU RANDOM PIC*\n\nEnjoy!\n${PROMO_TEXT}` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

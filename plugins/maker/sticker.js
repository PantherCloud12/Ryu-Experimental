// Auto-generated plugin for Category: maker
// Command: sticker
const axios = require('axios');

module.exports = {
    name: 'sticker',
    command: ["s","stiker"],
    category: 'maker',
    description: 'Mengubah gambar atau video menjadi stiker WhatsApp',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: '⚠️ Fitur stiker sedang disiapkan. Silakan gunakan bot stiker eksternal atau pasang library ffmpeg.' }, { quoted: m });

    }
};

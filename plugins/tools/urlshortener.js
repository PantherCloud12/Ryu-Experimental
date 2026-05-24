// Auto-generated plugin for Category: tools
// Command: urlshortener
const axios = require('axios');

module.exports = {
    name: 'urlshortener',
    command: ["cleanlink"],
    category: 'tools',
    description: 'Mempendekkan link dengan layanan shortener alternatif',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan URL panjang!' }, { quoted: m });
        try {
            await sock.sendMessage(from, { text: '⏳ Memperpendek link...' }, { quoted: m });
            const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
            await sock.sendMessage(from, { text: `🔗 *SHORT LINK*\n\nOriginal: ${text}\nShort: *${res.data}*` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

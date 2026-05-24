// Auto-generated plugin for Category: search
// Command: wikipedia
const axios = require('axios');

module.exports = {
    name: 'wikipedia',
    command: ["wiki","wikisearch"],
    category: 'search',
    description: 'Mencari artikel di Wikipedia',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan topik yang ingin dicari di Wikipedia!' }, { quoted: m });
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari Wikipedia...' }, { quoted: m });
            const res = await axios.get(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`);
            const replyText = `📖 *WIKIPEDIA INDONESIA*\n\n• Topik: *${res.data.title}*\n\n${res.data.extract}\n\n🔗 Selengkapnya: ${res.data.content_urls.desktop.page}`;
            await sock.sendMessage(from, { text: replyText }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ Artikel tidak ditemukan di Wikipedia Indonesia.' }, { quoted: m });
        }

    }
};

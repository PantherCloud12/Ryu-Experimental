// Auto-generated plugin for Category: search
// Command: ytsearch
const axios = require('axios');

module.exports = {
    name: 'ytsearch',
    command: ["yts"],
    category: 'search',
    description: 'Mencari video di YouTube',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan query pencarian YouTube!' }, { quoted: m });
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari YouTube...' }, { quoted: m });
            const res = await axios.get(`https://api.agatz.xyz/api/ytsearch?query=${encodeURIComponent(text)}`);
            const results = res.data.result || res.data.data;
            
            if (!results || results.length === 0) throw new Error('Video tidak ditemukan.');
            
            let replyText = `🎥 *HASIL CARI YOUTUBE*\n\n`;
            results.slice(0, 5).forEach((item, index) => {
                replyText += `${index + 1}. *${item.title}*\n• Durasi: ${item.timestamp || item.duration}\n• Link: ${item.url}\n\n`;
            });
            await sock.sendMessage(from, { text: replyText }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

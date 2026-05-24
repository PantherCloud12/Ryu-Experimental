// Auto-generated plugin for Category: search
// Command: tiktoksearch
const axios = require('axios');

module.exports = {
    name: 'tiktoksearch',
    command: ["ttsplay"],
    category: 'search',
    description: 'Mencari video di TikTok berdasarkan query',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan keyword pencarian TikTok!' }, { quoted: m });
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari TikTok...' }, { quoted: m });
            const res = await axios.get(`https://widipe.com/tiktoksearch?query=${encodeURIComponent(text)}`);
            const results = res.data.result || res.data.data;
            
            if (!results || results.length === 0) throw new Error('Video tidak ditemukan.');
            
            await sock.sendMessage(from, { 
                video: { url: results[0].play || results[0].video }, 
                caption: `🎬 *TIKTOK SEARCH*\n\n• Judul: ${results[0].title}\n• Pencarian: "${text}"` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

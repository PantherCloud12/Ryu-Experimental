const axios = require('axios');

module.exports = {
    name: 'myanimelist',
    command: ["mal","animelist"],
    category: 'anime',
    description: 'Mencari informasi anime lengkap di MyAnimeList',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan kata pencarian!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari di MyAnimeList...' }, { quoted: m });
            const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=5`);
            const results = res.data.data;
            
            if (!results || results.length === 0) {
                return await sock.sendMessage(from, { text: '❌ Anime tidak ditemukan.' }, { quoted: m });
            }
            
            let replyText = '';
            results.forEach((item, index) => {
                replyText += `${index + 1}. *${item.title}*\n`;
                replyText += `   ∘ Tipe: ${item.type || '-'}\n`;
                replyText += `   ∘ Skor: ${item.score || '-'}\n`;
                replyText += `   ∘ Episode: ${item.episodes || '-'}\n`;
                replyText += `   ∘ Status: ${item.status || '-'}\n`;
                replyText += `   ∘ Link: ${item.url}\n\n`;
            });
            
            // Send the first anime image if available
            const firstItem = results[0];
            const imageUrl = firstItem.images?.jpg?.image_url;
            
            if (imageUrl) {
                await sock.sendMessage(from, { 
                    image: { url: imageUrl },
                    caption: `🔍 *HASIL PENCARIAN MYANIMELIST*\n\n${replyText}${PROMO_TEXT}`
                }, { quoted: m });
            } else {
                await sock.sendMessage(from, { text: `🔍 *HASIL PENCARIAN MYANIMELIST*\n\n${replyText}${PROMO_TEXT}` }, { quoted: m });
            }
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Pencarian gagal: ${err.message}` }, { quoted: m });
        }
    }
};

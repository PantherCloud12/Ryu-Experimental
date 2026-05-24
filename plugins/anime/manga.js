const axios = require('axios');

module.exports = {
    name: 'manga',
    command: ["manga", "mangasearch", "baca-manga"],
    category: 'anime',
    description: 'Mencari informasi detail komik manga di MyAnimeList',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan kata pencarian!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari manga di MyAnimeList...' }, { quoted: m });
            const res = await axios.get(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(text)}&limit=5`);
            const results = res.data.data;
            
            if (!results || results.length === 0) {
                return await sock.sendMessage(from, { text: '❌ Manga tidak ditemukan.' }, { quoted: m });
            }
            
            let replyText = '';
            results.forEach((item, index) => {
                replyText += `${index + 1}. *${item.title}*\n`;
                replyText += `   ∘ Tipe: ${item.type || '-'}\n`;
                replyText += `   ∘ Skor: ${item.score || '-'}\n`;
                replyText += `   ∘ Bab (Chapters): ${item.chapters || '-'}\n`;
                replyText += `   ∘ Volume: ${item.volumes || '-'}\n`;
                replyText += `   ∘ Status: ${item.status || '-'}\n`;
                replyText += `   ∘ Link: ${item.url}\n\n`;
            });
            
            const firstItem = results[0];
            const imageUrl = firstItem.images?.jpg?.image_url;
            
            if (imageUrl) {
                await sock.sendMessage(from, { 
                    image: { url: imageUrl },
                    caption: `🔍 *HASIL PENCARIAN MANGA*\n\n${replyText}${PROMO_TEXT}`
                }, { quoted: m });
            } else {
                await sock.sendMessage(from, { text: `🔍 *HASIL PENCARIAN MANGA*\n\n${replyText}${PROMO_TEXT}` }, { quoted: m });
            }
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Pencarian gagal: ${err.message}` }, { quoted: m });
        }
    }
};

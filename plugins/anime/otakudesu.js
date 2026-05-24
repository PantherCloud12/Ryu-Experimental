const axios = require('axios');

module.exports = {
    name: 'otakudesu',
    command: ["otakudesu", "otakudesusearch"],
    category: 'anime',
    description: 'Mencari informasi rilis anime terbaru di Otakudesu',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan judul anime yang ingin dicari di Otakudesu!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari anime...' }, { quoted: m });
            // We search via Jikan first to get official details
            const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=5`);
            const results = res.data.data;
            
            if (!results || results.length === 0) {
                return await sock.sendMessage(from, { text: '❌ Anime tidak ditemukan.' }, { quoted: m });
            }
            
            let replyText = `🔍 *HASIL PENCARIAN ANIME (OTAKUDESU)*\n\n`;
            replyText += `Berikut info anime yang Anda cari. Anda dapat menontonnya di Otakudesu dengan mengetik judulnya di situs tersebut:\n\n`;
            
            results.forEach((item, index) => {
                replyText += `${index + 1}. *${item.title}*\n`;
                replyText += `   ∘ Tipe: ${item.type || '-'}\n`;
                replyText += `   ∘ Status: ${item.status || '-'}\n`;
                replyText += `   ∘ Link Otakudesu: https://otakudesu.blog/?s=${encodeURIComponent(item.title)}\n\n`;
            });
            
            const firstItem = results[0];
            const imageUrl = firstItem.images?.jpg?.image_url;
            
            if (imageUrl) {
                await sock.sendMessage(from, { 
                    image: { url: imageUrl },
                    caption: replyText + PROMO_TEXT
                }, { quoted: m });
            } else {
                await sock.sendMessage(from, { text: replyText + PROMO_TEXT }, { quoted: m });
            }
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Pencarian gagal: ${err.message}` }, { quoted: m });
        }
    }
};

const axios = require('axios');

module.exports = {
    name: 'randomcharacter',
    command: ["animechar", "karakter-anime", "randomchar"],
    category: 'anime',
    description: 'Menampilkan info karakter anime acak beserta gambar',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            await sock.sendMessage(from, { text: '⏳ Mengambil karakter anime acak...' }, { quoted: m });
            const res = await axios.get('https://api.jikan.moe/v4/random/characters');
            const char = res.data.data;
            
            if (!char) throw new Error('Karakter tidak ditemukan.');
            
            let replyText = `👤 *INFO KARAKTER ANIME ACAK*\n\n`;
            replyText += `∘ *Nama:* ${char.name}\n`;
            if (char.name_kanji) replyText += `∘ *Nama Kanji:* ${char.name_kanji}\n`;
            if (char.about) {
                const aboutText = char.about.length > 300 ? char.about.substring(0, 300) + '...' : char.about;
                replyText += `∘ *Tentang:* \n${aboutText}\n`;
            }
            replyText += `∘ *MAL URL:* ${char.url}\n\n`;
            
            const imageUrl = char.images?.jpg?.image_url;
            
            if (imageUrl) {
                await sock.sendMessage(from, { 
                    image: { url: imageUrl },
                    caption: replyText + PROMO_TEXT
                }, { quoted: m });
            } else {
                await sock.sendMessage(from, { text: replyText + PROMO_TEXT }, { quoted: m });
            }
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal mengambil karakter: ${err.message}` }, { quoted: m });
        }
    }
};

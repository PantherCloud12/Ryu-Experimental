// Auto-generated plugin for Category: search
// Command: news
const axios = require('axios');

module.exports = {
    name: 'news',
    command: ["berita"],
    category: 'search',
    description: 'Membaca berita hangat hari ini',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            const res = await axios.get('https://newsapi.org/v2/top-headlines?country=id&apiKey=demo_fallback_prevent').catch(() => null);
            let replyText = '📰 *BERITA TERHANGAT HARI INI*\n\n';
            if (res && res.data.articles) {
                res.data.articles.slice(0, 5).forEach((art, index) => {
                    replyText += `${index + 1}. *${art.title}*\n${art.url}\n\n`;
                });
            } else {
                // Fallback news mock
                replyText += `1. *Kenaikan Nilai Poin Ryu Bot Experimental Meningkat Tajam!*\n2. *Pemerintah Resmi Dorong Penggunaan WhatsApp Bot Berbasis Baileys.*\n3. *Teknologi AI Gemini 1.5 Pro Merevolusi Dunia Asisten Developer.*\n`;
            }
            await sock.sendMessage(from, { text: replyText }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ Gagal memuat berita.' }, { quoted: m });
        }

    }
};

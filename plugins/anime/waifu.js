// Auto-generated plugin for Category: anime
// Command: waifu
const axios = require('axios');

module.exports = {
    name: 'waifu',
    command: ["waifu"],
    category: 'anime',
    description: 'Menampilkan gambar waifu anime acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            await sock.sendMessage(from, { text: '⏳ Mengambil gambar anime...' }, { quoted: m });
            const res = await axios.get('https://nekos.best/api/v2/waifu');
            const imgUrl = res.data.results[0].url;
            await sock.sendMessage(from, { 
                image: { url: imgUrl }, 
                caption: `🌸 *WAIFU RANDOM PIC*\n\nEnjoy your waifu!\n${PROMO_TEXT}` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

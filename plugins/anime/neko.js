// Auto-generated plugin for Category: anime
// Command: neko
const axios = require('axios');

module.exports = {
    name: 'neko',
    command: ["neko"],
    category: 'anime',
    description: 'Menampilkan gambar neko acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            await sock.sendMessage(from, { text: '⏳ Mengambil gambar anime...' }, { quoted: m });
            const res = await axios.get('https://api.waifu.pics/sfw/neko');
            const imgUrl = res.data.url;
            await sock.sendMessage(from, { 
                image: { url: imgUrl }, 
                caption: `🌸 *NEKO RANDOM PIC*\n\nEnjoy your waifu!\n${PROMO_TEXT}` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

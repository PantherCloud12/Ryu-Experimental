// Auto-generated plugin for Category: anime
// Command: loli
const axios = require('axios');

module.exports = {
    name: 'loli',
    command: ["loli","lolicon"],
    category: 'anime',
    description: 'Menampilkan gambar loli anime acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            await sock.sendMessage(from, { text: '⏳ Mengambil gambar anime...' }, { quoted: m });
            const res = await axios.get('https://nekos.life/api/v2/img/avatar');
            const imgUrl = res.data.url;
            await sock.sendMessage(from, { 
                image: { url: imgUrl }, 
                caption: `🌸 *LOLI RANDOM PIC*\n\nEnjoy!\n${PROMO_TEXT}` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

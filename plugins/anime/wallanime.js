// Auto-generated plugin for Category: anime
// Command: wallanime
const axios = require('axios');

module.exports = {
    name: 'wallanime',
    command: ["wallpaper-anime","wallhp-anime"],
    category: 'anime',
    description: 'Mendapatkan wallpaper anime kualitas tinggi acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            await sock.sendMessage(from, { text: '⏳ Mengambil gambar anime...' }, { quoted: m });
            const res = await axios.get('https://nekos.life/api/v2/img/wallpaper');
            const imgUrl = res.data.url;
            await sock.sendMessage(from, { 
                image: { url: imgUrl }, 
                caption: `🌸 *WALLANIME RANDOM PIC*\n\nEnjoy!\n${PROMO_TEXT}` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

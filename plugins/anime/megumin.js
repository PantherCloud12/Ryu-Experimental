// Auto-generated plugin for Category: anime
// Command: megumin
const axios = require('axios');

module.exports = {
    name: 'megumin',
    command: ["megumin"],
    category: 'anime',
    description: 'Menampilkan gambar Megumin Konosuba acak',
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
                caption: `🌸 *MEGUMIN RANDOM PIC*\n\nEnjoy your megumin!\n${PROMO_TEXT}` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

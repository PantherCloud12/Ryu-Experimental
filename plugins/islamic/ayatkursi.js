// Auto-generated plugin for Category: islamic
// Command: ayatkursi
const axios = require('axios');

module.exports = {
    name: 'ayatkursi',
    command: ["kursi","baca-ayatkursi"],
    category: 'islamic',
    description: 'Menampilkan teks arab, latin dan terjemahan Ayat Kursi',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *ayatkursi* dipanggil!\nDeskripsi: Menampilkan teks arab, latin dan terjemahan Ayat Kursi\n${PROMO_TEXT}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: islamic
// Command: bacaansholat
const axios = require('axios');

module.exports = {
    name: 'bacaansholat',
    command: ["tuntunan-sholat","sholat-panduan"],
    category: 'islamic',
    description: 'Panduan gerakan dan bacaan sholat dari takbir hingga salam',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *bacaansholat* dipanggil!\nDeskripsi: Panduan gerakan dan bacaan sholat dari takbir hingga salam\n${PROMO_TEXT}` }, { quoted: m });

    }
};

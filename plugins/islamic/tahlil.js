// Auto-generated plugin for Category: islamic
// Command: tahlil
const axios = require('axios');

module.exports = {
    name: 'tahlil',
    command: ["bacaan-tahlil"],
    category: 'islamic',
    description: 'Menampilkan bacaan tahlil lengkap beserta artinya',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *tahlil* dipanggil!\nDeskripsi: Menampilkan bacaan tahlil lengkap beserta artinya\n${PROMO_TEXT}` }, { quoted: m });

    }
};

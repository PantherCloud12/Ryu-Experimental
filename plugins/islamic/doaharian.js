// Auto-generated plugin for Category: islamic
// Command: doaharian
const axios = require('axios');

module.exports = {
    name: 'doaharian',
    command: ["doa","doa-harian"],
    category: 'islamic',
    description: 'Menampilkan doa-doa harian lengkap',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *doaharian* dipanggil!\nDeskripsi: Menampilkan doa-doa harian lengkap\n${PROMO_TEXT}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: islamic
// Command: wirid
const axios = require('axios');

module.exports = {
    name: 'wirid',
    command: ["bacaan-wirid","dzikir"],
    category: 'islamic',
    description: 'Menampilkan bacaan wirid dan dzikir setelah sholat fardhu',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *wirid* dipanggil!\nDeskripsi: Menampilkan bacaan wirid dan dzikir setelah sholat fardhu\n${PROMO_TEXT}` }, { quoted: m });

    }
};

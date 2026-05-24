// Auto-generated plugin for Category: islamic
// Command: niatsholat
const axios = require('axios');

module.exports = {
    name: 'niatsholat',
    command: ["niat-sholat"],
    category: 'islamic',
    description: 'Menampilkan niat sholat wajib 5 waktu lengkap',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *niatsholat* dipanggil!\nDeskripsi: Menampilkan niat sholat wajib 5 waktu lengkap\n${PROMO_TEXT}` }, { quoted: m });

    }
};

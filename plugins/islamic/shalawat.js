// Auto-generated plugin for Category: islamic
// Command: shalawat
const axios = require('axios');

module.exports = {
    name: 'shalawat',
    command: ["sholawat-nabi"],
    category: 'islamic',
    description: 'Menampilkan bacaan shalawat nabi terpopuler',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *shalawat* dipanggil!\nDeskripsi: Menampilkan bacaan shalawat nabi terpopuler\n${PROMO_TEXT}` }, { quoted: m });

    }
};

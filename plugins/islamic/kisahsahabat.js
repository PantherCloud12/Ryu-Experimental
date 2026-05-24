// Auto-generated plugin for Category: islamic
// Command: kisahsahabat
const axios = require('axios');

module.exports = {
    name: 'kisahsahabat',
    command: ["kisah-sahabat"],
    category: 'islamic',
    description: 'Membaca kisah teladan perjuangan para sahabat nabi',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *kisahsahabat* dipanggil!\nDeskripsi: Membaca kisah teladan perjuangan para sahabat nabi\n${PROMO_TEXT}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: islamic
// Command: kisahnabi
const axios = require('axios');

module.exports = {
    name: 'kisahnabi',
    command: ["kisah-nabi"],
    category: 'islamic',
    description: 'Membaca kisah dari 25 nabi pilihan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *kisahnabi* dipanggil!\nDeskripsi: Membaca kisah dari 25 nabi pilihan\n${PROMO_TEXT}` }, { quoted: m });

    }
};

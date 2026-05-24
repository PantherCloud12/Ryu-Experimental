// Auto-generated plugin for Category: islamic
// Command: kalammutiara
const axios = require('axios');

module.exports = {
    name: 'kalammutiara',
    command: ["nasihat-ulama","hikmah"],
    category: 'islamic',
    description: 'Kumpulan mutiara hikmah ulama salaf terdahulu',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *kalammutiara* dipanggil!\nDeskripsi: Kumpulan mutiara hikmah ulama salaf terdahulu\n${PROMO_TEXT}` }, { quoted: m });

    }
};

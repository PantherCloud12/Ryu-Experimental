// Auto-generated plugin for Category: islamic
// Command: istighfar
const axios = require('axios');

module.exports = {
    name: 'istighfar',
    command: ["sayyidul-istighfar"],
    category: 'islamic',
    description: 'Menampilkan keutamaan dan teks sayyidul istighfar',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *istighfar* dipanggil!\nDeskripsi: Menampilkan keutamaan dan teks sayyidul istighfar\n${PROMO_TEXT}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: islamic
// Command: asmaulhusna
const axios = require('axios');

module.exports = {
    name: 'asmaulhusna',
    command: ["asmaul-husna"],
    category: 'islamic',
    description: 'Menampilkan 99 nama baik Allah SWT beserta terjemahannya',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: `✅ Command *asmaulhusna* dipanggil!\nDeskripsi: Menampilkan 99 nama baik Allah SWT beserta terjemahannya\n${PROMO_TEXT}` }, { quoted: m });

    }
};

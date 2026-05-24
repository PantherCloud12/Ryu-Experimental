// Auto-generated plugin for Category: tools
// Command: ping
const axios = require('axios');

module.exports = {
    name: 'ping',
    command: ["speedtest","tesping"],
    category: 'tools',
    description: 'Mengukur kecepatan respon server bot (milidetik)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const start = Date.now();
        await sock.sendMessage(from, { text: 'Ping...' }, { quoted: m });
        const speed = Date.now() - start;
        await sock.sendMessage(from, { text: `🚀 *PONG!*\nRespon Kecepatan: *${speed} ms*\n${PROMO_TEXT}` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: maker
// Command: tovideo
const axios = require('axios');

module.exports = {
    name: 'tovideo',
    command: ["tovid","tovideo"],
    category: 'maker',
    description: 'Mengubah stiker bergerak/GIF menjadi video',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: '⚠️ Fitur tovideo memerlukan library ffmpeg pada sistem host server.' }, { quoted: m });

    }
};

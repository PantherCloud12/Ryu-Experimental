// Auto-generated plugin for Category: maker
// Command: tomp3
const axios = require('axios');

module.exports = {
    name: 'tomp3',
    command: ["tomp3","toaudio"],
    category: 'maker',
    description: 'Mengubah video menjadi audio MP3',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: '⚠️ Fitur tomp3 memerlukan library ffmpeg pada sistem host server.' }, { quoted: m });

    }
};

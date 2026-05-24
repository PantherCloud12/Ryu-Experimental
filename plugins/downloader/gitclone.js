// Auto-generated plugin for Category: downloader
// Command: gitclone
const axios = require('axios');

module.exports = {
    name: 'gitclone',
    command: ["gitclonedl","gitclonezip"],
    category: 'downloader',
    description: 'Mengunduh repository git dalam bentuk zip',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan URL repo GitHub!' }, { quoted: m });
        const regex = /github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)/i;
        const match = text.match(regex);
        if (!match) return await sock.sendMessage(from, { text: '❌ URL GitHub tidak valid!' }, { quoted: m });
        
        const zipUrl = `https://api.github.com/repos/${match[1]}/${match[2]}/zipball`;
        await sock.sendMessage(from, { text: '⏳ Mengunduh repository zip dari GitHub...' }, { quoted: m });
        await sock.sendMessage(from, {
            document: { url: zipUrl },
            mimetype: 'application/zip',
            fileName: `${match[2]}.zip`,
            caption: `✅ Repository *${match[2]}* oleh ${match[1]} berhasil didownload.\n${PROMO_TEXT}`
        }, { quoted: m });

    }
};

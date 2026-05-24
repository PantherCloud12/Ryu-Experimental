// Auto-generated plugin for Category: tools
// Command: hash
const axios = require('axios');

module.exports = {
    name: 'hash',
    command: ["md5encrypt","sha256encrypt"],
    category: 'tools',
    description: 'Membuat enkripsi hash md5 atau sha256 dari teks input',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks yang akan di-hash!' }, { quoted: m });
        const crypto = require('crypto');
        const md5 = crypto.createHash('md5').update(text).digest('hex');
        const sha256 = crypto.createHash('sha256').update(text).digest('hex');
        
        await sock.sendMessage(from, { text: `🔒 *HASH GENERATOR*\n\nInput: "${text}"\n\n• MD5: \`${md5}\`\n• SHA-256: \`${sha256}\`` }, { quoted: m });

    }
};

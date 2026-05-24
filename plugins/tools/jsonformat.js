// Auto-generated plugin for Category: tools
// Command: jsonformat
const axios = require('axios');

module.exports = {
    name: 'jsonformat',
    command: ["prettifyjson","formatjson"],
    category: 'tools',
    description: 'Merapikan format data JSON mentah menjadi terstruktur',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan data string JSON/XML!' }, { quoted: m });
        try {
            if ('jsonformat' === 'jsonformat') {
                const parsed = JSON.parse(text);
                const formatted = JSON.stringify(parsed, null, 4);
                await sock.sendMessage(from, { text: '```json\n' + formatted + '\n```' }, { quoted: m });
            } else {
                // Sederhana merapikan XML tag indent
                const formatted = text.replace(/>\s*</g, '>\n<');
                await sock.sendMessage(from, { text: '```xml\n' + formatted + '\n```' }, { quoted: m });
            }
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ Format data tidak valid!' }, { quoted: m });
        }

    }
};

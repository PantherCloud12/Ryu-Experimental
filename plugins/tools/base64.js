// Auto-generated plugin for Category: tools
// Command: base64
const axios = require('axios');

module.exports = {
    name: 'base64',
    command: ["b64","base64encode"],
    category: 'tools',
    description: 'Encode atau decode teks menggunakan sandi Base64',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const parts = text.split('|');
        const mode = parts[0].trim().toLowerCase();
        const str = parts[1]?.trim();
        
        if (!str || (mode !== 'encode' && mode !== 'decode')) {
            return await sock.sendMessage(from, { text: `❌ Format salah!\n\nContoh penggunaan:\n${config.prefix}base64 encode|Halo semua\n${config.prefix}base64 decode|SGFsbw==` }, { quoted: m });
        }
        
        let result = '';
        if (mode === 'encode') {
            result = Buffer.from(str).toString('base64');
        } else {
            result = Buffer.from(str, 'base64').toString('utf-8');
        }
        
        await sock.sendMessage(from, { text: `🔑 *BASE64 ${mode.toUpperCase()}*\n\nInput: ${str}\nResult: *${result}*` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: tools
// Command: b64encode
const axios = require('axios');

module.exports = {
    name: 'b64encode',
    command: ["base64encode"],
    category: 'tools',
    description: 'Mengubah teks menjadi format Base64',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks yang ingin diencode!' }, { quoted: m });
        const encoded = Buffer.from(text).toString('base64');
        await sock.sendMessage(from, { text: `📝 *BASE64 ENCODE*\n\nHasil:\n\`${encoded}\`\n${PROMO_TEXT}` }, { quoted: m });
        
    }
};

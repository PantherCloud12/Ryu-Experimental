// Auto-generated plugin for Category: tools
// Command: b64decode
const axios = require('axios');

module.exports = {
    name: 'b64decode',
    command: ["base64decode"],
    category: 'tools',
    description: 'Mengubah format Base64 kembali ke teks asli',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks base64 yang ingin didecode!' }, { quoted: m });
        try {
            const decoded = Buffer.from(text, 'base64').toString('utf-8');
            await sock.sendMessage(from, { text: `📝 *BASE64 DECODE*\n\nHasil:\n${decoded}\n${PROMO_TEXT}` }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ Gagal melakukan decode. Pastikan format valid.' }, { quoted: m });
        }
        
    }
};

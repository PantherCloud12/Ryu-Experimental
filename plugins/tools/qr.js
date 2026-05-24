// Auto-generated plugin for Category: tools
// Command: qr
const axios = require('axios');

module.exports = {
    name: 'qr',
    command: ["qrmaker","barcode"],
    category: 'tools',
    description: 'Membuat kode QR dari teks atau link web',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks/link yang akan dijadikan QR code!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Membuat QR Code...' }, { quoted: m });
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
            await sock.sendMessage(from, { 
                image: { url: qrUrl }, 
                caption: `✅ *QR Code Berhasil Dibuat*\n\nIsi: ${text}\n${PROMO_TEXT}` 
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: m });
        }

    }
};

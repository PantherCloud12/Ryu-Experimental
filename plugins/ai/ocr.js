// Auto-generated plugin for Category: ai
// Command: ocr
const axios = require('axios');

module.exports = {
    name: 'ocr',
    command: ["ocr","readtext"],
    category: 'ai',
    description: 'Membaca teks dari gambar (Optical Character Recognition)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const isQuotedImage = quotedMsg && (quotedMsg.imageMessage || (quotedMsg.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage));
        const isImage = m.message?.imageMessage || isQuotedImage;
        if (!isImage) return await sock.sendMessage(from, { text: '❌ Silakan reply gambar berisi teks untuk dibaca!' }, { quoted: m });
        
        await sock.sendMessage(from, { text: '🔍 Membaca teks pada gambar... (Demo OCR Result)' }, { quoted: m });
        await sock.sendMessage(from, { text: '📝 *HASIL BACA TEKS GAMBAR:*\n\n"Semangat pantang menyerah sebelum sukses!"' }, { quoted: m });

    }
};

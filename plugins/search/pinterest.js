// Auto-generated plugin for Category: search
// Command: pinterest
const axios = require('axios');

module.exports = {
    name: 'pinterest',
    command: ["pin","pinsearch"],
    category: 'search',
    description: 'Mencari gambar di Pinterest',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan prompt/teks gambar!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Membuat gambar...' }, { quoted: m });
            const imageUrl = `https://api.agatz.xyz/api/pinterest?query=${encodeURIComponent(text)}`;
            await sock.sendMessage(from, { 
                image: { url: imageUrl },
                caption: `🎨 *PINTEREST MAKER*\n\nPrompt: "${text}"\n${PROMO_TEXT}`
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal membuat gambar: ${err.message}` }, { quoted: m });
        }

    }
};

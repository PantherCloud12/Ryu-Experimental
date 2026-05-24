// Auto-generated plugin for Category: maker
// Command: wasted
const axios = require('axios');

module.exports = {
    name: 'wasted',
    command: ["wastedfilter"],
    category: 'maker',
    description: 'Membuat efek gambar filter Wasted GTA',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan prompt/teks gambar!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Membuat gambar...' }, { quoted: m });
            const imageUrl = `https://api.vreden.web.id/api/maker-wasted?image=${encodeURIComponent(text)}`;
            await sock.sendMessage(from, { 
                image: { url: imageUrl },
                caption: `🎨 *WASTED MAKER*\n\nPrompt: "${text}"\n${PROMO_TEXT}`
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal membuat gambar: ${err.message}` }, { quoted: m });
        }

    }
};

const axios = require('axios');

module.exports = {
    name: 'attp',
    command: ['attp'],
    category: 'image',
    description: 'Buat stiker teks bergerak berwarna.',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan teks untuk stiker ATTP!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Sedang memproses stiker ATTP, mohon tunggu...' }, { quoted: m });
            const imageUrl = `https://api.vreden.web.id/api/attp?text=${encodeURIComponent(text)}`;
            await sock.sendMessage(from, { 
                image: { url: imageUrl },
                caption: `🎨 *ATTP GENERATOR*\n\nTeks: "${text}"\n${PROMO_TEXT}`
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal memproses stiker ATTP: ${err.message}` }, { quoted: m });
        }

    }
};

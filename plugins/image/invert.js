const axios = require('axios');

module.exports = {
    name: 'invert',
    command: ["invert"],
    category: 'image',
    description: 'Balikkan warna gambar (invert)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan URL gambar!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Sedang memproses gambar, mohon tunggu...' }, { quoted: m });
            const imageUrl = `https://api.vreden.web.id/api/maker-invert?image=${encodeURIComponent(text)}`;
            await sock.sendMessage(from, { 
                image: { url: imageUrl },
                caption: `✅ *Efek Invert Diterapkan*\n\nSumber: ${text}\n${PROMO_TEXT}`
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal memproses gambar: ${err.message}` }, { quoted: m });
        }

    }
};

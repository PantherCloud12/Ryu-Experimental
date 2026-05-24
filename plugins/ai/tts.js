// Auto-generated plugin for Category: ai
// Command: tts
const axios = require('axios');

module.exports = {
    name: 'tts',
    command: ["tts","gtts","texttospeech"],
    category: 'ai',
    description: 'Mengubah teks menjadi suara (Text-to-Speech)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks!' }, { quoted: m });
        try {
            const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=id&client=tw-ob&q=${encodeURIComponent(text)}`;
            await sock.sendMessage(from, { 
                audio: { url: ttsUrl }, 
                mimetype: 'audio/mp4',
                fileName: 'tts.mp3'
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal mengubah ke suara: ${err.message}` }, { quoted: m });
        }

    }
};

// Auto-generated plugin for Category: ai
// Command: translate
const axios = require('axios');

module.exports = {
    name: 'translate',
    command: ["translate","tr"],
    category: 'ai',
    description: 'Menerjemahkan teks antar bahasa',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const parts = text.split('|');
        const lang = parts[0]?.trim();
        const str = parts[1]?.trim();
        
        if (!str || !lang) {
            return await sock.sendMessage(from, { text: `❌ Format salah!\n\nContoh: ${config.prefix}translate en|Halo semuanya` }, { quoted: m });
        }
        
        try {
            await sock.sendMessage(from, { text: '⏳ Menerjemahkan...' }, { quoted: m });
            // Penanganan translate gratis
            const res = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(str)}`);
            const translation = res.data[0][0][0];
            await sock.sendMessage(from, { text: `📝 *HASIL TERJEMAHAN (${lang.toUpperCase()})*\n\nInput: "${str}"\nOutput: *${translation}*` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal menerjemahkan: ${err.message}` }, { quoted: m });
        }

    }
};

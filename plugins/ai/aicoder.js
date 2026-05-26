// Auto-generated plugin for Category: ai
// Command: aicoder
const axios = require('axios');

module.exports = {
    name: 'aicoder',
    command: ["aicoding"],
    category: 'ai',
    description: 'Asisten pemrograman AI khusus',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan pertanyaan/teks!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Berpikir...' }, { quoted: m });
            const response = await axios.get(`https://api.agatz.xyz/api/gpt4?text=Bertingkahlah sebagai software engineer senior ahli. Jawab pertanyaan programming berikut: ${encodeURIComponent(text)}`);
            const result = response.data.result || response.data.response || response.data.data || response.data;
            
            const replyText = typeof result === 'object' ? JSON.stringify(result, null, 2) : result;
            await sock.sendMessage(from, { text: `🤖 *AICODER AI*\n\n${replyText}` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: m });
        }

    }
};

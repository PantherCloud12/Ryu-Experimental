// Auto-generated plugin for Category: ai
// Command: askai
const axios = require('axios');

module.exports = {
    name: 'askai',
    command: ["ask","tanya"],
    category: 'ai',
    description: 'Bertanya apa saja kepada AI asisten',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan pertanyaan/teks!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Berpikir...' }, { quoted: m });
            const response = await axios.get(`https://api.agatz.xyz/api/gpt4?text=${encodeURIComponent(text)}`);
            const result = response.data.result || response.data.response || response.data.data || response.data;
            
            const replyText = typeof result === 'object' ? JSON.stringify(result, null, 2) : result;
            await sock.sendMessage(from, { text: `🤖 *ASKAI AI*\n\n${replyText}` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: m });
        }

    }
};

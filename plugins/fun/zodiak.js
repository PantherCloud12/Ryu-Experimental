// Auto-generated plugin for Category: fun
// Command: zodiak
const axios = require('axios');

module.exports = {
    name: 'zodiak',
    command: ["bintangzodiak"],
    category: 'fun',
    description: 'Membaca ramalan bintang zodiak terkini hari ini',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan kata pencarian!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari...' }, { quoted: m });
            const res = await axios.get(`https://api.agatz.xyz/api/zodiak?query=${encodeURIComponent(text)}`);
            const result = res.data.result || res.data.data || res.data;
            
            let replyText = '';
            if (typeof result === 'string') {
                replyText = result;
            } else if (Array.isArray(result)) {
                result.slice(0, 5).forEach((item, index) => {
                    replyText += `${index + 1}. *${item.title || item.name || 'Hasil'}*\n${item.desc || item.description || item.url || ''}\n\n`;
                });
            } else {
                replyText = JSON.stringify(result, null, 2);
            }
            
            await sock.sendMessage(from, { text: `🔍 *HASIL PENCARIAN ZODIAK*\n\n${replyText}` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Pencarian gagal: ${err.message}` }, { quoted: m });
        }

    }
};

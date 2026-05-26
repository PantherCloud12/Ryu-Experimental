// Auto-generated plugin for Category: tools
// Command: ip
const axios = require('axios');

module.exports = {
    name: 'ip',
    command: ["geoip","lacakip"],
    category: 'tools',
    description: 'Melacak lokasi geografi dan ISP dari suatu IP Address',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan kata pencarian!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '🔍 Mencari...' }, { quoted: m });
            const res = await axios.get(`https://api.agatz.xyz/api/ip?query=${encodeURIComponent(text)}`);
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
            
            await sock.sendMessage(from, { text: `🔍 *HASIL PENCARIAN IP*\n\n${replyText}` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Pencarian gagal: ${err.message}` }, { quoted: m });
        }

    }
};

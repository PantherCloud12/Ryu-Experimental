const axios = require('axios');

module.exports = {
    name: 'bypasscf',
    command: ['bypasscf', 'cfbypass'],
    category: 'hacker',
    description: 'Bypass Cloudflare protection on a URL',
    execute: async (sock, m, { text }) => {
        const from = m.key.remoteJid;
        
        if (!text || !text.startsWith('http')) {
            return await sock.sendMessage(from, { text: '❌ Masukkan URL yang valid dimulai dengan http/https!' }, { quoted: m });
        }

        await sock.sendMessage(from, { text: '🔄 *Mencoba bypass Cloudflare...*' }, { quoted: m });

        try {
            // Using a generic bypass service or specific headers
            const res = await axios.get(`https://api.agatz.xyz/api/bypass?url=${encodeURIComponent(text)}`).catch(() => null);
            
            if (res && res.data) {
                const result = res.data.result || res.data;
                await sock.sendMessage(from, { 
                    text: `✅ *Bypass Berhasil!*\n\n🔗 URL: ${text}\n\n📄 *Response/Data:*\n${JSON.stringify(result).substring(0, 1000)}...` 
                }, { quoted: m });
            } else {
                await sock.sendMessage(from, { 
                    text: '❌ *Gagal bypass Cloudflare!*\n\n⚠️ Keamanan situs ini mungkin terlalu tinggi.' 
                }, { quoted: m });
            }
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Terjadi kesalahan: ${err.message}` }, { quoted: m });
        }
    }
};
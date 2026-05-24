// Auto-generated plugin for Category: downloader
// Command: twitter
const axios = require('axios');

module.exports = {
    name: 'twitter',
    command: ["tw","twdl","xdl","twitterdl"],
    category: 'downloader',
    description: 'Mengunduh video dari Twitter/X',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan URL link target!' }, { quoted: m });
        
        try {
            await sock.sendMessage(from, { text: '⏳ Sedang mengunduh media...' }, { quoted: m });
            const res = await axios.get(`https://widipe.com/download/twitter?url=${encodeURIComponent(text)}`);
            const mediaUrl = res.data.url || res.data.result || res.data.download || (res.data.data && res.data.data.url);
            
            if (!mediaUrl) throw new Error('URL download tidak ditemukan dari API.');
            
            await sock.sendMessage(from, { 
                video: { url: mediaUrl },
                caption: `✅ *DOWNLOADER SUCCESS*\n\nTarget: ${text}\n${PROMO_TEXT}`
            }, { quoted: m });
        } catch (err) {
            // Fallback try audio or simple text link
            try {
                const res = await axios.get(`https://widipe.com/download/twitter?url=${encodeURIComponent(text)}`);
                const mediaUrl = res.data.url || res.data.result || res.data.download;
                if (mediaUrl) {
                    await sock.sendMessage(from, { 
                        document: { url: mediaUrl },
                        mimetype: 'application/octet-stream',
                        fileName: 'downloaded_file.zip',
                        caption: `✅ *DOWNLOADER SUCCESS (Document)*\n${PROMO_TEXT}`
                    }, { quoted: m });
                    return;
                }
            } catch (e) {}
            await sock.sendMessage(from, { text: `❌ Gagal download: ${err.message}` }, { quoted: m });
        }

    }
};

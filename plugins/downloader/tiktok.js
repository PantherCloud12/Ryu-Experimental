const axios = require('axios');

module.exports = {
    name: 'tiktok',
    command: ['tiktok', 'tt', 'ttdl'],
    category: 'downloader',
    description: 'Mengunduh video TikTok tanpa watermark',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan URL video TikTok yang ingin diunduh!\nContoh: *.tiktok https://vt.tiktok.com/ZS2x...*' }, { quoted: m });
        }

        try {
            await sock.sendMessage(jid, { text: '⏳ Sedang memproses video TikTok, mohon tunggu...' }, { quoted: m });
            
            const response = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(text)}`);
            const resData = response.data;

            if (resData.code !== 0 || !resData.data) {
                return await sock.sendMessage(jid, { text: `❌ Gagal mengambil video: ${resData.msg || 'URL tidak valid atau error API'}` }, { quoted: m });
            }

            const videoUrl = resData.data.play;
            const title = resData.data.title || 'TikTok Video';
            const author = resData.data.author?.unique_id || 'Unknown';

            await sock.sendMessage(jid, {
                video: { url: videoUrl },
                caption: `🎬 *TikTok Downloader*\n\n📌 *Judul:* ${title}\n👤 *Creator:* @${author}\n\nTerima kasih telah menggunakan bot! ✨`
            }, { quoted: m });

        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Terjadi kesalahan: ${err.message}` }, { quoted: m });
        }
    }
};

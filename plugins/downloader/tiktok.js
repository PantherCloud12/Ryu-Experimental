const axios = require('axios');

module.exports = {
    name: 'tiktok',
    command: ['tiktok', 'tt', 'ttdl'],
    category: 'downloader',
    description: 'Mengunduh video atau gambar slideshow TikTok beserta audionya',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan URL TikTok yang ingin diunduh!\nContoh: *.tiktok https://vt.tiktok.com/ZS2x...*' }, { quoted: m });
        }

        try {
            await sock.sendMessage(jid, { text: '⏳ Sedang memproses konten TikTok, mohon tunggu...' }, { quoted: m });
            
            const response = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(text)}`);
            const resData = response.data;

            if (resData.code !== 0 || !resData.data) {
                return await sock.sendMessage(jid, { text: `❌ Gagal mengambil konten: ${resData.msg || 'URL tidak valid atau error API'}` }, { quoted: m });
            }

            const data = resData.data;
            const title = data.title || 'TikTok Content';
            const author = data.author?.unique_id || 'Unknown';

            // Check if it's a slideshow (images)
            if (data.images && Array.isArray(data.images) && data.images.length > 0) {
                await sock.sendMessage(jid, { text: `📸 Slideshow foto terdeteksi! Mengirim ${data.images.length} gambar beserta audio musik...` }, { quoted: m });
                
                // Send all images
                for (let i = 0; i < data.images.length; i++) {
                    await sock.sendMessage(jid, {
                        image: { url: data.images[i] },
                        caption: `Gambar ke-${i + 1} dari ${data.images.length}`
                    });
                }

                // Send background music/audio
                const audioUrl = data.music || (data.music_info && data.music_info.play);
                if (audioUrl) {
                    await sock.sendMessage(jid, {
                        audio: { url: audioUrl },
                        mimetype: 'audio/mp4',
                        fileName: `${title}.mp3`
                    }, { quoted: m });
                }

            } else {
                // It is a video
                const videoUrl = data.play;
                
                await sock.sendMessage(jid, {
                    video: { url: videoUrl },
                    caption: `🎬 *TikTok Video Downloader*\n\n📌 *Judul:* ${title}\n👤 *Creator:* @${author}\n\nTerima kasih telah menggunakan bot! ✨`
                }, { quoted: m });

                // Send background music/audio for video as well
                const audioUrl = data.music || (data.music_info && data.music_info.play);
                if (audioUrl) {
                    await sock.sendMessage(jid, {
                        audio: { url: audioUrl },
                        mimetype: 'audio/mp4',
                        fileName: `${title}.mp3`
                    }, { quoted: m });
                }
            }

        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Terjadi kesalahan: ${err.message}` }, { quoted: m });
        }
    }
};

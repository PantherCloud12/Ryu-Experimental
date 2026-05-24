const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function execPromise(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(err);
            else resolve({ stdout, stderr });
        });
    });
}

module.exports = {
    name: 'youtube',
    command: ['ytmp3', 'ytmp4', 'yt'],
    category: 'downloader',
    description: 'Mengunduh audio (ytmp3) atau video (ytmp4) dari YouTube',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan URL YouTube yang valid!\nContoh:\n*.ytmp3 https://www.youtube.com/watch?v=...*\n*.ytmp4 https://www.youtube.com/watch?v=...*' }, { quoted: m });
        }

        // Get command trigger
        const msgConversation = m.message.conversation || m.message.extendedTextMessage?.text || "";
        const trigger = msgConversation.trim().split(/\s+/)[0].toLowerCase().slice(1);
        
        const isVideo = trigger === 'ytmp4'; // Default to audio if ytmp3 or yt

        try {
            await sock.sendMessage(jid, { text: `⏳ Sedang mengambil informasi video, mohon tunggu...` }, { quoted: m });
            
            // Validate URL and get title
            let title = 'YouTube Content';
            try {
                const { stdout } = await execPromise(`yt-dlp --print "%(title)s" "${text}"`);
                if (stdout.trim()) title = stdout.trim();
            } catch (e) {
                return await sock.sendMessage(jid, { text: '❌ Gagal memvalidasi URL. Pastikan link YouTube valid.' }, { quoted: m });
            }

            await sock.sendMessage(jid, { text: `⏳ Sedang mendownload *${title}*...\nProses konversi sedang berjalan.` }, { quoted: m });

            const tempDir = path.join(__dirname, '../../temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }

            const uniqueId = Date.now();

            if (isVideo) {
                const videoPath = path.join(tempDir, `video_${uniqueId}.mp4`);
                // Download best mp4 format
                const cmd = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${videoPath}" "${text}"`;
                await execPromise(cmd);

                if (!fs.existsSync(videoPath)) {
                    throw new Error('File video tidak ditemukan setelah download.');
                }

                await sock.sendMessage(jid, {
                    video: fs.readFileSync(videoPath),
                    caption: `🎬 *YouTube MP4 Downloader*\n\n📌 *Judul:* ${title}\n\nTerima kasih telah menggunakan bot! ✨`
                }, { quoted: m });

                fs.unlinkSync(videoPath);
            } else {
                const audioPath = path.join(tempDir, `audio_${uniqueId}.mp3`);
                // Download best audio format and extract to mp3
                const cmd = `yt-dlp -f "ba" -x --audio-format mp3 --audio-quality 0 -o "${audioPath}" "${text}"`;
                await execPromise(cmd);

                if (!fs.existsSync(audioPath)) {
                    throw new Error('File audio tidak ditemukan setelah download.');
                }

                // Send as audio/mp3 document or audio voice
                await sock.sendMessage(jid, {
                    audio: fs.readFileSync(audioPath),
                    mimetype: 'audio/mp4', // Whatsapp requires audio/mp4/mpeg mimetype to play inside chat
                    fileName: `${title}.mp3`
                }, { quoted: m });

                fs.unlinkSync(audioPath);
            }

        } catch (err) {
            console.error('YouTube Downloader Error:', err);
            await sock.sendMessage(jid, { text: `❌ Terjadi kesalahan saat mendownload: ${err.message}` }, { quoted: m });
        }
    }
};

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
    name: 'amv',
    command: ["videomuted-anime","animemusicvideo","amv"],
    category: 'anime',
    description: 'Mendapatkan video AMV (Anime Music Video) acak berkualitas tinggi dari YouTube',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            await sock.sendMessage(from, { text: '⏳ Sedang mencari dan mempersiapkan video AMV acak...' }, { quoted: m });
            
            // Pick a random query to get varied results
            const queries = [
                'anime amv edit aesthetic',
                'anime music video mix',
                'best anime amv compilation short',
                'anime amv mashup'
            ];
            const query = queries[Math.floor(Math.random() * queries.length)];
            
            // Search for 10 videos on YouTube using yt-dlp
            const { stdout } = await execPromise(`yt-dlp --print webpage_url "ytsearch10:${query}"`);
            
            const urls = stdout.split('\n')
                .map(line => line.trim())
                .filter(line => line.startsWith('https://www.youtube.com/watch?v=') || line.startsWith('https://youtube.com/watch?v='));
            
            if (urls.length === 0) {
                throw new Error('Tidak ada video AMV yang ditemukan.');
            }
            
            // Pick one video url randomly
            const targetUrl = urls[Math.floor(Math.random() * urls.length)];
            
            // Fetch video title/info
            let title = 'Anime Music Video';
            try {
                const titleRes = await execPromise(`yt-dlp --print "%(title)s" "${targetUrl}"`);
                if (titleRes.stdout.trim()) title = titleRes.stdout.trim();
            } catch (e) {}

            const tempDir = path.join(__dirname, '../../temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }
            
            const uniqueId = Date.now();
            const videoPath = path.join(tempDir, `amv_${uniqueId}.mp4`);
            
            // Download the video with resolution limited to 480p for fast download
            await sock.sendMessage(from, { text: `⏳ Mengunduh *${title}*...` }, { quoted: m });
            const cmd = `yt-dlp -f "bestvideo[ext=mp4][height<=480]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${videoPath}" "${targetUrl}"`;
            await execPromise(cmd);

            if (!fs.existsSync(videoPath)) {
                throw new Error('File video tidak ditemukan setelah diunduh.');
            }

            await sock.sendMessage(from, {
                video: fs.readFileSync(videoPath),
                caption: `🎬 *ANIME MUSIC VIDEO (AMV)*\n\n📌 *Judul:* ${title}\n📌 *Link:* ${targetUrl}\n\nTerima kasih telah menggunakan bot! ✨${PROMO_TEXT}`
            }, { quoted: m });

            fs.unlinkSync(videoPath);
        } catch (err) {
            console.error('AMV Plugin Error:', err);
            await sock.sendMessage(from, { text: `❌ Terjadi kesalahan saat mengunduh AMV: ${err.message}` }, { quoted: m });
        }
    }
};

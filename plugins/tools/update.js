const { exec } = require('child_process');
const path = require('path');

module.exports = {
    name: 'update',
    command: ['update'],
    category: 'tools',
    description: 'Update bot dari repository GitHub',
    isOwner: true,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const projectRoot = path.join(__dirname, '../../');
        
        await sock.sendMessage(from, { text: '⏳ *Sedang memeriksa pembaruan...*' }, { quoted: m });

        // Helper to run exec from project root
        const runGit = (cmd, cb) => exec(cmd, { cwd: projectRoot }, cb);

        // 1. Fetch updates
        runGit('git fetch origin main', (err, stdout, stderr) => {
            if (err) {
                console.error('Fetch error:', err);
                return sock.sendMessage(from, { text: `❌ *Gagal mengambil pembaruan:* ${err.message}` }, { quoted: m });
            }

            // 2. Check for differences
            runGit('git log HEAD..origin/main --oneline', (err, logStdout, stderr) => {
                if (err) {
                    console.error('Log error:', err);
                    return sock.sendMessage(from, { text: `❌ *Gagal memeriksa perubahan:* ${err.message}` }, { quoted: m });
                }

                if (!logStdout.trim()) {
                    return sock.sendMessage(from, { text: '✅ *Bot sudah versi terbaru!* Tidak ada pembaruan yang ditemukan.' }, { quoted: m });
                }

                // 3. Get list of changed files
                runGit('git diff --name-only HEAD..origin/main', (err, diffStdout, stderr) => {
                    const changes = logStdout.trim().split('\n').map(l => `• ${l}`).join('\n');
                    const files = diffStdout.trim().split('\n').map(f => `• ${f}`).join('\n');
                    
                    const updateMsg = `🆕 *Pembaruan Ditemukan!*\n\n*Catatan Perubahan:*\n${changes}\n\n*File yang Berubah:*\n${files}\n\n*Sedang mengunduh pembaruan...*`;
                    
                    sock.sendMessage(from, { text: updateMsg }, { quoted: m });

                    // 4. Pull updates
                    runGit('git pull origin main', (err, stdout, stderr) => {
                        if (err) {
                            console.error('Pull error:', err);
                            return sock.sendMessage(from, { text: `❌ *Gagal mengunduh pembaruan:* ${err.message}` }, { quoted: m });
                        }

                        sock.sendMessage(from, { text: '✅ *Pembaruan berhasil!* Bot akan segera restart dalam 3 detik...' }, { quoted: m });
                        
                        setTimeout(() => {
                            process.exit(0); // Biarkan PM2 atau script start me-restart bot
                        }, 3000);
                    });
                });
            });
        });
    }
};

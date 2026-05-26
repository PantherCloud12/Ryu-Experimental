const { exec } = require('child_process');

module.exports = {
    name: 'autoupdate',
    command: ['autoupdate', 'updatebot'],
    category: 'owner',
    description: 'Mengupdate bot secara otomatis dari Github',
    isOwner: true,
    execute: async (sock, m, { text, config }) => {
        const from = m.key.remoteJid;
        
        await sock.sendMessage(from, { text: '🔄 *Sedang mengecek pembaruan dari Github...*' }, { quoted: m });

        exec('git fetch && git pull', async (err, stdout, stderr) => {
            try {
                if (err) {
                    return await sock.sendMessage(from, { 
                        text: `❌ *Gagal Update!*\n\n⚠️ Error: ${err.message}` 
                    }, { quoted: m });
                }

                if (stdout.includes('Already up to date.')) {
                    return await sock.sendMessage(from, { 
                        text: '✅ *Bot sudah versi terbaru!*' 
                    }, { quoted: m });
                }

                await sock.sendMessage(from, { 
                    text: `✅ *Update Berhasil!*\n\n📝 *Log:*\n${stdout}\n\n🔄 Bot akan direstart...` 
                }, { quoted: m });

                // Restart bot logic (assuming pm2 or it will be caught by a loop)
                setTimeout(() => {
                    process.exit(0);
                }, 2000);
            } catch (innerErr) {
                console.error('Error in autoupdate callback:', innerErr);
            }
        });
    }
};
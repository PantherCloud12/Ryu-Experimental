const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'clearsession',
    command: ['clearsession', 'delag', 'clearcache'],
    category: 'owner',
    description: 'Membersihkan cache/session agar bot tidak lag (kecuali creds.json)',
    isOwner: true,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const sessionDir = path.join(__dirname, '../../session');

        if (!fs.existsSync(sessionDir)) {
            return await sock.sendMessage(from, { text: '❌ Folder session tidak ditemukan!' }, { quoted: m });
        }

        try {
            const files = fs.readdirSync(sessionDir);
            let deleted = 0;

            for (const file of files) {
                if (file !== 'creds.json') {
                    fs.unlinkSync(path.join(sessionDir, file));
                    deleted++;
                }
            }

            await sock.sendMessage(from, { text: `✅ *Berhasil membersihkan cache!*\n\n🗑️ *Total file dihapus:* ${deleted} file\n🚀 Bot akan berjalan lebih lancar sekarang.` }, { quoted: m });
        } catch (error) {
            await sock.sendMessage(from, { text: `❌ *Gagal membersihkan cache!*\n\n⚠️ Error: ${error.message}` }, { quoted: m });
        }
    }
};
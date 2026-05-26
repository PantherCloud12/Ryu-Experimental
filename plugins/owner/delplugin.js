// Auto-generated plugin for Category: owner
// Command: delplugin
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'delplugin',
    command: ["delplugin", "hapusplugin"],
    category: 'owner',
    description: 'Menghapus file plugin dari server bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan nama file plugin yang ingin dihapus! (Contoh: owner/eval)' }, { quoted: m });
        try {
            const filePath = path.join(__dirname, `../${text}.js`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                await sock.sendMessage(from, { text: `✅ File plugin ${text}.js berhasil dihapus!` }, { quoted: m });
            } else {
                await sock.sendMessage(from, { text: '❌ File plugin tidak ditemukan.' }, { quoted: m });
            }
        } catch (e) {
            await sock.sendMessage(from, { text: `❌ Gagal menghapus: ${e.message}` }, { quoted: m });
        }

    }
};

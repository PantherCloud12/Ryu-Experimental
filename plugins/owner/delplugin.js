// Auto-generated plugin for Category: owner
// Command: delplugin
const axios = require('axios');

module.exports = {
    name: 'delplugin',
    command: ["hapusplugin"],
    category: 'owner',
    description: 'Menghapus file plugin dari server bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const isOwner = config.owner.includes(sender);
        if (!isOwner) {
            return await sock.sendMessage(from, { text: '❌ Command ini hanya untuk Owner Bot!' }, { quoted: m });
        }

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

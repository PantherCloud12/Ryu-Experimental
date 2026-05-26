// Auto-generated plugin for Category: group
// Command: ephemeral
const axios = require('axios');

module.exports = {
    name: 'ephemeral',
    command: ["ephemeral", "pesan-sementara","ephe"],
    category: 'group',
    description: 'Mengaktifkan atau menonaktifkan pesan sementara grup (24 jam/7 hari/90 hari)',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, isAdmin, isOwner, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di grup!' }, { quoted: m });
        if (!isAdmin && !isOwner) {
            return await sock.sendMessage(from, { text: '❌ Hanya admin grup yang dapat menggunakan fitur ini!' }, { quoted: m });
        }
        
        const duration = parseInt(args[0]) || 0; // 0 = off, 86400 = 24h, 604800 = 7d, 7776000 = 90d
        try {
            await sock.sendMessage(from, { disappearingMessagesInChat: duration });
            await sock.sendMessage(from, { text: `✅ Setelan pesan sementara berhasil diubah ke: ${duration === 0 ? 'Mati' : duration + ' detik'}` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal mengubah setelan: ${err.message}` }, { quoted: m });
        }

    }
};

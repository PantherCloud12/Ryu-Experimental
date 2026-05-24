// Auto-generated plugin for Category: group
// Command: unmute
const axios = require('axios');

module.exports = {
    name: 'unmute',
    command: ["bukagrup","opengroup"],
    category: 'group',
    description: 'Membuka grup agar seluruh member bisa mengirim pesan',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di grup!' }, { quoted: m });
        const targetAdmins = groupMetadata.participants.filter(p => !!p.admin).map(p => p.id);
        if (!targetAdmins.includes(sender) && !config.owner.includes(sender)) {
            return await sock.sendMessage(from, { text: '❌ Hanya admin grup yang dapat menggunakan fitur ini!' }, { quoted: m });
        }
        
        try {
            await sock.groupSettingUpdate(from, 'not_announcement');
            await sock.sendMessage(from, { text: '✅ Grup berhasil dibuka! Sekarang semua member bisa mengirim pesan kembali.' }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal membuka grup: ${err.message}` }, { quoted: m });
        }

    }
};

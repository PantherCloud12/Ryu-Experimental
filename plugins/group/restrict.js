// Auto-generated plugin for Category: group
// Command: restrict
const axios = require('axios');

module.exports = {
    name: 'restrict',
    command: ["restrict", "restriksi","kuncigrup"],
    category: 'group',
    description: 'Membatasi pengaturan grup agar hanya admin yang dapat mengedit info grup',
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
        
        const mode = args[0] === 'off' ? 'unlocked' : 'locked';
        try {
            await sock.groupSettingUpdate(from, mode);
            await sock.sendMessage(from, { text: `✅ Setelan grup berhasil di-restrict ke mode: *${mode}* (Hanya admin yang dapat mengedit info grup).` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal: ${err.message}` }, { quoted: m });
        }

    }
};

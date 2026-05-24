// Auto-generated plugin for Category: group
// Command: antiviewonce
const axios = require('axios');

module.exports = {
    name: 'antiviewonce',
    command: ["antiviewonce","antivo"],
    category: 'group',
    description: 'Mengaktifkan fitur anti sekali lihat di grup',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di grup!' }, { quoted: m });
        const chatDb = dbHelper.getChat(from);
        chatDb.antiviewonce = !chatDb.antiviewonce;
        dbHelper.save();
        await sock.sendMessage(from, { text: `🛡️ *ANTI-VIEWONCE* berhasil ${chatDb.antiviewonce ? '*diaktifkan*' : '*dinonaktifkan*'} untuk grup ini.` }, { quoted: m });

    }
};

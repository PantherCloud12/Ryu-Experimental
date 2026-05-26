// Auto-generated plugin for Category: group
// Command: antidelete
const axios = require('axios');

module.exports = {
    name: 'antidelete',
    command: ["antidelete", "antihapus"],
    category: 'group',
    description: 'Mengaktifkan fitur anti hapus pesan di grup',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di grup!' }, { quoted: m });
        const chatDb = dbHelper.getChat(from);
        chatDb.antidelete = !chatDb.antidelete;
        dbHelper.save();
        await sock.sendMessage(from, { text: `🛡️ *ANTI-DELETE* berhasil ${chatDb.antidelete ? '*diaktifkan*' : '*dinonaktifkan*'} untuk grup ini.` }, { quoted: m });

    }
};

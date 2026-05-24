// Auto-generated plugin for Category: owner
// Command: resetdb
const axios = require('axios');

module.exports = {
    name: 'resetdb',
    command: ["resetdatabase","cleardb"],
    category: 'owner',
    description: 'Mereset semua data chat dan user di database (Owner Only)',
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

        dbHelper.db = { chats: {}, users: {}, settings: { delay: 3 } };
        dbHelper.save();
        await sock.sendMessage(from, { text: '✅ Database bot berhasil di-reset ke pengaturan pabrik!' }, { quoted: m });

    }
};

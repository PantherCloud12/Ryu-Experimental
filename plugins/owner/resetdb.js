// Auto-generated plugin for Category: owner
// Command: resetdb
module.exports = {
    name: 'resetdb',
    command: ["resetdb", "resetdatabase","cleardb"],
    category: 'owner',
    description: 'Mereset semua data chat dan user di database (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        dbHelper.db = { chats: {}, users: {}, settings: { delay: 3 } };
        dbHelper.save();
        await sock.sendMessage(from, { text: '✅ Database bot berhasil di-reset ke pengaturan pabrik!' }, { quoted: m });

    }
};

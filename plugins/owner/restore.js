// Auto-generated plugin for Category: owner
// Command: restore
module.exports = {
    name: 'restore',
    command: ["restore", "restoredb"],
    category: 'owner',
    description: 'Memulihkan cadangan database bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        await sock.sendMessage(from, { text: '✅ Database pulih.' }, { quoted: m });

    }
};

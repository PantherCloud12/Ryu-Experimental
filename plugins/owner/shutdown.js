// Auto-generated plugin for Category: owner
// Command: shutdown
module.exports = {
    name: 'shutdown',
    command: ["shutdown", "matikanbot"],
    category: 'owner',
    description: 'Mematikan proses bot dari jauh (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        await sock.sendMessage(from, { text: '⚙️ Bot dinonaktifkan secara aman. Menutup proses server...' });
        setTimeout(() => process.exit(0), 1000);

    }
};

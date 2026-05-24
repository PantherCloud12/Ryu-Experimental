// Auto-generated plugin for Category: owner
// Command: shutdown
const axios = require('axios');

module.exports = {
    name: 'shutdown',
    command: ["matikanbot"],
    category: 'owner',
    description: 'Mematikan proses bot dari jauh (Owner Only)',
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

        await sock.sendMessage(from, { text: '⚙️ Bot dinonaktifkan secara aman. Menutup proses server...' });
        setTimeout(() => process.exit(0), 1000);

    }
};

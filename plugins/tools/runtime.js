// Auto-generated plugin for Category: tools
// Command: runtime
const axios = require('axios');

module.exports = {
    name: 'runtime',
    command: ["aktif","uptime"],
    category: 'tools',
    description: 'Melihat durasi bot telah aktif menyala online',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const uptime = process.uptime();
        // Import helper runtime
        const { runtime } = require('../../lib/helper');
        await sock.sendMessage(from, { text: `🚀 *BOT UPTIME*\n\nBot telah aktif berjalan selama: *${runtime(uptime)}*\n${PROMO_TEXT}` }, { quoted: m });

    }
};

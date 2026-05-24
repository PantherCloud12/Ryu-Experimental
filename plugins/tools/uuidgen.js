// Auto-generated plugin for Category: tools
// Command: uuidgen
const axios = require('axios');

module.exports = {
    name: 'uuidgen',
    command: ["uuid","generateuuid"],
    category: 'tools',
    description: 'Menghasilkan UUID v4 acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        await sock.sendMessage(from, { text: `🔑 *GENERATED UUID v4*\n\nUUID: \`${uuid}\`\n${PROMO_TEXT}` }, { quoted: m });
        
    }
};

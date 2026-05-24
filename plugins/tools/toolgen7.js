// Auto-generated plugin for Category: tools
// Command: toolgen7
const axios = require('axios');

module.exports = {
    name: 'toolgen7',
    command: ["toolg7","tgen7"],
    category: 'tools',
    description: 'Alat bantu utilitas bagian 7',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const length = text ? text.length : 0;
        await sock.sendMessage(from, { text: `🔧 *TOOL #7*\n\nInput teks Anda memiliki panjang: *${length}* karakter.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

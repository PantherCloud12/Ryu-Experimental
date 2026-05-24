// Auto-generated plugin for Category: tools
// Command: toolgen27
const axios = require('axios');

module.exports = {
    name: 'toolgen27',
    command: ["toolg27","tgen27"],
    category: 'tools',
    description: 'Alat bantu utilitas bagian 27',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const length = text ? text.length : 0;
        await sock.sendMessage(from, { text: `🔧 *TOOL #27*\n\nInput teks Anda memiliki panjang: *${length}* karakter.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

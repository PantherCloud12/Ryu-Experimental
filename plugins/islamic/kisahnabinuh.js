// Auto-generated plugin for Category: islamic
// Command: kisahnabinuh
const axios = require('axios');

module.exports = {
    name: 'kisahnabinuh',
    command: ["nabinuh"],
    category: 'islamic',
    description: 'Kisah singkat Nabi Nuh AS',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        await sock.sendMessage(from, { text: `🕌 *KISAHNABINUH* 🕌\n\nNabi Nuh AS berdakwah selama 950 tahun namun pengikutnya sangat sedikit. Allah memerintahkannya membangun bahtera besar di atas bukit. Air bah yang dahsyat kemudian menenggelamkan kaumnya yang ingkar, termasuk putranya, Kan'an.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

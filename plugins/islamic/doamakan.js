// Auto-generated plugin for Category: islamic
// Command: doamakan
const axios = require('axios');

module.exports = {
    name: 'doamakan',
    command: ["doasebelummakan"],
    category: 'islamic',
    description: 'Doa sebelum makan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        await sock.sendMessage(from, { text: `🕌 *DOAMAKAN* 🕌\n\nاللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ\n\n*Artinya:* Ya Allah, berkahilah kami atas rezeki yang telah Engkau limpahkan kepada kami dan peliharalah kami dari siksa api neraka.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

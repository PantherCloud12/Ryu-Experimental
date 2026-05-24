// Auto-generated plugin for Category: islamic
// Command: doasholat
const axios = require('axios');

module.exports = {
    name: 'doasholat',
    command: ["doasetelahsholat"],
    category: 'islamic',
    description: 'Doa setelah sholat fardhu',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        await sock.sendMessage(from, { text: `🕌 *DOASHOLAT* 🕌\n\nالحمد لله رب العالمين، اللهم صل على سيدنا محمد وعلى آل سيدنا محمد. اللهم ربنا تقبل منا صلاتنا وصيامنا وركوعنا وسجودنا وقعدتنا وتضرعنا وتخشعنا وتعبدنا وتمم تقصيرنا يا الله يا رب العالمين.\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

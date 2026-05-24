// Auto-generated plugin for Category: fun
// Command: pantunjawa
const axios = require('axios');

module.exports = {
    name: 'pantunjawa',
    command: ["pjawa"],
    category: 'fun',
    description: 'Menampilkan pantun atau parikan Jawa acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Witing tresno jalaran soko kulino, nanging tresnoku mung nggo sliramu.",
            "Mangan tiwul lawuh teri, senajan gak gaul sing penting gemati.",
            "Sego liwet jangan lodeh, nek kowe ruwet tak tinggal wae.",
            "Tuku klopo ning pasar legi, senadyan dodo loro tetep kudu mesem saiki.",
            "Udan deres dalane lunyu, atiku ngenes mikirke sliramu."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *PANTUNJAWA* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

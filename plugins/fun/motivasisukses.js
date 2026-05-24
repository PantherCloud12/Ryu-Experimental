// Auto-generated plugin for Category: fun
// Command: motivasisukses
const axios = require('axios');

module.exports = {
    name: 'motivasisukses',
    command: ["msukses"],
    category: 'fun',
    description: 'Menampilkan kutipan motivasi sukses acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Sukses tidak diukur dari apa yang Anda capai, melainkan dari kesulitan yang telah Anda atasi.",
            "Masa depan adalah milik mereka yang percaya pada keindahan mimpi mereka.",
            "Jangan biarkan hari kemarin menyita terlalu banyak hari ini.",
            "Kegagalan adalah batu loncatan menuju kesuksesan yang lebih besar.",
            "Mulailah dari mana Anda berada. Gunakan apa yang Anda miliki. Lakukan apa yang Anda bisa."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *MOTIVASISUKSES* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

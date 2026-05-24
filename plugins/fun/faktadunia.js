// Auto-generated plugin for Category: fun
// Command: faktadunia
const axios = require('axios');

module.exports = {
    name: 'faktadunia',
    command: ["faktaduniauni"],
    category: 'fun',
    description: 'Menampilkan fakta unik dunia acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Maduk alami tidak akan pernah basi atau kedaluwarsa jika disimpan dengan benar.",
            "Semut tidak memiliki paru-paru dan mereka tidak tidur.",
            "Menara Eiffel bisa tumbuh hingga 15 cm lebih tinggi selama musim panas karena pemuaian termal.",
            "Kangaroo tidak bisa berjalan mundur.",
            "Pisang secara botani diklasifikasikan sebagai buah buni (berry)."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *FAKTADUNIA* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

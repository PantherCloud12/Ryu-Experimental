// Auto-generated plugin for Category: fun
// Command: weton
const axios = require('axios');

module.exports = {
    name: 'weton',
    command: ["ramalweton"],
    category: 'fun',
    description: 'Meramal kecocokan berdasarkan weton lahir jawa',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const parts = text.split('|');
        const n1 = parts[0]?.trim();
        const n2 = parts[1]?.trim();
        if (!n1) return await sock.sendMessage(from, { text: '❌ Masukkan nama!' }, { quoted: m });
        
        const hasil = Math.floor(Math.random() * 100) + 1;
        await sock.sendMessage(from, { text: `🔮 *RAMALAN JODOH/WETON*\n\n• Nama: ${n1} ${n2 ? '& ' + n2 : ''}\n• Kecocokan: *${hasil}%*\n• Penjelasan: Sangat harmonis dan penuh berkah.` }, { quoted: m });

    }
};

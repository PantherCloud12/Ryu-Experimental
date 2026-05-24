// Auto-generated plugin for Category: fun
// Command: shadow
const axios = require('axios');

module.exports = {
    name: 'shadow',
    command: ["shadowtext"],
    category: 'fun',
    description: 'Menampilkan kutipan misterius bayangan hitam',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Dalam bayang-bayang malam, aku menemukan diriku yang sesungguhnya.","Cahaya menciptakan bayangan, namun bayanganlah yang membuktikan adanya cahaya.","Jangan takut pada kegelapan, karena di sanalah rahasia terdalam tersimpan."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *SHADOW* ✨\n\n${item}` }, { quoted: m });

    }
};

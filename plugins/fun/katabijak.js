// Auto-generated plugin for Category: fun
// Command: katabijak
const axios = require('axios');

module.exports = {
    name: 'katabijak',
    command: ["bijak"],
    category: 'fun',
    description: 'Mendapatkan kata bijak filosofis kehidupan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Orang bijak berbicara karena mereka memiliki sesuatu untuk dikatakan, orang bodoh berbicara karena mereka harus mengatakan sesuatu.","Kebahagiaan terbesar kita tidak tergantung pada situasi hidup di mana kita berada, melainkan pada hati nurani yang bersih.","Perjalanan seribu mil dimulai dengan satu langkah kecil."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *KATABIJAK* ✨\n\n${item}` }, { quoted: m });

    }
};

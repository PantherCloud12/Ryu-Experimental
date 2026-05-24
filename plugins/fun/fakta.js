// Auto-generated plugin for Category: fun
// Command: fakta
const axios = require('axios');

module.exports = {
    name: 'fakta',
    command: ["faktaunik"],
    category: 'fun',
    description: 'Menampilkan fakta unik dunia yang menakjubkan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Semut tidak memiliki paru-paru melainkan bernafas lewat lubang kecil di sekujur tubuhnya.","Madu adalah satu-satunya makanan alami yang tidak akan pernah basi atau membusuk.","Jantung paus biru berukuran sebesar mobil kecil dan detaknya bisa terdengar dari jarak 3 km.","Pisang secara botani diklasifikasikan sebagai buah buni (berry)."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *FAKTA* ✨\n\n${item}` }, { quoted: m });

    }
};

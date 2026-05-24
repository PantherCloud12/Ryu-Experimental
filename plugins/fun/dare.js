// Auto-generated plugin for Category: fun
// Command: dare
const axios = require('axios');

module.exports = {
    name: 'dare',
    command: ["dare","tantangan"],
    category: 'fun',
    description: 'Mendapatkan tantangan melakukan sesuatu gila (Dare)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const list = ["Kirim pesan ke ibumu: \"Mak, aku mau nikah besok\" lalu screenshot balasannya.","VN menyanyikan lagu balonku ada lima menggunakan huruf O semua selama 20 detik.","Ganti nama profil WhatsApp kamu menjadi \"Aku Bebek Ganteng\" selama 1 jam.","Kirim emot badut 🤡 ke kontak terakhir yang kamu chat.","Kirim foto selfie terjelekmu saat ini juga ke grup."];
        const item = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *DARE* ✨\n\n${item}` }, { quoted: m });

    }
};

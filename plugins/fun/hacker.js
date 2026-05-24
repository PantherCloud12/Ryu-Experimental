// Auto-generated plugin for Category: fun
// Command: hacker
const axios = require('axios');

module.exports = {
    name: 'hacker',
    command: ["hackertext"],
    category: 'fun',
    description: 'Mengirimkan pesan gaya hacker keren dengan font khusus',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan teks yang ingin dijadikan hacker style!' }, { quoted: m });
        // Sederhana ganti huruf
        const leet = { 'a':'4', 'e':'3', 'i':'1', 'o':'0', 's':'5', 'g':'9', 'b':'8', 't':'7' };
        const hacked = text.toLowerCase().split('').map(char => leet[char] || char).join('').toUpperCase();
        await sock.sendMessage(from, { text: `💻 *HACKER GENERATED*\n\n👾 Teks: ` + hacked }, { quoted: m });

    }
};

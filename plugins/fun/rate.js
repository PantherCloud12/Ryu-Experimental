// Auto-generated plugin for Category: fun
// Command: rate
const axios = require('axios');

module.exports = {
    name: 'rate',
    command: ["nilai","ratealkohol"],
    category: 'fun',
    description: 'Meminta bot menilai tingkat kehebatan/kegantengan/kecantikan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan subjek yang dinilai!' }, { quoted: m });
        const persen = Math.floor(Math.random() * 100) + 1;
        await sock.sendMessage(from, { text: `📊 *RATING PERSEN*\n\n• Subjek: ${text}\n• Hasil: *${persen}%* dari 100%` }, { quoted: m });

    }
};

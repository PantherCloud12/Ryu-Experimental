// Auto-generated plugin for Category: fun
// Command: kapankah
const axios = require('axios');

module.exports = {
    name: 'kapankah',
    command: ["kapankahramal"],
    category: 'fun',
    description: 'Bertanya ramalan kapan terjadinya sesuatu kepada bot',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Tanyakan sesuatu!' }, { quoted: m });
        const type = 'kapankah';
        
        if (type === 'apakah') {
            const ans = ['Ya', 'Tidak', 'Mungkin saja', 'Tentu saja tidak', 'Tanya lagi nanti'][Math.floor(Math.random() * 5)];
            await sock.sendMessage(from, { text: `🔮 *RAMALAN APAKAH*\n\n❓ Pertanyaan: Apakah ${text}?\n💡 Jawaban: *${ans}*` }, { quoted: m });
        } else if (type === 'kapankah') {
            const num = Math.floor(Math.random() * 10) + 1;
            const unit = ['hari', 'bulan', 'tahun', 'abad', 'minggu'][Math.floor(Math.random() * 5)];
            await sock.sendMessage(from, { text: `🔮 *RAMALAN KAPANKAH*\n\n❓ Pertanyaan: Kapan ${text}?\n💡 Jawaban: *${num} ${unit} lagi*` }, { quoted: m });
        } else {
            const ans = ['Sangat baik', 'Buruk sekali', 'Akan ada keajaiban', 'Akan berjalan lancar'][Math.floor(Math.random() * 4)];
            await sock.sendMessage(from, { text: `🔮 *RAMALAN BAGAIMANAKAH*\n\n❓ Pertanyaan: Bagaimana ${text}?\n💡 Jawaban: *${ans}*` }, { quoted: m });
        }

    }
};

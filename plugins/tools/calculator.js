// Auto-generated plugin for Category: tools
// Command: calculator
const axios = require('axios');

module.exports = {
    name: 'calculator',
    command: ["kalkulator","hitung"],
    category: 'tools',
    description: 'Melakukan operasi kalkulator matematika dasar',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan angka operasi matematika! Contoh: .hitung 10 + 5 atau 12 * 3' }, { quoted: m });
        
        try {
            // Evaluasi aman tanpa eval() berbahaya
            const cleanExp = text.replace(/[^0-9+\-*/().\s]/g, '');
            const calc = Function(`"use strict"; return (${cleanExp})`)();
            await sock.sendMessage(from, { text: `🧮 *HASIL HITUNG*\n\n📝 Soal: ${text}\n✅ Hasil: *${calc}*` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: '❌ Rumus tidak valid. Gunakan operator +, -, *, /' }, { quoted: m });
        }

    }
};

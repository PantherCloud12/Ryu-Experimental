// Auto-generated plugin for Category: game
// Command: math
const axios = require('axios');

module.exports = {
    name: 'math',
    command: ["matematika-kuis"],
    category: 'game',
    description: 'Bermain game matematika hitung cepat',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const val1 = Math.floor(Math.random() * 20) + 1;
        const val2 = Math.floor(Math.random() * 20) + 1;
        const op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        
        let ans = 0;
        if (op === '+') ans = val1 + val2;
        else if (op === '-') ans = val1 - val2;
        else if (op === '*') ans = val1 * val2;
        
        if (!sock.gameSession) sock.gameSession = {};
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: '❌ Selesaikan game sebelumnya dulu!' }, { quoted: m });
        }
        
        sock.gameSession[from] = {
            answer: String(ans),
            hint: 'Hitunglah dengan benar!',
            type: 'math'
        };
        
        setTimeout(() => {
            if (sock.gameSession[from] && sock.gameSession[from].type === 'math') {
                sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *${ans}*` });
                delete sock.gameSession[from];
            }
        }, 30000);

        await sock.sendMessage(from, { text: `🎮 *MATEMATIKA KUIS*\n\nBerapakah hasil dari: *${val1} ${op} ${val2}*?\n\nJawab langsung dalam 30 detik!` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: game
// Command: tebakkimia
const axios = require('axios');

module.exports = {
    name: 'tebakkimia',
    command: ["tebak-unsur"],
    category: 'game',
    description: 'Bermain game tebak singkatan unsur kimia (contoh: H = Hidrogen)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const question = 'Apakah nama unsur kimia dari lambang "O"?';
        const answer = 'oksigen';
        
        // Simpan sesi game di global database/cache bot
        if (!sock.gameSession) sock.gameSession = {};
        
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: `❌ Masih ada game berlangsung di chat ini! Jawab dulu atau ketik *.menyerah*` }, { quoted: m });
        }
        
        sock.gameSession[from] = {
            answer: answer.toLowerCase().trim(),
            hint: answer.slice(0, 1) + '... ' + answer.slice(-1),
            type: 'tebakkimia'
        };
        
        // Timer otomatis menyerah dalam 1 menit
        setTimeout(() => {
            if (sock.gameSession[from] && sock.gameSession[from].type === 'tebakkimia') {
                sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *oksigen*` });
                delete sock.gameSession[from];
            }
        }, 60000);

        await sock.sendMessage(from, { text: `🎮 *GAME TEBAKKIMIA*\n\n${question}\n\nJawab langsung dengan mengetik jawabannya (tanpa prefix).\nWaktu menjawab: 60 detik.` }, { quoted: m });

    }
};

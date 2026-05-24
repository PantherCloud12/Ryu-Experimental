// Auto-generated plugin for Category: game
// Command: tebaklagu
const axios = require('axios');

module.exports = {
    name: 'tebaklagu',
    command: ["tebak-lagu"],
    category: 'game',
    description: 'Bermain game tebak judul lagu dari potongan lirik',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const question = 'Siapakah penyanyi lagu "Hati-Hati di Jalan"?';
        const answer = 'tulus';
        
        // Simpan sesi game di global database/cache bot
        if (!sock.gameSession) sock.gameSession = {};
        
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: `❌ Masih ada game berlangsung di chat ini! Jawab dulu atau ketik *.menyerah*` }, { quoted: m });
        }
        
        sock.gameSession[from] = {
            answer: answer.toLowerCase().trim(),
            hint: answer.slice(0, 1) + '... ' + answer.slice(-1),
            type: 'tebaklagu'
        };
        
        // Timer otomatis menyerah dalam 1 menit
        setTimeout(() => {
            if (sock.gameSession[from] && sock.gameSession[from].type === 'tebaklagu') {
                sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *tulus*` });
                delete sock.gameSession[from];
            }
        }, 60000);

        await sock.sendMessage(from, { text: `🎮 *GAME TEBAKLAGU*\n\n${question}\n\nJawab langsung dengan mengetik jawabannya (tanpa prefix).\nWaktu menjawab: 60 detik.` }, { quoted: m });

    }
};

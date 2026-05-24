// Auto-generated plugin for Category: game
// Command: tebaktebakan
const axios = require('axios');

module.exports = {
    name: 'tebaktebakan',
    command: ["tebak-tebakan"],
    category: 'game',
    description: 'Bermain game tebak-tebakan santai penuh teka-teki',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const question = 'Gajah terbang dengan apa? (Jawaban: dengan susah payah)';
        const answer = 'dengan susah payah';
        
        // Simpan sesi game di global database/cache bot
        if (!sock.gameSession) sock.gameSession = {};
        
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: `❌ Masih ada game berlangsung di chat ini! Jawab dulu atau ketik *.menyerah*` }, { quoted: m });
        }
        
        sock.gameSession[from] = {
            answer: answer.toLowerCase().trim(),
            hint: answer.slice(0, 1) + '... ' + answer.slice(-1),
            type: 'tebaktebakan'
        };
        
        // Timer otomatis menyerah dalam 1 menit
        setTimeout(() => {
            if (sock.gameSession[from] && sock.gameSession[from].type === 'tebaktebakan') {
                sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *dengan susah payah*` });
                delete sock.gameSession[from];
            }
        }, 60000);

        await sock.sendMessage(from, { text: `🎮 *GAME TEBAKTEBAKAN*\n\n${question}\n\nJawab langsung dengan mengetik jawabannya (tanpa prefix).\nWaktu menjawab: 60 detik.` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: game
// Command: tebakkata
const axios = require('axios');

module.exports = {
    name: 'tebakkata',
    command: ["tebak-kata"],
    category: 'game',
    description: 'Bermain game tebak kata tersembunyi',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const question = 'Lawan kata dari "Besar" adalah...';
        const answer = 'kecil';
        
        // Simpan sesi game di global database/cache bot
        if (!sock.gameSession) sock.gameSession = {};
        
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: `❌ Masih ada game berlangsung di chat ini! Jawab dulu atau ketik *.menyerah*` }, { quoted: m });
        }
        
        sock.gameSession[from] = {
            answer: answer.toLowerCase().trim(),
            hint: answer.slice(0, 1) + '... ' + answer.slice(-1),
            type: 'tebakkata'
        };
        
        // Timer otomatis menyerah dalam 1 menit
        setTimeout(() => {
            if (sock.gameSession[from] && sock.gameSession[from].type === 'tebakkata') {
                sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *kecil*` });
                delete sock.gameSession[from];
            }
        }, 60000);

        await sock.sendMessage(from, { text: `🎮 *GAME TEBAKKATA*\n\n${question}\n\nJawab langsung dengan mengetik jawabannya (tanpa prefix).\nWaktu menjawab: 60 detik.` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: game
// Command: asahotak
const axios = require('axios');

module.exports = {
    name: 'asahotak',
    command: ["asah-otak"],
    category: 'game',
    description: 'Bermain game asah otak menjawab teka-teki logika',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const question = 'Aku punya mata tapi tidak bisa melihat. Apakah aku? (Petunjuk: Jarum / Kentang)';
        const answer = 'jarum';
        
        // Simpan sesi game di global database/cache bot
        if (!sock.gameSession) sock.gameSession = {};
        
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: `❌ Masih ada game berlangsung di chat ini! Jawab dulu atau ketik *.menyerah*` }, { quoted: m });
        }
        
        sock.gameSession[from] = {
            answer: answer.toLowerCase().trim(),
            hint: answer.slice(0, 1) + '... ' + answer.slice(-1),
            type: 'asahotak'
        };
        
        // Timer otomatis menyerah dalam 1 menit
        setTimeout(() => {
            if (sock.gameSession[from] && sock.gameSession[from].type === 'asahotak') {
                sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *jarum*` });
                delete sock.gameSession[from];
            }
        }, 60000);

        await sock.sendMessage(from, { text: `🎮 *GAME ASAHOTAK*\n\n${question}\n\nJawab langsung dengan mengetik jawabannya (tanpa prefix).\nWaktu menjawab: 60 detik.` }, { quoted: m });

    }
};

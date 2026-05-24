// Auto-generated plugin for Category: game
// Command: siapakahaku
const axios = require('axios');

module.exports = {
    name: 'siapakahaku',
    command: ["siapakah-aku"],
    category: 'game',
    description: 'Bermain game tebak nama tokoh/hewan/benda dari petunjuk',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const question = 'Aku adalah hewan menyusui berkaki empat, leherku sangat panjang. Siapakah aku?';
        const answer = 'jerapah';
        
        // Simpan sesi game di global database/cache bot
        if (!sock.gameSession) sock.gameSession = {};
        
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: `❌ Masih ada game berlangsung di chat ini! Jawab dulu atau ketik *.menyerah*` }, { quoted: m });
        }
        
        sock.gameSession[from] = {
            answer: answer.toLowerCase().trim(),
            hint: answer.slice(0, 1) + '... ' + answer.slice(-1),
            type: 'siapakahaku'
        };
        
        // Timer otomatis menyerah dalam 1 menit
        setTimeout(() => {
            if (sock.gameSession[from] && sock.gameSession[from].type === 'siapakahaku') {
                sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *jerapah*` });
                delete sock.gameSession[from];
            }
        }, 60000);

        await sock.sendMessage(from, { text: `🎮 *GAME SIAPAKAHAKU*\n\n${question}\n\nJawab langsung dengan mengetik jawabannya (tanpa prefix).\nWaktu menjawab: 60 detik.` }, { quoted: m });

    }
};

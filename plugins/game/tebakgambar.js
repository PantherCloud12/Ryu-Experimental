// Auto-generated plugin for Category: game
// Command: tebakgambar
const axios = require('axios');

module.exports = {
    name: 'tebakgambar',
    command: ["tg","tebak-gambar"],
    category: 'game',
    description: 'Bermain game tebak gambar berhadiah poin',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!sock.gameSession) sock.gameSession = {};
        if (sock.gameSession[from]) {
            return await sock.sendMessage(from, { text: '❌ Masih ada kuis yang berlangsung!' }, { quoted: m });
        }
        
        // Tebak gambar static demo
        const demoImg = 'https://api.vreden.web.id/api/tebakgambar';
        try {
            const res = await axios.get(demoImg);
            const data = res.data;
            const ansImg = data.jawaban || data.result?.jawaban || 'buku';
            const imgUrl = data.image || data.result?.image || 'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar/1.png';
            
            sock.gameSession[from] = {
                answer: ansImg.toLowerCase().trim(),
                hint: ansImg.slice(0, 1) + '... ' + ansImg.slice(-1),
                type: 'tebakgambar'
            };
            
            setTimeout(() => {
                if (sock.gameSession[from] && sock.gameSession[from].type === 'tebakgambar') {
                    sock.sendMessage(from, { text: `⏱️ Waktu habis! Jawabannya adalah: *${ansImg}*` });
                    delete sock.gameSession[from];
                }
            }, 60000);
            
            await sock.sendMessage(from, { 
                image: { url: imgUrl },
                caption: `🎮 *TEBAK GAMBAR*\n\nJawab langsung gambar di atas dalam 60 detik!\nHadiah: 50 poin.`
            }, { quoted: m });
        } catch (e) {
            // Fallback static
            sock.gameSession[from] = {
                answer: 'nasi goreng',
                hint: 'n... g...',
                type: 'tebakgambar'
            };
            await sock.sendMessage(from, { 
                image: { url: 'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar/1.png' },
                caption: `🎮 *TEBAK GAMBAR*\n\nJawab langsung gambar di atas dalam 60 detik!`
            }, { quoted: m });
        }

    }
};

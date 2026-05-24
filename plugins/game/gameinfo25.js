// Auto-generated plugin for Category: game
// Command: gameinfo25
const axios = require('axios');

module.exports = {
    name: 'gameinfo25',
    command: ["gi25","ginfo25"],
    category: 'game',
    description: 'Informasi trivia game seru bagian 25',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const trivias = [
            "Minecraft awalnya dibuat dalam waktu kurang dari seminggu oleh Markus Persson.",
            "Pac-Man awalnya terinspirasi oleh pizza yang dipotong sebagian.",
            "Game terlaris sepanjang masa adalah Tetris.",
            "Karakter Mario awalnya dinamai Jumpman dalam game Donkey Kong.",
            "PlayStation 2 adalah konsol game terlaris dalam sejarah dengan lebih dari 155 juta unit terjual."
        ];
        const res = trivias[Math.floor(Math.random() * trivias.length)];
        await sock.sendMessage(from, { text: `🎮 *GAME TRIVIA #25*\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

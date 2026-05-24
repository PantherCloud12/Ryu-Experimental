// Auto-generated plugin for Category: anime
// Command: animequote19
const axios = require('axios');

module.exports = {
    name: 'animequote19',
    command: ["aq19","anq19"],
    category: 'anime',
    description: 'Kutipan anime jepang populer bagian 19',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const quotes = [
            "Orang lemah tidak bisa memilih bagaimana mereka mati. - Trafalgar Law (One Piece)",
            "Jika kamu tidak menyukai takdirmu, jangan menerimanya. Sebaliknya, miliki keberanian untuk mengubahnya. - Naruto Uzumaki",
            "Merasakan rasa sakit membantu kita tumbuh. - Pain (Naruto)",
            "Ketakutan bukanlah kejahatan. Itu memberi tahu Anda apa kelemahan Anda. - Gildarts (Fairy Tail)",
            "Jika kau menyerah, maka game sudah berakhir. - Coach Anzai (Slam Dunk)"
        ];
        const res = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(from, { text: `🎌 *ANIME QUOTE #19*\n\n"${res}"\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

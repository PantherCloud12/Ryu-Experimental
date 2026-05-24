// Auto-generated plugin for Category: anime
// Command: animequotes
const axios = require('axios');

module.exports = {
    name: 'animequotes',
    command: ["quotes-anime","kata-anime"],
    category: 'anime',
    description: 'Menampilkan kutipan bijak karakter anime terpopuler',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const quotes = [
            '"Jika kamu percaya pada impianmu, aku akan membuktikan padamu bahwa impianmu bisa dicapai hanya dengan kerja keras." - Rock Lee (Naruto)',
            '"Orang yang kuat bukanlah orang yang tidak pernah jatuh, melainkan mereka yang selalu bangkit setiap kali terjatuh." - Edward Elric (Fullmetal Alchemist)',
            '"Jika kau tidak menyukai takdirmu, jangan menerimanya. Sebaliknya, miliki keberanian untuk mengubahnya sesuai keinginanmu." - Naruto Uzumaki',
            '"Hidup ini bukan tentang memenangkan permainan, tapi tentang bagaimana kamu memainkannya." - Sora (No Game No Life)'
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(from, { text: `🌸 *ANIME QUOTES* 🌸\n\n${quote}` }, { quoted: m });

    }
};

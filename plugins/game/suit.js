// Auto-generated plugin for Category: game
// Command: suit
const axios = require('axios');

module.exports = {
    name: 'suit',
    command: ["suwit","suten"],
    category: 'game',
    description: 'Bermain game gunting batu kertas dengan bot',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Tentukan pilihanmu! (batu / gunting / kertas)' }, { quoted: m });
        const userChoice = text.trim().toLowerCase();
        if (userChoice !== 'batu' && userChoice !== 'gunting' && userChoice !== 'kertas') {
            return await sock.sendMessage(from, { text: '❌ Pilihan tidak valid! Pilih batu, gunting, atau kertas.' }, { quoted: m });
        }
        
        const choices = ['batu', 'gunting', 'kertas'];
        const botChoice = choices[Math.floor(Math.random() * 3)];
        
        let resSuit = 'SERI 🤝';
        if (
            (userChoice === 'batu' && botChoice === 'gunting') ||
            (userChoice === 'gunting' && botChoice === 'kertas') ||
            (userChoice === 'kertas' && botChoice === 'batu')
        ) {
            resSuit = 'KAMU MENANG 🎉';
        } else if (userChoice !== botChoice) {
            resSuit = 'KAMU KALAH 😭';
        }
        
        await sock.sendMessage(from, { text: `🎮 *SUIT WHATSAPP*\n\n👨 Kamu Pilih: *${userChoice.toUpperCase()}*\n🤖 Bot Pilih: *${botChoice.toUpperCase()}*\n\n📈 Hasil: *${resSuit}*` }, { quoted: m });

    }
};

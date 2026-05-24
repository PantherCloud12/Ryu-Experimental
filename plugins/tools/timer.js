// Auto-generated plugin for Category: tools
// Command: timer
const axios = require('axios');

module.exports = {
    name: 'timer',
    command: ["alarmku"],
    category: 'tools',
    description: 'Membuat timer alarm pengingat dalam hitungan detik',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const sec = parseInt(text.trim());
        if (isNaN(sec) || sec <= 0) return await sock.sendMessage(from, { text: '❌ Masukkan jumlah detik! Contoh: .alarm 10' }, { quoted: m });
        
        await sock.sendMessage(from, { text: `⏰ Timer diset untuk ${sec} detik!` }, { quoted: m });
        setTimeout(async () => {
            await sock.sendMessage(from, { text: `🔔 *ALARM BUNYI!* Waktu ${sec} detik telah berlalu!` }, { quoted: m });
        }, sec * 1000);

    }
};

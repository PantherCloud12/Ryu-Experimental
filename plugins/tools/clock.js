// Auto-generated plugin for Category: tools
// Command: clock
const axios = require('axios');

module.exports = {
    name: 'clock',
    command: ["waktudunia","jam"],
    category: 'tools',
    description: 'Menampilkan jam digital wilayah Indonesia (WIB/WITA/WIT)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const d = new Date();
        const wib = new Date(d.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
        const wita = new Date(d.toLocaleString("en-US", {timeZone: "Asia/Makassar"}));
        const wit = new Date(d.toLocaleString("en-US", {timeZone: "Asia/Jayapura"}));
        
        const f = (t) => String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');
        
        const replyText = `🕒 *JAM DIGITAL INDONESIA*\n\n• WIB (Jakarta): *${f(wib)}*\n• WITA (Bali): *${f(wita)}*\n• WIT (Papua): *${f(wit)}*`;
        await sock.sendMessage(from, { text: replyText }, { quoted: m });

    }
};

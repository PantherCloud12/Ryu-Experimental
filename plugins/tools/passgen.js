// Auto-generated plugin for Category: tools
// Command: passgen
const axios = require('axios');

module.exports = {
    name: 'passgen',
    command: ["pwgen","password"],
    category: 'tools',
    description: 'Membuat password acak yang kuat',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        let len = parseInt(args[0]) || 12;
        if (len < 6) len = 6;
        if (len > 64) len = 64;
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
        let pw = '';
        for (let i = 0; i < len; i++) {
            pw += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        await sock.sendMessage(from, { text: `🔒 *STRONG PASSWORD GENERATOR*\n\nPassword: \`${pw}\`\nPanjang: ${len} karakter\n${PROMO_TEXT}` }, { quoted: m });
        
    }
};

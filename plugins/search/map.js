// Auto-generated plugin for Category: search
// Command: map
const axios = require('axios');

module.exports = {
    name: 'map',
    command: ["maps","lokasi"],
    category: 'search',
    description: 'Mendapatkan link peta Google Maps untuk suatu lokasi',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan nama tempat/lokasi!' }, { quoted: m });
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text)}`;
        await sock.sendMessage(from, { text: `🗺️ *GOOGLE MAPS LINK*\n\n• Tempat: *${text}*\n• Link: ${mapUrl}` }, { quoted: m });

    }
};

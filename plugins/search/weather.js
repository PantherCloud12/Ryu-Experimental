// Auto-generated plugin for Category: search
// Command: weather
const axios = require('axios');

module.exports = {
    name: 'weather',
    command: ["cuaca"],
    category: 'search',
    description: 'Melihat prakiraan cuaca di lokasi tertentu',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const kota = text.trim() || 'Jakarta';
        try {
            await sock.sendMessage(from, { text: `🔍 Mengecek cuaca ${kota}...` }, { quoted: m });
            const res = await axios.get(`https://wttr.in/${encodeURIComponent(kota)}?format=3`);
            await sock.sendMessage(from, { text: `🌤️ *INFO CUACA TERKINI*\n\n• Hasil: *${res.data.trim()}*` }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ Gagal mendapatkan info cuaca. Coba ketik kota lain.' }, { quoted: m });
        }

    }
};

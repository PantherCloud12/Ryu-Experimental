// Auto-generated plugin for Category: search
// Command: github
const axios = require('axios');

module.exports = {
    name: 'github',
    command: ["ghsearch"],
    category: 'search',
    description: 'Mencari user atau repository GitHub',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan username GitHub!' }, { quoted: m });
        try {
            const res = await axios.get(`https://api.github.com/users/${text}`);
            const u = res.data;
            const replyText = `👤 *GITHUB PROFILE*\n\n• Username: ${u.login}\n• Nama: ${u.name || '-'}\n• Bio: ${u.bio || '-'}\n• Followers: ${u.followers}\n• Following: ${u.following}\n• Public Repos: ${u.public_repos}\n• Link: ${u.html_url}`;
            await sock.sendMessage(from, { image: { url: u.avatar_url }, caption: replyText }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ User GitHub tidak ditemukan.' }, { quoted: m });
        }

    }
};

// Auto-generated plugin for Category: search
// Command: npm
const axios = require('axios');

module.exports = {
    name: 'npm',
    command: ["npmsearch"],
    category: 'search',
    description: 'Mencari package di npmjs.com',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan nama package npm!' }, { quoted: m });
        try {
            const res = await axios.get(`https://registry.npmjs.org/${text}/latest`);
            const p = res.data;
            const replyText = `📦 *NPM PACKAGE INFO*\n\n• Nama: *${p.name}*\n• Versi: ${p.version}\n• Deskripsi: ${p.description || '-'}\n• Author: ${p.author?.name || '-'}\n• License: ${p.license || '-'}\n• Homepage: ${p.homepage || '-'}`;
            await sock.sendMessage(from, { text: replyText }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ Package tidak ditemukan.' }, { quoted: m });
        }

    }
};

// Auto-generated plugin for Category: owner
// Command: delowner
const axios = require('axios');

module.exports = {
    name: 'delowner',
    command: ["hapusowner"],
    category: 'owner',
    description: 'Menghapus nomor dari daftar owner bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const isOwner = config.owner.includes(sender);
        if (!isOwner) {
            return await sock.sendMessage(from, { text: '❌ Command ini hanya untuk Owner Bot!' }, { quoted: m });
        }

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan nomor WhatsApp owner yang ingin dihapus!' }, { quoted: m });
        const cleanNumDel = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        const index = config.owner.indexOf(cleanNumDel);
        if (index > -1) {
            config.owner.splice(index, 1);
            await sock.sendMessage(from, { text: `✅ Berhasil menghapus @${cleanNumDel.split('@')[0]} dari daftar owner!`, mentions: [cleanNumDel] }, { quoted: m });
        } else {
            await sock.sendMessage(from, { text: '❌ Nomor tidak terdaftar sebagai owner!' }, { quoted: m });
        }

    }
};

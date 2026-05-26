// Auto-generated plugin for Category: owner
// Command: setprefix
module.exports = {
    name: 'setprefix',
    command: ["setprefix", "ubahprefix","gantiprefix"],
    category: 'owner',
    description: 'Mengubah karakter awalan command bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        if (!text) return await sock.sendMessage(from, { text: '❌ Tentukan karakter prefix baru (contoh: .)' }, { quoted: m });
        config.prefix = text.trim();
        await sock.sendMessage(from, { text: `✅ Prefix bot berhasil diubah menjadi: "${config.prefix}"` }, { quoted: m });

    }
};

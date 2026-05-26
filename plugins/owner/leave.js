// Auto-generated plugin for Category: owner
// Command: leave
module.exports = {
    name: 'leave',
    command: ["leave", "keluargc","out"],
    category: 'owner',
    description: 'Menyuruh bot keluar dari grup saat ini (Owner/Admin Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di dalam grup!' }, { quoted: m });
        await sock.sendMessage(from, { text: '👋 Bot pamit keluar grup. Sampai jumpa lagi!' });
        await sock.groupLeave(from);

    }
};

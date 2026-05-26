// Auto-generated plugin for Category: owner
// Command: delowner
module.exports = {
    name: 'delowner',
    command: ["delowner", "hapusowner"],
    category: 'owner',
    description: 'Menghapus nomor dari daftar owner bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

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

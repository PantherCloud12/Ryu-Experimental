// Auto-generated plugin for Category: owner
// Command: addowner
module.exports = {
    name: 'addowner',
    command: ["addowner", "tambahowner"],
    category: 'owner',
    description: 'Menambahkan nomor baru ke daftar owner bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan nomor WhatsApp yang ingin dijadikan owner! (Contoh: .addowner 62812xxx)' }, { quoted: m });
        const cleanNum = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        if (!config.owner.includes(cleanNum)) {
            config.owner.push(cleanNum);
            // Simpan perubahan secara permanen (opsional) atau di memori
            await sock.sendMessage(from, { text: `✅ Berhasil menambahkan @${cleanNum.split('@')[0]} sebagai owner baru!`, mentions: [cleanNum] }, { quoted: m });
        } else {
            await sock.sendMessage(from, { text: '❌ Nomor tersebut sudah menjadi owner!' }, { quoted: m });
        }

    }
};

module.exports = {
    name: 'setdesc',
    command: ['setdesc', 'setdeskripsi'],
    category: 'group',
    description: 'Mengubah deskripsi grup',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;

        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan deskripsi grup baru yang diinginkan!' }, { quoted: m });
        }

        try {
            await sock.groupUpdateDescription(jid, text);
            await sock.sendMessage(jid, { text: `✅ Deskripsi grup berhasil diubah!` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal mengubah deskripsi grup: ${err.message}` }, { quoted: m });
        }
    }
};

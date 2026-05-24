module.exports = {
    name: 'setname',
    command: ['setname', 'setsubject', 'gantinama'],
    category: 'group',
    description: 'Mengubah nama/subject grup',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;

        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan nama grup baru yang diinginkan!' }, { quoted: m });
        }

        try {
            await sock.groupUpdateSubject(jid, text);
            await sock.sendMessage(jid, { text: `✅ Nama grup berhasil diubah menjadi: *${text}*` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal mengubah nama grup: ${err.message}` }, { quoted: m });
        }
    }
};

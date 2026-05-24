module.exports = {
    name: 'delete',
    command: ['del', 'delete', 'hapus'],
    category: 'group',
    description: 'Menghapus pesan yang di-reply (memerlukan bot admin jika menghapus pesan orang lain)',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { quotedMsg, quotedSender, quotedId }) => {
        const jid = m.key.remoteJid;

        if (!quotedMsg) {
            return await sock.sendMessage(jid, { text: '❌ Reply pesan yang ingin dihapus!' }, { quoted: m });
        }

        try {
            await sock.sendMessage(jid, {
                delete: {
                    remoteJid: jid,
                    fromMe: quotedSender === (sock.user.id.split(':')[0] + '@s.whatsapp.net'),
                    id: quotedId,
                    participant: quotedSender
                }
            });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal menghapus pesan: ${err.message}` }, { quoted: m });
        }
    }
};

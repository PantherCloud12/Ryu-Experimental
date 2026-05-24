module.exports = {
    name: 'revoke',
    command: ['revoke', 'resetlink'],
    category: 'group',
    description: 'Mereset/menarik kembali link undangan grup',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m) => {
        const jid = m.key.remoteJid;

        try {
            await sock.groupRevokeInvite(jid);
            await sock.sendMessage(jid, { text: '✅ Link undangan grup berhasil di-reset!' }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal mereset link undangan: ${err.message}` }, { quoted: m });
        }
    }
};

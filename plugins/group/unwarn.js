module.exports = {
    name: 'unwarn',
    command: ['unwarn', 'clearwarn', 'resetwarn'],
    category: 'group',
    description: 'Mereset/menghapus jumlah peringatan member',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, mentionedJid, quotedSender, dbHelper }) => {
        const jid = m.key.remoteJid;
        
        let user = mentionedJid[0];
        if (!user && quotedSender) {
            user = quotedSender;
        }

        if (!user && text) {
            let cleanNum = text.replace(/[^0-9]/g, '');
            if (cleanNum) {
                user = cleanNum + '@s.whatsapp.net';
            }
        }

        if (!user) {
            return await sock.sendMessage(jid, { text: '❌ Tag/mention member yang ingin dihapus peringatannya atau reply pesannya!' }, { quoted: m });
        }

        const userDb = dbHelper.getUser(user, jid);
        userDb.warning = 0;
        dbHelper.save();

        const userTag = `@${user.split('@')[0]}`;
        await sock.sendMessage(jid, { 
            text: `✅ Peringatan untuk member ${userTag} berhasil di-reset menjadi 0.`, 
            mentions: [user] 
        }, { quoted: m });
    }
};

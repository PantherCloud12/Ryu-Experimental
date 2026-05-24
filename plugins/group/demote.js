module.exports = {
    name: 'demote',
    command: ['demote', 'dm'],
    category: 'group',
    description: 'Menurunkan jabatan Admin grup menjadi member biasa (tag atau reply)',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m, { text, mentionedJid, quotedSender }) => {
        const jid = m.key.remoteJid;
        
        let users = [...mentionedJid];
        if (quotedSender) {
            users.push(quotedSender);
        }

        if (users.length === 0 && text) {
            let cleanNum = text.replace(/[^0-9]/g, '');
            if (cleanNum) {
                users.push(cleanNum + '@s.whatsapp.net');
            }
        }

        if (users.length === 0) {
            return await sock.sendMessage(jid, { text: '❌ Tag/mention admin yang ingin diturunkan jabatannya atau reply pesannya!' }, { quoted: m });
        }

        users = [...new Set(users)];

        for (const user of users) {
            await sock.groupParticipantsUpdate(jid, [user], 'demote');
        }

        const tags = users.map(u => `@${u.split('@')[0]}`).join(', ');
        await sock.sendMessage(jid, { 
            text: `✅ Berhasil menurunkan jabatan admin menjadi member biasa: ${tags}`,
            mentions: users
        }, { quoted: m });
    }
};

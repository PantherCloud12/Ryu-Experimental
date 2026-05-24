module.exports = {
    name: 'kick',
    command: ['kick', 'k', 'remove'],
    category: 'group',
    description: 'Mengeluarkan member dari grup (tag atau reply)',
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
            return await sock.sendMessage(jid, { text: '❌ Tag/mention member yang ingin di-kick atau reply pesannya!' }, { quoted: m });
        }

        users = [...new Set(users)];
        const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        users = users.filter(u => u !== botJid);

        if (users.length === 0) {
            return await sock.sendMessage(jid, { text: '❌ Anda tidak dapat mengeluarkan bot itu sendiri.' }, { quoted: m });
        }

        for (const user of users) {
            await sock.groupParticipantsUpdate(jid, [user], 'remove');
        }

        const tags = users.map(u => `@${u.split('@')[0]}`).join(', ');
        await sock.sendMessage(jid, { 
            text: `✅ Berhasil mengeluarkan member: ${tags}`,
            mentions: users
        }, { quoted: m });
    }
};

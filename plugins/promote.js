module.exports = {
    name: 'promote',
    command: ['promote', 'pm'],
    category: 'group',
    description: 'Mempromosikan member menjadi Admin grup (tag atau reply)',
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
            return await sock.sendMessage(jid, { text: '❌ Tag/mention member yang ingin dipromosikan atau reply pesannya!' }, { quoted: m });
        }

        users = [...new Set(users)];

        for (const user of users) {
            await sock.groupParticipantsUpdate(jid, [user], 'promote');
        }

        const tags = users.map(u => `@${u.split('@')[0]}`).join(', ');
        await sock.sendMessage(jid, { 
            text: `✅ Berhasil mempromosikan member menjadi admin: ${tags}`,
            mentions: users
        }, { quoted: m });
    }
};

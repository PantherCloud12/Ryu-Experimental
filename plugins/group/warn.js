module.exports = {
    name: 'warn',
    command: ['warn', 'peringatan'],
    category: 'group',
    description: 'Memberikan peringatan kepada member (3x peringatan = kick)',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
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
            return await sock.sendMessage(jid, { text: '❌ Tag/mention member yang ingin diberikan peringatan atau reply pesannya!' }, { quoted: m });
        }

        const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        if (user === botJid) {
            return await sock.sendMessage(jid, { text: '❌ Anda tidak dapat memperingatkan bot.' }, { quoted: m });
        }

        const userDb = dbHelper.getUser(user, jid);
        userDb.warning = (userDb.warning || 0) + 1;
        dbHelper.save();

        const userTag = `@${user.split('@')[0]}`;
        
        if (userDb.warning >= 3) {
            await sock.sendMessage(jid, { 
                text: `⚠️ Member ${userTag} telah mencapai batas 3 kali peringatan dan akan dikeluarkan dari grup.`, 
                mentions: [user] 
            });
            await sock.groupParticipantsUpdate(jid, [user], 'remove');
            userDb.warning = 0;
            dbHelper.save();
        } else {
            await sock.sendMessage(jid, { 
                text: `⚠️ *PERINGATAN* ⚠️\n\nMember: ${userTag}\nJumlah Peringatan: *${userDb.warning}/3*\nJika mencapai 3 kali peringatan, member akan dikeluarkan secara otomatis.`,
                mentions: [user]
            }, { quoted: m });
        }
    }
};

module.exports = {
    name: 'getid',
    command: ['getid', 'jid'],
    category: 'owner',
    description: 'Mendapatkan ID Chat/Saluran/Grup saat ini',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { sender, isOwner }) => {
        const jid = m.key.remoteJid;
        
        let info = `🆔 *INFO ID*\n\n`;
        info += `• *Chat JID:* \`${jid}\`\n`;
        info += `• *Sender JID:* \`${sender}\`\n`;
        
        if (m.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            const quotedSender = m.message.extendedTextMessage.contextInfo.participant;
            info += `• *Quoted Sender:* \`${quotedSender}\`\n`;
        }

        // Jika pesan diteruskan dari saluran, coba ambil ID salurannya
        const contextInfo = m.message?.extendedTextMessage?.contextInfo || m.message?.imageMessage?.contextInfo || m.message?.videoMessage?.contextInfo;
        if (contextInfo?.forwardedNewsletterMessageInfo) {
            const newsletterJid = contextInfo.forwardedNewsletterMessageInfo.newsletterJid;
            const newsletterName = contextInfo.forwardedNewsletterMessageInfo.newsletterName;
            info += `\n📢 *INFO SALURAN (FORWARDED)*\n`;
            info += `• *Channel JID:* \`${newsletterJid}\`\n`;
            info += `• *Channel Name:* ${newsletterName || 'Tidak diketahui'}\n`;
        }

        await sock.sendMessage(jid, { text: info }, { quoted: m });
    }
};

module.exports = {
    name: 'getid',
    command: ['getid', 'jid'],
    category: 'debug',
    description: 'Mendapatkan ID Chat/Saluran/Grup saat ini',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, sender, quotedMsg, quotedSender, isGroup }) => {
        const jid = m.key.remoteJid;
        
        let info = `🆔 *INFO ID*\n\n`;
        if (isGroup) {
            info += `• *Group JID:* \`${jid}\`\n`;
        } else {
            info += `• *Chat JID:* \`${jid}\`\n`;
        }
        info += `• *Sender JID:* \`${sender}\`\n`;
        
        if (quotedMsg) {
            info += `• *Quoted Sender:* \`${quotedSender}\`\n`;
        }

        // --- 📢 EXTRACT NEWSLETTER/CHANNEL INFO ---
        let newsletterInfo = "";
        
        // 1. Check for forwarded newsletter message (Direct or Quoted)
        const contextInfo = m.message?.extendedTextMessage?.contextInfo || m.message?.imageMessage?.contextInfo || m.message?.videoMessage?.contextInfo;
        const qContextInfo = quotedMsg?.contextInfo;
        
        const newsletterForward = contextInfo?.forwardedNewsletterMessageInfo || qContextInfo?.forwardedNewsletterMessageInfo;
        
        if (newsletterForward) {
            newsletterInfo += `• *Source:* Forwarded Message\n`;
            newsletterInfo += `• *Newsletter JID:* \`${newsletterForward.newsletterJid}\`\n`;
            newsletterInfo += `• *Channel Name:* ${newsletterForward.newsletterName || 'Unknown'}\n`;
        }

        // 2. Check for Newsletter Links (regex)
        const channelLinkRegex = /whatsapp\.com\/channel\/([a-zA-Z0-9]+)/i;
        const linkInText = text.match(channelLinkRegex);
        
        // Check quoted text for link if not in current text
        let quotedText = "";
        if (quotedMsg) {
            const qType = Object.keys(quotedMsg)[0];
            quotedText = quotedMsg.conversation || quotedMsg.extendedTextMessage?.text || quotedMsg[qType]?.caption || "";
        }
        const linkInQuoted = quotedText.match(channelLinkRegex);

        const channelLink = linkInText || linkInQuoted;
        if (channelLink) {
            newsletterInfo += `• *Source:* Channel Link\n`;
            newsletterInfo += `• *Link Code:* \`${channelLink[1]}\`\n`;
            newsletterInfo += `• *Note:* Use \`.newsletter\` with this link to get the JID.\n`;
        }

        if (newsletterInfo) {
            info += `\n📢 *INFO SALURAN / NEWSLETTER*\n${newsletterInfo}`;
        }

        await sock.sendMessage(jid, { text: info }, { quoted: m });
    }
};

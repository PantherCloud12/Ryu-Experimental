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
        
        // Versi reply (quoted) - Ambil contextInfo dari pesan yang dibalas
        let qContextInfo = null;
        if (quotedMsg) {
            const qType = Object.keys(quotedMsg)[0];
            qContextInfo = quotedMsg.contextInfo || quotedMsg[qType]?.contextInfo;
        }
        
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
            // Broaden extraction: check various possible text fields in the quoted message
            quotedText = quotedMsg.conversation || 
                         quotedMsg.extendedTextMessage?.text || 
                         quotedMsg[qType]?.caption || 
                         quotedMsg[qType]?.text || 
                         "";
                         
            // DEBUG: Log if needed to console (remove later)
            // console.log('[GETID DEBUG] Quoted Type:', qType, 'Text Found:', quotedText);
        }
        
        const linkInQuoted = quotedText.match(channelLinkRegex);

        // 3. Fallback: Check contextInfo directly if it's a specific newsletter share message
        const isNewsletterShare = quotedMsg?.newsletterAdminInviteMessage || quotedMsg?.newsletterInviteMessage;
        let shareCode = "";
        if (isNewsletterShare) {
            shareCode = quotedMsg.newsletterAdminInviteMessage?.newsletterInviteCode || quotedMsg.newsletterInviteMessage?.newsletterInviteCode;
        }

        const channelLink = linkInText || linkInQuoted;
        if (channelLink || shareCode) {
            const code = shareCode || channelLink[1];
            newsletterInfo += `• *Source:* Channel Link (\`${code}\`)\n`;
            
            try {
                // Resolve Metadata Automatically
                const meta = await sock.newsletterMetadata("invite", code);
                if (meta) {
                    newsletterInfo += `• *Newsletter JID:* \`${meta.id}\`\n`;
                    // WhatsApp metadata structure can vary, check common fields
                    const channelName = meta.name || meta.subject || meta.content?.name || 'Unknown';
                    newsletterInfo += `• *Channel Name:* ${channelName}\n`;
                    if (meta.subscribers) newsletterInfo += `• *Subscribers:* ${meta.subscribers}\n`;
                } else {
                    newsletterInfo += `• *Note:* Gagal mengambil metadata otomatis.\n`;
                }
            } catch (err) {
                newsletterInfo += `• *Error:* ${err.message || 'Gagal resolve JID'}\n`;
            }
        }

        if (newsletterInfo) {
            info += `\n📢 *INFO SALURAN / NEWSLETTER*\n${newsletterInfo}`;
        }

        await sock.sendMessage(jid, { text: info }, { quoted: m });
    }
};

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
        
        // --- 🧪 ROBUST SEARCH FUNCTIONS ---
        // Mencari objek Newsletter Forward secara rekursif
        const findNewsletterForward = (obj) => {
            if (!obj || typeof obj !== 'object') return null;
            if (obj.forwardedNewsletterMessageInfo) return obj.forwardedNewsletterMessageInfo;
            for (const key in obj) {
                if (key === 'quotedMessage') continue; // Hindari rekursi ke dalam quote lain
                const found = findNewsletterForward(obj[key]);
                if (found) return found;
            }
            return null;
        };

        // Mencari Newsletter Invite Code secara rekursif
        const findInviteCode = (obj) => {
            if (!obj || typeof obj !== 'object') return null;
            if (obj.newsletterInviteCode) return obj.newsletterInviteCode;
            for (const key in obj) {
                const found = findInviteCode(obj[key]);
                if (found) return found;
            }
            return null;
        };

        // Mengekstrak semua teks dari objek pesan secara rekursif
        const extractAllText = (obj) => {
            let foundText = "";
            if (!obj || typeof obj !== 'object') return "";
            if (typeof obj === 'string') return obj;
            
            // Cek field teks umum
            const textFields = ['text', 'conversation', 'caption', 'contentText', 'footerText', 'body', 'displayName'];
            for (const field of textFields) {
                if (typeof obj[field] === 'string') foundText += obj[field] + " ";
            }

            for (const key in obj) {
                if (typeof obj[key] === 'object') {
                    foundText += extractAllText(obj[key]);
                }
            }
            return foundText;
        };

        // --- 🛠️ PROCESSING ---
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

        let newsletterInfo = "";
        
        // 1. Cek Forwarded Newsletter (Direct atau Reply)
        const nsForward = findNewsletterForward(m.message) || (quotedMsg ? findNewsletterForward(quotedMsg) : null);
        if (nsForward) {
            newsletterInfo += `• *Source:* Forwarded Message\n`;
            newsletterInfo += `• *Newsletter JID:* \`${nsForward.newsletterJid}\`\n`;
            newsletterInfo += `• *Channel Name:* ${nsForward.newsletterName || 'Unknown'}\n`;
        }

        // 2. Cek Invite Code & Links
        const inviteCode = findInviteCode(m.message) || (quotedMsg ? findInviteCode(quotedMsg) : null);
        const channelLinkRegex = /whatsapp\.com\/channel\/([a-zA-Z0-9]+)/i;
        
        const currentText = extractAllText(m.message);
        const quotedText = quotedMsg ? extractAllText(quotedMsg) : "";
        const allCombinedText = (currentText + " " + quotedText).trim();
        const linkMatch = allCombinedText.match(channelLinkRegex);

        const finalCode = inviteCode || (linkMatch ? linkMatch[1] : null);

        if (finalCode) {
            newsletterInfo += `• *Source:* Channel Link/Invite (\`${finalCode}\`)\n`;
            try {
                const meta = await sock.newsletterMetadata("invite", finalCode);
                if (meta) {
                    newsletterInfo += `• *Newsletter JID:* \`${meta.id}\`\n`;
                    // Check multiple possible name fields
                    const cName = meta.name || meta.subject || (meta.content ? meta.content.name : null) || 'Unknown';
                    newsletterInfo += `• *Channel Name:* ${cName}\n`;
                    if (meta.subscribers) newsletterInfo += `• *Subscribers:* ${meta.subscribers}\n`;
                } else if (!nsForward) {
                    newsletterInfo += `• *Note:* Gagal resolve metadata otomatis.\n`;
                }
            } catch (err) {
                if (!nsForward) newsletterInfo += `• *Error:* Gagal resolve metadata (${err.message})\n`;
            }
        }

        if (newsletterInfo) {
            info += `\n📢 *INFO SALURAN / NEWSLETTER*\n${newsletterInfo}`;
        }

        await sock.sendMessage(jid, { text: info }, { quoted: m });
    }
};

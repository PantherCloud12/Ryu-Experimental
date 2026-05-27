module.exports = {
    name: 'newsletter',
    command: ['newsletter', 'saluran', 'checknsl'],
    category: 'debug',
    description: 'Mendapatkan JID dan informasi saluran dari link WhatsApp Channel',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, quotedMsg, config }) => {
        const jid = m.key.remoteJid;
        const channelLinkRegex = /whatsapp\.com\/channel\/([a-zA-Z0-9]+)/i;
        
        // 1. Get Code from text or quoted
        let code = "";
        const matchText = text.match(channelLinkRegex);
        if (matchText) {
            code = matchText[1];
        } else if (quotedMsg) {
            const qType = Object.keys(quotedMsg)[0];
            const quotedText = quotedMsg.conversation || quotedMsg.extendedTextMessage?.text || quotedMsg[qType]?.caption || "";
            const matchQuoted = quotedText.match(channelLinkRegex);
            if (matchQuoted) code = matchQuoted[1];
        }

        if (!code) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan link saluran atau reply pesan yang berisi link saluran!\nContoh: *.newsletter https://whatsapp.com/channel/xxx*' }, { quoted: m });
        }

        try {
            await sock.sendMessage(jid, { text: `🔍 Sedang mengambil metadata untuk kode: \`${code}\`...` }, { quoted: m });
            
            // Fetch metadata using Baileys newsletterMetadata
            // Note: The 'invite' type is used to resolve from a code
            const meta = await sock.newsletterMetadata("invite", code);
            
            if (!meta) {
                return await sock.sendMessage(jid, { text: '❌ Gagal mendapatkan metadata. Pastikan link valid.' }, { quoted: m });
            }

            let response = `📢 *METADATA SALURAN*\n\n`;
            response += `• *Name:* ${meta.name || 'N/A'}\n`;
            response += `• *JID:* \`${meta.id}\`\n`;
            response += `• *Status:* ${meta.state || 'N/A'}\n`;
            response += `• *Subscribers:* ${meta.subscribers || 'N/A'}\n`;
            response += `• *Description:* ${meta.description || 'N/A'}\n`;
            
            if (meta.preview) {
                await sock.sendMessage(jid, { 
                    image: { url: meta.preview }, 
                    caption: response 
                }, { quoted: m });
            } else {
                await sock.sendMessage(jid, { text: response }, { quoted: m });
            }

        } catch (err) {
            console.error('Newsletter Error:', err);
            await sock.sendMessage(jid, { text: `❌ Gagal: ${err.message || 'Terjadi kesalahan internal.'}` }, { quoted: m });
        }
    }
};

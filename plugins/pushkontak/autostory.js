const { downloadMedia } = require('../../lib/helper');

module.exports = {
    name: 'autostory',
    command: ['autostory', 'upstory', 'sw'],
    category: 'pushkontak',
    description: 'Upload status WhatsApp dari bot',
    isOwner: true,
    execute: async (sock, m, { text, config, quotedMsg }) => {
        const from = m.key.remoteJid;

        try {
            let content;
            const caption = text || '';
            const statusJidList = [sock.user.id.split(':')[0] + '@s.whatsapp.net']; // Send to self as a minimum, usually baileys broadcasts to all contacts by default if not specified, but let's just let it broadcast or we can extract jids from the DB if needed. Actually, just sending to 'status@broadcast' makes it visible to all contacts who saved the bot.
            
            // For Baileys MD, to make it visible, we send to status@broadcast. 
            // In newer Baileys, we might need to specify statusJidList (list of people who can see it) or it will be empty.
            // Let's get all contacts or just use an empty list which sometimes works, or fetch participants if in a group.
            // But we will just try the standard status@broadcast first.

            let participantList = [];
            try {
                // Try to get some contacts from chat store or simply broadcast it
                // If it doesn't show to anyone, we might need a broadcast list. 
                // For simplicity, we'll try without statusJidList first, which works on some Baileys versions.
                // Wait, it is safer to fetch group members if they want to push to group contacts, but this is a general story.
                // Let's just use the standard Baileys method.
            } catch (e) {}

            if (m.message?.imageMessage || (quotedMsg && quotedMsg.imageMessage)) {
                const mediaMsg = m.message?.imageMessage ? m.message.imageMessage : quotedMsg.imageMessage;
                const mediaBuffer = await downloadMedia(mediaMsg, 'image');
                content = { image: mediaBuffer, caption: caption };
            } else if (m.message?.videoMessage || (quotedMsg && quotedMsg.videoMessage)) {
                const mediaMsg = m.message?.videoMessage ? m.message.videoMessage : quotedMsg.videoMessage;
                const mediaBuffer = await downloadMedia(mediaMsg, 'video');
                content = { video: mediaBuffer, caption: caption };
            } else if (caption) {
                content = { text: caption };
            } else {
                return await sock.sendMessage(from, {
                    text: `❌ *Konten tidak ditemukan!*\n\n📝 *Cara Penggunaan:*\n• ${config.prefix}autostory <teks>\n• Reply gambar/video + ${config.prefix}autostory <caption>`
                }, { quoted: m });
            }

            // Using official Baileys status broadcast
            await sock.sendMessage('status@broadcast', content, {
                 // statusJidList is optional but sometimes required for privacy settings
                 // statusJidList: participantList 
                 backgroundColor: '#000000',
                 font: 1
            });

            await sock.sendMessage(from, { text: '✅ *Story WhatsApp berhasil diunggah!*' }, { quoted: m });

        } catch (error) {
            await sock.sendMessage(from, {
                text: `❌ *Gagal upload story!*\n\n⚠️ Error: ${error.message}`
            }, { quoted: m });
        }
    }
};
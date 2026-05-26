module.exports = {
    name: 'fakecall',
    command: ['fakecall', 'fakevc', 'fcall', 'panggilpalsu'],
    category: 'hacker',
    description: 'Mengirim pesan notifikasi panggilan palsu (Voice/Video Call)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, commandName, config, quotedSender }) => {
        const from = m.key.remoteJid;
        
        // Robust target detection: mention > reply > manual number > sender
        let target = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || quotedSender || from;
        
        // Check if first arg is a number
        if (args[0] && args[0].replace(/[^0-9]/g, '').length > 5) {
            target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        }
        
        // Check if it's a video call request based on command (safety check for commandName)
        const cmd = commandName || '';
        const isVideo = cmd.includes('vc') || (args.join(' ').toLowerCase().includes('video'));
        
        // Define message structure for fake call
        // Note: This uses the protocol message for call notifications
        const callMsg = {
            scheduledCallCreationMessage: {
                callType: isVideo ? 2 : 1, // 1: Voice, 2: Video
                title: text || (isVideo ? 'Panggilan Video Masuk...' : 'Panggilan Suara Masuk...'),
                scheduledTimestampMs: Date.now()
            }
        };

        // Alternative approach using call log look
        const missedCallMsg = {
            content: isVideo ? 'Missed Video Call' : 'Missed Voice Call',
            text: isVideo ? '📞 Panggilan video tidak terjawab' : '☎️ Panggilan suara tidak terjawab',
        };

        try {
            if (args[0] === 'missed' || args[0] === 'ls') {
                // Sending a message that looks like a missed call notification
                await sock.sendMessage(from, { 
                    text: `*${isVideo ? 'VIDEO CALL' : 'VOICE CALL'} MISSED*\n\nUser: @${target.split('@')[0]}\nTime: ${new Date().toLocaleTimeString()}\n\n_This is a fake notification simulation._`,
                    mentions: [target]
                }, { quoted: m });
            } else {
                // Sending the more realistic "Scheduled Call" block which looks like a call invite/notification
                await sock.sendMessage(from, {
                    generateWithMention: true,
                    text: `📱 *INCOMING ${isVideo ? 'VIDEO' : 'VOICE'} CALL*\n\nFrom: @${target.split('@')[0]}\n\n_Tap to join the simulation._`,
                    contextInfo: {
                        mentionedJid: [target],
                        externalAdReply: {
                            title: isVideo ? 'WhatsApp Video Call' : 'WhatsApp Voice Call',
                            body: 'Tapped to answer...',
                            mediaType: 1,
                            thumbnailUrl: 'https://cdn-icons-png.flaticon.com/512/4014/4014800.png',
                            sourceUrl: 'https://wa.me/' + target.split('@')[0],
                            renderLargerThumbnail: false
                        }
                    }
                }, { quoted: m });
            }
        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal membuat fake call: ${e.message}` }, { quoted: m });
        }
    }
};

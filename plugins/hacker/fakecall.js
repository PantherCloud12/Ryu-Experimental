module.exports = {
    name: 'fakecall',
    command: ['fakecall', 'fakevc', 'fcall', 'panggilpalsu'],
    category: 'hacker',
    description: 'Mengirim notifikasi panggilan palsu (Voice/Video Call) yang terlihat asli',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, commandName, config, quotedSender }) => {
        const from = m.key.remoteJid;
        
        // Target detection order: Mention > Reply > Manual Number in args > Self
        let target = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || quotedSender;
        
        // Search for a number in any of the arguments if no target found yet
        if (!target) {
            const numberInArgs = args.find(arg => arg.replace(/[^0-9]/g, '').length > 5);
            if (numberInArgs) {
                target = numberInArgs.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            }
        }
        
        // Default to current JID if still no target
        if (!target) target = from;
        
        const cmd = commandName || '';
        const argsLower = args.join(' ').toLowerCase();
        const isVideo = cmd.includes('vc') || argsLower.includes('video') || argsLower.includes('vc');
        const isMissed = argsLower.includes('missed') || argsLower.includes('ls');
        
        try {
            if (isMissed) {
                // REALISTIC MISSED CALL (appears as system message label)
                await sock.relayMessage(from, {
                    callLogMessage: {
                        isCheck: true,
                        video: isVideo,
                        duration: 0
                    }
                }, { participant: { jid: target } });
                
                await sock.sendMessage(from, { text: `✅ *Fake Missed Call Terkirim!* (Terlihat sebagai label sistem)` }, { quoted: m });
            } else {
                // REALISTIC INCOMING CALL BLOCK
                await sock.relayMessage(from, {
                    scheduledCallCreationMessage: {
                        callType: isVideo ? 2 : 1, // 1: Voice, 2: Video
                        title: text || (isVideo ? 'Panggilan Video Masuk...' : 'Panggilan Suara Masuk...'),
                        scheduledTimestampMs: Date.now()
                    }
                }, {});

                // Add a little prank text
                await sock.sendMessage(from, {
                    text: `📱 *Incoming ${isVideo ? 'Video' : 'Voice'} Call Simulation* from @${target.split('@')[0]}`,
                    mentions: [target]
                }, { quoted: m });
            }
        } catch (e) {
            console.error('FakeCall Error:', e);
            // Fallback to ad-reply if relay fails
            await sock.sendMessage(from, {
                text: `📱 *INCOMING ${isVideo ? 'VIDEO' : 'VOICE'} CALL*\n\nFrom: @${target.split('@')[0]}`,
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
    }
};

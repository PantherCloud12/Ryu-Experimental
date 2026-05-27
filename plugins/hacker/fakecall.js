const { proto, delay } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'fakecall',
    command: ['fakecall', 'fakevc', 'fcall', 'panggilpalsu'],
    category: 'hacker',
    description: 'Simulasi panggilan sistem (Voice/Video Call) 2026',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, commandName, config, isGroup, sender, quotedSender }) => {
        const from = m.key.remoteJid;
        if (!from) return;

        // Helper to clean JID
        const clean = (jid) => {
            if (!jid) return null;
            if (typeof jid !== 'string') return null;
            const [userCombined, domain] = jid.split('@');
            const user = userCombined.split(':')[0];
            if (!domain) return user + '@s.whatsapp.net';
            return user + '@' + domain;
        };

        const botJid = clean(sock.user?.id || sock.user?.jid);

        // Target detection
        let targetJid = null;
        const argsLower = args.join(' ').toLowerCase();

        if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
            targetJid = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (quotedSender) {
            targetJid = quotedSender;
        } else if (args.length > 0) {
            const number = args.find(arg => arg && arg.replace(/[^0-9]/g, '').length > 5);
            if (number) targetJid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        }

        if (!targetJid) targetJid = from;

        const isTargetGroup = targetJid.endsWith('@g.us');
        const isVideo = commandName.toLowerCase().includes('vc') || argsLower.includes('video');

        try {
            // Participant MUST be a valid JID in the current session for encryption to work
            // Using the bot's own JID is the safest way to "spoof" a system-style message
            const participant = { jid: botJid, count: 0 };

            // STEP 1: Incoming Call Notification (Ringing Effect)
            await sock.relayMessage(targetJid, {
                scheduledCallCreationMessage: {
                    callType: isVideo ? 2 : 1,
                    scheduledTimestampMs: Date.now(),
                    title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                }
            }, { 
                participant,
                additionalAttributes: {
                    category: 'call',
                    pushname: 'WhatsApp System'
                }
            });

            // STEP 2: For Private Chat
            if (!isTargetGroup) {
                let pp = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                pp = await sock.profilePictureUrl(targetJid, 'image').catch(_ => pp);

                await sock.sendMessage(targetJid, {
                    text: `📞 *Panggilan ${isVideo ? 'Video' : 'Suara'} Masuk...*`,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: isVideo ? 'WhatsApp Video Call' : 'WhatsApp Voice Call',
                            body: 'Ketuk untuk menjawab',
                            mediaType: 1,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/0',
                            renderLargerThumbnail: true
                        }
                    }
                });

                await delay(5000);

                // STEP 3: Missed Call Log
                await sock.relayMessage(targetJid, {
                    callLogMesssage: {
                        isVideo: isVideo,
                        callOutcome: 1,
                        durationSecs: 0,
                        callType: 0
                    }
                }, { participant });
            }

            await sock.sendMessage(from, { text: `✅ *Fake Call* berhasil dikirim ke ${isTargetGroup ? 'Grup' : '@' + targetJid.split('@')[0]}`, mentions: [targetJid] }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

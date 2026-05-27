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

        // Helper to clean JID (removes device/lid suffix)
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

        // 1. Mention
        if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
            targetJid = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } 
        // 2. Reply
        else if (quotedSender) {
            targetJid = quotedSender;
        } 
        // 3. Number in args
        else if (args.length > 0) {
            const jidArg = args.find(arg => arg && (arg.endsWith('@g.us') || arg.endsWith('@s.whatsapp.net') || arg.endsWith('@lid')));
            if (jidArg) {
                targetJid = jidArg;
            } else {
                const number = args.find(arg => arg.replace(/[^0-9]/g, '').length > 5);
                if (number) targetJid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            }
        }

        // 4. Default to Group (if in group) or Self
        if (!targetJid) {
            targetJid = isGroup ? from : from;
        }

        if (!targetJid) return;

        const isTargetGroup = targetJid.endsWith('@g.us');
        const isVideo = commandName.toLowerCase().includes('vc') || argsLower.includes('video') || argsLower.includes('vc');

        try {
            // Realistic Prank Sequence
            let participantJid = isTargetGroup ? (m.key.participant || sender || botJid) : targetJid;
            participantJid = clean(participantJid) || botJid;

            // STEP 1: Incoming Call Notification (Ringing Effect)
            await sock.relayMessage(targetJid, {
                scheduledCallCreationMessage: {
                    callType: isVideo ? 2 : 1,
                    scheduledTimestampMs: Date.now(),
                    title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                }
            }, { participant: { jid: participantJid, count: 0 } });

            // STEP 2: For Private Chat - Show convincing banner
            if (!isTargetGroup) {
                let pp = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                pp = await sock.profilePictureUrl(targetJid, 'image').catch(_ => pp);
                
                const cleanNum = targetJid.split('@')[0];
                await sock.sendMessage(targetJid, {
                    text: `📞 *Panggilan ${isVideo ? 'Video' : 'Suara'} Masuk...*`,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: isVideo ? 'WhatsApp Video Call' : 'WhatsApp Voice Call',
                            body: 'Ketuk untuk menjawab',
                            mediaType: 1,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/' + cleanNum,
                            renderLargerThumbnail: true
                        }
                    }
                });

                await delay(3000);

                // STEP 3: Missed Call Log
                const cleanTarget = clean(targetJid);
                if (cleanTarget) {
                    await sock.relayMessage(targetJid, {
                        callLogMesssage: {
                            isVideo: isVideo,
                            callOutcome: 1, // Missed
                            durationSecs: 0,
                            callType: 0
                        }
                    }, { participant: { jid: cleanTarget, count: 0 } });
                }
            } else {
                // If Group, we just sent the invite banner which is enough for a "group invite" prank
                await sock.sendMessage(from, { text: '✅ Fake group call invite dikirim.' }, { quoted: m });
            }

            if (!isTargetGroup) {
                await sock.sendMessage(from, { text: '✅ Fake call berhasil diproses.' }, { quoted: m });
            }

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

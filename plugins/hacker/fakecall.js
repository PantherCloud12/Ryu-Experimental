const { proto, delay } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'fakecall',
    command: ['fakecall', 'fakevc', 'fcall', 'panggilpalsu'],
    category: 'hacker',
    description: 'Simulasi panggilan sistem (Voice/Video Call) 2026',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, commandName, config, isGroup, participants, quotedSender, sender }) => {
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
        
        // Bot JID with safety
        const botJid = clean(sock.user?.id || sock.user?.jid);

        // Target detection logic
        let targets = [];
        const argsLower = args.join(' ').toLowerCase();
        const isGroupTarget = argsLower.includes('all') || argsLower.includes('grup') || argsLower.includes('group');

        if (isGroup && isGroupTarget) {
            targets = [from]; // Target the group
        } else {
            let target = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || quotedSender;
            if (!target && args.length > 0) {
                const jidArg = args.find(arg => arg && (arg.endsWith('@g.us') || arg.endsWith('@s.whatsapp.net') || arg.endsWith('@lid')));
                if (jidArg) {
                    target = jidArg;
                } else {
                    const number = args.find(arg => arg.replace(/[^0-9]/g, '').length > 5);
                    if (number) target = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                }
            }
            if (!target) {
                // If in group and no target, target the sender
                target = isGroup ? (m.key.participant || sender) : from;
            }
            targets = [target];
        }

        const cmd = commandName.toLowerCase();
        const isVideo = cmd.includes('vc') || argsLower.includes('video') || argsLower.includes('vc');
        
        // Help Menu
        if (args.length === 0 || argsLower.includes('help')) {
            const menu = `*📱 FAKE CALL SYSTEM 2026 📱*

*Perintah:*
1. \`!fakecall missed\` -> Log tak terjawab.
2. \`!fakecall prank\` -> Notif sistem (ringing style).
3. \`!fakecall group\` -> Invite grup ke telepon.

*Contoh:*
- \`!fakecall prank @user\`
- \`!fakecall group\` (di dalam grup)
- \`!fakevc prank\` (panggilan video)`;
            return await sock.sendMessage(from, { text: menu }, { quoted: m });
        }

        try {
            for (const targetJid of targets) {
                if (!targetJid) continue;
                const isTargetGroup = targetJid.endsWith('@g.us');
                
                // PP for realism
                let pp = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                if (!isTargetGroup) {
                    pp = await sock.profilePictureUrl(targetJid, 'image').catch(_ => pp);
                }

                if (argsLower.includes('prank') || (isGroupTarget && isTargetGroup)) {
                    // Participant must be a valid INDIVIDUAL JID
                    let participantJid = isTargetGroup ? (m.key.participant || sender || botJid) : targetJid;
                    participantJid = clean(participantJid) || botJid; // Fallback to bot if cleaning fails
                    
                    if (!participantJid) {
                        console.error('FakeCall: No valid participant JID found.');
                        continue;
                    }

                    // STEP 1: Send Scheduled Call Creation
                    // Count is REQUIRED by Baileys internal encryption logic (calling .toString())
                    await sock.relayMessage(targetJid, {
                        scheduledCallCreationMessage: {
                            callType: isVideo ? 2 : 1,
                            scheduledTimestampMs: Date.now(),
                            title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                        }
                    }, { participant: { jid: participantJid, count: 0 } });

                    // STEP 2: For Private Chat
                    if (!isTargetGroup) {
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
                                    callOutcome: 1,
                                    durationSecs: 0,
                                    callType: 0
                                }
                            }, { participant: { jid: cleanTarget, count: 0 } });
                        }
                    }
                } else if (argsLower.includes('missed')) {
                    const cleanTarget = clean(targetJid);
                    if (cleanTarget) {
                        await sock.relayMessage(targetJid, {
                            callLogMesssage: {
                                isVideo: isVideo,
                                callOutcome: 1,
                                durationSecs: 0,
                                callType: 0
                            }
                        }, { participant: { jid: cleanTarget, count: 0 } });
                    }
                }
            }

            await sock.sendMessage(from, { text: '✅ Fake call berhasil diproses.' }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

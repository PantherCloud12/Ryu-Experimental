const { proto, delay } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'fakecall',
    command: ['fakecall', 'fakevc', 'fcall', 'panggilpalsu'],
    category: 'hacker',
    description: 'Simulasi panggilan sistem (Voice/Video Call) 2026',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, commandName, config, isGroup, participants, quotedSender }) => {
        const from = m.key.remoteJid;
        
        // Target detection logic
        let targets = [];
        const argsLower = args.join(' ').toLowerCase();
        const isGroupTarget = argsLower.includes('all') || argsLower.includes('grup') || argsLower.includes('group');

        if (isGroup && isGroupTarget) {
            targets = [from]; // Target the group itself
        } else {
            let target = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || quotedSender;
            if (!target && args.length > 0) {
                const jidArg = args.find(arg => arg.endsWith('@g.us') || arg.endsWith('@s.whatsapp.net'));
                if (jidArg) {
                    target = jidArg;
                } else {
                    const number = args.find(arg => arg.replace(/[^0-9]/g, '').length > 5);
                    if (number) target = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                }
            }
            if (!target) target = isGroup ? m.key.participant : from;
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
                const isTargetGroup = targetJid.endsWith('@g.us');
                
                // Get PP for realism
                let pp = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                if (!isTargetGroup) {
                    pp = await sock.profilePictureUrl(targetJid, 'image').catch(_ => pp);
                }

                if (argsLower.includes('prank') || (isGroupTarget && isTargetGroup)) {
                    // STEP 1: Send Scheduled Call Creation (The "Banner")
                    await sock.relayMessage(targetJid, {
                        scheduledCallCreationMessage: {
                            callType: isVideo ? 2 : 1,
                            scheduledTimestampMs: Date.now(),
                            title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                        }
                    }, { participant: { jid: isTargetGroup ? (m.key.participant || sock.user.id) : targetJid } });

                    // STEP 2: For Private Chat, send a realistic Ad Reply
                    if (!isTargetGroup) {
                        await sock.sendMessage(targetJid, {
                            text: `📞 *Panggilan ${isVideo ? 'Video' : 'Suara'} Masuk...*`,
                            contextInfo: {
                                externalAdReply: {
                                    showAdAttribution: true,
                                    title: isVideo ? 'WhatsApp Video Call' : 'WhatsApp Voice Call',
                                    body: 'Ketuk untuk menjawab',
                                    mediaType: 1,
                                    thumbnailUrl: pp,
                                    sourceUrl: 'https://wa.me/' + targetJid.split('@')[0],
                                    renderLargerThumbnail: true
                                }
                            }
                        });

                        await delay(3000); // Ringing simulation

                        // STEP 3: Log as Missed
                        await sock.relayMessage(targetJid, {
                            callLogMesssage: {
                                isVideo: isVideo,
                                callOutcome: 1, // MISSED
                                durationSecs: 0,
                                callType: 0 // REGULAR
                            }
                        }, { participant: { jid: targetJid } });
                    }
                } else if (argsLower.includes('missed')) {
                    await sock.relayMessage(targetJid, {
                        callLogMesssage: {
                            isVideo: isVideo,
                            callOutcome: 1,
                            durationSecs: 0,
                            callType: 0
                        }
                    }, { participant: { jid: targetJid } });
                }
            }

            await sock.sendMessage(from, { text: '✅ Fake call berhasil diproses.' }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            // More detailed error for the user to help debug
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || 'Unknown Error'}\nPastikan bot memiliki izin yang cukup.` }, { quoted: m });
        }
    }
};

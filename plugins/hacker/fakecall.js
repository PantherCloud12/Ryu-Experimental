const { proto, delay } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'fakecall',
    command: ['fakecall', 'fakevc', 'fcall', 'panggilpalsu'],
    category: 'hacker',
    description: 'Mengirim notifikasi panggilan palsu (Voice/Video Call) yang terlihat asli',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, commandName, config, isGroup, participants, quotedSender }) => {
        const from = m.key.remoteJid;
        
        // Target detection
        let targets = [];
        const argsLower = args.join(' ').toLowerCase();
        const isGroupTarget = argsLower.includes('all') || argsLower.includes('grup') || argsLower.includes('group');

        if (isGroup && isGroupTarget) {
            // Target the group JID itself for a collective invite effect
            targets = [from];
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
        
        // Show help menu if no arguments or help is asked
        if (args.length === 0 || argsLower.includes('help')) {
            const menu = `*📱 FAKE CALL SYSTEM 2026 📱*

Gunakan perintah ini untuk simulasi panggilan sistem yang terlihat sangat asli!

*Pilihan Perintah:*
1. \`!fakecall missed\` -> Panggilan suara tak terjawab.
2. \`!fakevc missed\` -> Panggilan video tak terjawab.
3. \`!fakecall [durasi]s\` -> Simulasi durasi (misal: 15s).
4. \`!fakecall prank\` -> (REKOMENDASI) Berdering lalu tak terjawab.
5. \`!fakecall group\` -> Kirim invite panggilan ke seluruh grup.

*Target:*
- Tag orangnya: \`!fakecall prank @user\`
- Group: \`!fakecall prank group\`
- Reply pesannya: \`!fakecall prank\`
- Default: Diri sendiri / Pengirim`;
            return await sock.sendMessage(from, { text: menu }, { quoted: m });
        }

        try {
            for (const targetJid of targets) {
                const isTargetGroup = targetJid.endsWith('@g.us');
                
                // Get Target Profile Picture for Realism (if not group)
                const pp = !isTargetGroup ? await sock.profilePictureUrl(targetJid, 'image').catch(_ => 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png') : null;
                const cleanNumber = !isTargetGroup ? targetJid.split('@')[0] : '';

                if (argsLower.includes('prank') || (isGroupTarget && isTargetGroup)) {
                    // STEP 1: Incoming Call Notification (Scheduled Call)
                    // This creates the "Join" banner in groups or "Incoming" notification for individuals
                    await sock.relayMessage(targetJid, {
                        scheduledCallCreationMessage: {
                            callType: isVideo ? 2 : 1,
                            scheduledTimestampMs: Date.now(),
                            title: isVideo ? 'Incoming Video Call...' : 'Incoming Voice Call...'
                        }
                    }, { participant: { jid: '0@s.whatsapp.net' } });

                    // STEP 2: Realistic Banner with Ad Attribution (for Individuals)
                    if (!isTargetGroup) {
                        await sock.sendMessage(targetJid, {
                            text: `📞 *Panggilan ${isVideo ? 'Video' : 'Suara'} Masuk...*`,
                            contextInfo: {
                                externalAdReply: {
                                    showAdAttribution: true,
                                    title: isVideo ? 'WhatsApp Video Call' : 'WhatsApp Voice Call',
                                    body: 'Sent by System Notification',
                                    mediaType: 1,
                                    thumbnailUrl: pp,
                                    sourceUrl: 'https://wa.me/' + cleanNumber,
                                    renderLargerThumbnail: true
                                },
                                participant: '0@s.whatsapp.net'
                            }
                        });
                    }

                    // Wait 3 seconds to simulate ringing before changing to missed (if not just group invite)
                    if (!isGroupTarget) {
                        await delay(3000);
                        // STEP 3: Missed Call Log
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
                            callOutcome: 1, // MISSED
                            durationSecs: 0,
                            callType: 0 // REGULAR
                        }
                    }, { participant: { jid: targetJid } });

                } else if (/\d+s/.test(argsLower)) {
                    const duration = parseInt(argsLower.match(/(\d+)s/)[1]) || 0;
                    await sock.relayMessage(targetJid, {
                        callLogMesssage: {
                            isVideo: isVideo,
                            callOutcome: 0, // CONNECTED
                            durationSecs: duration,
                            callType: 0 // REGULAR
                        }
                    }, { participant: { jid: targetJid } });
                }
            }

            if (isGroupTarget) {
                await sock.sendMessage(from, { text: `✅ *Fake Call System Invite telah dikirim ke Grup.*` }, { quoted: m });
            } else {
                await sock.sendMessage(from, { text: `✅ *Fake Call Selesai dikirim.*` }, { quoted: m });
            }

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: '❌ Terjadi kesalahan saat mengirim fake call.' }, { quoted: m });
        }
    }
};

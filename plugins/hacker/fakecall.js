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
            // STEP 1: TRIGGER REAL RINGING UI (Status Offer)
            // Ini akan memicu HP target berdering/muncul banner panggilan masuk aktif
            await sock.relayMessage(targetJid, {
                call: {
                    callKey: Buffer.alloc(16),
                }
            }, { 
                participant: { jid: botJid, count: 0 },
                additionalAttributes: {
                    status: 'offer',
                    category: 'call',
                    pushname: 'WhatsApp System'
                }
            });

            // STEP 2: SEND CALL INVITE (Bubble with Join Button)
            await sock.relayMessage(targetJid, {
                scheduledCallCreationMessage: {
                    callType: isVideo ? 2 : 1,
                    scheduledTimestampMs: Date.now(),
                    title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                }
            }, { 
                participant: { jid: botJid, count: 0 },
                additionalAttributes: {
                    category: 'call'
                }
            });

            // STEP 3: WAIT FOR RINGING EFFECT
            await delay(5000);

            // STEP 4: SEND OFFICIAL MISSED CALL LOG (User's Recommended Method)
            // Menggunakan identitas System (0@s.whatsapp.net) via Quoted
            await sock.sendMessage(targetJid, {
                text: `📞 *Panggilan ${isVideo ? 'Video' : 'Suara'} Tak Terjawab*`,
            }, {
                quoted: {
                    key: { 
                        remoteJid: '0@s.whatsapp.net', 
                        fromMe: false, 
                        id: 'BAE5' + Math.random().toString(36).substring(7).toUpperCase()
                    },
                    message: {
                        callLogMessage: {
                            isPreVOD: false,
                            video: isVideo, 
                            callStatus: 1, 
                        }
                    }
                }
            });

            await sock.sendMessage(from, { text: `✅ *Real Fake Call* (Nelpon) berhasil dikirim ke ${isTargetGroup ? 'Grup' : '@' + targetJid.split('@')[0]}`, mentions: [targetJid] }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

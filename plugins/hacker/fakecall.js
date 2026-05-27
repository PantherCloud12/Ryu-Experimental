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

        const botJid = sock.user.id; // Full JID with device for creator
        const cleanBotJid = clean(botJid);

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
            // STEP 1: TRIGGER REAL CALL SIGNAL (Raw Node)
            // Ini adalah metode paling hardcore untuk membuat HP target berdering
            await sock.sendNode({
                tag: 'call',
                attrs: {
                    to: targetJid,
                    from: botJid,
                    id: sock.generateMessageTag(),
                    t: Math.floor(Date.now() / 1000).toString()
                },
                content: [
                    {
                        tag: 'offer',
                        attrs: {
                            'call-id': 'CA' + Math.random().toString(36).substring(7).toUpperCase(),
                            'call-creator': botJid,
                            'count': '0'
                        },
                        content: [
                            { tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined },
                            { tag: 'net', attrs: { medium: '3' }, content: undefined },
                            { tag: 'capability', attrs: { ver: '1' }, content: Buffer.from([1, 4, 2, 5]) }
                        ]
                    }
                ]
            });

            // STEP 2: SEND CALL INVITE BUBBLE (For Group and Private)
            await sock.relayMessage(targetJid, {
                scheduledCallCreationMessage: {
                    callType: isVideo ? 2 : 1,
                    scheduledTimestampMs: Date.now(),
                    title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                }
            }, { 
                participant: { jid: cleanBotJid, count: 0 }
            });

            // STEP 3: WAIT FOR RINGING
            await delay(5000);

            // STEP 4: SEND OFFICIAL MISSED CALL LOG (System Style)
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

            await sock.sendMessage(from, { text: `✅ *Real Call Prank* (Nelpon) berhasil dikirim ke ${isTargetGroup ? 'Grup' : '@' + targetJid.split('@')[0]}`, mentions: [targetJid] }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

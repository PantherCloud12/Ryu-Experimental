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

        const botJid = sock.user?.id || sock.user?.jid;
        const cleanBotJid = clean(botJid);
        const isTargetGroup = targetJid.endsWith('@g.us');
        const isVideo = commandName.toLowerCase().includes('vc') || argsLower.includes('video');

        // Normalize target for signaling (remove device ID)
        const signalingTarget = clean(targetJid);

        try {
            const results = {
                ringingSignal: "not_started",
                historyLog: "not_started"
            };

            const callId = Math.floor(100000 + Math.random() * 900000).toString();
            
            // 1. SEND RAW SIGNALING NODE (REAL RINGING)
            // Mengirim node 'call' dengan status 'offer' secara langsung ke protokol
            try {
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
                                'call-id': callId,
                                'call-creator': botJid
                            },
                            content: [
                                { tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined },
                                { tag: 'net', attrs: { medium: '3' }, content: undefined }
                            ]
                        }
                    ]
                });
                results.ringingSignal = "success (node sent)";
            } catch (e) { results.ringingSignal = "error: " + e.message; }

            // 2. SEND OFFICIAL CALL LOG TO HISTORY
            try {
                results.historyLog = await sock.relayMessage(targetJid, {
                    callLogMesssage: {
                        isVideo: isVideo,
                        callOutcome: 1, // MISSED
                        durationSecs: 0,
                        callType: 0,
                        participants: [{ jid: signalingTarget, callOutcome: 1 }]
                    }
                }, { 
                    participant: { jid: cleanBotJid, count: 0 },
                    additionalAttributes: {
                        category: 'call',
                        pushname: 'WhatsApp'
                    }
                }) || "success";
            } catch (e) { results.historyLog = "error: " + e.message; }

            // Log to console for VPS monitoring
            console.log(`[FakeCall] Raw Processed for ${targetJid}. Results:`, JSON.stringify(results, null, 2));

            // Respon murni ke user
            const pureResponse = JSON.stringify(results, null, 2);
            await sock.sendMessage(from, { 
                text: `✅ *Nelpon Prank Processed (Raw Node)*\n\n*Pure Response:*\n\`\`\`json\n${pureResponse}\n\`\`\`` 
            }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

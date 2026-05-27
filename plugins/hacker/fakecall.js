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
                callOffer: "not_started",
                inviteMessage: "not_started",
                missedLog: "not_started"
            };

            const callId = 'CA' + Math.random().toString(36).substring(7).toUpperCase();
            
            // 1. SIGNAL CALL OFFER (REAL RINGING ATTEMPT)
            try {
                const queryRes = await sock.query({
                    tag: 'call',
                    attrs: {
                        from: botJid,
                        to: signalingTarget,
                        id: sock.generateMessageTag(),
                        t: Math.floor(Date.now() / 1000).toString()
                    },
                    content: [
                        {
                            tag: 'offer',
                            attrs: {
                                'call-id': callId,
                                'call-creator': botJid,
                                'count': '0'
                            },
                            content: [
                                { tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined },
                                { tag: 'net', attrs: { medium: '3' }, content: undefined }
                            ]
                        }
                    ]
                });
                results.callOffer = queryRes || "success_no_response";
            } catch (e) { 
                results.callOffer = "error";
                results.callOfferDetail = e.message; 
            }

            // 2. SEND CALL INVITE BUBBLE
            try {
                results.inviteMessage = await sock.relayMessage(targetJid, {
                    scheduledCallCreationMessage: {
                        callType: isVideo ? 2 : 1,
                        scheduledTimestampMs: Date.now(),
                        title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                    }
                }, { participant: { jid: cleanBotJid, count: 0 } }) || "success";
            } catch (e) { results.inviteMessage = "error: " + e.message; }

            await delay(2000);

            // 3. SEND OFFICIAL MISSED CALL LOG
            try {
                results.missedLog = await sock.relayMessage(targetJid, {
                    callLogMesssage: {
                        isVideo: isVideo,
                        callOutcome: 1, 
                        durationSecs: 0,
                        callType: 0
                    }
                }, { participant: { jid: cleanBotJid, count: 0 } }) || "success";
            } catch (e) { results.missedLog = "error: " + e.message; }

            // Log to console for VPS monitoring
            console.log(`[FakeCall] Processed for ${targetJid}. Results:`, JSON.stringify(results, null, 2));

            // Respon murni ke user
            const pureResponse = JSON.stringify(results, null, 2);
            await sock.sendMessage(from, { 
                text: `✅ *Nelpon Prank Processed*\n\n*Pure Response:*\n\`\`\`json\n${pureResponse}\n\`\`\`` 
            }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

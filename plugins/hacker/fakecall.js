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
                ringingTrigger: "not_started",
                inviteBanner: "not_started",
                callHistory: "not_started"
            };

            const callId = 'CA' + Math.random().toString(36).substring(7).toUpperCase();
            
            // 1. TRIGGER REAL RINGING UI (Status Offer)
            // Ini yang memicu HP target berdering/muncul banner panggilan aktif
            try {
                results.ringingTrigger = await sock.relayMessage(targetJid, {
                    call: {
                        callKey: Buffer.alloc(16),
                    }
                }, { 
                    participant: { jid: cleanBotJid, count: 0 },
                    additionalAttributes: {
                        status: 'offer',
                        category: 'call',
                        pushname: 'WhatsApp System'
                    }
                }) || "success";
            } catch (e) { results.ringingTrigger = "error: " + e.message; }

            // 2. SEND CALL INVITE BANNER (With Join Button)
            try {
                results.inviteBanner = await sock.relayMessage(targetJid, {
                    scheduledCallCreationMessage: {
                        callType: isVideo ? 2 : 1,
                        scheduledTimestampMs: Date.now(),
                        title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                    }
                }, { 
                    participant: { jid: cleanBotJid, count: 0 },
                    additionalAttributes: {
                        category: 'call'
                    }
                }) || "success";
            } catch (e) { results.inviteBanner = "error: " + e.message; }

            await delay(3000);

            // 3. SEND OFFICIAL CALL HISTORY LOG (Appear in Call Tab)
            try {
                results.callHistory = await sock.relayMessage(targetJid, {
                    callLogMesssage: {
                        isVideo: isVideo,
                        callOutcome: 1, // MISSED
                        durationSecs: 0,
                        callType: 0
                    }
                }, { participant: { jid: signalingTarget, count: 0 } }) || "success";
            } catch (e) { results.callHistory = "error: " + e.message; }

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

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
            const [userCombined, domain] = jid.split('@');
            const user = userCombined.split(':')[0];
            return user + '@' + (domain || 's.whatsapp.net');
        };

        const botJid = clean(sock.user?.id || sock.user?.jid);
        const isVideo = commandName.toLowerCase().includes('vc') || text.toLowerCase().includes('video');

        // Target detection
        let targetJid = null;
        if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
            targetJid = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (quotedSender) {
            targetJid = quotedSender;
        } else if (args.length > 0) {
            const number = args.find(arg => arg && arg.replace(/[^0-9]/g, '').length > 5);
            if (number) targetJid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        }

        // SHOW MENU IF NO TARGET (And not in a direct command context with text)
        if (!targetJid && args.length === 0) {
            return sock.sendMessage(from, { 
                text: `📞 *RYU FAKE CALL MENU*\n\n` +
                      `Pilih target untuk mulai prank:\n` +
                      `• .fakecall @tag\n` +
                      `• .fakecall nomor (contoh: 628xxx)\n` +
                      `• .fakevc (untuk Video Call)\n\n` +
                      `_Metode: Raw Protocol Ringing + System History Inject._`
            }, { quoted: m });
        }

        if (!targetJid) targetJid = from;
        const signalingTarget = clean(targetJid);

        try {
            const results = {
                ringing: "not_started",
                history: "not_started"
            };

            const callId = Math.random().toString(36).substring(2, 10).toUpperCase();
            
            // 1. ATTEMPT REAL RINGING (Status Offer)
            try {
                await sock.relayMessage(targetJid, {
                    call: {
                        callKey: Buffer.from(Math.random().toString(36).substring(2, 18)),
                    }
                }, { 
                    participant: { jid: botJid, count: 0 },
                    additionalAttributes: {
                        status: 'offer',
                        category: 'call',
                        pushname: 'WhatsApp System'
                    }
                });
                results.ringing = "success (offer sent)";
            } catch (e) { results.ringing = "error: " + e.message; }

            await delay(1000);

            // 2. INJECT TO CALL HISTORY (Quoted System Identity)
            try {
                results.history = await sock.sendMessage(targetJid, {
                    text: `📞 *Panggilan ${isVideo ? 'Video' : 'Suara'} Tak Terjawab*`
                }, {
                    quoted: {
                        key: {
                            remoteJid: '0@s.whatsapp.net',
                            fromMe: false,
                            id: 'SYSTEM-' + callId
                        },
                        message: {
                            callLogMesssage: {
                                isVideo: isVideo,
                                callOutcome: 1, // MISSED
                                durationSecs: 0,
                                callType: 0
                            }
                        }
                    }
                }) || "success";
            } catch (e) { results.history = "error: " + e.message; }

            // Log to console for VPS monitoring
            console.log(`[FakeCall] Executed for ${targetJid}.`, results);

            // Feedback to user
            await sock.sendMessage(from, { 
                text: `✅ *Nelpon Prank Processed*\n\n*Target:* @${targetJid.split('@')[0]}\n*Type:* ${isVideo ? 'Video' : 'Voice'}\n\n_Note: Jika tidak berdering, kemungkinan diblokir oleh sistem WhatsApp target._`,
                mentions: [targetJid]
            }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

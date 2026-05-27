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

        // If no target, use current chat (works for both private and group)
        if (!targetJid) targetJid = from;

        const isTargetGroup = targetJid.endsWith('@g.us');
        const isVideo = commandName.toLowerCase().includes('vc') || argsLower.includes('video');

        try {
            // METODE FAKECALL SYSTEM 2026 (REAL RINGING STYLE)
            // Menggunakan identitas System (0@s.whatsapp.net) agar muncul banner telepon resmi
            
            // STEP 1: Kirim "Scheduled Call" dengan kategori 'call' untuk memicu ringing/banner aktif
            await sock.relayMessage(targetJid, {
                scheduledCallCreationMessage: {
                    callType: isVideo ? 2 : 1, // 1: Voice, 2: Video
                    scheduledTimestampMs: Date.now(),
                    title: isVideo ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...'
                }
            }, { 
                participant: { jid: '0@s.whatsapp.net', count: 0 },
                additionalAttributes: {
                    category: 'call',
                    pushname: 'WhatsApp System'
                }
            });

            // STEP 2: Jika chat pribadi, kirim simulasi "Ringing" agar banner muncul di bar notifikasi
            if (!isTargetGroup) {
                let pp = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                pp = await sock.profilePictureUrl(targetJid, 'image').catch(_ => pp);

                await sock.sendMessage(targetJid, {
                    text: `📞 *Panggilan ${isVideo ? 'Video' : 'Suara'} Masuk...*`,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: isVideo ? 'WhatsApp Video Call' : 'WhatsApp Voice Call',
                            body: 'Ketuk untuk menjawab',
                            mediaType: 1,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/0',
                            renderLargerThumbnail: true
                        }
                    }
                });

                // Tunggu sebentar seolah-olah berdering
                await delay(5000);

                // STEP 3: Ubah menjadi "Missed Call" di log sistem
                await sock.relayMessage(targetJid, {
                    callLogMesssage: {
                        isVideo: isVideo,
                        callOutcome: 1, // 1: Missed, 0: Connected
                        durationSecs: 0,
                        callType: 0
                    }
                }, { participant: { jid: '0@s.whatsapp.net', count: 0 } });
            }

            await sock.sendMessage(from, { text: `✅ *Fake System Call* berhasil dikirim ke ${isTargetGroup ? 'Grup' : '@' + targetJid.split('@')[0]}`, mentions: [targetJid] }, { quoted: m });

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

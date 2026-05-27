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

        const isTargetGroup = targetJid.endsWith('@g.us');
        const isVideo = commandName.toLowerCase().includes('vc') || argsLower.includes('video');

        try {
            // 1. Dapatkan Foto Profil Target untuk Banner
            let pp = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
            try {
                pp = await sock.profilePictureUrl(targetJid, 'image');
            } catch (e) {}

            // 2. KIRIM BANNER "PANGGILAN MASUK" (Memicu Bar Notifikasi)
            // Ini yang bikin HP target seolah-olah dapet telepon beneran di bar atas
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

            // Jeda biar kelihatan lagi berdering
            await delay(4000);

            // 3. KIRIM LOG "MISSED CALL" (Metode Quoted)
            // Ini untuk ninggalin jejak log resmi di dalem chat
            const result = await sock.sendMessage(targetJid, {
                text: `☎️ *Panggilan ${isVideo ? 'Video' : 'Suara'} Tak Terjawab*`,
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
                            callStatus: 1, // 1: Missed
                        }
                    }
                }
            });

            // Respon sukses ke pengirim (disembunyikan biar nggak ngerusak prank)
            if (from !== targetJid) {
                await sock.sendMessage(from, { text: `✅ *Fake Call Prank* terkirim ke @${targetJid.split('@')[0]}`, mentions: [targetJid] }, { quoted: m });
                console.log('Pure Response:', JSON.stringify(result, null, 2));
            }

        } catch (e) {
            console.error('FakeCall Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal: ${e.message || String(e)}` }, { quoted: m });
        }
    }
};

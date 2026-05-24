const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const crypto = require('crypto');
const { downloadMedia } = require('../../lib/helper');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    name: 'swgc',
    command: ['swgc', 'statusgc'],
    category: 'group',
    description: 'Memposting status grup menggunakan groupStatusMessageV2',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        const isOwner = config.owner.includes(sender);

        try {
            let targetJid = from;
            let caption = args.join(' ') || null;

            // Check if user specifies target group via text: "caption|target_jid"
            if (text && text.includes('|')) {
                const parts = text.split('|');
                caption = parts[0].trim() || null;
                targetJid = parts[1].trim();
                if (!targetJid.endsWith('@g.us')) {
                    targetJid = targetJid + '@g.us';
                }
            }

            if (!targetJid.endsWith('@g.us')) {
                return await sock.sendMessage(from, {
                    text: `❌ *Target Harus Berupa Grup!*\n\n⚠️ Silakan gunakan di dalam grup atau tentukan target grup JID.\n\n📝 *Contoh:* \n${config.prefix}swgc Halo semua|120363211234@g.us`
                }, { quoted: m });
            }

            // Fetch target group metadata
            let targetMeta = null;
            if (targetJid === from && isGroup) {
                targetMeta = groupMetadata;
            } else {
                targetMeta = await sock.groupMetadata(targetJid).catch(() => null);
            }

            if (!targetMeta) {
                return await sock.sendMessage(from, {
                    text: `❌ *Grup Tidak Ditemukan!*\n\n⚠️ Bot tidak ada di grup target atau JID grup tidak valid: ${targetJid}`
                }, { quoted: m });
            }

            const targetAdmins = targetMeta.participants.filter(p => !!p.admin).map(p => p.id);
            const isSenderTargetAdmin = targetAdmins.includes(sender);

            // Validation: Sender must be owner or admin in target group
            if (!isOwner && !isSenderTargetAdmin) {
                return await sock.sendMessage(from, {
                    text: `❌ *Akses Ditolak!*\n\n⚠️ Anda harus menjadi admin di grup target atau owner bot!`
                }, { quoted: m });
            }

            // Validation: Bot must be admin in target group
            const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const isBotTargetAdmin = targetAdmins.includes(botJid);
            if (!isBotTargetAdmin) {
                return await sock.sendMessage(from, {
                    text: `❌ *Bot Bukan Admin!*\n\n⚠️ Bot harus menjadi admin di grup target untuk mengirim status group!`
                }, { quoted: m });
            }

            let content;

            // Check message attachment types (image, video)
            if (m.message?.imageMessage) {
                const mediaBuffer = await downloadMedia(m.message.imageMessage, 'image');
                content = { image: mediaBuffer, caption: caption || '' };
            } else if (m.message?.videoMessage) {
                let mediaBuffer;
                let retries = 3;
                while (retries > 0) {
                    try {
                        mediaBuffer = await downloadMedia(m.message.videoMessage, 'video');
                        break;
                    } catch (e) {
                        retries--;
                        if (retries === 0) throw new Error('Gagal download video, coba lagi');
                        await delay(2000);
                    }
                }
                content = { video: mediaBuffer, caption: caption || '' };
            } else if (quotedMsg && quotedMsg.imageMessage) {
                const mediaBuffer = await downloadMedia(quotedMsg.imageMessage, 'image');
                content = { image: mediaBuffer, caption: caption || '' };
            } else if (quotedMsg && quotedMsg.videoMessage) {
                let mediaBuffer;
                let retries = 3;
                while (retries > 0) {
                    try {
                        mediaBuffer = await downloadMedia(quotedMsg.videoMessage, 'video');
                        break;
                    } catch (e) {
                        retries--;
                        if (retries === 0) throw new Error('Gagal download video, coba lagi');
                        await delay(2000);
                    }
                }
                content = { video: mediaBuffer, caption: caption || '' };
            } else if (caption) {
                content = { text: caption };
            } else {
                return await sock.sendMessage(from, {
                    text: `❌ *Konten tidak ditemukan!*

📝 *Cara Penggunaan:*
• ${config.prefix}swgc <teks>
• ${config.prefix}swgc <teks>|<id_grup>
• Reply gambar + ${config.prefix}swgc <caption>
• Reply gambar + ${config.prefix}swgc <caption>|<id_grup>
• Reply video + ${config.prefix}swgc <caption>
• Reply video + ${config.prefix}swgc <caption>|<id_grup>

📌 *Contoh:*
${config.prefix}swgc Selamat datang semua!
${config.prefix}swgc Info penting!|120363211234@g.us
${PROMO_TEXT}

${config.botName}`
                }, { quoted: m });
            }

            const messageSecret = crypto.randomBytes(32);

            const inside = await generateWAMessageContent(content, {
                upload: sock.waUploadToServer
            });

            const statusMsg = generateWAMessageFromContent(
                targetJid,
                {
                    groupStatusMessageV2: {
                        message: {
                            ...inside,
                            messageContextInfo: { messageSecret }
                        }
                    }
                },
                {}
            );

            await sock.relayMessage(targetJid, statusMsg.message, { messageId: statusMsg.key.id });

            await sock.sendMessage(from, {
                text: `✅ *STATUS GROUP BERHASIL DIBUAT!*\n\n📢 Status group telah diposting di: *${targetMeta.subject}*\n${PROMO_TEXT}\n\n${config.botName}`
            }, { quoted: m });

        } catch (error) {
            await sock.sendMessage(from, {
                text: `❌ *Gagal buat status group!*\n\n⚠️ *Error:*\n${error.message}\n${PROMO_TEXT}\n\n${config.botName}`
            }, { quoted: m });
        }
    }
};

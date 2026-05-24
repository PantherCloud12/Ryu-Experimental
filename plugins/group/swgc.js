const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const crypto = require('crypto');
const { downloadMedia } = require('../../lib/helper');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    name: 'swgc',
    command: ['swgc', 'statusgc'],
    category: 'group',
    description: 'Memposting status grup menggunakan groupStatusMessageV2',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, isAdmin, isBotAdmin, isOwner, config, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            // Check if sender is admin or owner
            if (!isAdmin && !isOwner) {
                return await sock.sendMessage(from, {
                    text: `❌ *Akses Ditolak!*\n\n⚠️ Command ini hanya untuk Admin Group!\n${PROMO_TEXT}\n\n${config.botName}`
                }, { quoted: m });
            }

            // Check if bot is admin
            if (!isBotAdmin) {
                return await sock.sendMessage(from, {
                    text: `❌ *Bot Bukan Admin!*\n\n⚠️ Bot harus jadi admin untuk buat status group!\n${PROMO_TEXT}\n\n${config.botName}`
                }, { quoted: m });
            }

            let content;
            const caption = args.join(' ') || null;

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
• Reply gambar + ${config.prefix}swgc <caption>
• Reply video + ${config.prefix}swgc <caption>

📌 *Contoh:*
${config.prefix}swgc Selamat datang semua!
${PROMO_TEXT}

${config.botName}`
                }, { quoted: m });
            }

            const messageSecret = crypto.randomBytes(32);

            const inside = await generateWAMessageContent(content, {
                upload: sock.waUploadToServer
            });

            const statusMsg = generateWAMessageFromContent(
                from,
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

            await sock.relayMessage(from, statusMsg.message, { messageId: statusMsg.key.id });

            await sock.sendMessage(from, {
                text: `✅ *STATUS GROUP BERHASIL DIBUAT!*\n\n📢 Status group telah diposting!\n${PROMO_TEXT}\n\n${config.botName}`
            }, { quoted: m });

        } catch (error) {
            await sock.sendMessage(from, {
                text: `❌ *Gagal buat status group!*\n\n⚠️ *Error:*\n${error.message}\n${PROMO_TEXT}\n\n${config.botName}`
            }, { quoted: m });
        }
    }
};

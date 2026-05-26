const { downloadMedia } = require('../../lib/helper');

module.exports = {
    name: 'rvo',
    command: ['rvo', 'readviewonce'],
    category: 'owner',
    description: 'Mengirim ulang media yang dikirim sebagai pesan "sekali lihat" (view once)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { quotedMsg, config }) => {
        const from = m.key.remoteJid;

        if (!quotedMsg) {
            return await sock.sendMessage(from, { text: '❌ Reply pesan "sekali lihat" yang ingin dikirim ulang!' }, { quoted: m });
        }

        // Check if the quoted message is a viewOnceMessage
        const viewOnce = quotedMsg.viewOnceMessage || quotedMsg.viewOnceMessageV2 || quotedMsg.viewOnceMessageV2Extension;
        const msg = viewOnce ? viewOnce.message : quotedMsg;

        const type = Object.keys(msg)[0];
        const mediaMsg = msg[type];

        if (!mediaMsg?.viewOnce) {
            // Some versions of Baileys/WA might structure it differently, or it's just a normal media
            // We check for imageMessage or videoMessage specifically if not explicitly flagged as viewOnce in the object
            if (type !== 'imageMessage' && type !== 'videoMessage') {
                return await sock.sendMessage(from, { text: '❌ Pesan yang di-reply bukan pesan sekali lihat!' }, { quoted: m });
            }
        }

        try {
            await sock.sendMessage(from, { text: '⏳ Sedang mengunduh media sekali lihat...' }, { quoted: m });
            
            const buffer = await downloadMedia(mediaMsg, type.replace('Message', ''));
            const caption = mediaMsg.caption || '';

            if (type === 'imageMessage') {
                await sock.sendMessage(from, { image: buffer, caption: caption + '\n\n*Read View Once (Success)*' }, { quoted: m });
            } else if (type === 'videoMessage') {
                await sock.sendMessage(from, { video: buffer, caption: caption + '\n\n*Read View Once (Success)*' }, { quoted: m });
            }
        } catch (e) {
            console.error('RVO Error:', e);
            await sock.sendMessage(from, { text: `❌ Gagal mengambil media: ${e.message}` }, { quoted: m });
        }
    }
};

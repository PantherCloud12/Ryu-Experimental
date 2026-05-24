const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'setpp',
    command: ['setpp', 'seticon'],
    category: 'group',
    description: 'Mengubah foto profil grup (kirim gambar dengan caption atau reply gambar)',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m, { quotedMsg }) => {
        const jid = m.key.remoteJid;
        
        const imageMessage = m.message?.imageMessage || quotedMsg?.imageMessage;

        if (!imageMessage) {
            return await sock.sendMessage(jid, { text: '❌ Kirim gambar dengan caption *.setpp* atau reply gambar yang sudah dikirim dengan *.setpp*!' }, { quoted: m });
        }

        try {
            await sock.sendMessage(jid, { text: '⏳ Sedang mengunduh dan memperbarui foto profil grup, mohon tunggu...' }, { quoted: m });
            
            const stream = await downloadContentFromMessage(imageMessage, 'image');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            await sock.updateProfilePicture(jid, buffer);
            await sock.sendMessage(jid, { text: '✅ Foto profil grup berhasil diperbarui!' }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal memperbarui foto profil: ${err.message}` }, { quoted: m });
        }
    }
};

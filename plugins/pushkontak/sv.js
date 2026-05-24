module.exports = {
    name: 'sv',
    command: ['sv'],
    category: 'pushkontak',
    description: 'Mengirimkan vcard kontak bot ke dalam chat privat',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, isGroup }) => {
        const jid = m.key.remoteJid;
        
        if (isGroup) {
            return await sock.sendMessage(jid, { text: '❌ Perintah ini hanya dapat dijalankan di chat pribadi (Private Chat)!' }, { quoted: m });
        }
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan nama kontak yang ingin disimpan!\nContoh: *.sv Ryu Admin*' }, { quoted: m });
        }

        try {
            const botJid = sock.user.id.split(':')[0];
            const botNumber = botJid;
            const contactName = text.trim();

            const vcard = 'BEGIN:VCARD\n'
                + 'VERSION:3.0\n'
                + `FN:${contactName}\n`
                + `TEL;type=CELL;type=VOICE;waid=${botNumber}:+${botNumber}\n`
                + 'END:VCARD';

            await sock.sendMessage(jid, {
                contacts: {
                    displayName: contactName,
                    contacts: [{ vcard }]
                }
            }, { quoted: m });

            await sock.sendMessage(jid, { text: `✅ Kontak *${contactName}* dikirim! Silakan tap kontak di atas untuk menyimpan nomor bot.` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal mengirim kontak: ${err.message}` }, { quoted: m });
        }
    }
};

module.exports = {
    name: 'add',
    command: ['add', 'tambah'],
    category: 'group',
    description: 'Menambahkan member ke dalam grup menggunakan nomor HP',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan nomor WhatsApp yang ingin ditambahkan!\nContoh: *.add 628123456789*' }, { quoted: m });
        }

        let cleanNum = text.replace(/[^0-9]/g, '');
        if (!cleanNum) {
            return await sock.sendMessage(jid, { text: '❌ Nomor tidak valid!' }, { quoted: m });
        }

        const userJid = cleanNum + '@s.whatsapp.net';
        
        try {
            const response = await sock.groupParticipantsUpdate(jid, [userJid], 'add');
            if (response && response[0] && response[0].status === '403') {
                return await sock.sendMessage(jid, { text: `❌ Nomor @${cleanNum} tidak dapat ditambahkan langsung karena pengaturan privasi mereka. Silakan gunakan link undangan grup.`, mentions: [userJid] }, { quoted: m });
            }
            await sock.sendMessage(jid, { text: `✅ Berhasil menambahkan @${cleanNum} ke dalam grup!`, mentions: [userJid] }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal menambahkan nomor ke grup: ${err.message}` }, { quoted: m });
        }
    }
};

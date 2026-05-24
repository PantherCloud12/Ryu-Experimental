module.exports = {
    name: 'group',
    command: ['group', 'grup'],
    category: 'group',
    description: 'Membuka atau menutup grup (membatasi pengiriman pesan)',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;

        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Pilihan salah! Gunakan: *.group open* atau *.group close*' }, { quoted: m });
        }

        const opt = text.toLowerCase().trim();
        if (opt === 'open' || opt === 'buka' || opt === 'unlock') {
            await sock.groupSettingUpdate(jid, 'not_announcement');
            await sock.sendMessage(jid, { text: '✅ Grup berhasil dibuka! Sekarang semua peserta dapat mengirim pesan.' }, { quoted: m });
        } else if (opt === 'close' || opt === 'tutup' || opt === 'lock') {
            await sock.groupSettingUpdate(jid, 'announcement');
            await sock.sendMessage(jid, { text: '✅ Grup berhasil ditutup! Sekarang hanya admin yang dapat mengirim pesan.' }, { quoted: m });
        } else {
            await sock.sendMessage(jid, { text: 'Pilihan tidak valid! Gunakan *open* atau *close*.' }, { quoted: m });
        }
    }
};

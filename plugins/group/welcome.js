module.exports = {
    name: 'welcome',
    command: ['welcome'],
    category: 'group',
    description: 'Mengaktifkan atau menonaktifkan pesan sambutan selamat datang/tinggal',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, dbHelper }) => {
        const jid = m.key.remoteJid;
        const chatDb = dbHelper.getChat(jid);

        if (!text) {
            return await sock.sendMessage(jid, { 
                text: `Format salah!\nGunakan: *.welcome on* atau *.welcome off*\nStatus saat ini: *${chatDb.welcome ? 'Aktif (on)' : 'Non-aktif (off)'}*` 
            }, { quoted: m });
        }

        const opt = text.toLowerCase().trim();
        if (opt === 'on' || opt === '1' || opt === 'enable') {
            chatDb.welcome = true;
            dbHelper.save();
            await sock.sendMessage(jid, { text: '✅ Fitur *Welcome/Goodbye* berhasil *diaktifkan* untuk grup ini!' }, { quoted: m });
        } else if (opt === 'off' || opt === '0' || opt === 'disable') {
            chatDb.welcome = false;
            dbHelper.save();
            await sock.sendMessage(jid, { text: '✅ Fitur *Welcome/Goodbye* berhasil *dinonaktifkan* untuk grup ini.' }, { quoted: m });
        } else {
            await sock.sendMessage(jid, { text: 'Pilihan tidak valid! Gunakan *on* atau *off*.' }, { quoted: m });
        }
    }
};

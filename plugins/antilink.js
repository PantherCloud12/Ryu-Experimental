module.exports = {
    name: 'antilink',
    command: ['antilink'],
    category: 'group',
    description: 'Mengaktifkan atau menonaktifkan fitur anti-link WhatsApp grup',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, dbHelper }) => {
        const jid = m.key.remoteJid;
        const chatDb = dbHelper.getChat(jid);

        if (!text) {
            return await sock.sendMessage(jid, { 
                text: `Format salah!\nGunakan: *.antilink on* atau *.antilink off*\nStatus saat ini: *${chatDb.antilink ? 'Aktif (on)' : 'Non-aktif (off)'}*` 
            }, { quoted: m });
        }

        const opt = text.toLowerCase().trim();
        if (opt === 'on' || opt === '1' || opt === 'enable') {
            chatDb.antilink = true;
            dbHelper.save();
            await sock.sendMessage(jid, { text: '✅ Fitur *Anti-Link* berhasil *diaktifkan* untuk grup ini!\nSetiap member non-admin yang mengirim link grup WA akan otomatis di-kick.' }, { quoted: m });
        } else if (opt === 'off' || opt === '0' || opt === 'disable') {
            chatDb.antilink = false;
            dbHelper.save();
            await sock.sendMessage(jid, { text: '✅ Fitur *Anti-Link* berhasil *dinonaktifkan* untuk grup ini.' }, { quoted: m });
        } else {
            await sock.sendMessage(jid, { text: 'Pilihan tidak valid! Gunakan *on* atau *off*.' }, { quoted: m });
        }
    }
};

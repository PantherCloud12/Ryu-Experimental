module.exports = {
    name: 'antiswgc',
    command: ['antiswgc'],
    category: 'group',
    description: 'Mengaktifkan atau menonaktifkan fitur anti-SWGC (Group Status Message V2 / Group Invite Message V2)',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, dbHelper, config }) => {
        const jid = m.key.remoteJid;
        const chatDb = dbHelper.getChat(jid);
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) {
            return await sock.sendMessage(jid, { 
                text: `Format salah!\nGunakan: *.antiswgc on* atau *.antiswgc off*\nStatus saat ini: *${chatDb.antiswgc ? 'Aktif (on)' : 'Non-aktif (off)'}*` 
            }, { quoted: m });
        }

        const opt = text.toLowerCase().trim();
        if (opt === 'on' || opt === '1' || opt === 'enable') {
            chatDb.antiswgc = true;
            dbHelper.save();
            await sock.sendMessage(jid, { text: `✅ Fitur *Anti-SWGC* berhasil *diaktifkan* untuk grup ini!\nSetiap member non-admin/non-owner yang mengirim postingan status/undangan grup (SWGC) akan otomatis di-kick.${PROMO_TEXT}` }, { quoted: m });
        } else if (opt === 'off' || opt === '0' || opt === 'disable') {
            chatDb.antiswgc = false;
            dbHelper.save();
            await sock.sendMessage(jid, { text: `✅ Fitur *Anti-SWGC* berhasil *dinonaktifkan* untuk grup ini.${PROMO_TEXT}` }, { quoted: m });
        } else {
            await sock.sendMessage(jid, { text: 'Pilihan tidak valid! Gunakan *on* atau *off*.' }, { quoted: m });
        }
    }
};

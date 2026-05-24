module.exports = {
    name: 'setbye',
    command: ['setbye', 'setb'],
    category: 'group',
    description: 'Mengatur pesan selamat tinggal/keluar khusus untuk grup ini',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, dbHelper }) => {
        const jid = m.key.remoteJid;
        const chatDb = dbHelper.getChat(jid);

        if (!text) {
            return await sock.sendMessage(jid, { 
                text: `Format salah!\nGunakan: *.setbye [pesan]*\n\n*Placeholder yang didukung:*\n- @user : Tag user yang keluar\n- @subject : Nama grup\n\n*Contoh:*\n.setbye Selamat jalan @user dari grup @subject... Semoga beruntung.` 
            }, { quoted: m });
        }

        chatDb.byeMessage = text;
        dbHelper.save();

        await sock.sendMessage(jid, { 
            text: `✅ Pesan *Goodbye/Bye* baru berhasil disimpan:\n\n${text}` 
        }, { quoted: m });
    }
};

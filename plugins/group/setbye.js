module.exports = {
    name: 'setbye',
    command: ['setbye', 'setb', 'setleave'],
    category: 'group',
    description: 'Mengatur pesan selamat tinggal/keluar khusus untuk grup ini',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, dbHelper, config }) => {
        const jid = m.key.remoteJid;
        const chatDb = dbHelper.getChat(jid);

        if (!text) {
            return await sock.sendMessage(jid, { 
                text: `Format salah!\nGunakan: *${config.prefix}setbye [pesan]*\n\n*Status saat ini:* ${chatDb.welcome ? '✅ Aktif' : '❌ Non-aktif'}\n\n*Placeholder yang didukung:*\n- @user : Tag user yang keluar\n- @subject : Nama grup\n\n*Contoh:*\n${config.prefix}setbye Selamat jalan @user dari grup @subject... Semoga beruntung.` 
            }, { quoted: m });
        }

        chatDb.byeMessage = text;
        dbHelper.save();

        let extraMsg = '';
        if (!chatDb.welcome) {
            extraMsg = `\n\n📌 *Catatan:* Fitur Welcome/Goodbye saat ini masih *Non-aktif*. Gunakan *${config.prefix}welcome on* untuk mengaktifkannya.`;
        }

        await sock.sendMessage(jid, { 
            text: `✅ Pesan *Goodbye/Bye* baru berhasil disimpan:\n\n${text}${extraMsg}` 
        }, { quoted: m });
    }
};

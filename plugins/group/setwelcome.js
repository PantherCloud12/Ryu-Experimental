module.exports = {
    name: 'setwelcome',
    command: ['setwelcome', 'setw'],
    category: 'group',
    description: 'Mengatur pesan selamat datang khusus untuk grup ini',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, dbHelper }) => {
        const jid = m.key.remoteJid;
        const chatDb = dbHelper.getChat(jid);

        if (!text) {
            return await sock.sendMessage(jid, { 
                text: `Format salah!\nGunakan: *.setwelcome [pesan]*\n\n*Placeholder yang didukung:*\n- @user : Tag user baru\n- @subject : Nama grup\n\n*Contoh:*\n.setwelcome Halo @user, selamat datang di grup @subject! Have fun ya~` 
            }, { quoted: m });
        }

        chatDb.welcomeMessage = text;
        dbHelper.save();

        await sock.sendMessage(jid, { 
            text: `✅ Pesan *Welcome* baru berhasil disimpan:\n\n${text}` 
        }, { quoted: m });
    }
};

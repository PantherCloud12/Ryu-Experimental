module.exports = {
    name: 'setjeda',
    command: ['setjeda'],
    category: 'pushkontak',
    description: 'Mengatur jeda waktu pengiriman pushkontak (dalam detik)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, dbHelper }) => {
        const jid = m.key.remoteJid;
        const settings = dbHelper.getSettings();

        if (!text) {
            return await sock.sendMessage(jid, { text: `❌ Masukkan angka jeda waktu (dalam detik)!\nContoh: *.setjeda 5*\nJeda saat ini: *${settings.delay}* detik.` }, { quoted: m });
        }

        const delaySec = parseInt(text.trim());
        if (isNaN(delaySec) || delaySec <= 0) {
            return await sock.sendMessage(jid, { text: '❌ Jeda waktu harus berupa angka bulat positif!' }, { quoted: m });
        }

        settings.delay = delaySec;
        dbHelper.save();

        await sock.sendMessage(jid, { text: `✅ Jeda pushkontak berhasil diubah menjadi: *${delaySec}* detik.` }, { quoted: m });
    }
};

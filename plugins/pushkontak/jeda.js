// Auto-generated plugin for Category: pushkontak
// Command: jeda
const axios = require('axios');

module.exports = {
    name: 'jeda',
    command: ["delaytime","setdelay"],
    category: 'pushkontak',
    description: 'Mengubah waktu jeda default untuk push kontak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const delayVal = parseInt(text.trim());
        if (isNaN(delayVal) || delayVal < 1) {
            return await sock.sendMessage(from, { text: '❌ Masukkan angka delay yang valid (minimal 1 detik)!' }, { quoted: m });
        }
        dbHelper.db.settings.delay = delayVal;
        dbHelper.save();
        await sock.sendMessage(from, { text: `✅ Delay pushkontak berhasil diubah ke: *${delayVal} detik* per kirim.` }, { quoted: m });

    }
};

// Auto-generated plugin for Category: owner
// Command: exec
module.exports = {
    name: 'exec',
    command: ["exec", "run","sh"],
    category: 'owner',
    description: 'Mengeksekusi perintah shell terminal linux (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan perintah shell linux!' }, { quoted: m });
        const { exec } = require('child_process');
        exec(text, (err, stdout, stderr) => {
            if (err) {
                return sock.sendMessage(from, { text: `❌ *EXEC ERROR*\n\n` + '```\n' + err.message + '\n```' }, { quoted: m });
            }
            if (stderr) {
                return sock.sendMessage(from, { text: `⚠️ *EXEC STDERR*\n\n` + '```\n' + stderr + '\n```' }, { quoted: m });
            }
            sock.sendMessage(from, { text: `💻 *EXEC SUCCESS*\n\n` + '```\n' + stdout + '\n```' }, { quoted: m });
        });

    }
};

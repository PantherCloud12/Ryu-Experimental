// Auto-generated plugin for Category: owner
// Command: exec
const axios = require('axios');

module.exports = {
    name: 'exec',
    command: ["run","sh"],
    category: 'owner',
    description: 'Mengeksekusi perintah shell terminal linux (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const isOwner = config.owner.includes(sender);
        if (!isOwner) {
            return await sock.sendMessage(from, { text: '❌ Command ini hanya untuk Owner Bot!' }, { quoted: m });
        }

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

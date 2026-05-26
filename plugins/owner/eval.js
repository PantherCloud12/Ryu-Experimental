// Auto-generated plugin for Category: owner
// Command: eval
const axios = require('axios');

module.exports = {
    name: 'eval',
    command: ["ev","evaluate"],
    category: 'owner',
    description: 'Mengeksekusi kode javascript (Owner Only)',
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

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan kode javascript untuk dievaluasi!' }, { quoted: m });
        try {
            let evaled = await eval(`(async () => { ${text.includes('await') || text.includes('return') ? text : 'return ' + text} })()`);
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
            await sock.sendMessage(from, { text: `💻 *EVAL SUCCESS*\n\n` + '```javascript\n' + evaled + '\n```' }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ *EVAL ERROR*\n\n` + '```\n' + err.message + '\n```' }, { quoted: m });
        }

    }
};

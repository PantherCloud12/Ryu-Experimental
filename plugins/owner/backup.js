// Auto-generated plugin for Category: owner
// Command: backup
const axios = require('axios');

module.exports = {
    name: 'backup',
    command: ["backupbot","zipcode"],
    category: 'owner',
    description: 'Mencadangkan file source code bot ke file ZIP (Owner Only)',
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

        const { exec } = require('child_process');
        await sock.sendMessage(from, { text: '⏳ Membuat arsip ZIP source code...' }, { quoted: m });
        exec('zip -r backup_ryu.zip . -x "node_modules/*" -x "session/*" -x "*.zip"', async (err) => {
            if (err) return sock.sendMessage(from, { text: `❌ Gagal backup: ${err.message}` });
            
            await sock.sendMessage(from, {
                document: fs.readFileSync('./backup_ryu.zip'),
                mimetype: 'application/zip',
                fileName: 'backup_ryu.zip',
                caption: '✅ Source code berhasil dicadangkan.'
            }, { quoted: m });
            
            fs.unlinkSync('./backup_ryu.zip');
        });

    }
};

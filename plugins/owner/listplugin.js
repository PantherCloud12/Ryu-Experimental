// Auto-generated plugin for Category: owner
// Command: listplugin
const axios = require('axios');

module.exports = {
    name: 'listplugin',
    command: ["pluginslist","listfiles"],
    category: 'owner',
    description: 'Menampilkan daftar seluruh file plugin yang terinstall (Owner Only)',
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

            // Read directory
            const dir = path.join(__dirname, '../');
            const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
            let txt = '📄 *LIST FILE PLUGINS INTALL:*\n\n';
            files.forEach(f => {
                txt += `• ${f}\n`;
            });
            await sock.sendMessage(from, { text: txt }, { quoted: m });

    }
};

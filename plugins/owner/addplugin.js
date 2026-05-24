// Auto-generated plugin for Category: owner
// Command: addplugin
const axios = require('axios');

module.exports = {
    name: 'addplugin',
    command: ["tambahplugin"],
    category: 'owner',
    description: 'Membuat plugin baru langsung lewat WhatsApp chat (Owner Only)',
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

        const parts = text.split('|');
        const pluginName = parts[0]?.trim();
        const code = parts.slice(1).join('|');
        
        if (!pluginName || !code) {
            return await sock.sendMessage(from, { text: '❌ Format salah! Gunakan: .tambahplugin nama_file|kode_isi' }, { quoted: m });
        }
        
        try {
            const filePath = path.join(__dirname, `../other/${pluginName}.js`);
            fs.writeFileSync(filePath, code);
            await sock.sendMessage(from, { text: `✅ Plugin ${pluginName}.js berhasil ditambahkan! Silakan restart bot.` }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: `❌ Gagal menulis file: ${e.message}` }, { quoted: m });
        }

    }
};

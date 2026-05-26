// Auto-generated plugin for Category: owner
// Command: addplugin
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'addplugin',
    command: ["addplugin", "tambahplugin"],
    category: 'owner',
    description: 'Membuat plugin baru langsung lewat WhatsApp chat (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        const parts = text.split('|');
        const pluginName = parts[0]?.trim();
        const code = parts.slice(1).join('|');
        
        if (!pluginName || !code) {
            return await sock.sendMessage(from, { text: '❌ Format salah! Gunakan: .addplugin nama_file|kode_isi' }, { quoted: m });
        }
        
        try {
            const filePath = path.join(__dirname, `../tools/${pluginName}.js`);
            fs.writeFileSync(filePath, code);
            await sock.sendMessage(from, { text: `✅ Plugin ${pluginName}.js berhasil ditambahkan ke kategori tools! Silakan restart bot.` }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: `❌ Gagal menulis file: ${e.message}` }, { quoted: m });
        }

    }
};

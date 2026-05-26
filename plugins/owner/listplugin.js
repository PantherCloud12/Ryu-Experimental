const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listplugin',
    command: ["listplugin", "pluginslist", "listfiles"],
    category: 'owner',
    description: 'Menampilkan daftar seluruh file plugin yang terinstall (Owner Only)',
    isOwner: true,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;

        try {
            const pluginsDir = path.join(__dirname, '../../plugins');
            let txt = '📄 *LIST FILE PLUGINS INSTALLED:*\n\n';

            const categories = fs.readdirSync(pluginsDir);
            for (const category of categories) {
                const categoryPath = path.join(pluginsDir, category);
                if (fs.statSync(categoryPath).isDirectory()) {
                    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
                    if (files.length > 0) {
                        txt += `*📁 ${category.toUpperCase()}*\n`;
                        files.forEach(f => {
                            txt += `  • ${f}\n`;
                        });
                        txt += '\n';
                    }
                }
            }

            await sock.sendMessage(from, { text: txt.trim() }, { quoted: m });
        } catch (err) {
            console.error(err);
            await sock.sendMessage(from, { text: `❌ Gagal melist plugin: ${err.message}` }, { quoted: m });
        }
    }
};

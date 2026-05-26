const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'listplugins',
    command: ['listplugins', 'lp', 'listfiles'],
    category: 'tools',
    description: 'Menampilkan daftar seluruh file plugin bot',
    isOwner: true,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const pluginsDir = path.join(process.cwd(), 'plugins');

        const readDir = (dir) => {
            let results = [];
            const list = fs.readdirSync(dir);
            list.forEach((file) => {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                if (stat && stat.isDirectory()) {
                    results = results.concat(readDir(fullPath));
                } else if (file.endsWith('.js')) {
                    results.push(path.relative(pluginsDir, fullPath));
                }
            });
            return results;
        };

        try {
            const files = readDir(pluginsDir);
            let text = `📂 *DAFTAR PLUGIN BOT*\n\n`;
            
            // Group by category (folder)
            const groups = {};
            files.forEach(f => {
                const parts = f.split(path.sep);
                const cat = parts.length > 1 ? parts[0] : 'root';
                if (!groups[cat]) groups[cat] = [];
                groups[cat].push(parts[parts.length - 1]);
            });

            for (const cat in groups) {
                text += `📁 *${cat.toUpperCase()}*\n`;
                groups[cat].forEach(file => {
                    text += `  ◦ ${file}\n`;
                });
                text += `\n`;
            }

            text += `Total: ${files.length} plugins.`;
            await sock.sendMessage(from, { text }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: m });
        }
    }
};

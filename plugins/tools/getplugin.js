const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'getplugin',
    command: ['getplugin', 'gp', 'getfile'],
    category: 'tools',
    description: 'Mengambil/mengirimkan file plugin tertentu',
    isOwner: true,
    execute: async (sock, m, { text, config }) => {
        const from = m.key.remoteJid;
        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan nama file plugin! (Contoh: .gp tools/update.js)' }, { quoted: m });

        const pluginsDir = path.join(process.cwd(), 'plugins');
        let filePath = path.join(pluginsDir, text);

        // Tambahkan .js kalau user lupa
        if (!filePath.endsWith('.js')) filePath += '.js';

        if (!fs.existsSync(filePath)) {
            // Coba cari secara rekursif jika user cuma kasih nama filenya doang
            const findFile = (dir, name) => {
                const list = fs.readdirSync(dir);
                for (const file of list) {
                    const fullPath = path.join(dir, file);
                    if (fs.statSync(fullPath).isDirectory()) {
                        const found = findFile(fullPath, name);
                        if (found) return found;
                    } else if (file === name || file === name + '.js') {
                        return fullPath;
                    }
                }
                return null;
            };
            filePath = findFile(pluginsDir, text);
        }

        if (!filePath || !fs.existsSync(filePath)) {
            return await sock.sendMessage(from, { text: `❌ File plugin *${text}* tidak ditemukan!` }, { quoted: m });
        }

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const fileName = path.basename(filePath);
            
            await sock.sendMessage(from, { 
                document: fs.readFileSync(filePath),
                mimetype: 'application/javascript',
                fileName: fileName,
                caption: `📄 *FILE PLUGIN: ${fileName}*`
            }, { quoted: m });
            
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: m });
        }
    }
};

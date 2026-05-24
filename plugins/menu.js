module.exports = {
    name: 'menu',
    command: ['menu', 'help', 'h'],
    category: 'info',
    description: 'Menampilkan daftar seluruh perintah bot',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { dbHelper }) => {
        const plugins = sock.plugins;
        const categories = {};

        Object.values(plugins).forEach(p => {
            const cat = p.category || 'other';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(p);
        });

        let menuText = `✨ *RYU EXPERIMENTAL BOT* ✨\n\n`;
        menuText += `Berikut adalah daftar menu perintah yang tersedia:\n\n`;

        for (const [cat, list] of Object.entries(categories)) {
            menuText += `*┌─── 📂 [ ${cat.toUpperCase()} ]* \n`;
            list.forEach(p => {
                const cmdString = Array.isArray(p.command) ? p.command.join('/') : p.name;
                menuText += `*│* ∘ .${cmdString} - _${p.description}_\n`;
            });
            menuText += `*└───────────────*\n\n`;
        }

        menuText += `Gunakan perintah dengan prefix titik (contoh: *.kick*)`;
        
        await sock.sendMessage(m.key.remoteJid, { text: menuText }, { quoted: m });
    }
};

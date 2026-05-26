module.exports = {
    name: 'menu',
    command: ['menu', 'help', 'h'],
    category: 'info',
    description: 'Menampilkan daftar seluruh perintah bot',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const plugins = sock.plugins || {};
        const categories = {};

        // Group plugins by category
        Object.values(plugins).forEach(p => {
            const cat = p.category || 'other';
            if (!categories[cat]) categories[cat] = [];
            
            // Avoid duplicate registrations of the same plugin in list
            if (!categories[cat].some(existing => existing.name === p.name)) {
                categories[cat].push(p);
            }
        });

        const sortedCategories = Object.keys(categories).sort();
        const totalPlugins = Object.keys(plugins).length;
        const prefix = config.prefix || '.';

        let menuText = `╭━━━⟪ 🤖 *${config.botName.toUpperCase()} - DASHBOARD* 🤖 ⟫━━━\n`;
        menuText += `│ 👤 *Owner:* ${config.ownerName}\n`;
        menuText += `│ 💻 *Mode:* Multi-Device (MD)\n`;
        menuText += `│ 📦 *Total Fitur:* ${totalPlugins} Modules\n`;
        menuText += `│ 📌 *Prefix:* [ ${prefix} ]\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

        const query = args[0] ? args[0].toLowerCase().trim() : null;

        if (!query) {
            // Compact Menu
            menuText += `*Silakan pilih kategori di bawah ini:*\n\n`;
            
            sortedCategories.forEach(cat => {
                const count = categories[cat].length;
                menuText += `╭─❑ *${cat.toUpperCase()}*\n`;
                menuText += `│ ◦ Total: ${count} commands\n`;
                menuText += `│ ◦ Ketik: \`${prefix}menu ${cat}\`\n`;
                menuText += `╰──────────────❑\n\n`;
            });

            menuText += `💡 *Tips:* Ketik \`${prefix}menu all\` untuk menampilkan semua perintah.\n${config.PROMO_TEXT || ''}`;
            return await sock.sendMessage(from, { text: menuText }, { quoted: m });
        }

        if (query === 'all') {
            // Full Menu
            menuText += `*Berikut adalah seluruh perintah yang tersedia:*\n\n`;
            
            sortedCategories.forEach(cat => {
                menuText += `╭─❑ *${cat.toUpperCase()}*\n`;
                categories[cat].forEach(p => {
                    const cmdString = Array.isArray(p.command) ? p.command.join('/') : p.name;
                    menuText += `│ ◦ ${prefix}${cmdString}\n`;
                });
                menuText += `╰──────────────❑\n\n`;
            });

            menuText += `${config.PROMO_TEXT || ''}`;
            return await sock.sendMessage(from, { text: menuText }, { quoted: m });
        }

        // Specific Category Menu
        if (categories[query]) {
            menuText += `*Daftar perintah untuk kategori [ ${query.toUpperCase()} ]:*\n\n`;
            menuText += `╭─❑ *${query.toUpperCase()}*\n`;
            categories[query].forEach(p => {
                const cmdString = Array.isArray(p.command) ? p.command.join('/') : p.name;
                menuText += `│ ◦ ${prefix}${cmdString}\n│   └ _${p.description || 'Tanpa deskripsi'}_\n`;
            });
            menuText += `╰──────────────❑\n\n`;
            
            menuText += `${config.PROMO_TEXT || ''}`;
            return await sock.sendMessage(from, { text: menuText }, { quoted: m });
        } else {
            // Category not found
            menuText += `❌ Kategori *${args[0]}* tidak ditemukan.\n\n`;
            menuText += `Gunakan \`${prefix}menu\` untuk melihat semua kategori yang valid.`;
            return await sock.sendMessage(from, { text: menuText }, { quoted: m });
        }
    }
};

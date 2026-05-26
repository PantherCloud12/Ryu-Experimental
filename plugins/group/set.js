module.exports = {
    name: 'set',
    command: ['set'],
    category: 'group',
    description: 'Menu pengaturan (shortcut untuk setwelcome, setbye, dll)',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        
        if (!text || args.length === 0) {
            return await sock.sendMessage(from, { 
                text: `*Menu Pengaturan*\n\nGunakan:\n• *${config.prefix}setwelcome* [pesan]\n• *${config.prefix}setbye* [pesan]\n• *${config.prefix}welcome* [on/off]\n\nAtau gunakan shortcut:\n• *${config.prefix}set welcome* [pesan]\n• *${config.prefix}set leave* [pesan]\n• *${config.prefix}set bye* [pesan]` 
            }, { quoted: m });
        }

        const subCommand = args[0].toLowerCase();
        const subArgs = args.slice(1).join(' ');

        const plugins = sock.plugins || {};
        
        let targetPlugin;
        if (subCommand === 'welcome') {
            targetPlugin = plugins['setwelcome'];
        } else if (subCommand === 'bye' || subCommand === 'leave') {
            targetPlugin = plugins['setbye'];
        }

        if (targetPlugin) {
            // Re-run execute with shifted args
            return await targetPlugin.execute(sock, m, {
                text: subArgs,
                args: args.slice(1),
                isGroup: true,
                sender: m.key.participant || m.key.remoteJid,
                config,
                dbHelper: require('../../lib/db')
            });
        } else {
            return await sock.sendMessage(from, { text: `❌ Sub-command *${subCommand}* tidak ditemukan.` }, { quoted: m });
        }
    }
};

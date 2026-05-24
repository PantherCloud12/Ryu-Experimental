module.exports = {
    name: 'ping',
    command: ['ping'],
    category: 'info',
    description: 'Mengecek apakah bot dalam keadaan aktif/merespon',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Pong! Bot Ryu Experimental aktif! 🚀' }, { quoted: m });
    }
};

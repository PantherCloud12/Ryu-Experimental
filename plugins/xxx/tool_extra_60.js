module.exports = {
    name: 'Extra Tool 60',
    command: ['tool60'],
    category: 'utility',
    description: 'Utility tool nomor 60 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 60 aktif dan siap digunakan!' });
    }
};
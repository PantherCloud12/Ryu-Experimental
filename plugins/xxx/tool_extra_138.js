module.exports = {
    name: 'Extra Tool 138',
    command: ['tool138'],
    category: 'utility',
    description: 'Utility tool nomor 138 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 138 aktif dan siap digunakan!' });
    }
};
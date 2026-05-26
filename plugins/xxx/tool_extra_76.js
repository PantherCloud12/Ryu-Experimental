module.exports = {
    name: 'Extra Tool 76',
    command: ['tool76'],
    category: 'utility',
    description: 'Utility tool nomor 76 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 76 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 2',
    command: ['tool2'],
    category: 'utility',
    description: 'Utility tool nomor 2 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 2 aktif dan siap digunakan!' });
    }
};
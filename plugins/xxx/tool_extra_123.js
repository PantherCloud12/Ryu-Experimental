module.exports = {
    name: 'Extra Tool 123',
    command: ['tool123'],
    category: 'utility',
    description: 'Utility tool nomor 123 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 123 aktif dan siap digunakan!' });
    }
};
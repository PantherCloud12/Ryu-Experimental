module.exports = {
    name: 'Extra Tool 272',
    command: ['tool272'],
    category: 'utility',
    description: 'Utility tool nomor 272 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 272 aktif dan siap digunakan!' });
    }
};
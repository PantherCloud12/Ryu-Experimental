module.exports = {
    name: 'Extra Tool 180',
    command: ['tool180'],
    category: 'utility',
    description: 'Utility tool nomor 180 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 180 aktif dan siap digunakan!' });
    }
};
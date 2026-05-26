module.exports = {
    name: 'Extra Tool 90',
    command: ['tool90'],
    category: 'utility',
    description: 'Utility tool nomor 90 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 90 aktif dan siap digunakan!' });
    }
};
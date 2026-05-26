module.exports = {
    name: 'Extra Tool 80',
    command: ['tool80'],
    category: 'utility',
    description: 'Utility tool nomor 80 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 80 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 81',
    command: ['tool81'],
    category: 'utility',
    description: 'Utility tool nomor 81 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 81 aktif dan siap digunakan!' });
    }
};
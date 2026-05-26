module.exports = {
    name: 'Extra Tool 271',
    command: ['tool271'],
    category: 'utility',
    description: 'Utility tool nomor 271 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 271 aktif dan siap digunakan!' });
    }
};
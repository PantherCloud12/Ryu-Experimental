module.exports = {
    name: 'Extra Tool 101',
    command: ['tool101'],
    category: 'utility',
    description: 'Utility tool nomor 101 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 101 aktif dan siap digunakan!' });
    }
};
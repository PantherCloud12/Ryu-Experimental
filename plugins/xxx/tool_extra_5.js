module.exports = {
    name: 'Extra Tool 5',
    command: ['tool5'],
    category: 'utility',
    description: 'Utility tool nomor 5 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 5 aktif dan siap digunakan!' });
    }
};
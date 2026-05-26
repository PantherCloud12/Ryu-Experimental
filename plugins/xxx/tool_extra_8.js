module.exports = {
    name: 'Extra Tool 8',
    command: ['tool8'],
    category: 'utility',
    description: 'Utility tool nomor 8 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 8 aktif dan siap digunakan!' });
    }
};
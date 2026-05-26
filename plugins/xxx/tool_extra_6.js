module.exports = {
    name: 'Extra Tool 6',
    command: ['tool6'],
    category: 'utility',
    description: 'Utility tool nomor 6 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 6 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 18',
    command: ['tool18'],
    category: 'utility',
    description: 'Utility tool nomor 18 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 18 aktif dan siap digunakan!' });
    }
};
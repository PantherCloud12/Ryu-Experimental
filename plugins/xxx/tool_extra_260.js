module.exports = {
    name: 'Extra Tool 260',
    command: ['tool260'],
    category: 'utility',
    description: 'Utility tool nomor 260 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 260 aktif dan siap digunakan!' });
    }
};
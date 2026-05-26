module.exports = {
    name: 'Extra Tool 261',
    command: ['tool261'],
    category: 'utility',
    description: 'Utility tool nomor 261 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 261 aktif dan siap digunakan!' });
    }
};
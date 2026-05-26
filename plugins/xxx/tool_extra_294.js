module.exports = {
    name: 'Extra Tool 294',
    command: ['tool294'],
    category: 'utility',
    description: 'Utility tool nomor 294 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 294 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 133',
    command: ['tool133'],
    category: 'utility',
    description: 'Utility tool nomor 133 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 133 aktif dan siap digunakan!' });
    }
};
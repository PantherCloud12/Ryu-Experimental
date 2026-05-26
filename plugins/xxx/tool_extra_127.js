module.exports = {
    name: 'Extra Tool 127',
    command: ['tool127'],
    category: 'utility',
    description: 'Utility tool nomor 127 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 127 aktif dan siap digunakan!' });
    }
};
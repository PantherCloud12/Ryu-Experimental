module.exports = {
    name: 'Extra Tool 126',
    command: ['tool126'],
    category: 'utility',
    description: 'Utility tool nomor 126 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 126 aktif dan siap digunakan!' });
    }
};
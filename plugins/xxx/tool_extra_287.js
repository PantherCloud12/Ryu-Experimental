module.exports = {
    name: 'Extra Tool 287',
    command: ['tool287'],
    category: 'utility',
    description: 'Utility tool nomor 287 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 287 aktif dan siap digunakan!' });
    }
};
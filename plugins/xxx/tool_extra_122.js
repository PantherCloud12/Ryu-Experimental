module.exports = {
    name: 'Extra Tool 122',
    command: ['tool122'],
    category: 'utility',
    description: 'Utility tool nomor 122 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 122 aktif dan siap digunakan!' });
    }
};
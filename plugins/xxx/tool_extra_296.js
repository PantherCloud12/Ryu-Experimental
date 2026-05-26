module.exports = {
    name: 'Extra Tool 296',
    command: ['tool296'],
    category: 'utility',
    description: 'Utility tool nomor 296 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 296 aktif dan siap digunakan!' });
    }
};
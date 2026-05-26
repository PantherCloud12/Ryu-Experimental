module.exports = {
    name: 'Extra Tool 72',
    command: ['tool72'],
    category: 'utility',
    description: 'Utility tool nomor 72 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 72 aktif dan siap digunakan!' });
    }
};
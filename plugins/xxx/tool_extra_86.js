module.exports = {
    name: 'Extra Tool 86',
    command: ['tool86'],
    category: 'utility',
    description: 'Utility tool nomor 86 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 86 aktif dan siap digunakan!' });
    }
};
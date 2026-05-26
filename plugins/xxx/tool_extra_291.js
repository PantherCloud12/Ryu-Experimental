module.exports = {
    name: 'Extra Tool 291',
    command: ['tool291'],
    category: 'utility',
    description: 'Utility tool nomor 291 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 291 aktif dan siap digunakan!' });
    }
};
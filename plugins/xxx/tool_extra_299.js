module.exports = {
    name: 'Extra Tool 299',
    command: ['tool299'],
    category: 'utility',
    description: 'Utility tool nomor 299 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 299 aktif dan siap digunakan!' });
    }
};
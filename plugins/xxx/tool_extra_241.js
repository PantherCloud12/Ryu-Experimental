module.exports = {
    name: 'Extra Tool 241',
    command: ['tool241'],
    category: 'utility',
    description: 'Utility tool nomor 241 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 241 aktif dan siap digunakan!' });
    }
};
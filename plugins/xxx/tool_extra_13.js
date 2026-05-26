module.exports = {
    name: 'Extra Tool 13',
    command: ['tool13'],
    category: 'utility',
    description: 'Utility tool nomor 13 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 13 aktif dan siap digunakan!' });
    }
};
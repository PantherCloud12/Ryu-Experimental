module.exports = {
    name: 'Extra Tool 295',
    command: ['tool295'],
    category: 'utility',
    description: 'Utility tool nomor 295 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 295 aktif dan siap digunakan!' });
    }
};
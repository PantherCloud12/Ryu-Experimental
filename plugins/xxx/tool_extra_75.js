module.exports = {
    name: 'Extra Tool 75',
    command: ['tool75'],
    category: 'utility',
    description: 'Utility tool nomor 75 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 75 aktif dan siap digunakan!' });
    }
};
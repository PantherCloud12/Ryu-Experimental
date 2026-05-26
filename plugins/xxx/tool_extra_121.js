module.exports = {
    name: 'Extra Tool 121',
    command: ['tool121'],
    category: 'utility',
    description: 'Utility tool nomor 121 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 121 aktif dan siap digunakan!' });
    }
};
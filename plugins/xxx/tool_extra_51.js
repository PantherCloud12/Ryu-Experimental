module.exports = {
    name: 'Extra Tool 51',
    command: ['tool51'],
    category: 'utility',
    description: 'Utility tool nomor 51 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 51 aktif dan siap digunakan!' });
    }
};
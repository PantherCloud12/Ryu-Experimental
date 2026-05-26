module.exports = {
    name: 'Extra Tool 276',
    command: ['tool276'],
    category: 'utility',
    description: 'Utility tool nomor 276 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 276 aktif dan siap digunakan!' });
    }
};
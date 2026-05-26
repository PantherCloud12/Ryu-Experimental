module.exports = {
    name: 'Extra Tool 4',
    command: ['tool4'],
    category: 'utility',
    description: 'Utility tool nomor 4 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 4 aktif dan siap digunakan!' });
    }
};
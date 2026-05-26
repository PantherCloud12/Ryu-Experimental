module.exports = {
    name: 'Extra Tool 252',
    command: ['tool252'],
    category: 'utility',
    description: 'Utility tool nomor 252 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 252 aktif dan siap digunakan!' });
    }
};
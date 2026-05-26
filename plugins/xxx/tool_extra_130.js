module.exports = {
    name: 'Extra Tool 130',
    command: ['tool130'],
    category: 'utility',
    description: 'Utility tool nomor 130 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 130 aktif dan siap digunakan!' });
    }
};
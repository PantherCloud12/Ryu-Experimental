module.exports = {
    name: 'Extra Tool 120',
    command: ['tool120'],
    category: 'utility',
    description: 'Utility tool nomor 120 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 120 aktif dan siap digunakan!' });
    }
};
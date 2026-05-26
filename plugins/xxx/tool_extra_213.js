module.exports = {
    name: 'Extra Tool 213',
    command: ['tool213'],
    category: 'utility',
    description: 'Utility tool nomor 213 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 213 aktif dan siap digunakan!' });
    }
};
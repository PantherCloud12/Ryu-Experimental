module.exports = {
    name: 'Extra Tool 26',
    command: ['tool26'],
    category: 'utility',
    description: 'Utility tool nomor 26 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 26 aktif dan siap digunakan!' });
    }
};
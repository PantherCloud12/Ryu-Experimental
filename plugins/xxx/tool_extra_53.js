module.exports = {
    name: 'Extra Tool 53',
    command: ['tool53'],
    category: 'utility',
    description: 'Utility tool nomor 53 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 53 aktif dan siap digunakan!' });
    }
};
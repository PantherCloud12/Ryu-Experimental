module.exports = {
    name: 'Extra Tool 24',
    command: ['tool24'],
    category: 'utility',
    description: 'Utility tool nomor 24 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 24 aktif dan siap digunakan!' });
    }
};
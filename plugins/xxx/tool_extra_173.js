module.exports = {
    name: 'Extra Tool 173',
    command: ['tool173'],
    category: 'utility',
    description: 'Utility tool nomor 173 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 173 aktif dan siap digunakan!' });
    }
};
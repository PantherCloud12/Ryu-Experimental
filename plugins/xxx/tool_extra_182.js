module.exports = {
    name: 'Extra Tool 182',
    command: ['tool182'],
    category: 'utility',
    description: 'Utility tool nomor 182 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 182 aktif dan siap digunakan!' });
    }
};
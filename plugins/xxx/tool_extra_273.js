module.exports = {
    name: 'Extra Tool 273',
    command: ['tool273'],
    category: 'utility',
    description: 'Utility tool nomor 273 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 273 aktif dan siap digunakan!' });
    }
};
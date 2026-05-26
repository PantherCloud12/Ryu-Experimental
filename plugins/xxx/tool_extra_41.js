module.exports = {
    name: 'Extra Tool 41',
    command: ['tool41'],
    category: 'utility',
    description: 'Utility tool nomor 41 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 41 aktif dan siap digunakan!' });
    }
};
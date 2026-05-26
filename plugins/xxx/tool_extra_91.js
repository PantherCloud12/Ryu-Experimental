module.exports = {
    name: 'Extra Tool 91',
    command: ['tool91'],
    category: 'utility',
    description: 'Utility tool nomor 91 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 91 aktif dan siap digunakan!' });
    }
};
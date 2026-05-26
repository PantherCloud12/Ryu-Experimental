module.exports = {
    name: 'Extra Tool 266',
    command: ['tool266'],
    category: 'utility',
    description: 'Utility tool nomor 266 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 266 aktif dan siap digunakan!' });
    }
};
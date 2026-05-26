module.exports = {
    name: 'Extra Tool 100',
    command: ['tool100'],
    category: 'utility',
    description: 'Utility tool nomor 100 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 100 aktif dan siap digunakan!' });
    }
};
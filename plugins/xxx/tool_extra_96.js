module.exports = {
    name: 'Extra Tool 96',
    command: ['tool96'],
    category: 'utility',
    description: 'Utility tool nomor 96 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 96 aktif dan siap digunakan!' });
    }
};
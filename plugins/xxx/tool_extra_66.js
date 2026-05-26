module.exports = {
    name: 'Extra Tool 66',
    command: ['tool66'],
    category: 'utility',
    description: 'Utility tool nomor 66 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 66 aktif dan siap digunakan!' });
    }
};
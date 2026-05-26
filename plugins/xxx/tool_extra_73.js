module.exports = {
    name: 'Extra Tool 73',
    command: ['tool73'],
    category: 'utility',
    description: 'Utility tool nomor 73 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 73 aktif dan siap digunakan!' });
    }
};
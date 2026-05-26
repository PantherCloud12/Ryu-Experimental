module.exports = {
    name: 'Extra Tool 196',
    command: ['tool196'],
    category: 'utility',
    description: 'Utility tool nomor 196 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 196 aktif dan siap digunakan!' });
    }
};
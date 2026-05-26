module.exports = {
    name: 'Extra Tool 125',
    command: ['tool125'],
    category: 'utility',
    description: 'Utility tool nomor 125 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 125 aktif dan siap digunakan!' });
    }
};
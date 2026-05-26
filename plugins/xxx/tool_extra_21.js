module.exports = {
    name: 'Extra Tool 21',
    command: ['tool21'],
    category: 'utility',
    description: 'Utility tool nomor 21 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 21 aktif dan siap digunakan!' });
    }
};
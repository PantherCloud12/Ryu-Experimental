module.exports = {
    name: 'Extra Tool 280',
    command: ['tool280'],
    category: 'utility',
    description: 'Utility tool nomor 280 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 280 aktif dan siap digunakan!' });
    }
};
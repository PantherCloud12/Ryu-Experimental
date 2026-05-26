module.exports = {
    name: 'Extra Tool 181',
    command: ['tool181'],
    category: 'utility',
    description: 'Utility tool nomor 181 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 181 aktif dan siap digunakan!' });
    }
};
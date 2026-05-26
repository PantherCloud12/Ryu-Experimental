module.exports = {
    name: 'Extra Tool 265',
    command: ['tool265'],
    category: 'utility',
    description: 'Utility tool nomor 265 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 265 aktif dan siap digunakan!' });
    }
};
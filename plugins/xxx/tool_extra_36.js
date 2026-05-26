module.exports = {
    name: 'Extra Tool 36',
    command: ['tool36'],
    category: 'utility',
    description: 'Utility tool nomor 36 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 36 aktif dan siap digunakan!' });
    }
};
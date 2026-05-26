module.exports = {
    name: 'Extra Tool 144',
    command: ['tool144'],
    category: 'utility',
    description: 'Utility tool nomor 144 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 144 aktif dan siap digunakan!' });
    }
};
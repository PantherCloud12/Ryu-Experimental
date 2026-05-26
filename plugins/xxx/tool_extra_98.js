module.exports = {
    name: 'Extra Tool 98',
    command: ['tool98'],
    category: 'utility',
    description: 'Utility tool nomor 98 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 98 aktif dan siap digunakan!' });
    }
};
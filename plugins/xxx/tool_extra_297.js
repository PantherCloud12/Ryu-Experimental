module.exports = {
    name: 'Extra Tool 297',
    command: ['tool297'],
    category: 'utility',
    description: 'Utility tool nomor 297 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 297 aktif dan siap digunakan!' });
    }
};
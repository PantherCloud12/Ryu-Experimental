module.exports = {
    name: 'Extra Tool 27',
    command: ['tool27'],
    category: 'utility',
    description: 'Utility tool nomor 27 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 27 aktif dan siap digunakan!' });
    }
};
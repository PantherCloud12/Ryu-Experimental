module.exports = {
    name: 'Extra Tool 151',
    command: ['tool151'],
    category: 'utility',
    description: 'Utility tool nomor 151 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 151 aktif dan siap digunakan!' });
    }
};
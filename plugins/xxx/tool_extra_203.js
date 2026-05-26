module.exports = {
    name: 'Extra Tool 203',
    command: ['tool203'],
    category: 'utility',
    description: 'Utility tool nomor 203 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 203 aktif dan siap digunakan!' });
    }
};
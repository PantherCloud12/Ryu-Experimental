module.exports = {
    name: 'Extra Tool 105',
    command: ['tool105'],
    category: 'utility',
    description: 'Utility tool nomor 105 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 105 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 46',
    command: ['tool46'],
    category: 'utility',
    description: 'Utility tool nomor 46 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 46 aktif dan siap digunakan!' });
    }
};
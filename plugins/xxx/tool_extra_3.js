module.exports = {
    name: 'Extra Tool 3',
    command: ['tool3'],
    category: 'utility',
    description: 'Utility tool nomor 3 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 3 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 83',
    command: ['tool83'],
    category: 'utility',
    description: 'Utility tool nomor 83 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 83 aktif dan siap digunakan!' });
    }
};
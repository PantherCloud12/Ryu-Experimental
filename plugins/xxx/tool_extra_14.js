module.exports = {
    name: 'Extra Tool 14',
    command: ['tool14'],
    category: 'utility',
    description: 'Utility tool nomor 14 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 14 aktif dan siap digunakan!' });
    }
};
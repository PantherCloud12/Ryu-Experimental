module.exports = {
    name: 'Extra Tool 78',
    command: ['tool78'],
    category: 'utility',
    description: 'Utility tool nomor 78 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 78 aktif dan siap digunakan!' });
    }
};
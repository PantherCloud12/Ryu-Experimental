module.exports = {
    name: 'Extra Tool 298',
    command: ['tool298'],
    category: 'utility',
    description: 'Utility tool nomor 298 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 298 aktif dan siap digunakan!' });
    }
};
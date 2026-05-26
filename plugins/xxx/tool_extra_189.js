module.exports = {
    name: 'Extra Tool 189',
    command: ['tool189'],
    category: 'utility',
    description: 'Utility tool nomor 189 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 189 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 251',
    command: ['tool251'],
    category: 'utility',
    description: 'Utility tool nomor 251 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 251 aktif dan siap digunakan!' });
    }
};
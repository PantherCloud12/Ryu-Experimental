module.exports = {
    name: 'Extra Tool 25',
    command: ['tool25'],
    category: 'utility',
    description: 'Utility tool nomor 25 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 25 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 52',
    command: ['tool52'],
    category: 'utility',
    description: 'Utility tool nomor 52 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 52 aktif dan siap digunakan!' });
    }
};
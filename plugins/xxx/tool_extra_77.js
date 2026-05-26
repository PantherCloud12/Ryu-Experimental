module.exports = {
    name: 'Extra Tool 77',
    command: ['tool77'],
    category: 'utility',
    description: 'Utility tool nomor 77 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 77 aktif dan siap digunakan!' });
    }
};
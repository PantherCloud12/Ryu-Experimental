module.exports = {
    name: 'Extra Tool 160',
    command: ['tool160'],
    category: 'utility',
    description: 'Utility tool nomor 160 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 160 aktif dan siap digunakan!' });
    }
};
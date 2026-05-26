module.exports = {
    name: 'Extra Tool 152',
    command: ['tool152'],
    category: 'utility',
    description: 'Utility tool nomor 152 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 152 aktif dan siap digunakan!' });
    }
};
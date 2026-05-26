module.exports = {
    name: 'Extra Tool 262',
    command: ['tool262'],
    category: 'utility',
    description: 'Utility tool nomor 262 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 262 aktif dan siap digunakan!' });
    }
};
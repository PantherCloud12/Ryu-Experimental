module.exports = {
    name: 'Extra Tool 253',
    command: ['tool253'],
    category: 'utility',
    description: 'Utility tool nomor 253 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 253 aktif dan siap digunakan!' });
    }
};
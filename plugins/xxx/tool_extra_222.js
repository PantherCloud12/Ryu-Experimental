module.exports = {
    name: 'Extra Tool 222',
    command: ['tool222'],
    category: 'utility',
    description: 'Utility tool nomor 222 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 222 aktif dan siap digunakan!' });
    }
};
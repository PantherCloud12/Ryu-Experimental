module.exports = {
    name: 'Extra Tool 93',
    command: ['tool93'],
    category: 'utility',
    description: 'Utility tool nomor 93 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 93 aktif dan siap digunakan!' });
    }
};
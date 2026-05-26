module.exports = {
    name: 'Extra Tool 293',
    command: ['tool293'],
    category: 'utility',
    description: 'Utility tool nomor 293 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 293 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 221',
    command: ['tool221'],
    category: 'utility',
    description: 'Utility tool nomor 221 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 221 aktif dan siap digunakan!' });
    }
};
module.exports = {
    name: 'Extra Tool 300',
    command: ['tool300'],
    category: 'utility',
    description: 'Utility tool nomor 300 untuk berbagai keperluan.',
    execute: async (sock, m) => {
        await sock.sendMessage(m.key.remoteJid, { text: 'Utility Tool 300 aktif dan siap digunakan!' });
    }
};
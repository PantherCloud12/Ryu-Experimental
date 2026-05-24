module.exports = {
    name: 'leave',
    command: ['leave', 'keluar', 'out'],
    category: 'group',
    description: 'Membuat bot keluar dari grup',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m) => {
        const jid = m.key.remoteJid;
        await sock.sendMessage(jid, { text: 'Adios! Bot akan keluar dari grup ini sekarang. 👋' });
        await sock.groupLeave(jid);
    }
};

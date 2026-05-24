module.exports = {
    name: 'hidetag',
    command: ['hidetag', 'htag', 'totag'],
    category: 'group',
    description: 'Men-tag semua anggota grup secara senyap/tidak terlihat',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, participants }) => {
        const jid = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan pesan pengumuman yang ingin dikirim!' }, { quoted: m });
        }

        const mentions = participants.map(p => p.id);
        
        await sock.sendMessage(jid, { 
            text: text, 
            mentions 
        });
    }
};

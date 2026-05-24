module.exports = {
    name: 'tagall',
    command: ['tagall', 'everyone'],
    category: 'group',
    description: 'Men-tag semua anggota grup dengan list nama',
    isGroup: true,
    isAdmin: true,
    isBotAdmin: false,
    execute: async (sock, m, { text, participants }) => {
        const jid = m.key.remoteJid;
        
        let messageText = `📢 *TAG ALL MEMBERS*\n\n`;
        if (text) {
            messageText += `*Pesan:* ${text}\n\n`;
        }

        const mentions = [];
        participants.forEach((part, index) => {
            messageText += `${index + 1}. @${part.id.split('@')[0]}\n`;
            mentions.push(part.id);
        });

        await sock.sendMessage(jid, { text: messageText, mentions }, { quoted: m });
    }
};

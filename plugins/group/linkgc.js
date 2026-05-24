module.exports = {
    name: 'linkgc',
    command: ['linkgc', 'linkgrup', 'link'],
    category: 'group',
    description: 'Mendapatkan link undangan grup ini',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: true,
    execute: async (sock, m) => {
        const jid = m.key.remoteJid;

        try {
            const code = await sock.groupInviteCode(jid);
            const link = `https://chat.whatsapp.com/${code}`;
            await sock.sendMessage(jid, { text: `🔗 *Link Undangan Grup:*\n${link}` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal mengambil link undangan: ${err.message}` }, { quoted: m });
        }
    }
};

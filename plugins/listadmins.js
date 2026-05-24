module.exports = {
    name: 'listadmins',
    command: ['listadmins', 'admins', 'adminlist'],
    category: 'group',
    description: 'Menampilkan daftar seluruh admin grup',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { admins }) => {
        const jid = m.key.remoteJid;

        let adminText = `👑 *DAFTAR ADMIN GRUP* 👑\n\n`;
        admins.forEach((admin, idx) => {
            adminText += `${idx + 1}. @${admin.split('@')[0]}\n`;
        });

        await sock.sendMessage(jid, { text: adminText, mentions: admins }, { quoted: m });
    }
};

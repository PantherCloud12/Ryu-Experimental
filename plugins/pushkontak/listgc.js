module.exports = {
    name: 'listgc',
    command: ['listgc'],
    category: 'pushkontak',
    description: 'Melihat daftar seluruh grup yang diikuti oleh bot',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m) => {
        const jid = m.key.remoteJid;
        try {
            await sock.sendMessage(jid, { text: '⏳ Sedang mengambil daftar grup...' }, { quoted: m });
            const groupList = await sock.groupFetchAllParticipating();
            const entries = Object.values(groupList);
            
            if (entries.length === 0) {
                return await sock.sendMessage(jid, { text: '❌ Bot tidak bergabung di grup manapun.' }, { quoted: m });
            }

            let responseText = `👥 *DAFTAR GRUP PARTICIPATING* 👥\n\n`;
            entries.forEach((group, index) => {
                responseText += `*${index + 1}. ${group.subject}*\n`;
                responseText += `ID: \`${group.id}\`\n`;
                responseText += `Jumlah Peserta: *${group.participants?.length || 0}*\n\n`;
            });

            await sock.sendMessage(jid, { text: responseText }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal mengambil daftar grup: ${err.message}` }, { quoted: m });
        }
    }
};

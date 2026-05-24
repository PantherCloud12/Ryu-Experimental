const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    name: 'ps1',
    command: ['ps1'],
    category: 'pushkontak',
    description: 'Mengirim pesan private ke seluruh member grup (hanya bisa di dalam grup)',
    isGroup: true,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, groupMetadata, dbHelper }) => {
        const jid = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan pesan teks yang ingin di-push!\nContoh: *.ps1 Halo kak, salam kenal...*' }, { quoted: m });
        }

        try {
            const settings = dbHelper.getSettings();
            const jedaMs = (settings.delay || 3) * 1000;
            const participants = groupMetadata.participants || [];
            const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const members = participants.map(p => p.id).filter(id => id !== botJid);

            await sock.sendMessage(jid, { text: `⏳ Memulai pushkontak ke *${members.length}* member grup.\nJeda: *${settings.delay}* detik per chat. Mohon tunggu...` }, { quoted: m });

            let successCount = 0;
            for (let i = 0; i < members.length; i++) {
                const memberJid = members[i];
                try {
                    await sock.sendMessage(memberJid, { text: text });
                    successCount++;
                } catch (e) {
                    console.error(`Failed to send pushkontak to ${memberJid}:`, e);
                }
                await delay(jedaMs);
            }

            await sock.sendMessage(jid, { text: `✅ *Pushkontak Selesai!*\n\nBerhasil mengirim ke: *${successCount}/${members.length}* member.` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal menjalankan pushkontak: ${err.message}` }, { quoted: m });
        }
    }
};

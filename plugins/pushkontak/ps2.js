const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    name: 'ps2',
    command: ['ps2'],
    category: 'pushkontak',
    description: 'Mengirim pesan private ke seluruh member grup tertentu lewat ID grup (bisa dari luar grup)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, dbHelper }) => {
        const jid = m.key.remoteJid;
        
        if (!text || !text.includes('|')) {
            return await sock.sendMessage(jid, { text: '❌ Format salah!\nGunakan: *.ps2 <teks>|<id grup>*\nContoh: *.ps2 Halo kak|120363200000000000@g.us*' }, { quoted: m });
        }

        const parts = text.split('|');
        const pushText = parts[0].trim();
        const targetGroupId = parts[1].trim();

        try {
            await sock.sendMessage(jid, { text: `⏳ Memvalidasi ID grup: ${targetGroupId}...` }, { quoted: m });
            const groupMetadata = await sock.groupMetadata(targetGroupId);
            const participants = groupMetadata.participants || [];
            const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const members = participants.map(p => p.id).filter(id => id !== botJid);

            const settings = dbHelper.getSettings();
            const jedaMs = (settings.delay || 3) * 1000;

            await sock.sendMessage(jid, { text: `⏳ Memulai pushkontak ke grup *${groupMetadata.subject}* (*${members.length}* member).\nJeda: *${settings.delay}* detik per chat. Mohon tunggu...` }, { quoted: m });

            let successCount = 0;
            for (let i = 0; i < members.length; i++) {
                const memberJid = members[i];
                try {
                    await sock.sendMessage(memberJid, { text: pushText });
                    successCount++;
                } catch (e) {
                    console.error(`Failed to send pushkontak to ${memberJid}:`, e);
                }
                await delay(jedaMs);
            }

            await sock.sendMessage(jid, { text: `✅ *Pushkontak Selesai!*\n\nBerhasil mengirim ke: *${successCount}/${members.length}* member grup *${groupMetadata.subject}*.` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal menjalankan pushkontak luar grup: ${err.message}` }, { quoted: m });
        }
    }
};

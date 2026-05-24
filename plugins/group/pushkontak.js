const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    name: 'pushkontak',
    command: ['listgc', 'ps1', 'ps2', 'setjeda', 'sv'],
    category: 'pushkontak',
    description: 'Menu Pushkontak & Broadcast pemasaran',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, dbHelper }) => {
        const jid = m.key.remoteJid;
        
        const msgConversation = m.message.conversation || m.message.extendedTextMessage?.text || "";
        const trigger = msgConversation.trim().split(/\s+/)[0].toLowerCase().slice(1);
        
        const settings = dbHelper.getSettings();
        const jedaMs = (settings.delay || 3) * 1000;

        if (trigger === 'listgc') {
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
        
        else if (trigger === 'ps1') {
            if (!isGroup) {
                return await sock.sendMessage(jid, { text: '❌ Perintah ini hanya dapat dijalankan di dalam grup!' }, { quoted: m });
            }
            if (!text) {
                return await sock.sendMessage(jid, { text: '❌ Masukkan pesan teks yang ingin di-push!\nContoh: *.ps1 Halo kak, salam kenal...*' }, { quoted: m });
            }

            try {
                const groupMetadata = await sock.groupMetadata(jid);
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
        
        else if (trigger === 'ps2') {
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
        
        else if (trigger === 'setjeda') {
            if (!text) {
                return await sock.sendMessage(jid, { text: `❌ Masukkan angka jeda waktu (dalam detik)!\nContoh: *.setjeda 5*\nJeda saat ini: *${settings.delay}* detik.` }, { quoted: m });
            }

            const delaySec = parseInt(text.trim());
            if (isNaN(delaySec) || delaySec <= 0) {
                return await sock.sendMessage(jid, { text: '❌ Jeda waktu harus berupa angka bulat positif!' }, { quoted: m });
            }

            settings.delay = delaySec;
            dbHelper.save();

            await sock.sendMessage(jid, { text: `✅ Jeda pushkontak berhasil diubah menjadi: *${delaySec}* detik.` }, { quoted: m });
        } 
        
        else if (trigger === 'sv') {
            if (isGroup) {
                return await sock.sendMessage(jid, { text: '❌ Perintah ini hanya dapat dijalankan di chat pribadi (Private Chat)!' }, { quoted: m });
            }
            if (!text) {
                return await sock.sendMessage(jid, { text: '❌ Masukkan nama kontak yang ingin disimpan!\nContoh: *.sv Ryu Admin*' }, { quoted: m });
            }

            try {
                const botJid = sock.user.id.split(':')[0];
                const botNumber = botJid;
                const contactName = text.trim();

                const vcard = 'BEGIN:VCARD\n'
                    + 'VERSION:3.0\n'
                    + `FN:${contactName}\n`
                    + `TEL;type=CELL;type=VOICE;waid=${botNumber}:+${botNumber}\n`
                    + 'END:VCARD';

                await sock.sendMessage(jid, {
                    contacts: {
                        displayName: contactName,
                        contacts: [{ vcard }]
                    }
                }, { quoted: m });

                await sock.sendMessage(jid, { text: `✅ Kontak *${contactName}* dikirim! Silakan tap kontak di atas untuk menyimpan nomor bot.` }, { quoted: m });
            } catch (err) {
                await sock.sendMessage(jid, { text: `❌ Gagal mengirim kontak: ${err.message}` }, { quoted: m });
            }
        }
    }
};

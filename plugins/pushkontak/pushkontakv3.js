// Auto-generated plugin for Category: pushkontak
// Command: pushkontakv3
const axios = require('axios');

module.exports = {
    name: 'pushkontakv3',
    command: ["pushv3","pushmassal"],
    category: 'pushkontak',
    description: 'Push kontak dengan parameter pesan dan jeda kustom',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const parts = text.split('|');
        const msgText = parts[0]?.trim();
        const jedaSec = parseInt(parts[1]?.trim()) || dbHelper.db.settings.delay || 3;
        
        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di grup!' }, { quoted: m });
        if (!msgText) return await sock.sendMessage(from, { text: '❌ Masukkan pesan yang ingin di-push!' }, { quoted: m });
        
        await sock.sendMessage(from, { text: `⏳ Mulai mempush ${groupMetadata.participants.length} member grup dengan jeda ${jedaSec} detik...` }, { quoted: m });
        
        let sentCount = 0;
        for (const p of groupMetadata.participants) {
            const jid = p.id;
            if (jid === sender || jid === sock.user.id.split(':')[0] + '@s.whatsapp.net') continue;
            
            try {
                await sock.sendMessage(jid, { text: msgText });
                sentCount++;
                await new Promise(r => setTimeout(r, jedaSec * 1000));
            } catch (e) {}
        }
        await sock.sendMessage(from, { text: `✅ Push kontak selesai! Berhasil mengirim ke ${sentCount} member.` }, { quoted: m });

    }
};

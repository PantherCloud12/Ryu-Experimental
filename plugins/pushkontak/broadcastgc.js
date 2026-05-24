// Auto-generated plugin for Category: pushkontak
// Command: broadcastgc
const axios = require('axios');

module.exports = {
    name: 'broadcastgc',
    command: ["bcgc","siarangrup"],
    category: 'pushkontak',
    description: 'Mengirimkan pesan siaran ke semua grup yang bot ikuti (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan pesan siaran broadcast!' }, { quoted: m });
        await sock.sendMessage(from, { text: '⏳ Sedang mengirim broadcast ke seluruh grup...' }, { quoted: m });
        
        let count = 0;
        // Cari semua group chats
        const chats = Object.keys(dbHelper.db.chats).filter(jid => jid.endsWith('@g.us'));
        for (const jid of chats) {
            try {
                await sock.sendMessage(jid, { text: `📢 *RYU BOT BROADCAST GRUP* 📢\n\n${text}\n\n${PROMO_TEXT}` });
                count++;
                await new Promise(r => setTimeout(r, 2000));
            } catch (e) {}
        }
        await sock.sendMessage(from, { text: `✅ Siaran broadcast berhasil dikirim ke ${count} grup!` }, { quoted: m });

    }
};

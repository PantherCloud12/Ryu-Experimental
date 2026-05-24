// Auto-generated plugin for Category: owner
// Command: broadcast
const axios = require('axios');

module.exports = {
    name: 'broadcast',
    command: ["bc","siaran"],
    category: 'owner',
    description: 'Mengirimkan pesan siaran ke seluruh chat pribadi bot (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const isOwner = config.owner.includes(sender);
        if (!isOwner) {
            return await sock.sendMessage(from, { text: '❌ Command ini hanya untuk Owner Bot!' }, { quoted: m });
        }

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan pesan siaran broadcast!' }, { quoted: m });
        
        await sock.sendMessage(from, { text: '⏳ Sedang mengirim broadcast ke semua chat pribadi...' }, { quoted: m });
        const chats = Object.keys(dbHelper.db.chats).filter(jid => !jid.endsWith('@g.us'));
        
        let count = 0;
        for (const jid of chats) {
            try {
                await sock.sendMessage(jid, { text: `📢 *RYU BOT BROADCAST* 📢\n\n${text}\n\n${PROMO_TEXT}` });
                count++;
                await new Promise(r => setTimeout(r, 2000));
            } catch (e) {}
        }
        await sock.sendMessage(from, { text: `✅ Siaran broadcast berhasil dikirim ke ${count} chat pribadi!` }, { quoted: m });

    }
};

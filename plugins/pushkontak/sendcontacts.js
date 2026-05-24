// Auto-generated plugin for Category: pushkontak
// Command: sendcontacts
const axios = require('axios');

module.exports = {
    name: 'sendcontacts',
    command: ["sharekontak","kirimkontak"],
    category: 'pushkontak',
    description: 'Membagikan kartu kontak WhatsApp secara massal ke member grup',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di grup!' }, { quoted: m });
        
        await sock.sendMessage(from, { text: '⏳ Membagikan kartu kontak...' }, { quoted: m });
        
        // Share owner contact to everyone or current group
        const ownerJid = config.owner[0] || '628123456789@s.whatsapp.net';
        const num = ownerJid.split('@')[0];
        
        const vcardOwner = `BEGIN:VCARD\nVERSION:3.0\nFN:Owner Ryu\nORG:Ryu Bot Developer;\nTEL;type=CELL;type=VOICE;waid=${num}:+${num}\nEND:VCARD`;
        
        await sock.sendMessage(from, {
            contacts: {
                displayName: 'Owner Ryu',
                contacts: [{ vcard: vcardOwner }]
            }
        }, { quoted: m });

    }
};

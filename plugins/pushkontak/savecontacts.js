// Auto-generated plugin for Category: pushkontak
// Command: savecontacts
const axios = require('axios');

module.exports = {
    name: 'savecontacts',
    command: ["savekontak","exportcontacts"],
    category: 'pushkontak',
    description: 'Mengekspor kontak grup ke file VCF (vcard)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di grup!' }, { quoted: m });
        
        let vcard = '';
        groupMetadata.participants.forEach(p => {
            const num = p.id.split('@')[0];
            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:Ryu Member ${num}\nTEL;TYPE=CELL:${num}\nEND:VCARD\n`;
        });
        
        await sock.sendMessage(from, {
            document: Buffer.from(vcard),
            mimetype: 'text/vcard',
            fileName: `contacts_${groupMetadata.subject}.vcf`,
            caption: `✅ Berhasil mengekspor ${groupMetadata.participants.length} kontak grup!\nSilakan download dan buka untuk menyimpan massal.`
        }, { quoted: m });

    }
};

// Auto-generated plugin for Category: fun
// Command: siapakah
const axios = require('axios');

module.exports = {
    name: 'siapakah',
    command: ["siapakahramal"],
    category: 'fun',
    description: 'Memilih anggota grup secara acak untuk pertanyaan lucu',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!isGroup) return await sock.sendMessage(from, { text: '❌ Hanya dapat dipanggil di dalam grup!' }, { quoted: m });
        const member = groupMetadata.participants.map(p => p.id);
        const randomMember = member[Math.floor(Math.random() * member.length)];
        
        await sock.sendMessage(from, { 
            text: `🔮 *SIAPAKAH DIA?*\n\n❓ Pertanyaan: Siapa yang ${text}?\n👉 Jawaban: @${randomMember.split('@')[0]}`,
            mentions: [randomMember]
        }, { quoted: m });

    }
};

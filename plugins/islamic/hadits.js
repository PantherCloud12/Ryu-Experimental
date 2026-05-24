// Auto-generated plugin for Category: islamic
// Command: hadits
const axios = require('axios');

module.exports = {
    name: 'hadits',
    command: ["hadis","baca-hadits"],
    category: 'islamic',
    description: 'Membaca hadits shahih acak tentang kehidupan',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        try {
            const perawi = ['bukhari', 'muslim', 'abu-daud', 'nasai'][Math.floor(Math.random() * 4)];
            const no = Math.floor(Math.random() * 50) + 1;
            const res = await axios.get(`https://hadis-api-id.vercel.app/hadith/${perawi}/${no}`);
            const data = res.data;
            
            const replyText = `📜 *Hadits Riwayat ${perawi.toUpperCase()} (No. ${data.number})*\n\n${data.arab}\n\n_${data.translation}_`;
            await sock.sendMessage(from, { text: replyText }, { quoted: m });
        } catch (err) {
            // Fallback offline hadits
            const fallback = 'Dari Abu Hurairah radhiyallahu anhu, Rasulullah SAW bersabda: "Barangsiapa yang beriman kepada Allah dan hari akhir, maka hendaklah ia berkata baik atau diam." (HR. Bukhari & Muslim)';
            await sock.sendMessage(from, { text: `📜 *Hadits Pilihan*\n\n${fallback}` }, { quoted: m });
        }

    }
};

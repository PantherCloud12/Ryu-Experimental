// Auto-generated plugin for Category: islamic
// Command: alquran
const axios = require('axios');

module.exports = {
    name: 'alquran',
    command: ["quran","ngaji"],
    category: 'islamic',
    description: 'Membaca surat Al-Quran beserta terjemahannya (Contoh: .quran 1 atau .quran 1 2)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan nomor surat! Contoh: .quran 1 (Al-Fatihah) atau .quran 1 2 (surat 1 ayat 2)' }, { quoted: m });
        try {
            const args = text.trim().split(' ');
            const surat = args[0];
            const ayat = args[1];
            
            let url = `https://quran-api-id.vercel.app/surah/${surat}`;
            if (ayat) {
                url += `/${ayat}`;
            }
            
            const res = await axios.get(url);
            const data = res.data;
            
            let replyText = '';
            if (ayat) {
                replyText = `📖 *Surat ${data.surah?.name} Ayat ${data.number}*\n\n${data.arab}\n\n_${data.translation}_`;
            } else {
                replyText = `📖 *Surat ${data.name} (${data.translation})*\nTotal Ayat: ${data.numberOfVerses}\n\n*Daftar Ayat:*\n`;
                data.verses.slice(0, 5).forEach(v => {
                    replyText += `• Ayat ${v.number}: ${v.text.slice(0, 100)}...\n`;
                });
                replyText += `\nTampilkan per ayat dengan: ${config.prefix}quran ${surat} <nomor_ayat>`;
            }
            
            await sock.sendMessage(from, { text: replyText }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: '❌ Gagal mengambil data Al-Quran. Pastikan nomor surat/ayat benar.' }, { quoted: m });
        }

    }
};

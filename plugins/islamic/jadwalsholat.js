// Auto-generated plugin for Category: islamic
// Command: jadwalsholat
const axios = require('axios');

module.exports = {
    name: 'jadwalsholat',
    command: ["adzan","sholat","jadwal-sholat"],
    category: 'islamic',
    description: 'Melihat jadwal sholat untuk wilayah/kota tertentu',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const kota = text.trim() || 'Jakarta';
        try {
            const date = new Date().toISOString().split('T')[0];
            const resKota = await axios.get(`https://api.myquran.com/v1/sholat/kota/cari/${kota}`);
            if (resKota.data.status && resKota.data.data.length > 0) {
                const idKota = resKota.data.data[0].id;
                const namaKota = resKota.data.data[0].lokasi;
                
                const year = new Date().getFullYear();
                const month = String(new Date().getMonth() + 1).padStart(2, '0');
                const resJadwal = await axios.get(`https://api.myquran.com/v1/sholat/jadwal/${idKota}/${year}/${month}`);
                
                const jadwal = resJadwal.data.data.jadwal;
                const hariIni = jadwal.find(j => j.date === date) || jadwal[0];
                
                const replyText = `🕌 *Jadwal Sholat - ${namaKota}*\nTanggal: ${hariIni.tanggal}\n\nImsak: ${hariIni.imsak}\nSubuh: ${hariIni.subuh}\nTerbit: ${hariIni.terbit}\nDhuha: ${hariIni.dhuha}\nDzuhur: ${hariIni.dzuhur}\nAshar: ${hariIni.ashar}\nMaghrib: ${hariIni.maghrib}\nIsya: ${hariIni.isya}`;
                await sock.sendMessage(from, { text: replyText }, { quoted: m });
            } else {
                throw new Error('Kota tidak ditemukan.');
            }
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal mencari jadwal sholat untuk kota "${kota}".\nJadwal default Jakarta:\nImsak: 04:30\nSubuh: 04:40\nDzuhur: 11:55\nAshar: 15:15\nMaghrib: 17:50\nIsya: 19:05` }, { quoted: m });
        }

    }
};

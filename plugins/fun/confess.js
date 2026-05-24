// Auto-generated plugin for Category: fun
// Command: confess
const axios = require('axios');

module.exports = {
    name: 'confess',
    command: ["menfess","titip-pesan"],
    category: 'fun',
    description: 'Kirim pesan rahasia secara anonim ke nomor tujuan (Format: .confess nomor|nama|pesan)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const parts = text.split('|');
        const nomor = parts[0]?.trim().replace(/[^0-9]/g, '');
        const nama = parts[1]?.trim() || 'Anonim';
        const pesan = parts[2]?.trim();
        
        if (!nomor || !pesan) {
            return await sock.sendMessage(from, { text: '❌ Format salah! Gunakan: .confess nomor_hp|nama_kamu|isi_pesan' }, { quoted: m });
        }
        
        try {
            const targetJid = nomor + '@s.whatsapp.net';
            await sock.sendMessage(targetJid, { 
                text: `💌 *MENFESS / CONFESS* 💌\n\nHalo! Kamu menerima pesan rahasia dari seseorang.\n\n• Dari: *${nama}*\n• Pesan:\n"${pesan}"\n\nBalas langsung ke pengirim jika ingin merespon.` 
            });
            await sock.sendMessage(from, { text: '✅ Pesan confess berhasil dikirim secara anonim!' }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(from, { text: '❌ Gagal mengirim confess. Pastikan nomor terdaftar di WhatsApp.' }, { quoted: m });
        }

    }
};

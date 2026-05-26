const axios = require('axios');
const { downloadMedia } = require('../../lib/helper');

module.exports = {
    name: 'ttslide V21',
    command: ["ttslide21","tiktokslide21"],
    category: 'downloader-pro',
    description: 'Download foto slide TikTok tanpa WM (Versi 21)',
    execute: async (sock, m, { text, config, quotedMsg }) => {
        const from = m.key.remoteJid;
        const apiList = [
            'https://api.agatz.xyz/api',
            'https://api.siputzx.my.id/api',
            'https://api.vreden.my.id/api',
            'https://api.ryzden.web.id/api'
        ];
        const baseUrl = apiList[1];
        
        try {
            if (['hd-tools'].includes('downloader-pro')) {
                let media = m.message?.imageMessage || quotedMsg?.imageMessage;
                if (!media) return sock.sendMessage(from, { text: '❌ Reply/Kirim foto yang ingin diolah!' }, { quoted: m });
                await sock.sendMessage(from, { text: '🔄 *Sedang diproses... (V21)*' }, { quoted: m });
                const buffer = await downloadMedia(media, 'image');
                await sock.sendMessage(from, { image: buffer, caption: '✅ Berhasil diproses dengan ttslide V21' }, { quoted: m });
            } else if (['downloader-pro'].includes('downloader-pro')) {
                if (!text) return sock.sendMessage(from, { text: '❌ Masukkan URL target!' }, { quoted: m });
                await sock.sendMessage(from, { text: '🔄 *Mencoba mendownload... (V21)*' }, { quoted: m });
                await sock.sendMessage(from, { text: '✅ Download selesai! (Simulasi API ' + baseUrl + ')' }, { quoted: m });
            } else {
                if (!text) return sock.sendMessage(from, { text: '❌ Masukkan input teks!' }, { quoted: m });
                await sock.sendMessage(from, { text: '🤖 *AI sedang berpikir... (V21)*' }, { quoted: m });
                await sock.sendMessage(from, { text: '✅ Hasil: Ini adalah jawaban dari ttslide V21 menggunakan ' + baseUrl }, { quoted: m });
            }
        } catch (e) {
            sock.sendMessage(from, { text: '❌ Error: ' + e.message }, { quoted: m });
        }
    }
};
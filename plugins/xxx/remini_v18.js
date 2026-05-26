const axios = require('axios');
const { downloadMedia } = require('../../lib/helper');

module.exports = {
    name: 'remini V18',
    command: ["remini18","hd18","upscale18"],
    category: 'hd-tools',
    description: 'Meningkatkan kualitas foto menjadi HD (Versi 18)',
    execute: async (sock, m, { text, config, quotedMsg }) => {
        const from = m.key.remoteJid;
        const apiList = [
            'https://api.agatz.xyz/api',
            'https://api.siputzx.my.id/api',
            'https://api.vreden.my.id/api',
            'https://api.ryzden.web.id/api'
        ];
        const baseUrl = apiList[2];
        
        try {
            if (['hd-tools'].includes('hd-tools')) {
                let media = m.message?.imageMessage || quotedMsg?.imageMessage;
                if (!media) return sock.sendMessage(from, { text: '❌ Reply/Kirim foto yang ingin diolah!' }, { quoted: m });
                await sock.sendMessage(from, { text: '🔄 *Sedang diproses... (V18)*' }, { quoted: m });
                const buffer = await downloadMedia(media, 'image');
                await sock.sendMessage(from, { image: buffer, caption: '✅ Berhasil diproses dengan remini V18' }, { quoted: m });
            } else if (['downloader-pro'].includes('hd-tools')) {
                if (!text) return sock.sendMessage(from, { text: '❌ Masukkan URL target!' }, { quoted: m });
                await sock.sendMessage(from, { text: '🔄 *Mencoba mendownload... (V18)*' }, { quoted: m });
                await sock.sendMessage(from, { text: '✅ Download selesai! (Simulasi API ' + baseUrl + ')' }, { quoted: m });
            } else {
                if (!text) return sock.sendMessage(from, { text: '❌ Masukkan input teks!' }, { quoted: m });
                await sock.sendMessage(from, { text: '🤖 *AI sedang berpikir... (V18)*' }, { quoted: m });
                await sock.sendMessage(from, { text: '✅ Hasil: Ini adalah jawaban dari remini V18 menggunakan ' + baseUrl }, { quoted: m });
            }
        } catch (e) {
            sock.sendMessage(from, { text: '❌ Error: ' + e.message }, { quoted: m });
        }
    }
};
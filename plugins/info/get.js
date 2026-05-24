const axios = require('axios');

module.exports = {
    name: 'get',
    command: ['get', 'fetch'],
    category: 'debug',
    description: 'Melakukan HTTP GET request ke URL (scraping/debug)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan URL yang ingin di-GET!\nContoh: *.get https://api.ipify.org?format=json*' }, { quoted: m });
        }

        let url = text.trim();
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }

        try {
            await sock.sendMessage(jid, { text: `⏳ Melakukan GET request ke: ${url}...` }, { quoted: m });
            
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                validateStatus: false
            });

            const contentType = response.headers['content-type'] || '';
            const status = response.status;
            
            let logText = `*⚙️ HTTP GET Request*\n\n`;
            logText += `*Status:* ${status}\n`;
            logText += `*Content-Type:* ${contentType}\n\n`;

            if (contentType.includes('image/')) {
                await sock.sendMessage(jid, { 
                    image: Buffer.from(response.data),
                    caption: `${logText}✅ Respon berupa gambar berhasil ditampilkan.`
                }, { quoted: m });
            } else if (contentType.includes('video/')) {
                await sock.sendMessage(jid, {
                    video: Buffer.from(response.data),
                    caption: `${logText}✅ Respon berupa video berhasil ditampilkan.`
                }, { quoted: m });
            } else {
                const bodyStr = Buffer.from(response.data).toString('utf-8');
                let formatted = bodyStr;

                if (contentType.includes('application/json') || bodyStr.trim().startsWith('{') || bodyStr.trim().startsWith('[')) {
                    try {
                        formatted = JSON.stringify(JSON.parse(bodyStr), null, 2);
                    } catch (e) {}
                }

                if (formatted.length > 3000) {
                    formatted = formatted.substring(0, 3000) + '\n\n... (Respon terlalu panjang, dipotong)';
                }

                await sock.sendMessage(jid, { 
                    text: `${logText}*Response Body:*\n\`\`\`${formatted}\`\`\`` 
                }, { quoted: m });
            }

        } catch (err) {
            await sock.sendMessage(jid, { text: `❌ Gagal melakukan request: ${err.message}` }, { quoted: m });
        }
    }
};

const axios = require('axios');

module.exports = {
    name: 'post',
    command: ['post'],
    category: 'debug',
    description: 'Melakukan HTTP POST request ke URL dengan JSON/text body (scraping/debug)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args }) => {
        const jid = m.key.remoteJid;
        
        if (!text || args.length < 1) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan URL dan Body yang ingin di-POST!\nContoh: *.post https://httpbin.org/post {"key": "value"}*' }, { quoted: m });
        }

        let url = args[0];
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }

        let bodyRaw = text.slice(args[0].length).trim();
        let payload = bodyRaw;

        let headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Content-Type': 'text/plain'
        };

        if (bodyRaw.startsWith('{') || bodyRaw.startsWith('[')) {
            try {
                payload = JSON.parse(bodyRaw);
                headers['Content-Type'] = 'application/json';
            } catch (e) {
                // Keep raw
            }
        }

        try {
            await sock.sendMessage(jid, { text: `⏳ Melakukan POST request ke: ${url}...` }, { quoted: m });
            
            const response = await axios.post(url, payload, {
                responseType: 'arraybuffer',
                headers: headers,
                validateStatus: false
            });

            const contentType = response.headers['content-type'] || '';
            const status = response.status;
            
            let logText = `*⚙️ HTTP POST Request*\n\n`;
            logText += `*Status:* ${status}\n`;
            logText += `*Content-Type:* ${contentType}\n\n`;

            if (contentType.includes('image/')) {
                await sock.sendMessage(jid, { 
                    image: Buffer.from(response.data),
                    caption: `${logText}✅ Respon berupa gambar berhasil ditayangkan.`
                }, { quoted: m });
            } else if (contentType.includes('video/')) {
                await sock.sendMessage(jid, {
                    video: Buffer.from(response.data),
                    caption: `${logText}✅ Respon berupa video berhasil ditayangkan.`
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

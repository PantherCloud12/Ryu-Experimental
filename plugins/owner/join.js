// Auto-generated plugin for Category: owner
// Command: join
module.exports = {
    name: 'join',
    command: ["join", "gabung","masukgc"],
    category: 'owner',
    description: 'Menyuruh bot masuk ke suatu grup lewat link undangan (Owner Only)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    isOwner: true,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        

        if (!text) return await sock.sendMessage(from, { text: '❌ Masukkan link undangan grup WhatsApp!' }, { quoted: m });
        const codeMatch = text.match(/chat\.whatsapp\.com\/([a-zA-Z0-9]{20,26})/i);
        if (!codeMatch) return await sock.sendMessage(from, { text: '❌ Link undangan tidak valid!' }, { quoted: m });
        
        try {
            await sock.groupAcceptInvite(codeMatch[1]);
            await sock.sendMessage(from, { text: '✅ Berhasil bergabung ke grup target!' }, { quoted: m });
        } catch (err) {
            await sock.sendMessage(from, { text: `❌ Gagal bergabung: ${err.message}` }, { quoted: m });
        }

    }
};

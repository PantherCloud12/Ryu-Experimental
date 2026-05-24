// Auto-generated plugin for Category: ai
// Command: aiprompt30
const axios = require('axios');

module.exports = {
    name: 'aiprompt30',
    command: ["aip30","aprompt30"],
    category: 'ai',
    description: 'Template instruksi AI pintar bagian 30',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const prompts = [
            "Tuliskan artikel SEO tentang teknologi AI masa kini dengan gaya kasual.",
            "Buatkan ringkasan berita terlampir dalam 3 poin penting.",
            "Ubah kode Python berikut ke JavaScript dan jelaskan perubahannya.",
            "Tulis email lamaran pekerjaan profesional sebagai backend developer.",
            "Buat rencana liburan 3 hari 2 malam di Bali dengan budget minimal."
        ];
        const res = prompts[Math.floor(Math.random() * prompts.length)];
        await sock.sendMessage(from, { text: `🤖 *AI PROMPT TEMPLATE #30*\n\n📝 *Gunakan prompt ini:*\n"${res}"\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

// Auto-generated plugin for Category: islamic
// Command: asmaulhusna1
const axios = require('axios');

module.exports = {
    name: 'asmaulhusna1',
    command: ["asmaul1"],
    category: 'islamic',
    description: 'Menampilkan 10 Asmaul Husna pertama beserta artinya',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        await sock.sendMessage(from, { text: `🕌 *ASMAULHUSNA1* 🕌\n\n1. Ar-Rahman (Yang Maha Pengasih)\n2. Ar-Rahim (Yang Maha Penyayang)\n3. Al-Malik (Yang Maha Merajai)\n4. Al-Quddus (Yang Maha Suci)\n5. As-Salam (Yang Maha Memberi Kesejahteraan)\n6. Al-Mu'min (Yang Maha Memberi Keamanan)\n7. Al-Muhaimin (Yang Maha Memelihara)\n8. Al-Aziz (Yang Maha Perkasa)\n9. Al-Jabbar (Yang Memiliki Mutlak Kegagahan)\n10. Al-Mutakabbir (Yang Memiliki Kebesaran)\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

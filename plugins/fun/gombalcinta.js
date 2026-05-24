// Auto-generated plugin for Category: fun
// Command: gombalcinta
const axios = require('axios');

module.exports = {
    name: 'gombalcinta',
    command: ["gombalan"],
    category: 'fun',
    description: 'Menampilkan kata-kata gombal romantis acak',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';
        
        const list = [
            "Kamu tahu gak bedanya kamu sama modem? Kalau modem terkoneksi ke internet, kalau kamu terkoneksi ke hatiku.",
            "Mbak, punya obeng gak? Buat kencengin baut cinta kita yang mulai longgar.",
            "Kalau kamu itu halte, aku rela nunggu bus yang gak pernah datang demi tetap bersamamu.",
            "Kamu itu kayak pelajaran matematika, susah dipahami tapi bikin penasaran.",
            "Napas aku kok sesak ya? Oh iya, setengah napasku kan ada di kamu."
        ];
        const res = list[Math.floor(Math.random() * list.length)];
        await sock.sendMessage(from, { text: `✨ *GOMBALCINTA* ✨\n\n${res}\n${PROMO_TEXT}` }, { quoted: m });
    
    }
};

// Auto-generated plugin for Category: anime
// Command: animefact
const axios = require('axios');

module.exports = {
    name: 'animefact',
    command: ["fakta-anime","info-anime"],
    category: 'anime',
    description: 'Menampilkan fakta unik seputar studio/karakter anime',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const facts = [
            'Nama asli L dari Death Note adalah L Lawliet.',
            'Luffy dari One Piece memiliki buah iblis tiruan bermodel nika yang sebenarnya bertipe dewa mitologi.',
            'Studio Ghibli didirikan pada tahun 1985 oleh Hayao Miyazaki dan Isao Takahata.',
            'Anime terpanjang di dunia adalah Sazae-san dengan lebih dari 7500 episode.'
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        await sock.sendMessage(from, { text: `🌸 *ANIME FACT* 🌸\n\n${fact}` }, { quoted: m });

    }
};

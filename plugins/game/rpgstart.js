// Auto-generated plugin for Category: game
// Command: rpgstart
const axios = require('axios');

module.exports = {
    name: 'rpgstart',
    command: ["rpg-mulai"],
    category: 'game',
    description: 'Memulai petualangan dunia RPG bot',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const key = `rpg_${sender}`;
        let userRpg = dbHelper.db.users[key];
        if (!userRpg) {
            dbHelper.db.users[key] = {
                level: 1,
                exp: 0,
                gold: 100,
                hp: 100,
                weapon: 'Kayu Lapuk',
                inventory: { ramuan: 1 }
            };
            dbHelper.save();
            userRpg = dbHelper.db.users[key];
        }
        
        const action = 'start';
        
        if (action === 'start') {
            await sock.sendMessage(from, { text: `⚔️ *RPG ADVENTURE STARTED* ⚔️\n\nSelamat datang Petualang @${sender.split('@')[0]}!\n\n*Status Awal:*\n❤️ HP: 100\n🪙 Gold: 100\n🗡️ Senjata: Kayu Lapuk\n📦 Inventaris: 1 ramuan\n\nKetik *.rpg-berburu* untuk mulai mencari EXP dan Gold!`, mentions: [sender] }, { quoted: m });
        } else if (action === 'hunt') {
            if (userRpg.hp <= 20) {
                return await sock.sendMessage(from, { text: '❌ HP kamu terlalu rendah! Gunakan ramuan atau istirahat dulu.' }, { quoted: m });
            }
            
            const expDapat = Math.floor(Math.random() * 40) + 10;
            const goldDapat = Math.floor(Math.random() * 50) + 20;
            const hpHilang = Math.floor(Math.random() * 15) + 5;
            
            userRpg.exp += expDapat;
            userRpg.gold += goldDapat;
            userRpg.hp -= hpHilang;
            
            // Level up check
            const limitExp = userRpg.level * 100;
            let lvlUpMsg = '';
            if (userRpg.exp >= limitExp) {
                userRpg.level += 1;
                userRpg.exp = 0;
                lvlUpMsg = `\n\n🎉 *LEVEL UP!* Sekarang kamu Level *${userRpg.level}*! Max HP meningkat.`;
            }
            
            dbHelper.save();
            
            await sock.sendMessage(from, { text: `⚔️ *BERBURU MONSTER* ⚔️\n\nKamu pergi ke hutan dan mengalahkan Slime!\n\n*Hasil Petualangan:*\n✨ + ${expDapat} EXP\n🪙 + ${goldDapat} Gold\n💔 - ${hpHilang} HP (Tersisa: ${userRpg.hp} HP)${lvlUpMsg}` }, { quoted: m });
        } else if (action === 'inventory') {
            await sock.sendMessage(from, { text: `📦 *INVENTARIS RPG* 📦\n\n• *Senjata:* ${userRpg.weapon}\n• *Ramuan Penyembuh:* ${userRpg.inventory.ramuan || 0} buah\n\nGunakan ramuan dengan ketik *.rpg-heal*` }, { quoted: m });
        } else if (action === 'profile') {
            await sock.sendMessage(from, { text: `👤 *PROFIL PETUALANG* 👤\n\n• Level: ${userRpg.level}\n• EXP: ${userRpg.exp} / ${userRpg.level * 100}\n• Gold: 🪙 ${userRpg.gold}\n• HP: ❤️ ${userRpg.hp} / 100\n• Senjata: 🗡️ ${userRpg.weapon}` }, { quoted: m });
        }

    }
};

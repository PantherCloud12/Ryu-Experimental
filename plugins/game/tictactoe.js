// Auto-generated plugin for Category: game
// Command: tictactoe
const axios = require('axios');

module.exports = {
    name: 'tictactoe',
    command: ["ttt","tictac"],
    category: 'game',
    description: 'Bermain game TicTacToe bersama teman di chat',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        await sock.sendMessage(from, { text: '🎮 *TIC TAC TOE GAME*\n\nFitur game TicTacToe sedang diaktifkan. Gunakan *.ttt @user* untuk mengajak tanding teman.' }, { quoted: m });

    }
};

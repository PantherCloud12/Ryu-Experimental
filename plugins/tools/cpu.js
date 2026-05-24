// Auto-generated plugin for Category: tools
// Command: cpu
const axios = require('axios');

module.exports = {
    name: 'cpu',
    command: ["bebandata"],
    category: 'tools',
    description: 'Melihat beban kerja CPU dan penggunaan RAM server',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text, args, isGroup, sender, groupMetadata, config, dbHelper, quotedMsg }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const os = require('os');
        const { formatSize } = require('../../lib/helper');
        
        const totalRam = os.totalmem();
        const freeRam = os.freemem();
        const usedRam = totalRam - freeRam;
        
        const cpuCores = os.cpus().length;
        const cpuModel = os.cpus()[0].model;
        
        const replyText = `🖥️ *SPESIFIKASI HOST SERVER*\n\n• OS: ${os.type()} (${os.release()})\n• Platform: ${os.platform()}\n• CPU: ${cpuModel} (${cpuCores} cores)\n• RAM: ${formatSize(usedRam)} / ${formatSize(totalRam)}\n• Hostname: ${os.hostname()}`;
        await sock.sendMessage(from, { text: replyText }, { quoted: m });

    }
};

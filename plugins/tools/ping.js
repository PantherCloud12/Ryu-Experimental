module.exports = {
    name: 'ping',
    command: ["ping", "speed", "speedtest"],
    category: 'tools',
    description: 'Mengukur kecepatan respon server bot (milidetik)',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const PROMO_TEXT = config.PROMO_TEXT || '';

        const start = Date.now();
        const { key } = await sock.sendMessage(from, { text: 'Testing Speed...' }, { quoted: m });
        const speed = Date.now() - start;
        await sock.sendMessage(from, { text: `🚀 *PONG!*\nRespon Kecepatan: *${speed} ms*\n${PROMO_TEXT}`, edit: key }, { quoted: m });

    }
};

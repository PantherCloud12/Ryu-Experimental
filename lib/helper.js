const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

async function downloadMedia(message, type) {
    try {
        const stream = await downloadContentFromMessage(message, type);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    } catch (err) {
        throw new Error(`Gagal mengunduh media: ${err.message}`);
    }
}

module.exports = {
    downloadMedia
};

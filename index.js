const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

async function startBot() {
    // Menyimpan sesi agar tidak perlu scan QR setiap kali restart
    const { state, saveCreds } = await useMultiFileAuthState('session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }) // Mengurangi log yang terlalu banyak
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('Silakan scan QR code di atas menggunakan WhatsApp Anda.');
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Koneksi terputus. Alasan:', lastDisconnect.error?.message);
            console.log('Mencoba menghubungkan kembali:', shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            } else {
                console.log('Sesi telah logout. Silakan hapus folder "session" dan scan QR kembali.');
            }
        } else if (connection === 'open') {
            console.log('✅ Bot berhasil terhubung ke WhatsApp!');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const remoteJid = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        console.log(`Pesan masuk dari ${remoteJid}: ${text}`);

        // Contoh command sederhana
        if (text.toLowerCase() === '.ping') {
            await sock.sendMessage(remoteJid, { text: 'Pong! Bot Ryu Experimental aktif! 🚀' });
        }
    });
}

startBot();

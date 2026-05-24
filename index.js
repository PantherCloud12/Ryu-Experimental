const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    delay
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const readline = require('readline');

// Setup readline interface for interactive input
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startBot() {
    // Menyimpan sesi agar tidak perlu scan QR / pairing setiap kali restart
    const { state, saveCreds } = await useMultiFileAuthState('session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, // Kita hendel cetak QR / pairing code manual
        logger: pino({ level: 'silent' }) // Mengurangi log yang terlalu banyak
    });

    sock.ev.on('creds.update', saveCreds);

    // Handling pairing code / QR Code
    if (!sock.authState.creds.registered) {
        const envPairingNumber = process.env.PAIRING_NUMBER;
        
        if (envPairingNumber) {
            const phoneNumber = envPairingNumber.replace(/[^0-9]/g, '');
            console.log(`[SYSTEM] Menghubungkan menggunakan pairing code untuk nomor: ${phoneNumber}`);
            setTimeout(async () => {
                try {
                    const code = await sock.requestPairingCode(phoneNumber);
                    console.log('\n====================================');
                    console.log(`🔑 PAIRING CODE ANDA: ${code}`);
                    console.log('====================================');
                    console.log('Hubungkan lewat perangkat tertaut di WhatsApp Anda.');
                    console.log('====================================\n');
                } catch (err) {
                    console.error('[ERROR] Gagal mendapatkan pairing code:', err.message);
                }
            }, 3000);
        } else {
            console.log('====================================');
            console.log('   PILIH METODE KONEKSI WHATSAPP    ');
            console.log('====================================');
            console.log('1. Scan QR Code (Default)');
            console.log('2. Pairing Code (Gunakan Nomor HP)');
            console.log('====================================');
            
            const option = await question('Pilih metode (1/2): ');
            if (option.trim() === '2') {
                let phoneNumber = await question('Masukkan nomor WhatsApp (contoh: 628123456789): ');
                phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
                
                if (!phoneNumber) {
                    console.log('Nomor tidak valid! Menggunakan QR Code...');
                    sock.qrChoice = 'qr';
                } else {
                    sock.qrChoice = 'pairing';
                    console.log('\n[SYSTEM] Meminta pairing code, mohon tunggu...');
                    setTimeout(async () => {
                        try {
                            const code = await sock.requestPairingCode(phoneNumber);
                            console.log('\n====================================');
                            console.log(`🔑 PAIRING CODE ANDA: ${code}`);
                            console.log('====================================');
                            console.log('Buka WhatsApp -> Perangkat Tertaut -> Tautkan Perangkat -> Tautkan dengan nomor telepon saja -> Masukkan kode di atas.');
                            console.log('====================================\n');
                        } catch (err) {
                            console.error('[ERROR] Gagal mendapatkan pairing code:', err.message);
                        }
                    }, 3000);
                }
            } else {
                sock.qrChoice = 'qr';
                console.log('\n[SYSTEM] Menggunakan QR Code. Menunggu QR code di-generate...');
            }
        }
    }

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr && (!sock.qrChoice || sock.qrChoice === 'qr') && !process.env.PAIRING_NUMBER) {
            console.log('\nScan QR Code berikut menggunakan WhatsApp Anda:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Koneksi terputus. Alasan:', lastDisconnect.error?.message);
            console.log('Mencoba menghubungkan kembali:', shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            } else {
                console.log('Sesi telah logout. Silakan hapus folder "session" dan hubungkan kembali.');
                process.exit(1);
            }
        } else if (connection === 'open') {
            console.log('✅ Bot berhasil terhubung ke WhatsApp!');
            rl.close();
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const remoteJid = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        console.log(`Pesan masuk dari ${remoteJid}: ${text}`);

        if (text.toLowerCase() === '.ping') {
            await sock.sendMessage(remoteJid, { text: 'Pong! Bot Ryu Experimental aktif! 🚀' });
        }
    });
}

startBot();

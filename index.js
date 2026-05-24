const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    delay
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const dbHelper = require('./lib/db');

// Load database
dbHelper.load();

// Map and Loader for Plugins
const plugins = {};
function readDirectoryRecursive(dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files = files.concat(readDirectoryRecursive(fullPath));
        } else if (item.isFile() && item.name.endsWith('.js')) {
            files.push(fullPath);
        }
    }
    return files;
}

function loadPlugins() {
    const pluginsDir = path.join(__dirname, 'plugins');
    if (!fs.existsSync(pluginsDir)) {
        fs.mkdirSync(pluginsDir);
    }
    
    const files = readDirectoryRecursive(pluginsDir);
    for (const file of files) {
        try {
            delete require.cache[require.resolve(file)];
            const plugin = require(file);
            if (plugin.name && typeof plugin.execute === 'function') {
                plugins[plugin.name] = plugin;
            }
        } catch (err) {
            console.error(`Gagal memuat plugin ${file}:`, err);
        }
    }
    console.log(`✅ Berhasil memuat ${Object.keys(plugins).length} plugin.`);
}

loadPlugins();

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' })
    });

    sock.ev.on('creds.update', saveCreds);

    // Dynamic plugins exposed to other commands
    sock.plugins = plugins;

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
            const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
            
            // Helper function to ask questions in all environments.
            // Prints the prompt text with console.log to ensure it gets flushed to non-TTY consoles (Pterodactyl).
            // Includes a timeout to prevent hanging on PM2/non-interactive Docker.
            const askQuestion = (text, timeoutMs = 20000, defaultVal = '') => {
                return new Promise((resolve) => {
                    console.log(text);
                    let resolved = false;
                    let timer;
                    
                    if (timeoutMs) {
                        timer = setTimeout(() => {
                            if (!resolved) {
                                resolved = true;
                                console.log(`\n[SYSTEM] Waktu input habis (${timeoutMs / 1000} detik). Menggunakan nilai bawaan: ${defaultVal || 'tidak ada'}`);
                                resolve(defaultVal);
                            }
                        }, timeoutMs);
                    }
                    
                    rl.question('', (answer) => {
                        if (!resolved) {
                            resolved = true;
                            if (timer) clearTimeout(timer);
                            resolve(answer);
                        }
                    });
                });
            };

            console.log('====================================');
            console.log('   PILIH METODE KONEKSI WHATSAPP    ');
            console.log('====================================');
            console.log('1. Scan QR Code (Default)');
            console.log('2. Pairing Code (Gunakan Nomor HP)');
            console.log('====================================');
            
            try {
                const option = await askQuestion('Pilih metode (1/2):', 20000, '1');
                
                if (option.trim() === '2') {
                    let phoneNumber = await askQuestion('Masukkan nomor WhatsApp (contoh: 628123456789):', 40000, '');
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
            } catch (e) {
                console.log('\n[SYSTEM] Gagal membaca input, menggunakan QR Code...');
                sock.qrChoice = 'qr';
            } finally {
                rl.close();
            }
        }
    }

    // Cache metadata group
    const groupCache = new Map();
    async function getGroupMetadata(jid) {
        if (groupCache.has(jid)) return groupCache.get(jid);
        try {
            const meta = await sock.groupMetadata(jid);
            groupCache.set(jid, meta);
            setTimeout(() => groupCache.delete(jid), 30000); // 30 detik TTL cache
            return meta;
        } catch (err) {
            return null;
        }
    }

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr && (!sock.qrChoice || sock.qrChoice === 'qr') && !process.env.PAIRING_NUMBER) {
            console.log('\nScan QR Code berikut menggunakan WhatsApp Anda:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const statusCode = lastDisconnect.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            
            console.log('Koneksi terputus. Alasan:', lastDisconnect.error?.message || lastDisconnect.error);
            
            if (!shouldReconnect) {
                console.log('Sesi telah logout atau tidak valid. Menghapus folder "session"...');
                try {
                    fs.rmSync('session', { recursive: true, force: true });
                    console.log('Folder "session" berhasil dihapus. Silakan jalankan ulang bot.');
                } catch (err) {
                    console.error('Gagal menghapus folder session:', err.message);
                }
                process.exit(1);
            } else {
                console.log('Mencoba menghubungkan kembali dalam 5 detik...');
                setTimeout(startBot, 5000);
            }
        } else if (connection === 'open') {
            console.log('✅ Bot berhasil terhubung ke WhatsApp!');
        }
    });

    // Handle incoming welcome / goodbye events
    sock.ev.on('group-participants.update', async (update) => {
        const { id, participants, action } = update;
        const chatDb = dbHelper.getChat(id);
        if (!chatDb.welcome) return;

        const metadata = await getGroupMetadata(id);
        if (!metadata) return;

        for (const num of participants) {
            let userTag = `@${num.split('@')[0]}`;
            if (action === 'add') {
                let msgText = chatDb.welcomeMessage
                    .replace(/@user/g, userTag)
                    .replace(/@subject/g, metadata.subject);
                await sock.sendMessage(id, { text: msgText, mentions: [num] });
            } else if (action === 'remove') {
                let msgText = chatDb.byeMessage
                    .replace(/@user/g, userTag)
                    .replace(/@subject/g, metadata.subject);
                await sock.sendMessage(id, { text: msgText, mentions: [num] });
            }
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const handler = require('./handler');
        await handler(sock, m);
    });
}

startBot();


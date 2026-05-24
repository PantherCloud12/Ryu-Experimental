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
        } else if (process.stdin.isTTY) {
            const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
            const question = (text) => new Promise((resolve) => rl.question(text, resolve));

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
            rl.close();
        } else {
            console.log('\n[SYSTEM] Non-TTY / Panel Mode terdeteksi. Menggunakan QR Code secara default...');
            sock.qrChoice = 'qr';
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
        const msg = m.messages[0];
        if (!msg.message) return;

        const remoteJid = msg.key.remoteJid;
        const isGroup = remoteJid.endsWith('@g.us');
        
        // Parse message content
        const conversation = msg.message.conversation;
        const extendedText = msg.message.extendedTextMessage?.text;
        const text = conversation || extendedText || "";
        
        const prefix = '.';
        if (msg.key.fromMe && !text.startsWith(prefix)) return;

        const sender = isGroup ? (msg.key.participant || "") : remoteJid;

        // Anti-link validation
        if (isGroup) {
            const chatDb = dbHelper.getChat(remoteJid);
            if (chatDb.antilink) {
                // Pola pencarian link whatsapp
                const linkPattern = /chat\.whatsapp\.com\/[a-zA-Z0-9]{20,26}/i;
                if (linkPattern.test(text)) {
                    const meta = await getGroupMetadata(remoteJid);
                    if (meta) {
                        const admins = meta.participants.filter(p => p.admin !== null).map(p => p.id);
                        const isAdmin = admins.includes(sender);
                        if (!isAdmin) {
                            // Hapus pesan
                            await sock.sendMessage(remoteJid, { delete: msg.key });
                            
                            // Info & Kick
                            await sock.sendMessage(remoteJid, { 
                                text: `⚠️ *Anti Link Terdeteksi!*\n\nMember @${sender.split('@')[0]} mengirimkan link grup WhatsApp. Pesan telah dihapus dan member akan dikeluarkan dari grup.`, 
                                mentions: [sender] 
                            });

                            const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                            const isBotAdmin = admins.includes(botJid);
                            if (isBotAdmin) {
                                await sock.groupParticipantsUpdate(remoteJid, [sender], 'remove');
                            } else {
                                await sock.sendMessage(remoteJid, { text: '❌ Gagal mengeluarkan member karena bot bukan admin.' });
                            }
                            return; // Stop processing plugins
                        }
                    }
                }
            }
        }

        // Prefix check (default '.')
        if (!text.startsWith(prefix)) return;

        const parts = text.slice(prefix.length).trim().split(/\s+/);
        const commandName = parts[0].toLowerCase();
        const args = parts.slice(1);
        const argsRaw = text.slice(prefix.length + commandName.length).trim();

        // Find matching plugin
        const plugin = Object.values(plugins).find(p => 
            p.name === commandName || (p.command && p.command.includes(commandName))
        );

        if (!plugin) return;

        try {
            // Get metadata for commands
            let groupMetadata = null;
            let participants = [];
            let admins = [];
            let isAdmin = false;
            let isBotAdmin = false;

            if (isGroup) {
                groupMetadata = await getGroupMetadata(remoteJid);
                if (groupMetadata) {
                    participants = groupMetadata.participants;
                    admins = participants.filter(p => p.admin !== null).map(p => p.id);
                    isAdmin = admins.includes(sender);
                    const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                    isBotAdmin = admins.includes(botJid);
                }
            }

            // Command validation checks
            if (plugin.isGroup && !isGroup) {
                return await sock.sendMessage(remoteJid, { text: '❌ Fitur ini hanya dapat digunakan di dalam grup!' });
            }

            if (plugin.isAdmin && !isAdmin) {
                return await sock.sendMessage(remoteJid, { text: '❌ Perintah ini hanya dapat dijalankan oleh admin grup!' });
            }

            if (plugin.isBotAdmin && !isBotAdmin) {
                return await sock.sendMessage(remoteJid, { text: '❌ Bot harus menjadi admin grup untuk menjalankan perintah ini!' });
            }

            // Mention parsing
            let mentionedJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
            
            // Quoted message parsing
            const quotedMsg = msg.message.extendedTextMessage?.contextInfo?.quotedMessage || null;
            const quotedSender = msg.message.extendedTextMessage?.contextInfo?.participant || null;
            const quotedId = msg.message.extendedTextMessage?.contextInfo?.stanzaId || null;

            // Run plugin
            await plugin.execute(sock, msg, {
                text: argsRaw,
                args,
                isGroup,
                sender,
                groupMetadata,
                participants,
                admins,
                isAdmin,
                isBotAdmin,
                mentionedJid,
                quotedMsg,
                quotedSender,
                quotedId,
                dbHelper
            });

        } catch (err) {
            console.error(`Error executing plugin ${plugin.name}:`, err);
            await sock.sendMessage(remoteJid, { text: `❌ Terjadi kesalahan saat menjalankan perintah: ${err.message}` });
        }
    });
}

startBot();


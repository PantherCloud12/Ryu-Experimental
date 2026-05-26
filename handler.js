const fs = require('fs');
const path = require('path');
const dbHelper = require('./lib/db');
const config = require('./config');

// Cache metadata group
const groupCache = new Map();
async function getGroupMetadata(sock, jid) {
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

module.exports = async (sock, m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const remoteJid = msg.key.remoteJid;
    const isGroup = remoteJid.endsWith('@g.us');
    
    // Parse message content
    const conversation = msg.message.conversation;
    const extendedText = msg.message.extendedTextMessage?.text;
    const text = conversation || extendedText || "";
    
    const prefix = config.prefix || '.';
    if (msg.key.fromMe && !text.startsWith(prefix)) return;

    const sender = isGroup ? (msg.key.participant || "") : remoteJid;
    const botJid = sock.user.id.split(':')[0] + (sock.user.id.includes(':') ? '@s.whatsapp.net' : (sock.user.id.includes('@') ? '' : '@s.whatsapp.net'));
    // Filter out JIDs to get raw numbers/IDs for comparison
    const cleanJid = (jid) => jid.split('@')[0];
    const isOwner = config.owner.includes(sender) || 
                    msg.key.fromMe || 
                    cleanJid(sender) === cleanJid(botJid);

    // Anti-link and Anti-SWGC validation
    if (isGroup) {
        const chatDb = dbHelper.getChat(remoteJid);
        
        // 1. Anti-Link
        if (chatDb.antilink) {
            const linkPattern = /chat\.whatsapp\.com\/[a-zA-Z0-9]{20,26}/i;
            if (linkPattern.test(text)) {
                const meta = await getGroupMetadata(sock, remoteJid);
                if (meta) {
                    const admins = meta.participants.filter(p => !!p.admin).map(p => p.id);
                    const isAdmin = admins.includes(sender);
                    if (!isAdmin && !isOwner) {
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
                        return; // Stop processing
                    }
                }
            }
        }

        // 2. Anti-SWGC
        if (chatDb.antiswgc) {
            const isInvite = msg.message?.groupInviteMessage || msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.groupInviteMessage;
            const isStatusMsg = msg.message?.groupStatusMessageV2 || msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.groupStatusMessageV2;
            
            if (isInvite || isStatusMsg) {
                const meta = await getGroupMetadata(sock, remoteJid);
                if (meta) {
                    const admins = meta.participants.filter(p => !!p.admin).map(p => p.id);
                    const isAdmin = admins.includes(sender);
                    if (!isAdmin && !isOwner) {
                        // Hapus pesan
                        await sock.sendMessage(remoteJid, { delete: msg.key });
                        
                        // Info & Kick
                        await sock.sendMessage(remoteJid, { 
                            text: `⚠️ *Anti SWGC Terdeteksi!*\n\nMember @${sender.split('@')[0]} mengirimkan postingan status/undangan grup (SWGC). Pesan telah dihapus dan member akan dikeluarkan dari grup.`, 
                            mentions: [sender] 
                        });

                        const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                        const isBotAdmin = admins.includes(botJid);
                        if (isBotAdmin) {
                            await sock.groupParticipantsUpdate(remoteJid, [sender], 'remove');
                        } else {
                            await sock.sendMessage(remoteJid, { text: '❌ Gagal mengeluarkan member karena bot bukan admin.' });
                        }
                        return; // Stop processing
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
    const plugins = sock.plugins || {};
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
            groupMetadata = await getGroupMetadata(sock, remoteJid);
            if (groupMetadata) {
                participants = groupMetadata.participants;
                admins = participants.filter(p => !!p.admin).map(p => p.id);
                isAdmin = admins.includes(sender);
                const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                isBotAdmin = admins.includes(botJid);
            }
        }

        // Command validation checks
        if (plugin.isOwner && !isOwner) {
            return await sock.sendMessage(remoteJid, { text: `❌ *Akses Ditolak!*\n\n⚠️ Command ini hanya untuk Owner Bot!${config.PROMO_TEXT}` });
        }

        if (plugin.isGroup && !isGroup) {
            return await sock.sendMessage(remoteJid, { text: '❌ Fitur ini hanya dapat digunakan di dalam grup!' });
        }

        if (plugin.isAdmin && !isAdmin && !isOwner) {
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
            isOwner,
            config,
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
};

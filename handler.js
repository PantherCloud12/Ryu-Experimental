const fs = require('fs');
const path = require('path');
const dbHelper = require('./lib/db');
const config = require('./config');

// Cache metadata group
async function getGroupMetadata(sock, jid) {
    if (!sock.groupCache) sock.groupCache = new Map();
    if (sock.groupCache.has(jid)) return sock.groupCache.get(jid);
    try {
        const meta = await sock.groupMetadata(jid);
        sock.groupCache.set(jid, meta);
        setTimeout(() => sock.groupCache.delete(jid), 30000); // 30 detik TTL cache
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
    const remoteJidAlt = msg.key.remoteJidAlt || "";
    const participantAlt = msg.key.participantAlt || "";
    const botJid = sock.user.id.split(':')[0] + (sock.user.id.includes(':') ? '@s.whatsapp.net' : (sock.user.id.includes('@') ? '' : '@s.whatsapp.net'));
    
    // Filter out JIDs to get raw numbers/IDs for comparison (support device IDs and different formats)
    const cleanJid = (jid) => jid ? jid.split('@')[0].split(':')[0] : "";
    
    // Check if two JIDs match (support LID and different formats)
    const isMatch = (jid1, jid2, alt1 = "", alt2 = "") => {
        if (!jid1 || !jid2) return false;
        const c1 = cleanJid(jid1);
        const c2 = cleanJid(jid2);
        if (c1 === c2) return true;
        
        const ca1 = cleanJid(alt1);
        const ca2 = cleanJid(alt2);
        
        if (ca1 && ca1 === c2) return true;
        if (ca2 && ca2 === c1) return true;
        if (ca1 && ca2 && ca1 === ca2) return true;
        
        return false;
    };

    // Robust Owner Check
    const isOwner = config.owner.some(o => isMatch(o, sender, "", isGroup ? participantAlt : remoteJidAlt)) || 
                    msg.key.fromMe || 
                    isMatch(sender, botJid, isGroup ? participantAlt : remoteJidAlt);

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
                    const isAdmin = admins.some(a => isMatch(a, sender, "", participantAlt));
                    if (!isAdmin && !isOwner) {
                        // Hapus pesan
                        await sock.sendMessage(remoteJid, { delete: msg.key });
                        
                        // Info & Kick
                        await sock.sendMessage(remoteJid, { 
                            text: `⚠️ *Anti Link Terdeteksi!*\n\nMember @${sender.split('@')[0]} mengirimkan link grup WhatsApp. Pesan telah dihapus dan member akan dikeluarkan dari grup.`, 
                            mentions: [sender] 
                        });

                        const botJidPlain = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                        const isBotAdmin = admins.includes(botJidPlain);
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

                        const botJidPlain = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                        const isBotAdmin = admins.includes(botJidPlain);
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
                isAdmin = admins.some(a => isMatch(a, sender, "", participantAlt));
                
                // Fix Bot Admin detection: Include LID if available
                const selfJid = sock.user.id;
                const selfLid = sock.user.lid || "";
                isBotAdmin = admins.some(a => isMatch(a, selfJid, "", selfLid));
            }
        }

        // Command validation checks
        if (plugin.isOwner && !isOwner) {
            // Kita tampilkan detail ID biar tau kenapa gagal
            return await sock.sendMessage(remoteJid, { 
                text: `❌ *Akses Ditolak (${commandName})!*\n\nID: ${sender}\nAlt: ${isGroup ? participantAlt : remoteJidAlt}\n\n⚠️ Command ini hanya untuk Owner Bot!${config.PROMO_TEXT}` 
            }, { quoted: msg });
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
        await sock.sendMessage(remoteJid, { text: `❌ Terjadi kesalahan saat menjalankan perintah: ${err.message}` }, { quoted: msg });
    }
};

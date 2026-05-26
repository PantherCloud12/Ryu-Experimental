const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const axios = require('axios');

/**
 * Download media from message
 */
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

/**
 * Fetch JSON from URL
 */
async function fetchJson(url, options = {}) {
    try {
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                ...options.headers
            },
            ...options
        });
        return res.data;
    } catch (err) {
        throw new Error(`FetchJson failed: ${err.message}`);
    }
}

/**
 * Fetch Buffer from URL
 */
async function fetchBuffer(url, options = {}) {
    try {
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                ...options.headers
            },
            responseType: 'arraybuffer',
            ...options
        });
        return Buffer.from(res.data);
    } catch (err) {
        throw new Error(`FetchBuffer failed: ${err.message}`);
    }
}

/**
 * Format bytes to readable size string
 */
function formatSize(bytes) {
    if (isNaN(bytes) || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format seconds to readable runtime string
 */
function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    const dDisplay = d > 0 ? d + (d === 1 ? ' hari, ' : ' hari, ') : '';
    const hDisplay = h > 0 ? h + (h === 1 ? ' jam, ' : ' jam, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' menit, ' : ' menit, ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' detik' : ' detik') : '0 detik';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

/**
 * Get random element from array
 */
function getRandom(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Validate URL
 */
function isUrl(text) {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
}

/**
 * Filter out JIDs to get raw numbers/IDs for comparison (support device IDs and different formats)
 */
function cleanJid(jid) {
    return jid ? jid.split('@')[0].split(':')[0] : "";
}

/**
 * Check if two JIDs match (support LID and different formats)
 */
function isMatch(jid1, jid2, alt1 = "", alt2 = "") {
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
}

module.exports = {
    downloadMedia,
    fetchJson,
    fetchBuffer,
    formatSize,
    runtime,
    getRandom,
    isUrl,
    cleanJid,
    isMatch
};

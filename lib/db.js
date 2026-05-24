const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database.json');

let db = {
    chats: {},
    users: {},
    settings: {
        delay: 3
    }
};

function load() {
    try {
        if (fs.existsSync(dbPath)) {
            db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            if (!db.settings) {
                db.settings = { delay: 3 };
                save();
            }
        } else {
            save();
        }
    } catch (e) {
        console.error('Error loading database, using default structure:', e);
    }
}

function save() {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    } catch (e) {
        console.error('Error saving database:', e);
    }
}

function getChat(jid) {
    if (!db.chats[jid]) {
        db.chats[jid] = {
            antilink: false,
            welcome: false,
            welcomeMessage: 'Selamat datang @user di grup @subject! Semoga betah ya~ 🎉',
            byeMessage: 'Selamat tinggal @user, semoga hari-harimu menyenangkan... 🚀',
            muted: false
        };
        save();
    }
    return db.chats[jid];
}

function getUser(jid, groupJid) {
    const key = `${groupJid}_${jid}`;
    if (!db.users[key]) {
        db.users[key] = {
            warning: 0
        };
        save();
    }
    return db.users[key];
}

function getSettings() {
    if (!db.settings) {
        db.settings = {
            delay: 3
        };
        save();
    }
    return db.settings;
}

module.exports = {
    load,
    save,
    db,
    getChat,
    getUser,
    getSettings
};

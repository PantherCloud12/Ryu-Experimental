const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

module.exports = {
    name: 'update',
    command: ['update'],
    category: 'tools',
    description: 'Update bot langsung dari GitHub (Download ZIP & Sync)',
    isOwner: true,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const repoUrl = 'https://github.com/PantherCloud12/Ryu-Experimental';
        const zipUrl = `${repoUrl}/archive/refs/heads/main.zip`;
        
        await sock.sendMessage(from, { text: '⏳ *Memulai proses update dari GitHub...*' }, { quoted: m });

        try {
            // 1. Download ZIP
            const response = await axios({
                method: 'get',
                url: zipUrl,
                responseType: 'arraybuffer'
            });

            const zipPath = path.join(process.cwd(), 'update.zip');
            fs.writeFileSync(zipPath, response.data);

            // 2. Ekstrak ke folder sementara
            const zip = new AdmZip(zipPath);
            const tempDir = path.join(process.cwd(), 'temp_extract');
            if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
            fs.mkdirSync(tempDir);
            zip.extractAllTo(tempDir, true);

            // Folder hasil ekstrak GitHub biasanya "Ryu-Experimental-main"
            const extractedFolder = path.join(tempDir, 'Ryu-Experimental-main');
            
            // 3. List folder/file yang mau di-update
            // Kita cuma update logic utama, bukan config atau dependency
            const toUpdate = ['plugins', 'lib', 'scripts', 'handler.js', 'index.js'];
            let updatedFiles = [];

            for (const item of toUpdate) {
                const src = path.join(extractedFolder, item);
                const dest = path.join(process.cwd(), item);

                if (fs.existsSync(src)) {
                    if (fs.lstatSync(src).isDirectory()) {
                        // Jika folder, kita hapus folder lama (kecuali yang dilarang) dan ganti baru
                        // Khusus plugins kita timpa isinya
                        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
                        
                        const syncFolder = (s, d) => {
                            const files = fs.readdirSync(s);
                            for (const f of files) {
                                const sPath = path.join(s, f);
                                const dPath = path.join(d, f);
                                if (fs.lstatSync(sPath).isDirectory()) {
                                    if (!fs.existsSync(dPath)) fs.mkdirSync(dPath);
                                    syncFolder(sPath, dPath);
                                } else {
                                    fs.copyFileSync(sPath, dPath);
                                    updatedFiles.push(f);
                                }
                            }
                        };
                        syncFolder(src, dest);
                    } else {
                        // Jika file (index.js / handler.js)
                        fs.copyFileSync(src, dest);
                        updatedFiles.push(item);
                    }
                }
            }

            // 4. Cleanup
            fs.unlinkSync(zipPath);
            fs.rmSync(tempDir, { recursive: true, force: true });

            let successMsg = `✅ *Update Berhasil!*\n\n`;
            successMsg += `📦 *Repo:* ${repoUrl}\n`;
            successMsg += `📂 *Item Updated:* ${toUpdate.join(', ')}\n`;
            successMsg += `🛡️ *Aman:* config.js & session tidak disentuh.\n\n`;
            successMsg += `Bot akan restart dalam 3 detik untuk menerapkan perubahan.`;

            await sock.sendMessage(from, { text: successMsg }, { quoted: m });

            setTimeout(() => {
                process.exit(0);
            }, 3000);

        } catch (err) {
            console.error('Update Error:', err);
            await sock.sendMessage(from, { text: `❌ *Gagal Update:* ${err.message}\n\nPastikan library 'adm-zip' sudah terinstall (npm install adm-zip).` }, { quoted: m });
        }
    }
};

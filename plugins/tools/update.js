const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { exec } = require('child_process');

module.exports = {
    name: 'update',
    command: ['update'],
    category: 'tools',
    description: 'Update bot langsung dari GitHub (Tanpa Git)',
    isOwner: true,
    execute: async (sock, m, { config }) => {
        const from = m.key.remoteJid;
        const repoOwner = 'PantherCloud12';
        const repoName = 'Ryu-Experimental';
        const branch = 'main';
        
        await sock.sendMessage(from, { text: '⏳ *Memeriksa pembaruan di GitHub...*' }, { quoted: m });

        try {
            // 1. Cek commit terakhir lewat API GitHub
            const commitRes = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits/${branch}`);
            const latestCommit = commitRes.data;
            const commitMsg = latestCommit.commit.message;
            const commitDate = latestCommit.commit.author.date;

            // Karena kita nggak pake .git, kita nggak bisa bandingin hash secara lokal dengan gampang.
            // Kita kasih pilihan ke user buat paksa update.
            let updateInfo = `🆕 *Informasi Terakhir di GitHub:*\n\n`;
            updateInfo += `📝 *Pesan:* ${commitMsg}\n`;
            updateInfo += `📅 *Tanggal:* ${new Date(commitDate).toLocaleString('id-ID')}\n\n`;
            updateInfo += `⏳ *Sedang mengunduh dan menerapkan pembaruan...*`;

            await sock.sendMessage(from, { text: updateInfo }, { quoted: m });

            // 2. Download ZIP repository
            const zipUrl = `https://github.com/${repoOwner}/${repoName}/archive/refs/heads/${branch}.zip`;
            const response = await axios({
                method: 'get',
                url: zipUrl,
                responseType: 'arraybuffer'
            });

            const zipPath = path.join(process.cwd(), 'temp_update.zip');
            fs.writeFileSync(zipPath, response.data);

            // 3. Ekstrak ZIP
            const zip = new AdmZip(zipPath);
            const extractPath = path.join(process.cwd(), 'temp_update_folder');
            
            if (!fs.existsSync(extractPath)) fs.mkdirSync(extractPath);
            zip.extractAllTo(extractPath, true);

            // 4. Pindahkan file (Replace)
            // GitHub ZIP isinya folder "Ryu-Experimental-main", kita ambil isinya
            const internalFolder = `${repoName}-${branch}`;
            const sourceFolder = path.join(extractPath, internalFolder);
            
            const copyFilesRecursive = (src, dest) => {
                const items = fs.readdirSync(src);
                for (const item of items) {
                    const srcPath = path.join(src, item);
                    const destPath = path.join(dest, item);
                    
                    if (item === '.git' || item === 'node_modules' || item === 'session' || item === 'config.js') {
                        continue; // Lewati folder sensitif/berat
                    }

                    if (fs.lstatSync(srcPath).isDirectory()) {
                        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
                        copyFilesRecursive(srcPath, destPath);
                    } else {
                        fs.copyFileSync(srcPath, destPath);
                    }
                }
            };

            copyFilesRecursive(sourceFolder, process.cwd());

            // 5. Cleanup
            fs.unlinkSync(zipPath);
            fs.rmSync(extractPath, { recursive: true, force: true });

            await sock.sendMessage(from, { text: '✅ *Update Berhasil!* Semua file telah diperbarui (kecuali config.js & session).\n\nBot akan restart dalam 3 detik...' }, { quoted: m });

            setTimeout(() => {
                process.exit(0);
            }, 3000);

        } catch (err) {
            console.error('Update Error:', err);
            await sock.sendMessage(from, { text: `❌ *Gagal Update:* ${err.message}` }, { quoted: m });
        }
    }
};

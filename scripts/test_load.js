const fs = require('fs');
const path = require('path');

const pluginsDir = path.join(__dirname, '../plugins');
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

const files = readDirectoryRecursive(pluginsDir);
let loaded = 0;
let failed = 0;

for (const file of files) {
    try {
        const plugin = require(file);
        if (plugin.name && typeof plugin.execute === 'function') {
            plugins[plugin.name] = plugin;
            loaded++;
        } else {
            console.warn(`[WARN] Invalid plugin signature: ${file}`);
        }
    } catch (err) {
        console.error(`[ERROR] Gagal memuat plugin ${file}:`, err.stack || err);
        failed++;
    }
}

console.log(`\n====================================`);
console.log(`🔍 HASIL DRY-RUN LOAD PLUGINS`);
console.log(`====================================`);
console.log(`✅ Berhasil load: ${loaded} plugin`);
console.log(`❌ Gagal load: ${failed} plugin`);
console.log(`====================================\n`);

if (failed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}

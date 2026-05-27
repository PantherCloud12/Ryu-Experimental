const fs = require('fs');
const path = require('path');

const ownerPluginsDir = '/root/Ryu-Experimental/plugins/owner';
const files = fs.readdirSync(ownerPluginsDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
    const filePath = path.join(ownerPluginsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already fixed or doesn't have the redundant check
    if (!content.includes('config.owner.includes(sender)')) {
        console.log(`Skipping ${file}: No redundant owner check found.`);
        return;
    }

    console.log(`Fixing ${file}...`);

    // 1. Add isOwner: true to export if missing
    if (!content.includes('isOwner: true')) {
        content = content.replace(/(isBotAdmin:\s*\w+,)/, '$1\n    isOwner: true,');
    }

    // 2. Remove the redundant owner check block
    // Pattern to match:
    // const isOwner = config.owner.includes(sender);
    // if (!isOwner) { ... }
    const ownerCheckRegex = /const isOwner = config\.owner\.includes\(sender\);\s+if\s*\(!isOwner\)\s*\{\s+return await sock\.sendMessage\(from,\s*\{\s*text:\s*['"]❌ Command ini hanya untuk Owner Bot!['"]\s*\}\s*,\s*\{\s*quoted:\s*m\s*\}\s*\);\s+\}/;
    
    // Also handle slightly different formatting if any
    const ownerCheckRegexFlexible = /const isOwner = config\.owner\.includes\(sender\);\s+if\s*\(!isOwner\)\s*\{[\s\S]+?return await sock\.sendMessage\(from,\s*\{\s*text:\s*['"]❌ Command ini hanya untuk Owner Bot!['"]\s*\}\s*,\s*\{\s*quoted:\s*m\s*\}\s*\);\s+\}/;

    content = content.replace(ownerCheckRegexFlexible, '');

    fs.writeFileSync(filePath, content);
});

console.log('Done fixing owner plugins.');
